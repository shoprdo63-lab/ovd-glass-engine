
import './globals.css';
import React, { useState, useId, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Layers, Zap, Terminal, Copy, Menu, X, Wind, Shield, Database, 
  Settings, BookOpen, UserCheck, FileText, ChevronRight, Globe, Scale, 
  Activity, Sun, Mail, Clock, CheckCircle, AlertTriangle, 
  Thermometer, Glasses, Microscope, ArrowUpRight, Sparkles, Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- ERROR BOUNDARY ---
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Fix: Use Component directly from react imports and include a constructor to properly initialize state/props for TS.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error("CRITICAL_OVD_SYS_ERR:", error, errorInfo); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-md w-full glass-card p-12 rounded-3xl text-center border-red-500/20 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-6" />
            <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{String("System Malfunction")}</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed font-light">{String("The material simulation core encountered a critical rendering exception. The environment has been locked to maintain data integrity.")}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-red-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all">{String("Restore Engine")}</button>
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

const PLANS = [
  { name: "Essential", description: "Standard monolithic analysis tools for schematic design.", price: "$299/mo" },
  { name: "Standard", description: "Advanced IGU and Laminated composite modeling bureau.", price: "$899/mo" },
  { name: "Enterprise", description: "Custom physics engines and forensic investigation.", price: "Custom" }
];

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

// --- CONTENT REPOSITORY ---
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

### 2. Griffith Crack Theory and Fracture Energy
The fundamental equation of glass strength relates the applied stress (σ) to the critical crack length (a). Energy must be balanced between the elastic strain energy released as the crack grows and the surface energy required to create new material surfaces. In architectural applications, we must assume a density of flaws (number of flaws per unit area) to calculate the probability of a critical flaw aligning with the maximum tensile stress vector.

### 3. The Compressive vs. Tensile Strength Paradox
One of the most profound paradoxes in material science is the strength of glass. In pure laboratory compression, glass can withstand pressures exceeding 1,000 MPa, potentially rivaling high-performance structural alloys. However, because its amorphous structure cannot dissipate energy through grain-boundary dislocation, it is exceptionally weak in tension. Standard annealed glass is assigned a design tensile strength of approximately 24 MPa. Modern engineering overcomes this by utilizing 'thermal toughening,' a process that locks the outer surfaces in permanent compression. This 'compressive skin' must be physically overcome by external loads before any tensile force can activate a surface flaw.

### 4. Young's Modulus and Poisson's Ratio in Digital Simulation
Calculations within the OVD Glass Engine are grounded in established material constants: a Young's Modulus (E) of 70,000 MPa and a Poisson's Ratio (ν) of 0.22. These values govern the elastic deflection of a pane under atmospheric pressures. Understanding these constants is vital for predicting 'membrane stresses'—the secondary stresses that occur when a thin panel undergoes large-scale deflection relative to its thickness.

### 5. Probabilistic Safety Factors: The Weibull Distribution
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
    <nav className="sticky top-0 z-50 glass-card border-b border-white/5 py-4 px-6 lg:px-12 flex justify-between items-center transition-all duration-300 backdrop-blur-3xl">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('engine')}>
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-black text-2xl shadow-xl transition-transform group-hover:scale-110">O</div>
        <div className="hidden sm:block">
          <h1 className="text-base font-black text-white tracking-tighter leading-none uppercase">{String("OVD Bureau")}</h1>
          <p className="text-[8px] text-accent font-bold tracking-[0.3em] mt-1 uppercase leading-none opacity-80">{String("Structural Engine")}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-10">
        {items.map(item => (
          <button 
            key={String(item.id)} 
            onClick={() => setView(String(item.id))} 
            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-apple ${view === item.id ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
          >
            {String(item.label)}
          </button>
        ))}
        <button onClick={() => setView('contact')} className="px-6 py-2.5 bg-white text-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-apple active:scale-95">{String("Inquire")}</button>
      </div>
      <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle Menu">{mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-8 flex flex-col gap-8 lg:hidden animate-in slide-in-from-top-4 backdrop-blur-3xl">
          {items.map(item => (
            <button key={String(item.id)} onClick={() => { setView(String(item.id)); setMobileMenu(false); }} className="text-left text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{String(item.label)}</button>
          ))}
          <button onClick={() => { setView('contact'); setMobileMenu(false); }} className="w-full py-4 bg-accent text-black rounded-xl font-black uppercase tracking-widest text-[11px]">{String("Consult Bureau")}</button>
        </div>
      )}
    </nav>
  );
};

