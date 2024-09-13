use tauri::{AppHandle, Emitter};

mod serial;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn serial_start(port: &str) -> bool {
    serial::start(port)
}


#[tauri::command]
fn serial_stop() -> bool {
    serial::stop()
}

#[tauri::command]
fn download(app: AppHandle, serial_data: String) {
    app.emit("serial-output", &serial_data).unwrap();
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, serial_start, serial_stop])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
