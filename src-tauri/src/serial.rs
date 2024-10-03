use std::time::Duration;

use anyhow::Result;
use serialport::SerialPort;

struct Serial {
    port: Box<dyn SerialPort>
}

impl Serial {
    pub fn connect(port: &str) -> Result<Self> {
        let port = serialport::new("/dev/ttyACM0", 115_200)
            .timeout(Duration::from_millis(10))
            .open()?;

        Ok(Self {
            port
        })
    }
}

// Starting serial port connection
pub fn start(port: &str) -> bool {
    let port = serialport::new("/dev/ttyACM0", 115_200)
        .timeout(Duration::from_millis(10))
        .open();
        
    let mut port = match port {
        Ok(port) => port,
        Err(err) => {
            println!("err: {:?}", err);
            return false;
        },
    };

    let mut serial_buf: Vec<u8> = vec![0; 32];

    loop {
        match port.read(serial_buf.as_mut_slice()) {
            Ok(_) => {
                // Process the data here
                println!("Received data: {:?}", serial_buf);
            },
            Err(err) => {
                println!("Error reading from port: {:?}", err);
            }
        }

        // Optionally sleep to prevent constant polling if needed
        std::thread::sleep(Duration::from_millis(10));
    }
}
pub fn stop() -> bool {
    true
}