const PreciseControl = ({ label, value, min, max, step = 1, unit = '', onChange }: { label: string, value: number, min: number, max: number, step?: number, unit?: string, onChange: (v: number) => void }) => {
  const id = useId();
  return (
    <div className="mb-5 relative slider-container group">
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={id} className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] group-hover:text-gray-400 transition-colors">{String(label)}</label>
        <span className="text-[11px] text-accent font-mono bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
          {String(value)}{String(unit)}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      </div>
    </div>
  );
};

const Dashboard = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const [aiInsight, setAiInsight] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const analyzeMaterial = async () => {
    setLoadingAi(true);
    setAiInsight('');
    try {
      // Re-initialize GoogleGenAI right before the call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Perform a detailed structural engineering analysis for architectural glass: 
        IOR: ${settings.ior}, 
        Strength: ${settings.compressiveStrength} MPa, 
        Thermal Coeff: ${settings.thermalCoeff}, 
        Transmission: ${settings.transmission}%.`,
        config: {
          systemInstruction: "You are a senior structural facade engineer at OVD Bureau.",
        }
      });
      // Corrected: accessing response.text property (not a method)
      setAiInsight(response.text || String("Analysis node offline."));
    } catch (err) {
      console.error(err);
      setAiInsight(String("Critical failure in Bureau AI communication link."));
    } finally {
      setLoadingAi(false);
    }
  };

  const shadow = calculateShadow(settings.lightAngle, 10);
  const rgb = hexToRgb(settings.color);
  const effectiveTrans = (settings.transmission / 100) * settings.transparency;
  const effectiveSat = settings.saturation * (settings.ior / 1.52);

  const cssCode = `.ovd-glass {
  background: rgba(${rgb}, ${effectiveTrans.toFixed(2)});
  backdrop-filter: blur(${settings.blur}px) saturate(${effectiveSat.toFixed(0)}%);
  border-radius: ${settings.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});
  box-shadow: ${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity});
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700">
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card p-6 rounded-2xl shadow-2xl space-y-8 card-glow transition-apple">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <Settings className="w-5 h-5 text-accent" />
              <h3 className="text-xs font-black text-white uppercase tracking-[0.5em]">{String("Material Matrix")}</h3>
            </div>
            <button onClick={analyzeMaterial} disabled={loadingAi} className="p-2 bg-accent/10 border border-accent/30 rounded-lg text-accent hover:bg-accent/20 transition-all active:scale-95">
              {loadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </button>
          </div>
          <div className="space-y-1">
            <PreciseControl label="Analysis Blur" value={settings.blur} min={0} max={64} onChange={v => setSettings({...settings, blur: v})} unit="px" />
            <PreciseControl label="Refractive Index" value={settings.ior} min={1.0} max={2.5} step={0.01} onChange={v => setSettings({...settings, ior: v})} />
            <PreciseControl label="Compressive Capacity" value={settings.compressiveStrength} min={20} max={500} onChange={v => setSettings({...settings, compressiveStrength: v})} unit=" MPa" />
            <PreciseControl label="Thermal Expansion" value={settings.thermalCoeff} min={0} max={20} step={0.1} onChange={v => setSettings({...settings, thermalCoeff: v})} unit=" ×10⁻⁶" />
            <PreciseControl label="Transmission Ratio" value={settings.transmission} min={0} max={100} onChange={v => setSettings({...settings, transmission: v})} unit="%" />
          </div>
        </div>
        {aiInsight && (
          <div className="glass-card p-6 rounded-2xl border-accent/20 shadow-2xl animate-in slide-in-from-left-4">
            <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> {String("Bureau Intelligence")}
            </h4>
            <div className="text-xs text-gray-400 leading-relaxed font-light prose-invert prose-p:mb-3">
              {aiInsight.split('\n').map((line, i) => <p key={i}>{String(line)}</p>)}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="aspect-[16/9] bg-[#020202] border border-white/10 rounded-[32px] relative flex items-center justify-center shadow-[inset_0_0_80px_rgba(0,0,0,1)] overflow-hidden card-glow">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
          <div style={{
            backgroundColor: `rgba(${rgb}, ${effectiveTrans})`,
            backdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${effectiveSat}%)`,
            borderRadius: `${settings.borderRadius}px`,
            border: `1px solid rgba(255,255,255,${settings.outlineOpacity})`,
            boxShadow: `${shadow.x}px ${shadow.y}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowOpacity})`,
            transform: `perspective(1200px) rotateY(${(settings.ior - 1.5) * 8}deg)`,
          }} className="w-[80%] h-[60%] flex flex-col p-8 transition-apple relative group">
            <div className="flex justify-between items-start mb-auto relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md"><Layers className="text-white w-7 h-7" /></div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 mb-3">{String("Bureau_Analysis")}</p>
                <p className="text-[12px] font-black text-white/80 font-mono tracking-tighter uppercase leading-none">{String("ID:")} {String(settings.ior).replace('.','')}_SAFE</p>
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-2xl font-black text-white mb-6 tracking-tighter leading-none">{String("Structural Simulation")}</h4>
              <p className="text-white/40 text-base leading-relaxed font-light">
                {String("Authoritative mapping:")} <span className="text-white/90 font-bold">{String(settings.compressiveStrength)}MPa</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-50 shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.6em] flex items-center gap-4">
              <Terminal className="w-6 h-6 text-accent" /> {String("Asset Syntax")}
            </h3>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all flex items-center gap-3 shadow-xl">
              <Copy className="w-4 h-4" /> {String("Copy Protocol")}
            </button>
          </div>
          <div className="bg-black/95 p-6 rounded-2xl text-xs font-mono leading-relaxed border border-white/5 overflow-x-auto whitespace-pre selection:bg-accent/20">
            <code className="text-emerald-400">{String(cssCode)}</code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {PRESETS.map((p, idx) => (
            <button key={String(idx)} onClick={() => setSettings(p.settings)} className="glass-card group p-6 rounded-[24px] text-left hover:scale-[1.02] transition-all active:scale-95 border-transparent hover:border-accent/40">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 group-hover:text-accent transition-colors">{String(p.category)}</p>
                <Database className="w-5 h-5 text-gray-700" />
              </div>
              <h4 className="text-xl font-black text-white group-hover:text-accent transition-colors leading-none">{String(p.name)}</h4>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomepagePillar = () => (
  <article className="py-24 bg-page border-t border-white/5 relative overflow-hidden">
    <div className="prose prose-invert prose-emerald lg:prose-xl max-w-4xl mx-auto px-4">
      <h1 className="text-4xl lg:text-5xl mb-12 text-white">{String("Professional Structural Glass Engineering Bureau")}</h1>
      <p className="lead text-xl text-accent font-bold mb-16 leading-relaxed">{String("The definitive architectural framework for material safety, mechanical limits, and global compliance optimization.")}</p>
      <p>{String("Architectural glass is a technically complex material in modern construction. While perceived as fragile, advanced glass assemblies serve as critical structural members in the global skyscraper race. This authority report, curated by the OVD Independent Engineering Bureau, explores the intersection of material science and building code compliance.")}</p>
      <section className="bg-panel p-12 rounded-[40px] border border-white/5 my-24 shadow-2xl">
        <h2 className="mt-0 flex items-center gap-6 text-white text-3xl leading-tight uppercase"><Scale className="text-accent w-12 h-12" /> {String("1. Physics of Structural Glass")}</h2>
        <p>{String("At the molecular level, architectural glass is an amorphous solid—a material that behaves like a solid but lacks the ordered crystalline structure found in metals. Structural engineering for glass is therefore an exercise in probability management using models like the Weibull distribution.")}</p>
      </section>
      <h2 className="text-3xl text-white mb-10 uppercase tracking-tighter">{String("2. Global Regulatory Landscape")}</h2>
      <p>{String("Engineering glass is governed by mandates to prevent life-safety risks. Standards such as ASTM E1300 in North America and EN 12600 in Europe establish load resistance based on area, thickness, and aspect ratio.")}</p>
    </div>
  </article>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-black border-t border-white/10 pt-24 pb-16 px-6 lg:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-6 mb-10 group cursor-pointer" onClick={() => setView('engine')}>
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-black font-black text-2xl shadow-2xl transition-all group-hover:scale-110">O</div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">{String("OVD Bureau")}</h2>
        </div>
        <p className="text-gray-500 text-base leading-relaxed max-w-md font-light">{String("Global authority in structural glass simulation and high-density technical facade documentation bureau services.")}</p>
      </div>
      <div>
        <h4 className="text-accent font-black text-[10px] uppercase tracking-[0.5em] mb-10 opacity-60">{String("Operational Hub")}</h4>
        <ul className="text-[10px] text-gray-600 space-y-6 font-black uppercase tracking-[0.3em]">
          <li onClick={() => setView('engine')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-4">{String("Engine Terminal")} <ArrowUpRight className="w-4 h-4" /></li>
          <li onClick={() => setView('blog')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-4">{String("Knowledge hub")} <ArrowUpRight className="w-4 h-4" /></li>
        </ul>
      </div>
      <div>
        <h4 className="text-accent font-black text-[10px] uppercase tracking-[0.5em] mb-10 opacity-60">{String("Governance")}</h4>
        <ul className="text-[10px] text-gray-600 space-y-6 font-black uppercase tracking-[0.3em]">
          <li onClick={() => setView('privacy')} className="hover:text-white cursor-pointer transition-colors">{String("Data Privacy")}</li>
          <li onClick={() => setView('terms')} className="hover:text-white cursor-pointer transition-colors">{String("Bureau Terms")}</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
      <p className="text-[9px] font-mono text-gray-800 tracking-[0.6em] uppercase">{String("© 2026 OVD Bureau of Structural Engineering. V2.1.0-STABLE")}</p>
    </div>
  </footer>
);

const App = () => {
  const [view, setView] = useState('engine');
  const [activePost, setActivePost] = useState<string | null>(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleNav = (v: string) => {
    setView(String(v));
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (id: string) => {
    setActivePost(String(id));
    setView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1280px] mx-auto text-[14px] scale-[0.9] origin-top shadow-2xl bg-black min-h-screen">
      <ErrorBoundary>
        <div className="flex flex-col bg-black selection:bg-accent/40 selection:text-white overflow-x-hidden">
          <Navigation view={view} setView={handleNav} />
          <main className="flex-1 px-4 lg:px-8">
            {view === 'engine' && (
              <div className="py-20">
                <header className="mb-20 relative z-10 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-8 text-accent mb-10 font-black uppercase tracking-[0.7em] text-[10px]">
                    <Activity className="w-10 h-10 animate-pulse" />
                    <span>{String("Bureau Analysis Division")}</span>
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-[0.75] mb-12 text-glow uppercase">{String("Structural Analysis Bureau")}</h1>
                  <p className="text-xl text-gray-600 font-light max-w-4xl leading-tight mb-16 mx-auto lg:mx-0 italic">{String("Authoritative material physics and structural load resistance simulation for high-complexity architectural bureau reports.")}</p>
                </header>
                <Dashboard settings={settings} setSettings={setSettings} />
                <HomepagePillar />
              </div>
            )}
            {view === 'blog' && (
               <div className="py-20">
                 <h2 className="text-5xl font-black text-white tracking-tighter mb-12 uppercase">{String("Engineering Archive")}</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {BLOG_POSTS.map(post => (
                     <article key={String(post.id)} className="glass-card group p-10 rounded-[40px] flex flex-col hover:border-accent/50 transition-all cursor-pointer" onClick={() => handlePostClick(post.id)}>
                       <span className="text-accent text-[10px] font-black uppercase tracking-widest mb-6">{String(post.category)}</span>
                       <h3 className="text-xl font-black text-white mb-6 leading-tight group-hover:text-accent transition-colors">{String(post.title)}</h3>
                       <p className="text-gray-500 text-sm font-light mb-10 line-clamp-3">{String(post.summary)}</p>
                       <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-700">
                         <span>{String(post.date)}</span>
                         <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                       </div>
                     </article>
                   ))}
                 </div>
               </div>
            )}
            {view === 'blog-detail' && activePost && (
               <div className="py-20 max-w-4xl mx-auto">
                 <button onClick={() => handleNav('blog')} className="text-accent mb-16 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] group">
                   <div className="rotate-180 group-hover:-translate-x-2 transition-transform"><ChevronRight className="w-6 h-6" /></div> {String("Back to Archive")}
                 </button>
                 <article className="prose prose-invert prose-emerald max-w-none">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">{String(BLOG_POSTS.find(p => p.id === activePost)?.title)}</h1>
                    <div className="whitespace-pre-wrap text-gray-400 font-light text-lg leading-relaxed">
                      {String(BLOG_POSTS.find(p => p.id === activePost)?.content)}
                    </div>
                 </article>
               </div>
            )}
            {view === 'docs' && (
              <div className="py-20 max-w-5xl mx-auto">
                <h2 className="text-5xl font-black text-white tracking-tighter mb-16 uppercase">{String("Bureau Framework")}</h2>
                <div className="grid gap-12">
                   {[
                     { title: "Analysis Logic", desc: "The OVD engine utilize real-time structural refraction." },
                     { title: "Bureau Parameters", desc: "Indices of refraction, compression limits, and thermal alpha constants." }
                   ].map((doc, idx) => (
                     <div key={idx} className="glass-card p-12 rounded-[48px] border-white/10 hover:border-accent/40 transition-all group">
                       <h3 className="text-white font-black text-2xl mb-6 uppercase tracking-tighter group-hover:text-accent transition-colors">{String(doc.title)}</h3>
                       <p className="text-gray-500 text-lg font-light leading-relaxed">{String(doc.desc)}</p>
                     </div>
                   ))}
                </div>
              </div>
            )}
            {view === 'privacy' && (
              <div className="py-20 max-w-3xl mx-auto">
                 <h2 className="text-4xl font-black text-white tracking-tighter mb-12 uppercase">{String("Privacy Bureau")}</h2>
                 <p className="text-gray-500 text-lg leading-relaxed font-light">{String("Zero-persistence architecture policy.")}</p>
              </div>
            )}
            {view === 'terms' && (
              <div className="py-20 max-w-3xl mx-auto">
                 <h2 className="text-4xl font-black text-white tracking-tighter mb-12 uppercase">{String("Bureau Terms")}</h2>
                 <p className="text-gray-500 text-lg leading-relaxed font-light">{String("Conceptual schematic tool disclaimer.")}</p>
              </div>
            )}
            {view === 'contact' && (
              <section className="py-32 text-center animate-in zoom-in-95 duration-1000">
                <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-10 uppercase leading-[0.7]">{String("Inquiry")}</h2>
                <div className="glass-card p-20 rounded-[80px] shadow-3xl relative overflow-hidden group max-w-3xl mx-auto border border-white/10 hover:border-accent/40 transition-all">
                  <div className="w-16 h-16 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-12 border border-accent/20 transition-all"><Mail className="w-8 h-8" /></div>
                  <p className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tighter transition-all group-hover:text-accent">{String("magic.reviewsite@gmail.com")}</p>
                  <p className="text-gray-700 text-xl font-light mb-12 uppercase tracking-[0.5em]">{String("Transmission Bureau Division")}</p>
                </div>
              </section>
            )}
          </main>
          <Footer setView={handleNav} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

// --- BOOTSTRAP ---
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
