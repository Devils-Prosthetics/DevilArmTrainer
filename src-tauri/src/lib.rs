use tauri::{AppHandle, Emitter};
use once_cell::sync::OnceCell;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use std::process::Command;
use ssh2::Session;
use std::net::TcpStream;
use std::time::Duration;

mod serial;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn serial_start(port: String) -> bool {
    let port_clone = port.clone();
    
    std::thread::spawn(move || {
        if let wow = serial::start(&port_clone) {
            eprintln!("Error starting serial port: {:?}", wow);
        }
    });

    true // Return true to signal thread was spawned successfully
}


#[tauri::command]
fn serial_stop() -> bool {
    serial::stop()
}

#[tauri::command]
fn download(app: AppHandle, serial_data: String) {
    app.emit("serial-output", &serial_data).unwrap();
}

#[tauri::command]
fn upload_file_to_pi() -> Result<String, String> {
    // Specify the directory where you want to run the cargo command
    let directory = "../../DevilArm/devil-embedded";

    // Run `cargo run --manifest-path /path/to/your/cargo/project/Cargo.toml`
    let output = Command::new("cargo")
        .arg("run")
        .current_dir(directory)
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                let stdout = String::from_utf8_lossy(&output.stdout);
                Ok(format!("Cargo run success: {}", stdout))
            } else {
                let stderr = String::from_utf8_lossy(&output.stderr);
                Err(format!("Cargo run failed: {}", stderr))
            }
        }
        Err(e) => Err(format!("Failed to execute cargo run: {}", e.to_string())),
    }
}

pub static GLOBAL_APP_HANDLE: OnceCell<AppHandle> = OnceCell::new();

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(move |app| {
            GLOBAL_APP_HANDLE.set(app.handle().clone())
                .expect("Failed to set global app handle");
            
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, serial_start, serial_stop, upload_file_to_pi])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
