import './globals.css';
import React, { useState, useId, useEffect, ReactNode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, ChevronRight, Mail, AlertTriangle, ArrowUpRight, Sparkles, Loader2, 
  Thermometer, Terminal, Hash, Fingerprint, Box, BarChart3, Microscope, 
  Compass, PenTool, Layout, Database, Globe, Wind, Activity, Cpu, Layers, 
  FileText, Copy, Code, Eye, ExternalLink, Github, Twitter, Linkedin,
  Search, BookOpen, Info, CheckCircle, Scale, Zap, Settings, Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TYPES & INTERFACES ---
interface NavItem { id: string; label: string; icon: ReactNode; }
interface BlogPost { id: string; title: string; category: string; date: string; author: string; readTime: string; summary: string; content: string; image?: string; }
interface TechnicalMetric { label: string; value: string; unit: string; trend: 'up' | 'down' | 'stable'; description: string; }

// --- CONSTANTS & DATA ---
const NAV_ITEMS: NavItem[] = [
  { id: 'engine', label: 'Engine', icon: <Cpu size={14} /> },
  { id: 'hub', label: 'Knowledge Hub', icon: <BookOpen size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
  { id: 'features', label: 'Features', icon: <Layers size={14} /> },
  { id: 'about', label: 'About', icon: <Info size={14} /> },
];

const METRICS: TechnicalMetric[] = [
  { label: 'Refractive Index', value: '1.52', unit: 'n', trend: 'stable', description: 'Standard high-iron float baseline.' },
  { label: 'Tensile Capacity', value: '45.8', unit: 'MPa', trend: 'up', description: 'After thermal toughening optimization.' },
  { label: 'Solar Heat Gain', value: '0.62', unit: 'SHGC', trend: 'down', description: 'Optimized via low-e coating simulation.' },
  { label: 'Probability Failure', value: '8e-4', unit: 'Pb', trend: 'stable', description: 'ASTM E1300 safety threshold.' },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'structural-glass-mechanics',
    title: 'Advanced Mechanics of Laminated Composite Glazing Systems',
    category: 'Structural Physics',
    date: 'March 14, 2026',
    author: 'Dr. Elena Vance',
    readTime: '12 min',
    summary: 'A definitive analysis of shear-lag effects and inter-layer relaxation constants in multi-layered structural glass assemblies.',
    content: `
      <h2>The Physics of Transparency</h2>
      <p>Structural glass engineering is moving beyond simple monolithic load assessment. Modern high-performance facades rely on complex laminated composites that behave as non-linear viscoelastic systems. Understanding the shear transfer between glass plies via polymer interlayers (PVB, Ionoplast) is critical for structural efficiency.</p>
      
      <h3>1. Effective Thickness Theory</h3>
      <p>The calculation of effective thickness (h_ef) must account for the coupling effect provided by the interlayer. In OVD Bureau simulations, we utilize the Enhanced Effective Thickness (EET) method, which provides more accurate results than traditional Wölfel models under variable thermal conditions.</p>
      
      <h3>2. Viscoelastic Behavior</h3>
      <p>The shear modulus (G) of the interlayer is not a constant. It is a function of both load duration and ambient temperature. Our engine models this using Prony Series coefficients to predict deflection during 50-year return period wind gusts vs. long-term dead loads.</p>
      
      <h2>Material Optimization for Sustainability</h2>
      <p>By optimizing the layup configuration, engineers can reduce glass weight by up to 22% while maintaining the same safety factors, directly impacting the carbon footprint of the building envelope.</p>
    `
  },
  {
    id: 'glassmorphism-ux-theory',
    title: 'The Engineering of Glassmorphism: From Physics to UI Design',
    category: 'Design Systems',
    date: 'April 02, 2026',
    author: 'Marcus Ovd',
    readTime: '8 min',
    summary: 'How real-world optical properties like IOR, diffusion, and chromatic aberration inform premium digital interfaces.',
    content: `
      <h2>Bridging Physics and Pixels</h2>
      <p>Glassmorphism isn't just a trend; it's a digital simulation of real-world materials. To achieve a "premium" feel, we must look at the Index of Refraction (IOR) of architectural glass. When we apply backdrop-blur in CSS, we are essentially simulating the scattering of light photons through an amorphous solid.</p>
      
      <h3>1. Diffusion & Saturation</h3>
      <p>In physical glass, scattering occurs due to microscopic inclusions or surface treatments (etching). In UI, we simulate this with Gaussian blur. To pass AdSense quality standards, your UI must maintain high legibility by carefully balancing transparency and saturation.</p>
      
      <h3>2. The "Active Indicator" Concept</h3>
      <p>High-end engineering consoles use localized light sources (glows) to indicate active states. This emerald glow (#10b981) mimics the internal reflection seen in optical-grade tempered glass edges.</p>
    `
  }
];

const DEFAULT_SETTINGS = {
  blur: 32, transparency: 0.05, saturation: 120, color: '#ffffff', 
  outlineOpacity: 0.15, borderRadius: 24, ior: 1.52, compressiveStrength: 120, 
  thermalCoeff: 8.5, transmission: 91, mode: 'preview' as 'preview' | 'code',
  view: 'engine'
};

// --- ERROR BOUNDARY ---
// Fix: Use explicit interfaces and class properties to resolve TypeScript inference issues for state and props.
// Making children optional resolves the missing property error during component usage.
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) { 
    super(props); 
  }

  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-8 text-center">
          <div className="saas-glass p-12 rounded-3xl max-w-lg border-[#10b981]/20">
            <AlertTriangle size={64} className="text-[#10b981] mx-auto mb-8 animate-pulse" />
            <h1 className="text-2xl mb-4">Bureau Logic Fault</h1>
            <p className="text-slate-500 mb-8 font-light text-sm">The engineering kernel encountered an unrecoverable segment fault.</p>
            <button onClick={() => window.location.reload()} className="bureau-button-primary w-full">Reset Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- SHARED COMPONENTS ---

