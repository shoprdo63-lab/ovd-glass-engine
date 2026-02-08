
import './globals.css';
import React, { Component, useState, useId, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, 
  ChevronRight, 
  Mail, 
  AlertTriangle, 
  ArrowUpRight, 
  Sparkles, 
  Loader2, 
  Thermometer, 
  Terminal, 
  Hash, 
  Fingerprint, 
  Box, 
  BarChart3, 
  Microscope, 
  Compass, 
  PenTool, 
  Layout,
  Database,
  Globe,
  Wind,
  Activity,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- ERROR BOUNDARY ---
interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

// Fixed: Using React.Component explicitly to ensure 'props' is correctly typed and inherited
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState { return { hasError: true }; }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error("BUREAU_SYS_FAULT:", error, errorInfo); 
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-8 text-center">
          <div className="glass-panel p-12 rounded-[24px] max-w-lg border-[#10b981]/20">
            <AlertTriangle size={48} className="text-[#10b981] mx-auto mb-8" />
            <h1 className="text-xl font-bold uppercase tracking-widest mb-4 text-white">System Protocol Fault</h1>
            <p className="text-slate-500 mb-8 font-light text-sm">Critical structural kernel error. Auto-recovery sequence initiated.</p>
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-[#10b981] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all transform active:scale-95">Reboot Analysis Core</button>
          </div>
        </div>
      );
    }
    // Fixed line 62: Property 'props' is now correctly accessed via React.Component inheritance
    return this.props.children;
  }
}

// --- DATA ---
const BLOG_POSTS = [
  {
    id: "structural-principles",
    title: "Linear Elastic Fracture Mechanics in Amorphous Silicate Systems",
    category: "Mechanics",
    date: "24.05.2026",
    summary: "Comprehensive analysis of Griffith Crack Theory applied to non-linear stress distribution in monumental facades.",
    content: `Structural glass design represents the ultimate engineering challenge. Unlike ductile materials, glass fails catastrophically without plastic deformation. 

### 1. Linear Elastic Fracture Mechanics (LEFM)
Linear Elastic Fracture Mechanics provides the mathematical framework for understanding brittle materials. For amorphous silicate structures, we rely on the Griffith energy balance principle, where the applied tensile stress relates to critical surface flaws.

### 2. Young's Modulus and Poisson's Ratio
Computational simulations within the OVD Bureau utilize a Young's Modulus (E) of 70,000 MPa and a Poisson's Ratio (ν) of 0.22. These constants govern the elastic deflection profile. 

### 3. Probability of Breakage (Pb)
Safety factors for glass are expressed as breakage probabilities rather than deterministic ratios. Modern building codes, such as ASTM E1300, typically design for a Pb of less than 0.008 panels per 1,000.`
  },
  {
    id: "ior-refraction-physics",
    title: "Refractive Indices in High-Iron Substrate Variations",
    category: "Optics",
    date: "12.06.2026",
    summary: "Analyzing light interaction through multi-layered polymer interlayers and high-iron architectural assemblies.",
    content: `Optical clarity is a critical engineering metric for premium facades. 

### 1. Snell's Law in Multi-layered Assemblies
When light passes through multiple glass plies (n1=1.52) and polymer interlayers (n2=1.48), Snell's Law dictates the trajectory. 

### 2. Visible Light Transmission (VLT)
Standard clear glass contains higher iron concentrations, absorbing light in the green spectrum. Bureau-grade low-iron glass maintains VLT above 91%.`
  }
];

const DEFAULT_SETTINGS = {
  blur: 24, transparency: 0.02, saturation: 110, color: '#ffffff', 
  outlineOpacity: 0.1, borderRadius: 24, ior: 1.52, compressiveStrength: 120, 
  thermalCoeff: 8.5, transmission: 91,
};

// --- COMPONENTS ---

const StatusBadge = () => (
  <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-full">
    <div className="active-indicator animate-pulse" />
    <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em]">Live Analysis Online</span>
  </div>
);

