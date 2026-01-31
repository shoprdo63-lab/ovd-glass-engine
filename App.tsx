import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Wand2, Loader2, Share2, Shuffle, Search, Check, 
  Copy, Terminal, Download, RefreshCw, BookOpen, TrendingUp, Zap, 
  Shield, FileText, Info 
} from 'lucide-react';
import { generateGlassStyle } from './services/geminiService';

// --- TYPES & CONSTANTS (Inlined for Safety) ---

interface GlassSettings {
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

type PresetCategory = 'All' | 'OS Styles' | 'Cyberpunk' | 'Nature' | 'Luxury' | 'Dark Matter' | 'Gradients' | 'Retro' | 'Industrial' | 'Pastels' | 'HUD';

interface Preset {
  name: string;
  category: PresetCategory;
  settings: GlassSettings;
}

const DEFAULT_SETTINGS: GlassSettings = {
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

// --- DATA: 50 PRESETS (Inlined) ---
const createPreset = (name: string, category: any, updates: Partial<GlassSettings>): Preset => ({
  name,
  category,
  settings: { ...DEFAULT_SETTINGS, ...updates }
});

const OVD_PRESETS: Preset[] = [
  createPreset("Cupertino Frost", "OS Styles", { blur: 25, transparency: 0.65, saturation: 180, color: "#ffffff", outlineOpacity: 0.4, borderRadius: 20 }),
  createPreset("Redmond Acrylic", "OS Styles", { blur: 12, transparency: 0.4, saturation: 105, color: "#f0f0f0", outlineOpacity: 0.1, borderRadius: 4, shadowBlur: 10 }),
  createPreset("Vision Depth", "OS Styles", { blur: 35, transparency: 0.1, saturation: 120, color: "#ffffff", outlineOpacity: 0.6, borderRadius: 32, shadowOpacity: 0.3 }),
  createPreset("Material You", "OS Styles", { blur: 0, transparency: 0.9, saturation: 100, color: "#dbeafe", outlineOpacity: 0, borderRadius: 28 }),
  createPreset("Linux Gnome", "OS Styles", { blur: 10, transparency: 0.8, saturation: 100, color: "#333333", outlineOpacity: 0.1, borderRadius: 12 }),
  createPreset("Neon City", "Cyberpunk", { blur: 4, transparency: 0.2, saturation: 150, color: "#00ffcc", outlineOpacity: 0.8, shadowBlur: 30, shadowOpacity: 0.5, lightAngle: 45 }),
  createPreset("Night City Rain", "Cyberpunk", { blur: 8, transparency: 0.1, saturation: 140, color: "#ff00ff", outlineOpacity: 0.5, borderRadius: 0, shadowBlur: 50 }),
  createPreset("Matrix Glitch", "Cyberpunk", { blur: 2, transparency: 0.05, saturation: 200, color: "#00ff00", outlineOpacity: 1, borderRadius: 4, lightAngle: 90 }),
  createPreset("Arasaka Steel", "Cyberpunk", { blur: 20, transparency: 0.9, saturation: 0, color: "#1a1a1a", outlineOpacity: 0.4, borderRadius: 0 }),
  createPreset("Netrunner", "Cyberpunk", { blur: 6, transparency: 0.3, saturation: 180, color: "#7000ff", outlineOpacity: 0.9, borderRadius: 12 }),
  createPreset("Glacial Ice", "Nature", { blur: 15, transparency: 0.4, saturation: 110, color: "#e0f2fe", outlineOpacity: 0.5, borderRadius: 16 }),
  createPreset("Morning Mist", "Nature", { blur: 40, transparency: 0.3, saturation: 100, color: "#ffffff", outlineOpacity: 0.1, borderRadius: 50 }),
  createPreset("Deep Ocean", "Nature", { blur: 10, transparency: 0.6, saturation: 120, color: "#0c4a6e", outlineOpacity: 0.2, borderRadius: 24 }),
  createPreset("Raindrop", "Nature", { blur: 5, transparency: 0.1, saturation: 130, color: "#a5f3fc", outlineOpacity: 0.6, borderRadius: 99, shadowBlur: 5 }),
  createPreset("Volcanic Glass", "Nature", { blur: 8, transparency: 0.8, saturation: 110, color: "#18181b", outlineOpacity: 0.3, borderRadius: 12 }),
  createPreset("Gold Leaf", "Luxury", { blur: 25, transparency: 0.15, saturation: 110, color: "#fbbf24", outlineOpacity: 0.7, borderRadius: 8, shadowBlur: 40 }),
  createPreset("Onyx Slab", "Luxury", { blur: 30, transparency: 0.9, saturation: 100, color: "#000000", outlineOpacity: 0.3, borderRadius: 0, lightAngle: 180 }),
  createPreset("Pearl Finish", "Luxury", { blur: 20, transparency: 0.7, saturation: 105, color: "#fff1f2", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Diamond Cut", "Luxury", { blur: 0, transparency: 0.1, saturation: 150, color: "#ffffff", outlineOpacity: 0.9, borderRadius: 2, lightAngle: 45 }),
  createPreset("Sapphire", "Luxury", { blur: 12, transparency: 0.4, saturation: 140, color: "#1e3a8a", outlineOpacity: 0.5, borderRadius: 16 }),
  createPreset("Void", "Dark Matter", { blur: 40, transparency: 0.05, saturation: 100, color: "#000000", outlineOpacity: 0.1, shadowBlur: 100, shadowOpacity: 0.8 }),
  createPreset("Stealth Bomber", "Dark Matter", { blur: 5, transparency: 0.8, saturation: 0, color: "#171717", outlineOpacity: 0.2, borderRadius: 4, lightAngle: 0 }),
  createPreset("Abyss", "Dark Matter", { blur: 18, transparency: 0.3, saturation: 120, color: "#0f172a", outlineOpacity: 0.1, borderRadius: 20 }),
  createPreset("Obsidian", "Dark Matter", { blur: 3, transparency: 0.95, saturation: 100, color: "#000000", outlineOpacity: 0.8, borderRadius: 12, lightAngle: 300 }),
  createPreset("Shadow Realm", "Dark Matter", { blur: 15, transparency: 0.2, saturation: 50, color: "#262626", outlineOpacity: 0.3, shadowOpacity: 1 }),
  createPreset("Sunset Vibe", "Gradients", { blur: 24, transparency: 0.4, saturation: 160, color: "#f43f5e", outlineOpacity: 0.4, borderRadius: 24 }),
  createPreset("Aurora Borealis", "Gradients", { blur: 16, transparency: 0.3, saturation: 150, color: "#10b981", outlineOpacity: 0.5, borderRadius: 24 }),
  createPreset("Lavender Dream", "Gradients", { blur: 20, transparency: 0.5, saturation: 110, color: "#c084fc", outlineOpacity: 0.3, borderRadius: 24 }),
  createPreset("Citrus Punch", "Gradients", { blur: 10, transparency: 0.6, saturation: 180, color: "#facc15", outlineOpacity: 0.4, borderRadius: 24 }),
  createPreset("Cool Breeze", "Gradients", { blur: 22, transparency: 0.2, saturation: 130, color: "#38bdf8", outlineOpacity: 0.5, borderRadius: 24 }),
  createPreset("Vaporwave", "Retro", { blur: 8, transparency: 0.5, saturation: 140, color: "#f472b6", outlineOpacity: 0.8, borderRadius: 0, lightAngle: 90 }),
  createPreset("CRT Monitor", "Retro", { blur: 2, transparency: 0.1, saturation: 100, color: "#22c55e", outlineOpacity: 0.4, borderRadius: 40 }),
  createPreset("80s Arcade", "Retro", { blur: 5, transparency: 0.8, saturation: 200, color: "#6366f1", outlineOpacity: 1, borderRadius: 8 }),
  createPreset("VHS Tape", "Retro", { blur: 1, transparency: 0.9, saturation: 50, color: "#1f2937", outlineOpacity: 0.2, borderRadius: 2 }),
  createPreset("Synthpop", "Retro", { blur: 14, transparency: 0.4, saturation: 160, color: "#a855f7", outlineOpacity: 0.6, borderRadius: 16 }),
  createPreset("Brushed Steel", "Industrial", { blur: 5, transparency: 0.8, saturation: 0, color: "#94a3b8", outlineOpacity: 0.2, borderRadius: 4 }),
  createPreset("Safety Glass", "Industrial", { blur: 0, transparency: 0.2, saturation: 100, color: "#ffffff", outlineOpacity: 0.1, borderRadius: 0 }),
  createPreset("Blueprint", "Industrial", { blur: 10, transparency: 0.9, saturation: 100, color: "#1e3a8a", outlineOpacity: 0.5, borderRadius: 0 }),
  createPreset("Concrete", "Industrial", { blur: 30, transparency: 0.95, saturation: 0, color: "#525252", outlineOpacity: 0, borderRadius: 0 }),
  createPreset("Polycarbonate", "Industrial", { blur: 4, transparency: 0.3, saturation: 100, color: "#e2e8f0", outlineOpacity: 0.3, borderRadius: 8 }),
  createPreset("Baby Blue", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#bfdbfe", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Soft Pink", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#fbcfe8", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Mint Fresh", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#bbf7d0", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Cream Soda", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#fef3c7", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Lilac", "Pastels", { blur: 18, transparency: 0.5, saturation: 105, color: "#e9d5ff", outlineOpacity: 0.4, borderRadius: 30 }),
  createPreset("Iron Man", "HUD", { blur: 0, transparency: 0.1, saturation: 120, color: "#fcd34d", outlineOpacity: 0.9, borderRadius: 0, lightAngle: 45 }),
  createPreset("Sci-Fi Blue", "HUD", { blur: 2, transparency: 0.2, saturation: 150, color: "#0ea5e9", outlineOpacity: 0.8, borderRadius: 6, shadowBlur: 15 }),
  createPreset("Target Lock", "HUD", { blur: 0, transparency: 0.05, saturation: 100, color: "#ef4444", outlineOpacity: 1, borderRadius: 0 }),
  createPreset("Data Stream", "HUD", { blur: 4, transparency: 0.15, saturation: 100, color: "#22d3ee", outlineOpacity: 0.6, borderRadius: 4 }),
  createPreset("Warning", "HUD", { blur: 5, transparency: 0.2, saturation: 150, color: "#f97316", outlineOpacity: 0.8, borderRadius: 0 }),
];

// --- COMPONENTS ---

// 1. Background
const Background: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),rgba(15,23,42,1))]" />
    <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob" />
    <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-32 left-[20%] w-[50vw] h-[50vw] bg-pink-600/30 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob animation-delay-4000" />
  </div>
);

// 2. Control Panel
const Slider = ({ label, value, min, max, step = 1, onChange, unit = '' }: any) => (
  <div className="mb-4 group">
    <div className="flex justify-between mb-1.5 items-end">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">{label}</label>
      <span className="text-[10px] text-slate-600 font-mono group-hover:text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer hover:bg-slate-700 transition-all accent-cyan-500"
    />
  </div>
);

const ControlPanel: React.FC<{ settings: GlassSettings; onChange: (s: GlassSettings) => void }> = ({ settings, onChange }) => {
  const [activeTab, setActiveTab] = useState<'controls' | 'library'>('library');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory>('All');

  const update = (key: keyof GlassSettings, value: string | number) => {
    onChange({ ...settings, [key]: value });
  };

  const handleAIGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const newSettings = await generateGlassStyle(prompt);
      onChange(newSettings as any);
      setActiveTab('controls');
    } catch (e) {
      setError("Failed to generate. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomize = () => {
    const randomPreset = OVD_PRESETS[Math.floor(Math.random() * OVD_PRESETS.length)];
    onChange({ ...randomPreset.settings, blur: Math.random() * 20 + 5 });
  };

  const handleShare = () => {
    const json = JSON.stringify(settings);
    const b64 = btoa(json);
    const url = new URL(window.location.href);
    url.searchParams.set('config', b64);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredPresets = OVD_PRESETS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(OVD_PRESETS.map(p => p.category)))];

