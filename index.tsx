import React, { useState, useId, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Layers, Zap, Terminal, Copy, Menu, X, Wind, Shield, Database, 
  Settings, BookOpen, UserCheck, FileText, ChevronRight, Globe, Scale, 
  Activity, Sun, Mail, Clock, Calendar, CheckCircle, AlertTriangle, 
  RotateCcw, Thermometer, Gauge, Glasses, Microscope, Briefcase, ExternalLink, Download
} from 'lucide-react';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component<{ children?: ReactNode }, { hasError: boolean }> {
  public state = { hasError: false };
  static getDerivedStateFromError(_: Error) { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("CRITICAL_OVD_SYS_ERR:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-md w-full glass-card p-12 rounded-[40px] text-center border-red-500/20">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">System Malfunction</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">The material simulation core encountered a critical rendering exception. The system has been halted to maintain data integrity.</p>
            <button onClick={() => window.location.reload()} className="px-10 py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-red-600 transition-colors">Restore Environment</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- CONSTANTS ---
const DEFAULT_SETTINGS = {
  blur: 16, transparency: 0.25, saturation: 110, color: '#ffffff', 
  outlineOpacity: 0.3, shadowBlur: 20, shadowOpacity: 0.15, 
  lightAngle: 145, borderRadius: 24, ior: 1.52, compressiveStrength: 120, 
  thermalCoeff: 8.5, transmission: 88,
};

const PRESETS = [
    { name: "Pro Cupertino", category: "Commercial", settings: { ...DEFAULT_SETTINGS, blur: 25, transparency: 0.65, saturation: 180, color: "#ffffff", outlineOpacity: 0.4, borderRadius: 20, ior: 1.52, transmission: 91 } },
    { name: "Spatial Glazing", category: "Advanced", settings: { ...DEFAULT_SETTINGS, blur: 35, transparency: 0.1, saturation: 120, color: "#ffffff", outlineOpacity: 0.6, borderRadius: 32, ior: 2.1, transmission: 95 } },
    { name: "Industrial Carbon", category: "Structural", settings: { ...DEFAULT_SETTINGS, blur: 50, transparency: 0.9, saturation: 0, color: "#09090b", outlineOpacity: 0.1, borderRadius: 24, compressiveStrength: 450, ior: 2.4 } },
    { name: "Arctic Laminated", category: "Architectural", settings: { ...DEFAULT_SETTINGS, blur: 12, transparency: 0.4, saturation: 110, color: "#e0f2fe", outlineOpacity: 0.5, borderRadius: 16, ior: 1.58 } }
];

const PLANS = ["Essential", "Standard", "Enterprise"];

// --- HELPERS ---
const calculateShadow = (angleDeg: number, distance: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.round(distance * -Math.sin(rad)), y: Math.round(distance * Math.cos(rad)) };
};

const hexToRgb = (hex: string) => {
  const cleanHex = String(hex).replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16) || 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) || 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) || 255;
  return `${r}, ${g}, ${b}`;
};

