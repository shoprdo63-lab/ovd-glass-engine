
import './globals.css';
import React, { useState, useId, useEffect, ReactNode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, ChevronRight, Mail, AlertTriangle, ArrowUpRight, Sparkles, Loader2, 
  Thermometer, Terminal, Hash, Fingerprint, Box, BarChart3, Microscope, 
  Compass, PenTool, Layout, Database, Globe, Wind, Activity, Cpu, Layers, 
  FileText, Copy, Code, Eye, ExternalLink, Github, Twitter, Linkedin,
  Search, BookOpen, Info, CheckCircle, Scale, Zap, Settings, Download, 
  User, Calendar, Clock, ArrowRight, Share2, Printer, Target, Waves, 
  Activity as Pulse, Crosshair, Zap as Flash, Command
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TELEMETRY DATA ---
const TELEMETRY_META = [
  "ENCRYPTION: AES-256_ACTIVE",
  "CORE_LOAD: 12.4%",
  "PARITY_STATUS: SYNCED",
  "LATENCY: 4.2ms",
  "LOCATION: ORBITAL_NODE_09"
];

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

// --- 15 HIGH-AUTHORITY ARTICLES (BUILD-SAFE CONTENT) ---
const ARTICLES: Article[] = [
  {
    id: 'structural-behavior',
    title: 'Advanced Non-Linear Stress Distribution in Architectural Silicates',
    category: 'Structural Mechanics',
    date: 'Jan 15, 2026',
    author: 'Elena Vance, Principal Eng.',
    readTime: '35 min',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    summary: 'Forensic analysis of brittle fracture propagation and deterministic modeling of glass edge strength under high-frequency wind loads.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Advanced Structural Behavior of Architectural Glass</h1>
        <p>In high-performance architecture, glass acts as a critical structural substrate. Engineering architectural glass requires a fundamental shift from deterministic methods to a probabilistic framework rooted in fracture mechanics.</p>
        <h2>The Griffith Flaw Matrix</h2>
        <p>Every glass panel contains microscopic surface flaws generated during float processing. Under tensile load, the stress intensity at these flaws can exceed the material's critical fracture toughness threshold.</p>
        <blockquote>"Glass does not have a single strength; it possesses a probability of failure based on surface area and flaw density."</blockquote>
        <h3>Linear Elastic Fracture Mechanics (LEFM)</h3>
        <p>We utilize LEFM to model crack propagation in the SiO2 lattice. Unlike metals, glass lacks a plastic zone at the crack tip to dissipate energy, leading to catastrophic brittle fracture.</p>
      </article>
    )
  },
  {
    id: 'viscoelastic-coupling',
    title: 'Viscoelastic Coupling and Shear Transfer in Laminated Interlayers',
    category: 'Material Physics',
    date: 'Feb 02, 2026',
    author: 'Marcus Ovd, Founder',
    readTime: '30 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Evaluating temperature-time load duration effects on PVB and Ionoplast stiffness coupling in extreme thermal environments.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Viscoelastic Coupling in Laminated Assemblies</h1>
        <p>The structural performance of laminated glass is dictated by the shear modulus of the polymeric interlayer. This value is a complex function of temperature and load duration.</p>
        <p>Standard PVB interlayers are primarily for safety and acoustics. In structural applications, SentryGlas is mandated due to its 100x stiffness and significantly higher glass transition temperature. This allows for structural use in climates where surface temperatures exceeds 50 degrees Celsius.</p>
      </article>
    )
  },
  {
    id: 'point-supported-glazing',
    title: 'Deterministic Load Resistance in Point-Supported Glazing',
    category: 'Structural Mechanics',
    date: 'Feb 14, 2026',
    author: 'Sarah Jenkins, Senior Analyst',
    readTime: '28 min',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Optimizing stress concentration around bolt-holes and fittings using high-fidelity finite element analysis (FEA).',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Point-Support Mechanics and Stress Risers</h1>
        <p>Point-supported systems concentrate loads at bolt-holes. Zones around these holes are primary failure points because glass cannot redistribute stress through plastic yielding.</p>
        <p>Stress concentration factors are calculated based on hole diameter and edge clearance, ensuring peak stress remains below operational tolerance.</p>
      </article>
    )
  },
  {
    id: 'compliance-standards',
    title: 'Global Compliance Protocols: ASTM E1300 vs EN 16612 Analysis',
    category: 'Standards & Compliance',
    date: 'Feb 25, 2026',
    author: 'Dr. Arthur Dent',
    readTime: '18 min',
    image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000',
    summary: 'Comparative review of load duration factors and probabilistic breakage limits in international engineering codes.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Global Standards Protocol</h1>
        <p>Professional engineering requires multi-jurisdictional compliance. We analyze the Non-Factored Load methodologies to ensure global safety parity across ASTM and EN standards.</p>
      </article>
    )
  },
  {
    id: 'chemical-durability',
    title: 'Atomic Lattice Stability and Silicate Corrosion Mechanics',
    category: 'Material Physics',
    date: 'Mar 05, 2026',
    author: 'Elena Vance',
    readTime: '25 min',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000',
    summary: 'How soda-lime-silica ratios affect long-term corrosion resistance and microscopic surface durability.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Silicate Physics and Stability</h1>
        <p>Chemical durability is a factor of the glass composition. Migration of alkali ions to the surface under humid conditions leads to pitting, which decreases bending strength below the failure envelope over decades of service.</p>
      </article>
    )
  },
  {
    id: 'autoclave-optimization',
    title: 'Autoclave Dynamics: Temperature and Pressure Synchronization',
    category: 'Material Physics',
    date: 'Mar 15, 2026',
    author: 'Marcus Ovd',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000',
    summary: 'Precision vacuum-ring application and the prevention of delamination in complex multi-ply laminated assemblies.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Lamination Cycle Standards</h1>
        <p>High-quality lamination requires absolute vacuum parity. We specify a soak period at 140C at a pressure that exceeds 13bar for monumental units to ensure a structural bond.</p>
      </article>
    )
  },
  {
    id: 'optical-refraction',
    title: 'Parasitic Refraction in Monumental Low-Iron Substrates',
    category: 'Optical Engineering',
    date: 'Mar 25, 2026',
    author: 'Jordan Smith',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Analyzing visible light transmission drop across multi-laminated glass fins and corrective spectral shifts.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Optical Engineering for Clarity</h1>
        <p>Low-iron glass with visible light transmission that exceeds 91 percent is mandatory for high-clarity facades. We model refractive index shifts to prevent visual banding.</p>
      </article>
    )
  },
  {
    id: 'blast-modeling',
    title: 'Finite Element Analysis for Blast and Impact Mitigation',
    category: 'Structural Mechanics',
    date: 'Apr 05, 2026',
    author: 'Marcus Ovd',
    readTime: '30 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Modeling transient shockwaves and post-fracture residual strength in high-security zones.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Blast Simulation and Security</h1>
        <p>The Dynamic Load Factor is the primary driver in blast engineering. We model interlayer stretching after initial glass rupture to determine the residual load capacity.</p>
      </article>
    )
  },
  {
    id: 'monumental-fins',
    title: 'Case Study: 12m vertical fins for the Zurich Pavilion',
    category: 'Facade Dynamics',
    date: 'Apr 28, 2026',
    author: 'Elena Vance',
    readTime: '22 min',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    summary: 'Forensic review of lateral torsional buckling and Eigenvalue stability in monumental glass fins.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Forensic Analysis of Zurich Fins</h1>
        <p>Buckling is the limiting factor for monumental fins. Slenderness ratios in these assemblies often exceeds standard safety margins, requiring advanced lateral torsional buckling analysis.</p>
      </article>
    )
  },
  {
    id: 'thermal-stress-fracture',
    title: 'Thermal Gradient Simulation in Triple-Silver Coatings',
    category: 'Material Physics',
    date: 'May 10, 2026',
    author: 'Jordan Smith',
    readTime: '16 min',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000',
    summary: 'Predicting spontaneous thermal fracture in high-absorption glazing through edge-resistance modeling.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Thermal Fracture Mitigation</h1>
        <p>If the center-to-edge thermal gradient exceeds 40K in annealed glass, spontaneous cracking is likely. We specify heat strengthening where absorption values exceeds 50 percent.</p>
      </article>
    )
  },
  {
    id: 'acoustic-frequency',
    title: 'Acoustic Damping and Coincidence Frequency Shifting',
    category: 'Facade Dynamics',
    date: 'May 22, 2026',
    author: 'Sarah Jenkins',
    readTime: '14 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Optimizing sound transmission ratings using asymmetric glass build-ups.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Acoustic Science for Facades</h1>
        <p>Laminating asymmetric plies eliminates the coincidence frequency dip, providing superior insulation compared to monolithic equivalents of the same weight.</p>
      </article>
    )
  },
  {
    id: 'silicone-bite',
    title: 'Structural Silicone Glazing: Bite and Thickness Protocols',
    category: 'Facade Dynamics',
    date: 'Jun 10, 2026',
    author: 'Dr. Arthur Dent',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000',
    summary: 'Engineering mechanical retainers and adhesive bond integrity in high-wind zones.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Installation and Adhesion</h1>
        <p>Structural bite must resist negative wind pressure. We specify high-modulus silicone where negative pressure exceeds the standard operational envelope of EPDM gaskets.</p>
      </article>
    )
  },
  {
    id: 'vig-pillar-tech',
    title: 'Vacuum Insulated Glazing (VIG): The 0.4 U-Value Barrier',
    category: 'Material Physics',
    date: 'Jun 28, 2026',
    author: 'Jordan Smith',
    readTime: '19 min',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Evaluating vacuum pillar stability under atmospheric pressure reaching 10 tons per square meter.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>VIG Technology and Stability</h1>
        <p>Removing air eliminates convective heat transfer. The challenge is the stress around spacer pillars, where point-load pressures exceeds material yield limits without precise geometry.</p>
      </article>
    )
  },
  {
    id: 'bim-logic-export',
    title: 'Professional Logic Exports for Bureau BIM Integration',
    category: 'Standards & Compliance',
    date: 'Jul 15, 2026',
    author: 'Marcus Ovd',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000',
    summary: 'Exporting structural simulation logic for Revit and Rhino integration in parametric workflows.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Workflow Integration</h1>
        <p>The OVD Engine exports structural logic as JSON, allowing architectural firms to maintain design-to-build parity across entire skyscraper facades.</p>
      </article>
    )
  },
  {
    id: 'cohesive-bonding',
    title: 'Cohesive Zone Modeling for Adhesive Bonded Fins',
    category: 'Structural Mechanics',
    date: 'Aug 01, 2026',
    author: 'Elena Vance',
    readTime: '24 min',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000',
    summary: 'Numerical analysis of transparent adhesive joints in monumental glass assemblies.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h1>Adhesive Bonding Protocol</h1>
        <p>We model connections using Cohesive Zone Models to predict delamination. Failure analysis ensures the assembly exceeds seismic drift requirements.</p>
      </article>
    )
  }
];

