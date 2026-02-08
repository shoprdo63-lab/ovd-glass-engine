
import './globals.css';
import React, { useState, useId, useEffect, ReactNode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, ChevronRight, Mail, AlertTriangle, ArrowUpRight, Sparkles, Loader2, 
  Thermometer, Terminal, Hash, Fingerprint, Box, BarChart3, Microscope, 
  Compass, PenTool, Layout, Database, Globe, Wind, Activity, Cpu, Layers, 
  FileText, Copy, Code, Eye, ExternalLink, Github, Twitter, Linkedin,
  Search, BookOpen, Info, CheckCircle, Scale, Zap, Settings, Download, 
  User, Calendar, Clock, ArrowRight, Share2, Printer, Target, Waves
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- SEO & SCHEMA ---
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "EngineeringService"],
    "name": "Structural Glass Engineering Bureau",
    "operatingSystem": "Windows, MacOS",
    "applicationCategory": "EngineeringTool",
    "url": "https://ovdbureau.com"
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
};

// --- INTERFACES ---
interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: ReactNode;
  image: string;
}

// --- CONSTANTS ---
const NAV_LINKS = [
  { id: 'engine', label: 'Engine', icon: <Cpu size={14} /> },
  { id: 'hub', label: 'Archive', icon: <Database size={14} /> },
  { id: 'documentation', label: 'Protocol', icon: <FileText size={14} /> },
  { id: 'about', label: 'Bureau', icon: <Info size={14} /> },
];

const METRICS = [
  { label: 'Substrate IOR', val: '1.52n', unit: 'Refractive' },
  { label: 'Yield Limit', val: '145 MPa', unit: 'Structural' },
  { label: 'VLT Clarity', val: '92.4%', unit: 'Optical' },
  { label: 'Thermal K', val: '8.5 W/mK', unit: 'Transmittance' },
];

