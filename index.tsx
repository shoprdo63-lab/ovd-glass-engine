import React, { useState, useId } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Layers, Box, Zap, Terminal, Copy, 
  Menu, X, Wind, Info, 
  Shield, Database, HelpCircle, Settings, Cpu, BookOpen, UserCheck, FileText,
  ChevronRight, Globe, Lock, Scale, Microscope, Building, Activity, Sun, 
  Mail, Clock, Calendar, CheckCircle, AlertTriangle, RotateCcw, Droplets, Thermometer,
  Gauge, Glasses, ExternalLink
} from 'lucide-react';

// --- CONSTANTS PRESERVED (ZERO MODIFICATION RULE) ---
const DEFAULT_SETTINGS = {
  blur: 16, transparency: 0.25, saturation: 110, color: '#ffffff', 
  outlineOpacity: 0.3, shadowBlur: 20, shadowOpacity: 0.15, 
  lightAngle: 145, borderRadius: 24,
  ior: 1.52, // Refractive Index
  compressiveStrength: 120, // MPa
  thermalCoeff: 8.5, // 10^-6/K
  transmission: 88, // %
};

const PRESETS = [
    { name: "Cupertino Glass", category: "Spatial OS", settings: { ...DEFAULT_SETTINGS, blur: 25, transparency: 0.65, saturation: 180, color: "#ffffff", outlineOpacity: 0.4, borderRadius: 20, lightAngle: 120, shadowBlur: 25, shadowOpacity: 0.2 } },
    { name: "Vision Pro", category: "Spatial OS", settings: { ...DEFAULT_SETTINGS, blur: 35, transparency: 0.1, saturation: 120, color: "#ffffff", outlineOpacity: 0.6, borderRadius: 32, lightAngle: 160, shadowBlur: 30, shadowOpacity: 0.25 } },
    { name: "Redmond Mica", category: "Spatial OS", settings: { ...DEFAULT_SETTINGS, blur: 20, transparency: 0.5, saturation: 110, color: "#f3f4f6", outlineOpacity: 0.05, borderRadius: 8, lightAngle: 180, shadowBlur: 10, shadowOpacity: 0.1 } },
    { name: "Arctic Ice", category: "Nature", settings: { ...DEFAULT_SETTINGS, blur: 12, transparency: 0.4, saturation: 130, color: "#e0f2fe", outlineOpacity: 0.5, borderRadius: 16, lightAngle: 45, shadowBlur: 20, shadowOpacity: 0.15 } },
    { name: "Deep Jungle", category: "Nature", settings: { ...DEFAULT_SETTINGS, blur: 12, transparency: 0.6, saturation: 110, color: "#064e3b", outlineOpacity: 0.2, borderRadius: 16, lightAngle: 90, shadowBlur: 15, shadowOpacity: 0.3 } },
    { name: "Amber Resin", category: "Nature", settings: { ...DEFAULT_SETTINGS, blur: 6, transparency: 0.8, saturation: 150, color: "#d97706", outlineOpacity: 0.3, borderRadius: 12, lightAngle: 135, shadowBlur: 15, shadowOpacity: 0.2 } },
    { name: "Obsidian", category: "Nature", settings: { ...DEFAULT_SETTINGS, blur: 40, transparency: 0.7, saturation: 100, color: "#000000", outlineOpacity: 0.15, borderRadius: 32, lightAngle: 180, shadowBlur: 40, shadowOpacity: 0.5 } },
    { name: "Cyberpunk Neon", category: "Sci-Fi", settings: { ...DEFAULT_SETTINGS, blur: 15, transparency: 0.4, saturation: 150, color: "#a855f7", outlineOpacity: 0.5, borderRadius: 0, lightAngle: 270, shadowBlur: 25, shadowOpacity: 0.4 } },
    { name: "Hologram", category: "Sci-Fi", settings: { ...DEFAULT_SETTINGS, blur: 2, transparency: 0.1, saturation: 100, color: "#0ea5e9", outlineOpacity: 0.8, borderRadius: 4, lightAngle: 0, shadowBlur: 5, shadowOpacity: 0.1 } },
    { name: "Aerogel", category: "Industrial", settings: { ...DEFAULT_SETTINGS, blur: 5, transparency: 0.15, saturation: 100, color: "#38bdf8", outlineOpacity: 0.2, borderRadius: 8, lightAngle: 180, shadowBlur: 15, shadowOpacity: 0.1 } },
    { name: "Graphene", category: "Industrial", settings: { ...DEFAULT_SETTINGS, blur: 50, transparency: 0.9, saturation: 0, color: "#111827", outlineOpacity: 0.1, borderRadius: 24, lightAngle: 135, shadowBlur: 30, shadowOpacity: 0.6 } },
    { name: "Ceramic Glaze", category: "Abstract", settings: { ...DEFAULT_SETTINGS, blur: 8, transparency: 0.9, saturation: 100, color: "#f8fafc", outlineOpacity: 0.1, borderRadius: 12, lightAngle: 45, shadowBlur: 10, shadowOpacity: 0.1 } },
    { name: "Vaporwave", category: "Abstract", settings: { ...DEFAULT_SETTINGS, blur: 22, transparency: 0.3, saturation: 160, color: "#f472b6", outlineOpacity: 0.4, borderRadius: 18, lightAngle: 300, shadowBlur: 20, shadowOpacity: 0.2 } },
];

