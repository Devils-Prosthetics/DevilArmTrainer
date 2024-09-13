use std::time::Duration;

use anyhow::Result;
use serialport::SerialPort;

struct Serial {
    port: Box<dyn SerialPort>
}

impl Serial {
    pub fn connect(port: &str) -> Result<Self> {
        let port = serialport::new("/dev/ttyUSB0", 115_200)
            .timeout(Duration::from_millis(10))
            .open()?;

        Ok(Self {
            port
        })
    }
}

// Starting serial port connection
pub fn start(port: &str) -> bool {
    let port = serialport::new("/dev/ttyUSB0", 115_200)
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
    port.read(serial_buf.as_mut_slice()).expect("Found no data!");

    true
}

pub fn stop() -> bool {
    true
}