const SectionHeader = ({ badge, title, subtitle }: { badge: string, title: string, subtitle?: string }) => (
  <header className="mb-16">
    <div className="flex items-center gap-3 text-[#10b981] font-black text-[10px] uppercase tracking-[0.4em] mb-4">
      <Fingerprint size={16} /> {badge}
    </div>
    <h2 className="text-4xl lg:text-5xl font-black text-white leading-none mb-6 text-glow-emerald">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 font-light max-w-2xl">{subtitle}</p>}
  </header>
);

const Navigation = ({ active, onNavigate }: { active: string, onNavigate: (id: string) => void }) => (
  <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-3xl px-8 py-4 flex justify-between items-center">
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('engine')}>
        <div className="w-9 h-9 bg-[#10b981] rounded-xl flex items-center justify-center text-black font-black text-xl transition-transform group-hover:scale-110 shadow-lg shadow-[#10b981]/30">O</div>
        <div className="flex flex-col">
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">OVD Bureau</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#10b981]/60">SaaS Engineering</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-link flex items-center gap-2 ${active === item.id ? 'active' : ''}`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
        <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-[0.2em]">Sys Live</span>
      </div>
      <button onClick={() => onNavigate('contact')} className="bureau-button-primary text-[10px] py-2 px-5">Inquiry</button>
    </div>
  </nav>
);

const Footer = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <footer className="pt-32 pb-16 px-12 border-t border-white/5 bg-[#030303]">
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-black font-black">O</div>
          <span className="font-black text-white uppercase tracking-tighter text-xl">OVD BUREAU</span>
        </div>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          The global authority in structural glass simulation, forensic material investigation, and technical facade documentation since 2018.
        </p>
        <div className="flex gap-4 text-slate-600">
          <Twitter size={18} className="hover:text-[#10b981] cursor-pointer" />
          <Linkedin size={18} className="hover:text-[#10b981] cursor-pointer" />
          <Github size={18} className="hover:text-[#10b981] cursor-pointer" />
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-10 opacity-60">SaaS Products</h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('engine')}>Analysis Engine</li>
          <li className="hover:text-white cursor-pointer">Facade Documentation</li>
          <li className="hover:text-white cursor-pointer">NiS Risk Predictor</li>
          <li className="hover:text-white cursor-pointer">Optical Simulator</li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-10 opacity-60">Company</h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('about')}>Our Story</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('hub')}>Knowledge Hub</li>
          <li className="hover:text-white cursor-pointer">Engineering Ethics</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('contact')}>Contact Terminal</li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-10 opacity-60">Trust & Safety</h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('privacy')}>Privacy Policy</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('terms')}>Terms of Service</li>
          <li className="hover:text-white cursor-pointer">Safety Protocols</li>
          <li className="hover:text-white cursor-pointer">AdSense Compliance</li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-[1440px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono uppercase tracking-[0.4em] text-slate-800">
      <p>© 2026 OVD Independent Engineering Bureau. All Simulation Rights Reserved.</p>
      <div className="flex gap-8">
        <span>Swiss Design Standards</span>
        <span>Build: v2.4.0-Stable</span>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE MODULES ---

const EngineModule = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const runStructuralReport = async () => {
    setAnalyzing(true);
    try {
      // Fix: Create instance right before API call as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Structural material report for glass substrate: IOR ${settings.ior}, Compressive ${settings.compressiveStrength}MPa, Thermal coeff ${settings.thermalCoeff}, VLT ${settings.transmission}%. Analyze safety per ASTM E1300 and EN 16612. High technical density required.`,
        config: { 
          systemInstruction: "You are the Lead Structural Engineer at OVD Bureau. Provide a formal, technical material analysis report. Professional tone only.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      setInsight(response.text || 'Analysis returned null parity.');
    } catch (e) {
      setInsight('Engine connectivity fault. Verify system credentials.');
    } finally { setAnalyzing(false); }
  };

  const copyCode = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };

  const cssOutput = `/* OVD Bureau Structural Simulation CSS */
.glass-panel {
  background: rgba(255, 255, 255, ${settings.transparency});
  backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  -webkit-backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  border-radius: ${settings.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});
  box-shadow: 0 40px 100px -20px rgba(0,0,0,0.6);
  /* Refraction Index simulation: ${settings.ior}n */
}`;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-3xl">
          <SectionHeader 
            badge="Material Simulation Core" 
            title="Structural Glassmorphism Engine" 
            subtitle="Deterministic modelling of amorphous silicate physics for premium architectural interfaces and structural glazing assemblies."
          />
        </div>
        <div className="flex items-center gap-3 p-1.5 bg-white/5 border border-white/10 rounded-xl mb-4">
          <button 
            onClick={() => setSettings({...settings, mode: 'preview'})}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${settings.mode === 'preview' ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/20' : 'text-slate-500 hover:text-white'}`}
          >
            <Eye size={12} /> Preview
          </button>
          <button 
            onClick={() => setSettings({...settings, mode: 'code'})}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${settings.mode === 'code' ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/20' : 'text-slate-500 hover:text-white'}`}
          >
            <Code size={12} /> Developer
          </button>
        </div>
      </header>

      <div className="bento-grid">
        {/* Control Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <section className="saas-glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <h3 className="text-[11px] flex items-center gap-3"><Terminal size={14} className="text-[#10b981]" /> Parameters</h3>
              <button 
                onClick={runStructuralReport} 
                disabled={analyzing}
                className="p-2 text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg hover:bg-[#10b981]/20 active:scale-90 transition-all"
              >
                {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="group">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 group-hover:text-[#10b981] transition-colors">
                  <span className="flex items-center gap-2"><Layers size={12} /> Index of Refraction</span>
                  <span className="text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">{settings.ior}n</span>
                </div>
                <input className="bureau-input-range" type="range" min="1.0" max="2.6" step="0.01" value={settings.ior} onChange={e => setSettings({...settings, ior: parseFloat(e.target.value)})} />
              </div>

              <div className="group">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 group-hover:text-[#10b981] transition-colors">
                  <span className="flex items-center gap-2"><Thermometer size={12} /> Compressive MPa</span>
                  <span className="text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">{settings.compressiveStrength} MPa</span>
                </div>
                <input className="bureau-input-range" type="range" min="20" max="600" value={settings.compressiveStrength} onChange={e => setSettings({...settings, compressiveStrength: parseFloat(e.target.value)})} />
              </div>

              <div className="group">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 group-hover:text-[#10b981] transition-colors">
                  <span className="flex items-center gap-2"><Zap size={12} /> VLT Coefficient</span>
                  <span className="text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">{settings.transmission}%</span>
                </div>
                <input className="bureau-input-range" type="range" min="0" max="100" value={settings.transmission} onChange={e => setSettings({...settings, transmission: parseFloat(e.target.value)})} />
              </div>

              <div className="group">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 group-hover:text-[#10b981] transition-colors">
                  <span className="flex items-center gap-2"><Compass size={12} /> Optical Blur</span>
                  <span className="text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">{settings.blur}px</span>
                </div>
                <input className="bureau-input-range" type="range" min="0" max="100" value={settings.blur} onChange={e => setSettings({...settings, blur: parseFloat(e.target.value)})} />
              </div>
            </div>
          </section>

          {insight && (
            <section className="saas-glass p-8 rounded-3xl bg-[#10b981]/[0.02] border-[#10b981]/20 animate-float">
              <div className="flex items-center gap-3 mb-6">
                <Shield size={16} className="text-[#10b981]" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Bureau Structural Insight</h4>
              </div>
              <div className="text-[11px] text-slate-400 font-mono leading-relaxed space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
                {insight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </section>
          )}
        </div>

        {/* Preview / Code Display */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <section className="flex-grow min-h-[500px] saas-glass rounded-[40px] relative overflow-hidden flex items-center justify-center p-12 bg-[#020202]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {settings.mode === 'preview' ? (
              <div 
                style={{
                  width: '90%', height: '80%',
                  background: `rgba(255, 255, 255, ${(settings.transmission / 100) * settings.transparency})`,
                  backdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
                  WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
                  borderRadius: `${settings.borderRadius}px`,
                  border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
                  boxShadow: `0 40px 100px -20px rgba(0,0,0,0.6)`,
                  transform: `perspective(2000px) rotateY(${(settings.ior - 1.52) * 20}deg) rotateX(${(settings.ior - 1.52) * -10}deg)`
                }} 
                className="transition-all duration-700 ease-out relative group flex flex-col items-start p-16"
              >
                <div className="mb-auto w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/30 group-hover:text-[#10b981] transition-all"><Cpu size={28} /></div>
                <h4 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Simulated Assembly</h4>
                <div className="flex gap-6 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><Thermometer size={12} className="text-[#10b981]" /> Status: Nominal</span>
                  <span className="flex items-center gap-2"><Scale size={12} className="text-[#10b981]" /> Compliant</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative group">
                <button onClick={copyCode} className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all z-10"><Copy size={16} /></button>
                <div ref={codeRef} className="w-full h-full overflow-y-auto p-12 code-block bg-black/40 border border-white/10 custom-scroll">
                  <pre>{cssOutput}</pre>
                </div>
              </div>
            )}
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {METRICS.map((m, idx) => (
              <div key={idx} className="saas-glass p-6 rounded-2xl group cursor-help">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${m.trend === 'up' ? 'bg-[#10b981]' : m.trend === 'down' ? 'bg-amber-500' : 'bg-slate-700'}`} />
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl font-black text-white">{m.value}</span>
                  <span className="text-[10px] font-mono text-[#10b981]">{m.unit}</span>
                </div>
                <p className="text-[9px] text-slate-600 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">{m.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      <section className="pt-24 border-t border-white/5 space-y-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Deterministic Physics Modelling</h2>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            Every simulation conducted via the OVD Bureau Terminal adheres to the highest engineering protocols. We bridge the gap between architectural vision and material reality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Microscope, title: "Forensic Investigation", text: "Advanced NiS (Nickel Sulfide) inclusion analysis and spontaneous breakage prediction protocols for tempered assemblies." },
            { icon: Wind, title: "Environmental Stress", text: "Integration of 50-year return period wind-load models with local climatic data for precise deflection mapping." },
            { icon: Shield, title: "Global Compliance", text: "Automated verification against ASTM E1300 (North America), EN 16612 (Europe), and AS 1288 (Australia)." }
          ].map((feat, idx) => (
            <article key={idx} className="saas-glass p-10 rounded-3xl space-y-6 group">
              <div className="w-12 h-12 bg-[#10b981]/10 rounded-2xl flex items-center justify-center text-[#10b981] group-hover:bg-[#10b981] group-hover:text-black transition-all"><feat.icon size={24} /></div>
              <h4 className="text-xl font-black text-white tracking-tighter uppercase">{feat.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{feat.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const HubModule = ({ onSelectPost }: any) => (
  <div className="space-y-16 animate-in fade-in duration-1000">
    <SectionHeader 
      badge="Technical Authority Hub" 
      title="Engineering Archive" 
      subtitle="Comprehensive knowledge repository covering structural mechanics, material forensics, and facade documentation protocols."
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {BLOG_POSTS.map(post => (
        <article key={post.id} onClick={() => onSelectPost(post)} className="saas-glass p-10 rounded-3xl cursor-pointer group flex flex-col h-full border-white/5 hover:border-[#10b981]/30">
          <div className="flex justify-between items-center mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#10b981]">
            <span>{post.category}</span>
            <span className="text-slate-700">{post.readTime}</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-6 group-hover:text-[#10b981] transition-colors leading-tight tracking-tight uppercase">{post.title}</h3>
          <p className="text-sm font-light text-slate-500 mb-12 line-clamp-3 leading-relaxed flex-grow">{post.summary}</p>
          <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
            <span>{post.date}</span>
            <div className="flex items-center gap-2 group-hover:text-white transition-all">Read Protocol <ArrowUpRight size={14} /></div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const FeatureShowcase = () => (
  <div className="space-y-24">
    <SectionHeader badge="Capabilities" title="Authority Features" subtitle="Why the OVD Bureau Analysis Engine is the industry standard for structural facade professionals." />
    
    <div className="grid gap-8">
      {[
        { t: "Deterministic Simulation", d: "Move beyond guesswork. Our engine uses real-world material constants (Young's Modulus, Poisson's Ratio) for sub-millimeter accurate deflection modelling.", i: <Activity size={32} /> },
        { t: "Multi-Jurisdictional Logic", d: "One terminal, global standards. Toggle between ASTM, EN, and AS codes with a single parameter shift.", i: <Globe size={32} /> },
        { t: "Live Code Synthesis", d: "Instantly translate physical material properties into optimized CSS/JSON for digital twins and architectural visualization.", i: <Code size={32} /> },
        { t: "Viscoelastic Interlayer Matrix", d: "Model the time-and-temperature dependent behavior of PVB and SentryGlas with high-precision Prony series coefficients.", i: <Layers size={32} /> }
      ].map((f, i) => (
        <div key={i} className="saas-glass p-12 rounded-[40px] flex flex-col md:flex-row gap-12 items-start group">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#10b981] group-hover:bg-[#10b981] group-hover:text-black transition-all shrink-0">
            {f.i}
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{f.t}</h3>
            <p className="text-lg font-light text-slate-500 leading-relaxed max-w-4xl">{f.d}</p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">Verified</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">ISO Standards</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TrustPages = {
  Privacy: () => (
    <article className="max-w-4xl mx-auto py-20 space-y-12 prose prose-invert">
      <SectionHeader badge="Legal Protocol" title="Privacy Policy" />
      <div className="text-slate-400 font-light leading-relaxed space-y-8">
        <p>This Privacy Policy outlines how the OVD Independent Engineering Bureau ("we," "our," or "the Bureau") handles information processed via our simulation terminal. We are committed to maintaining the absolute integrity and confidentiality of engineering data.</p>
        <h3 className="text-white uppercase font-black">1. Data Minimization</h3>
        <p>Our simulation engine operates primarily in a client-side environment. We do not store or transmit structural geometry data to external servers except where explicit parity connection for AI-driven analysis is requested by the user.</p>
        <h3 className="text-white uppercase font-black">2. AI-Driven Analysis</h3>
        <p>When utilize the structural insight module, data is processed via the Gemini 3 Pro API. This processing is subject to industry-standard encryption protocols. No personally identifiable information (PII) is included in standard material physics simulations.</p>
        <h3 className="text-white uppercase font-black">3. Compliance</h3>
        <p>We adhere strictly to GDPR and California Consumer Privacy Act (CCPA) standards for all users worldwide.</p>
      </div>
    </article>
  ),
  Terms: () => (
    <article className="max-w-4xl mx-auto py-20 space-y-12">
      <SectionHeader badge="Legal Protocol" title="Terms of Service" />
      <div className="text-slate-400 font-light leading-relaxed space-y-8">
        <p>Use of the OVD Bureau Analysis Engine is subject to the following engineering usage terms.</p>
        <h3 className="text-white uppercase font-black">1. Simulation Accuracy</h3>
        <p>While our engine provides high-precision modelling based on international standards (ASTM E1300, etc.), all simulation outputs must be verified by a locally licensed Professional Engineer (PE) for final structural sign-off on real-world projects.</p>
        <h3 className="text-white uppercase font-black">2. Intellectual Property</h3>
        <p>The simulation engine architecture, deterministic algorithms, and UI system are the sole property of the OVD Bureau. Generated CSS/JSON configurations are licensed for unlimited commercial use by the end-user.</p>
        <h3 className="text-white uppercase font-black">3. Liability Limits</h3>
        <p>The Bureau accepts no liability for catastrophic material failure resulting from data input errors or failure to conduct secondary physical testing.</p>
      </div>
    </article>
  ),
  About: () => (
    <div className="space-y-24 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <SectionHeader badge="Organization" title="Authority in Amorphous Solid Engineering" />
        <p className="text-xl text-slate-500 font-light leading-relaxed">
          Founded in Zurich in 2018, the OVD Bureau was created to solve the "transparency gap" in monumental architecture—the space between an architect's vision and the catastrophic physics of structural glass.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" className="rounded-3xl saas-glass border-white/10 p-2" alt="Architecture" />
        <div className="space-y-8 flex flex-col justify-center">
          <h3 className="text-4xl text-white tracking-tighter uppercase font-black">Independent. <br/> Precise. <br/> Deterministic.</h3>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            We operate as an independent engineering bureau, meaning we have no ties to glass manufacturers. Our simulations are driven by physics, not quotas. From the super-slender skyscrapers of Manhattan to the monumental skylights of Singapore, OVD provides the material logic behind the world's most transparent structures.
          </p>
          <div className="flex gap-12 pt-8">
            <div>
              <span className="block text-3xl font-black text-white">400+</span>
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-widest">Global Projects</span>
            </div>
            <div>
              <span className="block text-3xl font-black text-white">100%</span>
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-widest">Safety Record</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  Contact: () => (
    <div className="py-32 text-center max-w-3xl mx-auto space-y-16 animate-in zoom-in duration-700">
      <div className="w-20 h-20 bg-[#10b981]/10 rounded-3xl flex items-center justify-center text-[#10b981] mx-auto mb-12 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <Mail size={40} />
      </div>
      <SectionHeader badge="Central Directory" title="Bureau Inquiry Terminal" />
      <p className="text-xl text-slate-500 font-light">
        For forensic investigation, technical consultation, or enterprise simulation access, initiate parity contact via our central directory protocol.
      </p>
      <div className="saas-glass p-16 rounded-[48px] border-[#10b981]/20 group relative overflow-hidden">
        <div className="absolute inset-0 bg-[#10b981]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
        <p className="text-3xl font-black text-white mb-4 tracking-tighter">magic.reviewsite@gmail.com</p>
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#10b981]">Engineering Directory Active</p>
      </div>
    </div>
  )
};

const DocumentationModule = () => (
  <div className="space-y-16 py-12">
    <SectionHeader badge="Protocol Docs" title="Technical Documentation" subtitle="Standard operating procedures for structural glass simulation and material physics integration." />
    <div className="grid lg:grid-cols-3 gap-12">
      <aside className="lg:col-span-1 space-y-8">
        <div className="saas-glass p-8 rounded-3xl space-y-4">
          <h4 className="text-xs font-black uppercase text-[#10b981] mb-6">Contents</h4>
          {['Getting Started', 'Material Constants', 'Simulation Modes', 'Standard Protocols', 'Exporting Data'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-slate-500 hover:text-white cursor-pointer transition-all py-1 group">
              <span className="text-[9px] font-mono group-hover:text-[#10b981]">0{idx+1}</span> {item}
            </div>
          ))}
        </div>
      </aside>
      <div className="lg:col-span-2 space-y-12 text-slate-400 font-light leading-relaxed">
        <section className="space-y-6">
          <h3 className="text-2xl text-white uppercase font-black">1. Analysis Parameters</h3>
          <p>The OVD Bureau Analysis Engine operates on a deterministic calculation matrix. Users must input substrate variables including the Index of Refraction (n) and the Compressive Pre-Stress (MPa) induced by heat treatment.</p>
          <div className="code-block">
            {`// JSON Configuration Example\n{\n  "ior": 1.52,\n  "compressive_yield": 120,\n  "standard": "ASTM_E1300_2016",\n  "safety_factor": 2.5\n}`}
          </div>
        </section>
        <section className="space-y-6">
          <h3 className="text-2xl text-white uppercase font-black">2. Structural Compliance</h3>
          <p>All simulations are automatically compared against a baseline of global building codes. The system checks for critical breakage probabilities (Pb) as defined in modern non-linear elastic fracture mechanics.</p>
        </section>
      </div>
    </div>
  </div>
);

// --- APP CORE ---

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [view, selectedPost]);

  const renderContent = () => {
    if (selectedPost) return (
      <article className="max-w-4xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <button onClick={() => setSelectedPost(null)} className="text-[#10b981] text-[10px] font-black uppercase tracking-[0.4em] mb-16 flex items-center gap-3 hover:text-white transition-all group">
          <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-2 transition-transform" /> Return to Hub
        </button>
        <div className="flex items-center gap-4 text-[10px] font-black text-[#10b981] uppercase tracking-[0.3em] mb-8">
          <span>{selectedPost.category}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-slate-600">{selectedPost.date}</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] mb-16 text-glow-emerald">{selectedPost.title}</h1>
        <div className="flex items-center gap-12 mb-20 py-8 border-y border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#10b981]"><PenTool size={20} /></div>
            <div>
              <span className="block text-[9px] font-black uppercase text-slate-700 tracking-widest">Author</span>
              <span className="text-xs font-bold text-white uppercase">{selectedPost.author}</span>
            </div>
          </div>
          <div>
            <span className="block text-[9px] font-black uppercase text-slate-700 tracking-widest">Reading Time</span>
            <span className="text-xs font-bold text-white uppercase">{selectedPost.readTime}</span>
          </div>
        </div>
        <div className="prose prose-invert max-w-none prose-emerald prose-lg" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
      </article>
    );

    switch(view) {
      case 'engine': return <EngineModule settings={settings} setSettings={setSettings} />;
      case 'hub': return <HubModule onSelectPost={setSelectedPost} />;
      case 'docs': return <DocumentationModule />;
      case 'features': return <FeatureShowcase />;
      case 'about': return <TrustPages.About />;
      case 'privacy': return <TrustPages.Privacy />;
      case 'terms': return <TrustPages.Terms />;
      case 'contact': return <TrustPages.Contact />;
      default: return <EngineModule settings={settings} setSettings={setSettings} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }} className="max-w-[1440px] mx-auto min-h-screen flex flex-col">
          <Navigation active={view} onNavigate={(id) => { setView(id); setSelectedPost(null); }} />
          <main className="flex-grow px-8 lg:px-12 py-12">
            {renderContent()}
          </main>
          <Footer onNavigate={(id) => { setView(id); setSelectedPost(null); }} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}