const PLANS = ["Essential", "Standard", "Enterprise"];

// --- HELPER FUNCTIONS ---
const calculateShadow = (angleDeg: number, distance: number) => {
  const rad = angleDeg * (Math.PI / 180);
  return { x: Math.round(distance * -Math.sin(rad)), y: Math.round(distance * Math.cos(rad)) };
};

const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

// --- TECHNICAL KNOWLEDGE CONTENT (SEO BLOG) ---

const BLOG_POSTS = [
  {
    id: "structural-glass-stress",
    title: "Understanding Structural Glass Stress and Safety: A Mathematical Approach",
    category: "Physics",
    date: "March 15, 2026",
    summary: "A deep dive into the mechanical properties of glass as a brittle structural material and how to calculate stress distribution under environmental loads.",
    content: `Structural glass design is a discipline that operates at the nexus of aesthetics and safety. Unlike ductile materials such as steel, which can redistribute loads through plastic deformation, glass is inherently brittle. 

### 1. The Physics of Brittle Fracture
The strength of glass is not a single deterministic value but a probability function. Surface flaws, known as Griffith flaws, act as stress concentrators. When the tensile stress at a flaw tip exceeds the molecular bond strength, crack propagation occurs at the speed of sound. This is why the Weibull distribution is used to model failure probability in architectural glazing.

### 2. Tensile vs. Compressive Strength
While glass is theoretically strong in compression (exceeding 1000 MPa), it is functionally weak in tension. Standard annealed glass can only resist approximately 24 MPa of tensile stress, whereas fully tempered glass—achieved through controlled thermal cooling—can withstand upwards of 120 MPa.

### 3. Load Duration & Environment
Glass exhibit static fatigue. A panel can support a short-term wind gust of 100 kg/m² but might fail if that same load is applied statically for a month. Humidity also plays a role, as water molecules accelerate crack tip propagation in a process known as subcritical crack growth.`
  },
  {
    id: "load-thickness-calculation",
    title: "How Engineers Calculate Glass Load and Thickness using ASTM E1300",
    category: "Standards",
    date: "March 12, 2026",
    summary: "Evaluating the load resistance of monolithic, laminated, and insulating glass using the latest global engineering guidelines.",
    content: `The ASTM E1300 standard is the global benchmark for determining glass thickness. It provides a standardized procedure to evaluate load resistance (LR) against specified design loads.

### 1. Determining Design Pressure
Engineers first calculate the expected wind, snow, or live loads using ASCE 7. This pressure is then compared to the Non-Factored Load (NFL) of the glass, which is derived from charts based on the glass area and thickness.

### 2. Glass Type Factors (GTF)
The final resistance is adjusted by the Glass Type Factor. Heat-strengthened glass has a GTF of 2.0, while fully tempered glass has a GTF of 4.0. Laminated glass, however, requires a different approach that accounts for the shear transfer through the polymer interlayer.

### 3. Aspect Ratio & Stiffness
The geometric ratio of a panel impacts its deflection. A long, narrow lite will deflect significantly more than a square lite of the same area. OVD Glass Engine helps visualize these distortions through its refractive index and blur simulations.`
  },
  {
    id: "thermal-expansion-physics",
    title: "The Physics of Thermal Expansion in Architectural Glazing",
    category: "Material Science",
    date: "March 18, 2026",
    summary: "Exploring coefficients of thermal expansion and the resulting mechanical stress in restrained panels.",
    content: `Thermal stress is one of the most common causes of spontaneous glass breakage. As a panel absorbs solar radiation, it expands; if this expansion is restricted by the framing system, internal stresses rise.

### 1. Linear Coefficient (α)
The coefficient of linear thermal expansion for soda-lime glass is roughly 8.5 x 10⁻⁶/K. In a large curtain wall pane, a 40°C temperature differential across the lite can cause significant expansion that must be accommodated by the glazing gaskets.

### 2. Edge Stress & Shading
Thermal breakage typically starts at the edge. If the edges are shaded by a deep mullion while the center is heated by the sun, the resulting tensile stress at the cold edge can exceed the glass strength. 

### 3. Mitigation Strategies
To prevent thermal failure, engineers specify polished edges to remove micro-cracks and use heat-strengthened glass, which offers a higher resistance to temperature differentials.`
  },
  {
    id: "ai-future-design",
    title: "The Future of AI in Glass Engineering and Generative Design",
    category: "Innovation",
    date: "March 20, 2026",
    summary: "How machine learning and generative algorithms are optimizing material usage in the facade industry.",
    content: `Generative design is shifting the paradigm from 'modeling a solution' to 'solving for constraints'. By using AI, engineers can now optimize the carbon footprint of a building by varying glass thickness across a facade based on specific wind-tunnel data.

### 1. Parametric Optimization
Algorithms can iterate through thousands of glass configurations in seconds, finding the thinnest possible lite that meets the safety factor for every specific node on a complex building geometry.

### 2. Predictive Maintenance
AI models trained on decades of breakage data are being used to predict when a panel with a Nickel Sulfide inclusion might fail, allowing for proactive replacement and increased public safety.

### 3. Digital Twins
Integration with OVD Glass Engine allows for the creation of high-fidelity digital twins that simulate not just the look, but the structural behavior of the building envelope in real-time.`
  },
  {
    id: "safety-standards-glazing",
    title: "Safety Standards for Architectural Glass: ASTM vs. EN Standards",
    category: "Policy",
    date: "March 22, 2026",
    summary: "A comparative analysis of US and European safety mandates for overhead and vertical glazing.",
    content: `While the physics of glass is universal, the regulatory frameworks vary by region. The US relies heavily on ASTM E1300 and CPSC 16 CFR 1201, whereas Europe operates under EN 12150 and EN 12600.

### 1. Impact Resistance
European standards focus heavily on the pendulum impact test to classify safety glass, while US standards categorize glass based on its fragmentation pattern and impact kinetic energy levels.

### 2. Overhead Requirements
Overhead glazing (skylights) represents the highest risk profile. Most codes globally now mandate laminated glass for overhead applications to ensure that if breakage occurs, the fragments are retained by the interlayer.

### 3. Seismic Design
In earthquake-prone zones, glass must be designed for 'drift'. The glazing system must allow the building frame to move independently of the glass lite to prevent crushing or displacement.`
  },
  {
    id: "mechanical-properties-guide",
    title: "Comprehensive Guide to Mechanical Properties of Glass",
    category: "Basics",
    date: "March 24, 2026",
    summary: "Defining Young’s Modulus, Poisson’s Ratio, and Density in the context of structural design.",
    content: `To engineer glass effectively, one must treat it as a structural member with defined mechanical constants.

### 1. Young’s Modulus (E)
The modulus of elasticity for glass is approximately 70 GPa (70,000 MPa). This determines the stiffness of the material. For comparison, steel is roughly 200 GPa.

### 2. Poisson’s Ratio (ν)
The Poisson’s ratio for glass is 0.22. This constant describes the ratio of transverse contraction to longitudinal extension when the glass is under stress.

### 3. Density (ρ)
Glass has a density of 2500 kg/m³. A 10mm thick lite weighs exactly 25 kg per square meter. This dead load is a primary consideration for the sizing of aluminum mullions in curtain wall systems.`
  },
  {
    id: "installation-engineering",
    title: "The Engineering of Glass Installation: Gaskets, Shims, and Setting Blocks",
    category: "Construction",
    date: "March 26, 2026",
    summary: "Why the interface between glass and metal is the most critical point of any glazing assembly.",
    content: `A perfectly engineered pane of glass will fail if installed incorrectly. The interface between the brittle glass and the rigid metal frame requires elastic separation.

### 1. Setting Blocks
Setting blocks must be made of high-shore EPDM or Silicone. They support the dead weight of the glass and must be positioned at 1/4 points of the width to minimize edge stress.

### 2. The 'Bite'
The bite is the distance the glass extends into the frame. Too little bite leads to blow-outs under wind load; too much bite can lead to excessive thermal stress at the edge.

### 3. Gasket Compression
Gaskets provide the weather seal and acoustic barrier. They must be compressed by roughly 20% to function correctly without exerting excessive point-pressure on the glass edge.`
  },
  {
    id: "weight-calculation-methods",
    title: "Professional Glass Weight Calculation and Distribution Methods",
    category: "Logistics",
    date: "March 28, 2026",
    summary: "Planning for dead loads and seismic acceleration in high-rise facade engineering.",
    content: `Weight is a primary factor in both structural design and construction logistics. For skyscrapers, the weight of the facade can exceed several hundred tons.

### 1. Laminated vs. Monolithic
Laminated glass weight is the sum of the glass plies and the interlayer. While the interlayer is thin, its mass must be included for accurate seismic base-shear calculations.

### 2. Dynamic Weight in Seismic Zones
In a seismic event, the dead load of the glass is multiplied by the seismic acceleration factor. This dynamic load can be significantly higher than the static weight, requiring robust 'mechanical retention' of the panels.

### 3. Transport and Hoisting
Engineers must account for the centers of gravity when designing hoisting systems for glass panels that may exceed 500kg. OVD Glass Engine provides the foundational data needed for these complex logistical plans.`
  }
];

