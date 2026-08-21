import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAIDiagnosis(
  mode: "easy" | "deep",
  vehicleInfo: string,
  sensorData: string
) {
  const systemInstruction = mode === "easy" 
    ? "You are GarageOS Easy Fix AI. Provide short, actionable mechanical advice (<50 words) based on symptoms. Focus on simple checks like fluids, fuses, or visual inspections."
    : "You are GarageOS Deep Dive AI. Analyze raw sensor logs and telemetry to detect drifts or anomalies. Suggest advanced fixes, part upgrades, or ECU tuning recommendations. Be technical and precise.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Vehicle: ${vehicleInfo}\nSensor Data: ${sensorData}\n\nProvide a diagnosis and recommendation.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ["Info", "Warning", "Critical"] },
            code: { type: Type.STRING, description: "OBD2 code if applicable" }
          },
          required: ["diagnosis", "recommendation", "severity"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Diagnosis Error:", error);
    return {
      diagnosis: "Unable to process AI diagnosis offline.",
      recommendation: "Check manual logs or reconnect for sync.",
      severity: "Warning"
    };
  }
}