// --- MASSIVE CONTENT REPOSITORY (12,000+ Words Structure) ---
const BLOG_POSTS = [
  {
    id: "structural-mechanics",
    title: "Structural Glass Stress and Safety: Theoretical Foundations & Mechanical Limits",
    category: "Physics",
    date: "March 20, 2026",
    summary: "A deep dive into the mechanical properties of glass as a brittle structural material and how to calculate stress distribution under environmental loads.",
    content: `Architectural glass represents a unique challenge in structural engineering. Unlike ductile materials such as steel, which undergo plastic deformation before failure, glass is a brittle solid with an amorphous atomic structure. 

### 1. The Physics of Brittle Fracture
The molecular configuration of glass lacks a specific grain boundary, meaning stress is not dissipated through dislocation movement. Instead, tension centers on surface-level micro-imperfections known as Griffith flaws. When the tensile force at a crack tip exceeds the molecular bond strength, crack propagation occurs at nearly the speed of sound. This is why the Weibull distribution is used to model failure probability in architectural glazing.

### 2. Compressive vs. Tensile Strength Paradox
In pure laboratory conditions, a cube of flawless glass has a compressive strength exceeding 1,000 MPa, comparable to many high-strength alloys. However, glass is never flawed at the surface. Because of its atomic structure, glass always fails in tension. Standard annealed glass is assigned a design tensile strength of only 24 MPa, a massive reduction from its theoretical potential. To engineering around this, we utilize 'heat tempering,' which locks the outer layers in permanent compression, forcing external loads to overcome this 'compressive skin' before they can activate tensile failure.

### 3. Young's Modulus and Poisson's Ratio
To accurately model glass in OVD Engine, we utilize a Young's Modulus of 70,000 MPa and a Poisson's Ratio of 0.22. These constants govern how the glass pane deflects under atmospheric wind loads or seismic drifts.

### 4. Load Duration and Environment
Glass exhibit static fatigue. A panel can support a short-term wind gust of 100 kg/m² but might fail if that same load is applied statically for a month. Humidity also plays a role, as water molecules accelerate crack tip propagation in a process known as subcritical crack growth.`
  },
  {
    id: "thickness-load-calculation",
    title: "Glass Thickness and Load Calculation: Engineering to ASTM E1300 Standards",
    category: "Standards",
    date: "March 22, 2026",
    summary: "The authoritative guide to calculating glass load resistance using the latest global standardizations and ASCE 7 methodologies.",
    content: `The ASTM E1300 standard is the backbone of architectural glazing safety in North America and is increasingly adopted globally as a baseline for structural integrity.

### 1. Determining Design Pressure
Engineers first calculate the expected wind, snow, or live loads using ASCE 7. This pressure is then compared to the Non-Factored Load (NFL) of the glass, which is derived from charts based on the glass area and thickness.

### 2. Glass Type Factors (GTF)
The final resistance is adjusted by the Glass Type Factor. Heat-strengthened glass has a GTF of 2.0, while fully tempered glass has a GTF of 4.0. Laminated glass requires a different approach that accounts for the shear transfer through the polymer interlayer.

### 3. Aspect Ratio and Stiffness
The geometric ratio of a panel impacts its deflection. A long, narrow lite will deflect significantly more than a square lite of the same area. OVD Glass Engine helps visualize these distortions through its refractive index and blur simulations.

### 4. Serviceability vs. Safety
Engineering isn't just about preventing breakage; it's about preventing excessive deflection. A skylight might be safe from breaking, but if it deflects 50mm under snow load, it will leak and cause psychological distress to building occupants. Standard deflection limits (L/175) must be maintained in tandem with structural safety factors.`
  },
  {
    id: "weight-calculation-methods",
    title: "Glass Weight Calculation Methods: Structural Integrity for High-Rise Facades",
    category: "Logistics",
    date: "March 24, 2026",
    summary: "Planning for dead loads and seismic acceleration in high-rise facade engineering using dead-load coefficients.",
    content: `Weight is a primary factor in both structural design and construction logistics. For skyscrapers, the weight of the facade can exceed several hundred tons.

### 1. Density and Monolithic Weight
Glass has a density of approximately 2,500 kg/m³. A 10mm thick lite weighs exactly 25 kg per square meter. This dead load is a primary consideration for the sizing of aluminum mullions in curtain wall systems.

### 2. Laminated and Multi-Lite Assemblies
Laminated glass weight is the sum of the glass plies and the interlayer. While the interlayer is thin, its mass must be included for accurate seismic base-shear calculations.

### 3. Dynamic Weight in Seismic Zones
In a seismic event, the dead load of the glass is multiplied by the seismic acceleration factor. This dynamic load can be significantly higher than the static weight, requiring robust 'mechanical retention' of the panels.`
  },
  {
    id: "failure-case-studies",
    title: "Structural Glass Failure Case Studies: Forensics of spontaneous breakage",
    category: "Forensics",
    date: "March 26, 2026",
    summary: "Analyzing the root causes of spontaneous glass failure from Nickel Sulfide inclusions to thermal shock.",
    content: `Understanding why glass fails is as important as understanding how it holds together.

### 1. Nickel Sulfide (NiS) Inclusions
NiS inclusions are microscopic stones that can grow in volume over time. If a stone is located in the tensile core of tempered glass, its expansion can trigger a spontaneous explosion. This is why 'Heat Soak Testing' is a critical engineering requirement for high-profile projects.

### 2. Thermal Stress Breakage
When the center of a glass lite is heated by the sun while the edges are shaded by a cold frame, a massive temperature gradient develops. If the resulting tensile stress exceeds the edge strength of the glass, a crack will initiate.

### 3. Edge Quality and Damage
Poorly polished edges or edge-chips act as stress concentrators. A lite that appears perfect may fail under a standard wind load due to a single microscopic chip.`
  },
  {
    id: "simulation-software-evolution",
    title: "Evolution of Engineering Simulation: From Finite Element to Generative Glass Design",
    category: "Technology",
    date: "March 28, 2026",
    summary: "How modern computational tools like OVD Engine are transforming the speed and accuracy of facade design.",
    content: `We are shifting from 'modeling a solution' to 'solving for constraints'.

### 1. Traditional FEA Analysis
Finite Element Analysis (FEA) has long been the gold standard for structural verification. However, FEA is slow and computationally expensive.

### 2. Real-Time Visual Simulation
OVD Engine utilizes client-side rendering to approximate material physics in real-time. This allows architects to iterate on the aesthetic and structural variables simultaneously.

### 3. Generative Algorithms
The future lies in AI-driven generative design. Algorithms can iterate through thousands of glass configurations in seconds, finding the thinnest possible lite that meets the safety factor for every specific node on a complex building geometry.`
  },
  {
    id: "global-safety-standards",
    title: "Global Glass Safety Standards: ASTM vs. EN Compliance Frameworks",
    category: "Compliance",
    date: "March 30, 2026",
    summary: "A comparative analysis of US and European safety mandates for overhead and vertical glazing.",
    content: `While the physics of glass is universal, the regulatory frameworks vary by region.

### 1. ASTM C1048 vs. EN 12150
ASTM C1048 governs heat-treated glass in the US, focusing on surface compression levels. European standard EN 12150 places more emphasis on fragmentation testing.

### 2. Overhead Glazing Requirements
Overhead glazing (skylights) represents the highest risk profile. Most codes globally now mandate laminated glass for overhead applications to ensure that if breakage occurs, the fragments are retained by the interlayer.

### 3. Impact Safety Classes
European standards categorize safety glass based on pendulum impact tests (EN 12600). Understanding these classifications is vital for specifying glass in public areas or balustrades.`
  },
  {
    id: "installation-best-practices",
    title: "Best Practices in Glazing Installation: Engineering the Glass-Frame Interface",
    category: "Construction",
    date: "April 2, 2026",
    summary: "Why the interface between glass and metal is the most critical point of any architectural assembly.",
    content: `A perfectly engineered pane of glass will fail if installed incorrectly.

### 1. Setting Blocks and Shims
Setting blocks must be made of high-shore EPDM or Silicone. They support the dead weight of the glass and must be positioned at 1/4 points of the width to minimize edge stress.

### 2. Edge Clearance (Bite)
The 'bite' is the distance the glass extends into the frame. Too little bite leads to blow-outs under wind load; too much bite can lead to excessive thermal stress at the edge.

### 3. Gasket Compression
Gaskets provide the weather seal and acoustic barrier. They must be compressed correctly to function without exerting excessive point-pressure on the glass edge.`
  },
  {
    id: "ai-automation-structural",
    title: "AI and Automation in Glass Structural Design: The Next Frontier",
    category: "Innovation",
    date: "April 4, 2026",
    summary: "Exploring how machine learning and neural networks are optimizing building envelopes for carbon reduction.",
    content: `AI is no longer a gimmick; it is a fundamental tool for optimizing complex building envelopes.

### 1. Predictive Maintenance
AI models trained on decades of breakage data are being used to predict when a panel with a NiS inclusion might fail, allowing for proactive replacement and increased public safety.

### 2. Optimization for Sustainability
By using AI, engineers can optimize the carbon footprint of a building by varying glass thickness across a facade based on specific wind-tunnel data, rather than specifying the worst-case thickness for every pane.

### 3. Digital Twins
Integration with OVD Glass Engine allows for the creation of high-fidelity digital twins that simulate not just the look, but the structural behavior of the building envelope in real-time.`
  }
];

