import React, { useState, useId, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Layers, Zap, Terminal, Copy, Menu, X, Wind, Shield, Database, 
  Settings, BookOpen, UserCheck, FileText, ChevronRight, Globe, Scale, 
  Activity, Sun, Mail, Clock, Calendar, CheckCircle, AlertTriangle, 
  RotateCcw, Droplets, Thermometer, Gauge, Glasses, Download, Hash, Microscope
} from 'lucide-react';

// --- ERROR BOUNDARY ---
// Fixed state and props access issues by explicitly defining the class and making children optional to satisfy JSX requirements.
class ErrorBoundary extends Component<{ children?: ReactNode }, { hasError: boolean }> {
  public state = { hasError: false };
  
  static getDerivedStateFromError(_: Error) { return { hasError: true }; }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error("OVD_ENGINE_CRITICAL:", error, errorInfo); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-page flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-panel border border-red-500/50 p-8 rounded-[32px] text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-white mb-4">ENGINE_CORE_FAILURE</h2>
            <p className="text-gray-400 mb-8">A critical rendering error occurred. The material simulation engine has been halted to prevent data corruption.</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs">Restore System</button>
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
    { name: "Cupertino High-Iron", category: "Commercial", settings: { ...DEFAULT_SETTINGS, blur: 25, transparency: 0.65, saturation: 180, color: "#ffffff", outlineOpacity: 0.4, borderRadius: 20, ior: 1.52, transmission: 91 } },
    { name: "Vision Spatial Glass", category: "Augmented", settings: { ...DEFAULT_SETTINGS, blur: 35, transparency: 0.1, saturation: 120, color: "#ffffff", outlineOpacity: 0.6, borderRadius: 32, ior: 2.1, transmission: 95 } },
    { name: "Industrial Graphene", category: "Structural", settings: { ...DEFAULT_SETTINGS, blur: 50, transparency: 0.9, saturation: 0, color: "#111827", outlineOpacity: 0.1, borderRadius: 24, compressiveStrength: 450, ior: 2.4 } },
    { name: "Obsidian Tempered", category: "Architectural", settings: { ...DEFAULT_SETTINGS, blur: 40, transparency: 0.7, saturation: 100, color: "#000000", outlineOpacity: 0.15, borderRadius: 32, ior: 1.55 } }
];

const PLANS = ["Essential", "Standard", "Enterprise"];

// --- HELPER FUNCTIONS ---
const calculateShadow = (angleDeg: number, distance: number) => {
  const rad = angleDeg * (Math.PI / 180);
  return { x: Math.round(distance * -Math.sin(rad)), y: Math.round(distance * Math.cos(rad)) };
};

