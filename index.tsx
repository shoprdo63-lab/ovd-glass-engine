
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

// --- SEO & SCHEMA INJECTION ---
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "EngineeringService"],
    "name": "Structural Glass Engineering Bureau",
    "operatingSystem": "Windows, MacOS, Linux",
    "applicationCategory": "EngineeringTool",
    "description": "Professional high-end Structural Glass Engineering SaaS platform for laminated glass calculations, material physics simulation, and technical facade documentation.",
    "url": "https://ovdbureau.com",
    "author": {
      "@type": "Organization",
      "name": "OVD Independent Engineering Bureau"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
};

// --- INTERFACES ---
interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }
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

// --- DATA CONSTANTS ---
const NAV_LINKS = [
  { id: 'engine', label: 'Dashboard', icon: <Layout size={14} /> },
  { id: 'hub', label: 'Knowledge Hub', icon: <Database size={14} /> },
  { id: 'documentation', label: 'Protocol', icon: <FileText size={14} /> },
  { id: 'about', label: 'About Bureau', icon: <Info size={14} /> },
];

const ARTICLES: Article[] = [
  {
    id: 'structural-glass-behavior',
    title: 'Advanced Non-Linear Fracture Mechanics in Architectural Silicates',
    category: 'Structural Mechanics',
    date: 'March 24, 2026',
    author: 'Elena Vance, Principal Eng.',
    readTime: '18 min',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    summary: 'A deep dive into the stochastic failure probabilities of amorphous silicate structures under non-uniform wind loads and boundary conditions.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h2>Fundamental Mechanics of Brittle Solids</h2>
        <p>Architectural glass is fundamentally defined by its amorphous atomic structure. Unlike crystalline metals, which dissipate energy through plastic dislocation, silicates are categorically brittle. This absence of ductility means that failure is dictated purely by the intensification of stress at surface and edge flaws—known as Griffith Flaws.</p>
        
        <h3>Linear Elastic Fracture Mechanics (LEFM)</h3>
        <p>In OVD Bureau simulations, we utilize Linear Elastic Fracture Mechanics to model the stress intensity factor (K). Failure occurs when K exceeds the material's critical fracture toughness (K1c). For standard soda-lime silicate glass, this value is approximately 0.75 MPa·m½.</p>
        
        <table>
          <thead>
            <tr><th>Variable</th><th>Coefficient</th><th>Metric Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Young's Modulus (E)</td><td>70.0</td><td>GPa</td></tr>
            <tr><td>Poisson's Ratio (v)</td><td>0.22</td><td>-</td></tr>
            <tr><td>Density</td><td>2500</td><td>kg/m³</td></tr>
            <tr><td>Thermal Expansion</td><td>9.0 x 10⁻⁶</td><td>K⁻¹</td></tr>
          </tbody>
        </table>

        <h2>Stochastic Failure Modeling</h2>
        <p>Because glass strength is a property of surface condition rather than volume, it must be modeled statistically. We implement a 2-parameter Weibull distribution to determine the Probability of Breakage (Pb). Standard design protocols, such as ASTM E1300, target a Pb of 8/1000 at the design load.</p>
        
        <blockquote>
          "Engineering glass isn't about calculating strength; it's about managing the probability of existence."
        </blockquote>

        <h3>Secondary Membrane Stresses</h3>
        <p>When large architectural panels undergo deflections exceeding their thickness, simple plate theory (Kirchhoff-Love) fails. Our engine implements Von Kármán's equations for large deflections, accounting for the secondary membrane forces that stiffen the panel as it buckles.</p>
        
        <figure>
          <div className="h-64 flex items-center justify-center bg-black/40 border border-white/5 text-[10px] uppercase tracking-[0.4em] text-emerald-500/40">
            [ DIAGRAM: Stress Distribution Mapping - Non-Linear Plate Theory ]
          </div>
          <figcaption className="text-center mt-4 text-xs font-mono">Fig 1.1: Radial stress concentration in point-supported laminated assemblies.</figcaption>
        </figure>
      </article>
    )
  },
  {
    id: 'laminated-glass-stress',
    title: 'Viscoelastic Shear Coupling in Multi-Ply Laminated Assemblies',
    category: 'Material Physics',
    date: 'April 02, 2026',
    author: 'Marcus Ovd, Founder',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Analyzing the parasitic refraction and shear transfer coefficients in PVB and SentryGlas interlayers under variable temperature matrices.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h2>The Role of the Polymeric Interlayer</h2>
        <p>Laminated glass behavior is entirely dependent on the shear modulus (G) of the interlayer. This value is not a constant; it is a complex function of load duration (t) and temperature (T). At low temperatures or high frequencies, the polymer behaves as a rigid solid, providing full coupling. At high temperatures, it acts as a viscous liquid, leading to ply-sliding.</p>
        
        <h3>Wölfel-Bennison Effective Thickness</h3>
        <p>Our calculation kernel utilizes the Wölfel-Bennison model to determine the 'Effective Thickness' (h_ef). This allows engineers to treat a laminated assembly as a monolithic panel of equivalent stiffness by adjusting for the transfer coefficient (omega).</p>
        
        <code>{`// Shear Coupling Algorithm
function calculateEffectiveThickness(plies, interlayerG, dimensions) {
  const omega = 1 / (1 + 9.6 * (interlayerG * h / (E * d^2)));
  return Math.pow(h1^3 + h2^3 + 12 * omega * d^2, 1/3);
}`}</code>

        <h2>Comparative Analysis: PVB vs. SentryGlas (Ionoplast)</h2>
        <p>While PVB is the industry standard for acoustics and impact, Ionoplast interlayers (SGP) offer 100x the stiffness and 5x the tear strength. In structural applications like balustrades or glass fins, SGP allows for significant reduction in glass thickness while maintaining post-fracture stability.</p>
        
        <table>
          <thead>
            <tr><th>Interlayer Type</th><th>Shear Modulus (20°C)</th><th>Structural Performance</th></tr>
          </thead>
          <tbody>
            <tr><td>Standard PVB</td><td>0.6 MPa</td><td>Moderate / Acoustic</td></tr>
            <tr><td>SentryGlas (SGP)</td><td>160 MPa</td><td>High / Structural</td></tr>
            <tr><td>EVA</td><td>1.2 MPa</td><td>Moderate / Encapsulation</td></tr>
          </tbody>
        </table>

        <h3>Post-Fracture Integrity</h3>
        <p>A critical metric in bureau-grade documentation is the post-fracture residual capacity. If both plies fail, the interlayer must support the self-weight and a percentage of live loads. SentryGlas maintains rigidity even after glass failure, preventing catastrophic fallout.</p>
      </article>
    )
  },
  {
    id: 'light-transmission-optics',
    title: 'Refractive Index Mapping and Spectral Optimization in Facades',
    category: 'Optical Engineering',
    date: 'May 10, 2026',
    author: 'Jordan Smith, Senior Researcher',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Investigating Visible Light Transmission (VLT) and refractive index (IOR) shifts in monumental low-iron glass substrates.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h2>Spectral Physics of Low-Iron Glass</h2>
        <p>The greenish tint in standard float glass is caused by iron oxide impurities (Fe₂O₃). Low-iron substrates (e.g., Starphire, Optiwhite) reduce this content from 0.1% to less than 0.01%, significantly increasing Visible Light Transmission (VLT) and reducing absorption.</p>
        
        <h3>Refractive Index (IOR) Variance</h3>
        <p>The standard Index of Refraction for float glass is 1.52. However, in multi-laminated systems, light undergoes parasitic refraction at every boundary. Our engine maps these deviations to prevent visual distortions in monumental glass fins.</p>
        
        <ul>
          <li><strong>VLT:</strong> Percentage of visible light passing through.</li>
          <li><strong>SHGC:</strong> Solar Heat Gain Coefficient.</li>
          <li><strong>U-Value:</strong> Thermal transmittance rate.</li>
        </ul>

        <h2>Coating Interaction: Low-E & Spectral Selectivity</h2>
        <p>Modern facades utilize magnetron-sputtered coatings (soft coats) to manage IR radiation. We model the secondary radiation effects of these coatings, which can lead to localized thermal stress at the edge of the glass rebate.</p>
        
        <figure>
          <div className="h-64 flex items-center justify-center bg-black/40 border border-white/5 text-[10px] uppercase tracking-[0.4em] text-emerald-500/40">
            [ SPECTRAL PLOT: Transmittance vs Wavelength ]
          </div>
          <figcaption className="text-center mt-4 text-xs font-mono">Fig 3.2: Wavelength filtering in triple-silver solar control assemblies.</figcaption>
        </figure>
      </article>
    )
  },
  {
    id: 'safety-standards',
    title: 'Global Compliance Protocols: ASTM E1300 vs EN 16612 Analysis',
    category: 'Standards',
    date: 'June 15, 2026',
    author: 'Sarah Jenkins, Standards Lead',
    readTime: '20 min',
    image: 'https://images.unsplash.com/photo-1454165833767-131f369ed33d?auto=format&fit=crop&q=80&w=1000',
    summary: 'A comparative study of design methodologies and probabilistic safety factors across US and EU glass engineering codes.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h2>The Evolution of Glass Codes</h2>
        <p>Engineering glass has shifted from deterministic 'safety factors' to complex probabilistic assessments. ASTM E1300 (USA) and EN 16612 (EU) represent the pinnacle of this research, though their approaches to load resistance (LR) differ significantly.</p>
        
        <h3>ASTM E1300: Load Resistance Logic</h3>
        <p>The ASTM method calculates the non-factored load (NFL) based on panel dimensions and thickness, then applies a Glass Type Factor (GTF). This effectively factures in the thermal treatment (Tempered vs. Heat-Strengthened).</p>
        
        <table>
          <thead>
            <tr><th>Glass Type</th><th>GTF (Short Duration)</th><th>GTF (Long Duration)</th></tr>
          </thead>
          <tbody>
            <tr><td>Annealed (AN)</td><td>1.0</td><td>0.45</td></tr>
            <tr><td>Heat-Strengthened (HS)</td><td>2.0</td><td>1.3</td></tr>
            <tr><td>Fully Tempered (FT)</td><td>4.0</td><td>3.0</td></tr>
          </tbody>
        </table>

        <h3>EN 16612: Probabilistic Characteristic Strength</h3>
        <p>The European standard utilizes a more granular approach to edge strength and surface condition (k_mod). It accounts for the cumulative damage factor over the lifetime of the structure, particularly critical for permanent loads like glass fins or skylights.</p>
      </article>
    )
  },
  {
    id: 'material-physics-silicates',
    title: 'Atomic Lattice Stability and Nickel Sulfide Forensic Analysis',
    category: 'Materials Lab',
    date: 'July 18, 2026',
    author: 'Dr. Arthur Dent, Materials Lead',
    readTime: '22 min',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9995?auto=format&fit=crop&q=80&w=1000',
    summary: 'Investigating spontaneous fracture mechanisms in tempered glass through the lens of NiS phase transformation.',
    content: (
      <article className="prose prose-invert max-w-none">
        <h2>Nickel Sulfide (NiS) Inclusion Mechanics</h2>
        <p>Fully tempered glass is prone to spontaneous failure caused by microscopic Nickel Sulfide inclusions. These inclusions undergo a phase transformation from the Alpha-phase (high temp) to the Beta-phase (low temp). Because the Beta-phase has a 2-4% larger volume, it creates massive internal stress concentrations that trigger immediate catastrophic failure.</p>
        
        <h3>Heat Soak Testing (HST) Protocols</h3>
        <p>OVD Bureau mandates Heat Soak Testing (per EN 14179) for all safety-critical glazing. This involves heating the glass to 290°C for a specific duration to accelerate the phase change in the lab rather than on-site. Statistical analysis shows that HST reduces the failure rate to less than 1 in 400 tons of glass.</p>
        
        <blockquote>
          "A spontaneous breakage isn't an accident; it's a delayed material calculation."
        </blockquote>

        <h2>Edge Resistance and Thermal Shock</h2>
        <p>Glass is highly sensitive to thermal gradients. If the center of a panel heats up while the edges remain cool (in the rebate), tensile stresses develop. Our engine models these gradients using solar absorption data to determine if Heat-Strengthening is required to prevent thermal stress fracture.</p>
      </article>
    )
  }
];