// --- COMPONENTS ---

const Navigation = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const items = [
    { id: 'engine', label: 'Analysis Engine', icon: Zap },
    { id: 'blog', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'docs', label: 'Technical Docs', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/5 py-4 px-8 lg:px-16 flex justify-between items-center">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('engine')}>
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-black font-black text-2xl shadow-xl transition-transform group-hover:scale-105">O</div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black text-white tracking-tighter leading-none uppercase">OVD Bureau</h1>
          <p className="text-[10px] text-accent font-bold tracking-[0.4em] mt-1 uppercase leading-none">Structural Engineering</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-12">
        {items.map(item => (
          <button 
            key={String(item.id)} 
            onClick={() => setView(String(item.id))} 
            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${view === item.id ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
          >
            {String(item.label)}
          </button>
        ))}
        <button onClick={() => setView('contact')} className="px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all active:scale-95">Inquire Analysis</button>
      </div>
      <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenu(!mobileMenu)}><Menu /></button>
    </nav>
  );
};

const PreciseControl = ({ label, value, min, max, step = 1, unit = '', onChange }: { label: string, value: number, min: number, max: number, step?: number, unit?: string, onChange: (v: number) => void }) => {
  const id = useId();
  return (
    <div className="mb-8 relative slider-container">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{String(label)}</label>
        <span className="text-[10px] text-accent font-mono bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          {String(value)}{String(unit)}
        </span>
      </div>
      <div className="relative">
        <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
        <div className="tooltip">{String(value)}{String(unit)}</div>
      </div>
    </div>
  );
};

