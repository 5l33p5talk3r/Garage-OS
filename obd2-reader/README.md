# GarageOS OBD2 Reader (Rust)

The **GarageOS OBD2 Reader** is an efficient backend layer written in Rust designed to stream raw hex frames from ELM327-compatible USB dongles.

## Features

- **Protocol Support**: Fully supports Auto-detection, **ISO 9141**, and multiple **CAN Bus** identifiers (11-bit / 29-bit, 250kbps / 500kbps).
- **USB Hardware**: Reads telemetry sequences seamlessly from RS232 USB adapters (like `/dev/ttyUSB0` or `/dev/cu.usbmodemXXXX`).
- **Memory Buffer**: Features a thread-safe local memory buffer utilizing `Arc<Mutex<Vec<String>>>` to store up to 5000 raw hex frames.
- **Cross-Platform**: Uses the reliable `serialport` crate to ensure out-of-the-box compatibility with:
  - **Linux** (`/dev/ttyUSB0`)
  - **macOS** (`/dev/cu.usbmodemXXXX`)
  - **Windows** (`COMx`)
  - **iOS**: (Requires jailbreak to access explicit `/dev/tty.*` paths or external accessory framework bridges)

## Setup & Running

**Prerequisites:** You need to have the Rust toolchain installed.

1. Ensure your OBD2-to-USB adapter is plugged in to the vehicle port and to your laptop/device.
2. In the terminal:

```bash
cd obd2-reader
cargo run
```

The daemon will autodetect the port, initialize the ELM327 chip (setting up the ISO9141 / CAN protocols), issue the `ATMA` mode, and start printing hex frame metrics to stdout.