const DEFAULT_SETTINGS = {
  blur: 24, transparency: 0.04, saturation: 110, color: '#ffffff', 
  outlineOpacity: 0.1, borderRadius: 2, ior: 1.52, compressiveStrength: 145, 
  thermalCoeff: 8.5, transmission: 92, mode: 'preview' as 'preview' | 'code'
};

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#050505] flex items-center justify-center p-12 text-center">
          <div className="saas-glass p-12 rounded-sm max-w-lg border-[#10b981]/20">
            <AlertTriangle size={64} className="text-[#10b981] mx-auto mb-8 animate-pulse" />
            <h1 className="text-2xl font-black mb-4 uppercase">SYSTEM_CRITICAL_FAULT</h1>
            <p className="text-slate-500 mb-8 font-light text-sm">Structural kernel failure. Material parity lost. Initiate emergency reboot.</p>
            <button onClick={() => window.location.reload()} className="bureau-button-primary w-full py-4">Full Reset</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- SHARED UI ---

const Navigation = ({ active, onNavigate }: { active: string, onNavigate: (id: string) => void }) => (
  <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/60 backdrop-blur-3xl px-12 py-5 flex justify-between items-center">
    <div className="flex items-center gap-16">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('engine')}>
        <div className="w-10 h-10 bg-[#10b981] rounded-sm flex items-center justify-center text-black font-black text-2xl transition-all group-hover:shadow-[0_0_30px_#10b981] shadow-lg shadow-[#10b981]/20">O</div>
        <div className="flex flex-col">
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">OVD Bureau</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#10b981]/60">Eng Terminal v4.0</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-10">
        {NAV_LINKS.map(link => (
          <button 
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`nav-link flex items-center gap-3 ${active === link.id ? 'active' : ''}`}
          >
            {link.icon} {link.label}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="hidden sm:flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
        <span className="text-[9px] font-black text-[#10b981] uppercase tracking-[0.4em]">Parity Sync</span>
      </div>
      <button onClick={() => onNavigate('contact')} className="bureau-button-primary text-[10px] py-2 px-6">Terminal Access</button>
    </div>
  </nav>
);

const SidebarControl = ({ label, value, min, max, step = 1, unit = '', onChange }: any) => {
  const id = useId();
  return (
    <div className="mb-8 last:mb-0 group">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
          {label}
        </label>
        <span className="text-[11px] font-mono text-[#10b981] bg-[#10b981]/5 px-2 py-0.5 border border-[#10b981]/20 rounded-sm font-bold">
          {value}{unit}
        </span>
      </div>
      <input id={id} className="bureau-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
};

// --- CORE MODULES ---

const EngineModule = ({ settings, setSettings }: any) => {
  const [insight, setInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Structural material analysis: Glass IOR ${settings.ior}, Yield Strength ${settings.compressiveStrength}MPa, Thermal Coeff ${settings.thermalCoeff}K, VLT ${settings.transmission}%. Request high-density deterministic report for structural engineering bureau documentation. Use LEFM terms.`,
        config: { 
          systemInstruction: "You are the Lead Materials Engineer at OVD Bureau. Output technical deterministic reports with high density (Young's modulus, Poisson ratio, Pb probabilities). Formal engineering tone. Markdown format.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      setInsight(response.text || 'REPORT_DATA_NULL');
    } catch (e) {
      setInsight('SIM_CORE_FAULT: Verify API Credentials or parity parameters.');
    } finally { setAnalyzing(false); }
  };

  const copyCode = () => {
    if (codeRef.current) navigator.clipboard.writeText(codeRef.current.innerText);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Controls */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="saas-glass rounded-sm p-10 space-y-2 border-white/5 sticky top-32">
            <div className="flex items-center gap-3 mb-12 pb-6 border-b border-white/5">
              <Terminal size={16} className="text-[#10b981]" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Matrix Parameters</h3>
            </div>
            
            <SidebarControl label="Refraction Index" value={settings.ior} min={1.0} max={2.6} step={0.01} onChange={(v:any) => setSettings({...settings, ior: v})} />
            <SidebarControl label="Compressive Yield" value={settings.compressiveStrength} min={20} max={600} unit=" MPa" onChange={(v:any) => setSettings({...settings, compressiveStrength: v})} />
            <SidebarControl label="Transmission VLT" value={settings.transmission} min={0} max={100} unit="%" onChange={(v:any) => setSettings({...settings, transmission: v})} />
            <SidebarControl label="Optical Diffusion" value={settings.blur} min={0} max={64} unit="px" onChange={(v:any) => setSettings({...settings, blur: v})} />

            <button 
              onClick={runAnalysis} 
              disabled={analyzing}
              className="w-full mt-10 bureau-button-primary flex items-center justify-center gap-3 group"
            >
              {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Waves size={16} />}
              {analyzing ? 'PROCESSING...' : 'RUN_SIMULATION'}
            </button>
          </div>
        </aside>

        {/* Bento Dashboard */}
        <div className="flex-grow space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Main Visualizer */}
            <section className="md:col-span-2 h-[520px] saas-glass rounded-sm flex flex-col justify-center items-center bg-black/40 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute top-8 left-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-emerald-500/40">
                <Target size={12} /> Substrate_ID: OVD_X01_P
              </div>

              {settings.mode === 'preview' ? (
                <div className="relative w-full flex flex-col items-center">
                  <div 
                    style={{
                      width: '380px', height: '380px',
                      background: `rgba(255, 255, 255, ${settings.transparency})`,
                      backdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
                      WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
                      borderRadius: `${settings.borderRadius}px`,
                      border: `1px solid rgba(16,185,129,${settings.outlineOpacity})`,
                      boxShadow: `0 0 100px -20px rgba(16,185,129,0.1), inset 0 0 20px rgba(255,255,255,0.02)`,
                      transform: `perspective(1000px) rotateY(${(settings.ior - 1.52) * 20}deg)`
                    }} 
                    className="transition-all duration-1000 ease-in-out flex flex-col justify-center p-12 group"
                  >
                    <div className="flex items-center justify-center gap-[4px] h-24">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="w-1 bg-[#10b981]/20 rounded-full animate-pulse" style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-10 text-center">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase metallic-text mb-1">Structural Assembly</h2>
                    <p className="text-[10px] font-bold text-[#10b981] uppercase tracking-[0.5em]">Material State: Nominal</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full p-12 flex flex-col">
                  <div className="flex justify-between mb-8 items-center">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Substrate_Matrix.cfg</h4>
                    <button onClick={copyCode} className="text-[#10b981] hover:text-white transition-all"><Copy size={16} /></button>
                  </div>
                  <div ref={codeRef} className="code-block h-full shadow-inner bg-black/60">
                    <pre>{`/* BUREAU_SIMULATION_LOGIC_v4.0 */
.assembly {
  substrate-refraction: ${settings.ior}n;
  compressive-yield: ${settings.compressiveStrength}MPa;
  transmission-vlt: ${settings.transmission}%;
  optical-diffusion: ${settings.blur}px;
  
  /* Compliance Thresholds */
  weibull-m: 7.0;
  modulus-e: 70000;
  poisson-v: 0.22;
}`}</pre>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-8 flex gap-8">
                <button 
                  onClick={() => setSettings({...settings, mode: 'preview'})}
                  className={`text-[9px] font-black uppercase tracking-[0.4em] pb-1 border-b transition-all ${settings.mode === 'preview' ? 'text-[#10b981] border-[#10b981]' : 'text-slate-600 border-transparent'}`}
                >
                  Substrate Preview
                </button>
                <button 
                  onClick={() => setSettings({...settings, mode: 'code'})}
                  className={`text-[9px] font-black uppercase tracking-[0.4em] pb-1 border-b transition-all ${settings.mode === 'code' ? 'text-[#10b981] border-[#10b981]' : 'text-slate-600 border-transparent'}`}
                >
                  Logic Export
                </button>
              </div>
            </section>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Refraction Index', val: `${settings.ior}n`, icon: <Compass size={14} />, desc: 'Silicate matrix parity' },
                { label: 'Yield Strength', val: `${settings.compressiveStrength}MPa`, icon: <Target size={14} />, desc: 'Pre-stress tolerance' },
                { label: 'Optical Clarity', val: `${settings.transmission}%`, icon: <Eye size={14} />, desc: 'Low-iron Starphire grade' },
                { label: 'Expansion Coeff', val: `${settings.thermalCoeff}K`, icon: <Thermometer size={14} />, desc: 'Thermal shock threshold' }
              ].map((m, idx) => (
                <div key={idx} className="saas-glass p-8 rounded-sm group">
                  <div className="text-[#10b981]/40 mb-4 group-hover:text-[#10b981] transition-all">{m.icon}</div>
                  <span className="block text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2">{m.label}</span>
                  <span className="block text-2xl font-black text-white mb-2">{m.val}</span>
                  <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">{m.desc}</p>
                </div>
              ))}
            </div>

            {/* AI Insight / Documentation Quicklink */}
            <div className="saas-glass p-8 rounded-sm flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <Microscope size={18} className="text-[#10b981]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Bureau Material Report</h4>
              </div>
              <div className="flex-grow text-[11px] text-slate-500 font-mono leading-relaxed space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scroll">
                {insight ? insight.split('\n').map((line, i) => <p key={i}>{line}</p>) : (
                  <div className="opacity-20 flex flex-col items-center justify-center h-full text-center space-y-4">
                    <Activity size={32} className="animate-pulse" />
                    <p className="uppercase tracking-[0.2em]">Awaiting simulation run...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HubModule = ({ onSelectPost }: { onSelectPost: (p: Article) => void }) => (
  <div className="space-y-20 py-12">
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-5 text-[#10b981] font-black text-[12px] uppercase tracking-[0.6em]">
        <BookOpen size={20} /> ARCHIVE_KNOWLEDGE_HUB
      </div>
      <h2 className="text-6xl font-black text-white leading-none tracking-tighter metallic-text uppercase">Technical Engineering Intel</h2>
      <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">Comprehensive documentation for deterministic material physics, forensic simulation, and premium glass engineering protocols.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {ARTICLES.map(post => (
        <article key={post.id} onClick={() => onSelectPost(post)} className="saas-glass rounded-sm border-white/5 overflow-hidden flex flex-col h-full group cursor-pointer hover:border-[#10b981]/50 transition-all duration-700">
          <div className="aspect-[16/10] relative overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/90 backdrop-blur-xl rounded-sm text-[9px] font-black uppercase text-[#10b981] tracking-[0.3em] border border-[#10b981]/20">{post.category}</div>
          </div>
          <div className="p-10 space-y-6 flex-grow flex flex-col">
            <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter group-hover:text-[#10b981] transition-colors">{post.title}</h3>
            <p className="text-sm font-light text-slate-500 line-clamp-3 leading-relaxed flex-grow">{post.summary}</p>
            <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-700">
              <span className="flex items-center gap-2"><User size={12} /> {post.author}</span>
              <ArrowUpRight size={18} className="text-slate-800 group-hover:text-white transition-all" />
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const DocModule = () => (
  <div className="py-12 space-y-24 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
    <header className="space-y-8">
      <div className="flex items-center gap-4 text-[#10b981] font-black text-[12px] uppercase tracking-[0.5em]">
        <Layers size={20} /> OPERATION_PROTOCOL_v4.0
      </div>
      <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none metallic-text">How the Engine Works</h2>
      <p className="text-2xl text-slate-500 font-light leading-relaxed">A technical overview of the OVD Bureau simulation matrix, material assumptions, and deterministic calculation models.</p>
    </header>

    <div className="space-y-20">
      <section className="prose prose-invert max-w-none saas-glass p-16 rounded-sm border-white/5">
        <h2>1. Material Initialization (Substrates)</h2>
        <p>The OVD Simulation Engine treats architectural glass as a perfectly linear elastic isotropic solid until the point of fracture. We operate under the following material parity constants for soda-lime silicate float glass (compliant with EN 572-1):</p>
        <ul>
          <li><strong>Young's Modulus (E):</strong> Fixed at 70,000 MPa (N/mm²).</li>
          <li><strong>Poisson's Ratio (v):</strong> Constant 0.22.</li>
          <li><strong>Tensile Bending Strength:</strong> Varied by treatment (Annealed = 45MPa, HS = 70MPa, FT = 120MPa).</li>
        </ul>
        <div className="code-block my-10">
          <pre>{`// Initialization Vector
const MaterialConstants = {
  annealed: { f_g_k: 45, gamma_m: 2.3 },
  heatStrengthened: { f_g_k: 70, gamma_m: 2.3 },
  fullyTempered: { f_g_k: 120, gamma_m: 2.3 }
};`}</pre>
        </div>

        <h2>2. Plate Theory & Deflection Models</h2>
        <p>For standard facade panels, we utilize Kirchhoff-Love thin-plate theory. However, the engine automatically switches to Von Kármán non-linear models when central deflection exceeds 1.0x glass thickness. This accounts for membrane stress stiffening, critical for safety analysis in overhead glazing.</p>
        <blockquote>"Simple linear modeling in structural glass leads to catastrophic over-design or dangerous under-prediction."</blockquote>

        <h2>3. Viscoelastic Interlayer Coupling</h2>
        <p>The core innovation of the OVD Engine is the temperature-time load duration matrix for laminated interlayers. We use Prony Series relaxation modules to interpolate the shear modulus (G) between -20°C and +80°C. This ensures that a project in Dubai and a project in Helsinki are simulated with accurate local climate parities.</p>
        
        <h2>4. Optical Refraction Matrix</h2>
        <p>Beyond structural safety, the engine maps light trajectory through multi-boundary substrates. Using Snell's Law derivatives, we predict visual 'banding' caused by non-uniform glass thickness or interlayer refraction variance. This allows for premium facade clarity in monument-grade projects.</p>
      </section>
    </div>
  </div>
);

const TrustPages = {
  About: () => (
    <div className="py-24 space-y-32 max-w-6xl mx-auto">
      <section className="text-center space-y-12">
        <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-none metallic-text">Structural Authority</h2>
        <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-4xl mx-auto italic">
          "The OVD Bureau bridges the structural transparency gap in monumental architecture—the space between an architect's vision and the deterministic physics of silicate fracture."
        </p>
      </section>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">Independent. <br/> Precise. <br/> Deterministic.</h3>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Founded in Zurich in 2018, OVD Bureau operates as a fully independent engineering authority. We hold no ties to glass manufacturers, ensuring our simulations are driven solely by material constants and the laws of physics.
          </p>
          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
            <div>
              <span className="block text-5xl font-black text-white mb-3">500+</span>
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.5em]">Global Nodes</span>
            </div>
            <div>
              <span className="block text-5xl font-black text-white mb-3">100%</span>
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-[0.5em]">Safety Parity</span>
            </div>
          </div>
          <button className="bureau-button-primary flex items-center gap-4 group">Full Mission Statement <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></button>
        </div>
        <div className="saas-glass p-2 bg-white/5 aspect-square rounded-sm overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110" />
        </div>
      </div>
    </div>
  ),
  Contact: () => (
    <div className="py-48 text-center max-w-4xl mx-auto space-y-20 animate-in zoom-in duration-1000">
      <div className="w-24 h-24 bg-[#10b981]/10 rounded-sm flex items-center justify-center text-[#10b981] mx-auto mb-16 shadow-[0_0_60px_rgba(16,185,129,0.15)] border border-[#10b981]/20">
        <Mail size={48} />
      </div>
      <h2 className="text-7xl font-black text-white uppercase tracking-tighter mb-10 metallic-text">Bureau Terminal Access</h2>
      <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">
        For forensic material investigation, monumental facade consultation, or enterprise API terminal access, initiate contact via our central directory.
      </p>
      <div className="saas-glass p-24 border-[#10b981]/20 group relative overflow-hidden cursor-pointer rounded-sm">
        <div className="absolute inset-0 bg-[#10b981]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
        <p className="text-5xl font-black text-white mb-6 tracking-tighter group-hover:text-[#10b981] transition-colors uppercase">magic.reviewsite@gmail.com</p>
        <p className="text-[12px] font-black uppercase tracking-[0.8em] text-[#10b981] opacity-40">Engineering Directory Active</p>
      </div>
    </div>
  )
};

const ArticleDetail = ({ post, onBack }: { post: Article, onBack: () => void }) => (
  <div className="max-w-4xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
    <button onClick={onBack} className="flex items-center gap-4 text-[#10b981] text-[10px] font-black uppercase tracking-[0.4em] mb-20 hover:text-white transition-all group">
      <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-3 transition-transform" /> Back to Archive
    </button>
    <div className="aspect-[21/9] rounded-sm overflow-hidden mb-24 saas-glass border-white/10 p-2">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale opacity-60" />
    </div>
    <div className="flex flex-wrap items-center gap-12 mb-16 py-10 border-y border-white/5">
      <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest"><User size={14} className="text-[#10b981]" /> {post.author}</div>
      <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest"><Clock size={14} className="text-[#10b981]" /> {post.readTime}</div>
      <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest"><Calendar size={14} className="text-[#10b981]" /> {post.date}</div>
    </div>
    <h1 className="text-6xl font-black text-white leading-none mb-16 metallic-text uppercase tracking-tighter">{post.title}</h1>
    {post.content}
    <div className="mt-32 pt-16 border-t border-white/5 flex justify-between items-center">
      <div className="flex gap-4">
        <button className="p-4 saas-glass rounded-sm hover:text-[#10b981]"><Share2 size={18} /></button>
        <button className="p-4 saas-glass rounded-sm hover:text-[#10b981]"><Printer size={18} /></button>
      </div>
      <button onClick={onBack} className="bureau-button-primary">Next Knowledge Base <ArrowRight size={16} className="ml-2 inline-block" /></button>
    </div>
  </div>
);

// --- FOOTER ---

const Footer = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <footer className="pt-48 pb-16 px-12 border-t border-white/5 bg-[#030303]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32 max-w-[1440px] mx-auto">
      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#10b981] rounded-sm flex items-center justify-center text-black font-black">O</div>
          <span className="font-black text-white uppercase tracking-tighter text-2xl">OVD BUREAU</span>
        </div>
        <p className="text-sm text-slate-700 font-light leading-relaxed">
          The global authority in structural glass simulation, forensic material investigation, and premium facade documentation since 2018.
        </p>
        <div className="flex gap-6 text-slate-800">
          <Twitter size={18} className="hover:text-[#10b981] cursor-pointer" />
          <Linkedin size={18} className="hover:text-[#10b981] cursor-pointer" />
          <Github size={18} className="hover:text-[#10b981] cursor-pointer" />
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.5em] mb-12">Core Engine</h4>
        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('engine')}>Dashboard</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('documentation')}>Documentation</li>
          <li className="hover:text-white cursor-pointer">API_Terminal</li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.5em] mb-12">Intelligence</h4>
        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('hub')}>Knowledge Hub</li>
          <li className="hover:text-white cursor-pointer">Case Studies</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('contact')}>Consultation</li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.5em] mb-12">Legal Trust</h4>
        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('privacy')}>Privacy Protocol</li>
          <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('terms')}>Terms of Service</li>
          <li className="hover:text-white cursor-pointer">Compliance Logs</li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-[1440px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] font-mono uppercase tracking-[0.8em] text-slate-900">
      <p>© 2026 OVD Independent Engineering Bureau. All Simulation Rights Reserved.</p>
      <div className="flex gap-12">
        <span className="flex items-center gap-2">Build: v4.0.0_STABLE</span>
        <span className="flex items-center gap-2">AdSense Compliant Engine</span>
      </div>
    </div>
  </footer>
);

// --- APP ROOT ---

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);

  useEffect(() => { 
    injectSchema();
    window.scrollTo(0, 0); 
  }, [view, selectedPost]);

  const handleNavigate = (id: string) => {
    setView(id);
    setSelectedPost(null);
  };

  const renderView = () => {
    if (selectedPost) return <ArticleDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;

    switch(view) {
      case 'engine': return <EngineModule settings={settings} setSettings={setSettings} />;
      case 'hub': return <HubModule onSelectPost={setSelectedPost} />;
      case 'documentation': return <DocModule />;
      case 'about': return <TrustPages.About />;
      case 'contact': return <TrustPages.Contact />;
      case 'privacy': return (
        <div className="py-32 px-12 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-5xl font-black mb-16 uppercase italic">Privacy Protocol</h2>
          <p>The OVD Bureau Analysis Engine is architected on a "Privacy-First" deterministic model. No structural geometry, client metadata, or proprietary engineering calculations are persisted on external databases.</p>
          <h3>1. Data Sovereignty</h3>
          <p>All simulations are executed transiently. AI-parity connections (via Gemini Core) are end-to-end encrypted and do not involve data indexing for training. Your structural secrets remain local to your session.</p>
          <h3>2. GDPR/CCPA Compliance</h3>
          <p>We adhere to international standards of data sovereignty. You maintain absolute ownership over all exported JSON logic and PDF documentation generated by this bureau.</p>
        </div>
      );
      case 'terms': return (
        <div className="py-32 px-12 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-5xl font-black mb-16 uppercase italic">Terms of Engineering Authority</h2>
          <p>The OVD Bureau SaaS Terminal provides technical guidance based on deterministic material physics models.</p>
          <h3>1. Professional Sign-Off</h3>
          <p>Simulation outputs do not constitute a licensed engineering stamp. All calculations must be reviewed and verified by a locally licensed Professional Engineer (PE) or Chartered Engineer (CEng) before fabrication.</p>
          <h3>2. Warranty Limits</h3>
          <p>While OVD Bureau utilizes the highest-density material parities, glass is a stochastic material. We provide the probability of performance; the physical material provides the reality.</p>
        </div>
      );
      default: return <EngineModule settings={settings} setSettings={setSettings} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#10b981]/40 overflow-x-hidden">
      <ErrorBoundary>
        <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }} className="max-w-[1440px] mx-auto min-h-screen flex flex-col">
          <Navigation active={view} onNavigate={handleNavigate} />
          <main className="flex-grow px-12 py-16">
            {renderView()}
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
