import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import ControlPanel from './components/ControlPanel';
import GlassPreview from './components/GlassPreview';
import CodeOutput from './components/CodeOutput';
import WaveGenerator from './components/WaveGenerator';
import { AdWidgetTop, AdWidgetSidebar, SeoArticle } from './components/SeoContent';
import Footer from './components/Footer';
import { GlassSettings, DEFAULT_SETTINGS } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GlassSettings>(DEFAULT_SETTINGS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen bg-page text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white shadow-lg border border-slate-700"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Left Sidebar - Fixed Width, Dark Gray #121212 */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-[340px] bg-[#121212] border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0
      `}>
        {/* Sidebar Header */}
        <div className="p-6 pb-4 border-b border-slate-800/50 bg-[#121212] z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
               <span className="text-black font-black text-xl tracking-tighter">O</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter leading-none">Ovd</h1>
              <div className="flex items-center gap-1.5 mt-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                 <p className="text-[9px] text-cyan-500 uppercase tracking-[0.2em] font-bold">Glass Engine</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-2">
          <ControlPanel settings={settings} onChange={setSettings} />
        </div>
        
        {/* Sidebar Footer / Ad */}
        <div className="p-4 border-t border-slate-800/50 bg-[#0f0f0f]">
             <div className="text-[10px] text-slate-600 font-mono text-center mb-2">v2.4.0 • Ready</div>
        </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 relative h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <Background />
        
        <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:px-12 lg:py-12">
            
            {/* Top Navigation & Status */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>
                </div>
                <nav className="flex items-center gap-8">
                    {['Documentation', 'Showcase', 'Pro Version'].map((item) => (
                        <button key={item} className="text-[11px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors duration-200">
                            {item}
                        </button>
                    ))}
                    <button className="px-5 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-slate-200 transition-colors">
                        Export
                    </button>
                </nav>
            </header>

            <AdWidgetTop />

            {/* Split Layout: Preview & Info */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-20">
                
                {/* Center Preview Area */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <div className="bg-[#050505]/40 backdrop-blur-2xl border border-slate-800/60 rounded-3xl min-h-[500px] flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                         {/* Mesh & Grid Backgrounds for the preview container */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none"></div>
                         <div className="absolute inset-0 opacity-[0.03]" 
                              style={{ 
                                  backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
                                  backgroundSize: '32px 32px' 
                              }} 
                         />
                         
                         <GlassPreview settings={settings} />

                         <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end pointer-events-none">
                            <div className="text-[10px] font-mono text-slate-600">
                                W: 100% H: AUTO<br/>
                                Z-INDEX: 10
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                            </div>
                         </div>
                    </div>
                    
                    <CodeOutput settings={settings} />
                    <WaveGenerator />
                </div>

                {/* Right Column: Ads & Tips */}
                <div className="xl:col-span-4 space-y-6">
                     <AdWidgetSidebar />
                </div>
            </div>

            <SeoArticle />
            <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;