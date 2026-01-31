export interface GlassSettings {
  blur: number; // 0-40px
  transparency: number; // 0-1
  saturation: number; // 100-200%
  color: string; // Hex
  outlineOpacity: number; // 0-1
  shadowBlur: number; // 0-100px
  shadowOpacity: number; // 0-1
  lightAngle: number; // 0-360 degrees
  borderRadius: number; // 0-100px
}

export const DEFAULT_SETTINGS: GlassSettings = {
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

export type PresetCategory = 
  | 'All'
  | 'OS Styles' 
  | 'Cyberpunk' 
  | 'Nature' 
  | 'Luxury' 
  | 'Dark Matter' 
  | 'Gradients' 
  | 'Retro' 
  | 'Industrial' 
  | 'Pastels' 
  | 'HUD';

export interface Preset {
  name: string;
  category: PresetCategory;
  settings: GlassSettings;
}

export interface WaveSettings {
  height: number;
  frequency: number;
  complexity: number;
  color: string;
  opacity: number;
}

export const DEFAULT_WAVE_SETTINGS: WaveSettings = {
  height: 150,
  frequency: 2,
  complexity: 3,
  color: '#00ffff',
  opacity: 1,
};

export interface AIGenerationResponse {
  settings: GlassSettings;
  explanation: string;
}