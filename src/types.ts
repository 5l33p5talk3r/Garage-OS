export interface Diagnosis {
  timestamp: string;
  issue_code: string;
  severity_level: "Info" | "Warning" | "Critical";
  description: string;
}

export interface Parameter {
  name: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
}

export interface Reminder {
  id: string;
  type: "oil_change" | "tire_service" | "annual_tuneup" | "other";
  title: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
}

export interface TuningProfile {
  platform: string;
  stage: number;
  boostLimit: number;
  revLimit: number;
  protectionFeatures: {
    knockDetection: boolean;
    leanProtection: boolean;
    overboostProtection: boolean;
  };
  lastWrite?: string;
  liveSensors?: LiveSensorConfig[];
  ecuMap?: Record<string, number>;
}

export interface LiveSensorConfig {
  id: string;
  label: string;
  unit: string;
  color: string;
  min: number;
  max: number;
  enabled: boolean;
  showChart: boolean;
}

export interface SavedLog {
  id: string;
  timestamp: string;
  duration: number;
  data: any[];
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  expirationDate: string;
  deductible: number;
}

export interface WarrantyInfo {
  provider: string;
  coverageType: string;
  expirationDate: string;
  expirationMileage: number;
  coveredParts: string[];
}

export interface ServiceRecord {
  id: string;
  date: string;
  description: string;
  cost: number;
  parts: string;
  notes?: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  last_updated: string;
  mileage?: number;
  diagnoses: Diagnosis[];
  parameters: Parameter[];
  reminders: Reminder[];
  tuningProfile?: TuningProfile;
  savedLogs?: SavedLog[];
  photoUrl?: string;
  insurance?: InsuranceInfo;
  warranty?: WarrantyInfo;
  serviceHistory?: ServiceRecord[];
}

export interface ScanResult {
  id: string;
  vehicleId: string;
  userId: string;
  timestamp: string;
  mode: "quick" | "full" | "custom" | "all_systems";
  parametersScanned: string[];
  findings: Diagnosis[];
}

export type TabType = "garage" | "diagnosis" | "symptom_checker" | "stats" | "tuning" | "chat" | "upgrades" | "reminders" | "key_programming" | "subscription" | "compare";

export type SubscriptionTier = "basic" | "pro" | "platinum";

export interface DiagnosticPreset {
  id: string;
  name: string;
  description?: string;
  pids: string[];
}

export interface UserProfile {
  email: string;
  tier: SubscriptionTier;
  vehicleLimit: number;
  createdAt: string;
  preferences?: {
    customScanParams?: string[];
    fullScanParams?: string[];
    topologyScanParams?: string[];
    dtcSearchHistory?: string[];
    liveDataParams?: string[];
    diagnosticPresets?: DiagnosticPreset[];
    units?: "metric" | "imperial";
  };
}
