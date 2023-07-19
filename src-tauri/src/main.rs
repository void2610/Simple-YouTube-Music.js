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

async fn get_playlist_info(url: &str) -> Result<Vec<Track>, Box<dyn std::error::Error>> {
    let playlist_id = url.split("list=").nth(1).ok_or("Invalid playlist URL")?;
    let api_key: &str = "AIzaSyDqpgMER8oSy4wDRNIcwepIpDs_2r7PY-U";
    let client = Client::new();
    let url = format!(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId={}&key={}",
        playlist_id, api_key
    );
    let response = client.get(&url).send().await?;
    let data: serde_json::Value = response.json().await?;
    if data["items"]
        .as_array()
        .map_or(true, |items| items.is_empty())
    {
        return Err("No video found".into());
    }
    let tracks = data["items"]
        .as_array()
        .unwrap()
        .iter()
        .map(|item| Track {
            title: item["snippet"]["title"].as_str().unwrap().to_string(),
            src: format!(
                "https://www.youtube.com/watch?v={}",
                item["snippet"]["resourceId"]["videoId"].as_str().unwrap()
            ),
            author: item["snippet"]["channelTitle"]
                .as_str()
                .unwrap()
                .to_string(),
            thumbnail: item["snippet"]["thumbnails"]["default"]["url"]
                .as_str()
                .unwrap()
                .to_string(),
        })
        .collect();
    Ok(tracks)
}

#[tauri::command]
async fn start_search(url: String) -> Result<serde_json::Value, String> {
    if url.contains("list=") {
        match get_playlist_info(&url).await {
            Ok(tracks) => Ok(serde_json::to_value(tracks).unwrap()),
            Err(e) => Err(e.to_string()),
        }
    } else {
        match get_video_info(&url).await {
            Ok(track) => Ok(serde_json::to_value(track).unwrap()),
            Err(e) => Err(e.to_string()),
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
