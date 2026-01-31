import { Preset, GlassSettings } from "../types";

const createPreset = (name: string, category: any, updates: Partial<GlassSettings>): Preset => ({
  name,
  category,
  settings: {
    blur: 16,
    transparency: 0.25,
    saturation: 110,
    color: '#ffffff',
    outlineOpacity: 0.3,
    shadowBlur: 20,
    shadowOpacity: 0.15,
    lightAngle: 135,
    borderRadius: 24,
    ...updates
  }
});

export const OVD_PRESETS: Preset[] = [
  // OS Styles
  createPreset("Cupertino Frost", "OS Styles", { blur: 25, transparency: 0.65, saturation: 180, color: "#ffffff", outlineOpacity: 0.4, borderRadius: 20 }),
  createPreset("Redmond Acrylic", "OS Styles", { blur: 12, transparency: 0.4, saturation: 105, color: "#f0f0f0", outlineOpacity: 0.1, borderRadius: 4, shadowBlur: 10 }),
  createPreset("Vision Depth", "OS Styles", { blur: 35, transparency: 0.1, saturation: 120, color: "#ffffff", outlineOpacity: 0.6, borderRadius: 32, shadowOpacity: 0.3 }),
  createPreset("Material You", "OS Styles", { blur: 0, transparency: 0.9, saturation: 100, color: "#dbeafe", outlineOpacity: 0, borderRadius: 28 }),
  createPreset("Linux Gnome", "OS Styles", { blur: 10, transparency: 0.8, saturation: 100, color: "#333333", outlineOpacity: 0.1, borderRadius: 12 }),
  
  // Cyberpunk
  createPreset("Neon City", "Cyberpunk", { blur: 4, transparency: 0.2, saturation: 150, color: "#00ffcc", outlineOpacity: 0.8, shadowBlur: 30, shadowOpacity: 0.5, lightAngle: 45 }),
  createPreset("Night City Rain", "Cyberpunk", { blur: 8, transparency: 0.1, saturation: 140, color: "#ff00ff", outlineOpacity: 0.5, borderRadius: 0, shadowBlur: 50 }),
  createPreset("Matrix Glitch", "Cyberpunk", { blur: 2, transparency: 0.05, saturation: 200, color: "#00ff00", outlineOpacity: 1, borderRadius: 4, lightAngle: 90 }),
  createPreset("Arasaka Steel", "Cyberpunk", { blur: 20, transparency: 0.9, saturation: 0, color: "#1a1a1a", outlineOpacity: 0.4, borderRadius: 0 }),
  createPreset("Netrunner", "Cyberpunk", { blur: 6, transparency: 0.3, saturation: 180, color: "#7000ff", outlineOpacity: 0.9, borderRadius: 12 }),

  // Nature
  createPreset("Glacial Ice", "Nature", { blur: 15, transparency: 0.4, saturation: 110, color: "#e0f2fe", outlineOpacity: 0.5, borderRadius: 16 }),
  createPreset("Morning Mist", "Nature", { blur: 40, transparency: 0.3, saturation: 100, color: "#ffffff", outlineOpacity: 0.1, borderRadius: 50 }),
  createPreset("Deep Ocean", "Nature", { blur: 10, transparency: 0.6, saturation: 120, color: "#0c4a6e", outlineOpacity: 0.2, borderRadius: 24 }),
  createPreset("Raindrop", "Nature", { blur: 5, transparency: 0.1, saturation: 130, color: "#a5f3fc", outlineOpacity: 0.6, borderRadius: 99, shadowBlur: 5 }),
  createPreset("Volcanic Glass", "Nature", { blur: 8, transparency: 0.8, saturation: 110, color: "#18181b", outlineOpacity: 0.3, borderRadius: 12 }),

  // Luxury
  createPreset("Gold Leaf", "Luxury", { blur: 25, transparency: 0.15, saturation: 110, color: "#fbbf24", outlineOpacity: 0.7, borderRadius: 8, shadowBlur: 40 }),
  createPreset("Onyx Slab", "Luxury", { blur: 30, transparency: 0.9, saturation: 100, color: "#000000", outlineOpacity: 0.3, borderRadius: 0, lightAngle: 180 }),
  createPreset("Pearl Finish", "Luxury", { blur: 20, transparency: 0.7, saturation: 105, color: "#fff1f2", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Diamond Cut", "Luxury", { blur: 0, transparency: 0.1, saturation: 150, color: "#ffffff", outlineOpacity: 0.9, borderRadius: 2, lightAngle: 45 }),
  createPreset("Sapphire", "Luxury", { blur: 12, transparency: 0.4, saturation: 140, color: "#1e3a8a", outlineOpacity: 0.5, borderRadius: 16 }),

  // Dark Matter
  createPreset("Void", "Dark Matter", { blur: 40, transparency: 0.05, saturation: 100, color: "#000000", outlineOpacity: 0.1, shadowBlur: 100, shadowOpacity: 0.8 }),
  createPreset("Stealth Bomber", "Dark Matter", { blur: 5, transparency: 0.8, saturation: 0, color: "#171717", outlineOpacity: 0.2, borderRadius: 4, lightAngle: 0 }),
  createPreset("Abyss", "Dark Matter", { blur: 18, transparency: 0.3, saturation: 120, color: "#0f172a", outlineOpacity: 0.1, borderRadius: 20 }),
  createPreset("Obsidian", "Dark Matter", { blur: 3, transparency: 0.95, saturation: 100, color: "#000000", outlineOpacity: 0.8, borderRadius: 12, lightAngle: 300 }),
  createPreset("Shadow Realm", "Dark Matter", { blur: 15, transparency: 0.2, saturation: 50, color: "#262626", outlineOpacity: 0.3, shadowOpacity: 1 }),

  // Gradients
  createPreset("Sunset Vibe", "Gradients", { blur: 24, transparency: 0.4, saturation: 160, color: "#f43f5e", outlineOpacity: 0.4, borderRadius: 24 }),
  createPreset("Aurora Borealis", "Gradients", { blur: 16, transparency: 0.3, saturation: 150, color: "#10b981", outlineOpacity: 0.5, borderRadius: 24 }),
  createPreset("Lavender Dream", "Gradients", { blur: 20, transparency: 0.5, saturation: 110, color: "#c084fc", outlineOpacity: 0.3, borderRadius: 24 }),
  createPreset("Citrus Punch", "Gradients", { blur: 10, transparency: 0.6, saturation: 180, color: "#facc15", outlineOpacity: 0.4, borderRadius: 24 }),
  createPreset("Cool Breeze", "Gradients", { blur: 22, transparency: 0.2, saturation: 130, color: "#38bdf8", outlineOpacity: 0.5, borderRadius: 24 }),

  // Retro
  createPreset("Vaporwave", "Retro", { blur: 8, transparency: 0.5, saturation: 140, color: "#f472b6", outlineOpacity: 0.8, borderRadius: 0, lightAngle: 90 }),
  createPreset("CRT Monitor", "Retro", { blur: 2, transparency: 0.1, saturation: 100, color: "#22c55e", outlineOpacity: 0.4, borderRadius: 40 }),
  createPreset("80s Arcade", "Retro", { blur: 5, transparency: 0.8, saturation: 200, color: "#6366f1", outlineOpacity: 1, borderRadius: 8 }),
  createPreset("VHS Tape", "Retro", { blur: 1, transparency: 0.9, saturation: 50, color: "#1f2937", outlineOpacity: 0.2, borderRadius: 2 }),
  createPreset("Synthpop", "Retro", { blur: 14, transparency: 0.4, saturation: 160, color: "#a855f7", outlineOpacity: 0.6, borderRadius: 16 }),

  // Industrial
  createPreset("Brushed Steel", "Industrial", { blur: 5, transparency: 0.8, saturation: 0, color: "#94a3b8", outlineOpacity: 0.2, borderRadius: 4 }),
  createPreset("Safety Glass", "Industrial", { blur: 0, transparency: 0.2, saturation: 100, color: "#ffffff", outlineOpacity: 0.1, borderRadius: 0 }),
  createPreset("Blueprint", "Industrial", { blur: 10, transparency: 0.9, saturation: 100, color: "#1e3a8a", outlineOpacity: 0.5, borderRadius: 0 }),
  createPreset("Concrete", "Industrial", { blur: 30, transparency: 0.95, saturation: 0, color: "#525252", outlineOpacity: 0, borderRadius: 0 }),
  createPreset("Polycarbonate", "Industrial", { blur: 4, transparency: 0.3, saturation: 100, color: "#e2e8f0", outlineOpacity: 0.3, borderRadius: 8 }),

  // Pastels
  createPreset("Baby Blue", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#bfdbfe", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Soft Pink", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#fbcfe8", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Mint Fresh", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#bbf7d0", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Cream Soda", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#fef3c7", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Lilac", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#e9d5ff", outlineOpacity: 0.4, borderRadius: 30 }),

  // HUD
  createPreset("Iron Man", "HUD", { blur: 0, transparency: 0.1, saturation: 120, color: "#fcd34d", outlineOpacity: 0.9, borderRadius: 0, lightAngle: 45 }),
  createPreset("Sci-Fi Blue", "HUD", { blur: 2, transparency: 0.2, saturation: 150, color: "#0ea5e9", outlineOpacity: 0.8, borderRadius: 6, shadowBlur: 15 }),
  createPreset("Target Lock", "HUD", { blur: 0, transparency: 0.05, saturation: 100, color: "#ef4444", outlineOpacity: 1, borderRadius: 0 }),
  createPreset("Data Stream", "HUD", { blur: 4, transparency: 0.15, saturation: 100, color: "#22d3ee", outlineOpacity: 0.6, borderRadius: 4 }),
  createPreset("Warning", "HUD", { blur: 5, transparency: 0.2, saturation: 150, color: "#f97316", outlineOpacity: 0.8, borderRadius: 0 }),
];