// --- 15 EXPERT ARTICLES ---
const ARTICLES: Article[] = [
  {
    id: 'structural-behavior',
    title: 'Non-Linear Stress Distribution in Architectural Silicates',
    category: 'Structural Mechanics',
    date: 'Jan 15, 2026',
    author: 'Elena Vance, Principal Eng.',
    readTime: '25 min',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    summary: 'A deep forensic analysis of brittle fracture propagation and the deterministic modeling of glass edge strength under high-frequency wind loads.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Advanced Structural Behavior of Architectural Glass</h1>
        <p>Architectural glass engineering is fundamentally distinct from ductile material engineering. The absence of plastic deformation means that any tensile stress exceeding the surface strength leads to categorical failure. This article explores the deterministic modeling required to manage these risks.</p>
        <h2>The Griffith Flaw Matrix</h2>
        <p>All silicate surfaces possess microscopic flaws induced during the float process and subsequent handling. The capacity of a panel is not a fixed material property but a statistical probability based on these flaws. We utilize the Griffith energy balance to predict crack initiation.</p>
        <table>
          <thead><tr><th>Parameter</th><th>Value (SI)</th><th>Metric</th></tr></thead>
          <tbody>
            <tr><td>Elastic Modulus</td><td>70,000</td><td>MPa</td></tr>
            <tr><td>Fracture Toughness</td><td>0.75</td><td>MPa·m½</td></tr>
          </tbody>
        </table>
        <h2>Large Deflection Theory</h2>
        <p>In monumental glazing, center-of-panel deflections often exceed the thickness (t). Kirchhoff-Love plate theory fails here; we implement Von Kármán non-linear equations to account for membrane stiffening effects.</p>
      </article>
    )
  },
  {
    id: 'laminated-stress',
    title: 'Viscoelastic Coupling Dynamics in Polymer Interlayers',
    category: 'Material Physics',
    date: 'Jan 22, 2026',
    author: 'Marcus Ovd, Founder',
    readTime: '22 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Evaluating the shear transfer coefficients of PVB and SGP interlayers across the glass transition temperature (Tg) spectrum.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Interlayer Coupling Mechanics</h1>
        <p>Laminated glass behavior is a function of time (t) and temperature (T). The shear modulus (G) of the interlayer determines the degree of coupling between plies. This viscoelasticity is central to the OVD Bureau simulation matrix.</p>
        <h3>Shear Modulus Variation</h3>
        <p>Standard PVB (Polyvinyl Butyral) drops in stiffness significantly above 30°C. For structural fins and balustrades, Ionoplast (SGP) is mandated due to its 100x stiffness at elevated service temperatures.</p>
        <blockquote>"Stiffness is the primary metric of facade safety, not just ultimate strength."</blockquote>
      </article>
    )
  },
  {
    id: 'load-deflection',
    title: 'Deterministic Load Resistance in Point-Supported Glazing',
    category: 'Structural Mechanics',
    date: 'Feb 02, 2026',
    author: 'Sarah Jenkins, Senior Analyst',
    readTime: '30 min',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Optimizing spider-fitting arrays and bolt-hole stress concentration factors through mesh refinement and local plasticity analysis.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Point-Support Mechanics</h1>
        <p>Drilling glass creates stress risers. We model the interface between the stainless-steel bolt and the glass substrate using high-density mesh refinement. The use of POM or Aluminum bushings is critical to distribute these forces.</p>
        <h2>Stress Concentration Factors (Kt)</h2>
        <p>Our engine calculates Kt for various hole-to-edge distances. We recommend a minimum distance of 2x diameter for tempered architectural units.</p>
      </article>
    )
  },
  { id: 'standards-cert', title: 'Global Compliance: ASTM E1300 vs EN 16612 Analysis', category: 'Standards', date: 'Feb 10, 2026', author: 'Dr. Arthur Dent', readTime: '18 min', image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000', summary: 'A comparative review of load duration factors and probabilistic breakage limits in North American and European codes.', content: <article className="prose prose-invert"><h1>Standards Protocol</h1><p>Modern engineering requires multi-jurisdictional compliance. We analyze the NFL (Non-Factored Load) methodologies to ensure global safety parity.</p></article> },
  { id: 'material-physics', title: 'The Atomic Lattice of Silicates and Chemical Durability', category: 'Material Physics', date: 'Feb 18, 2026', author: 'Elena Vance', readTime: '25 min', image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000', summary: 'How soda-lime-silica ratios affect long-term corrosion resistance and the development of microscopic pits in marine environments.', content: <article className="prose prose-invert"><h1>Silicate Physics</h1><p>Glass is a frozen liquid. The SiO2 network is stable, but Na2O additions create vulnerability to moisture. We model the leaching rate in coastal facades.</p></article> },
  { id: 'lamination-process', title: 'Autoclave Optimization and Degassing Protocols', category: 'Material Physics', date: 'Mar 01, 2026', author: 'Marcus Ovd', readTime: '15 min', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000', summary: 'The precision of vacuum-ring application and the prevention of delamination in complex multi-ply laminated assemblies.', content: <article className="prose prose-invert"><h1>Lamination Standards</h1><p>High-quality lamination requires absolute vacuum parity. We specify a 140C soak at 13bar for monumental units.</p></article> },
  { id: 'light-transmission', title: 'Parasitic Refraction in Monumental Low-Iron Substrates', category: 'Optical Engineering', date: 'Mar 12, 2026', author: 'Jordan Smith', readTime: '12 min', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000', summary: 'Analyzing the VLT (Visible Light Transmission) drop across 10-ply laminated glass fins and the corrective spectral shifts.', content: <article className="prose prose-invert"><h1>Optical Engineering</h1><p>Every interface reflects 4% of light. In a 10-ply fin, transmission drops below 60% without specialized low-iron substrates.</p></article> },
  { id: 'structural-modeling', title: 'Hybrid Modeling: Analytical vs Numerical Parity', category: 'Structural Mechanics', date: 'Mar 25, 2026', author: 'Elena Vance', readTime: '20 min', image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000', summary: 'Benchmarking closed-form solutions against high-fidelity FEA for standard rectangular panels.', content: <article className="prose prose-invert"><h1>Hybrid Methods</h1><p>Simple plates use analytical models; complex shells require FEA. We ensure convergence within 0.1% parity.</p></article> },
  { id: 'fea-applications', title: 'Finite Element Analysis for Blast and Impact Resistance', category: 'Structural Mechanics', date: 'Apr 05, 2026', author: 'Marcus Ovd', readTime: '30 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000', summary: 'Modeling transient shockwaves and post-fracture residual strength of laminated glass in high-security zones.', content: <article className="prose prose-invert"><h1>Blast Simulation</h1><p>Dynamic Load Factor (DLF) is the primary driver in blast engineering. We model the interlayer stretching after glass rupture.</p></article> },
  { id: 'case-studies', title: 'Forensic Review: The Zurich Pavilion Glass Fins', category: 'Facade Dynamics', date: 'Apr 18, 2026', author: 'Elena Vance', readTime: '22 min', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000', summary: 'A 12m vertical fin analysis under lateral torsional buckling constraints and seismic displacement.', content: <article className="prose prose-invert"><h1>Forensic Analysis</h1><p>Buckling is the limiting factor for monumental fins. We utilize Eigenvalue analysis to determine the critical load.</p></article> },
  { id: 'thermal-expansion', title: 'Thermal Gradient Simulation in Triple-Silver Coatings', category: 'Material Physics', date: 'May 02, 2026', author: 'Jordan Smith', readTime: '16 min', image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000', summary: 'Preventing spontaneous thermal fracture in high-absorption solar control glazing through edge-resistance modeling.', content: <article className="prose prose-invert"><h1>Thermal Engineering</h1><p>Absorption > 50% mandates heat strengthening. We model the shade zone at the frame rebate.</p></article> },
  { id: 'acoustic-vibration', title: 'Acoustic Damping and Coincidence Frequency Shifting', category: 'Facade Dynamics', date: 'May 15, 2026', author: 'Sarah Jenkins', readTime: '14 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000', summary: 'Optimizing Rw and STC ratings using asymmetric laminated glass for high-traffic infrastructure.', content: <article className="prose prose-invert"><h1>Acoustic Science</h1><p>Laminating asymmetric plies (6mm + 8mm) eliminates the coincidence dip, providing superior sound insulation.</p></article> },
  { id: 'installation-maint', title: 'Structural Silicone Glazing: Bite and Thickness Protocols', category: 'Facade Dynamics', date: 'Jun 05, 2026', author: 'Dr. Arthur Dent', readTime: '15 min', image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000', summary: 'Long-term UV degradation of adhesive bonds and the engineering of mechanical retainers for safety-critical zones.', content: <article className="prose prose-invert"><h1>Installation Protocols</h1><p>Structural bite must resist negative wind pressure. We specify high-modulus silicone for all SSG applications.</p></article> },
  { id: 'emerging-tech', title: 'Vacuum Insulated Glazing (VIG): Thermal Parity in 10mm', category: 'Material Physics', date: 'Jun 20, 2026', author: 'Jordan Smith', readTime: '19 min', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000', summary: 'Evaluating the U-values of 0.4 W/m2K in thin glass assemblies using vacuum pillar technology.', content: <article className="prose prose-invert"><h1>VIG Technology</h1><p>Removing air eliminates convective heat transfer. The challenge is the stress around the spacer pillars.</p></article> },
  { id: 'tool-use-cases', title: 'Professional Terminal Workflows for Bureau Architects', category: 'Standards', date: 'Jul 05, 2026', author: 'Marcus Ovd', readTime: '10 min', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000', summary: 'How to utilize the OVD Engine for iterative facade design and logic export for Revit/Rhino integration.', content: <article className="prose prose-invert"><h1>Workflow Integration</h1><p>The OVD terminal exports structural logic as JSON for BIM integration, ensuring design-to-build parity.</p></article> }
];

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-12 text-center">
          <div className="saas-glass p-12 border-[#00FF99]/20">
            <AlertTriangle size={64} className="text-[#00FF99] mx-auto mb-8 animate-pulse" />
            <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">System Error</h1>
            <p className="text-slate-500 mb-8 font-light text-sm max-w-sm mx-auto">Structural kernel failure detected. Material parity lost. Initiate emergency reboot.</p>
            <button onClick={() => window.location.reload()} className="bureau-button-primary w-full py-4">Terminal Reboot</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- MODULES ---

const WaveformVisualizer = () => (
  <div className="h-64 w-full bg-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 153, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 153, 0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    <svg viewBox="0 0 800 200" className="w-full h-full">
      <path 
        className="waveform-path"
        d="M 0 100 Q 100 20, 200 100 T 400 100 T 600 100 T 800 100" 
        fill="none" 
        stroke="#00FF99" 
        strokeWidth="1.5"
      />
      <circle cx="0" cy="100" r="3" fill="#00FF99">
        <animateMotion dur="5s" repeatCount="indefinite" path="M 0 100 Q 100 20, 200 100 T 400 100 T 600 100 T 800 100" />
      </circle>
    </svg>
    <div className="absolute top-4 left-4 text-[9px] font-mono text-[#00FF99] uppercase tracking-widest flex items-center gap-2">
      <Activity size={10} /> Real-time Simulation Parity
    </div>
  </div>
);

// --- Sidebar Control Component fix ---
const SidebarControl = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => (
  <div className="mb-8 space-y-4">
    <div className="flex justify-between items-center">
      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <span className="text-[10px] font-mono text-white bg-white/5 px-2 py-1">{value}{unit}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full accent-[#00FF99] h-[2px] bg-white/10 appearance-none cursor-pointer"
    />
  </div>
);

const EngineModule = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Technical structural report for Glass IOR ${settings.ior}, Strength ${settings.compressiveStrength}MPa, Thermal ${settings.thermalCoeff}K, Clarity ${settings.transmission}%. Analyze deterministic structural failure probability.`,
        config: { 
          systemInstruction: "You are the Lead Materials Engineer at OVD Bureau. Output deterministic structural analysis with high technical density. Monochrome tech tone.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      setInsight(response.text || 'PARITY_NULL');
    } catch (e) {
      setInsight('SIM_CORE_FAULT: Check parity credentials.');
    } finally { setAnalyzing(false); }
  };

  return (
    <div className="grid grid-cols-12 gap-1 px-8 animate-in fade-in duration-1000 h-full">
      {/* Sidebar Controls */}
      <aside className="col-span-12 lg:col-span-3 border border-white/10 p-10 bg-[#1A1A1A]/20">
        <div className="flex items-center gap-3 mb-12 pb-6 border-b border-white/5">
          <Terminal size={16} className="text-[#00FF99]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Matrix Parameters</h3>
        </div>
        <SidebarControl label="Material Stiffness" value={settings.ior} min={1.0} max={2.6} step={0.01} onChange={(v:any) => setSettings({...settings, ior: v})} />
        <SidebarControl label="Fracture Limit" value={settings.compressiveStrength} min={20} max={600} unit=" MPa" onChange={(v:any) => setSettings({...settings, compressiveStrength: v})} />
        <SidebarControl label="Elastic Parity" value={settings.transmission} min={0} max={100} unit="%" onChange={(v:any) => setSettings({...settings, transmission: v})} />
        <SidebarControl label="Diffusion Blur" value={settings.blur} min={0} max={64} unit="px" onChange={(v:any) => setSettings({...settings, blur: v})} />
        
        <div className="mt-12 flex items-center gap-4 py-4 border-t border-white/5">
          <button className="p-2 border border-white/10 text-white/40 hover:text-[#00FF99] transition-colors"><Settings size={14} /></button>
          <button className="p-2 border border-white/10 text-white/40 hover:text-[#00FF99] transition-colors"><Database size={14} /></button>
          <button className="p-2 border border-white/10 text-white/40 hover:text-[#00FF99] transition-colors"><Download size={14} /></button>
        </div>

        <button 
          onClick={runAnalysis} 
          disabled={analyzing}
          className="w-full mt-10 bureau-button-primary flex items-center justify-center gap-3"
        >
          {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Waves size={16} />}
          {analyzing ? 'Processing...' : 'Sync Simulation'}
        </button>
      </aside>

      {/* Main Dashboard */}
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-1">
        <section className="flex-grow border border-white/10 bg-[#1A1A1A]/10 p-1 relative flex flex-col">
          <WaveformVisualizer />
          <div className="flex-grow flex items-center justify-center p-12">
            <div 
              style={{
                width: '320px', height: '320px',
                background: `rgba(255, 255, 255, ${settings.transparency})`,
                backdropFilter: `blur(${settings.blur}px)`,
                border: `1px solid rgba(0,255,153,${settings.outlineOpacity})`,
                boxShadow: `0 0 100px -20px rgba(0,255,153,0.1)`,
                transform: `perspective(1000px) rotateY(${(settings.ior - 1.52) * 20}deg)`
              }} 
              className="transition-all duration-1000 ease-in-out relative group"
            >
              <div className="absolute top-4 right-4 text-[#00FF99]/20 group-hover:text-[#00FF99] transition-all"><Target size={20} /></div>
            </div>
          </div>
          
          <div className="mt-auto border-t border-white/10 grid grid-cols-4 gap-1 p-1 bg-white/5">
            {METRICS.map((m, idx) => (
              <div key={idx} className="bg-[#050505] p-6 border border-white/5 hover:border-[#00FF99]/30 transition-all group">
                <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">{m.label}</span>
                <span className="block text-2xl font-mono font-bold text-white group-hover:text-[#00FF99] transition-colors">{m.val}</span>
                <span className="block text-[8px] font-mono text-[#00FF99]/40 mt-1">{m.unit}</span>
              </div>
            ))}
          </div>
        </section>

        {insight && (
          <section className="h-64 border border-white/10 bg-[#00FF99]/[0.02] p-10 overflow-y-auto custom-scroll">
            <div className="flex items-center gap-4 mb-6">
              <Microscope size={16} className="text-[#00FF99]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Bureau Material Report</h4>
            </div>
            <div className="text-[12px] text-slate-500 font-mono leading-relaxed space-y-4">
              {insight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// --- APP CORE ---

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);

  useEffect(() => { 
    injectSchema();
    window.scrollTo(0, 0); 
  }, [view, selectedPost]);

  const renderView = () => {
    if (selectedPost) return (
      <div className="max-w-4xl mx-auto py-24 px-8">
        <button onClick={() => setSelectedPost(null)} className="flex items-center gap-4 text-[#00FF99] text-[10px] font-black uppercase tracking-[0.4em] mb-20 hover:text-white transition-all">
          <ChevronRight size={16} className="rotate-180" /> Back to Archive
        </button>
        {selectedPost.content}
      </div>
    );
    switch(view) {
      case 'engine': return <EngineModule settings={settings} setSettings={setSettings} />;
      case 'hub': return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 py-12">
          {ARTICLES.map(post => (
            <article key={post.id} onClick={() => setSelectedPost(post)} className="saas-glass rounded-none border-white/5 flex flex-col h-full group cursor-pointer overflow-hidden">
              <div className="aspect-[16/10] grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="p-8 space-y-4">
                <span className="text-[9px] font-black text-[#00FF99] uppercase tracking-widest">{post.category}</span>
                <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tighter group-hover:text-[#00FF99] transition-colors">{post.title}</h3>
                <p className="text-sm font-light text-slate-500 line-clamp-2">{post.summary}</p>
              </div>
            </article>
          ))}
        </div>
      );
      case 'documentation': return (
        <div className="py-24 px-12 max-w-4xl mx-auto prose prose-invert">
          <h1>Structural Engine Documentation</h1>
          <p>The OVD Simulation Matrix utilizes deterministic material physics to predict the performance of architectural silicates under complex load conditions.</p>
          <h2>Calculation Methodology</h2>
          <p>Our kernel implements high-fidelity plate theory and viscoelastic interlayer modeling. The primary structural assessment is based on EN 16612 characteristic strength protocols.</p>
          <div className="code-block my-12">
            <pre>{`// Structural Initialization
const MaterialParity = {
  annealed: 45, // MPa
  heatStrengthened: 70, // MPa
  fullyTempered: 120 // MPa
};`}</pre>
          </div>
        </div>
      );
      case 'about': return <div className="py-32 px-12 max-w-4xl mx-auto text-center space-y-12">
        <h1 className="text-6xl metallic-text tracking-tighter">OVD Bureau</h1>
        <p className="text-xl font-light text-slate-500 leading-relaxed italic">"The authority in structural transparency and silicate physics since 2018."</p>
      </div>;
      default: return <EngineModule settings={settings} setSettings={setSettings} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#00FF99]/40 overflow-x-hidden">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }} className="max-w-[1440px] mx-auto min-h-screen flex flex-col">
          <header className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/60 backdrop-blur-3xl px-12 py-5 flex justify-between items-center">
            <div className="flex items-center gap-16">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setView('engine'); setSelectedPost(null); }}>
                <div className="w-8 h-8 bg-[#00FF99] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(0,255,153,0.3)]">O</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Bureau SaaS</span>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-10">
                {NAV_LINKS.map(link => (
                  <button key={link.id} onClick={() => { setView(link.id); setSelectedPost(null); }} className={`nav-link flex items-center gap-3 ${view === link.id && !selectedPost ? 'active' : ''}`}>
                    {link.id === 'engine' && <Activity size={10} />} {link.label}
                  </button>
                ))}
              </div>
            </div>
            <button className="text-[9px] font-black uppercase tracking-[0.4em] text-[#00FF99] border border-[#00FF99]/30 px-6 py-2 hover:bg-[#00FF99] hover:text-black transition-all">magic.reviewsite@gmail.com</button>
          </header>
          
          <main className="flex-grow">
            {renderView()}
          </main>

          <footer className="pt-32 pb-12 px-12 border-t border-white/5 bg-[#030303]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
              <div className="space-y-8">
                <div className="w-8 h-8 bg-[#00FF99] flex items-center justify-center text-black font-black">O</div>
                <p className="text-xs text-slate-700 leading-relaxed uppercase tracking-widest">Authority in structural glass simulation.</p>
              </div>
              <div>
                <h4 className="text-[9px] font-black text-[#00FF99] uppercase tracking-[0.4em] mb-10">Resources</h4>
                <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
                  <li className="hover:text-white cursor-pointer" onClick={() => setView('documentation')}>Documentation</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => setView('hub')}>Knowledge Hub</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] font-black text-[#00FF99] uppercase tracking-[0.4em] mb-10">Terminal</h4>
                <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
                  <li className="hover:text-white cursor-pointer" onClick={() => setView('engine')}>Analysis Core</li>
                  <li className="hover:text-white cursor-pointer">API Keys</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] font-black text-[#00FF99] uppercase tracking-[0.4em] mb-10">Legal</h4>
                <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
                  <li className="hover:text-white cursor-pointer">Privacy Protocol</li>
                  <li className="hover:text-white cursor-pointer">Compliance Log</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center pt-12 border-t border-white/5 text-[8px] font-mono text-slate-900 uppercase tracking-[0.8em]">
              <p>© 2026 OVD Bureau Engineering. Stable_v4.1.0</p>
              <div className="flex gap-10">
                <span>AdSense_Enabled</span>
                <span>SEO_Parity_Sync</span>
              </div>
            </div>
          </footer>
        </div>
      </ErrorBoundary>
    </div>
  );
};

const DEFAULT_SETTINGS = {
  blur: 16, transparency: 0.05, saturation: 100, color: '#ffffff', 
  outlineOpacity: 0.15, borderRadius: 0, ior: 1.52, compressiveStrength: 145, 
  thermalCoeff: 8.5, transmission: 92, mode: 'preview'
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
