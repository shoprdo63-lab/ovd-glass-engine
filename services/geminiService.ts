import { GoogleGenAI, Type } from "@google/genai";
import { GlassSettings, DEFAULT_SETTINGS } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGlassStyle = async (prompt: string): Promise<GlassSettings> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate CSS glassmorphism settings based on this description: "${prompt}". 
      
      Guidelines:
      - 'blur': 0 to 40 (pixels)
      - 'transparency': 0.0 to 0.9 (opacity of the background color)
      - 'saturation': 100 to 200 (backdrop-filter saturation percentage)
      - 'color': Hex color code (e.g. #ffffff or #000000)
      - 'outlineOpacity': 0.0 to 1.0 (border visibility)
      - 'shadowBlur': 0 to 100 (pixels)
      - 'shadowOpacity': 0.0 to 1.0
      - 'lightAngle': 0 to 360 (degrees, source of light for borders)
      - 'borderRadius': 0 to 50 (pixels)
      
      Ensure the result is aesthetically pleasing and readable.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            blur: { type: Type.NUMBER },
            transparency: { type: Type.NUMBER },
            saturation: { type: Type.NUMBER },
            color: { type: Type.STRING },
            outlineOpacity: { type: Type.NUMBER },
            shadowBlur: { type: Type.NUMBER },
            shadowOpacity: { type: Type.NUMBER },
            lightAngle: { type: Type.NUMBER },
            borderRadius: { type: Type.NUMBER },
          },
          required: ["blur", "transparency", "saturation", "color", "outlineOpacity", "shadowBlur", "shadowOpacity", "lightAngle", "borderRadius"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    const data = JSON.parse(jsonText) as Partial<GlassSettings>;
    
    // Merge with defaults to ensure safety
    return { ...DEFAULT_SETTINGS, ...data };

  } catch (error) {
    console.error("Failed to generate style:", error);
    // Fallback or re-throw depending on desired UX
    throw error;
  }
};