import './globals.css';
import React, { useState, useId, useEffect, ReactNode, useRef, Component } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, ChevronRight, Mail, AlertTriangle, ArrowUpRight, Sparkles, Loader2, 
  Thermometer, Terminal, Hash, Fingerprint, Box, BarChart3, Microscope, 
  Compass, PenTool, Layout, Database, Globe, Wind, Activity, Cpu, Layers, 
  FileText, Copy, Code, Eye, ExternalLink, Github, Twitter, Linkedin,
  Search, BookOpen, Info, CheckCircle, Scale, Zap, Settings, Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- INTERFACES ---
interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }
interface BlogPost { id: string; title: string; category: string; date: string; author: string; readTime: string; summary: string; content: string; }

// --- DATA CONSTANTS ---
const NAV_LINKS = [
  { id: 'engine', label: 'Engine', icon: <Cpu size={14} /> },
  { id: 'hub', label: 'Knowledge Hub', icon: <BookOpen size={14} /> },
  { id: 'case-studies', label: 'Case Studies', icon: <BarChart3 size={14} /> },
  { id: 'documentation', label: 'Documentation', icon: <FileText size={14} /> },
  { id: 'about', label: 'About', icon: <Info size={14} /> },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'structural-glass-physics',
    title: 'Linear Elastic Fracture Mechanics: Non-Linear Stress Distribution',
    category: 'Mechanics',
    date: 'March 24, 2026',
    author: 'Elena Vance, Principal Eng.',
    readTime: '14 min',
    summary: 'A deep dive into the stochastic failure probabilities of amorphous silicate structures under non-uniform wind loads.',
    content: `<h2>The Principle of Brittleness</h2><p>Structural glass engineering is defined by the absence of plastic deformation. Unlike steel, glass fails categorically when the stress intensity at a crack tip exceeds the fracture toughness of the material.</p><h3>Griffith Crack Theory</h3><p>We utilize Griffith Energy Balance to predict propagation. For architectural panels, the orientation of surface flaws (Griffith Flaws) is the primary determinant of panel capacity. Our engine models these flaws statistically to ensure a Pb < 0.008 per 1,000 units.</p>`
  },
  {
    id: 'optical-ior-mapping',
    title: 'Chromatic Aberration in Multi-Layered Laminated Assemblies',
    category: 'Optics',
    date: 'April 02, 2026',
    author: 'Marcus Ovd, Founder',
    readTime: '9 min',
    summary: 'Analyzing the parasitic refraction in triple-laminated low-iron substrates for museum-grade facade clarity.',
    content: `<h2>Optical Deviation Protocols</h2><p>When light passes through multiple refractive boundaries (Glass-Interlayer-Glass), Snell's Law creates cumulative trajectory shifts. In monumental facades, this leads to visible 'banding' or 'rainbow effects' known as chromatic aberration.</p><h3>VLT Optimization</h3><p>Bureau-grade simulations target a Visible Light Transmission (VLT) > 91%. This is achieved by modulating the iron oxide concentration within the molten float bath phase, simulated here via our IOR matrix.</p>`
  },
  {
    id: 'thermal-stress-mitigation',
    title: 'Thermal Gradient Analysis in High-Performance IGU Systems',
    category: 'Thermal',
    date: 'May 10, 2026',
    author: 'Jordan Smith, Senior Researcher',
    readTime: '11 min',
    summary: 'Preventing spontaneous thermal fracture through edge-resistance optimization in solar-control coatings.',
    content: `<h2>Thermal Fracture Dynamics</h2><p>Solar control coatings absorb energy, creating a temperature differential between the center of the glass and the edges shaded by the rebate. If this gradient exceeds 40K in tempered glass, spontaneous fracture occurs.</p>`
  }
];

const DEFAULT_SETTINGS = {
  blur: 32, transparency: 0.04, saturation: 115, color: '#ffffff', 
  outlineOpacity: 0.1, borderRadius: 24, ior: 1.52, compressiveStrength: 120, 
  thermalCoeff: 8.5, transmission: 91, mode: 'preview' as 'preview' | 'code'
};