  return (
    <div className="flex flex-col min-h-0">
      <div className="flex p-1 bg-slate-900 rounded-lg mb-6 border border-slate-800/50">
        <button onClick={() => setActiveTab('library')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'library' ? 'bg-[#121212] text-white shadow-sm border border-slate-700/50' : 'text-slate-500 hover:text-slate-300'}`}>Library</button>
        <button onClick={() => setActiveTab('controls')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'controls' ? 'bg-[#121212] text-white shadow-sm border border-slate-700/50' : 'text-slate-500 hover:text-slate-300'}`}>Controls</button>
      </div>

      {activeTab === 'library' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
           <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input type="text" placeholder="Search styles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div className="flex flex-wrap gap-1.5">
                {categories.map((cat: any) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider border transition-all ${selectedCategory === cat ? 'bg-cyan-950/50 border-cyan-800 text-cyan-400' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>{cat}</button>
                ))}
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{filteredPresets.length} Presets</span>
                    <button onClick={handleRandomize} className="text-[10px] text-cyan-500 hover:text-cyan-400 flex items-center gap-1"><Shuffle className="w-3 h-3" /> Random</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {filteredPresets.map((preset, idx) => (
                        <button key={idx} onClick={() => { onChange(preset.settings); setActiveTab('controls'); }} className="group flex flex-col items-start p-2 rounded bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800 hover:border-cyan-500/30 transition-all text-left">
                            <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white transition-colors truncate w-full">{preset.name}</span>
                            <span className="text-[8px] text-slate-600 uppercase tracking-wider">{preset.category}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {activeTab === 'controls' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-3 bg-gradient-to-b from-slate-900 to-[#121212] rounded-lg border border-slate-800 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity blur duration-500"></div>
                <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                        <Wand2 className="w-3 h-3 text-cyan-400" />
                        <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200 uppercase tracking-widest">AI Generator</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Describe it..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50" onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()} />
                        <button onClick={handleAIGenerate} disabled={isGenerating || !prompt.trim()} className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded px-2 flex items-center justify-center disabled:opacity-50">
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-[9px] mt-1.5">{error}</p>}
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/50">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Parameters</h3>
                    <button onClick={handleShare} className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                        {copiedLink ? <Check className="w-3 h-3 text-green-500" /> : <Share2 className="w-3 h-3" />}
                        {copiedLink ? 'Copied' : 'Share'}
                    </button>
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tint</label>
                        <span className="text-[10px] font-mono text-slate-600">{settings.color}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="h-8 w-full rounded bg-slate-900 border border-slate-800 relative overflow-hidden group">
                             <input type="color" value={settings.color} onChange={(e) => update('color', e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0" />
                         </div>
                    </div>
                </div>
                <Slider label="Blur" value={settings.blur} min={0} max={40} unit="px" onChange={(v:number) => update('blur', v)} />
                <Slider label="Transparency" value={settings.transparency} min={0} max={1} step={0.01} onChange={(v:number) => update('transparency', v)} />
                <Slider label="Saturation" value={settings.saturation} min={0} max={200} unit="%" onChange={(v:number) => update('saturation', v)} />
                <div className="h-px bg-slate-800/50 my-2" />
                <Slider label="Radius" value={settings.borderRadius} min={0} max={100} unit="px" onChange={(v:number) => update('borderRadius', v)} />
                <Slider label="Border Alpha" value={settings.outlineOpacity} min={0} max={1} step={0.01} onChange={(v:number) => update('outlineOpacity', v)} />
                <Slider label="Light Angle" value={settings.lightAngle} min={0} max={360} unit="°" onChange={(v:number) => update('lightAngle', v)} />
                <div className="h-px bg-slate-800/50 my-2" />
                <Slider label="Shadow Size" value={settings.shadowBlur} min={0} max={100} unit="px" onChange={(v:number) => update('shadowBlur', v)} />
                <Slider label="Shadow Alpha" value={settings.shadowOpacity} min={0} max={1} step={0.01} onChange={(v:number) => update('shadowOpacity', v)} />
            </div>
        </div>
      )}
    </div>
  );
};

// 3. Glass Preview
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 255, g: 255, b: 255 };
};

const GlassPreview: React.FC<{ settings: GlassSettings }> = ({ settings }) => {
  const { blur, transparency, saturation, color, outlineOpacity, shadowBlur, shadowOpacity, lightAngle, borderRadius } = settings;
  const rgb = hexToRgb(color);
  const calculateBorderGradient = useMemo(() => `linear-gradient(${lightAngle}deg, rgba(255, 255, 255, ${outlineOpacity}) 0%, rgba(255, 255, 255, ${outlineOpacity * 0.1}) 100%)`, [lightAngle, outlineOpacity]);
  
  const glassStyle: React.CSSProperties = {
    background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    borderRadius: `${borderRadius}px`,
    boxShadow: `0 0 0 1px rgba(255,255,255, ${outlineOpacity * 0.1}) inset, 0 ${shadowBlur/4}px ${shadowBlur/2}px rgba(0,0,0,${shadowOpacity}), 0 ${shadowBlur}px ${shadowBlur * 1.5}px rgba(0,0,0,${shadowOpacity * 0.5})`,
  };

  return (
    <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center p-8 group">
       <div className="relative w-full h-full flex flex-col items-center justify-center p-8 transition-all duration-300 ease-out" style={glassStyle}>
         <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: `${borderRadius}px`, padding: '1px', background: calculateBorderGradient, mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor', }} />
         <div className="z-10 text-center select-none">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-white/40 to-white/5 mb-4 mx-auto backdrop-blur-md shadow-lg flex items-center justify-center border border-white/20">
               <span className="text-3xl font-black text-white/90">O</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-1 drop-shadow-md tracking-tighter">Ovd</h2>
            <p className="text-white/70 text-xs uppercase tracking-widest font-medium">Glass Engine v2.0</p>
         </div>
       </div>
    </div>
  );
};

// 4. Code Output
const CodeOutput: React.FC<{ settings: GlassSettings }> = ({ settings }) => {
  const [copied, setCopied] = useState(false);
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(settings.color);
  const rgbString = rgb ? `${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(rgb[3], 16)}` : '255, 255, 255';
  const cssCode = `.glass-panel {\n  background: rgba(${rgbString}, ${settings.transparency});\n  backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);\n  -webkit-backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);\n  border-radius: ${settings.borderRadius}px;\n  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});\n  box-shadow: \n    0 ${Math.round(settings.shadowBlur/4)}px ${Math.round(settings.shadowBlur/2)}px rgba(0, 0, 0, ${settings.shadowOpacity}),\n    0 ${settings.shadowBlur}px ${Math.round(settings.shadowBlur * 1.5)}px rgba(0, 0, 0, ${settings.shadowOpacity * 0.5});\n}`;
  const handleCopy = () => { navigator.clipboard.writeText(cssCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="bg-[#0A0A0A] border border-slate-800 rounded-xl overflow-hidden shadow-xl relative group">
      <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2"><Terminal className="w-3 h-3 text-cyan-500" /><span className="text-xs font-mono text-slate-400">CSS Output</span></div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors text-xs text-slate-300">
          {copied ? <><Check className="w-3 h-3 text-green-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy CSS</>}
        </button>
      </div>
      <div className="p-4 overflow-x-auto bg-[#050505]"><pre className="text-xs font-mono text-slate-300 leading-relaxed"><code>{cssCode}</code></pre></div>
    </div>
  );
};

// 5. Wave Generator
const WaveGenerator: React.FC = () => {
  const [wSettings, setWSettings] = useState({ height: 150, frequency: 2, complexity: 3, color: '#00ffff', opacity: 1 });
  const [path, setPath] = useState('');
  useEffect(() => {
    const width = 1440; const points = wSettings.complexity * 10; const segmentWidth = width / points;
    let d = `M0,${wSettings.height}`;
    for (let i = 0; i <= points; i++) {
        const x = i * segmentWidth; const normalizedX = x / width;
        const y = Math.sin(normalizedX * Math.PI * 2 * wSettings.frequency) * 30 + Math.sin(normalizedX * Math.PI * 4 * wSettings.frequency) * 10 + wSettings.height;
        d += ` L${x},${y}`;
    }
    d += ` L${width},320 L0,320 Z`; setPath(d);
  }, [wSettings]);
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="${wSettings.color}" fill-opacity="${wSettings.opacity}" d="${path}"></path></svg>`;
  const copySvg = () => { navigator.clipboard.writeText(svgCode); alert('SVG copied!'); };
  const downloadSvg = () => { const blob = new Blob([svgCode], { type: 'image/svg+xml' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'lumina-wave.svg'; document.body.appendChild(a); a.click(); document.body.removeChild(a); };

  return (
    <div className="mt-8 bg-[#0A0A0A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
         <h3 className="text-sm font-bold text-white flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>SVG Wave Generator</h3>
         <div className="flex gap-2">
            <button onClick={copySvg} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><Copy className="w-4 h-4"/></button>
            <button onClick={downloadSvg} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><Download className="w-4 h-4"/></button>
         </div>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-[#050505] rounded-xl overflow-hidden border border-slate-800/50 relative min-h-[200px] flex items-end">
            <svg viewBox="0 0 1440 320" className="w-full h-auto block"><path fill={wSettings.color} fillOpacity={wSettings.opacity} d={path} /></svg>
         </div>
         <div className="space-y-4">
             <div><label className="text-[10px] font-bold text-slate-500 uppercase">Height</label><input type="range" min="50" max="250" value={wSettings.height} onChange={(e) => setWSettings({...wSettings, height: +e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" /></div>
             <div><label className="text-[10px] font-bold text-slate-500 uppercase">Frequency</label><input type="range" min="1" max="10" step="0.5" value={wSettings.frequency} onChange={(e) => setWSettings({...wSettings, frequency: +e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" /></div>
             <div><label className="text-[10px] font-bold text-slate-500 uppercase">Color</label><input type="color" value={wSettings.color} onChange={(e) => setWSettings({...wSettings, color: e.target.value})} className="h-8 w-12 bg-transparent rounded border border-slate-700 cursor-pointer block mt-1" /></div>
         </div>
      </div>
    </div>
  );
};

// 6. SEO & Ads
const AdWidgetTop: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto mb-12 p-6 bg-[#080808] border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    <div className="text-left relative z-10">
        <div className="flex items-center gap-2 mb-2"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-900 tracking-wider uppercase">Design Trend 2026</span></div>
        <h3 className="text-slate-200 text-lg font-medium leading-tight">UI Report: <strong className="text-white">Why "Spatial Glass" is replacing Flat Design</strong> in mobile operating systems.</h3>
        <p className="text-xs text-slate-400 mt-2 max-w-2xl">From visionOS to the latest Android updates, depth is making a comeback.</p>
    </div>
    <button className="flex-shrink-0 px-6 py-2.5 bg-slate-100 hover:bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10">Read Analysis</button>
  </div>
);

const AdWidgetSidebar: React.FC = () => (
  <div className="p-6 bg-[#080808] border border-slate-800 rounded-2xl shadow-xl sticky top-6">
    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500" />Quick Tips</h4>
    <div className="space-y-6">
        <div className="group cursor-pointer"><h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">Performance First</h5><p className="text-xs text-slate-400 leading-relaxed">Always use <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-200">transform: translateZ(0)</code> to force GPU.</p></div>
        <div className="border-t border-slate-800/50"></div>
        <div className="group cursor-pointer"><h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">Accessibility</h5><p className="text-xs text-slate-400 leading-relaxed">Don't rely on blur alone. Add a solid fill.</p></div>
    </div>
  </div>
);

const SeoArticle: React.FC = () => (
  <article className="mt-32 max-w-5xl mx-auto">
    <div className="flex items-center gap-4 mb-12"><div className="h-px bg-slate-800 flex-1"></div><span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Documentation</span><div className="h-px bg-slate-800 flex-1"></div></div>
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-400 prose-p:leading-8 prose-li:text-slate-400">
        <header className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">Ovd Design Guide: Mastering Glassmorphism Dynamics in 2026</h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">A comprehensive technical deep-dive into optical depth, refraction physics, and the architectural principles of modern "Spatial UI".</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#080808] p-8 rounded-2xl border border-slate-800">
                <h3 className="text-2xl text-white mb-4 flex items-center gap-3"><BookOpen className="w-6 h-6 text-cyan-500" />The Evolution of Transparency</h3>
                <p>Glassmorphism isn't new. It appeared in Windows Vista and iOS 7. However, the 2026 iteration—"Spatial Glass"—differs fundamentally in its implementation. Modern glass isn't just a static blur; it is a dynamic material that responds to light.</p>
            </div>
            <div className="bg-[#080808] p-8 rounded-2xl border border-slate-800">
                <h3 className="text-2xl text-white mb-4 flex items-center gap-3"><TrendingUp className="w-6 h-6 text-purple-500" />Why "Dark Matter" UI?</h3>
                <p>With OLED screens, true black pixels turn off. However, pure black creates harsh contrast. "Dark Matter" UI uses deep, translucent greys (#050505) with high-gloss borders.</p>
            </div>
        </div>
        <h2 className="text-3xl text-white mt-20 mb-8 border-l-4 border-cyan-500 pl-6">1. The Mathematics of Optical Depth</h2>
        <p>To achieve a believable glass effect, one cannot simply apply `backdrop-filter: blur(10px)`. The perception of depth is governed by the <strong>Blur-Luminance Ratio</strong>. As an object moves further behind a frosted surface:</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
            <li className="bg-[#0A0A0A] p-6 rounded-xl border border-slate-800"><span className="text-4xl font-black text-slate-700 mb-2 block">01</span><strong className="text-white block mb-2">Blur Radius</strong><p className="text-sm text-slate-400">Increases with depth.</p></li>
            <li className="bg-[#0A0A0A] p-6 rounded-xl border border-slate-800"><span className="text-4xl font-black text-slate-700 mb-2 block">02</span><strong className="text-white block mb-2">Saturation</strong><p className="text-sm text-slate-400">Spikes due to scattering.</p></li>
            <li className="bg-[#0A0A0A] p-6 rounded-xl border border-slate-800"><span className="text-4xl font-black text-slate-700 mb-2 block">03</span><strong className="text-white block mb-2">Contrast</strong><p className="text-sm text-slate-400">Drops significantly.</p></li>
        </ul>
        <h2 className="text-3xl text-white mt-20 mb-8 border-l-4 border-pink-500 pl-6">2. Implementing Glass in CSS: The Stack</h2>
        <pre className="bg-[#050505] border border-slate-800 p-6 rounded-xl text-sm font-mono text-slate-300 overflow-x-auto">{`.glass-container {\n  transform: translate3d(0, 0, 0);\n  backdrop-filter: blur(16px) saturate(180%);\n  background-color: rgba(17, 25, 40, 0.75);\n  border: 1px solid rgba(255, 255, 255, 0.125);\n}`}</pre>
    </div>
  </article>
);

// 7. Footer & Legal
const Modal = ({ title, icon, children, onClose }: any) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
    <div className="bg-[#050505] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-[#050505]/95 border-b border-slate-800 p-5 flex justify-between items-center rounded-t-2xl z-10 backdrop-blur-xl"><h3 className="text-lg font-bold text-white flex items-center gap-3">{icon}{title}</h3><button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button></div>
      <div className="p-8 text-slate-400 text-sm leading-relaxed overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const renderContent = () => {
    if (activeModal === 'about') return <div className="space-y-4"><p>Ovd Glass Engine is the industry standard for procedural CSS glassmorphism generation.</p></div>;
    if (activeModal === 'privacy') return <div className="space-y-4"><h4 className="text-white font-bold">1. Data Collection</h4><p>We do not collect personal data. Ovd is a client-side application.</p></div>;
    if (activeModal === 'terms') return <div className="space-y-4"><h4 className="text-white font-bold">1. License</h4><p>The code is Open Source (MIT License).</p></div>;
  };
  return (
    <>
      <footer className="mt-24 border-t border-slate-800 bg-[#020202] py-16">
        <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between gap-8">
            <div><h2 className="text-2xl font-black text-white">Ovd</h2><p className="text-slate-500 text-sm mt-2">Procedural Glass Engine.</p></div>
            <div className="flex flex-col gap-2">
                <button onClick={() => setActiveModal('about')} className="text-sm text-slate-400 hover:text-white">About</button>
                <button onClick={() => setActiveModal('privacy')} className="text-sm text-slate-400 hover:text-white">Privacy</button>
                <button onClick={() => setActiveModal('terms')} className="text-sm text-slate-400 hover:text-white">Terms</button>
            </div>
        </div>
      </footer>
      {activeModal && <Modal title={activeModal.toUpperCase()} icon={<Info className="w-5 h-5" />} onClose={() => setActiveModal(null)}>{renderContent()}</Modal>}
    </>
  );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [settings, setSettings] = useState<GlassSettings>(DEFAULT_SETTINGS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const config = params.get('config');
    if (config) {
      try { const decoded = JSON.parse(atob(config)); setSettings({ ...DEFAULT_SETTINGS, ...decoded }); } catch (e) { console.error(e); }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-page text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white shadow-lg border border-slate-700">
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-[340px] bg-[#121212] border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0`}>
        <div className="p-6 pb-4 border-b border-slate-800/50 bg-[#121212] z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"><span className="text-black font-black text-xl tracking-tighter">O</span></div>
            <div><h1 className="text-2xl font-black text-white tracking-tighter leading-none">Ovd</h1><div className="flex items-center gap-1.5 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span><p className="text-[9px] text-cyan-500 uppercase tracking-[0.2em] font-bold">Glass Engine</p></div></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-2"><ControlPanel settings={settings} onChange={setSettings} /></div>
        <div className="p-4 border-t border-slate-800/50 bg-[#0f0f0f]"><div className="text-[10px] text-slate-600 font-mono text-center mb-2">v2.4.0 • Ready</div></div>
      </aside>

      <main className="flex-1 relative h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <Background />
        <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:px-12 lg:py-12">
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>
                </div>
                <nav className="flex items-center gap-8">
                    {['Documentation', 'Showcase', 'Pro Version'].map((item) => <button key={item} className="text-[11px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors duration-200">{item}</button>)}
                    <button className="px-5 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-slate-200 transition-colors">Export</button>
                </nav>
            </header>

            <AdWidgetTop />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-20">
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <div className="bg-[#050505]/40 backdrop-blur-2xl border border-slate-800/60 rounded-3xl min-h-[500px] flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                         <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none"></div>
                         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
                         <GlassPreview settings={settings} />
                         <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end pointer-events-none"><div className="text-[10px] font-mono text-slate-600">W: 100% H: AUTO<br/>Z-INDEX: 10</div><div className="flex gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div><div className="w-1 h-1 bg-slate-600 rounded-full"></div><div className="w-1 h-1 bg-slate-600 rounded-full"></div></div></div>
                    </div>
                    <CodeOutput settings={settings} />
                    <WaveGenerator />
                </div>
                <div className="xl:col-span-4 space-y-6"><AdWidgetSidebar /></div>
            </div>

            <SeoArticle />
            <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;