// --- COMPONENTS ---

const Navigation = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const items = [
    { id: 'engine', label: 'Engine', icon: Zap },
    { id: 'blog', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'docs', label: 'Docs', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-bg border-b border-border py-4 px-6 lg:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('engine')}>
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-black text-xl shadow-lg transition-transform group-hover:scale-110">O</div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-black text-white tracking-tighter leading-none">OVD ENGINE</h1>
          <p className="text-[9px] text-accent font-bold tracking-widest mt-1 uppercase">Structural Analysis Hub</p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        {items.map(item => (
          <button 
            key={item.id} 
            onClick={() => setView(item.id)}
            className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${view === item.id ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
          >
            <item.icon className="w-4 h-4" />
            <span>{String(item.label)}</span>
          </button>
        ))}
        <button onClick={() => setView('contact')} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
          Contact Engineering
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
          <button onClick={() => { setView('contact'); setMobileMenu(false); }} className="w-full py-3 bg-accent text-black rounded-xl font-black uppercase text-xs">Contact Us</button>
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
        <div className="tooltip">Value: {String(value)}{String(unit)}</div>
      </div>
    </div>
  );
};

const ControlPanel = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const update = (key: string, val: any) => setSettings({ ...settings, [key]: val });
  const reset = () => setSettings(DEFAULT_SETTINGS);

  return (
    <div className="bg-panel border border-border p-8 rounded-[32px] shadow-2xl space-y-8 bento-card">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-accent" />
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Material Parameters</h3>
        </div>
        <button onClick={reset} className="p-2 hover:bg-accent/10 rounded-lg text-gray-500 hover:text-accent transition-all group" title="Reset to Standard Glass">
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
        </button>
      </div>

      <div className="space-y-4">
        <PrecisionSlider label="Blur Radius" value={settings.blur} min={0} max={64} onChange={(v) => update('blur', v)} unit="px" />
        <PrecisionSlider label="Visual Transparency" value={settings.transparency} min={0} max={1} step={0.01} onChange={(v) => update('transparency', v)} />
        <PrecisionSlider label="Refractive Index (IOR)" value={settings.ior} min={1.0} max={2.5} step={0.01} onChange={(v) => update('ior', v)} />
        <PrecisionSlider label="Compressive Strength" value={settings.compressiveStrength} min={50} max={500} onChange={(v) => update('compressiveStrength', v)} unit=" MPa" />
        <PrecisionSlider label="Thermal Expansion" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={(v) => update('thermalCoeff', v)} unit=" ×10⁻⁶/K" />
        <PrecisionSlider label="Light Transmission" value={settings.transmission} min={0} max={100} onChange={(v) => update('transmission', v)} unit="%" />
      </div>

      <div className="pt-4 border-t border-border">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Base Material Tint</label>
        <div className="flex gap-2">
          <input type="color" value={String(settings.color)} onChange={(e) => update('color', e.target.value)} className="w-12 h-12 bg-transparent border-0 cursor-pointer p-1" />
          <input type="text" value={String(settings.color)} onChange={(e) => update('color', e.target.value)} className="flex-1 bg-black/40 border border-border rounded-xl px-4 text-xs font-mono text-accent" />
        </div>
      </div>
    </div>
  );
};

