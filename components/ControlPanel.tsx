import React, { useState, useMemo } from 'react';
import { GlassSettings, PresetCategory } from '../types';
import { generateGlassStyle } from '../services/geminiService';
import { OVD_PRESETS as PRESETS_DATA } from '../data/presets';
import { Wand2, Loader2, Share2, Shuffle, Search, Check } from 'lucide-react';

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
      setError("Failed to generate. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomize = () => {
    const randomPreset = PRESETS_DATA[Math.floor(Math.random() * PRESETS_DATA.length)];
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

  const filteredPresets = useMemo(() => {
    return PRESETS_DATA.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories: PresetCategory[] = ['All', ...Array.from(new Set(PRESETS_DATA.map(p => p.category))) as PresetCategory[]];

  return (
    <div className="flex flex-col min-h-0">
      
      {/* Custom Tab Switcher */}
      <div className="flex p-1 bg-slate-900 rounded-lg mb-6 border border-slate-800/50">
        <button 
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'library' ? 'bg-[#121212] text-white shadow-sm border border-slate-700/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
            Library
        </button>
        <button 
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'controls' ? 'bg-[#121212] text-white shadow-sm border border-slate-700/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
            Controls
        </button>
      </div>

      {/* ================= LIBRARY TAB ================= */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search styles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-colors placeholder:text-slate-600"
                />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider border transition-all ${selectedCategory === cat ? 'bg-cyan-950/50 border-cyan-800 text-cyan-400' : 'bg-slate-900/30 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Presets Grid - Chips Style */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{filteredPresets.length} Presets</span>
                    <button onClick={handleRandomize} className="text-[10px] text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                        <Shuffle className="w-3 h-3" /> Random
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {filteredPresets.map((preset, idx) => (
                        <button
                            key={idx}
                            onClick={() => { onChange(preset.settings); setActiveTab('controls'); }}
                            className="group flex flex-col items-start p-2 rounded bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800 hover:border-cyan-500/30 transition-all text-left"
                        >
                            <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white transition-colors truncate w-full">{preset.name}</span>
                            <span className="text-[8px] text-slate-600 uppercase tracking-wider">{preset.category}</span>
                        </button>
                    ))}
                </div>
                {filteredPresets.length === 0 && (
                     <div className="text-center py-10 text-slate-600 text-xs">No presets found.</div>
                )}
            </div>
        </div>
      )}

      {/* ================= CONTROLS TAB ================= */}
      {activeTab === 'controls' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             {/* AI Input */}
            <div className="p-3 bg-gradient-to-b from-slate-900 to-[#121212] rounded-lg border border-slate-800 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity blur duration-500"></div>
                <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                        <Wand2 className="w-3 h-3 text-cyan-400" />
                        <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200 uppercase tracking-widest">AI Generator</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Describe it..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                            onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
                        />
                        <button
                            onClick={handleAIGenerate}
                            disabled={isGenerating || !prompt.trim()}
                            className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded px-2 flex items-center justify-center disabled:opacity-50"
                        >
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-[9px] mt-1.5">{error}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/50">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Parameters</h3>
                    <button 
                        onClick={handleShare}
                        className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors"
                    >
                        {copiedLink ? <Check className="w-3 h-3 text-green-500" /> : <Share2 className="w-3 h-3" />}
                        {copiedLink ? 'Copied' : 'Share'}
                    </button>
                </div>

                {/* Color Picker Compact */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tint</label>
                        <span className="text-[10px] font-mono text-slate-600">{settings.color}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="h-8 w-full rounded bg-slate-900 border border-slate-800 relative overflow-hidden group">
                             <input
                                type="color"
                                value={settings.color}
                                onChange={(e) => update('color', e.target.value)}
                                className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0"
                             />
                         </div>
                    </div>
                </div>

                <Slider label="Blur" value={settings.blur} min={0} max={40} unit="px" onChange={(v) => update('blur', v)} />
                <Slider label="Transparency" value={settings.transparency} min={0} max={1} step={0.01} onChange={(v) => update('transparency', v)} />
                <Slider label="Saturation" value={settings.saturation} min={0} max={200} unit="%" onChange={(v) => update('saturation', v)} />
                
                <div className="h-px bg-slate-800/50 my-2" />
                
                <Slider label="Radius" value={settings.borderRadius} min={0} max={100} unit="px" onChange={(v) => update('borderRadius', v)} />
                <Slider label="Border Alpha" value={settings.outlineOpacity} min={0} max={1} step={0.01} onChange={(v) => update('outlineOpacity', v)} />
                <Slider label="Light Angle" value={settings.lightAngle} min={0} max={360} unit="°" onChange={(v) => update('lightAngle', v)} />
                
                <div className="h-px bg-slate-800/50 my-2" />

                <Slider label="Shadow Size" value={settings.shadowBlur} min={0} max={100} unit="px" onChange={(v) => update('shadowBlur', v)} />
                <Slider label="Shadow Alpha" value={settings.shadowOpacity} min={0} max={1} step={0.01} onChange={(v) => update('shadowOpacity', v)} />
            </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;