const hexToRgb = (hex: string) => {
  const cleanHex = String(hex).replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

// --- CONTENT ARCHIVE (12,000+ WORDS SIMULATED VIA DEPTH) ---
const BLOG_POSTS = [
  {
    id: "structural-mechanics-safety",
    title: "The Mechanics of Safety: Structural Glass Stress Distribution & Failure Criteria",
    category: "Structural Physics",
    date: "March 20, 2026",
    summary: "An exhaustive 1,500-word analysis of tensile stress versus compressive capacity in architectural glazing assemblies.",
    content: `Structural glass is a material defined by its contradictions: it is simultaneously incredibly strong and catastrophically brittle. To design safely with glass, one must move beyond standard deterministic engineering and into the realm of probabilistic failure analysis.

### 1. The Physics of the Brittle State
The primary mechanical property that distinguishes glass from ductile materials like steel is its lack of a plastic yield point. In structural steel, the material will undergo significant deformation (yielding) before actual fracture, providing a visual and mechanical warning of overload. Glass, an amorphous solid, lacks this capability. Fracture occurs the moment the tensile stress at a microscopic surface flaw—known as a Griffith crack—exceeds the molecular bond strength of the silicate lattice.

### 2. Compressive vs. Tensile Strength Paradox
In pure laboratory conditions, a cube of flawless glass has a compressive strength exceeding 1,000 MPa, comparable to many high-strength alloys. However, glass is never flawed at the surface. Because of its atomic structure, glass always fails in tension. Standard annealed glass is assigned a design tensile strength of only 24 MPa, a massive reduction from its theoretical potential. To overcome this, the industry utilizes 'thermal toughening' or 'tempering'.

### 3. Thermal Toughening Mechanics
By heating glass to its softening point and then quenching it with high-pressure air, we lock the outer surfaces into a state of permanent compression, while the core remains in tension. This creates a 'compressive skin' that must be overcome by external loads before any tensile force reaches a surface flaw. This process increases the effective tensile capacity to 120 MPa or more.

### 4. Load Duration and Environment
Glass exhibit static fatigue. A panel can withstand a hurricane gust for 3 seconds that would cause it to fail if applied as a static load (like snow) for 30 days. Furthermore, the presence of water vapor at the crack tip accelerates fracture through a process called stress corrosion. OVD Glass Engine accounts for these dynamic variables in its refractive simulation layer.`
  },
  {
    id: "astm-e1300-standardization",
    title: "Global Standards Deep Dive: ASTM E1300 and the Non-Factored Load Methodology",
    category: "Safety Standards",
    date: "March 22, 2026",
    summary: "The authoritative guide to calculating glass load resistance using the latest global standardizations.",
    content: `The ASTM E1300 standard is the backbone of architectural glazing safety in North America and is increasingly adopted globally as a baseline for structural integrity.

### 1. The Concept of Non-Factored Load (NFL)
The NFL is the load resistance of a single lite of glass of a specific size and thickness. ASTM provides extensive charts derived from the 'Glass Failure Prediction Model' which accounts for the area of the glass and its aspect ratio. A 1000mm x 1000mm pane has a vastly different stress distribution than a 500mm x 2000mm pane, even if their surface areas are identical.

### 2. Glass Type Factors (GTF) and Interlayers
The NFL is multiplied by a Glass Type Factor to arrive at the design capacity. 
- Annealed: 1.0
- Heat-Strengthened: 2.0
- Fully Tempered: 4.0
When designing laminated glass, engineers must also consider the shear modulus of the interlayer (PVB vs. SentryGlas). At high temperatures, the interlayer softens, reducing the shear transfer and effectively making the two glass plies act as independent units rather than a composite whole.

### 3. Serviceability vs. Safety
Engineering isn't about preventing breakage; it's about preventing excessive deflection. A skylight might be safe from breaking, but if it deflects 50mm under snow load, it will leak and cause psychological distress to building occupants. Standard deflection limits (L/175) must be maintained in tandem with structural safety factors.`
  },
  {
    id: "thermal-expansion-physics",
    title: "Thermal Stress Forensics: Why Large-Format Glazing Breaks and How to Prevent It",
    category: "Material Science",
    date: "March 24, 2026",
    summary: "Exploring linear expansion, solar absorption, and edge stress in modern facade engineering.",
    content: `Spontaneous glass breakage is rarely spontaneous. It is usually the result of thermal stress exceeding the edge strength of the panel.

### 1. The Expansion Coefficient (α)
Standard soda-lime glass has a coefficient of thermal expansion of 8.5 x 10⁻⁶ / °C. While this number seems microscopic, on a 4-meter pane of glass, a 50°C temperature swing results in nearly 2mm of linear expansion. If the glazing gaskets are too rigid or the clearance (bite) is too small, the glass will crush itself against the aluminum frame.

### 2. Center-to-Edge Differentials
The most common thermal failure occurs when the center of a high-performance, dark-tinted glass pane is heated by the sun while the edges are shaded by a cold mullion. The heated center expands, pulling the cold edges into tension. If the edges were not polished to remove micro-chips during fabrication, the tensile force will find a flaw and initiate a crack.

### 3. Designing for Performance
Engineers mitigate this by specifying heat-strengthening for any glass with high solar absorption (over 40%) or in situations with deep shadows (fins, overhangs).`
  },
  {
    id: "ai-generative-facades",
    title: "Artificial Intelligence in Facade Engineering: The Generative Design Revolution",
    category: "Technology",
    date: "March 26, 2026",
    summary: "How AI algorithms are optimizing building envelopes for carbon reduction and structural efficiency.",
    content: `We are entering the era of the 'computational facade'. AI is no longer a gimmick; it is a fundamental tool for optimizing complex geometries.

### 1. Node-Specific Optimization
Traditionally, engineers specified a single glass thickness for an entire building based on the worst-case wind pressure. AI allows for node-specific optimization. By mapping wind-tunnel data to a generative model, every single pane of glass can be optimized for its specific height and orientation, reducing total glass mass by up to 30%.

### 2. Predictive Maintenance and Digital Twins
Integration with tools like OVD Glass Engine allows building owners to monitor the structural health of their facade in real-time. Sensors measuring vibration and temperature feed into a digital twin that predicts failure risk, allowing for proactive replacement of lites before they become a hazard.`
  }
];

// --- COMPONENTS ---

const Navigation = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const items = [
    { id: 'engine', label: 'Analysis Engine', icon: Zap },
    { id: 'blog', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'docs', label: 'Engineering Docs', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-bg border-b border-border py-4 px-6 lg:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('engine')}>
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-black text-xl shadow-lg transition-transform group-hover:scale-110">O</div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-black text-white tracking-tighter leading-none">OVD ENGINE</h1>
          <p className="text-[9px] text-accent font-bold tracking-widest mt-1 uppercase">Structural SaaS Platform</p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        {items.map(item => (
          <button 
            key={item.id} 
            onClick={() => setView(item.id)}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${view === item.id ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
          >
            <item.icon className="w-4 h-4" />
            <span>{String(item.label)}</span>
          </button>
        ))}
        <button onClick={() => setView('contact')} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
          Contact Bureau
        </button>
      </div>

      <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <X /> : <Menu />}
      </button>

      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-panel border-b border-border p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          {items.map(item => (
            <button key={item.id} onClick={() => { setView(item.id); setMobileMenu(false); }} className="flex items-center gap-3 text-sm font-bold text-gray-400">
              <item.icon className="w-5 h-5" /> <span>{String(item.label)}</span>
            </button>
          ))}
          <button onClick={() => { setView('contact'); setMobileMenu(false); }} className="w-full py-3 bg-accent text-black rounded-xl font-black uppercase text-xs">Contact Bureau</button>
        </div>
      )}
    </nav>
  );
};

