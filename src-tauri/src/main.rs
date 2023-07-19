// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use regex::Regex;
use reqwest::Client;
use serde::Serialize;

#[derive(Serialize)]
struct Track {
    title: String,
    src: String,
    author: String,
    thumbnail: String,
}

fn extract_video_id_from_url(url: &str) -> Option<String> {
    let re = Regex::new(r"(?:v=|\/)([0-9A-Za-z_-]{11}).*").unwrap();
    re.captures(url)
        .and_then(|cap| cap.get(1).map(|id| id.as_str().to_string()))
}

async fn get_video_info(url: &str) -> Result<Track, Box<dyn std::error::Error>> {
    let video_id = extract_video_id_from_url(url).ok_or("Invalid YouTube URL")?;
    let api_key: &str = "AIzaSyDqpgMER8oSy4wDRNIcwepIpDs_2r7PY-U";
    let client = Client::new();
    let url = format!(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&id={}&key={}",
        video_id, api_key
    );
    let response = client.get(&url).send().await?;
    let data: serde_json::Value = response.json().await?;
    if data["items"]
        .as_array()
        .map_or(true, |items| items.is_empty())
    {
        return Err("No video found".into());
    }
    let video_data = &data["items"][0]["snippet"];
    let track = Track {
        title: video_data["title"].as_str().unwrap().to_string(),
        src: url.to_string(),
        author: video_data["channelTitle"].as_str().unwrap().to_string(),
        thumbnail: video_data["thumbnails"]["default"]["url"]
            .as_str()
            .unwrap()
            .to_string(),
    };
    Ok(track)
}

//非同期関数を同期関数から呼び出すための関数
#[tauri::command]
async fn get_video_info_sync(url: String) -> Result<Track, String> {
    match get_video_info(&url).await {
        Ok(info) => Ok(info),
        Err(e) => Err(e.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_video_info_sync])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
