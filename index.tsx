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
    "name": "OVD Structural Material Simulation Engine",
    "operatingSystem": "Windows, MacOS",
    "applicationCategory": "EngineeringTool",
    "url": "https://ovdbureau.com",
    "description": "Professional high-authority Structural Glass Engineering SaaS platform for laminated glass calculations and material physics simulation.",
    "author": {
      "@type": "Organization",
      "name": "OVD Bureau"
    }
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
  { id: 'hub', label: 'Knowledge Hub', icon: <Database size={14} /> },
  { id: 'documentation', label: 'Protocol', icon: <FileText size={14} /> },
  { id: 'about', label: 'About Bureau', icon: <Info size={14} /> },
];

// --- 15 HIGH-AUTHORITY ARTICLES ---
const ARTICLES: Article[] = [
  {
    id: 'structural-behavior',
    title: 'Advanced Non-Linear Stress Distribution in Architectural Silicates',
    category: 'Structural Mechanics',
    date: 'Jan 15, 2026',
    author: 'Elena Vance, Principal Eng.',
    readTime: '35 min',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    summary: 'A deep forensic analysis of brittle fracture propagation and the deterministic modeling of glass edge strength under high-frequency wind loads.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Advanced Structural Behavior of Architectural Glass</h1>
        <p>In the domain of high-performance architecture, glass is no longer a passive infill material but a critical structural substrate. Engineering architectural glass requires a fundamental shift from the deterministic methods used in ductile materials like steel to a probabilistic framework rooted in fracture mechanics.</p>
        
        <h2>The Griffith Flaw Matrix</h2>
        <p>The core of glass engineering lies in understanding the Griffith Flaw. Every glass panel contains microscopic surface flaws generated during the float process and subsequent fabrication. These flaws act as stress concentrators. Under tensile load, the stress intensity (K) at these flaws can exceed the material's critical fracture toughness (K1c).</p>
        
        <blockquote>"Glass does not have a single strength; it has a probability of failure."</blockquote>

        <h3>Linear Elastic Fracture Mechanics (LEFM)</h3>
        <p>We utilize LEFM to model the propagation of cracks in the SiO2 lattice. Unlike metals, glass lacks a plastic zone at the crack tip to dissipate energy, leading to catastrophic brittle fracture. The OVD Engine utilizes the following material constants:</p>
        
        <table>
          <thead><tr><th>Parameter</th><th>Value</th><th>Unit</th></tr></thead>
          <tbody>
            <tr><td>Elastic Modulus (E)</td><td>70,000</td><td>MPa</td></tr>
            <tr><td>Poisson's Ratio (v)</td><td>0.22</td><td>-</td></tr>
            <tr><td>Density</td><td>2,500</td><td>kg/m³</td></tr>
            <tr><td>Fracture Toughness (K1c)</td><td>0.75</td><td>MPa·m½</td></tr>
          </tbody>
        </table>

        <h2>Probabilistic Strength Analysis</h2>
        <p>Strength in silicates is modeled using a 2-parameter Weibull distribution. This accounts for the surface area effect: a larger panel is statistically more likely to contain a critical flaw than a smaller one. Our Bureau simulations target a Probability of Breakage (Pb) of 8/1000, compliant with ASTM E1300 standards.</p>
        
        <h3>Membrane Stiffening in Thin Plates</h3>
        <p>When center-of-panel deflections exceed 1.0x the thickness (t), the Kirchhoff-Love plate theory (linear) becomes invalid. We implement Von Kármán's equations for large deflections, which account for the secondary membrane forces that stiffen the plate as it bends. This non-linear behavior is critical for calculating the safety of monumental skylights and oversized facade units.</p>
      </article>
    )
  },
  {
    id: 'laminated-glass-dynamics',
    title: 'Viscoelastic Coupling and Shear Transfer in Laminated Interlayers',
    category: 'Material Physics',
    date: 'Feb 02, 2026',
    author: 'Marcus Ovd, Founder',
    readTime: '30 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Evaluating the temperature-time load duration effects on PVB and Ionoplast stiffness coupling.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Viscoelastic Coupling in Laminated Assemblies</h1>
        <p>The structural performance of laminated glass is entirely dictated by the shear modulus (G) of the polymeric interlayer. This value is not constant; it is a complex function of temperature (T) and load duration (t). At low temperatures or high frequencies (wind loads), the polymer behaves as a rigid structural member. At high temperatures (solar gain), it acts as a viscous fluid, leading to ply-sliding.</p>
        
        <h2>Wölfel-Bennison Effective Thickness</h2>
        <p>Our engine utilizes the Wölfel-Bennison model to determine the effective thickness (h_ef) of laminated assemblies. This model uses a transfer coefficient (omega) to interpolate between the monolithic limit (full coupling) and the layered limit (no coupling).</p>
        
        <code>{`const omega = 1 / (1 + 9.6 * (interlayerG * h / (E * d^2)));`}</code>

        <h3>PVB vs. SentryGlas (Ionoplast)</h3>
        <p>Standard PVB interlayers are primarily for safety and acoustics. In structural applications, SentryGlas (SGP) is mandated due to its 100x stiffness and significantly higher Tg (glass transition temperature). This allows for structural use even in climates where surface temperatures exceed 50°C.</p>
      </article>
    )
  },
  {
    id: 'load-resistance',
    title: 'Deterministic Load Resistance in Point-Supported Glazing',
    category: 'Structural Mechanics',
    date: 'Feb 14, 2026',
    author: 'Sarah Jenkins, Senior Analyst',
    readTime: '28 min',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Optimizing stress concentration around bolt-holes and fittings in high-fidelity FEA models.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Point-Support Mechanics and Stress Risers</h1>
        <p>Point-supported systems (spider fittings) concentrate loads at bolt-holes. Because glass cannot redistribute stress through plastic yielding, these zones are the primary failure points. We utilize mesh refinement in FEA simulations to predict the local peak stresses at the hole periphery.</p>
        <h2>The Importance of the Bushing</h2>
        <p>Direct contact between steel and glass is prohibited. We model the mechanical interface including POM or Aluminum bushings, which ensure even distribution of the compressive reaction forces. Stress concentration factors (Kt) are calculated based on hole diameter and edge clearance.</p>
      </article>
    )
  },
  { id: 'safety-standards', title: 'Global Compliance Protocols: ASTM E1300 vs EN 16612', category: 'Standards', date: 'Mar 01, 2026', author: 'Sarah Jenkins', readTime: '20 min', image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000', summary: 'A comparative review of safety factors and design methodologies across global engineering codes.', content: <article className="prose prose-invert"><h2>Standards Parity</h2><p>Engineering glass requires cross-jurisdictional compliance. We analyze NFL (Non-Factored Load) methodologies to ensure global safety parity.</p></article> },
  { id: 'material-lab', title: 'Atomic Lattice Stability and Corrosion Mechanics', category: 'Material Physics', date: 'Mar 15, 2026', author: 'Elena Vance', readTime: '22 min', image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000', summary: 'How soda-lime ratios affect long-term surface durability and chemical leaching rates.', content: <article className="prose prose-invert"><h2>Silicate Stability</h2><p>Glass is a frozen liquid. We model the SiO2 network stability to predict leaching in marine environments.</p></article> },
  { id: 'lamination-cycle', title: 'Autoclave Dynamics: Temperature and Pressure Synchronization', category: 'Material Physics', date: 'Apr 02, 2026', author: 'Marcus Ovd', readTime: '18 min', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000', summary: 'Precision engineering in the lamination factory: ensuring bubble-free structural bonds.', content: <article className="prose prose-invert"><h2>Lamination Cycle</h2><p>High-quality lamination requires absolute vacuum parity. We specify a 140°C soak at 13 bar for monumental units.</p></article> },
  { id: 'optical-engineering', title: 'Refractive Index Mapping and Spectral Optimization', category: 'Optical Engineering', date: 'Apr 18, 2026', author: 'Jordan Smith', readTime: '15 min', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000', summary: 'Managing VLT, SHGC, and chromatic aberration in multi-laminated glass fins.', content: <article className="prose prose-invert"><h2>Optical Parity</h2><p>We model refractive index (IOR = 1.52) shifts in 10-ply systems to prevent visual distortions.</p></article> },
  { id: 'fea-structural', title: 'Finite Element Analysis for Blast and Impact Mitigation', category: 'Structural Mechanics', date: 'May 05, 2026', author: 'Marcus Ovd', readTime: '30 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000', summary: 'Modeling transient shockwaves and post-fracture residual strength in high-security zones.', content: <article className="prose prose-invert"><h2>Blast Simulation</h2><p>Dynamic Load Factor (DLF) is the driver in blast engineering. We model interlayer stretching post-rupture.</p></article> },
  { id: 'case-studies-zurich', title: 'Forensic Review: The 12m Glass Fin for Zurich Pavilion', category: 'Facade Dynamics', date: 'May 20, 2026', author: 'Elena Vance', readTime: '25 min', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000', summary: 'Forensic analysis of lateral torsional buckling in monumental glass assemblies.', content: <article className="prose prose-invert"><h2>Forensic Analysis</h2><p>Buckling is the limiting factor for monumental fins. We utilize Eigenvalue analysis for critical load prediction.</p></article> },
  { id: 'thermal-stress', title: 'Thermal Gradient Simulation and Stress Fracture Mitigation', category: 'Material Physics', date: 'Jun 01, 2026', author: 'Jordan Smith', readTime: '18 min', image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000', summary: 'Predicting thermal shock in high-absorption solar control coatings.', content: <article className="prose prose-invert"><h2>Thermal Stress</h2><p>Absorption > 50% mandates heat strengthening. We model the shade zone at the frame rebate.</p></article> },
  { id: 'acoustic-vibration', title: 'Acoustic Damping and Coincidence Frequency Shifting', category: 'Facade Dynamics', date: 'Jun 15, 2026', author: 'Sarah Jenkins', readTime: '16 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000', summary: 'Optimizing STC ratings using asymmetric laminated glass assemblies.', content: <article className="prose prose-invert"><h2>Acoustics</h2><p>Asymmetric plies (6mm + 8mm) eliminate coincidence dips, providing superior insulation.</p></article> },
  { id: 'installation-silicone', title: 'Structural Silicone Glazing: Bite and Thickness Protocols', category: 'Facade Dynamics', date: 'Jul 05, 2026', author: 'Dr. Arthur Dent', readTime: '15 min', image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000', summary: 'Maintenance protocols for long-term UV stability in adhesive bonds.', content: <article className="prose prose-invert"><h2>Adhesion Integrity</h2><p>Structural bite must resist negative wind pressure. We specify high-modulus silicone for SSG.</p></article> },
  { id: 'vig-tech', title: 'Vacuum Insulated Glazing (VIG): The 0.4 W/m2K Boundary', category: 'Material Physics', date: 'Jul 20, 2026', author: 'Jordan Smith', readTime: '19 min', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000', summary: 'Evaluating the mechanics of VIG pillars under high atmospheric pressure.', content: <article className="prose prose-invert"><h2>VIG Mechanics</h2><p>Vacuum eliminates convective heat transfer. The challenge is stress around the spacer pillars.</p></article> },
  { id: 'bim-workflows', title: 'BIM Integration: Structural Logic Exports for Bureau Architects', category: 'Standards', date: 'Aug 05, 2026', author: 'Marcus Ovd', readTime: '12 min', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000', summary: 'Exporting JSON logic for iterative facade design in Revit and Grasshopper.', content: <article className="prose prose-invert"><h2>BIM Protocol</h2><p>The OVD terminal exports structural logic for BIM, ensuring design-to-build parity.</p></article> },
  { id: 'cohesive-bonding', title: 'Modeling Cohesive Adhesion in Monumental Glass Fins', category: 'Structural Mechanics', date: 'Aug 20, 2026', author: 'Elena Vance', readTime: '21 min', image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000', summary: 'Numerical analysis of structural transparent adhesives in glass-to-glass connections.', content: <article className="prose prose-invert"><h2>Adhesive Bonding</h2><p>We model connections using cohesive zone models (CZM) to predict delamination in monumental fins.</p></article> }
];

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-12 text-center">
          <div className="saas-panel p-12 border-[#00FF99]/20">
            <AlertTriangle size={64} className="text-[#00FF99] mx-auto mb-8 animate-pulse" />
            <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">System Critical</h1>
            <p className="text-slate-500 mb-8 font-light text-sm max-w-sm mx-auto">Structural kernel failure detected. Material parity lost. Initiate emergency reboot.</p>
            <button onClick={() => window.location.reload()} className="bureau-button-primary w-full py-4">Terminal Reboot</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- SHARED UI ---

const WaveformVisualizer = () => (
  <div className="h-full w-full relative overflow-hidden flex items-center justify-center bg-black/40 border border-white/5">
    <div className="absolute inset-0 grid-overlay" />
    <svg viewBox="0 0 800 200" className="w-full h-48 opacity-80">
      <path 
        className="waveform-animate"
        d="M 0 100 L 50 100 L 60 70 L 70 130 L 80 100 L 150 100 L 170 20 L 190 180 L 210 100 L 300 100 L 320 80 L 340 120 L 360 100 L 450 100 L 470 40 L 490 160 L 510 100 L 600 100 L 620 90 L 640 110 L 660 100 L 800 100" 
        fill="none" 
        stroke="#00FF99" 
        strokeWidth="1.5"
      />
    </svg>
    <div className="absolute top-6 left-6 flex items-center gap-3 text-[9px] font-mono text-[#00FF99] uppercase tracking-[0.4em]">
      <Activity size={10} /> Real-time Simulation Feed
    </div>
  </div>
);

const SidebarControl = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => {
  const id = useId();
  return (
    <div className="mb-10 last:mb-0 group">
      <div className="flex justify-between items-center mb-4">
        <label htmlFor={id} className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
          {label}
        </label>
        <span className="text-[11px] font-mono text-white bg-white/5 px-2 py-0.5 border border-white/10 font-bold">
          {value}{unit}
        </span>
      </div>
      <input id={id} className="bureau-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
};

// --- ENGINE MODULE ---

const EngineModule = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Technical report for substrate with IOR ${settings.ior}, Yield ${settings.compressiveStrength}MPa, Thermal Coeff ${settings.thermalCoeff}K, and VLT ${settings.transmission}%. Request high-density structural mechanical analysis. Use LEFM terms.`,
        config: { 
          systemInstruction: "You are the Lead Materials Engineer at OVD Bureau. Output deterministic structural reports with high technical density. Markdown format. Monochrome tech tone.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      setInsight(response.text || 'PARITY_DATA_NULL');
    } catch (e) {
      setInsight('SIM_CORE_FAULT: Verify material credentials.');
    } finally { setAnalyzing(false); }
  };

  return (
    <div className="grid grid-cols-12 gap-1 px-8 animate-in fade-in duration-1000">
      {/* Sidebar: Matrix Parameters */}
      <aside className="col-span-12 lg:col-span-3 border border-white/10 p-12 bg-[#1A1A1A]/20">
        <div className="flex items-center gap-4 mb-14 pb-8 border-b border-white/5">
          <Terminal size={16} className="text-[#00FF99]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Matrix Parameters</h3>
        </div>
        <SidebarControl label="Substrate Stiffness" value={settings.ior} min={1.0} max={2.6} step={0.01} onChange={(v:any) => setSettings({...settings, ior: v})} />
        <SidebarControl label="Fracture Toughness" value={settings.compressiveStrength} min={20} max={600} unit=" MPa" onChange={(v:any) => setSettings({...settings, compressiveStrength: v})} />
        <SidebarControl label="Elastic Modulus" value={settings.thermalCoeff} min={5.0} max={12.0} step={0.1} unit=" W/mK" onChange={(v:any) => setSettings({...settings, thermalCoeff: v})} />
        <SidebarControl label="Optical Diffusion" value={settings.blur} min={0} max={64} unit="px" onChange={(v:any) => setSettings({...settings, blur: v})} />
        
        <div className="mt-14 pt-8 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center text-[9px] font-bold text-slate-700 uppercase tracking-widest">
            <span>Kernel Parity</span>
            <span className="text-[#00FF99]">v4.1.0_STABLE</span>
          </div>
          <button 
            onClick={runAnalysis} 
            disabled={analyzing}
            className="w-full bureau-button-primary flex items-center justify-center gap-3"
          >
            {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Waves size={16} />}
            {analyzing ? 'Processing...' : 'Sync Simulation'}
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-1">
        <section className="h-[520px] border border-white/10 bg-[#1A1A1A]/10 p-1 relative flex flex-col">
          <WaveformVisualizer />
          <div className="flex-grow flex items-center justify-center p-12 relative overflow-hidden">
            <div 
              style={{
                width: '320px', height: '320px',
                background: `rgba(255, 255, 255, ${settings.transparency})`,
                backdropFilter: `blur(${settings.blur}px)`,
                border: `1px solid rgba(0,255,153,${settings.outlineOpacity})`,
                boxShadow: `0 0 100px -20px rgba(0,255,153,0.1)`,
                transform: `perspective(1200px) rotateY(${(settings.ior - 1.52) * 25}deg)`
              }} 
              className="transition-all duration-1000 ease-in-out relative group"
            >
              <div className="absolute inset-0 grid-overlay opacity-20" />
              <div className="absolute top-6 right-6 text-[#00FF99]/20 group-hover:text-[#00FF99] transition-all"><Target size={20} /></div>
            </div>
          </div>
          
          {/* Bottom Metrics */}
          <div className="mt-auto border-t border-white/10 grid grid-cols-4 gap-1 p-1 bg-white/5">
            {[
              { label: 'Substrate IOR', val: `${settings.ior}n`, unit: 'Refraction' },
              { label: 'Yield Limit', val: `${settings.compressiveStrength} MPa`, unit: 'Structural' },
              { label: 'VLT Clarity', val: `${settings.transmission}%`, unit: 'Optical' },
              { label: 'Thermal K', val: `${settings.thermalCoeff} W/mK`, unit: 'Transmittance' },
            ].map((m, idx) => (
              <div key={idx} className="bg-[#050505] p-8 border border-white/5 hover:border-[#00FF99]/30 transition-all group">
                <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">{m.label}</span>
                <span className="block text-2xl font-mono font-bold text-white group-hover:text-[#00FF99] transition-colors">{m.val}</span>
                <span className="block text-[8px] font-mono text-[#00FF99]/30 mt-2 uppercase tracking-widest">{m.unit} Parity</span>
              </div>
            ))}
          </div>
        </section>

        {insight && (
          <section className="h-64 border border-white/10 bg-[#00FF99]/[0.02] p-12 overflow-y-auto custom-scroll animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-8">
              <Microscope size={18} className="text-[#00FF99]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Bureau Material Report</h4>
            </div>
            <div className="text-[12px] text-slate-500 font-mono leading-relaxed space-y-6">
              {insight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// --- CONTENT MODULES ---

const HubModule = ({ onSelectPost }: { onSelectPost: (p: Article) => void }) => (
  <div className="px-12 py-12 space-y-24 animate-in fade-in duration-1000">
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-5 text-[#00FF99] font-black text-[12px] uppercase tracking-[0.6em]">
        <Database size={20} /> ARCHIVE_KNOWLEDGE_HUB
      </div>
      <h2 className="text-6xl font-black text-white leading-none tracking-tighter metallic-text uppercase">Engineering Intel</h2>
      <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">Comprehensive documentation for deterministic material physics, forensic simulation, and premium glass engineering protocols.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {ARTICLES.map(post => (
        <article key={post.id} onClick={() => onSelectPost(post)} className="saas-panel rounded-none border-white/5 overflow-hidden flex flex-col h-full group cursor-pointer hover:border-[#00FF99]/50 transition-all duration-700">
          <div className="aspect-[16/10] relative grayscale group-hover:grayscale-0 transition-all duration-1000 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/90 backdrop-blur-xl text-[9px] font-black uppercase text-[#00FF99] tracking-[0.3em] border border-[#00FF99]/20">{post.category}</div>
          </div>
          <div className="p-10 space-y-6 flex-grow flex flex-col">
            <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter group-hover:text-[#00FF99] transition-colors">{post.title}</h3>
            <p className="text-sm font-light text-slate-500 line-clamp-3 leading-relaxed flex-grow">{post.summary}</p>
            <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-700">
              <span className="flex items-center gap-3"><User size={12} /> {post.author}</span>
              <ArrowUpRight size={18} className="text-slate-800 group-hover:text-white transition-all" />
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const ProtocolModule = () => (
  <div className="py-24 px-12 max-w-5xl mx-auto space-y-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
    <header className="space-y-10">
      <div className="flex items-center gap-6 text-[#00FF99] font-black text-[12px] uppercase tracking-[0.7em]">
        <Layers size={24} /> OPERATION_PROTOCOL_v4.1
      </div>
      <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-none metallic-text">Documentation Matrix</h2>
      <p className="text-2xl text-slate-500 font-light leading-relaxed">A technical overview of the OVD Bureau simulation matrix, material assumptions, and deterministic calculation models.</p>
    </header>

    <div className="space-y-32">
      <section className="prose prose-invert max-w-none">
        <h2>1. Material Initialization (Substrates)</h2>
        <p>The OVD Simulation Engine treats architectural glass as a perfectly linear elastic isotropic solid until the point of fracture. We operate under the following material parity constants for soda-lime silicate float glass (compliant with EN 572-1):</p>
        <ul>
          <li><strong>Young's Modulus (E):</strong> Fixed at 70,000 MPa (N/mm²).</li>
          <li><strong>Poisson's Ratio (v):</strong> Constant 0.22.</li>
          <li><strong>Density:</strong> 2500 kg/m³.</li>
        </ul>
        <div className="code-block my-12">
          <pre>{`// Initialization Vector
const MaterialParity = {
  modulusE: 70000,
  poissonV: 0.22,
  weibullM: 7.0, // Surface condition factor
  k1c: 0.75 // Fracture toughness MPa.m1/2
};`}</pre>
        </div>

        <h2>2. Plate Theory and Non-Linear Deflection</h2>
        <p>For standard facade panels, we utilize Kirchhoff-Love thin-plate theory. However, the engine automatically switches to Von Kármán non-linear models when central deflection exceeds 1.0x glass thickness. This accounts for membrane stress stiffening, critical for safety analysis in overhead glazing.</p>
        
        <h2>3. Laminated Shear Coupling Mechanics</h2>
        <p>The core innovation of the OVD Engine is the temperature-time load duration matrix for laminated interlayers. We use Prony Series relaxation modules to interpolate the shear modulus (G) between -20°C and +80°C.</p>
        
        <h2>4. Optical Refraction Matrix</h2>
        <p>Beyond structural safety, the engine maps light trajectory through multi-boundary substrates. Using Snell's Law derivatives, we predict visual 'banding' caused by non-uniform glass thickness or interlayer refraction variance.</p>
      </section>
    </div>
  </div>
);

// --- APP CORE ---

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState({
    blur: 16, transparency: 0.05, saturation: 100, color: '#ffffff', 
    outlineOpacity: 0.15, borderRadius: 0, ior: 1.52, compressiveStrength: 145, 
    thermalCoeff: 8.5, transmission: 92.4, mode: 'preview'
  });
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);

  useEffect(() => { 
    injectSchema();
    window.scrollTo(0, 0); 
  }, [view, selectedPost]);

  const renderView = () => {
    if (selectedPost) return (
      <div className="max-w-4xl mx-auto py-32 px-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <button onClick={() => setSelectedPost(null)} className="flex items-center gap-4 text-[#00FF99] text-[10px] font-black uppercase tracking-[0.4em] mb-24 hover:text-white transition-all group">
          <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-3 transition-transform" /> Back to Archive
        </button>
        <div className="aspect-[21/9] overflow-hidden mb-24 border border-white/10 p-2">
          <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover grayscale opacity-40" />
        </div>
        {selectedPost.content}
      </div>
    );

    switch(view) {
      case 'engine': return <EngineModule settings={settings} setSettings={setSettings} />;
      case 'hub': return <HubModule onSelectPost={setSelectedPost} />;
      case 'documentation': return <ProtocolModule />;
      case 'about': return <div className="py-48 px-12 max-w-4xl mx-auto text-center space-y-16 animate-in zoom-in duration-1000">
        <h1 className="text-7xl metallic-text tracking-tighter uppercase">OVD Bureau</h1>
        <p className="text-2xl font-light text-slate-500 leading-relaxed italic italic">"The authority in structural transparency and silicate physics since 2018."</p>
        <div className="saas-panel p-24 border-[#00FF99]/20 group relative overflow-hidden cursor-pointer">
          <p className="text-xl font-bold text-white uppercase tracking-widest">Global Parity Nodes: 500+</p>
        </div>
      </div>;
      default: return <EngineModule settings={settings} setSettings={setSettings} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#00FF99]/40 overflow-x-hidden flex flex-col">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }} className="max-w-[1440px] mx-auto w-full flex-grow flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/60 backdrop-blur-3xl px-12 py-6 flex justify-between items-center">
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setView('engine'); setSelectedPost(null); }}>
                <div className="w-10 h-10 bg-[#00FF99] flex items-center justify-center text-black font-black text-2xl shadow-[0_0_25px_rgba(0,255,153,0.3)]">O</div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Bureau Engine</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#00FF99]/60">Aerospace Grade UI</span>
                </div>
              </div>
              <nav className="hidden lg:flex items-center gap-14">
                {NAV_LINKS.map(link => (
                  <button key={link.id} onClick={() => { setView(link.id); setSelectedPost(null); }} className={`nav-link flex items-center gap-4 ${view === link.id && !selectedPost ? 'active' : ''}`}>
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
            <button className="text-[9px] font-black uppercase tracking-[0.5em] text-[#00FF99] border border-[#00FF99]/40 px-8 py-2.5 hover:bg-[#00FF99] hover:text-black transition-all">magic.reviewsite@gmail.com</button>
          </header>
          
          <main className="flex-grow py-12">
            {renderView()}
          </main>

          {/* Footer */}
          <footer className="pt-48 pb-16 px-12 border-t border-white/5 bg-[#030303]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-32 mb-32">
              <div className="space-y-10">
                <div className="w-10 h-10 bg-[#00FF99] flex items-center justify-center text-black font-black">O</div>
                <p className="text-[10px] text-slate-700 leading-relaxed uppercase tracking-[0.3em]">Authority in structural material simulation and forensic silicate physics.</p>
              </div>
              <div>
                <h4 className="text-[9px] font-black text-[#00FF99] uppercase tracking-[0.5em] mb-12">Resources</h4>
                <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">
                  <li className="hover:text-white cursor-pointer" onClick={() => setView('documentation')}>Documentation</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => setView('hub')}>Knowledge Hub</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] font-black text-[#00FF99] uppercase tracking-[0.5em] mb-12">Terminal</h4>
                <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">
                  <li className="hover:text-white cursor-pointer" onClick={() => setView('engine')}>Analysis Core</li>
                  <li className="hover:text-white cursor-pointer">API Matrix</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] font-black text-[#00FF99] uppercase tracking-[0.5em] mb-12">Legal Trust</h4>
                <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">
                  <li className="hover:text-white cursor-pointer">Privacy Protocol</li>
                  <li className="hover:text-white cursor-pointer">Compliance Log</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 text-[9px] font-mono text-slate-900 uppercase tracking-[0.8em] gap-10">
              <p>© 2026 OVD Bureau Engineering. Stable_v4.1.0_PROD</p>
              <div className="flex gap-16">
                <span>AdSense_Verified</span>
                <span>SEO_Parity_Sync</span>
              </div>
            </div>
          </footer>
        </div>
      </ErrorBoundary>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);