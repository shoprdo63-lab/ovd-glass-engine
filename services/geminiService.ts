import { GoogleGenAI, Type } from "@google/genai";

// Define local interface to avoid dependency on types.ts
interface LocalGlassSettings {
  blur: number;
  transparency: number;
  saturation: number;
  color: string;
  outlineOpacity: number;
  shadowBlur: number;
  shadowOpacity: number;
  lightAngle: number;
  borderRadius: number;
}

const DEFAULT_SETTINGS: LocalGlassSettings = {
  blur: 16,
  transparency: 0.25,
  saturation: 110,
  color: '#ffffff',
  outlineOpacity: 0.3,
  shadowBlur: 20,
  shadowOpacity: 0.15,
  lightAngle: 135,
  borderRadius: 24,
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGlassStyle = async (prompt: string): Promise<LocalGlassSettings> => {
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
    
    const data = JSON.parse(jsonText) as Partial<LocalGlassSettings>;
    
    // Merge with defaults to ensure safety
    return { ...DEFAULT_SETTINGS, ...data };

  } catch (error) {
    console.error("Failed to generate style:", error);
    throw error;
  }
};