// --- NAVIGATION CONFIG ---
// FIX: Added missing NAV_LINKS definition.
const NAV_LINKS = [
  { id: 'engine', label: 'Analysis Core' },
  { id: 'hub', label: 'Knowledge Archive' }
];

// --- APP CORE ---

const SidebarSlider = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => {
  const id = useId();
  return (
    <div className="mb-6 space-y-3 group">
      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-mono">
        <label htmlFor={id} className="text-slate-500 group-hover:text-white transition-colors">{label}</label>
        <span className="text-[#00FF99] font-bold">{value}{unit}</span>
      </div>
      <input 
        id={id} 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="bureau-range w-full"
      />
    </div>
  );
};

const WaveformVisualizer = () => (
  <div className="h-full w-full bg-[#000000] border border-[#1A1A1A] relative overflow-hidden flex items-center justify-center">
    {/* Telemetry Grid */}
    <div className="absolute inset-0 grid-overlay opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.05)_0%,transparent_70%)]" />
    
    {/* Visualizer Path */}
    <svg viewBox="0 0 800 200" className="w-full h-48 opacity-80">
      <path 
        className="waveform-animate"
        d="M 0 100 Q 50 10, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100" 
        fill="none" 
        stroke="#00FF99" 
        strokeWidth="1.2"
      />
    </svg>
    
    {/* Telemetry Labels */}
    <div className="absolute top-4 left-4 flex flex-col gap-1 text-[8px] font-mono text-slate-700 tracking-[0.3em] uppercase">
      {TELEMETRY_META.map((m, i) => <span key={i}>{m}</span>)}
    </div>
    <div className="absolute bottom-4 right-4 text-[#00FF99]/20 text-[10px] font-mono animate-pulse">
      SYSTEM_STABLE: 200 OK
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('engine');
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);
  const [settings, setSettings] = useState({
    thermalGradient: 42,
    fractureThreshold: 0.75,
    eigenvalueIndex: 1.4,
    stressScaling: 2.5,
    elasticModulus: 72,
    ior: 1.52,
    transparency: 0.1,
    blur: 12
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const runSimulation = async () => {
    setAnalyzing(true);
    try {
      // Use process.env.API_KEY directly as required.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Generate deterministic structural engineering report for: Thermal Gradient ${settings.thermalGradient}K, Fracture Threshold ${settings.fractureThreshold}MPa, Eigenvalue Stability ${settings.eigenvalueIndex}. Current mode: AEROSPACE_CERTIFIED.`,
        config: { systemInstruction: "Output clinical, high-density structural mechanical analysis. No conversational filler. Monospaced tech tone." }
      });
      // Correctly access text property directly.
      setReport(response.text || "REPORT_GENERATION_FAILED");
    } catch (e) {
      setReport("ERROR: PARITY_LOST_CHECK_CREDENTIALS");
    } finally {
      setAnalyzing(false);
    }
  };

  const renderView = () => {
    if (selectedPost) return (
      <div className="max-w-4xl mx-auto py-24 px-12 animate-in fade-in slide-in-from-bottom-8">
        <button 
          onClick={() => setSelectedPost(null)} 
          className="flex items-center gap-3 text-[#00FF99] text-[10px] font-bold uppercase tracking-[0.4em] mb-12 hover:text-white transition-all"
        >
          <ChevronRight size={14} className="rotate-180" /> Back to Archive
        </button>
        {selectedPost.content}
      </div>
    );

    if (view === 'hub') return (
      <div className="px-12 py-16 space-y-16 animate-in fade-in duration-700">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter metallic-text">Knowledge Archive</h2>
          <p className="text-slate-500 font-light text-sm tracking-wide">Professional repository of structural material simulation and forensic silicate physics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {ARTICLES.map(post => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="bg-[#050505] border border-[#1A1A1A] p-8 space-y-6 hover:border-[#00FF99]/40 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-[#00FF99] uppercase tracking-[0.3em]">{post.category}</span>
                <span className="text-[8px] font-mono text-slate-700">READ_TIME: {post.readTime}</span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-[#00FF99] transition-colors">{post.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{post.summary}</p>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-800">
                <span>{post.author}</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="grid grid-cols-12 gap-1 px-8 animate-in fade-in duration-1000">
        {/* Left Sidebar - Simulation Controls */}
        <aside className="col-span-12 lg:col-span-3 bg-[#050505] border border-[#1A1A1A] p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
            <Terminal size={16} className="text-[#00FF99]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Analysis Core</span>
          </div>
          <div className="space-y-4">
            <SidebarSlider label="Thermal Gradient" value={settings.thermalGradient} min={0} max={100} unit="K" onChange={(v:any) => setSettings({...settings, thermalGradient: v})} />
            <SidebarSlider label="Fracture Threshold" value={settings.fractureThreshold} min={0.1} max={5.0} step={0.01} unit="MPa" onChange={(v:any) => setSettings({...settings, fractureThreshold: v})} />
            <SidebarSlider label="Eigenvalue Stability" value={settings.eigenvalueIndex} min={0} max={3.0} step={0.1} onChange={(v:any) => setSettings({...settings, eigenvalueIndex: v})} />
            <SidebarSlider label="Stress Scaling" value={settings.stressScaling} min={0.1} max={10.0} step={0.1} onChange={(v:any) => setSettings({...settings, stressScaling: v})} />
            <SidebarSlider label="Elastic Modulus" value={settings.elasticModulus} min={10} max={200} unit="GPa" onChange={(v:any) => setSettings({...settings, elasticModulus: v})} />
          </div>
          <div className="mt-auto pt-10 space-y-4">
            <div className="flex justify-between items-center text-[8px] font-mono text-slate-700 uppercase tracking-widest">
              <span>Security_Hash</span>
              <span>8f_3e_91_ab</span>
            </div>
            <button 
              onClick={runSimulation}
              disabled={analyzing}
              className="w-full bureau-button-primary flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Command size={16} />}
              {analyzing ? 'PROCESSING...' : 'INITIATE SIMULATION'}
            </button>
          </div>
        </aside>

        {/* Main Stage - Telemetry Visualization */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-1">
          <section className="h-[520px] bg-[#000000] border border-[#1A1A1A] relative flex flex-col group">
            <WaveformVisualizer />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                style={{
                  width: '280px', height: '280px',
                  background: `rgba(255, 255, 255, ${settings.transparency})`,
                  backdropFilter: `blur(${settings.blur}px)`,
                  border: `1px solid rgba(0,255,153,${settings.fractureThreshold/5})`,
                  boxShadow: `0 0 100px -20px rgba(0,255,153,${settings.stressScaling/20})`,
                  transform: `perspective(1000px) rotateY(${(settings.eigenvalueIndex - 1.5) * 30}deg)`
                }} 
                className="transition-all duration-1000 relative"
              >
                <div className="absolute top-4 right-4 text-[#00FF99]/20 group-hover:text-[#00FF99] transition-all"><Crosshair size={18} /></div>
                <div className="absolute inset-0 grid-overlay opacity-20" />
              </div>
            </div>

            {/* Bottom Metric Blocks */}
            <div className="mt-auto grid grid-cols-4 gap-1 p-1 bg-[#1A1A1A]">
              {[
                { label: 'Yield Strength', val: `${140 + settings.thermalGradient} MPa`, status: 'NOMINAL' },
                { label: 'Young\'s Modulus', val: `${settings.elasticModulus} GPa`, status: 'SYNCED' },
                { label: 'Residual stress', val: `${(settings.stressScaling * 4).toFixed(1)}%`, status: 'STABLE' },
                { label: 'Clarity index', val: '92.4%', status: 'HIGH' }
              ].map((m, i) => (
                <div key={i} className="bg-[#050505] p-6 border border-[#1A1A1A] group hover:border-[#00FF99]/30 transition-all">
                  <span className="block text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2">{m.label}</span>
                  <span className="block text-3xl font-bold text-white group-hover:text-[#00FF99] transition-colors">{m.val}</span>
                  <span className="block text-[8px] font-mono text-[#00FF99]/40 mt-1 uppercase tracking-widest">{m.status}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Simulation Output Report */}
          {report && (
            <div className="h-64 bg-[#050505] border border-[#1A1A1A] p-10 overflow-y-auto custom-scroll animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 mb-6">
                <Microscope size={14} className="text-[#00FF99]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Simulation Telemetry Report</h4>
              </div>
              <div className="text-[12px] font-mono text-slate-500 leading-relaxed whitespace-pre-wrap">
                {report}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#000000] min-h-screen selection:bg-[#00FF99]/40 flex flex-col">
      <header className="sticky top-0 z-[100] border-b border-[#1A1A1A] bg-[#000000]/80 backdrop-blur-3xl px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('engine')}>
            <div className="w-8 h-8 bg-[#00FF99] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(0,255,153,0.3)]">O</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Bureau Engine</span>
              <span className="text-[8px] font-mono text-[#00FF99]/40">v4.1.0_PROD</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <button 
                key={link.id} 
                onClick={() => { setView(link.id); setSelectedPost(null); }} 
                className={`nav-link flex items-center gap-3 ${view === link.id && !selectedPost ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Flash size={14} className="text-[#00FF99] animate-pulse" />
          <span className="text-[9px] font-mono text-slate-800 uppercase tracking-widest hidden md:block">AEROSPACE_TERMINAL_0X0</span>
          <button className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FF99] border border-[#00FF99]/20 px-6 py-2 hover:bg-[#00FF99] hover:text-black transition-all">
            Access_Protocol
          </button>
        </div>
      </header>

      <main className="flex-grow py-8">
        {renderView()}
      </main>

      <footer className="pt-24 pb-12 px-12 border-t border-[#1A1A1A] bg-[#030303]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24 max-w-[1440px] mx-auto">
          <div className="space-y-6">
            <div className="w-8 h-8 bg-[#00FF99] flex items-center justify-center text-black font-black">O</div>
            <p className="text-[10px] text-slate-700 leading-relaxed uppercase tracking-widest">Global authority in structural material simulation and forensic facade engineering.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-[#00FF99] uppercase tracking-[0.4em] mb-10">Protocols</h4>
            <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
              <li className="hover:text-white cursor-pointer" onClick={() => setView('engine')}>Analysis core</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setView('hub')}>Knowledge archive</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-[#00FF99] uppercase tracking-[0.4em] mb-10">BUREAU</h4>
            <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
              <li className="hover:text-white cursor-pointer">Security keys</li>
              <li className="hover:text-white cursor-pointer">Encryption logs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-[#00FF99] uppercase tracking-[0.4em] mb-10">System</h4>
            <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
              <li className="hover:text-white cursor-pointer">Node status</li>
              <li className="hover:text-white cursor-pointer">Hardware parity</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[8px] font-mono text-slate-900 uppercase tracking-[0.8em] gap-6">
          <p>© 2026 OVD Bureau Engineering. Mission_Critical_SaaS</p>
          <div className="flex gap-10">
            <span>NASA_SIM_CERTIFIED</span>
            <span>AEROSPACE_GRADE_UI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
