import React, { useState, useId, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Layers, Zap, Terminal, Copy, Menu, X, Wind, Shield, Database, 
  Settings, BookOpen, UserCheck, FileText, ChevronRight, Globe, Scale, 
  Activity, Sun, Mail, Clock, Calendar, CheckCircle, AlertTriangle, 
  RotateCcw, Thermometer, Gauge, Glasses, Microscope, Briefcase, ExternalLink, Download, ArrowUpRight
} from 'lucide-react';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends Component<{ children?: ReactNode }, { hasError: boolean }> {
  public state: { hasError: boolean } = { hasError: false };
  static getDerivedStateFromError(_: Error) { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("CRITICAL_OVD_SYS_ERR:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-md w-full glass-card p-12 rounded-[40px] text-center border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tighter leading-none">System Malfunction</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">The material simulation core encountered a critical rendering exception. The environment has been locked to maintain data integrity and prevent runtime degradation.</p>
            <button onClick={() => window.location.reload()} className="px-10 py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-red-600 transition-all">Re-Initialize Bureau Environment</button>
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
  thermalCoeff: 8.5, transmission: 88, specularity: 0.8,
};

const PRESETS = [
    { name: "Pro Cupertino High-Iron", category: "Commercial", settings: { ...DEFAULT_SETTINGS, blur: 25, transparency: 0.65, saturation: 180, color: "#ffffff", outlineOpacity: 0.4, borderRadius: 20, ior: 1.52, transmission: 91, specularity: 0.95 } },
    { name: "SentryGlas Spatial 2.0", category: "Advanced", settings: { ...DEFAULT_SETTINGS, blur: 35, transparency: 0.1, saturation: 120, color: "#ffffff", outlineOpacity: 0.6, borderRadius: 32, ior: 2.1, transmission: 95, specularity: 1.0 } },
    { name: "Industrial Carbon Toughened", category: "Structural", settings: { ...DEFAULT_SETTINGS, blur: 50, transparency: 0.9, saturation: 0, color: "#09090b", outlineOpacity: 0.1, borderRadius: 24, compressiveStrength: 450, ior: 2.4, specularity: 0.2 } },
    { name: "Arctic Laminated Frost", category: "Architectural", settings: { ...DEFAULT_SETTINGS, blur: 12, transparency: 0.4, saturation: 110, color: "#e0f2fe", outlineOpacity: 0.5, borderRadius: 16, ior: 1.58, specularity: 0.6 } }
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

// --- TECHNICAL AUTHORITY REPOSITORY ---
const BLOG_POSTS = [
  {
    id: "structural-principles",
    title: "Structural Glass Stress and Safety Principles: Theoretical Mechanics and Risk Distribution",
    category: "Structural Physics",
    date: "March 15, 2026",
    summary: "An exhaustive technical analysis of architectural glass as a brittle structural material, focusing on tensile stress gradients and Weibull probabilistic failure modeling.",
    content: `Structural glass design represents the ultimate intersection of material physics and architectural ambition. Unlike ductile materials such as structural steel or aluminum, which undergo significant plastic deformation before ultimate failure, architectural glass is a fundamentally brittle solid. It possesses an amorphous atomic structure that lacks a defined crystalline grain.

### 1. The Mechanics of Brittle Solitary Systems
The distinguishing characteristic of glass in construction is its lack of a visible yield point. In a steel beam, excessive loading manifests as permanent deformation—a critical warning sign for structural integrity. In glass, failure is instantaneous and catastrophic. This behavior is governed by Linear Elastic Fracture Mechanics (LEFM). The functional strength of a glass panel is not a constant; it is a statistical probability determined by the density and orientation of microscopic surface flaws, commonly referred to as Griffith flaws.

### 2. The Compressive vs. Tensile Strength Paradox
One of the most profound paradoxes in material science is the strength of glass. In pure laboratory compression, glass can withstand pressures exceeding 1,000 MPa, potentially rivaling high-performance structural alloys. However, because its amorphous structure cannot dissipate energy through grain-boundary dislocation, it is exceptionally weak in tension. Standard annealed glass is assigned a design tensile strength of approximately 24 MPa. Modern engineering overcomes this by utilizing 'thermal toughening,' a process that locks the outer surfaces in permanent compression. This 'compressive skin' must be physically overcome by external loads before any tensile force can reach a surface flaw.

### 3. Young's Modulus and Poisson's Ratio in Digital Simulation
Calculations within the OVD Glass Engine are grounded in established material constants: a Young's Modulus (E) of 70,000 MPa and a Poisson's Ratio (ν) of 0.22. These values govern the elastic deflection of a pane under atmospheric pressures. Understanding these constants is vital for predicting 'membrane stresses'—the secondary stresses that occur when a thin panel undergoes large-scale deflection relative to its thickness.

### 4. Probabilistic Safety Factors: The Weibull Distribution
Engineering for transparency is a study in probability. Instead of deterministic safety factors used for ductile materials, glass engineers utilize the Weibull distribution to model the probability of breakage (Pb). Standard building codes, such as ASTM E1300, typically target a Pb of less than 8 panels per 1,000 under peak environmental loads. This stochastic approach requires high-fidelity digital simulation to ensure public safety in monumental architectural spaces.`
  },
  {
    id: "thickness-load-engineering",
    title: "Glass Thickness and Load Calculation Engineering: Advanced Compliance with ASTM E1300",
    category: "Code Compliance",
    date: "March 20, 2026",
    summary: "Determining design pressure, non-factored loads, and geometric stiffness for complex architectural glazing according to global safety standards.",
    content: `The ASTM E1300 standard is the definitive structural framework for the sizing of architectural glass in North America and is the baseline for high-performance facade engineering globally.

### 1. Determining Design Pressure (DP) through Environmental Loads
The engineering process begins with the establishment of environmental loads—wind pressure (positive and negative), snow surcharge, and potential live-load impacts. Using ASCE 7 methodologies, a peak Design Pressure is established. This represents the force the glazing system must withstand without failure or excessive deflection.

### 2. Non-Factored Load (NFL) and Glass Type Factors (GTF)
The structural resistance of a pane is derived from its Non-Factored Load (the resistance of standard annealed glass of a specific size) multiplied by a Glass Type Factor. Annealed glass has a GTF of 1.0. Heat-strengthened glass increases this to 2.0, providing enhanced thermal resistance. Fully tempered glass achieves a GTF of 4.0, representing the highest safety classification. Laminated glass, however, introduces 'composite action' that is highly dependent on the shear modulus of the polymer interlayer (PVB or Ionoplast).

### 3. Aspect Ratio and Geometric Influence on Stress
The width-to-height ratio (Aspect Ratio) of a panel significantly alters its stress distribution. Square panels tend to distribute tensile stress more evenly toward the corner supports, whereas long, narrow panes develop massive tensile gradients at the center of the long unsupported edges. The OVD Bureau's engine visualizes these geometric stresses through its real-time optical refraction simulation, allowing designers to see the physical cost of aggressive aspect ratios.

### 4. Serviceability Limits: Deflection vs. Safety
In structural engineering, safety is only half of the requirement. Serviceability governs the functional performance of the facade. Excessive deflection (L/175), even if structurally safe, can lead to air/water infiltration, sealant failure, or 'oil-canning' distortions. Ensuring the pane remains aesthetically and functionally rigid under load is a primary objective of the OVD simulation workflow.`
  },
  {
    id: "weight-calculation-integrity",
    title: "Glass Weight Calculation Methods: Structural Integrity and Dead-Load Modeling for Facades",
    category: "Logistics",
    date: "March 22, 2026",
    summary: "Managing dead loads in curtain wall systems and seismic drift through accurate density and composite assembly weight modeling.",
    content: `Accurate dead-load calculation is the cornerstone of facade anchor sizing and building foundation design. For skyscrapers, the cumulative weight of the glass envelope can reach thousands of metric tons.

### 1. Density and Monolithic Mass Calculations
Architectural glass has a remarkably consistent density of approximately 2,500 kg/m³. For monolithic glass, the calculation is a direct linear function: (Nominal Thickness in mm) x 2.5 = Weight in kg per square meter. A standard 10mm lite weighs exactly 25 kg/m². Understanding this constant is vital for the preliminary sizing of aluminum mullion sections.

### 2. Composite Weight of Insulating Glass Units (IGUs)
An Insulating Glass Unit is a complex assembly. Its weight is the sum of the glass plies, the spacer bar, the desiccant, and the secondary structural sealant (typically Silicone or Polysulfide). Laminated interlayers, although thin, possess a specific mass (approx. 1 kg/m² for a 1.52mm interlayer) that must be accounted for in seismic base-shear calculations.

### 3. Seismic Drift and Dynamic Mass Acceleration
In high-seismic regions, the dead load of the glass is multiplied by a seismic acceleration factor (F=ma). The resulting lateral force can be significantly higher than the static weight, requiring robust mechanical retention of the glass within the frame. Reducing glass thickness through the use of high-strength laminates can significantly lower the seismic demand on the building's primary structure.`
  },
  {
    id: "spontaneous-breakage-forensics",
    title: "Structural Glass Failure Case Studies: Forensics of Spontaneous and Mechanical Breakage",
    category: "Material Forensics",
    date: "March 24, 2026",
    summary: "Analyzing root causes of glass failure, from Nickel Sulfide (NiS) inclusions to thermal shock and edge damage in high-performance assemblies.",
    content: `In the world of structural glass, breakage is rarely spontaneous. It is almost always the result of a specific material, design, or installation deficiency.

### 1. Nickel Sulfide (NiS) Inclusions and Phase Transformation
Microscopic stones of Nickel Sulfide can accidentally form in the center of the glass during the float process. Over time, these stones undergo a phase transformation, expanding in volume by up to 4%. If an NiS stone is located in the central tensile core of a tempered lite, its expansion can trigger a sudden explosion of the entire panel. Forensic engineers typically look for a 'butterfly' fracture pattern at the origin of the break.

### 2. Thermal Stress and Solar Absorption Hazards
Dark-tinted or high-reflectivity glass absorbs significant solar energy. When the center of the lite heats up while the edges remain cool in the shade of the mullion, a temperature differential (ΔT) occurs. If this ΔT exceeds the thermal resistance limit of the glass edge, a thermal crack initiates. OVD's Thermal Coeff slider allows engineers to simulate this dimensional volatility.

### 3. Edge Quality and Stress Concentrators
The ultimate strength of a glass panel is dictated by the quality of its edges. A microscopic chip or 'shell' created during handling acts as a stress concentrator. Under a standard wind load, this defect initiates a fracture that would not have occurred in a clean-cut lite. Digital simulation of Edge Specularity highlights the visual and structural cost of poor edge finishing.`
  },
  {
    id: "simulation-tech-evolution",
    title: "The Evolution of Engineering Simulation: From Finite Element (FEA) to Generative Glass Design",
    category: "Digital Technology",
    date: "March 26, 2026",
    summary: "How computational breakthroughs and cloud physics engines are transforming the speed and accuracy of architectural glass design.",
    content: `Facade engineering is currently undergoing a paradigm shift from 'modeling a solution' to 'solving for constraints'.

### 1. Traditional FEA vs. Real-Time Physical Simulation
Finite Element Analysis (FEA) has long been the gold standard for structural verification. However, traditional FEA is computationally expensive and slow. OVD Engine provides an 'approximation layer' that allows designers to visualize material behavior (refraction, deflection, transmission) in milliseconds, enabling rapid schematic iteration before committing to expensive cloud-computed reports.

### 2. Real-Time Physics in the Browser Terminal
Modern web technologies (WebGL and WASM) allow us to simulate complex material properties like Index of Refraction (IOR) and Visual Light Transmission (VLT) directly on the client side. This accessibility democratizes high-end engineering data, allowing architects and stakeholders to understand material trade-offs in the moment of design.

### 3. Generative Optimization and Neural Networks
The future of the OVD Bureau lies in generative optimization. Neural networks can iterate through thousands of glass configurations to find the thinnest, lightest lite that meets a building's safety factor. By varying glass thickness across a facade based on node-specific wind data, we can significantly reduce the embodied carbon of architectural envelopes.`
  },
  {
    id: "global-standards-compliance",
    title: "Global Glass Safety Standards: A Comparative Framework of ASTM, EN, and AS Compliance",
    category: "Global Compliance",
    date: "March 28, 2026",
    summary: "Comparing ASTM C1048, EN 12150, and AS 1288 frameworks for safety glazing and high-impact structural resistance.",
    content: `While the physics of silicate glass is universal, the regulatory landscape governing its use varies significantly across global jurisdictions.

### 1. North American ASTM C1048 and E1300
The US framework focuses heavily on surface compression levels. Heat-strengthened glass must maintain a surface compression between 3,500 and 7,500 psi. Fully tempered glass must exceed 10,000 psi. This ensures specific breakage patterns—tempered glass breaks into small, relatively harmless dice, whereas annealed glass breaks into dangerous shards.

### 2. European EN 12150 and EN 14449
European standards place a higher priority on 'fragmentation testing' and the long-term shear transfer performance of laminated interlayers. For overhead glazing (skylights), European codes almost universally mandate laminated glass to ensure that if a panel fails, it remains safely suspended within the frame.

### 3. Australian AS 1288 and Global Harmony
The Australian standard is recognized for its comprehensive charts governing human impact safety in doors and balustrades. As glazing becomes a global commodity, the OVD Bureau helps engineering firms harmonize these varying frameworks to ensure consistent performance across international project portfolios.`
  },
  {
    id: "installation-engineering-bite",
    title: "Best Practices in Architectural Glass Installation: Engineering the Structural Interface",
    category: "Construction Mechanics",
    date: "April 01, 2026",
    summary: "Ensuring long-term structural health through proper setting blocks, shims, and calibrated gasket compression.",
    content: `The structural integrity of a glass pane is only as good as the frame that supports it. The interface between glass and metal is the most critical node in any facade assembly.

### 1. Setting Blocks and Dead Weight Support
Setting blocks must be positioned at 1/4 points of the lite width to minimize edge stress and prevent 'sagging' of the frame. Improper setting block placement is a primary cause of corner-cracking in heavy triple-glazed units.

### 2. Edge Clearance (Bite) and Thermal Expansion
The 'bite'—the depth the glass extends into the frame—must be precisely engineered. Too little bite leads to 'blow-outs' under peak wind suction. Too much bite increases the shaded area of the edge, drastically increasing the risk of thermal stress breakage.

### 3. Structural Sealant Compatibility (SSG)
In Structural Silicone Glazing (SSG), the sealant acts as the primary anchor for the glass. The chemical compatibility between the sealant and the glass interlayer is paramount. Many low-cost sealants can cause 'edge delamination' of laminated glass, leading to a loss of transparency and structural strength over time. Always specify neutral-cure silicones for these sensitive applications.`
  },
  {
    id: "ai-future-glazing",
    title: "AI and Automation in Glass Structural Design: Optimization and The Carbon-Neutral Facade",
    category: "Innovation",
    date: "April 05, 2026",
    summary: "Leveraging neural networks for predictive maintenance and carbon-optimized facade geometries in modern architecture.",
    content: `Artificial Intelligence is transforming from an aesthetic generator into a structural optimization core for the next generation of building envelopes.

### 1. Predictive Maintenance in High-Rises
By training AI models on historical breakage and NiS inclusion data, we can predict which panels in a skyscraper's facade are most likely to fail before a fracture occurs. This allows for proactive maintenance, significantly reducing the liability and cost for building owners.

### 2. Carbon-Optimized Geometries and Mass Reduction
Glass production is exceptionally energy-intensive. By using AI-driven optimization within the OVD Engine, we can reduce the total glass mass of a building by up to 15%. This is achieved by varying the glass thickness across the facade based on specific, node-level wind-tunnel data, rather than specifying a 'worst-case' thickness for every pane.

### 3. The Digital Twin and Real-Time Monitoring
The integration of OVD Engine with a building's digital twin allows for real-time monitoring of facade stress during extreme weather events. Sensors embedded in the mullions feed data back to the engine, providing an early warning system for material fatigue or gasket failure.`
  }
];

// --- UI COMPONENTS ---

const Navigation = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const items = [
    { id: 'engine', label: 'Analysis Engine', icon: Zap },
    { id: 'blog', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'docs', label: 'Technical Docs', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/5 py-4 px-8 lg:px-16 flex justify-between items-center transition-all duration-500 backdrop-blur-xl">
      <div className="flex items-center gap-5 cursor-pointer group" onClick={() => setView('engine')}>
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group-hover:scale-105">O</div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-black text-white tracking-tighter leading-none uppercase">OVD Bureau</h1>
          <p className="text-[9px] text-accent font-bold tracking-[0.3em] mt-1 uppercase leading-none opacity-80">Structural Engineering</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-10">
        {items.map(item => (
          <button 
            key={String(item.id)} 
            onClick={() => setView(String(item.id))} 
            className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-300 ${view === item.id ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
          >
            {String(item.label)}
          </button>
        ))}
        <button onClick={() => setView('contact')} className="px-5 py-2 bg-white text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-accent transition-all active:scale-95">Inquire Analysis</button>
      </div>
      <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/5 p-8 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top-4">
          {items.map(item => (
            <button key={String(item.id)} onClick={() => { setView(String(item.id)); setMobileMenu(false); }} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{String(item.label)}</button>
          ))}
          <button onClick={() => { setView('contact'); setMobileMenu(false); }} className="w-full py-3 bg-accent text-black rounded-lg font-black uppercase tracking-widest text-[10px]">Contact Bureau</button>
        </div>
      )}
    </nav>
  );
};

const PreciseControl = ({ label, value, min, max, step = 1, unit = '', onChange }: { label: string, value: number, min: number, max: number, step?: number, unit?: string, onChange: (v: number) => void }) => {
  const id = useId();
  return (
    <div className="mb-6 relative slider-container group">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] group-hover:text-gray-400 transition-colors">{String(label)}</label>
        <span className="text-[9px] text-accent font-mono bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
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

const Dashboard = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const shadow = calculateShadow(settings.lightAngle, 12);
  const rgb = hexToRgb(settings.color);
  const effectiveTrans = (settings.transmission / 100) * settings.transparency;
  const effectiveSat = settings.saturation * (settings.ior / 1.52);

  const cssCode = `.ovd-structural-glazing {
  background: rgba(${rgb}, ${String(effectiveTrans.toFixed(2))});
  backdrop-filter: blur(${String(settings.blur)}px) saturate(${String(effectiveSat.toFixed(0))}%);
  border-radius: ${String(settings.borderRadius)}px;
  border: 1px solid rgba(255, 255, 255, ${String(settings.outlineOpacity)});
  box-shadow: ${String(shadow.x)}px ${String(shadow.y)}px ${String(settings.shadowBlur)}px rgba(0,0,0,${String(settings.shadowOpacity)});
}`;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12 animate-in fade-in duration-1000">
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-card p-8 rounded-[32px] shadow-2xl space-y-8 card-glow transition-all duration-500 hover:border-white/10">
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <Settings className="w-4 h-4 text-accent" />
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Material Matrix</h3>
          </div>
          <div className="space-y-1">
            <PreciseControl label="Analysis Blur" value={settings.blur} min={0} max={64} onChange={v => setSettings({...settings, blur: v})} unit="px" />
            <PreciseControl label="Refractive Index" value={settings.ior} min={1.0} max={2.5} step={0.01} onChange={v => setSettings({...settings, ior: v})} />
            <PreciseControl label="Compressive Capacity" value={settings.compressiveStrength} min={20} max={500} onChange={v => setSettings({...settings, compressiveStrength: v})} unit=" MPa" />
            <PreciseControl label="Thermal Expansion" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={v => setSettings({...settings, thermalCoeff: v})} unit=" ×10⁻⁶" />
            <PreciseControl label="Transmission Ratio" value={settings.transmission} min={0} max={100} onChange={v => setSettings({...settings, transmission: v})} unit="%" />
            <PreciseControl label="Edge Specularity" value={settings.specularity} min={0} max={1} step={0.05} onChange={v => setSettings({...settings, specularity: v})} />
          </div>
          <div className="pt-6 border-t border-white/5">
            <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">Material Tint</label>
            <div className="flex gap-4">
              <input type="color" value={String(settings.color)} onChange={e => setSettings({...settings, color: e.target.value})} className="w-12 h-12 bg-transparent border-0 cursor-pointer p-0" />
              <div className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 flex items-center text-[9px] font-mono text-accent uppercase tracking-widest">{String(settings.color)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="aspect-[16/9] bg-[#020202] border border-white/5 rounded-[48px] relative flex items-center justify-center p-8 shadow-[inset_0_0_50px_rgba(0,0,0,1)] overflow-hidden card-glow">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{
            backgroundColor: `rgba(${rgb}, ${effectiveTrans})`,
            backdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            borderRadius: `${settings.borderRadius}px`,
            border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
            boxShadow: `${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity})`,
            transform: `perspective(1000px) rotateY(${(settings.ior - 1.5) * 8}deg)`,
          }} className="w-full h-full flex flex-col p-10 transition-all duration-700 relative group">
            <div className="flex justify-between items-start mb-auto relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm"><Layers className="text-white w-6 h-6" /></div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Bureau_Analysis</p>
                <p className="text-[10px] font-black text-white/70 font-mono tracking-tighter uppercase leading-none">ID: {String(settings.ior).replace('.','')}_SAFE</p>
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none">Structural Simulation</h4>
              <p className="text-white/40 text-sm max-w-md leading-relaxed font-light">
                Authoritative material physics: <span className="text-white/80 font-bold">{String(settings.compressiveStrength)}MPa</span> capacity with <span className="text-white/80 font-bold">{String(settings.thermalCoeff)}</span> expansion mapping.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[32px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-40" />
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[9px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
              <Terminal className="w-4 h-4 text-accent" /> Asset Syntax Stream
            </h3>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
              <Copy className="w-3 h-3 mr-2 inline" /> Copy
            </button>
          </div>
          <div className="bg-black/90 p-8 rounded-2xl text-[11px] font-mono leading-relaxed border border-white/5 overflow-x-auto">
            <code className="text-emerald-400">{String(cssCode)}</code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRESETS.map((p, idx) => (
            <button key={String(idx)} onClick={() => setSettings(p.settings)} className="glass-card group p-8 rounded-[32px] text-left hover:scale-[1.01] transition-all active:scale-95">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-accent transition-colors">{String(p.category)}</p>
                <Database className="w-4 h-4 text-gray-700" />
              </div>
              <h4 className="text-lg font-black text-white group-hover:text-accent transition-colors leading-none">{String(p.name)}</h4>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomepagePillar = () => (
  <article className="py-24 px-8 lg:px-24 bg-page border-t border-white/5 relative overflow-hidden">
    <div className="max-w-5xl mx-auto prose prose-invert prose-emerald lg:prose-xl prose-p:text-gray-500 prose-p:font-light prose-headings:font-black prose-headings:tracking-tighter prose-strong:text-white">
      <h1 className="text-6xl lg:text-7xl mb-12 leading-tight text-white">Professional Structural Glass Engineering Hub</h1>
      <p className="lead text-2xl text-accent font-bold mb-16 leading-relaxed">Authoritative material safety, mechanical limits, and compliance framework optimization for high-performance facades.</p>
      
      <p>Architectural glass is a technically complex material in modern construction. While perceived as fragile, advanced glass assemblies serve as critical structural members. This authority report, curated by the OVD Independent Engineering Bureau, explores the intersection of material science and building code compliance.</p>

      <section className="bg-panel p-12 rounded-[48px] border border-white/5 my-24 transition-all hover:border-white/10">
        <h2 className="mt-0 flex items-center gap-6 text-white text-4xl leading-tight"><Scale className="text-accent w-10 h-10" /> 1. Physics of Structural Glass</h2>
        <p>At the molecular level, architectural glass is an amorphous solid—a material that behaves like a solid but lacks the ordered crystalline structure found in metals. This means glass cannot dissipate energy through plastic deformation; it remains perfectly elastic until brittle fracture. Structural engineering for glass is therefore an exercise in probability management using models like the Weibull distribution.</p>
      </section>

      <h2 className="text-4xl text-white mb-8">2. Global Regulatory Landscape</h2>
      <p>Engineering glass is governed by mandates to prevent life-safety risks. Standards such as <strong>ASTM E1300</strong> in North America and <strong>EN 12600</strong> in Europe establish load resistance based on area, thickness, and aspect ratio. Compliance ensures a facade withstands hurricane-force wind gusts and seismic drifts.</p>

      <div className="grid md:grid-cols-2 gap-8 my-20 not-prose">
        <div className="glass-card p-10 rounded-[32px] border border-white/5">
          <h4 className="text-white uppercase tracking-widest text-[10px] font-black mb-8 opacity-50 flex items-center gap-2"><Activity className="w-4 h-4 text-accent" /> Bureau Load Metrics</h4>
          <ul className="text-xs space-y-4 text-gray-400 list-none p-0">
            <li className="flex items-center gap-4 font-light"><CheckCircle className="w-5 h-5 text-accent shrink-0" /> Dead Loads: 2,500 kg/m³ density constant.</li>
            <li className="flex items-center gap-4 font-light"><CheckCircle className="w-5 h-5 text-accent shrink-0" /> Windloads: Peak velocity dynamic pressure.</li>
            <li className="flex items-center gap-4 font-light"><CheckCircle className="w-5 h-5 text-accent shrink-0" /> Seismic: Lateral building drift accommodation.</li>
          </ul>
        </div>
        <div className="bg-white/5 p-10 rounded-[32px] border border-white/10 flex flex-col justify-center italic text-gray-500 text-lg leading-relaxed shadow-inner">
          "The invisible strength of architectural transparency is the result of rigorous probabilistic simulation."
        </div>
      </div>

      <h2 className="text-4xl text-white mb-8">3. Importance of Accurate Digital Simulation</h2>
      <p>As architectural geometries featuring curved surfaces and point-supported glass fins become common, margins for error disappear. Digital tools like OVD Glass Engine allow for high-fidelity visualization of refractive and mechanical variables before manufacturing. This reduces material waste and lowers the environmental impact of high-rise construction.</p>
    </div>
  </article>
);

const BlogHub = ({ onPostClick }: { onPostClick: (id: string) => void }) => (
  <section className="py-24 px-8 lg:px-16 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 text-accent mb-8 font-black uppercase tracking-[0.5em] text-[10px]">
          <BookOpen className="w-6 h-6" />
          <span>Knowledge Bureau</span>
        </div>
        <h2 className="text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] text-glow">Engineering <br/> Archive</h2>
        <p className="text-xl text-gray-500 font-light leading-relaxed">Deep-dive technical analysis into material physics, standards, and structural innovation.</p>
      </div>
      <div className="h-0.5 flex-1 bg-white/5 mb-8 hidden md:block" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {BLOG_POSTS.map((post) => (
        <article key={String(post.id)} className="glass-card group p-10 rounded-[48px] flex flex-col h-full hover:border-accent/30 transition-all cursor-pointer" onClick={() => onPostClick(post.id)}>
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-10">
            <span className="bg-accent/10 px-4 py-2 rounded-full border border-accent/20">{String(post.category)}</span>
            <span className="text-gray-700 font-mono">{String(post.date)}</span>
          </div>
          <h3 className="text-3xl font-black text-white mb-6 leading-tight group-hover:text-accent transition-colors">{String(post.title)}</h3>
          <p className="text-gray-600 text-sm font-light mb-12 flex-1 leading-relaxed">{String(post.summary)}</p>
          <div className="flex justify-between items-center mt-auto pt-8 border-t border-white/5">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-800">Review: STABLE</span>
            <button className="text-accent hover:translate-x-2 transition-transform"><ChevronRight className="w-8 h-8" /></button>
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
    <article className="py-24 px-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
      <button onClick={onBack} className="flex items-center gap-4 text-gray-600 hover:text-accent transition-all mb-16 text-[9px] font-black uppercase tracking-[0.6em]">
        <ChevronRight className="w-5 h-5 rotate-180" /> Return to Engineering Hub
      </button>
      <header className="mb-20">
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-12">
          <span className="bg-accent/10 px-6 py-3 rounded-full border border-accent/20">{String(post.category)}</span>
          <span className="text-gray-700 font-mono tracking-widest">{String(post.date)}</span>
        </div>
        <h1 className="text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-12">{String(post.title)}</h1>
        <div className="flex flex-wrap items-center gap-10 text-[10px] text-gray-500 border-y border-white/5 py-10 uppercase tracking-widest font-black">
          <div className="flex items-center gap-3"><UserCheck className="w-5 h-5 text-accent" /> OVD Bureau</div>
          <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-accent" /> Deep Analysis</div>
        </div>
      </header>
      <div className="prose prose-invert prose-emerald max-w-none text-gray-500 font-light leading-relaxed whitespace-pre-wrap text-xl lg:text-2xl">
        {String(post.content).split('###').map((section, idx) => {
          if (idx === 0) return <p key={idx} className="mb-12 italic text-gray-300">{section}</p>;
          const lines = section.trim().split('\n');
          const header = lines[0];
          const body = lines.slice(1).join('\n');
          return (
            <div key={idx} className="mt-20 first:mt-0">
              <h2 className="text-4xl font-black text-white mb-8 tracking-tighter leading-none">{String(header)}</h2>
              <div className="text-gray-500 leading-relaxed space-y-6">{String(body)}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-32 p-16 bg-panel border border-white/5 rounded-[64px] text-center glass-card relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-transparent" />
        <h3 className="text-white font-black text-5xl mb-8 tracking-tighter relative z-10 leading-none">Bureau Peer-Review</h3>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-lg relative z-10 font-light leading-relaxed">Our Structural Engineering Bureau provides authoritative third-party certification and forensic analysis for monumental facade projects. Submit your transmission for validation.</p>
        <button className="px-16 py-8 bg-accent text-black rounded-full font-black uppercase text-[10px] shadow-[0_0_40px_rgba(16,185,129,0.3)] relative z-10 hover:scale-105 transition-all active:scale-95">
          <Mail className="w-6 h-6 mr-3 inline" /> magic.reviewsite@gmail.com
        </button>
      </div>
    </article>
  );
};

const DocsPage = () => (
  <section className="py-24 px-8 max-w-7xl mx-auto animate-in fade-in duration-1000">
    <div className="mb-24 relative">
      <h2 className="text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-none uppercase text-glow">Technical <br/> Documentation</h2>
      <p className="text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">Comprehensive operational framework and structural parameter logic for the OVD Analysis Bureau.</p>
      <div className="h-2 w-32 bg-accent mt-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
    </div>
    
    <div className="space-y-32 prose prose-invert prose-emerald max-w-none">
      <div className="glass-card p-16 rounded-[48px] border border-white/5 shadow-xl">
        <h2 className="mt-0 flex items-center gap-6 text-white font-black text-4xl leading-none uppercase"><Terminal className="w-12 h-12 text-accent" /> 1. System Overview</h2>
        <p className="text-gray-500 text-2xl leading-relaxed font-light">The OVD Analysis Engine utilizes real-time client-side material simulation to approximate structural refraction and mechanical distortion. By processing physics locally, we ensure zero-latency iterations during schematic design while maintaining engineering data fidelity.</p>
      </div>

      <div>
        <h2 className="text-white font-black text-5xl mb-16 tracking-tighter uppercase leading-none border-b border-white/5 pb-8">2. Parameter specification</h2>
        <div className="grid gap-10">
          {[
            { name: "Index of Refraction (IOR)", icon: Glasses, desc: "Quantifies light propagation speed. Essential for optical validation of laminated structural plies." },
            { name: "Compressive Capacity (MPa)", icon: Activity, desc: "Functional mechanical resistance limit. Critical for sizing glass fins and point-supports." },
            { name: "Thermal Expansion (α)", icon: Thermometer, desc: "Dimensional volatility per unit temperature change. Primary variable for sizing expansion joints." },
            { name: "Visual Transmission (VLT)", icon: Sun, desc: "Luminous transmittance percentage. Governing metric for building energy performance." }
          ].map((param, idx) => (
            <div key={String(idx)} className="flex items-start gap-10 p-12 glass-card rounded-[40px] hover:border-accent/20 transition-all group">
              <div className="w-16 h-16 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20 group-hover:scale-105 transition-transform">
                <param.icon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="m-0 text-white text-3xl font-black mb-4 tracking-tighter uppercase group-hover:text-accent transition-colors leading-none">{String(param.name)}</h4>
                <p className="m-0 text-lg text-gray-600 leading-relaxed font-light">{String(param.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => (
  <section className="py-24 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
    <header className="mb-16">
      <h1 className="text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">{type === 'privacy' ? 'Privacy' : 'Terms'}</h1>
      <p className="text-accent mt-8 font-mono text-[10px] uppercase tracking-[0.6em] leading-none opacity-80">STABLE_OVD_2026</p>
    </header>
    <div className="prose prose-invert prose-emerald max-w-none text-gray-600 font-light leading-relaxed text-2xl space-y-20">
      {type === 'privacy' ? (
        <>
          <p className="text-white italic">OVD Engine operates under a non-negotiable <strong>Zero-Persistence Architecture</strong>. Our bureau does not collect, store, or transmit proprietary structural data to external cloud systems.</p>
          <div>
            <h3 className="text-white text-4xl font-black mb-8 tracking-tighter uppercase leading-none">Advertising Disclosure</h3>
            <p>Supported by Google AdSense. Third-party vendors use cookies to serve ads based on prior visits. Users can manage advertising preferences via their Google account settings. We adhere to global data protocols.</p>
          </div>
        </>
      ) : (
        <>
          <p className="text-white italic">By accessing OVD Bureau's online analysis tools, you agree to terms governing structural visualization and digital asset utilization.</p>
          <div>
            <h3 className="text-white text-4xl font-black mb-8 tracking-tighter uppercase leading-none">Simulation Disclaimer</h3>
            <p>OVD Analysis Engine is a conceptual schematic tool. It does NOT replace legal requirements for a P.E. stamped calculation report for construction permitting. Use with engineering discretion.</p>
          </div>
        </>
      )}
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-black border-t border-white/5 pt-32 pb-16 px-8 lg:px-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
      <div className="col-span-1 md:col-span-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-8 mb-12 group cursor-pointer" onClick={() => setView('engine')}>
          <div className="w-16 h-16 rounded-[1.5rem] bg-accent flex items-center justify-center text-black font-black text-4xl shadow-2xl transition-all group-hover:scale-105">O</div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">OVD Bureau</h2>
        </div>
        <p className="text-gray-500 text-2xl leading-relaxed max-w-md font-light mx-auto md:mx-0">Global authority in structural glass simulation and high-density technical facade documentation bureau.</p>
        <div className="mt-12 flex justify-center md:justify-start gap-8">
          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all"><Globe className="w-6 h-6" /></button>
          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all"><Shield className="w-6 h-6" /></button>
          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all"><Microscope className="w-6 h-6" /></button>
        </div>
      </div>
      <div>
        <h4 className="text-accent font-black text-[10px] uppercase tracking-[0.6em] mb-12 opacity-50">Linkages</h4>
        <ul className="text-[10px] text-gray-600 space-y-6 font-black uppercase tracking-[0.3em]">
          <li onClick={() => setView('engine')} className="hover:text-white cursor-pointer transition-colors">Engine</li>
          <li onClick={() => setView('blog')} className="hover:text-white cursor-pointer transition-colors">Knowledge Hub</li>
          <li onClick={() => setView('docs')} className="hover:text-white cursor-pointer transition-colors">Documentation</li>
        </ul>
      </div>
      <div>
        <h4 className="text-accent font-black text-[10px] uppercase tracking-[0.6em] mb-12 opacity-50">Governance</h4>
        <ul className="text-[10px] text-gray-600 space-y-6 font-black uppercase tracking-[0.3em]">
          <li onClick={() => setView('privacy')} className="hover:text-white cursor-pointer transition-colors">Privacy</li>
          <li onClick={() => setView('terms')} className="hover:text-white cursor-pointer transition-colors">Terms</li>
          <li onClick={() => setView('contact')} className="hover:text-white cursor-pointer transition-colors">Contact</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
      <p className="text-[9px] font-mono text-gray-800 tracking-[0.6em] uppercase">© 2026 OVD Bureau of Engineering. V2.1.0-STABLE</p>
      <div className="flex gap-12 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        {PLANS.map(p => (
          <div key={String(p)} className="flex flex-col items-center gap-4">
            <span className="text-[9px] font-black uppercase text-white tracking-[0.3em]">{String(p)}</span>
            <div className="h-1 w-12 bg-accent rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
          </div>
        ))}
      </div>
    </div>
  </footer>
);

// --- MAIN APPLICATION CORE ---

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
      <div className="min-h-screen flex flex-col selection:bg-accent/40 selection:text-white overflow-x-hidden bg-black">
        <Navigation view={view} setView={handleNav} />
        
        <main className="flex-1">
          {view === 'engine' && (
            <div className="animate-in fade-in duration-1000">
              <div className="bg-[#050505] border-b border-white/5 py-32 px-8 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#10b981 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
                 <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                   <div className="flex items-center justify-center lg:justify-start gap-6 text-accent mb-10 font-black uppercase tracking-[0.7em] text-[9px]">
                     <Activity className="w-8 h-8" />
                     <span>Bureau Engine Hub</span>
                   </div>
                   <h1 className="text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-12 text-glow">Structural <br/> <span className="text-accent">Analysis Bureau</span></h1>
                   <p className="text-2xl lg:text-3xl text-gray-500 font-light max-w-3xl leading-snug mb-20 mx-auto lg:mx-0">Authoritative material physics and load resistance simulation for architectural transparency.</p>
                   <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                     <button onClick={() => setView('engine')} className="px-12 py-5 bg-accent text-black rounded-full font-black uppercase text-[9px] shadow-[0_0_50px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">Launch Engine</button>
                     <button onClick={() => setView('blog')} className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase text-[9px] hover:bg-white/10 transition-all flex items-center justify-center gap-4"><BookOpen className="w-5 h-5" /> Hub</button>
                   </div>
                 </div>
              </div>
              <Dashboard settings={settings} setSettings={setSettings} />
              <BlogHub onPostClick={handlePostClick} />
              <HomepagePillar />
            </div>
          )}

          {view === 'blog' && <BlogHub onPostClick={handlePostClick} />}
          {view === 'blog-detail' && activePost && <BlogPostDetail id={String(activePost)} onBack={() => handleNav('blog')} />}
          {view === 'docs' && <DocsPage />}
          {view === 'privacy' && <LegalPage type="privacy" />}
          {view === 'terms' && <LegalPage type="terms" />}
          
          {view === 'contact' && (
            <section className="py-32 px-8 max-w-7xl mx-auto text-center animate-in zoom-in-95 duration-1000">
              <div className="mb-20">
                <h2 className="text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 uppercase leading-none text-glow text-center">Bureau <br/> Consultation</h2>
                <p className="text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-tight italic">Direct transmission to our Global Engineering Division for analysis and certification.</p>
              </div>
              <div className="glass-card p-16 rounded-[64px] shadow-3xl relative overflow-hidden card-glow group max-w-3xl mx-auto">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-accent to-transparent transition-opacity" />
                <div className="w-24 h-24 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-12 border border-accent/20"><Mail className="w-12 h-12" /></div>
                <p className="text-4xl font-black text-white mb-6 tracking-tighter transition-all group-hover:text-accent">magic.reviewsite@gmail.com</p>
                <p className="text-gray-700 text-xl font-light mb-12 uppercase tracking-[0.4em]">Transmission Hub Division</p>
                <button className="px-12 py-7 bg-accent text-black rounded-full font-black uppercase text-[10px] shadow-3xl hover:scale-105 transition-all flex items-center gap-5 mx-auto">
                  Initialize Inquiry <ChevronRight className="w-8 h-8" />
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

// --- BOOTSTRAP ---
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}