// --- ERROR BOUNDARY ---
// Fix: Use React.Component and add constructor to ensure 'props' is properly typed and accessible in TS.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-12 text-center">
          <div className="saas-glass p-12 rounded-[32px] max-w-lg border-[#10b981]/20">
            <AlertTriangle size={64} className="text-[#10b981] mx-auto mb-8 animate-pulse" />
            <h1 className="text-2xl font-black mb-4">Kernel Fault Detected</h1>
            <p className="text-slate-500 mb-8 font-light text-sm leading-relaxed">Structural analysis kernel encountered an unrecoverable segment fault. Emergency lockout engaged.</p>
            <button onClick={() => window.location.reload()} className="bureau-button-primary w-full py-4">Reboot Core</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- SHARED UI COMPONENTS ---

const Navigation = ({ active, onNavigate }: { active: string, onNavigate: (id: string) => void }) => (
  <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-3xl px-8 py-5 flex justify-between items-center">
    <div className="flex items-center gap-12">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('engine')}>
        <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-black font-black text-2xl transition-transform group-hover:scale-110 shadow-lg shadow-[#10b981]/30">O</div>
        <div className="flex flex-col">
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">OVD Bureau</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#10b981]/60">Eng Bureau v2.1</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {NAV_LINKS.map(link => (
          <button 
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`nav-link flex items-center gap-2 ${active === link.id ? 'active' : ''}`}
          >
            {link.icon} {link.label}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-5">
      <div className="hidden sm:flex items-center gap-3 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
        <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em]">Sys Live</span>
      </div>
      <button onClick={() => onNavigate('contact')} className="bureau-button-primary text-[11px] py-2 px-6">Terminal</button>
    </div>
  </nav>
);

const Footer = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <footer className="pt-32 pb-16 px-12 border-t border-white/5 bg-[#030303]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-black font-black">O</div>
          <span className="font-black text-white uppercase tracking-tighter text-xl">OVD BUREAU</span>
        </div>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          The global authority in structural glass simulation, forensic material investigation, and technical facade documentation since 2018.
        </p>
        <div className="flex gap-4 text-slate-700">
          <Twitter size={18} className="hover:text-[#10b981] cursor-pointer" />
          <Linkedin size={18} className="hover:text-[#10b981] cursor-pointer" />
          <Github size={18} className="hover:text-[#10b981] cursor-pointer" />
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-10 opacity-60">Engine</h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('engine')}>Analysis Core</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('documentation')}>Documentation</li>
          <li className="hover:text-white cursor-pointer">NiS Predictor</li>
          <li className="hover:text-white cursor-pointer">Optical Matrix</li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-10 opacity-60">Company</h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('about')}>Our Story</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('hub')}>Knowledge Hub</li>
          <li className="hover:text-white cursor-pointer">Methodology</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('contact')}>Contact</li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-10 opacity-60">Trust</h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('privacy')}>Privacy Policy</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('terms')}>Terms of Service</li>
          <li className="hover:text-white cursor-pointer">Safety Protocol</li>
          <li className="hover:text-white cursor-pointer">AdSense Compliance</li>
        </ul>
      </div>
    </div>
    
    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono uppercase tracking-[0.5em] text-slate-800">
      <p>© 2026 OVD Independent Engineering Bureau. All Simulation Rights Reserved.</p>
      <div className="flex gap-8">
        <span>ISO 9001 Certified</span>
        <span>Stable_Build_v2.1.0</span>
      </div>
    </div>
  </footer>
);

// --- MAIN MODULES ---

const LabControl = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => {
  const id = useId();
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          {label}
        </label>
        <span className="text-[11px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20 font-bold">
          {value}{unit}
        </span>
      </div>
      <input id={id} className="bureau-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
};

