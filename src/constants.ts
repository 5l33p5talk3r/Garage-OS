import { SubscriptionTier } from "./types";
export const TIER_CONFIG: Record<SubscriptionTier, { vehicleLimit: number; features: string[] }> = {
  basic: { vehicleLimit: 3, features: ["garage", "diagnosis", "stats", "chat", "upgrades", "compare"] },
  pro: { vehicleLimit: 10, features: ["garage", "diagnosis", "stats", "tuning", "chat", "upgrades", "deep_dive", "reminders", "compare"] },
  platinum: { vehicleLimit: 999, features: ["garage", "diagnosis", "stats", "tuning", "chat", "upgrades", "deep_dive", "reminders", "key_programming", "compare"] }
};