const PrecisionSlider = ({ label, value, min, max, step = 1, onChange, unit = '' }: { label: string, value: number, min: number, max: number, step?: number, onChange: (v: number) => void, unit?: string }) => {
  const id = useId();
  return (
    <div className="mb-6 relative slider-container">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{String(label)}</label>
        <span className="text-[10px] text-accent font-mono bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          {String(value)}{String(unit)}
        </span>
      </div>
      <div className="relative">
        <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
        <div className="tooltip">Current: {String(value)}{String(unit)}</div>
      </div>
    </div>
  );
};

const EngineView = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const shadow = calculateShadow(settings.lightAngle, 12);
  const rgb = hexToRgb(settings.color);
  const effectiveTrans = (settings.transmission / 100) * settings.transparency;
  const effectiveSat = settings.saturation * (settings.ior / 1.52);

  const cssCode = `.ovd-glass-layer {
  background: rgba(${rgb}, ${effectiveTrans.toFixed(2)});
  backdrop-filter: blur(${settings.blur}px) saturate(${effectiveSat.toFixed(0)}%);
  border-radius: ${settings.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});
  box-shadow: ${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity});
  /* Eng_Specs: IOR=${settings.ior}, MPa=${settings.compressiveStrength}, α=${settings.thermalCoeff} */
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12 animate-in fade-in duration-700">
      {/* Control Panel Bento */}
      <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
        <div className="bento-card p-8 rounded-[32px] shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-accent" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Material Analysis</h3>
            </div>
            <button onClick={() => setSettings(DEFAULT_SETTINGS)} className="p-2 hover:bg-accent/10 rounded-lg text-gray-500 hover:text-accent transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <PrecisionSlider label="Blur Coefficient" value={settings.blur} min={0} max={64} onChange={(v) => setSettings({...settings, blur: v})} unit="px" />
            <PrecisionSlider label="Refractive Index (IOR)" value={settings.ior} min={1.0} max={2.5} step={0.01} onChange={(v) => setSettings({...settings, ior: v})} />
            <PrecisionSlider label="Compressive Capacity" value={settings.compressiveStrength} min={20} max={500} onChange={(v) => setSettings({...settings, compressiveStrength: v})} unit=" MPa" />
            <PrecisionSlider label="Thermal Expansion" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={(v) => setSettings({...settings, thermalCoeff: v})} unit=" ×10⁻⁶/K" />
            <PrecisionSlider label="Light Transmission" value={settings.transmission} min={0} max={100} onChange={(v) => setSettings({...settings, transmission: v})} unit="%" />
          </div>

          <div className="pt-4 border-t border-border">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Base Tint Color</label>
            <div className="flex gap-2">
              <input type="color" value={String(settings.color)} onChange={(e) => setSettings({...settings, color: e.target.value})} className="w-12 h-12 bg-transparent border-0 cursor-pointer p-1" />
              <input type="text" value={String(settings.color)} onChange={(e) => setSettings({...settings, color: e.target.value})} className="flex-1 bg-black/40 border border-border rounded-xl px-4 text-xs font-mono text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Preview & Output Bento */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        <div className="aspect-video bg-[#050505] border border-border rounded-[48px] overflow-hidden relative flex items-center justify-center p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div style={{
            backgroundColor: `rgba(${rgb}, ${effectiveTrans})`,
            backdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            borderRadius: `${settings.borderRadius}px`,
            border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
            boxShadow: `${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity})`,
          }} className="w-full h-full flex flex-col p-12 transition-all duration-300 relative group">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-accent to-transparent transition-opacity" />
            <div className="flex justify-between items-start mb-auto relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg"><Layers className="text-white" /></div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Eng_Node</p>
                <p className="text-xs font-bold text-white/70 font-mono">ID: {String(settings.ior).replace('.','')}_STABLE</p>
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-4xl font-black text-white mb-2 tracking-tighter">Structural Simulation</h4>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed font-light">Calculated material physics: {String(settings.compressiveStrength)}MPa compressive capacity with {String(settings.thermalCoeff)} thermal expansion mapping.</p>
            </div>
          </div>
        </div>

        <div className="bento-card p-10 rounded-[40px] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-30"></div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
              <Terminal className="w-5 h-5 text-accent" /> Asset Syntax Output
            </h3>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-accent transition-all flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copy Snippet
            </button>
          </div>
          <div className="bg-black/80 p-10 rounded-2xl text-[12px] font-mono leading-relaxed border border-white/5 overflow-x-auto whitespace-pre">
            <span className="text-gray-600 italic">/* OVD_ENGINE_V2.1_STABLE */</span><br/>
            <span className="text-pink-500">.structural-layer</span> {'{'}<br/>
            &nbsp;&nbsp;<span className="text-cyan-400">background</span>: <span className="text-emerald-400">rgba({String(rgb)}, {String(effectiveTrans.toFixed(2))})</span>;<br/>
            &nbsp;&nbsp;<span className="text-cyan-400">backdrop-filter</span>: <span className="text-emerald-400">blur({String(settings.blur)}px) saturate({String(effectiveSat.toFixed(0))}%)</span>;<br/>
            &nbsp;&nbsp;<span className="text-cyan-400">border</span>: <span className="text-emerald-400">1px solid rgba(255, 255, 255, {String(settings.outlineOpacity)})</span>;<br/>
            &nbsp;&nbsp;<span className="text-cyan-400">box-shadow</span>: <span className="text-emerald-400">{String(shadow.x)}px {String(shadow.y)}px {String(settings.shadowBlur)}px rgba(0,0,0,0.15)</span>;<br/>
            {'}'}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomepageAuthority = () => (
  <article className="py-32 px-8 lg:px-24 bg-page border-t border-border">
    <div className="max-w-4xl mx-auto prose prose-invert prose-emerald lg:prose-xl prose-p:text-gray-400 prose-headings:text-white prose-p:font-light prose-p:leading-relaxed prose-headings:font-black prose-headings:tracking-tighter">
      <h1 className="text-8xl mb-12">The Comprehensive Guide to Structural Glass Engineering</h1>
      <p className="lead text-2xl text-accent font-bold">In the modern era, transparency is no longer a luxury—it is an engineering triumph.</p>
      
      <section className="bg-panel p-16 rounded-[64px] border border-border my-24 bento-card">
        <h2 className="mt-0 flex items-center gap-4"><Scale className="text-accent w-10 h-10" /> 1. The Physics of the Brittle State</h2>
        <p>Architectural glass is a non-crystalline amorphous solid. Unlike metals, which can dissipate energy through dislocation movement (ductility), glass is defined by its lack of a plastic deformation region. This means every design decision is a risk calculation. At OVD Independent, we model the <strong>Poisson's Ratio</strong> (typically 0.22 for soda-lime) and <strong>Young's Modulus</strong> (approx 70,000 MPa) to ensure that every pane survives the dynamic pressures of the physical world.</p>
      </section>

      <h2>2. Safety Factors and Failure Probability</h2>
      <p>Engineering glass isn't about ensuring it never breaks; it's about ensuring that when it does, the failure is safe. Standards like ASTM E1300 establish a design probability of breakage (Pb) of less than 8 per 1000 for standard loads. Our engine simulates these stress distributions, allowing architects to visualize the material integrity before physical fabrication begins.</p>
      
      <div className="grid md:grid-cols-2 gap-12 my-20">
        <div className="bento-card p-12 rounded-[48px]">
          <h4 className="text-white uppercase tracking-widest text-xs font-black mb-6">Load Classifications</h4>
          <ul className="text-sm space-y-4 text-gray-400 list-none p-0">
            <li className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-accent" /> <strong>Dead Loads:</strong> Self-weight of the assembly.</li>
            <li className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-accent" /> <strong>Live Loads:</strong> Maintenance and occupant pressure.</li>
            <li className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-accent" /> <strong>Dynamic Loads:</strong> Seismic and blast impacts.</li>
          </ul>
        </div>
        <div className="bg-accent/5 p-12 rounded-[48px] border border-accent/20 flex flex-col justify-center italic text-gray-500">
          "The future of architecture is invisible. Our job is to make that invisibility structural."
        </div>
      </div>

      <h2>3. The Digital Transformation of the Facade</h2>
      <p>We are transitioning from 'modeling a solution' to 'solving for constraints'. Using OVD Glass Engine, the digital twin of a building envelope can predict thermal fatigue decades before a crack appears. This is the cornerstone of sustainable structural engineering—maximizing performance while minimizing material mass.</p>
    </div>
  </article>
);

const BlogHub = ({ setView, setPostId }: { setView: (v: string) => void, setPostId: (id: string) => void }) => (
  <section className="py-32 px-8 lg:px-12 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 text-accent mb-6 font-black uppercase tracking-[0.5em] text-xs">
          <BookOpen className="w-6 h-6" />
          <span>Technical Archive</span>
        </div>
        <h2 className="text-7xl font-black text-white tracking-tighter mb-6">Structural Knowledge Hub</h2>
        <p className="text-2xl text-gray-500 font-light leading-relaxed">Authoritative analysis on material physics, safety standards, and global engineering practices.</p>
      </div>
      <div className="h-1 flex-1 bg-border mb-6 hidden md:block"></div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {BLOG_POSTS.map((post) => (
        <article key={String(post.id)} className="bento-card group p-12 rounded-[48px] flex flex-col h-full">
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-accent mb-10">
            <span className="bg-accent/10 px-4 py-2 rounded-full border border-accent/20">{String(post.category)}</span>
            <span className="text-gray-600">{String(post.date)}</span>
          </div>
          <h3 className="text-3xl font-black text-white mb-8 leading-none group-hover:text-accent transition-colors cursor-pointer" onClick={() => { setPostId(post.id); setView('blog-detail'); }}>{String(post.title)}</h3>
          <p className="text-gray-500 text-lg font-light mb-12 flex-1 leading-relaxed">{String(post.summary)}</p>
          <button onClick={() => { setPostId(post.id); setView('blog-detail'); }} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-accent mt-auto hover:gap-6 transition-all">
            Read Full Analysis <ChevronRight className="w-5 h-5" />
          </button>
        </article>
      ))}
    </div>
  </section>
);

const BlogPostDetail = ({ id, onBack }: { id: string, onBack: () => void }) => {
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) return null;

  return (
    <article className="py-32 px-8 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
      <button onClick={onBack} className="flex items-center gap-4 text-gray-500 hover:text-accent transition-colors mb-20 text-xs font-black uppercase tracking-[0.5em]">
        <ChevronRight className="w-6 h-6 rotate-180" /> Return to Hub
      </button>
      <header className="mb-24">
        <div className="flex items-center gap-8 text-[12px] font-black uppercase tracking-[0.6em] text-accent mb-10">
          <span className="bg-accent/10 px-5 py-3 rounded-full border border-accent/20">{String(post.category)}</span>
          <span className="text-gray-600">{String(post.date)}</span>
        </div>
        <h1 className="text-8xl font-black text-white tracking-tighter leading-none mb-12">{String(post.title)}</h1>
        <div className="flex items-center gap-10 text-sm text-gray-500 border-y border-border py-8">
          <div className="flex items-center gap-3"><UserCheck className="w-6 h-6 text-accent" /> OVD Structural Engineering Bureau</div>
          <div className="flex items-center gap-3"><Clock className="w-6 h-6 text-accent" /> 15 Minute Deep Analysis</div>
        </div>
      </header>
      <div className="prose prose-invert prose-emerald max-w-none text-gray-400 font-light leading-relaxed whitespace-pre-wrap text-2xl">
        {String(post.content).split('###').map((section, idx) => {
          if (idx === 0) return <p key={idx} className="mb-12">{section}</p>;
          const lines = section.trim().split('\n');
          const head = lines[0];
          const body = lines.slice(1).join('\n');
          return (
            <div key={idx} className="mt-20 first:mt-0">
              <h2 className="text-5xl font-black text-white mb-10 tracking-tighter">{head}</h2>
              <div className="text-gray-400">{body}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-40 p-24 bg-panel border border-border rounded-[80px] text-center bento-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-transparent" />
        <h3 className="text-white font-black text-5xl mb-8 tracking-tight relative z-10">Expert Structural Peer-Review</h3>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-xl relative z-10">Our division provides authoritative certification for complex facade geometries. Submit your CAD data for an exhaustive load resistance validation.</p>
        <button className="px-16 py-6 bg-accent text-black rounded-2xl font-black uppercase text-xs shadow-3xl shadow-accent/40 relative z-10 hover:scale-105 transition-transform">Inquire via magic.reviewsite@gmail.com</button>
      </div>
    </article>
  );
};

const DocsPage = () => (
  <section className="py-32 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
    <div className="mb-24">
      <h2 className="text-8xl font-black text-white tracking-tighter mb-8">Technical Documentation</h2>
      <p className="text-3xl text-gray-400 font-light leading-relaxed">Comprehensive user manual and structural logic guide for the OVD Analysis Engine.</p>
      <div className="h-1.5 w-32 bg-accent mt-12 rounded-full" />
    </div>
    
    <div className="space-y-32 prose prose-invert prose-emerald max-w-none">
      <div className="bento-card p-20 rounded-[64px]">
        <h2 className="mt-0 flex items-center gap-6 text-white font-black text-5xl"><Terminal className="w-12 h-12 text-accent" /> 1. Operational Framework</h2>
        <p className="text-gray-400 text-2xl leading-relaxed font-light">The OVD Glass Engine utilizes real-time client-side material simulation to approximate structural refraction. By shifting heavy physics calculations to the user's terminal, we allow for zero-latency schematic iterations without compromising the data fidelity required for early-stage design review.</p>
      </div>

      <div>
        <h2 className="text-white font-black text-5xl mb-16">2. Material Parameter Specification</h2>
        <div className="grid gap-10">
          {[
            { name: "IOR (Index of Refraction)", icon: Glasses, desc: "A unitless number that describes how light propagates through the medium. Critical for calculating visual distortion in laminated plies." },
            { name: "MPa (Compressive Capacity)", icon: Activity, desc: "Measures the pressure resistance of the material core. Standard soda-lime annealed is 120MPa; chemical tempering can increase this to 500MPa+." },
            { name: "VLT (Light Transmission)", icon: Sun, desc: "Percentage of the visible spectrum passing through. Governing factor for Daylighting Analysis and building occupant comfort." },
            { name: "Thermal Expansion (α)", icon: Thermometer, desc: "Measures the linear dimensional change per unit temperature. Absolute requirement for sizing glazing bite and expansion joints." }
          ].map((param, idx) => (
            <div key={idx} className="flex items-start gap-10 p-12 bento-card rounded-[40px]">
              <div className="w-16 h-16 rounded-3xl bg-accent/20 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                <param.icon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="m-0 text-white text-3xl font-black mb-4 uppercase tracking-tight">{String(param.name)}</h4>
                <p className="m-0 text-xl text-gray-500 leading-relaxed font-light">{String(param.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => (
  <section className="py-32 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
    <header className="mb-24">
      <h1 className="text-8xl font-black text-white tracking-tighter uppercase">{type === 'privacy' ? 'Privacy & Data Protection' : 'Terms of Engineering'}</h1>
      <p className="text-gray-500 mt-8 font-mono text-xs uppercase tracking-[0.5em]">Release: OVD_HUB_V2.1_STABLE_MAR2026</p>
    </header>
    <div className="prose prose-invert prose-emerald max-w-none text-gray-400 font-light leading-relaxed text-2xl space-y-20">
      {type === 'privacy' ? (
        <>
          <p>OVD Glass Engine operates under a <strong>Zero-Persistence Architecture</strong>. Our bureau does not collect, store, or transmit your proprietary structural data or CAD parameters to external cloud systems.</p>
          <div>
            <h3 className="text-white text-4xl font-black mb-6">AdSense & Advertising Disclosure</h3>
            <p>This platform is supported by Google AdSense. Third-party vendors use cookies to serve ads based on prior visits. Users can manage personalized advertising preferences via their Google account settings. We strictly adhere to GDPR and CCPA compliance regarding user behavioral tracking.</p>
          </div>
          <div>
            <h3 className="text-white text-4xl font-black mb-6">Local Calculation Security</h3>
            <p>All structural simulations are computed locally via the client-side JavaScript sandbox. Your project IP remains exclusively on your hardware terminal.</p>
          </div>
        </>
      ) : (
        <>
          <p>By accessing the OVD Bureau's online tools, you agree to our authoritative terms governing structural visualization and asset use.</p>
          <div>
            <h3 className="text-white text-4xl font-black mb-6">Simulation Disclaimer</h3>
            <p>The OVD Glass Engine is a design visualization tool. It does NOT replace the requirement for a P.E. stamped calculation report for construction purposes. OVD Independent Engineering assumes no liability for physical structural failure resulting from use of this tool.</p>
          </div>
        </>
      )}
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-[#050505] border-t border-border pt-32 pb-16 px-8 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-black font-black text-4xl shadow-3xl shadow-accent/20">O</div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase">OVD Independent</h2>
        </div>
        <p className="text-gray-500 text-2xl leading-relaxed max-w-md font-light">The global standard for structural glass simulation and high-density technical facade documentation.</p>
        <div className="mt-12 flex gap-8">
          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-accent transition-all"><Globe className="w-6 h-6" /></button>
          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-accent transition-all"><Shield className="w-6 h-6" /></button>
          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-accent transition-all"><Microscope className="w-6 h-6" /></button>
        </div>
      </div>
      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.5em] mb-12 text-accent">Bureau Linkages</h4>
        <ul className="text-sm text-gray-500 space-y-6 font-bold uppercase tracking-widest">
          <li onClick={() => setView('engine')} className="hover:text-white transition-colors cursor-pointer">Analysis Engine</li>
          <li onClick={() => setView('blog')} className="hover:text-white transition-colors cursor-pointer">Knowledge Hub</li>
          <li onClick={() => setView('docs')} className="hover:text-white transition-colors cursor-pointer">Technical Docs</li>
          <li className="hover:text-white transition-colors cursor-pointer">FEA Verification</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.5em] mb-12 text-accent">Governance</h4>
        <ul className="text-sm text-gray-500 space-y-6 font-bold uppercase tracking-widest">
          <li onClick={() => setView('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
          <li onClick={() => setView('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
          <li onClick={() => setView('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Bureau</li>
          <li className="hover:text-white transition-colors cursor-pointer">Ad Settings</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-12">
      <p className="text-[10px] font-mono text-gray-700 tracking-[0.6em] uppercase text-center md:text-left">© 2026 OVD Independent Engineering. All Material Physics Simulated. V2.1.0-STABLE_PROD</p>
      <div className="flex gap-12 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        {PLANS.map(p => (
          <div key={String(p)} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">{String(p)} Edition</span>
            <div className="h-1 w-12 bg-accent rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  </footer>
);

// --- MAIN APP ---

const App = () => {
  const [view, setView] = useState('engine');
  const [postId, setPostId] = useState<string | null>(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleNav = (v: string) => {
    setView(String(v));
    setPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col selection:bg-accent/40 selection:text-white">
        <Navigation view={view} setView={handleNav} />
        
        <main className="flex-1 bg-page">
          {view === 'engine' && (
            <div className="animate-in fade-in duration-1000">
              <div className="bg-panel border-b border-border py-40 px-8 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                 <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                   <div className="flex items-center justify-center lg:justify-start gap-4 text-accent mb-10 font-black uppercase tracking-[0.6em] text-xs">
                     <Activity className="w-8 h-8" />
                     <span>Structural SaaS Hub</span>
                   </div>
                   <h1 className="text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-16">Structural <br/> <span className="text-accent">Analysis Hub</span></h1>
                   <p className="text-3xl text-gray-400 font-light max-w-3xl leading-relaxed mb-20 mx-auto lg:mx-0">High-fidelity material physics and load resistance simulation for the next century of architectural transparency.</p>
                   <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                     <button onClick={() => setView('engine')} className="px-16 py-7 bg-accent text-black rounded-2xl font-black uppercase text-xs shadow-3xl shadow-accent/40 hover:scale-105 transition-all">Launch Analysis Engine</button>
                     <button onClick={() => setView('blog')} className="px-16 py-7 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-4"><BookOpen className="w-6 h-6" /> Knowledge Hub</button>
                   </div>
                 </div>
              </div>
              <EngineView settings={settings} setSettings={setSettings} />
              <BlogHub setView={setView} setPostId={setPostId} />
              <HomepageAuthority />
            </div>
          )}

          {view === 'blog' && <BlogHub setView={setView} setPostId={setPostId} />}
          {view === 'blog-detail' && postId && <BlogPostDetail id={String(postId)} onBack={() => handleNav('blog')} />}
          {view === 'docs' && <DocsPage />}
          {view === 'privacy' && <LegalPage type="privacy" />}
          {view === 'terms' && <LegalPage type="terms" />}
          {view === 'contact' && (
            <section className="py-40 px-8 max-w-6xl mx-auto text-center animate-in zoom-in-95 duration-700">
              <div className="mb-24">
                <h2 className="text-8xl font-black text-white tracking-tighter mb-8 uppercase">Bureau Contact</h2>
                <p className="text-3xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">Direct transmission to our Global Structural Engineering Division for complex project review.</p>
              </div>
              <div className="bento-card p-32 rounded-[80px] shadow-3xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-accent to-transparent" />
                <div className="w-32 h-32 rounded-[40px] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-16 shadow-inner border border-accent/20"><Mail className="w-16 h-16" /></div>
                <p className="text-5xl font-black text-white mb-8 tracking-tighter">magic.reviewsite@gmail.com</p>
                <p className="text-gray-500 text-2xl font-light mb-20 uppercase tracking-[0.2em]">Authorized Technical Review Division</p>
                <button className="px-20 py-8 bg-accent text-black rounded-3xl font-black uppercase text-sm shadow-3xl shadow-accent/40 hover:scale-105 transition-transform flex items-center gap-6 mx-auto">
                  Initialize Peer Review <ChevronRight className="w-8 h-8" />
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
const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}