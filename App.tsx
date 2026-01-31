import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import ControlPanel from './components/ControlPanel';
import GlassPreview from './components/GlassPreview';
import CodeOutput from './components/CodeOutput';
import WaveGenerator from './components/WaveGenerator';
import { AdWidgetTop, AdWidgetSidebar, SeoArticle } from './components/SeoContent';
import Footer from './components/Footer';
import { GlassSettings, DEFAULT_SETTINGS } from './types';
import { Layers } from 'lucide-react';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GlassSettings>(DEFAULT_SETTINGS);

  // Load state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const config = params.get('config');
    if (config) {
      try {
        const decoded = JSON.parse(atob(config));
        setSettings({ ...DEFAULT_SETTINGS, ...decoded });
      } catch (e) {
        console.error("Failed to parse config from URL", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-200 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      <Background />
      
      <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 pl-2 border-b border-slate-800/50 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
               <span className="text-black font-black text-xl tracking-tighter">O</span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">
                Ovd
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">The Future of Visual Layering</p>
            </div>
          </div>
          <nav className="flex gap-6 mt-4 md:mt-0">
             <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Generator</button>
             <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Library</button>
             <button className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest transition-colors">v2.0 Beta</button>
          </nav>
        </header>

        {/* Ad Space: Top Slot (Featured) */}
        <AdWidgetTop />

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Tools Preview */}
          <section className="lg:col-span-8 flex flex-col gap-6 order-2 lg:order-1">
            <div className="bg-[#050505]/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 flex items-center justify-center min-h-[500px] shadow-2xl relative overflow-hidden group">
               {/* Grid Pattern */}
               <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20" 
                    style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
               />
               <GlassPreview settings={settings} />
            </div>

            <CodeOutput settings={settings} />
            
            <WaveGenerator />
          </section>

          {/* Right Column: Controls & Sidebar Ads */}
          <aside className="lg:col-span-4 h-full order-1 lg:order-2 flex flex-col gap-8 sticky top-6">
            <ControlPanel settings={settings} onChange={setSettings} />
            <AdWidgetSidebar />
            
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
                <Layers className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">50+ Presets Loaded</p>
            </div>
          </aside>
          
        </div>
        
        {/* SEO Content Article */}
        <SeoArticle />

        <Footer />
      </main>
    </div>
  );
};

export default App;