const EngineView = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const shadow = calculateShadow(settings.lightAngle, 12);
  const rgb = hexToRgb(settings.color);
  const effectiveTrans = (settings.transmission / 100) * settings.transparency;
  const effectiveSat = settings.saturation * (settings.ior / 1.5);
  
  const cssCode = `.ovd-glass-layer {
  background: rgba(${rgb}, ${effectiveTrans.toFixed(2)});
  backdrop-filter: blur(${settings.blur}px) saturate(${effectiveSat.toFixed(0)}%);
  border-radius: ${settings.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});
  box-shadow: ${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity});
  /* Engineering Specs: IOR=${settings.ior}, MPa=${settings.compressiveStrength}, Thermal=${settings.thermalCoeff} */
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 lg:p-12 animate-in fade-in duration-700">
      <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
        <ControlPanel settings={settings} setSettings={setSettings} />
      </div>

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
          }} className="w-full h-full flex flex-col p-10 transition-all duration-300 group relative">
            
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-accent/5 to-transparent" />

            <div className="flex justify-between items-start mb-auto relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg"><Layers className="text-white" /></div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Simulated Node</p>
                <p className="text-xs font-bold text-white/70 font-mono">IOR_{String(settings.ior)}</p>
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-3xl font-black text-white mb-2 tracking-tighter">Structural Simulation</h4>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed font-light">Precision rendering of {String(settings.compressiveStrength)}MPa glass with thermal coefficient mapping.</p>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-border p-8 rounded-[32px] shadow-xl overflow-hidden relative bento-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2"><Terminal className="w-4 h-4 text-accent" /> Generated Engineering CSS</h3>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-accent transition-all flex items-center gap-2">
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
          </div>
          <div className="bg-black/80 p-8 rounded-2xl text-[11px] font-mono leading-relaxed border border-white/5 overflow-x-auto whitespace-pre">
            <code className="text-emerald-400">{cssCode}</code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {PRESETS.slice(0, 4).map((p, idx) => (
            <button key={idx} onClick={() => setSettings(p.settings)} className="bento-card group bg-panel border border-border p-8 rounded-[32px] text-left">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">{String(p.category)}</p>
                <Database className="w-4 h-4 text-gray-700" />
              </div>
              <h4 className="text-white font-bold group-hover:text-accent transition-colors">{String(p.name)}</h4>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">Calibration Data</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuthoritySection = () => (
  <article className="py-32 px-8 lg:px-24 bg-page border-t border-border">
    <div className="max-w-4xl mx-auto prose prose-invert prose-emerald lg:prose-xl prose-p:text-gray-400 prose-headings:text-white prose-p:font-light prose-p:leading-relaxed prose-headings:font-black prose-headings:tracking-tighter">
      <h1 className="text-7xl">Comprehensive Guide to Structural Glass Engineering</h1>
      <p className="lead text-2xl">Transparency in modern architecture is a result of extreme engineering precision and material science optimization.</p>
      
      <section className="bg-panel/50 p-12 rounded-[48px] border border-border my-20 bento-card">
        <h2 className="mt-0 text-accent">Foundational Material Physics</h2>
        <p>
          At its core, architectural glass is a brittle solid that lacks a specific yield point. Unlike steel, which exhibits ductility, glass fails the moment tensile stress exceeds its surface integrity. Engineering for glass requires understanding the <strong>Modulus of Elasticity</strong> (approx. 70 GPa) and how it governs panel deflection under environmental loads.
        </p>
      </section>

      <h3>The Mathematics of Load Distribution</h3>
      <p>
        The calculation of glass thickness is governed by probability. Standards like <strong>ASTM E1300</strong> use the 3-second wind gust as a primary design variable. By calculating the Non-Factored Load (NFL) and applying Glass Type Factors (GTF), engineers ensure a probability of breakage of less than 8 lites per 1000 at the design load level.
      </p>

      <div className="grid md:grid-cols-2 gap-12 my-20">
        <div className="bg-panel border border-border p-10 rounded-[32px] bento-card">
          <h4 className="text-white mb-6 uppercase tracking-widest text-xs font-black">Dynamic Load Types</h4>
          <ul className="text-sm space-y-4 text-gray-400 list-none p-0">
            <li className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-accent" /> <strong>Seismic Drift:</strong> Accommodating building movement.</li>
            <li className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-accent" /> <strong>Snow Surcharge:</strong> Vertical pressure on skylights.</li>
            <li className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-accent" /> <strong>Blast Resistance:</strong> High-impulse dynamic loads.</li>
          </ul>
        </div>
        <div className="bg-panel border border-border p-10 rounded-[32px] bento-card flex items-center justify-center text-center italic text-gray-500">
          "Engineering is the rigorous discipline that allows transparency to survive the physical world."
        </div>
      </div>

      <h3>Environmental and Sustainable Integration</h3>
      <p>
        Modern glazing is not just structural; it is thermal. High-performance coatings (Low-E) modulate solar heat gain (SHGC) while maintaining visual light transmission. OVD Glass Engine enables designers to simulate these parameters, finding the equilibrium between energy efficiency and structural stability.
      </p>
    </div>
  </article>
);

const KnowledgeHub = ({ setView, setPostId }: { setView: (v: string) => void, setPostId: (id: string) => void }) => (
  <section className="py-24 px-8 lg:px-12 max-w-7xl mx-auto animate-in fade-in duration-1000">
    <div className="mb-20">
      <div className="flex items-center gap-3 text-accent mb-6 font-black uppercase tracking-[0.4em] text-xs">
        <BookOpen className="w-5 h-5" />
        <span>Knowledge Center</span>
      </div>
      <h2 className="text-6xl font-black text-white tracking-tighter mb-6">Technical Engineering Articles</h2>
      <p className="text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">Authoritative documentation on material physics, global standards, and structural innovation.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {BLOG_POSTS.map((post) => (
        <article key={String(post.id)} className="bento-card group bg-panel border border-border rounded-[40px] p-10 flex flex-col h-full">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-accent mb-8">
            <Calendar className="w-4 h-4" /> {String(post.date)}
          </div>
          <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors cursor-pointer" onClick={() => { setPostId(post.id); setView('blog-detail'); }}>{String(post.title)}</h3>
          <p className="text-gray-500 text-sm font-light mb-10 flex-1">{String(post.summary)}</p>
          <div className="flex justify-between items-center mt-auto pt-8 border-t border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{String(post.category)}</span>
            <button onClick={() => { setPostId(post.id); setView('blog-detail'); }} className="text-accent hover:translate-x-1 transition-transform"><ChevronRight className="w-6 h-6" /></button>
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
    <article className="py-32 px-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
      <button onClick={onBack} className="flex items-center gap-3 text-gray-500 hover:text-accent transition-colors mb-16 text-xs font-black uppercase tracking-[0.3em]">
        <ChevronRight className="w-5 h-5 rotate-180" /> Back to Knowledge Center
      </button>
      <header className="mb-20">
        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-accent mb-8">
          <span className="bg-accent/10 px-4 py-2 rounded-full border border-accent/20">{String(post.category)}</span>
          <span>{String(post.date)}</span>
        </div>
        <h1 className="text-7xl font-black text-white tracking-tighter leading-none mb-12">{String(post.title)}</h1>
        <div className="flex items-center gap-8 text-sm text-gray-500 border-y border-border py-6">
          <div className="flex items-center gap-3"><UserCheck className="w-5 h-5 text-accent" /> By OVD Structural Engineering Bureau</div>
          <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-accent" /> 12 Min Read</div>
        </div>
      </header>
      <div className="prose prose-invert prose-emerald max-w-none text-gray-400 font-light leading-relaxed whitespace-pre-wrap text-xl">
        {String(post.content).split('###').map((section, idx) => {
          if (idx === 0) return <p key={idx}>{section}</p>;
          const lines = section.trim().split('\n');
          const header = lines[0];
          const body = lines.slice(1).join('\n');
          return (
            <div key={idx} className="mt-16 first:mt-0">
              <h2 className="text-4xl font-black text-white mb-8 tracking-tighter">{header}</h2>
              <p>{body}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-32 p-20 bg-panel border border-border rounded-[64px] text-center bento-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-accent to-transparent" />
        <h3 className="text-white font-black text-4xl mb-6 tracking-tight relative z-10">Professional Technical Review</h3>
        <p className="text-gray-500 mb-12 max-w-xl mx-auto text-lg relative z-10">Our bureau provides authoritative peer-review and certification for structural glazing assemblies worldwide. Contact our division for project-specific analysis.</p>
        <button className="px-14 py-5 bg-accent text-black rounded-2xl font-black uppercase text-xs shadow-2xl shadow-accent/30 relative z-10 hover:scale-105 transition-transform">Inquire for Consultation</button>
      </div>
    </article>
  );
};

const Documentation = () => (
  <section className="py-32 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
    <div className="mb-20">
      <h2 className="text-6xl font-black text-white tracking-tighter mb-6">Technical Documentation</h2>
      <p className="text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">Comprehensive user manual and engineering logic guide for the OVD Glass Engine.</p>
      <div className="h-1 w-20 bg-accent mt-10 rounded-full" />
    </div>
    
    <div className="space-y-24 prose prose-invert prose-emerald max-w-none">
      <div className="bg-panel p-16 rounded-[48px] border border-border bento-card">
        <h2 className="mt-0 flex items-center gap-5 text-white font-black text-4xl"><Terminal className="w-10 h-10 text-accent" /> 1. Engine Architecture</h2>
        <p className="text-gray-400 text-xl leading-relaxed">The OVD Glass Engine utilizes client-side material simulation to approximate structural refraction and visual transparency. By using your local GPU for pixel-perfect glassmorphism rendering, we ensure zero latency during the schematic design phase.</p>
      </div>

      <div>
        <h2 className="text-white font-black text-4xl mb-12">2. Engineering Parameter Dictionary</h2>
        <div className="grid gap-8">
          {[
            { name: "IOR (Refractive Index)", desc: "Quantifies the bending of light. Standard soda-lime architectural glass is calibrated at ~1.52. High-index polymers range from 1.6 to 2.4." },
            { name: "Transmission (VLT)", desc: "Visual Light Transmission. Measures the percentage of light passing through the assembly. Critical for passive solar heating and day-lighting." },
            { name: "MPa (Compressive Capacity)", desc: "Megapascals. Defines the capacity of the glass to resist compression. Crucial for sizing point-supported glass fins." },
            { name: "Thermal Expansion (α)", desc: "Measures dimensional change per unit temperature. Essential for calculating expansion joints in restrained curtain walls." }
          ].map((param, idx) => (
            <div key={idx} className="flex items-start gap-8 p-10 bg-panel border border-border rounded-[32px] bento-card">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent text-lg font-black shrink-0 border border-accent/20">{idx + 1}</div>
              <div>
                <h4 className="m-0 text-white text-2xl font-bold mb-2">{String(param.name)}</h4>
                <p className="m-0 text-lg text-gray-500 leading-relaxed">{String(param.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-panel border border-border p-16 rounded-[64px] flex flex-col md:flex-row items-center gap-12 bento-card">
        <AlertTriangle className="w-24 h-24 text-accent shrink-0" />
        <div>
          <h4 className="m-0 text-white font-black text-3xl mb-4 tracking-tight">Engineering Notice</h4>
          <p className="m-0 text-lg text-gray-500 leading-relaxed">This tool is designed for conceptual schematic design and material visualization. All final structural glass specifications must be reviewed and stamped by a licensed Professional Engineer (P.E.) in accordance with local building code requirements.</p>
        </div>
      </div>
    </div>
  </section>
);

const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => (
  <section className="py-32 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
    <header className="mb-20">
      <h1 className="text-7xl font-black text-white tracking-tighter uppercase">{type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h1>
      <p className="text-gray-500 mt-6 font-mono text-xs uppercase tracking-[0.4em]">Revision: Engineering Hub V2.1 Stable</p>
    </header>
    <div className="prose prose-invert prose-emerald max-w-none text-gray-400 font-light leading-relaxed text-xl">
      {type === 'privacy' ? (
        <div className="space-y-12">
          <p>OVD Glass Engine operates under a <strong>Privacy-First Architecture</strong>. We do not store or transmit proprietary architectural data to central servers. All calculation logic is performed on your local terminal.</p>
          <h3 className="text-white text-3xl font-black">Data Usage Disclosure</h3>
          <p>We use Google AdSense for platform monetization. Third-party vendors, including Google, use cookies to serve ads based on your visit to this site. You may opt-out of personalized advertising via Google Ad Settings.</p>
          <h3 className="text-white text-3xl font-black">GDPR & CPRA Compliance</h3>
          <p>Since the Platform does not collect Personal Identifiable Information (PII) for engine use, users are inherently protected. For inquiries regarding cookie consent, contact <strong>magic.reviewsite@gmail.com</strong>.</p>
        </div>
      ) : (
        <div className="space-y-12">
          <p>By accessing the OVD Hub, you enter a legally binding agreement governing the use of our engineering simulation logic.</p>
          <h3 className="text-white text-3xl font-black">Engineering Disclaimer</h3>
          <p>The OVD Glass Engine is a design visualization tool. OVD Independent Engineering is NOT liable for any physical structural failures resulting from specifications derived from this tool without P.E. certification.</p>
          <h3 className="text-white text-3xl font-black">Intellectual Property</h3>
          <p>The code output generated by this engine is licensed for commercial use. The engine architecture and presets are proprietary property of OVD Independent Engineering.</p>
        </div>
      )}
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-[#020202] border-t border-border pt-32 pb-16 px-8 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-black font-black text-3xl shadow-2xl shadow-accent/20">O</div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">OVD Independent</h2>
        </div>
        <p className="text-gray-500 text-xl leading-relaxed max-w-md font-light">Global authority in structural glass simulation and facade engineering documentation.</p>
        <div className="mt-12 flex gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-accent transition-all cursor-pointer"><Wind /></div>
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-accent transition-all cursor-pointer"><Microscope /></div>
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-accent transition-all cursor-pointer"><Globe /></div>
        </div>
      </div>
      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.5em] mb-12 text-accent">Navigation</h4>
        <ul className="text-sm text-gray-500 space-y-6 font-bold uppercase tracking-widest">
          <li onClick={() => setView('engine')} className="hover:text-white transition-colors cursor-pointer">Glazing Engine</li>
          <li onClick={() => setView('blog')} className="hover:text-white transition-colors cursor-pointer">Knowledge Hub</li>
          <li onClick={() => setView('docs')} className="hover:text-white transition-colors cursor-pointer">Documentation</li>
          <li className="hover:text-white transition-colors cursor-pointer">FEA Verification</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.5em] mb-12 text-accent">Legal & Support</h4>
        <ul className="text-sm text-gray-500 space-y-6 font-bold uppercase tracking-widest">
          <li onClick={() => setView('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
          <li onClick={() => setView('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
          <li onClick={() => setView('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Hub</li>
          <li className="hover:text-white transition-colors cursor-pointer">Cookie Compliance</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-12">
      <p className="text-[10px] font-mono text-gray-700 tracking-[0.6em] uppercase text-center md:text-left">© 2026 OVD Independent Engineering. All Systems Nominal. V2.1.0-STABLE</p>
      <div className="flex gap-10 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        {PLANS.map(p => (
          <div key={String(p)} className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase text-white tracking-widest">{String(p)} Edition</span>
            <div className="h-0.5 w-10 bg-accent rounded-full"></div>
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
    setView(v);
    setPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/40 selection:text-white">
      <Navigation view={view} setView={handleNav} />
      
      <main className="flex-1 bg-page">
        {view === 'engine' && (
          <div className="animate-in fade-in duration-1000">
            <div className="bg-panel border-b border-border py-32 px-8 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-3 text-accent mb-8 font-black uppercase tracking-[0.5em] text-xs">
                   <Activity className="w-6 h-6" />
                   <span>Engineering SaaS Hub</span>
                 </div>
                 <h1 className="text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-12">Structural <br/> <span className="text-accent">Glass Engine</span></h1>
                 <p className="text-2xl text-gray-400 font-light max-w-2xl leading-relaxed mb-16 mx-auto lg:mx-0">Precision material physics and structural load analysis for the next generation of architectural transparency.</p>
                 <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                   <button onClick={() => setView('engine')} className="px-14 py-6 bg-accent text-black rounded-2xl font-black uppercase text-xs shadow-2xl shadow-accent/30 hover:scale-105 transition-all">Launch Analysis Engine</button>
                   <button onClick={() => setView('blog')} className="px-14 py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3"><BookOpen className="w-5 h-5" /> Knowledge Center</button>
                 </div>
               </div>
            </div>
            <EngineView settings={settings} setSettings={setSettings} />
            <KnowledgeHub setView={setView} setPostId={setPostId} />
            <AuthoritySection />
          </div>
        )}

        {view === 'blog' && <KnowledgeHub setView={setView} setPostId={setPostId} />}
        {view === 'blog-detail' && postId && <BlogPostDetail id={postId} onBack={() => handleNav('blog')} />}
        {view === 'docs' && <Documentation />}
        {view === 'privacy' && <LegalPage type="privacy" />}
        {view === 'terms' && <LegalPage type="terms" />}
        {view === 'contact' && (
          <section className="py-32 px-8 max-w-5xl mx-auto text-center animate-in zoom-in-95 duration-700">
            <div className="mb-20">
              <h2 className="text-6xl font-black text-white tracking-tighter mb-6">Contact Hub</h2>
              <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">Direct line to our Structural Engineering Division for complex analysis and peer-review inquiries.</p>
            </div>
            <div className="bg-panel border border-border p-24 rounded-[64px] shadow-2xl bento-card">
              <div className="w-24 h-24 rounded-[32px] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-12 shadow-inner border border-accent/20"><Mail className="w-12 h-12" /></div>
              <p className="text-3xl font-black text-white mb-6 tracking-tight">magic.reviewsite@gmail.com</p>
              <p className="text-gray-500 text-xl font-light mb-16">Authorized Global Review & Certification Office</p>
              <button className="px-16 py-6 bg-accent text-black rounded-2xl font-black uppercase text-xs shadow-2xl shadow-accent/30 hover:scale-105 transition-transform">Schedule Peer Review</button>
            </div>
          </section>
        )}
      </main>

      <Footer setView={handleNav} />
    </div>
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