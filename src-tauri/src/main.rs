// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn calc(num1: f64, num2: f64) -> Result<f64, String> {
    Ok(num1 + num2)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, calc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
