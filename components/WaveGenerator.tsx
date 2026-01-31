import React, { useState, useEffect } from 'react';
import { WaveSettings, DEFAULT_WAVE_SETTINGS } from '../types';
import { Download, Copy, RefreshCw } from 'lucide-react';

const WaveGenerator: React.FC = () => {
  const [settings, setSettings] = useState<WaveSettings>(DEFAULT_WAVE_SETTINGS);
  const [path, setPath] = useState('');

  const generateWave = () => {
    const width = 1440;
    const points = settings.complexity * 10;
    const segmentWidth = width / points;
    
    let d = `M0,${settings.height}`;
    
    for (let i = 0; i <= points; i++) {
        const x = i * segmentWidth;
        const normalizedX = x / width;
        // Combine multiple sine waves for complexity
        const y = Math.sin(normalizedX * Math.PI * 2 * settings.frequency) * 30 + 
                  Math.sin(normalizedX * Math.PI * 4 * settings.frequency) * 10 + 
                  settings.height;
        d += ` L${x},${y}`;
    }
    
    d += ` L${width},320 L0,320 Z`;
    setPath(d);
  };

  useEffect(() => {
    generateWave();
  }, [settings]);

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="${settings.color}" fill-opacity="${settings.opacity}" d="${path}"></path>
</svg>`;

  const copySvg = () => {
    navigator.clipboard.writeText(svgCode);
    alert('SVG copied to clipboard!');
  };

  const downloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumina-wave.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mt-8 bg-[#0A0A0A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
         <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            SVG Wave Generator
         </h3>
         <div className="flex gap-2">
            <button onClick={copySvg} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><Copy className="w-4 h-4"/></button>
            <button onClick={downloadSvg} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><Download className="w-4 h-4"/></button>
         </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-[#050505] rounded-xl overflow-hidden border border-slate-800/50 relative min-h-[200px] flex items-end">
            <div className="absolute inset-0 grid place-items-center text-slate-800 opacity-20 pointer-events-none text-6xl font-bold tracking-tighter select-none">
                PREVIEW
            </div>
            <svg viewBox="0 0 1440 320" className="w-full h-auto block">
                <path fill={settings.color} fillOpacity={settings.opacity} d={path} />
            </svg>
         </div>

         <div className="space-y-4">
             <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Height</label>
                <input type="range" min="50" max="250" value={settings.height} onChange={(e) => setSettings({...settings, height: +e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
             </div>
             <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Frequency</label>
                <input type="range" min="1" max="10" step="0.5" value={settings.frequency} onChange={(e) => setSettings({...settings, frequency: +e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
             </div>
             <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Complexity</label>
                <input type="range" min="1" max="5" value={settings.complexity} onChange={(e) => setSettings({...settings, complexity: +e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
             </div>
             <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Color</label>
                <div className="flex gap-2">
                    <input type="color" value={settings.color} onChange={(e) => setSettings({...settings, color: e.target.value})} className="h-8 w-12 bg-transparent rounded border border-slate-700 cursor-pointer" />
                    <input type="range" min="0" max="1" step="0.1" value={settings.opacity} onChange={(e) => setSettings({...settings, opacity: +e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 self-center" />
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default WaveGenerator;