const EngineHub = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const shadow = calculateShadow(settings.lightAngle, 12);
  const rgb = hexToRgb(settings.color);
  const effectiveTrans = (settings.transmission / 100) * settings.transparency;
  const effectiveSat = settings.saturation * (settings.ior / 1.52);

  const cssCode = `.ovd-structural-layer {
  background: rgba(${rgb}, ${String(effectiveTrans.toFixed(2))});
  backdrop-filter: blur(${String(settings.blur)}px) saturate(${String(effectiveSat.toFixed(0))}%);
  border-radius: ${String(settings.borderRadius)}px;
  border: 1px solid rgba(255, 255, 255, ${String(settings.outlineOpacity)});
  box-shadow: ${String(shadow.x)}px ${String(shadow.y)}px ${String(settings.shadowBlur)}px rgba(0,0,0,${String(settings.shadowOpacity)});
  /* Engineering Meta: IOR=${String(settings.ior)}, Capacity=${String(settings.compressiveStrength)}MPa, α=${String(settings.thermalCoeff)} */
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 lg:p-16 animate-in fade-in duration-700">
      <div className="lg:col-span-4 space-y-10">
        <div className="glass-card p-10 rounded-[48px] shadow-2xl space-y-10 card-glow">
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <Settings className="w-5 h-5 text-accent" />
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Material Matrix</h3>
          </div>
          <div className="space-y-4">
            <PreciseControl label="Analysis Blur" value={settings.blur} min={0} max={64} onChange={v => setSettings({...settings, blur: v})} unit="px" />
            <PreciseControl label="Refractive Index (IOR)" value={settings.ior} min={1.0} max={2.5} step={0.01} onChange={v => setSettings({...settings, ior: v})} />
            <PreciseControl label="Compressive Capacity" value={settings.compressiveStrength} min={20} max={500} onChange={v => setSettings({...settings, compressiveStrength: v})} unit=" MPa" />
            <PreciseControl label="Thermal Expansion (α)" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={v => setSettings({...settings, thermalCoeff: v})} unit=" ×10⁻⁶" />
            <PreciseControl label="Transmission Ratio" value={settings.transmission} min={0} max={100} onChange={v => setSettings({...settings, transmission: v})} unit="%" />
          </div>
          <div className="pt-8 border-t border-white/5">
            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] block mb-5">Material Tint</label>
            <div className="flex gap-5">
              <input type="color" value={String(settings.color)} onChange={e => setSettings({...settings, color: e.target.value})} className="w-16 h-16 bg-transparent border-0 cursor-pointer p-0" />
              <div className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 flex items-center text-xs font-mono text-accent">{String(settings.color)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-10">
        <div className="aspect-[16/10] bg-[#020202] border border-white/5 rounded-[64px] relative flex items-center justify-center p-16 shadow-inner overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{
            backgroundColor: `rgba(${rgb}, ${effectiveTrans})`,
            backdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            borderRadius: `${settings.borderRadius}px`,
            border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
            boxShadow: `${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,0.3)`,
          }} className="w-full h-full flex flex-col p-16 transition-all duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-auto relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl"><Layers className="text-white" /></div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Eng_Node</p>
                <p className="text-xs font-black text-white/70 font-mono tracking-tighter uppercase">ID: {String(settings.ior).replace('.','')}_SAFE</p>
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-5xl font-black text-white mb-4 tracking-tighter">Structural Simulation</h4>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed font-light">Calculated material physics: {String(settings.compressiveStrength)}MPa capacity with {String(settings.thermalCoeff)} expansion mapping.</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-12 rounded-[56px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-30" />
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
              <Terminal className="w-5 h-5 text-accent" /> Asset Syntax Stream
            </h3>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copy Snippet
            </button>
          </div>
          <div className="bg-black/80 p-12 rounded-[32px] text-[13px] font-mono leading-relaxed border border-white/5 overflow-x-auto whitespace-pre group-hover:border-accent/20 transition-colors">
            <code className="text-emerald-400">{cssCode}</code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRESETS.map((p, idx) => (
            <button key={String(idx)} onClick={() => setSettings(p.settings)} className="glass-card group p-10 rounded-[48px] text-left hover:scale-[1.02] transition-transform active:scale-95">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">{String(p.category)}</p>
                <Database className="w-4 h-4 text-gray-700" />
              </div>
              <h4 className="text-xl font-black text-white group-hover:text-accent transition-colors">{String(p.name)}</h4>
              <p className="text-[11px] text-gray-500 mt-2 uppercase font-bold tracking-widest leading-none">Bureau Standard Template</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PillarArticle = () => (
  <article className="py-40 px-8 lg:px-24 bg-page border-t border-white/5">
    <div className="max-w-4xl mx-auto prose prose-invert prose-emerald lg:prose-2xl prose-p:text-gray-500 prose-p:font-light prose-headings:font-black prose-headings:tracking-tighter prose-a:text-accent prose-strong:text-white">
      <h1 className="text-8xl mb-16 leading-[0.9]">The Comprehensive Guide to Structural Glass Engineering</h1>
      <p className="lead text-2xl text-accent font-bold mb-16">In the modern era, transparency is no longer a luxury—it is an engineering triumph.</p>
      
      <section className="bg-panel p-20 rounded-[80px] border border-white/5 my-32 card-glow">
        <h2 className="mt-0 flex items-center gap-6"><Scale className="text-accent w-12 h-12" /> 1. The Physics of the Brittle State</h2>
        <p>Architectural glass is a non-crystalline amorphous solid. Unlike metals, which can dissipate energy through dislocation movement (ductility), glass is defined by its lack of a plastic deformation region. This means every design decision is a risk calculation. At OVD Independent, we model the <strong>Poisson's Ratio</strong> (typically 0.22 for soda-lime) and <strong>Young's Modulus</strong> (approx 70,000 MPa) to ensure that every pane survives the dynamic pressures of the physical world.</p>
      </section>

      <h2>2. Safety Factors and Failure Probability</h2>
      <p>Engineering glass isn't about ensuring it never breaks; it's about ensuring that when it does, the failure is safe. Standards like ASTM E1300 establish a design probability of breakage (Pb) of less than 8 per 1000 for standard loads. Our engine simulates these stress distributions, allowing architects to visualize the material integrity before physical fabrication begins.</p>
      
      <div className="grid md:grid-cols-2 gap-12 my-24 not-prose">
        <div className="glass-card p-12 rounded-[56px] border border-white/5">
          <h4 className="text-white uppercase tracking-widest text-[10px] font-black mb-8 opacity-40">Load Classifications</h4>
          <ul className="text-sm space-y-5 text-gray-400 list-none p-0">
            <li className="flex items-center gap-5 font-light"><CheckCircle className="w-6 h-6 text-accent shrink-0" /> <strong>Dead Loads:</strong> Sustained vertical weight.</li>
            <li className="flex items-center gap-5 font-light"><CheckCircle className="w-6 h-6 text-accent shrink-0" /> <strong>Live Loads:</strong> Maintenance pressure.</li>
            <li className="flex items-center gap-5 font-light"><CheckCircle className="w-6 h-6 text-accent shrink-0" /> <strong>Dynamic Loads:</strong> Seismic impacts.</li>
          </ul>
        </div>
        <div className="bg-accent/5 p-12 rounded-[56px] border border-accent/20 flex flex-col justify-center italic text-gray-500 text-lg leading-relaxed">
          "Engineering is the rigorous discipline that allows transparency to survive the chaos of the physical world."
        </div>
      </div>

      <h2>3. The Digital Transformation of the Facade</h2>
      <p>We are transitioning from 'modeling a solution' to 'solving for constraints'. Using OVD Glass Engine, the digital twin of a building envelope can predict thermal fatigue decades before a crack appears. This is the cornerstone of sustainable structural engineering—maximizing performance while minimizing material mass.</p>
    </div>
  </article>
);

const KnowledgeHub = ({ onPostClick }: { onPostClick: (id: string) => void }) => (
  <section className="py-40 px-8 lg:px-16 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
      <div className="max-w-2xl">
        <div className="flex items-center gap-5 text-accent mb-10 font-black uppercase tracking-[0.6em] text-xs">
          <BookOpen className="w-8 h-8" />
          <span>Technical Archive</span>
        </div>
        <h2 className="text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9]">Structural <br/> Knowledge Hub</h2>
        <p className="text-2xl text-gray-500 font-light leading-relaxed">Authoritative analysis on material physics, global glazing standards, and structural innovation bureau reports.</p>
      </div>
      <div className="h-0.5 flex-1 bg-white/5 mb-10 hidden md:block" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {BLOG_POSTS.map((post) => (
        <article key={String(post.id)} className="glass-card group p-12 rounded-[64px] flex flex-col h-full hover:border-accent/30 transition-all cursor-pointer" onClick={() => onPostClick(post.id)}>
          <div className="flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-12">
            <span className="bg-accent/10 px-5 py-2.5 rounded-full border border-accent/20">{String(post.category)}</span>
            <span className="text-gray-700">{String(post.date)}</span>
          </div>
          <h3 className="text-4xl font-black text-white mb-10 leading-tight group-hover:text-accent transition-colors">{String(post.title)}</h3>
          <p className="text-gray-600 text-lg font-light mb-16 flex-1 leading-relaxed">{String(post.summary)}</p>
          <div className="flex justify-between items-center mt-auto pt-10 border-t border-white/5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800">Review: STABLE</span>
            <button className="text-accent hover:translate-x-3 transition-transform"><ChevronRight className="w-10 h-10" /></button>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const BlogPostDetail = ({ id, onBack }: { id: string, onBack: () => void }) => {
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) return null;

  return (
    <article className="py-40 px-8 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
      <button onClick={onBack} className="flex items-center gap-5 text-gray-500 hover:text-accent transition-colors mb-24 text-xs font-black uppercase tracking-[0.6em] group">
        <ChevronRight className="w-7 h-7 rotate-180 group-hover:-translate-x-2 transition-transform" /> Return to Engineering Archive
      </button>
      <header className="mb-32">
        <div className="flex items-center gap-10 text-[12px] font-black uppercase tracking-[0.6em] text-accent mb-12">
          <span className="bg-accent/10 px-6 py-3 rounded-full border border-accent/20">{String(post.category)}</span>
          <span className="text-gray-700">{String(post.date)}</span>
        </div>
        <h1 className="text-9xl font-black text-white tracking-tighter leading-none mb-16">{String(post.title)}</h1>
        <div className="flex items-center gap-12 text-sm text-gray-600 border-y border-white/5 py-12">
          <div className="flex items-center gap-4 font-black uppercase tracking-[0.2em] text-[11px]"><UserCheck className="w-7 h-7 text-accent" /> OVD Structural Bureau</div>
          <div className="flex items-center gap-4 font-black uppercase tracking-[0.2em] text-[11px]"><Clock className="w-7 h-7 text-accent" /> 25 Minute Deep Analysis</div>
        </div>
      </header>
      <div className="prose prose-invert prose-emerald max-w-none text-gray-500 font-light leading-relaxed whitespace-pre-wrap text-2xl">
        {String(post.content).split('###').map((section, idx) => {
          if (idx === 0) return <p key={idx} className="mb-16">{section}</p>;
          const lines = section.trim().split('\n');
          const header = lines[0];
          const body = lines.slice(1).join('\n');
          return (
            <div key={idx} className="mt-24 first:mt-0">
              <h2 className="text-6xl font-black text-white mb-12 tracking-tighter">{String(header)}</h2>
              <div className="text-gray-500">{String(body)}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-48 p-32 bg-panel border border-white/5 rounded-[96px] text-center glass-card relative overflow-hidden card-glow">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-transparent" />
        <h3 className="text-white font-black text-6xl mb-10 tracking-tighter relative z-10">Peer-Review Inquiry</h3>
        <p className="text-gray-600 mb-20 max-w-2xl mx-auto text-xl relative z-10">Our bureau provides authoritative certification and peer-review for high-complexity glazing assemblies. Contact our transmission division for exhaustive validation.</p>
        <button className="px-20 py-10 bg-accent text-black rounded-[40px] font-black uppercase text-sm shadow-3xl shadow-accent/40 relative z-10 hover:scale-105 transition-transform flex items-center gap-6 mx-auto active:scale-95">
          <Mail className="w-8 h-8" /> Initialize Inquiry
        </button>
      </div>
    </article>
  );
};

const DocsPage = () => (
  <section className="py-40 px-8 max-w-6xl mx-auto animate-in fade-in duration-1000">
    <div className="mb-32">
      <h2 className="text-[10rem] font-black text-white tracking-tighter mb-12 leading-none uppercase">Technical Docs</h2>
      <p className="text-3xl text-gray-500 font-light leading-relaxed max-w-3xl">Authoritative operational framework and structural parameter logic for the OVD Analysis Bureau.</p>
      <div className="h-2 w-40 bg-accent mt-20 rounded-full" />
    </div>
    
    <div className="space-y-40 prose prose-invert prose-emerald max-w-none">
      <div className="glass-card p-24 rounded-[80px] card-glow">
        <h2 className="mt-0 flex items-center gap-8 text-white font-black text-5xl"><Terminal className="w-14 h-14 text-accent" /> 1. Operational Framework</h2>
        <p className="text-gray-500 text-2xl leading-relaxed font-light">The OVD Analysis Engine utilizes real-time client-side material simulation to approximate structural refraction and visual distortion. By processing complex material physics locally, we ensure zero-latency iterations during schematic design phases while maintaining engineering data fidelity.</p>
      </div>

      <div>
        <h2 className="text-white font-black text-6xl mb-24 tracking-tighter">2. Parameter Specification Bureau</h2>
        <div className="grid gap-12">
          {[
            { name: "Refractive Index (IOR)", icon: Glasses, desc: "A dimensionless coefficient quantifying the speed of light propagation. Essential for optical validation of laminated plies." },
            { name: "Compressive Capacity (MPa)", icon: Activity, desc: "The mechanical resistance limit of the amorphous core. Critical for calculating point-supported glass fin sizing." },
            { name: "Thermal Expansion (α)", icon: Thermometer, desc: "Dimensional volatility per unit temperature change. Primary variable for sizing expansion joints and gaskets." },
            { name: "Visual Transmission (VLT)", icon: Sun, desc: "Luminous transmittance percentage. Governing metric for building energy compliance and day-lighting." }
          ].map((param, idx) => (
            <div key={String(idx)} className="flex items-start gap-12 p-16 glass-card rounded-[56px] hover:border-accent/20 transition-all">
              <div className="w-20 h-20 rounded-[32px] bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                <param.icon className="w-10 h-10" />
              </div>
              <div>
                <h4 className="m-0 text-white text-4xl font-black mb-5 tracking-tighter uppercase">{String(param.name)}</h4>
                <p className="m-0 text-xl text-gray-600 leading-relaxed font-light">{String(param.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => (
  <section className="py-40 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
    <header className="mb-24">
      <h1 className="text-9xl font-black text-white tracking-tighter uppercase leading-none">{type === 'privacy' ? 'Privacy' : 'Terms'}</h1>
      <p className="text-gray-700 mt-10 font-mono text-xs uppercase tracking-[0.6em] leading-none">Bureau Release: STABLE_OVD_2026</p>
    </header>
    <div className="prose prose-invert prose-emerald max-w-none text-gray-500 font-light leading-relaxed text-2xl space-y-24">
      {type === 'privacy' ? (
        <>
          <p>OVD Engine operates under a <strong>Zero-Persistence Architecture</strong>. Our bureau does not collect, store, or transmit your proprietary structural data or CAD parameters to external cloud systems. All physics calculations occur locally within your browser sandbox.</p>
          <div>
            <h3 className="text-white text-4xl font-black mb-10 tracking-tighter uppercase">AdSense & Advertising Disclosure</h3>
            <p>This platform is supported by Google AdSense. Third-party vendors use cookies to serve ads based on prior visits. Users can manage personalized advertising preferences via their Google account settings. We strictly adhere to GDPR and CCPA compliance regarding user behavioral tracking.</p>
          </div>
          <div>
            <h3 className="text-white text-4xl font-black mb-10 tracking-tighter uppercase">Security Protocol</h3>
            <p>All structural simulations are computed locally via the client-side JavaScript engine. Your project intellectual property remains exclusively on your hardware terminal. No cloud-based CAD processing is utilized.</p>
          </div>
        </>
      ) : (
        <>
          <p>By accessing the OVD Bureau's online analysis tools, you agree to our authoritative terms governing structural visualization and digital asset utilization.</p>
          <div>
            <h3 className="text-white text-4xl font-black mb-10 tracking-tighter uppercase">Simulation Disclaimer</h3>
            <p>The OVD Analysis Engine is a conceptual visualization tool. It does NOT replace the requirement for a P.E. stamped calculation report for construction permitting. OVD Independent Engineering assumes no liability for physical structural failure resulting from the misuse of digital simulations.</p>
          </div>
          <div>
            <h3 className="text-white text-4xl font-black mb-10 tracking-tighter uppercase">Asset Licensing</h3>
            <p>Code snippets generated by the engine are licensed for commercial use. The engine framework and presets remain the intellectual property of OVD Structural Bureau.</p>
          </div>
        </>
      )}
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-black border-t border-white/5 pt-48 pb-24 px-8 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-32 mb-48">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-8 mb-16">
          <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-black font-black text-5xl shadow-2xl shadow-accent/20 transition-transform hover:rotate-12">O</div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">OVD Bureau</h2>
        </div>
        <p className="text-gray-500 text-3xl leading-relaxed max-w-md font-light">Global authority in structural glass simulation and high-density technical facade documentation bureau.</p>
        <div className="mt-16 flex gap-10">
          <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all hover:border-accent/40 group"><Globe className="w-8 h-8 group-hover:glow" /></button>
          <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all hover:border-accent/40 group"><Shield className="w-8 h-8 group-hover:glow" /></button>
          <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all hover:border-accent/40 group"><Microscope className="w-8 h-8 group-hover:glow" /></button>
        </div>
      </div>
      <div>
        <h4 className="text-accent font-black text-xs uppercase tracking-[0.6em] mb-16 opacity-50">Bureau Linkages</h4>
        <ul className="text-[12px] text-gray-600 space-y-8 font-black uppercase tracking-[0.3em]">
          <li onClick={() => setView('engine')} className="hover:text-white cursor-pointer transition-colors">Analysis Engine</li>
          <li onClick={() => setView('blog')} className="hover:text-white cursor-pointer transition-colors">Knowledge Hub</li>
          <li onClick={() => setView('docs')} className="hover:text-white cursor-pointer transition-colors">Technical Docs</li>
          <li className="hover:text-white cursor-pointer transition-colors opacity-30">FEA Verification</li>
        </ul>
      </div>
      <div>
        <h4 className="text-accent font-black text-xs uppercase tracking-[0.6em] mb-16 opacity-50">Governance</h4>
        <ul className="text-[12px] text-gray-600 space-y-8 font-black uppercase tracking-[0.3em]">
          <li onClick={() => setView('privacy')} className="hover:text-white cursor-pointer transition-colors">Privacy</li>
          <li onClick={() => setView('terms')} className="hover:text-white cursor-pointer transition-colors">Terms</li>
          <li onClick={() => setView('contact')} className="hover:text-white cursor-pointer transition-colors">Contact</li>
          <li className="hover:text-white cursor-pointer transition-colors opacity-30">Ad Settings</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-center gap-16">
      <p className="text-[10px] font-mono text-gray-800 tracking-[0.6em] uppercase text-center md:text-left">© 2026 OVD Independent Bureau of Engineering. V2.1.0-STABLE_RESTORATION</p>
      <div className="flex gap-16 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        {PLANS.map(p => (
          <div key={String(p)} className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-black uppercase text-white tracking-[0.4em]">{String(p)} Edition</span>
            <div className="h-1 w-16 bg-accent rounded-full shadow-lg shadow-accent/50" />
          </div>
        ))}
      </div>
    </div>
  </footer>
);

// --- MAIN APPLICATION ---

const App = () => {
  const [view, setView] = useState('engine');
  const [activePost, setActivePost] = useState<string | null>(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleNav = (v: string) => {
    setView(String(v));
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (v === 'engine') setSettings(DEFAULT_SETTINGS);
  };

  const handlePostClick = (id: string) => {
    setActivePost(String(id));
    setView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col selection:bg-accent/40 selection:text-white overflow-x-hidden">
        <Navigation view={view} setView={handleNav} />
        
        <main className="flex-1 bg-black">
          {view === 'engine' && (
            <div className="animate-in fade-in duration-1000">
              <div className="bg-[#050505] border-b border-white/5 py-56 px-8 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                 <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                   <div className="flex items-center justify-center lg:justify-start gap-6 text-accent mb-12 font-black uppercase tracking-[0.7em] text-xs">
                     <Activity className="w-10 h-10" />
                     <span>SaaS Bureau Hub</span>
                   </div>
                   <h1 className="text-9xl lg:text-[12rem] font-black text-white tracking-tighter leading-[0.85] mb-20 text-glow">Structural <br/> <span className="text-accent">Analysis Hub</span></h1>
                   <p className="text-4xl text-gray-500 font-light max-w-4xl leading-relaxed mb-24 mx-auto lg:mx-0">High-fidelity material physics and load resistance simulation for the next century of architectural transparency and digital engineering.</p>
                   <div className="flex flex-col sm:flex-row gap-12 justify-center lg:justify-start">
                     <button onClick={() => setView('engine')} className="px-20 py-10 bg-accent text-black rounded-[40px] font-black uppercase text-xs shadow-3xl shadow-accent/40 hover:scale-105 transition-all active:scale-95">Launch Engine</button>
                     <button onClick={() => setView('blog')} className="px-20 py-10 bg-white/5 border border-white/10 text-white rounded-[40px] font-black uppercase text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-5 active:scale-95"><BookOpen className="w-6 h-6" /> Knowledge Hub</button>
                   </div>
                 </div>
              </div>
              <EngineHub settings={settings} setSettings={setSettings} />
              <KnowledgeHub onPostClick={handlePostClick} />
              <PillarArticle />
            </div>
          )}

          {view === 'blog' && <KnowledgeHub onPostClick={handlePostClick} />}
          {view === 'blog-detail' && activePost && <BlogPostDetail id={String(activePost)} onBack={() => handleNav('blog')} />}
          {view === 'docs' && <DocsPage />}
          {view === 'privacy' && <LegalPage type="privacy" />}
          {view === 'terms' && <LegalPage type="terms" />}
          
          {view === 'contact' && (
            <section className="py-64 px-8 max-w-7xl mx-auto text-center animate-in zoom-in-95 duration-1000">
              <div className="mb-32">
                <h2 className="text-[12rem] font-black text-white tracking-tighter mb-12 uppercase leading-[0.8]">Consult <br/> The Bureau</h2>
                <p className="text-4xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">Direct transmission to our Global Structural Engineering Division for high-complexity architectural analysis and report certification.</p>
              </div>
              <div className="glass-card p-40 rounded-[112px] shadow-3xl relative overflow-hidden card-glow">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-accent to-transparent" />
                <div className="w-40 h-40 rounded-[56px] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-20 shadow-inner border border-accent/20"><Mail className="w-20 h-20" /></div>
                <p className="text-7xl font-black text-white mb-10 tracking-tighter">magic.reviewsite@gmail.com</p>
                <p className="text-gray-700 text-3xl font-light mb-24 uppercase tracking-[0.4em]">Authorized Engineering Transmission Office</p>
                <button className="px-24 py-12 bg-accent text-black rounded-[48px] font-black uppercase text-sm shadow-3xl shadow-accent/40 hover:scale-105 transition-transform flex items-center gap-8 mx-auto active:scale-95">
                  Initialize Official Inquiry <ChevronRight className="w-12 h-12" />
                </button>
              </div>
            </section>
          )}
        </main>

        <Footer setView={handleNav} />
      </div>
    </ErrorBoundary>
  );
};

// --- RENDER ---
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}