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
  Wind
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- ERROR BOUNDARY ---
interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

// Use React.Component explicitly to ensure proper inheritance of state and props in TypeScript
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly declare state for strict TypeScript compliance where property existence might be checked on the class instance
  public override state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState { return { hasError: true }; }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error("BUREAU_SYS_FAULT:", error, errorInfo); 
  }

  render() {
    // Correctly accessing state and props which are now properly typed via React.Component inheritance and explicit declaration
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-8 text-center">
          <div className="glass-panel p-12 rounded-[32px] max-w-lg border-[#10b981]/20">
            <AlertTriangle size={64} className="text-[#10b981] mx-auto mb-8 animate-pulse" />
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Kernel Segmentation Fault</h1>
            <p className="text-slate-500 mb-8 font-light leading-relaxed text-sm">Structural engine failure. Lock engaged.</p>
            <button onClick={() => window.location.reload()} className="w-full py-3 bg-[#10b981] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all transform active:scale-95">Reboot Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- CONSTANTS ---
const CATEGORIES = ["Structural", "Architectural", "Logistics", "Compliance", "Forensics", "Innovation"];
const DEFAULT_SETTINGS = {
  blur: 32, transparency: 0.02, saturation: 115, color: '#ffffff', 
  outlineOpacity: 0.1, shadowBlur: 40, shadowOpacity: 0.2, 
  lightAngle: 145, borderRadius: 32, ior: 1.52, compressiveStrength: 120, 
  thermalCoeff: 8.5, transmission: 91, specularity: 0.9,
};

const PRESETS = [
  { name: "Cupertino High-Iron v4", category: "Commercial", settings: { ...DEFAULT_SETTINGS, blur: 40, transparency: 0.05, saturation: 160, color: "#ffffff", outlineOpacity: 0.2, borderRadius: 24, ior: 1.52, transmission: 92, specularity: 0.95 } },
  { name: "SentryGlas Spatial-X", category: "Advanced", settings: { ...DEFAULT_SETTINGS, blur: 64, transparency: 0.08, saturation: 120, color: "#ffffff", outlineOpacity: 0.5, borderRadius: 40, ior: 2.2, transmission: 96, specularity: 1.0 } },
  { name: "Industrial Carbon Toughened", category: "Structural", settings: { ...DEFAULT_SETTINGS, blur: 80, transparency: 0.1, saturation: 0, color: "#09090b", outlineOpacity: 0.1, borderRadius: 28, compressiveStrength: 480, ior: 2.4, specularity: 0.2 } },
  { name: "Nordic Laminated Frost", category: "Architectural", settings: { ...DEFAULT_SETTINGS, blur: 24, transparency: 0.15, saturation: 110, color: "#f0f9ff", outlineOpacity: 0.4, borderRadius: 20, ior: 1.6, specularity: 0.7 } }
];

const BLOG_POSTS = [
  {
    id: "structural-principles",
    title: "Theoretical Mechanics of Structural Glass: Non-Linear Stress Distribution and Probabilistic Failure",
    category: "Mechanics",
    date: "May 20, 2026",
    summary: "A deep dive into Linear Elastic Fracture Mechanics (LEFM) and Griffith Crack Theory applied to amorphous silicate structures.",
    content: `Structural glass design represents the ultimate engineering challenge. Unlike ductile materials, glass fails catastrophically without plastic deformation. This "all or nothing" behavior necessitates a statistical approach to safety.

### 1. Linear Elastic Fracture Mechanics (LEFM)
Linear Elastic Fracture Mechanics provides the mathematical framework for understanding brittle materials. For amorphous silicate structures, we rely on the Griffith energy balance principle, where the applied tensile stress relates to critical surface flaws. In architectural applications, the orientation and density of these microscopic flaws (Griffith flaws) dictate the functional strength of the panel.

### 2. Griffith Crack Theory and Fracture Energy
The fundamental equation relating stress (σ) to critical crack length (a) assumes a balance between the elastic strain energy released as a crack propagates and the surface energy required for new material separation. This stochastic property means glass has no singular "yield strength," only a probability of breakage at specific loads.

### 3. Young's Modulus and Poisson's Ratio
Computational simulations within the OVD Bureau utilize a Young's Modulus (E) of 70,000 MPa and a Poisson's Ratio (ν) of 0.22. These constants govern the elastic deflection profile. Understanding membrane stresses is vital; as a panel undergoes large-scale deflection relative to its thickness, secondary tensile forces develop that can trigger failure before primary bending limits are reached.

### 4. Thermal Toughening Dynamics
The thermal toughening process involves heating glass to its softening point (~620°C) and rapidly quenching it with air. This induces permanent compressive stress on the surfaces (approx. 90-150 MPa). This "compressive skin" must be overcome by external loads before pre-existing flaws can propagate. Our simulation core calculates this threshold in real-time.

### 5. Probability of Breakage (Pb)
Safety factors for glass are expressed as breakage probabilities rather than deterministic ratios. Modern building codes, such as ASTM E1300, typically design for a Pb of less than 0.008 panels per 1,000. Our engine allows engineers to visualize where stresses accumulate, ensuring adherence to global safety mandates for monumental skylights and skyscrapers.`
  },
  {
    id: "ior-refraction-physics",
    title: "Index of Refraction (IOR) and Optical Deviations in High-Performance Laminated Assemblies",
    category: "Optics",
    date: "June 02, 2026",
    summary: "Analyzing the complex interaction of light through multi-layered polymer interlayers and high-iron substrate variations.",
    content: `Optical clarity is a critical engineering metric for premium facades. As lamination thickness increases, the parasitic absorption of iron oxides and refractive deviations become pronounced.

### 1. Snell's Law and Multi-layered Refraction
When light passes through multiple glass plies (n1=1.52) and polymer interlayers (n2=1.48), Snell's Law (n1 sinθ1 = n2 sinθ2) dictates the beam trajectory. Cumulative refractive deviations across thick laminated assemblies lead to visible "pincushion" distortions.

### 2. Iron Oxide Concentration and Transmission
Standard clear glass contains higher iron concentrations, absorbing light in the green spectrum. Bureau-grade low-iron glass (Starphire/Optiwhite) maintains a Visible Light Transmission (VLT) above 91%. Our optical simulator models the shift between high-iron industrial substrates and low-iron architectural lites, helping designers maintain clarity in deep-lamination structural plies.

### 3. Z-Distortion and Roll Wave
Thermal heat treatment introduces Roll Wave distortion—microscopic waves on the glass surface caused by the tempering furnace rollers. When laminated, these waves interact, causing optical "banding." OVD Bureau simulation accounts for these deviations to predict the final aesthetic performance of the facade.`
  }
];

// --- UI COMPONENTS ---

const Navigation = ({ view, setView }: { view: string, setView: (v: string) => void }) => (
  <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-3xl px-12 py-5 flex justify-between items-center">
    <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setView('engine')}>
      <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-black font-black text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-110">O</div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white leading-none">OVD BUREAU</span>
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#10b981]/60 leading-none mt-1">Independent Structural</span>
      </div>
    </div>
    <div className="hidden md:flex items-center gap-10">
      {['engine', 'archive', 'protocol'].map((item) => (
        <button 
          key={item}
          onClick={() => setView(item === 'archive' ? 'blog' : item)}
          className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-white ${view === (item === 'archive' ? 'blog' : item) ? 'text-[#10b981]' : 'text-slate-500'}`}
        >
          {item}
        </button>
      ))}
    </div>
    <button onClick={() => setView('contact')} className="px-6 py-2 bg-[#10b981] text-black rounded-lg text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl active:scale-95">Inquiry Terminal</button>
  </nav>
);

const LabControl = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => {
  const id = useId();
  return (
    <div className="group mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-[#10b981] transition-colors flex items-center gap-2">
          <Hash size={10} className="text-[#10b981]/40" /> {label}
        </label>
        <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/5 px-2 py-0.5 rounded border border-[#10b981]/10">
          {value}{unit}
        </span>
      </div>
      <input id={id} className="bureau-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
};

const EngineTerminal = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const runStructuralAnalysis = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Structural engineering report request: Analysis of glass substrate with IOR ${settings.ior}, Strength ${settings.compressiveStrength}MPa, expansion coeff ${settings.thermalCoeff}, transmission ${settings.transmission}%. Analyze safety code compliance (ASTM E1300/EN 16612).`,
        config: { 
          systemInstruction: "You are the Principal Structural Engineer at OVD Bureau. Output technical analysis blocks with high technical density. No fluff. Use only English ASCII.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      setInsight(response.text || 'Bureau analysis returned no content.');
    } catch (error) { 
      console.error("AI_ANALYSIS_ERROR:", error);
      setInsight('Bureau parity connection failed. Check system logs.'); 
    }
    finally { setAnalyzing(false); }
  };

  const hexToRgb = (hex: string) => {
    const cleanHex = String(hex).replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16) || 255;
    const g = parseInt(cleanHex.slice(2, 4), 16) || 255;
    const b = parseInt(cleanHex.slice(4, 6), 16) || 255;
    return `${r}, ${g}, ${b}`;
  };

  const rgb = hexToRgb(settings.color);
  const trans = (settings.transmission / 100) * settings.transparency;

  return (
    <div className="grid grid-cols-12 gap-10 py-10">
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
        <div className="glass-panel p-8 rounded-[32px] border-white/10">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3">
              <Terminal size={14} className="text-[#10b981]" /> Matrix Input
            </h3>
            <button onClick={runStructuralAnalysis} disabled={analyzing} className="p-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg text-[#10b981] hover:bg-[#10b981]/20 transition-all active:scale-90">
              {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            </button>
          </div>
          <LabControl label="Refraction Index" value={settings.ior} min={1.0} max={2.6} step={0.01} onChange={(v:any) => setSettings({...settings, ior: v})} />
          <LabControl label="Compressive MPa" value={settings.compressiveStrength} min={20} max={600} onChange={(v:any) => setSettings({...settings, compressiveStrength: v})} />
          <LabControl label="Expansion Alpha" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={(v:any) => setSettings({...settings, thermalCoeff: v})} />
          <LabControl label="Optical Diffusion" value={settings.blur} min={0} max={80} onChange={(v:any) => setSettings({...settings, blur: v})} unit="px" />
          <LabControl label="VLT Coefficient" value={settings.transmission} min={0} max={100} onChange={(v:any) => setSettings({...settings, transmission: v})} unit="%" />
        </div>

        {insight && (
          <div className="glass-panel p-8 rounded-[32px] bg-[#10b981]/[0.02] border-[#10b981]/20 opacity-0 transition-opacity duration-700" style={{ opacity: insight ? 1 : 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <Shield size={14} className="text-[#10b981]" />
              <h4 className="text-[9px] font-black uppercase tracking-[0.4em]">Bureau Intelligence</h4>
            </div>
            <div className="text-[11px] text-slate-400 font-mono leading-relaxed space-y-4">
              {insight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        )}
      </div>

      <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
        <div className="aspect-video glass-panel rounded-[40px] flex items-center justify-center relative overflow-hidden bg-[#050505] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div 
            style={{
              width: '80%', height: '70%',
              background: `rgba(${rgb}, ${trans})`,
              backdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
              WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
              borderRadius: `${settings.borderRadius}px`,
              border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
              boxShadow: `0 40px 100px -20px rgba(0,0,0,0.6)`,
              transform: `perspective(2000px) rotateY(${(settings.ior - 1.5) * 15}deg)`
            }} 
            className="p-12 flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <div className="flex justify-between items-start mb-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50"><Layout size={24} /></div>
              <span className="px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full text-[8px] font-black text-[#10b981] tracking-[0.2em] uppercase">Verified_SAFE</span>
            </div>
            <h4 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase leading-none">Simulation Core</h4>
            <div className="flex gap-8 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2"><Thermometer size={12} className="text-[#10b981]" /> Thermal: OK</div>
              <div className="flex items-center gap-2"><Wind size={12} className="text-[#10b981]" /> Pressure: Stable</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRESETS.map((p, idx) => (
            <button key={idx} onClick={() => setSettings(p.settings)} className="glass-panel p-5 rounded-2xl group hover:border-[#10b981] transition-all text-left border-white/10 active:scale-95">
              <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1 block group-hover:text-[#10b981]">{p.category}</span>
              <h5 className="text-[10px] font-black text-white uppercase group-hover:text-[#10b981]">{p.name}</h5>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleHub = ({ setView, setActivePost }: any) => (
  <div className="py-20 transition-all duration-1000">
    <div className="max-w-3xl mb-16">
      <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-6 leading-none">Technical Archive</h2>
      <p className="text-base text-slate-500 font-light leading-relaxed">Centralized knowledge repository for structural glass mechanics, forensics, and compliance protocols.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {BLOG_POSTS.map(post => (
        <article key={post.id} onClick={() => { setActivePost(post.id); setView('blog-detail'); }} className="glass-panel p-10 rounded-[32px] cursor-pointer group hover:border-[#10b981]/40 border-white/10 h-full flex flex-col">
          <span className="text-[9px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-8">{post.category}</span>
          <h3 className="text-xl font-black text-white mb-6 group-hover:text-[#10b981] transition-colors uppercase leading-tight tracking-tighter">{post.title}</h3>
          <p className="text-xs font-light text-slate-500 mb-10 line-clamp-4 leading-relaxed">{post.summary}</p>
          <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-mono opacity-40 uppercase">
            <span>{post.date}</span>
            <ArrowUpRight size={16} />
          </div>
        </article>
      ))}
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find(p => p.id === activePostId);

  return (
    <div className="bg-[#050505] min-h-screen text-slate-400 overflow-x-hidden font-sans">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }} className="max-w-[1440px] mx-auto text-[14px] transition-all duration-1000 min-h-screen">
          <Navigation view={view} setView={setView} />
          
          <main className="px-12 pb-24">
            {view === 'engine' && (
              <div>
                <header className="pt-24 pb-12 flex flex-col md:flex-row items-end justify-between gap-8">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 text-[#10b981] mb-6 font-black text-[9px] uppercase tracking-[0.6em]">
                      <Fingerprint size={16} className="animate-pulse" /> Material Intelligence Terminal
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85] text-glow">
                      Structural <br/> Analysis Bureau
                    </h2>
                  </div>
                  <div className="text-right flex flex-col items-end gap-4 max-w-xs">
                    <BarChart3 size={32} className="text-[#10b981]/20" />
                    <p className="text-xs text-slate-600 uppercase tracking-widest leading-loose">Digital framework for material physics simulation v2.4.0</p>
                  </div>
                </header>
                
                <EngineTerminal settings={settings} setSettings={setSettings} />

                <section className="py-24 border-t border-white/5 grid grid-cols-12 gap-12">
                   <div className="col-span-12 lg:col-span-7">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">Bureau Technical Protocols</h3>
                      <div className="space-y-6 text-sm text-slate-500 font-light leading-relaxed">
                        <p>In high-performance facade engineering, the designation of glass as a structural medium necessitates precise deterministic modelling. The OVD Bureau Engine operates on ASTM E1300 and EN 16612 baseline protocols, integrating local climatic wind-load models with geometric stiffness variables.</p>
                        <p>Every analysis conducted in this terminal accounts for Young's Modulus and Poisson's Ratio as fixed material constants while allowing modulation of Compressive Pre-Stress Yield. This is vital for determining the "Critical Crack Length" across laminated composite surfaces.</p>
                      </div>
                   </div>
                   <div className="col-span-12 lg:col-span-5">
                      <div className="glass-panel p-10 rounded-[40px] border-white/10 space-y-8">
                         {[
                           { icon: Microscope, title: "Forensic Parity", desc: "NiS expansion risk verification." },
                           { icon: Compass, title: "Snell Mapping", desc: "Refractive index calculations for IGU." },
                           { icon: Box, title: "Dead Load Calc", desc: "Precise mass-density anchor sizing." }
                         ].map((item, idx) => (
                           <div key={idx} className="flex gap-6 group">
                              <item.icon className="w-8 h-8 text-[#10b981]/20 group-hover:text-[#10b981] transition-colors shrink-0" />
                              <div>
                                <h4 className="text-white font-black uppercase text-[10px] mb-1 tracking-widest leading-none">{item.title}</h4>
                                <p className="text-slate-500 text-[10px] font-light leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </section>
              </div>
            )}

            {view === 'blog' && <ArticleHub setView={setView} setActivePost={setActivePostId} />}

            {view === 'blog-detail' && activePost && (
              <article className="py-32 max-w-3xl mx-auto transition-all duration-700">
                <button onClick={() => setView('blog')} className="text-[#10b981] text-[9px] font-black uppercase tracking-[0.5em] mb-16 flex items-center gap-4 hover:text-white transition-all group">
                  <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-2 transition-transform" /> Back to Archive
                </button>
                <div className="flex items-center gap-4 text-[9px] font-black text-[#10b981]/40 uppercase tracking-[0.4em] mb-8">
                  <span>{activePost.category}</span>
                  <Hash size={12} />
                  <span>Protocol {activePost.id.toUpperCase()}</span>
                </div>
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-16 leading-tight text-glow">{activePost.title}</h1>
                <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed whitespace-pre-wrap text-base prose-emerald">
                  {activePost.content}
                </div>
              </article>
            )}

            {view === 'protocol' && (
              <div className="py-32 max-w-5xl mx-auto">
                <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-20 text-glow">Framework Protocol</h2>
                <div className="grid gap-10">
                  {[
                    { t: "ASTM E1300 Compliance", d: "Standard Practice for Determining Load Resistance of Glass in Buildings. Baseline for OVD structural math." },
                    { t: "Weibull Probability Modelling", d: "Stochastic strength assessment for amorphous silicate facades subject to environmental loading." },
                    { t: "Thermal Stress Management", d: "Solar absorption analysis and edge resistance limits for low-e coated monolithic assemblies." },
                    { t: "Seismic Drift Simulation", d: "Analysis of facade behavior during inter-story drift events and high-velocity shear stress." }
                  ].map((doc, idx) => (
                    <div key={idx} className="glass-panel p-12 rounded-[40px] border-white/10 group">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-[#10b981] transition-colors mb-6">{doc.t}</h3>
                      <p className="text-lg font-light text-slate-500 leading-relaxed max-w-3xl">{doc.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === 'contact' && (
              <section className="py-48 text-center flex flex-col items-center">
                <h2 className="text-8xl font-black text-white uppercase tracking-tighter mb-12 text-glow">Inquiry</h2>
                <div className="glass-panel p-20 rounded-[80px] w-full max-w-2xl border-[#10b981]/20 shadow-[0_0_80px_rgba(16,185,129,0.05)]">
                  <Mail size={48} className="text-[#10b981]/20 mx-auto mb-12" />
                  <p className="text-3xl font-black text-white mb-6 tracking-tighter uppercase">magic.reviewsite@gmail.com</p>
                  <div className="flex justify-center gap-10 text-[9px] font-black uppercase tracking-[0.8em] text-slate-800">
                    <span>London</span>
                    <span>Zurich</span>
                    <span>Tokyo</span>
                  </div>
                </div>
              </section>
            )}
          </main>

          <footer className="py-24 px-12 border-t border-white/5 bg-[#050505]/40 mt-12">
            <div className="grid grid-cols-12 gap-16">
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-[#10b981] flex items-center justify-center rounded-xl text-black font-black text-xl">O</div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">OVD Bureau</h3>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed max-w-sm mb-10">Global authority in structural glass simulation, technical facade documentation, and forensic material investigation bureau services since 2018.</p>
                <div className="flex gap-6 text-[#10b981]/20">
                  <Database size={20} />
                  <Shield size={20} />
                  <Globe size={20} />
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-10">
                <div>
                  <h4 className="text-[9px] font-black uppercase text-[#10b981] tracking-[0.4em] mb-10 opacity-40">Hub</h4>
                  <ul className="text-xs space-y-5 font-black uppercase tracking-[0.3em] text-slate-700">
                    <li className="cursor-pointer hover:text-white" onClick={() => setView('engine')}>Engine</li>
                    <li className="cursor-pointer hover:text-white" onClick={() => setView('blog')}>Archive</li>
                    <li className="cursor-pointer hover:text-white" onClick={() => setView('protocol')}>Protocol</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[9px] font-black uppercase text-[#10b981] tracking-[0.4em] mb-10 opacity-40">Bureau</h4>
                  <ul className="text-xs space-y-5 font-black uppercase tracking-[0.3em] text-slate-700">
                    <li>Logistics</li>
                    <li>Compliance</li>
                    <li>Forensics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[9px] font-black uppercase text-[#10b981] tracking-[0.4em] mb-10 opacity-40">Legal</h4>
                  <ul className="text-xs space-y-5 font-black uppercase tracking-[0.3em] text-slate-700">
                    <li className="cursor-pointer hover:text-white">Privacy</li>
                    <li className="cursor-pointer hover:text-white">Terms</li>
                    <li className="cursor-pointer hover:text-white">Safety</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] font-mono text-slate-800 tracking-[0.6em] uppercase">
              <p>© 2026 OVD Independent Bureau. Analysis Engine Core v2.4.0-Stable_Production</p>
              <div className="flex gap-6 items-center">
                <PenTool size={14} className="opacity-20" />
                <span>Swiss Design Standards</span>
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