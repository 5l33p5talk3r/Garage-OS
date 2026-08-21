use std::collections::HashMap;

pub struct DtcDecoder {
    descriptions: HashMap<String, String>,
}

impl DtcDecoder {
    pub fn new() -> Self {
        let mut descriptions = HashMap::new();
        // Standard P-codes
        descriptions.insert("P0100".to_string(), "Mass or Volume Air Flow Circuit Malfunction".to_string());
        descriptions.insert("P0101".to_string(), "Mass or Volume Air Flow Circuit Range/Performance".to_string());
        descriptions.insert("P0102".to_string(), "Mass or Volume Air Flow Circuit Low Input".to_string());
        descriptions.insert("P0104".to_string(), "Mass or Volume Air Flow Circuit Intermittent".to_string());
        descriptions.insert("P0110".to_string(), "Intake Air Temperature Circuit Malfunction".to_string());
        descriptions.insert("P0113".to_string(), "Intake Air Temperature Circuit High Input".to_string());
        descriptions.insert("P0300".to_string(), "Random/Multiple Cylinder Misfire Detected".to_string());
        descriptions.insert("P0301".to_string(), "Cylinder 1 Misfire Detected".to_string());
        descriptions.insert("P0420".to_string(), "Catalyst System Efficiency Below Threshold (Bank 1)".to_string());
        descriptions.insert("P0442".to_string(), "Evaporative Emission Control System Leak Detected (small leak)".to_string());
        descriptions.insert("P0500".to_string(), "Vehicle Speed Sensor Malfunction".to_string());
        
        // C-codes (Chassis)
        descriptions.insert("C0220".to_string(), "ABS Wheel Speed Sensor Malfunction".to_string());
        
        // B-codes (Body)
        descriptions.insert("B1000".to_string(), "Airbag Electronic Control Unit Malfunction".to_string());
        
        // U-codes (Network)
        descriptions.insert("U0100".to_string(), "Lost Communication with ECM/PCM 'A'".to_string());
        
        Self { descriptions }
    }

    /// Decodes a 2-byte raw hex OBD2 trouble code into its standard 5-character string (e.g. "0104" -> "P0104").
    /// According to the SAE J2012 standard:
    /// Format: High two bits of first byte define the system (P, C, B, U)
    /// Next two bits define category (0, 1, 2, 3)
    /// The remaining 12 bits are 3 hex characters.
    pub fn decode_raw_hex(&self, hex_code: &str) -> Option<String> {
        if hex_code.len() != 4 {
            return None;
        }

        let decoded_bytes = hex::decode(hex_code).ok()?;
        if decoded_bytes.len() != 2 {
            return None;
        }

        let b1 = decoded_bytes[0];
        let b2 = decoded_bytes[1];

        // First character
        let sys = (b1 >> 6) & 0b11;
        let c1 = match sys {
            0 => 'P',
            1 => 'C',
            2 => 'B',
            3 => 'U',
            _ => 'P',
        };

        // Second character
        let c2 = ((b1 >> 4) & 0b11).to_string();

        // Third character
        let c3 = format!("{:X}", b1 & 0x0F);
        
        // Fourth and Fifth characters
        let c45 = format!("{:02X}", b2);

        let dtc = format!("{}{}{}{}", c1, c2, c3, c45);
        Some(dtc)
    }

    /// Translates a standard DTC (e.g. "P0104") into a human-readable description.
    pub fn get_description(&self, dtc: &str) -> String {
        self.descriptions
            .get(dtc)
            .cloned()
            .unwrap_or_else(|| "Unknown Diagnostic Trouble Code".to_string())
    }
}