const Navigation = ({ view, setView }: { view: string, setView: (v: string) => void }) => (
  <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-2xl px-8 py-4 flex justify-between items-center">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('engine')}>
        <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-black font-black text-lg transition-transform group-hover:scale-105">O</div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">OVD Bureau</span>
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500">Structural Engineering</span>
        </div>
      </div>
      <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
      <div className="hidden md:flex items-center gap-8">
        {['engine', 'archive', 'protocol'].map((item) => (
          <button 
            key={item}
            onClick={() => setView(item === 'archive' ? 'blog' : item)}
            className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-[#10b981] ${view === (item === 'archive' ? 'blog' : item) ? 'text-[#10b981]' : 'text-slate-500'}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-6">
      <StatusBadge />
      <button onClick={() => setView('contact')} className="px-5 py-2 bg-[#10b981] text-black rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg active:scale-95">Inquiry Terminal</button>
    </div>
  </nav>
);

const LabControl = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => {
  const id = useId();
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          {label}
        </label>
        <span className="text-[10px] font-mono text-[#10b981] font-bold">
          {value}{unit}
        </span>
      </div>
      <input id={id} className="bureau-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
};

const Breadcrumbs = ({ view }: { view: string }) => (
  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-8">
    <span className="hover:text-[#10b981] cursor-pointer">Bureau</span>
    <ChevronRight size={10} />
    <span className="text-slate-400">{view}</span>
  </div>
);

const EngineTerminal = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  // Correctly handling structural analysis with Gemini SDK
  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      // Use the standard GoogleGenAI client with the required API_KEY format
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Structural report for glass: IOR ${settings.ior}, MPa ${settings.compressiveStrength}, VLT ${settings.transmission}%. Analyze safety code ASTM E1300.`,
        config: { 
          systemInstruction: "Principal Structural Engineer at OVD Bureau. Output technical density, no fluff.",
        }
      });
      // response.text is a property that returns the generated string
      setInsight(response.text || 'No data generated.');
    } catch (e) {
      console.error("ANALYSIS_FAULT:", e);
      setInsight('Fault in analysis core. Verify credentials.');
    } finally { setAnalyzing(false); }
  };

  const rgb = "255, 255, 255";
  const trans = (settings.transmission / 100) * settings.transparency;

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4 space-y-8">
        <section className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-white">
              <Terminal size={14} className="text-[#10b981]" /> Parameter Input
            </h3>
            <button 
              onClick={runAnalysis} 
              disabled={analyzing}
              className="px-3 py-1.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded text-[#10b981] text-[9px] font-bold uppercase tracking-widest hover:bg-[#10b981]/20 transition-all flex items-center gap-2"
            >
              {analyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              Compute
            </button>
          </div>
          <div className="space-y-6">
            <LabControl label="Index of Refraction" value={settings.ior} min={1.0} max={2.6} step={0.01} onChange={(v:any) => setSettings({...settings, ior: v})} />
            <LabControl label="Compressive MPa" value={settings.compressiveStrength} min={20} max={600} onChange={(v:any) => setSettings({...settings, compressiveStrength: v})} />
            <LabControl label="Thermal Coeff (α)" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={(v:any) => setSettings({...settings, thermalCoeff: v})} />
            <LabControl label="Visible Light Trans" value={settings.transmission} min={0} max={100} unit="%" onChange={(v:any) => setSettings({...settings, transmission: v})} />
            <LabControl label="Optical Diffusion" value={settings.blur} min={0} max={80} unit="px" onChange={(v:any) => setSettings({...settings, blur: v})} />
          </div>
        </section>

        {insight && (
          <article className="glass-panel p-8 rounded-2xl bg-[#10b981]/[0.02] border-[#10b981]/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <Cpu size={14} className="text-[#10b981]" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Bureau Intelligence Report</h4>
            </div>
            <div className="text-[11px] text-slate-400 font-mono leading-relaxed space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {insight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </article>
        )}
      </div>

      <div className="col-span-12 lg:col-span-8 space-y-8">
        <section className="aspect-video glass-panel rounded-3xl flex items-center justify-center relative overflow-hidden bg-[#030303] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div 
            style={{
              width: '80%', height: '70%',
              background: `rgba(${rgb}, ${trans})`,
              backdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
              WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
              borderRadius: `${settings.borderRadius}px`,
              border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
              boxShadow: `0 40px 80px -20px rgba(0,0,0,0.4)`,
              transform: `perspective(2000px) rotateY(${(settings.ior - 1.52) * 20}deg)`
            }} 
            className="p-12 flex flex-col transition-all duration-700 ease-out relative group"
          >
             <div className="absolute top-6 left-6 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
               <span className="text-[8px] font-bold uppercase tracking-widest text-[#10b981]">Spectral Analysis Mode</span>
             </div>
             
             <div className="mt-auto">
               <h4 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Simulated Assembly</h4>
               <div className="flex gap-6 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                 <span className="flex items-center gap-2"><Thermometer size={10} className="text-[#10b981]" /> Pass</span>
                 <span className="flex items-center gap-2"><Activity size={10} className="text-[#10b981]" /> Stable</span>
                 <span className="flex items-center gap-2"><Layers size={10} className="text-[#10b981]" /> {settings.ior}n</span>
               </div>
             </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "VLT Grade", value: "91.2%", status: "Optic_A" },
            { label: "Stress Yield", value: "145 MPa", status: "Nominal" },
            { label: "Expansion Coeff", value: "8.5e-6/K", status: "Verified" },
            { label: "Safety Rating", value: "ASTM E1300", status: "Complaint" }
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border-white/5 group hover:border-[#10b981]/20 transition-all">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">{stat.label}</span>
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-[8px] font-mono text-[#10b981] bg-[#10b981]/5 px-2 py-0.5 rounded uppercase tracking-widest">{stat.status}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find(p => p.id === activePostId);

  return (
    <div className="bg-[#050505] min-h-screen text-slate-400">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }} className="max-w-[1400px] mx-auto text-[14px] min-h-screen">
          <Navigation view={view} setView={setView} />
          
          <main className="px-12 py-16">
            <Breadcrumbs view={view} />

            {view === 'engine' && (
              <div className="space-y-20">
                <header className="max-w-4xl space-y-6">
                  <div className="flex items-center gap-4 text-[#10b981] font-bold text-[10px] uppercase tracking-[0.5em]">
                    <Fingerprint size={16} /> Technical Bureau Framework v2.4
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] text-glow">
                    Structural Material <br/> <span className="text-slate-700">Simulation Engine</span>
                  </h1>
                  <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
                    Independent structural engineering authority for monumental facades. Real-time deterministic modelling of linear elastic fracture mechanics in high-performance glass substrates.
                  </p>
                </header>
                
                <EngineTerminal settings={settings} setSettings={setSettings} />

                <section className="grid grid-cols-12 gap-12 pt-20 border-t border-white/5">
                  <div className="col-span-12 lg:col-span-7 space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Protocol Integrity</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                      <article className="space-y-4">
                        <h4 className="text-white font-bold uppercase text-[11px] tracking-widest flex items-center gap-2">
                          <Wind size={14} className="text-[#10b981]" /> Environmental Loading
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Integration of local climatic wind-load models with geometric stiffness variables to ensure facade resilience against peak gusts and sustained pressures.</p>
                      </article>
                      <article className="space-y-4">
                        <h4 className="text-white font-bold uppercase text-[11px] tracking-widest flex items-center gap-2">
                          <Shield size={14} className="text-[#10b981]" /> Safety Compliance
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Adherence to international standards including ASTM E1300 and EN 16612 for breakage probability assessment and post-failure performance.</p>
                      </article>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <div className="glass-panel p-10 rounded-3xl border-white/10 space-y-8">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">Technical Nodes</h3>
                      {[
                        { icon: Microscope, title: "Forensic Analysis", desc: "NiS expansion risk mitigation and post-failure investigation." },
                        { icon: Compass, title: "Geometric Stiffness", desc: "Simulation of large-scale panel deflections and membrane stresses." },
                        { icon: FileText, title: "Compliance Logs", desc: "Automated generation of technical facade documentation." }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 group cursor-default">
                          <item.icon className="w-6 h-6 text-[#10b981]/40 group-hover:text-[#10b981] transition-colors shrink-0" />
                          <div>
                            <h5 className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{item.title}</h5>
                            <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {view === 'blog' && (
              <section className="space-y-16 animate-in fade-in duration-700">
                <header className="max-w-2xl">
                  <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Technical Archive</h2>
                  <p className="text-lg text-slate-500 font-light leading-relaxed">Centralized knowledge repository for material physics, structural forensics, and high-density engineering protocols.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BLOG_POSTS.map(post => (
                    <article 
                      key={post.id} 
                      onClick={() => { setActivePostId(post.id); setView('blog-detail'); }} 
                      className="glass-panel p-10 rounded-3xl cursor-pointer group hover:border-[#10b981]/30 flex flex-col h-full"
                    >
                      <span className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-8">{post.category}</span>
                      <h3 className="text-2xl font-black text-white mb-6 group-hover:text-[#10b981] transition-colors leading-tight tracking-tight uppercase">{post.title}</h3>
                      <p className="text-sm font-light text-slate-500 mb-10 line-clamp-3 leading-relaxed">{post.summary}</p>
                      <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        <span>{post.date}</span>
                        <div className="flex items-center gap-2 group-hover:text-[#10b981] transition-colors">
                          Open Protocol <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {view === 'blog-detail' && activePost && (
              <article className="max-w-3xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <button onClick={() => setView('blog')} className="text-[#10b981] text-[10px] font-bold uppercase tracking-[0.3em] mb-16 flex items-center gap-2 hover:text-white transition-all group">
                  <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Return to Archive
                </button>
                <div className="flex items-center gap-4 text-[10px] font-bold text-[#10b981] uppercase tracking-[0.3em] mb-8">
                  <span>{activePost.category}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-slate-600">{activePost.date}</span>
                </div>
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-16 leading-[1.1]">{activePost.title}</h1>
                <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed whitespace-pre-wrap text-base prose-emerald">
                  {activePost.content}
                </div>
              </article>
            )}

            {view === 'protocol' && (
              <section className="space-y-16 py-12">
                <header className="max-w-2xl">
                  <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">Global Protocols</h2>
                  <p className="text-lg text-slate-500 font-light leading-relaxed">Standards documentation for structural glass implementation across international jurisdictions.</p>
                </header>
                <div className="grid gap-8">
                  {[
                    { t: "ASTM E1300 Baseline", d: "Standard Practice for Determining Load Resistance of Glass in Buildings. Fundamental calculation matrix for monolithic and laminated assemblies." },
                    { t: "Weibull Distribution Model", d: "Stochastic strength assessment for amorphous silicate facades subject to cyclical environmental loading." },
                    { t: "Thermal Gradient Mitigation", d: "Analysis of solar absorption profiles and edge resistance limits to prevent spontaneous thermal fracture." }
                  ].map((doc, idx) => (
                    <div key={idx} className="glass-panel p-12 rounded-3xl border-white/5 group hover:border-white/20 transition-all flex flex-col md:flex-row gap-12 items-start">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl shrink-0 flex items-center justify-center text-[#10b981] font-bold text-2xl group-hover:bg-[#10b981] group-hover:text-black transition-all">
                        {idx + 1}
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{doc.t}</h3>
                        <p className="text-base font-light text-slate-500 leading-relaxed max-w-3xl">{doc.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {view === 'contact' && (
              <section className="py-32 text-center flex flex-col items-center max-w-2xl mx-auto animate-in zoom-in duration-700">
                <div className="w-16 h-16 bg-[#10b981]/10 rounded-2xl flex items-center justify-center text-[#10b981] mb-12">
                  <Mail size={32} />
                </div>
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8">Bureau Inquiry</h2>
                <p className="text-lg text-slate-500 font-light leading-relaxed mb-16">
                  For professional technical consulting, forensic material investigation, or structural simulation requests, initiate contact via our central directory.
                </p>
                <div className="glass-panel p-12 rounded-[40px] w-full border-[#10b981]/20 shadow-[0_0_100px_rgba(16,185,129,0.05)] group">
                  <p className="text-3xl font-bold text-white mb-4 tracking-tighter">magic.reviewsite@gmail.com</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#10b981]">Central Directory Protocol</p>
                </div>
              </section>
            )}
          </main>

          <footer className="py-24 px-12 border-t border-white/5 bg-[#030303]/40 mt-32">
            <div className="grid grid-cols-12 gap-16">
              <div className="col-span-12 lg:col-span-5 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#10b981] flex items-center justify-center rounded-lg text-black font-black text-lg">O</div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter leading-none">OVD Independent Bureau</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-sm">
                  The OVD Bureau is the leading authority on high-performance structural glass simulation and forensic material analysis. We provide technical facade documentation for monumental architecture worldwide.
                </p>
                <div className="flex gap-6 text-slate-800">
                  <Database size={20} className="hover:text-[#10b981] cursor-pointer transition-colors" />
                  <Shield size={20} className="hover:text-[#10b981] cursor-pointer transition-colors" />
                  <Globe size={20} className="hover:text-[#10b981] cursor-pointer transition-colors" />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.3em]">Directory</h4>
                  <ul className="text-xs space-y-4 font-bold uppercase tracking-[0.2em] text-slate-700">
                    <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setView('engine')}>Engine</li>
                    <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setView('blog')}>Technical Archive</li>
                    <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setView('protocol')}>Global Protocols</li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.3em]">Divisions</h4>
                  <ul className="text-xs space-y-4 font-bold uppercase tracking-[0.2em] text-slate-700">
                    <li className="cursor-pointer hover:text-white transition-colors">Forensics</li>
                    <li className="cursor-pointer hover:text-white transition-colors">Simulation</li>
                    <li className="cursor-pointer hover:text-white transition-colors">Compliance</li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.3em]">Authority</h4>
                  <ul className="text-xs space-y-4 font-bold uppercase tracking-[0.2em] text-slate-700">
                    <li className="cursor-pointer hover:text-white transition-colors">Documentation</li>
                    <li className="cursor-pointer hover:text-white transition-colors">Licensing</li>
                    <li className="cursor-pointer hover:text-white transition-colors">Safety</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-slate-800 tracking-[0.5em] uppercase">
              <p>© 2026 OVD Independent Engineering Bureau. All Simulation Rights Reserved.</p>
              <div className="flex gap-8 items-center">
                <span className="flex items-center gap-2"><PenTool size={12} className="opacity-30" /> Swiss Design Bureau</span>
                <span className="flex items-center gap-2"><Activity size={12} className="opacity-30" /> Core_v2.4.0</span>
              </div>
            </div>
          </footer>
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