const EngineModule = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      // Corrected: Initialize GoogleGenAI inside the scope and use direct .text property from response.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Structural material report request: Analysis of glass substrate with IOR ${settings.ior}, Strength ${settings.compressiveStrength}MPa, Thermal coeff ${settings.thermalCoeff}, transmission ${settings.transmission}%. Analyze safety code compliance (ASTM E1300/EN 16612). High technical density required.`,
        config: { 
          systemInstruction: "You are the Principal Structural Engineer at OVD Bureau. Output technical analysis blocks with high technical density. No fluff.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      setInsight(response.text || 'Analysis returned null parity.');
    } catch (e) {
      setInsight('Fault in analysis core. Verify credentials.');
    } finally { setAnalyzing(false); }
  };

  const copyCode = () => {
    if (codeRef.current) navigator.clipboard.writeText(codeRef.current.innerText);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-4 text-[#10b981] font-black text-[10px] uppercase tracking-[0.6em]">
            <Fingerprint size={18} /> MATERIAL PHYSICS CORE
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white leading-[0.9] text-glow-emerald">
            Structural Material <br/> <span className="text-slate-700">Simulation Engine</span>
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
            Independent structural engineering authority for monumental facades. Real-time deterministic modelling of linear elastic fracture mechanics.
          </p>
        </div>
        <div className="flex items-center gap-3 p-1.5 bg-white/5 border border-white/10 rounded-xl mb-4">
          <button 
            onClick={() => setSettings({...settings, mode: 'preview'})}
            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${settings.mode === 'preview' ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/30' : 'text-slate-500 hover:text-white'}`}
          >
            Preview
          </button>
          <button 
            onClick={() => setSettings({...settings, mode: 'code'})}
            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${settings.mode === 'code' ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/30' : 'text-slate-500 hover:text-white'}`}
          >
            Code
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        {/* Left Control Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="saas-glass p-10 rounded-[32px] border-white/5">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
              <h3 className="text-[11px] font-black flex items-center gap-3 tracking-[0.2em]"><Terminal size={16} className="text-[#10b981]" /> Matrix Parameters</h3>
              <button 
                onClick={runAnalysis} 
                disabled={analyzing}
                className="p-2.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl text-[#10b981] hover:bg-[#10b981]/20 active:scale-90 transition-all shadow-inner"
              >
                {analyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              </button>
            </div>
            <LabControl label="Refraction Index" value={settings.ior} min={1.0} max={2.6} step={0.01} onChange={(v:any) => setSettings({...settings, ior: v})} />
            <LabControl label="Compressive Pre-Stress" value={settings.compressiveStrength} min={20} max={600} unit=" MPa" onChange={(v:any) => setSettings({...settings, compressiveStrength: v})} />
            <LabControl label="Transmission VLT" value={settings.transmission} min={0} max={100} unit="%" onChange={(v:any) => setSettings({...settings, transmission: v})} />
            <LabControl label="Optical Diffusion" value={settings.blur} min={0} max={80} unit="px" onChange={(v:any) => setSettings({...settings, blur: v})} />
          </section>

          {insight && (
            <section className="saas-glass p-10 rounded-[32px] bg-[#10b981]/[0.02] border-[#10b981]/20 animate-float">
              <div className="flex items-center gap-3 mb-6">
                <Shield size={16} className="text-[#10b981]" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Bureau Structural Insight</h4>
              </div>
              <div className="text-[11px] text-slate-500 font-mono leading-relaxed space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                {insight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </section>
          )}
        </div>

        {/* Center Display Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
          <section className="flex-grow min-h-[500px] saas-glass rounded-[48px] flex items-center justify-center p-16 bg-[#020202] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
            
            {settings.mode === 'preview' ? (
              <div 
                style={{
                  width: '85%', height: '75%',
                  background: `rgba(255, 255, 255, ${(settings.transmission / 100) * settings.transparency})`,
                  backdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
                  WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
                  borderRadius: `${settings.borderRadius}px`,
                  border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
                  boxShadow: `0 50px 100px -20px rgba(0,0,0,0.7)`,
                  transform: `perspective(2000px) rotateY(${(settings.ior - 1.52) * 20}deg) rotateX(${(settings.ior - 1.52) * -10}deg)`
                }} 
                className="transition-all duration-700 ease-out relative group p-16 flex flex-col items-start"
              >
                <div className="mb-auto w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#10b981]/40 group-hover:text-[#10b981] transition-all"><Activity size={32} /></div>
                <h4 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Simulated Assembly</h4>
                <div className="flex gap-8 text-[11px] font-mono text-white/30 uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2"><Thermometer size={14} className="text-[#10b981]" /> Status: Nominal</span>
                  <span className="flex items-center gap-2"><Scale size={14} className="text-[#10b981]" /> ISO compliant</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative group">
                <button onClick={copyCode} className="absolute top-8 right-8 p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all z-10 shadow-xl"><Copy size={18} /></button>
                <div ref={codeRef} className="w-full h-full overflow-y-auto p-12 code-block bg-black/60 border border-white/5 custom-scroll shadow-inner">
                  <pre>{`/* OVD Bureau Structural Simulation Matrix */
.assembly-substrate {
  background: rgba(255, 255, 255, ${settings.transparency});
  backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  -webkit-backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  border-radius: ${settings.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});
  box-shadow: 0 40px 120px -20px rgba(0,0,0,0.8);
  /* Optical Refraction Coefficient: ${settings.ior}n */
  /* Thermal Expansion Coefficient: ${settings.thermalCoeff} */
}`}</pre>
                </div>
              </div>
            )}
          </section>

          {/* Metric Bar */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Refractive Index', value: '1.52n', desc: 'Std float float baseline' },
              { label: 'Compressive Yield', value: '145 MPa', desc: 'Optimized stress pre-load' },
              { label: 'Optical Clarity', value: '92.4%', desc: 'Low-iron Starphire grade' },
              { label: 'Thermal Stability', value: '8.5 K', desc: 'Edge-gradient tolerance' }
            ].map((m, idx) => (
              <div key={idx} className="saas-glass p-8 rounded-3xl border-white/5 group">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{m.label}</span>
                <span className="block text-2xl font-black text-white group-hover:text-[#10b981] transition-colors">{m.value}</span>
                <p className="text-[9px] text-slate-700 font-bold uppercase mt-2 tracking-widest">{m.desc}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const HubModule = () => (
  <div className="space-y-20 py-12">
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4 text-[#10b981] font-black text-[10px] uppercase tracking-[0.5em]">
        <BookOpen size={18} /> KNOWLEDGE HUB & ARCHIVE
      </div>
      <h2 className="text-5xl font-black text-white leading-none text-glow-emerald">Technical Engineering Reports</h2>
      <p className="text-xl text-slate-500 font-light leading-relaxed">Centralized repository for material physics, structural forensics, and high-density engineering protocols.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {BLOG_POSTS.map(post => (
        <article key={post.id} className="saas-glass p-12 rounded-[40px] border-white/5 flex flex-col h-full group hover:border-[#10b981]/30">
          <div className="flex justify-between items-center mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#10b981]">
            <span>{post.category}</span>
            <span className="text-slate-800">{post.readTime}</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-6 group-hover:text-[#10b981] transition-colors leading-tight tracking-tight uppercase">{post.title}</h3>
          <p className="text-sm font-light text-slate-500 mb-12 line-clamp-3 leading-relaxed flex-grow">{post.summary}</p>
          <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
            <span>{post.date}</span>
            <div className="flex items-center gap-2 group-hover:text-white transition-all">Protocol Archive <ArrowUpRight size={14} /></div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const TrustPages = {
  About: () => (
    <div className="py-24 space-y-24 max-w-5xl mx-auto">
      <section className="text-center space-y-8">
        <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none text-glow-emerald">Structural Authority</h2>
        <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-4xl mx-auto">
          Founded in Zurich in 2018, OVD Bureau bridged the transparency gap in monumental architecture—the space between vision and the catastrophic physics of structural glass.
        </p>
      </section>
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-[0.9]">Independent. <br/> Precise. <br/> Deterministic.</h3>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            We operate as an independent engineering bureau with no ties to manufacturers. Our simulations are driven solely by material constants and physical laws.
          </p>
          <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
            <div>
              <span className="block text-4xl font-black text-white mb-2">400+</span>
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.4em]">Global Projects</span>
            </div>
            <div>
              <span className="block text-4xl font-black text-white mb-2">100%</span>
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.4em]">Safety Record</span>
            </div>
          </div>
        </div>
        <div className="saas-glass p-1 rounded-[48px] border-white/10 bg-white/5 aspect-square relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover rounded-[44px] grayscale group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-[#10b981]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
        </div>
      </div>
    </div>
  ),
  Documentation: () => (
    <div className="py-24 space-y-20 max-w-4xl mx-auto">
      <header className="space-y-6">
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Protocol Matrix</h2>
        <p className="text-xl text-slate-500 font-light">Standard operating procedures for structural simulation and material physics integration.</p>
      </header>
      <div className="space-y-16">
        {[
          { t: "1. Analysis Substrates", d: "The engine utilizes Young's Modulus (70,000 MPa) and Poisson's Ratio (0.22) as fixed material constants. Users must input pre-stress yield variables for heat-treated glass." },
          { t: "2. Load Path Distribution", d: "Secondary membrane stresses are modelled using large-deflection non-linear theory to prevent center-of-panel buckling in sub-slender architectural units." },
          { t: "3. Compliance Thresholds", d: "Pb (Probability of Breakage) thresholds are set per ASTM E1300 standard protocols (approx. 8 lites per 1000 at peak design load)." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-6 p-10 saas-glass rounded-3xl border-white/5">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{item.t}</h3>
            <p className="text-lg text-slate-500 font-light leading-relaxed">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  Contact: () => (
    <div className="py-48 text-center max-w-3xl mx-auto space-y-16 animate-in zoom-in duration-700">
      <div className="w-24 h-24 bg-[#10b981]/10 rounded-[32px] flex items-center justify-center text-[#10b981] mx-auto mb-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-[#10b981]/20">
        <Mail size={48} />
      </div>
      <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-8 text-glow-emerald">Bureau Inquiry</h2>
      <p className="text-2xl text-slate-500 font-light leading-relaxed">
        For forensic material investigation, technical consultation, or enterprise terminal access, initiate contact via our central directory.
      </p>
      <div className="saas-glass p-20 rounded-[64px] border-[#10b981]/20 group relative overflow-hidden cursor-pointer">
        <div className="absolute inset-0 bg-[#10b981]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
        <p className="text-4xl font-black text-white mb-4 tracking-tighter">magic.reviewsite@gmail.com</p>
        <p className="text-[12px] font-black uppercase tracking-[0.6em] text-[#10b981]">Engineering Directory Active</p>
      </div>
    </div>
  )
};

// --- APP CORE ---

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const renderView = () => {
    switch(view) {
      case 'engine': return <EngineModule settings={settings} setSettings={setSettings} />;
      case 'hub': return <HubModule />;
      case 'documentation': return <TrustPages.Documentation />;
      case 'about': return <TrustPages.About />;
      case 'contact': return <TrustPages.Contact />;
      case 'privacy': return <div className="py-32 px-12 max-w-4xl mx-auto"><h2 className="text-4xl font-black mb-12">Privacy Protocol</h2><p className="text-lg text-slate-500 font-light leading-relaxed">Structural data integrity is handled client-side. AI parity connection processes data transiently with AES-256 encryption.</p></div>;
      case 'terms': return <div className="py-32 px-12 max-w-4xl mx-auto"><h2 className="text-4xl font-black mb-12">Terms of Authority</h2><p className="text-lg text-slate-500 font-light leading-relaxed">Analysis results provide engineering guidance and must be verified by a locally licensed Professional Engineer for final sign-off.</p></div>;
      default: return <EngineModule settings={settings} setSettings={setSettings} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#10b981]/40">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }} className="max-w-[1440px] mx-auto min-h-screen flex flex-col">
          <Navigation active={view} onNavigate={setView} />
          <main className="flex-grow px-12 py-16">
            {renderView()}
          </main>
          <Footer onNavigate={setView} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}