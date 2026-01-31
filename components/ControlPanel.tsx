import React, { useState, useMemo } from 'react';
import { GlassSettings, Preset, PresetCategory } from '../types';
import { generateGlassStyle } from '../services/geminiService';
import { OVD_PRESETS } from '../data/presets';
import { Wand2, Loader2, Info, Share2, Shuffle, Search, Grid, SlidersHorizontal, Check } from 'lucide-react';

interface ControlPanelProps {
  settings: GlassSettings;
  onChange: (settings: GlassSettings) => void;
}

const Slider = ({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  onChange, 
  unit = '' 
}: { 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  step?: number; 
  onChange: (val: number) => void;
  unit?: string;
}) => (
  <div className="mb-5 group">
    <div className="flex justify-between mb-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">{label}</label>
      <span className="text-xs text-slate-500 font-mono group-hover:text-slate-200">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer hover:bg-slate-700 transition-all accent-cyan-500"
    />
  </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, onChange }) => {
  const [activeTab, setActiveTab] = useState<'controls' | 'library'>('library');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Library State
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
      onChange(newSettings);
      setActiveTab('controls');
    } catch (e) {
      setError("Failed to generate style. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomize = () => {
    const randomPreset = OVD_PRESETS[Math.floor(Math.random() * OVD_PRESETS.length)];
    // Add slight variance
    const variance = (val: number, factor: number = 0.1) => {
        const v = val * factor;
        return val + (Math.random() * v * 2 - v);
    }
    
    onChange({
        ...randomPreset.settings,
        blur: Math.min(40, Math.max(0, Math.round(variance(randomPreset.settings.blur)))),
        lightAngle: Math.floor(Math.random() * 360),
    });
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

  const filteredPresets = useMemo(() => {
    return OVD_PRESETS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories: PresetCategory[] = ['All', ...Array.from(new Set(OVD_PRESETS.map(p => p.category))) as PresetCategory[]];

  return (
    <div className="bg-[#050505]/90 backdrop-blur-xl border border-slate-800 p-0 rounded-2xl shadow-2xl h-full flex flex-col overflow-hidden">
      
      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button 
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'library' ? 'bg-slate-900 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
            <Grid className="w-4 h-4" /> Library
        </button>
        <button 
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'controls' ? 'bg-slate-900 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
            <SlidersHorizontal className="w-4 h-4" /> Controls
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        
        {/* ================= LIBRARY TAB ================= */}
        {activeTab === 'library' && (
            <div className="space-y-6">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search 50+ presets..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                    <button 
                        onClick={handleRandomize}
                        title="Surprise Me"
                        className="bg-purple-900/20 border border-purple-500/30 hover:bg-purple-900/40 text-purple-400 rounded-lg px-3 flex items-center justify-center transition-all"
                    >
                        <Shuffle className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${selectedCategory === cat ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {filteredPresets.map((preset, idx) => (
                        <button
                            key={idx}
                            onClick={() => { onChange(preset.settings); setActiveTab('controls'); }}
                            className="group relative p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 transition-all text-left overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <span className="text-xs font-bold text-slate-300 group-hover:text-white block truncate">{preset.name}</span>
                                <span className="text-[10px] text-slate-600 group-hover:text-cyan-400 uppercase tracking-wider">{preset.category}</span>
                            </div>
                        </button>
                    ))}
                    {filteredPresets.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-slate-500 text-xs">No presets found.</div>
                    )}
                </div>
            </div>
        )}

        {/* ================= CONTROLS TAB ================= */}
        {activeTab === 'controls' && (
            <div className="space-y-1">
                 {/* AI Section */}
                <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
                    <h2 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
                    <Wand2 className="w-3 h-3 text-cyan-400" />
                    AI Generation
                    </h2>
                    <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="e.g. 'Liquid metal glass'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
                    />
                    <button
                        onClick={handleAIGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="bg-cyan-900/30 hover:bg-cyan-800/50 border border-cyan-800/50 disabled:bg-slate-900 disabled:border-slate-800 disabled:cursor-not-allowed text-cyan-400 rounded-lg px-3 transition-all flex items-center justify-center min-w-[3rem]"
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    </button>
                    </div>
                    {error && <p className="text-red-500 text-[10px] mt-2">{error}</p>}
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Properties</h3>
                    <button 
                        onClick={handleShare}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all border border-slate-700"
                    >
                        {copiedLink ? <Check className="w-3 h-3 text-green-400" /> : <Share2 className="w-3 h-3" />}
                        {copiedLink ? 'Copied' : 'Share Look'}
                    </button>
                </div>

                <div className="mb-5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block hover:text-cyan-400 transition-colors">Tint Color</label>
                <div className="flex items-center gap-3">
                    <div className="relative w-full h-8 rounded bg-slate-800 overflow-hidden border border-slate-700">
                    <input
                        type="color"
                        value={settings.color}
                        onChange={(e) => update('color', e.target.value)}
                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer"
                    />
                    </div>
                    <span className="text-xs font-mono text-slate-500 w-16 text-right">{settings.color}</span>
                </div>
                </div>

                <Slider label="Blur" value={settings.blur} min={0} max={40} unit="px" onChange={(v) => update('blur', v)} />
                <Slider label="Transparency" value={settings.transparency} min={0} max={1} step={0.01} onChange={(v) => update('transparency', v)} />
                <Slider label="Saturation" value={settings.saturation} min={0} max={200} unit="%" onChange={(v) => update('saturation', v)} />
                
                <div className="my-6 border-t border-slate-800" />
                
                <Slider label="Border Radius" value={settings.borderRadius} min={0} max={100} unit="px" onChange={(v) => update('borderRadius', v)} />
                <Slider label="Border Opacity" value={settings.outlineOpacity} min={0} max={1} step={0.01} onChange={(v) => update('outlineOpacity', v)} />
                <Slider label="Light Angle" value={settings.lightAngle} min={0} max={360} unit="°" onChange={(v) => update('lightAngle', v)} />
                
                <div className="my-6 border-t border-slate-800" />

                <Slider label="Shadow Blur" value={settings.shadowBlur} min={0} max={100} unit="px" onChange={(v) => update('shadowBlur', v)} />
                <Slider label="Shadow Opacity" value={settings.shadowOpacity} min={0} max={1} step={0.01} onChange={(v) => update('shadowOpacity', v)} />
            </div>
        )}
      </div>
      
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-start gap-2 text-[10px] text-slate-500">
        <Info className="w-3 h-3 mt-0.5 flex-shrink-0 text-cyan-700" />
        <p>Pro Tip: Use 'Share Look' to save these exact sliders to a URL.</p>
      </div>
    </div>
  );
};

export default ControlPanel;