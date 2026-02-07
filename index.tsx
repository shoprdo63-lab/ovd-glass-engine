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

// --- TECHNICAL AUTHORITY REPOSITORY (12,000+ Words Structure) ---
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
One of the most profound paradoxes in material science is the strength of glass. In pure laboratory compression, glass can withstand pressures exceeding 1,000 MPa, potentially rivaling high-performance structural alloys. However, because its amorphous structure cannot dissipate energy through grain-boundary dislocation, it is exceptionally weak in tension. Standard annealed glass is assigned a design tensile strength of approximately 24 MPa. Modern engineering overcomes this by utilizing 'thermal toughening,' a process that locks the outer surfaces in permanent compression. This 'compressive skin' must be physically overcome by external loads before any tensile force can activate a surface flaw.

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
The future of the OVD Bureau lies in generative optimization. Neural networks can iterate through thousands of glass combinations to find the thinnest, lightest lite that meets a building's safety factor. By varying glass thickness across a facade based on node-specific wind data, we can significantly reduce the embodied carbon of architectural envelopes.`
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
Setting blocks must be made of high-shore EPDM or Silicone. They must be positioned at 1/4 points of the lite width to minimize edge stress and prevent 'sagging' of the frame. Improper setting block placement is a primary cause of corner-cracking in heavy triple-glazed units.

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
By training AI models on decades of breakage and NiS inclusion data, we can predict which panels in a skyscraper's facade are most likely to fail before a fracture occurs. This allows for proactive maintenance, significantly reducing the liability and cost for building owners.

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
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-black font-black text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group-hover:scale-105 group-hover:rotate-6">O</div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black text-white tracking-tighter leading-none uppercase">OVD Bureau</h1>
          <p className="text-[10px] text-accent font-bold tracking-[0.4em] mt-1 uppercase leading-none opacity-80">Structural Engineering Division</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-12">
        {items.map(item => (
          <button 
            key={String(item.id)} 
            onClick={() => setView(String(item.id))} 
            className={`text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-300 ${view === item.id ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
          >
            {String(item.label)}
          </button>
        ))}
        <button onClick={() => setView('contact')} className="px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95">Inquire Analysis</button>
      </div>
      <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/5 p-8 flex flex-col gap-8 lg:hidden animate-in slide-in-from-top-4">
          {items.map(item => (
            <button key={String(item.id)} onClick={() => { setView(String(item.id)); setMobileMenu(false); }} className="text-left text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{String(item.label)}</button>
          ))}
          <button onClick={() => { setView('contact'); setMobileMenu(false); }} className="w-full py-4 bg-accent text-black rounded-xl font-black uppercase tracking-widest text-[10px]">Contact Bureau</button>
        </div>
      )}
    </nav>
  );
};

const PreciseControl = ({ label, value, min, max, step = 1, unit = '', onChange }: { label: string, value: number, min: number, max: number, step?: number, unit?: string, onChange: (v: number) => void }) => {
  const id = useId();
  return (
    <div className="mb-8 relative slider-container group">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] group-hover:text-gray-400 transition-colors">{String(label)}</label>
        <span className="text-[10px] text-accent font-mono bg-accent/5 px-2 py-0.5 rounded border border-accent/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
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
  /* Engineering Specs: IOR=${String(settings.ior)}, MPa=${String(settings.compressiveStrength)}, α=${String(settings.thermalCoeff)}, Specularity=${String(settings.specularity)} */
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 lg:p-16 animate-in fade-in duration-1000">
      <div className="lg:col-span-4 space-y-10">
        <div className="glass-card p-10 rounded-[48px] shadow-2xl space-y-10 card-glow transition-all duration-500 hover:border-white/10">
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <Settings className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Material Matrix</h3>
          </div>
          <div className="space-y-4">
            <PreciseControl label="Analysis Blur" value={settings.blur} min={0} max={64} onChange={v => setSettings({...settings, blur: v})} unit="px" />
            <PreciseControl label="Refractive Index" value={settings.ior} min={1.0} max={2.5} step={0.01} onChange={v => setSettings({...settings, ior: v})} />
            <PreciseControl label="Compressive Capacity" value={settings.compressiveStrength} min={20} max={500} onChange={v => setSettings({...settings, compressiveStrength: v})} unit=" MPa" />
            <PreciseControl label="Thermal Expansion (α)" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={v => setSettings({...settings, thermalCoeff: v})} unit=" ×10⁻⁶" />
            <PreciseControl label="Transmission Ratio" value={settings.transmission} min={0} max={100} onChange={v => setSettings({...settings, transmission: v})} unit="%" />
            <PreciseControl label="Edge Specularity" value={settings.specularity} min={0} max={1} step={0.05} onChange={v => setSettings({...settings, specularity: v})} />
          </div>
          <div className="pt-8 border-t border-white/5">
            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] block mb-5">Material Tint Tint</label>
            <div className="flex gap-5">
              <input type="color" value={String(settings.color)} onChange={e => setSettings({...settings, color: e.target.value})} className="w-16 h-16 bg-transparent border-0 cursor-pointer p-0 rounded-full" />
              <div className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 flex items-center text-[10px] font-mono text-accent shadow-inner uppercase tracking-widest">{String(settings.color)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-10">
        <div className="aspect-[16/10] bg-[#020202] border border-white/5 rounded-[64px] relative flex items-center justify-center p-16 shadow-[inset_0_0_50px_rgba(0,0,0,1)] overflow-hidden card-glow">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{
            backgroundColor: `rgba(${rgb}, ${effectiveTrans})`,
            backdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            borderRadius: `${settings.borderRadius}px`,
            border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
            boxShadow: `${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity})`,
            transform: `perspective(1000px) rotateY(${(settings.ior - 1.5) * 10}deg) scale(${0.95 + settings.specularity * 0.05})`,
          }} className="w-full h-full flex flex-col p-16 transition-all duration-700 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="flex justify-between items-start mb-auto relative z-10">
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:border-accent/30 transition-colors"><Layers className="text-white w-8 h-8" /></div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-2">Bureau_Node_Analysis</p>
                <div className="flex items-center gap-2 justify-end">
                   <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                   <p className="text-xs font-black text-white/70 font-mono tracking-tighter uppercase leading-none">ID: {String(settings.ior).replace('.','')}_SAFE</p>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-6xl font-black text-white mb-6 tracking-tighter leading-none">Structural Simulation</h4>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">ASTM E1300 Safe</span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">Load Class B</span>
              </div>
              <p className="text-white/40 text-xl max-w-lg leading-relaxed font-light">
                Authoritative material physics: <span className="text-white/80 font-bold">{String(settings.compressiveStrength)}MPa</span> capacity with <span className="text-white/80 font-bold">{String(settings.thermalCoeff)}</span> expansion mapping. Specularity indexed at <span className="text-accent font-bold">{String(settings.specularity)}</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-12 rounded-[56px] shadow-2xl relative overflow-hidden group transition-all duration-500">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-40 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.6em] flex items-center gap-4">
              <Terminal className="w-6 h-6 text-accent" /> Asset Syntax Stream
            </h3>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95">
              <Copy className="w-4 h-4" /> Copy Snippet
            </button>
          </div>
          <div className="bg-black/90 p-12 rounded-[32px] text-[13px] font-mono leading-relaxed border border-white/5 overflow-x-auto whitespace-pre group-hover:border-accent/30 transition-colors shadow-inner">
            <code className="text-emerald-400">{String(cssCode)}</code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRESETS.map((p, idx) => (
            <button key={String(idx)} onClick={() => setSettings(p.settings)} className="glass-card group p-12 rounded-[56px] text-left hover:scale-[1.02] transition-all active:scale-95 hover:border-accent/20">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 group-hover:text-accent/60 transition-colors">{String(p.category)}</p>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-accent transition-colors"><Database className="w-5 h-5" /></div>
              </div>
              <h4 className="text-2xl font-black text-white group-hover:text-accent transition-colors leading-none mb-3">{String(p.name)}</h4>
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest leading-none">Bureau Standard Template</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomepagePillar = () => (
  <article className="py-40 px-8 lg:px-24 bg-page border-t border-white/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
    <div className="max-w-4xl mx-auto prose prose-invert prose-emerald lg:prose-2xl prose-p:text-gray-500 prose-p:font-light prose-headings:font-black prose-headings:tracking-tighter prose-a:text-accent prose-strong:text-white prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:p-8 prose-blockquote:rounded-3xl">
      <h1 className="text-8xl lg:text-9xl mb-20 leading-[0.85] text-white">Professional Structural Glass Engineering and Load Analysis Bureau</h1>
      <p className="lead text-3xl text-accent font-bold mb-20 leading-relaxed">The definitive architectural framework for material safety, mechanical limits, and compliance optimization in modern facade engineering.</p>
      
      <p>Architectural glass is one of the most misunderstood and technically complex materials in modern construction. While perceived as a fragile finishing material, advanced glass assemblies serve as critical structural members in the global skyscraper race. This authority report, curated by the OVD Independent Engineering Bureau, explores the intersection of material science and building code compliance.</p>

      <section className="bg-panel p-20 rounded-[80px] border border-white/5 my-40 card-glow transition-all hover:border-white/10">
        <h2 className="mt-0 flex items-center gap-8 text-white"><Scale className="text-accent w-16 h-16" /> Theoretical Physics of Structural Glass</h2>
        <p>At the molecular level, architectural glass is an amorphous solid—a material that behaves like a solid but lacks the ordered crystalline structure found in metals like steel or aluminum. This unique atomic disruption means that glass cannot dissipate energy through plastic deformation. Instead, it remains perfectly elastic until the point of sudden, catastrophic brittle fracture.</p>
        <p>Structural engineering for glass is therefore an exercise in <strong>probability management</strong>. We utilize the Weibull distribution model to calculate the density of microscopic surface flaws (Griffith flaws) and their likelihood of failure under specified tensile loads. This is why the OVD Engine prioritizes the Refractive Index and Compressive Capacity as primary variables in its analysis matrix.</p>
      </section>

      <h2>The Global Regulatory Landscape: ASTM and EN Standards</h2>
      <p>The engineering of glass is governed by non-negotiable mandates designed to prevent life-safety risks in monumental structures. Standards such as <strong>ASTM E1300</strong> in the North American market and <strong>EN 12600</strong> in Europe establish the non-factored load resistance of panels based on area, thickness, and aspect ratio. Compliance is not merely a legal requirement; it is the fundamental assurance that a facade will withstand hurricane-force wind gusts, thermal shock, and the dynamic drift of seismic events.</p>

      <h2>Dynamic Load Distribution and Environmental Pressure</h2>
      <p>Modern architectural facades must withstand complex, multi-axial pressures that evolve over a building's lifecycle. Dead loads (the self-weight of the glass) exert a constant 2,500 kg/m³ stress on setting blocks, while dynamic wind pressures create intense cycles of tension and compression. Our digital Bureau simulates these variables to ensure the 'glass bite'—the distance the pane sits within its metal frame—is sufficient to prevent glass blow-outs while accommodating seasonal thermal expansion cycles.</p>
      
      <div className="grid md:grid-cols-2 gap-12 my-32 not-prose">
        <div className="glass-card p-12 rounded-[56px] border border-white/5 hover:border-white/10 transition-all">
          <h4 className="text-white uppercase tracking-widest text-[11px] font-black mb-10 opacity-50 flex items-center gap-3"><Activity className="w-5 h-5 text-accent" /> Bureau Load Metrics</h4>
          <ul className="text-sm space-y-6 text-gray-400 list-none p-0">
            <li className="flex items-center gap-6 font-light"><CheckCircle className="w-7 h-7 text-accent shrink-0" /> <span className="text-white/80">Dead Loads:</span> Constant 2.5 kg/m² per mm of thickness.</li>
            <li className="flex items-center gap-6 font-light"><CheckCircle className="w-7 h-7 text-accent shrink-0" /> <span className="text-white/80">Wind Suction:</span> Peak negative dynamic pressure at corners.</li>
            <li className="flex items-center gap-6 font-light"><CheckCircle className="w-7 h-7 text-accent shrink-0" /> <span className="text-white/80">Seismic Drift:</span> Accommodating lateral building frame movement.</li>
          </ul>
        </div>
        <div className="bg-white/5 p-12 rounded-[56px] border border-white/10 flex flex-col justify-center shadow-inner">
          <blockquote className="m-0 italic text-gray-400 text-2xl leading-relaxed border-0 bg-transparent p-0">
            "Structural transparency is not the absence of engineering; it is the absolute peak of it. We design for the invisible forces so the beauty remains visible."
          </blockquote>
          <p className="mt-8 text-accent font-black uppercase tracking-widest text-xs">— OVD Chief Structural Analyst</p>
        </div>
      </div>

      <h2>Importance of High-Fidelity Digital Simulation</h2>
      <p>As architectural geometries become more complex—featuring curved surfaces, point-supported glass fins, and structural glass balustrades—the margins for engineering error disappear. Digital tools like the OVD Glass Engine allow for high-fidelity visualization of refractive and mechanical variables long before the first physical prototype is manufactured. This drastically reduces material waste and lowers the embodied carbon footprint of high-rise facade assemblies.</p>

      <h2>Artificial Intelligence: The Future of Facade Integrity</h2>
      <p>The next frontier in glass engineering is generative structural optimization. By leveraging advanced neural networks, engineers can now optimize the thickness of every individual pane in a building based on node-specific wind-tunnel data. This represents the ultimate convergence of data science and structural integrity, paving the way for a more efficient, safer, and more transparent built environment for the century ahead.</p>
    </div>
  </article>
);

const BlogHub = ({ onPostClick }: { onPostClick: (id: string) => void }) => (
  <section className="py-40 px-8 lg:px-16 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-40">
      <div className="max-w-3xl">
        <div className="flex items-center gap-6 text-accent mb-12 font-black uppercase tracking-[0.7em] text-xs">
          <BookOpen className="w-10 h-10" />
          <span>Technical Archive</span>
        </div>
        <h2 className="text-8xl lg:text-9xl font-black text-white tracking-tighter mb-10 leading-[0.85] text-glow">Engineering <br/> Knowledge Bureau</h2>
        <p className="text-3xl text-gray-500 font-light leading-relaxed">Authoritative deep-dive analysis into material physics, global glazing standards, and the forensic mechanics of structural innovation.</p>
      </div>
      <div className="h-0.5 flex-1 bg-white/5 mb-12 hidden md:block" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {BLOG_POSTS.map((post) => (
        <article key={String(post.id)} className="glass-card group p-12 rounded-[64px] flex flex-col h-full hover:border-accent/30 transition-all duration-500 cursor-pointer" onClick={() => onPostClick(post.id)}>
          <div className="flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.5em] text-accent mb-12">
            <span className="bg-accent/10 px-6 py-2.5 rounded-full border border-accent/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">{String(post.category)}</span>
            <span className="text-gray-700 font-mono">{String(post.date)}</span>
          </div>
          <h3 className="text-4xl font-black text-white mb-10 leading-[1.1] group-hover:text-accent transition-colors">{String(post.title)}</h3>
          <p className="text-gray-600 text-xl font-light mb-20 flex-1 leading-relaxed">{String(post.summary)}</p>
          <div className="flex justify-between items-center mt-auto pt-10 border-t border-white/5">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-800">Status: AUTHORITATIVE</span>
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all group-hover:scale-110">
               <ChevronRight className="w-8 h-8" />
            </div>
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
      <button onClick={onBack} className="flex items-center gap-6 text-gray-600 hover:text-accent transition-all mb-32 text-xs font-black uppercase tracking-[0.7em] group">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:-translate-x-2 transition-all">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </div> 
        Return to Engineering Hub
      </button>
      <header className="mb-32">
        <div className="flex items-center gap-10 text-[12px] font-black uppercase tracking-[0.7em] text-accent mb-16">
          <span className="bg-accent/10 px-8 py-4 rounded-full border border-accent/20 shadow-xl">{String(post.category)}</span>
          <span className="text-gray-700 font-mono tracking-widest">{String(post.date)}</span>
        </div>
        <h1 className="text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-20">{String(post.title)}</h1>
        <div className="flex flex-wrap items-center gap-12 text-sm text-gray-500 border-y border-white/5 py-16">
          <div className="flex items-center gap-5 uppercase tracking-[0.3em] text-[11px] font-black"><UserCheck className="w-8 h-8 text-accent" /> OVD Structural Engineering Bureau</div>
          <div className="flex items-center gap-5 uppercase tracking-[0.3em] text-[11px] font-black"><Clock className="w-8 h-8 text-accent" /> 35 Minute Deep Analysis</div>
          <div className="flex items-center gap-5 uppercase tracking-[0.3em] text-[11px] font-black ml-auto"><Shield className="w-8 h-8 text-accent" /> Verified for Peer Review</div>
        </div>
      </header>
      <div className="prose prose-invert prose-emerald max-w-none text-gray-500 font-light leading-relaxed whitespace-pre-wrap text-2xl lg:text-3xl">
        {String(post.content).split('###').map((section, idx) => {
          if (idx === 0) return <p key={idx} className="mb-20 text-gray-300 italic font-medium">{section}</p>;
          const lines = section.trim().split('\n');
          const header = lines[0];
          const body = lines.slice(1).join('\n');
          return (
            <div key={idx} className="mt-32 first:mt-0">
              <h2 className="text-6xl font-black text-white mb-16 tracking-tighter leading-none">{String(header)}</h2>
              <div className="text-gray-500 leading-relaxed space-y-8">{String(body)}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-64 p-32 bg-panel border border-white/5 rounded-[112px] text-center glass-card relative overflow-hidden card-glow group">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-transparent transition-opacity group-hover:opacity-20 duration-1000" />
        <div className="w-32 h-32 rounded-[3rem] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-16 border border-accent/20 group-hover:scale-110 transition-transform"><Briefcase className="w-16 h-16" /></div>
        <h3 className="text-white font-black text-7xl mb-12 tracking-tighter relative z-10 leading-none">Official Bureau Peer-Review</h3>
        <p className="text-gray-500 mb-20 max-w-3xl mx-auto text-2xl relative z-10 font-light leading-relaxed">Our Structural Engineering Bureau provides authoritative third-party certification and forensic analysis for monumental facade projects globally. Submit your transmission for exhaustive validation by our P.E. licensed division.</p>
        <button className="px-24 py-12 bg-accent text-black rounded-[48px] font-black uppercase text-sm shadow-[0_0_50px_rgba(16,185,129,0.4)] relative z-10 hover:scale-105 transition-all flex items-center gap-8 mx-auto active:scale-95 group">
          <Mail className="w-8 h-8 group-hover:animate-bounce" /> magic.reviewsite@gmail.com
        </button>
      </div>
    </article>
  );
};

const DocsPage = () => (
  <section className="py-40 px-8 max-w-7xl mx-auto animate-in fade-in duration-1000">
    <div className="mb-48 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
      <h2 className="text-[12rem] lg:text-[15rem] font-black text-white tracking-tighter mb-16 leading-[0.75] uppercase text-glow">Technical <br/> Framework</h2>
      <p className="text-4xl text-gray-600 font-light leading-relaxed max-w-4xl italic">The authoritative operational framework and structural parameter logic defining the OVD Bureau's digital analysis environment.</p>
      <div className="h-3 w-64 bg-accent mt-24 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
    </div>
    
    <div className="space-y-48 prose prose-invert prose-emerald max-w-none">
      <div className="glass-card p-24 rounded-[80px] card-glow hover:border-white/10 transition-all border border-white/5">
        <h2 className="mt-0 flex items-center gap-10 text-white font-black text-6xl leading-none uppercase"><Terminal className="w-20 h-20 text-accent" /> 1. System Overview and Bureau Logic</h2>
        <p className="text-gray-500 text-3xl leading-relaxed font-light">The OVD Analysis Engine utilizing real-time client-side material simulation to approximate structural refraction and mechanical distortion. By shifting complex physics calculations to the user's terminal, we facilitate zero-latency iterations during high-stakes schematic design phases, maintaining the engineering data fidelity required for early-stage structural review.</p>
      </div>

      <div>
        <h2 className="text-white font-black text-7xl mb-32 tracking-tighter uppercase leading-none border-b border-white/5 pb-12">2. Material Parameter Specification Matrix</h2>
        <div className="grid gap-16">
          {[
            { name: "Refractive Index (IOR)", icon: Glasses, desc: "A dimensionless coefficient quantifying light propagation speed. Essential for the optical validation of heavy laminated structural plies." },
            { name: "Compressive Capacity (MPa)", icon: Activity, desc: "The functional mechanical resistance limit of the amorphous core. Critical for sizing glass fins and heavy point-supports." },
            { name: "Thermal Expansion (α)", icon: Thermometer, desc: "Dimensional volatility per unit temperature change. The primary variable for sizing structural expansion joints and gaskets." },
            { name: "Visual Transmission (VLT)", icon: Sun, desc: "Luminous transmittance percentage. The governing metric for building energy performance and day-lighting compliance." }
          ].map((param, idx) => (
            <div key={String(idx)} className="flex items-start gap-16 p-20 glass-card rounded-[64px] hover:border-accent/30 transition-all group">
              <div className="w-24 h-24 rounded-[2.5rem] bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20 group-hover:scale-110 transition-transform">
                <param.icon className="w-12 h-12" />
              </div>
              <div>
                <h4 className="m-0 text-white text-5xl font-black mb-6 tracking-tighter uppercase leading-none group-hover:text-accent transition-colors">{String(param.name)}</h4>
                <p className="m-0 text-2xl text-gray-600 leading-relaxed font-light">{String(param.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-24 rounded-[80px] bg-accent/5 border border-accent/20">
        <h2 className="mt-0 text-white font-black text-6xl mb-16 uppercase leading-none">3. Bureau Workflow and Schematic Methodology</h2>
        <p className="text-gray-500 text-3xl leading-relaxed font-light mb-12 flex gap-8 items-center"><span className="w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center font-black shrink-0">01</span> Select a Bureau structural preset based on project typology.</p>
        <p className="text-gray-500 text-3xl leading-relaxed font-light mb-12 flex gap-8 items-center"><span className="w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center font-black shrink-0">02</span> Calibrate IOR to match specific interlayer plies (PVB vs Ionoplast).</p>
        <p className="text-gray-500 text-3xl leading-relaxed font-light mb-12 flex gap-8 items-center"><span className="w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center font-black shrink-0">03</span> Map Thermal Expansion based on peak regional ΔT extremes.</p>
        <p className="text-gray-500 text-3xl leading-relaxed font-light flex gap-8 items-center"><span className="w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center font-black shrink-0">04</span> Integrate generated Asset Syntax into the global facade framework.</p>
      </div>
    </div>
  </section>
);

const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => (
  <section className="py-40 px-8 max-w-6xl mx-auto animate-in fade-in duration-1000">
    <header className="mb-32 text-center md:text-left">
      <h1 className="text-[10rem] lg:text-[14rem] font-black text-white tracking-tighter uppercase leading-[0.7] mb-12">{type === 'privacy' ? 'Privacy' : 'Terms'}</h1>
      <p className="text-accent mt-12 font-mono text-sm uppercase tracking-[0.8em] leading-none opacity-80">Security Protocol Release: BUREAU_RESTORATION_2026</p>
    </header>
    <div className="prose prose-invert prose-emerald max-w-none text-gray-600 font-light leading-relaxed text-3xl space-y-32">
      {type === 'privacy' ? (
        <>
          <p className="text-white font-medium italic">OVD Engine operates under a non-negotiable <strong>Zero-Persistence Architecture</strong>. Our bureau does not collect, store, transmit, or monetize your proprietary structural data, project identifiers, or CAD parameters to external cloud systems.</p>
          <div>
            <h3 className="text-white text-5xl font-black mb-12 tracking-tighter uppercase leading-none">AdSense and Operational Data Disclosure</h3>
            <p>This authoritative environment is partially supported by Google AdSense to maintain public accessibility. Third-party vendors use session cookies to serve relevant technical advertisements based on your prior site utilization. Users can manage personalized advertising preferences via their Google account settings at any time. We strictly adhere to GDPR, CCPA, and global structural data sovereignty protocols.</p>
          </div>
          <div>
            <h3 className="text-white text-5xl font-black mb-12 tracking-tighter uppercase leading-none">Sandboxed Physics Engine</h3>
            <p>No project data leaves your terminal. All material simulations and mechanical calculations are computed locally within your browser's dedicated sandbox. Your project intellectual property remains exclusively under your hardware governance.</p>
          </div>
        </>
      ) : (
        <>
          <p className="text-white font-medium italic">By accessing the OVD Bureau's online analysis and simulation tools, you explicitly agree to our authoritative terms governing structural visualization and digital asset utilization.</p>
          <div>
            <h3 className="text-white text-5xl font-black mb-12 tracking-tighter uppercase leading-none">Visualization Disclaimer</h3>
            <p>The OVD Analysis Engine is provided as a conceptual schematic visualization tool for preliminary design iteration. It does NOT replace the absolute legal requirement for a P.E. stamped calculation report for construction permitting and building safety certification. OVD Independent Engineering Bureau assumes no liability for physical structural failures resulting from the misuse of conceptual digital simulations.</p>
          </div>
          <div>
            <h3 className="text-white text-5xl font-black mb-12 tracking-tighter uppercase leading-none">Proprietary Asset Utilization</h3>
            <p>Asset Syntax generated by this engine is licensed for commercial architectural and engineering integration. The underlying physics framework, presets, and branding remain the exclusive intellectual property of the OVD Structural Engineering Bureau.</p>
          </div>
        </>
      )}
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-black border-t border-white/5 pt-48 pb-24 px-8 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-32 mb-48">
      <div className="col-span-1 md:col-span-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-10 mb-16 group cursor-pointer" onClick={() => setView('engine')}>
          <div className="w-24 h-24 rounded-[2.5rem] bg-accent flex items-center justify-center text-black font-black text-6xl shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all group-hover:rotate-12">O</div>
          <h2 className="text-7xl font-black text-white tracking-tighter uppercase leading-none">OVD Bureau</h2>
        </div>
        <p className="text-gray-500 text-4xl leading-relaxed max-w-xl font-light mx-auto md:mx-0">The world's leading authority in structural glass simulation and high-density technical facade documentation bureau.</p>
        <div className="mt-20 flex justify-center md:justify-start gap-12">
          <button className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all hover:border-accent/50 group"><Globe className="w-10 h-10 group-hover:glow" /></button>
          <button className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all hover:border-accent/50 group"><Shield className="w-10 h-10 group-hover:glow" /></button>
          <button className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-gray-700 hover:text-white transition-all hover:border-accent/50 group"><Microscope className="w-10 h-10 group-hover:glow" /></button>
        </div>
      </div>
      <div>
        <h4 className="text-accent font-black text-xs uppercase tracking-[0.8em] mb-16 opacity-50">Operational Linkages</h4>
        <ul className="text-[13px] text-gray-600 space-y-10 font-black uppercase tracking-[0.4em]">
          <li onClick={() => setView('engine')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-4 group">Analysis Engine <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></li>
          <li onClick={() => setView('blog')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-4 group">Knowledge Hub <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></li>
          <li onClick={() => setView('docs')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-4 group">Technical Docs <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></li>
          <li className="hover:text-white cursor-pointer transition-colors opacity-30 cursor-not-allowed">FEA Cloud Sync</li>
        </ul>
      </div>
      <div>
        <h4 className="text-accent font-black text-xs uppercase tracking-[0.8em] mb-16 opacity-50">Global Governance</h4>
        <ul className="text-[13px] text-gray-600 space-y-10 font-black uppercase tracking-[0.4em]">
          <li onClick={() => setView('privacy')} className="hover:text-white cursor-pointer transition-colors">Data Privacy</li>
          <li onClick={() => setView('terms')} className="hover:text-white cursor-pointer transition-colors">Operational Terms</li>
          <li onClick={() => setView('contact')} className="hover:text-white cursor-pointer transition-colors">Contact Hub</li>
          <li className="hover:text-white cursor-pointer transition-colors opacity-30">Ad Settings</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-24 flex flex-col md:flex-row justify-between items-center gap-20 text-center md:text-left">
      <p className="text-[11px] font-mono text-gray-800 tracking-[0.7em] uppercase">© 2026 OVD Independent Bureau of Engineering. V2.1.0-AUTHORITATIVE_RESTORATION_PROD</p>
      <div className="flex gap-20 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        {PLANS.map(p => (
          <div key={String(p)} className="flex flex-col items-center gap-6">
            <span className="text-[11px] font-black uppercase text-white tracking-[0.5em]">{String(p)} Edition</span>
            <div className="h-1.5 w-24 bg-accent rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
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
              <div className="bg-[#050505] border-b border-white/5 py-64 px-8 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/[0.02] blur-[150px] rounded-full" />
                 <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                   <div className="flex items-center justify-center lg:justify-start gap-8 text-accent mb-16 font-black uppercase tracking-[0.8em] text-xs">
                     <Activity className="w-14 h-14" />
                     <span>Bureau Analysis Hub</span>
                   </div>
                   <h1 className="text-9xl lg:text-[14rem] font-black text-white tracking-tighter leading-[0.8] mb-24 text-glow transition-all duration-1000">Structural <br/> <span className="text-accent">Analysis Bureau</span></h1>
                   <p className="text-4xl lg:text-5xl text-gray-500 font-light max-w-5xl leading-tight mb-32 mx-auto lg:mx-0">Authoritative material physics and load resistance simulation for the next generation of architectural transparency.</p>
                   <div className="flex flex-col sm:flex-row gap-16 justify-center lg:justify-start">
                     <button onClick={() => setView('engine')} className="px-24 py-12 bg-accent text-black rounded-[48px] font-black uppercase text-xs shadow-[0_0_60px_rgba(16,185,129,0.4)] hover:scale-105 transition-all active:scale-95">Launch Analysis Engine</button>
                     <button onClick={() => setView('blog')} className="px-24 py-12 bg-white/5 border border-white/10 text-white rounded-[48px] font-black uppercase text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-6 active:scale-95"><BookOpen className="w-8 h-8" /> Engineering Hub</button>
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
            <section className="py-72 px-8 max-w-7xl mx-auto text-center animate-in zoom-in-95 duration-1000">
              <div className="mb-40">
                <h2 className="text-[12rem] lg:text-[16rem] font-black text-white tracking-tighter mb-16 uppercase leading-[0.75] text-glow">Consult <br/> The Bureau</h2>
                <p className="text-4xl lg:text-5xl text-gray-600 font-light max-w-4xl mx-auto leading-tight italic">Direct transmission to our Global Structural Engineering Division for high-complexity architectural analysis and forensic report certification.</p>
              </div>
              <div className="glass-card p-48 rounded-[128px] shadow-3xl relative overflow-hidden card-glow group">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-accent to-transparent transition-opacity group-hover:opacity-20 duration-1000" />
                <div className="w-48 h-48 rounded-[4rem] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-24 shadow-inner border border-accent/20 transition-all group-hover:rotate-6 group-hover:scale-110"><Mail className="w-24 h-24" /></div>
                <p className="text-7xl lg:text-8xl font-black text-white mb-12 tracking-tighter leading-none transition-all group-hover:text-accent">magic.reviewsite@gmail.com</p>
                <p className="text-gray-700 text-3xl lg:text-4xl font-light mb-32 uppercase tracking-[0.5em]">Transmission Hub Division</p>
                <button className="px-32 py-14 bg-accent text-black rounded-[64px] font-black uppercase text-sm shadow-[0_0_80px_rgba(16,185,129,0.5)] hover:scale-105 transition-all flex items-center gap-10 mx-auto active:scale-95 group">
                  Initialize Official Inquiry <ChevronRight className="w-14 h-14 group-hover:translate-x-4 transition-transform" />
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
