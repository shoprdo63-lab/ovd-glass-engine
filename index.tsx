
import './globals.css';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Database, Crosshair, Command, Settings, Monitor, Compass, 
  Copy, CheckCircle2, Terminal, Cpu, ArrowUpRight, Globe, Lock, 
  Loader2, Activity, Shield, Code, Server, Search, HardDrive, 
  Cpu as CpuIcon, FileCode, Zap, AlertTriangle, ChevronRight, Menu, X, BookOpen, 
  ShieldCheck, HelpCircle, Scale, Gavel, UserCheck, Calendar, Clock, Share2, Mail
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TELEMETRY & SYSTEM CONSTANTS ---
// Added ENC_PROTOCOL and RUNTIME_STATUS to resolve property access errors
const METADATA = {
  NODE_ID: "BUREAU_7X_ORBITAL",
  VERSION: "4.2.1_ENTERPRISE",
  LOAD_CLASS: "AERO_SPEC_S1",
  AUTH_LEVEL: "BUREAU_LEVEL_4_GOV",
  LAST_UPDATE: "2024-05-24T12:00:00Z",
  ENC_PROTOCOL: "AES_256_PARITY",
  RUNTIME_STATUS: "OPTIMAL"
};

const PARAMETERS = [
  { key: "latencyBuffer", label: "LATENCY BUFFER PARITY", min: 0, max: 100, unit: "MS", desc: "Stabilization offset for asynchronous structural threads." },
  { key: "encryptionEntropy", label: "ENCRYPTION ENTROPY", min: 0, max: 1.0, step: 0.01, unit: "H", desc: "Degree of randomness in manifest key generation." },
  { key: "structuralLoad", label: "STRUCTURAL LOAD COEFF", min: 0, max: 2.0, step: 0.05, unit: "C_l", desc: "Stress distributed across the architecture." },
  { key: "threadConcurrency", label: "THREAD CONCURRENCY", min: 1, max: 64, unit: "THR", desc: "Parallel nodes for failure simulation." },
  { key: "thermalThreshold", label: "THERMAL LOGIC LIMIT", min: 300, max: 1200, unit: "K", desc: "Critical limit before algorithmic degradation." },
  { key: "eigenvalueParity", label: "EIGENVALUE PARITY", min: 1.0, max: 10.0, step: 0.1, unit: "λ", desc: "Bifurcation threshold for slender components." }
];

const FORENSIC_REPORTS = [
  { id: 'AUDIT-01', title: 'Asynchronous Deadlock Mitigation', tag: 'SYNCHRO', metric: 'λ: 1.44', abstract: 'Evaluation of secondary torsional instability in monolithic fins exceeding threshold.' },
  { id: 'AUDIT-02', title: 'Memory Leak Propagation', tag: 'HEAP_AUDIT', metric: 'σ: 4.2MB', abstract: 'Forensic documentation of surface compression variance in the memory heap.' },
  { id: 'AUDIT-03', title: 'Buffer Overflow in Sensors', tag: 'SECURITY', metric: 'P: 0.88', abstract: 'Shockwave impulse modeling exceeding structural logic buffer envelope.' },
  { id: 'AUDIT-04', title: 'Recursive Fault Detection', tag: 'TOLERANCE', metric: 'Δ: 2.5%', abstract: 'Kinematic study of joint rotation exceeding unit engagement tolerance.' },
  { id: 'AUDIT-05', title: 'Logic Gate Failure Mode', tag: 'HARDWARE', metric: 'P: 0.98', abstract: 'Alpha-to-beta phase kinetics remaining above thermal boundary.' },
  { id: 'AUDIT-06', title: 'Sub-routine Conflict Analysis', tag: 'CONFLICT', metric: 'ΔT: 42K', abstract: 'Edge stress differential exceeding failure envelope during solar cycles.' },
  { id: 'AUDIT-07', title: 'Heap Corruption Mechanics', tag: 'INTEGRITY', metric: 'τ: 0.11MPa', abstract: 'Long-term shear yield modeling for 50-year service life stability.' },
  { id: 'AUDIT-08', title: 'Thread Desync in Calculus', tag: 'CONCURRENCY', metric: 'w/t: 1.52', abstract: 'Non-linear stiffening analysis in concurrent mathematical threads.' }
];

// --- EDUCATIONAL AUTHORITY CONTENT ---

const PILLAR_ARTICLE = {
  title: "Professional Structural Glass Engineering and Load Analysis",
  content: `
    <p class="lead">In the realm of advanced architectural design, structural glass has evolved from a purely aesthetic cladding element to a mission-critical load-bearing material. The engineering of these systems requires a profound understanding of silicate chemistry, non-linear plate mechanics, and forensic failure analysis.</p>
    
    <h2>The Physics of Structural Silicate Engineering</h2>
    <p>Unlike ductile metals such as steel or aluminum, glass is a brittle material that lacks a plastic yield point. Its failure is governed by linear elastic fracture mechanics (LEFM). The design strength of glass is not a fixed constant but a statistical probability based on surface flaw distribution and duration of load. To engineer a glass fin or floor, we must calculate the Probability of Breakage (Pb) using the Weibull distribution, typically aiming for a threshold of Pb < 0.008 for most building codes.</p>
    
    <h3>ASTM E1300 and Global Safety Standards</h3>
    <p>The standard practice for determining the load resistance of glass in buildings is defined by ASTM E1300. This standard accounts for the non-linear behavior of thin plates under lateral pressure. Our OVD Engine utilizes these parameters to ensure that every calculation—from wind load to snow load—adheres to the strict safety margins required for high-occupancy structures. Failure to comply with these standards can result in catastrophic structural failure, especially in overhead glazing or high-span curtain walls.</p>
    
    <h3>Load Distribution and Membrane Stiffening</h3>
    <p>When a glass plate undergoes significant deflection, it enters a "large-deflection" regime where traditional linear equations are no longer accurate. In this state, membrane stresses (stresses acting within the plane of the glass) become significant. Our simulation core utilizes the Von Karman non-linear equations to accurately model this stiffening effect, allowing for leaner, more efficient glass designs that maintain rigorous safety factors.</p>
    
    <h2>Lateral Torsional Buckling (LTB) in Monumental Fins</h2>
    <p>Monumental glass fins are vertical supports that stabilize large glass facades. These fins are susceptible to Lateral Torsional Buckling, a phenomenon where the fin rotates and moves laterally out of its plane under compressive or bending loads. The OVD Bureau's Eigenvalue Parity factor monitors the critical bifurcation threshold (λ) to ensure that fins operate well within their stability envelope. Forecasting these failures is essential for modern double-skin facades and high-transparency structural glazing.</p>
    
    <h3>The Future of AI in Structural Silicate Design</h3>
    <p>Artificial Intelligence is revolutionizing how we predict fracture propagation. By training neural networks on thousands of forensic failure datasets, the OVD Glass Engine can now predict localized stress concentrations that traditional FEA (Finite Element Analysis) might miss. This synergy of physics-based modeling and AI-driven forecasting represents the next frontier in building envelope engineering.</p>
  `
};

const BLOG_ARTICLES = [
  {
    id: 'blog-1',
    title: "Structural Glass Stress and Safety Principles",
    excerpt: "Exploring the interaction between surface compression and thermal stress in tempered glass substrates.",
    content: `
      <h2>The Mechanics of Tempering</h2>
      <p>Tempered glass is produced by heating a glass lite to approximately 620°C and then rapidly cooling the surfaces with air jets. This process creates a "sandwich" of stresses: the surfaces are in a permanent state of high compression (minimum 10,000 psi), while the core is in tension. This pre-stressed state is what gives tempered glass its 4-5x strength increase over annealed glass.</p>
      <h3>Spontaneous Breakage and Nickel Sulfide</h3>
      <p>One of the primary forensic risks in tempered glass is spontaneous breakage caused by Nickel Sulfide (NiS) inclusions. These microscopic particles can undergo a phase change from alpha to beta, expanding in volume and triggering a fracture from within the tension zone. Heat Soaking (HST) is the industry-standard protocol for identifying at-risk lites before they leave the factory.</p>
      <p>Engineering professionals must specify HST for all tempered glass in mission-critical applications to avoid high-cost replacements and safety risks.</p>
    `
  },
  {
    id: 'blog-2',
    title: "Glass Thickness and Load Calculation Engineering",
    excerpt: "Deep dive into thickness selection for high-span glazing and seismic load distribution.",
    content: `
      <h2>Optimizing for Load Resistance</h2>
      <p>Choosing the correct glass thickness is a balancing act between structural safety, weight constraints, and cost. For high-span facades, deflection (l/175 or l/60) is often the limiting factor rather than glass breakage. Laminated glass, utilizing PVB or structural ionoplast (SGP) interlayers, allows for better load sharing between the glass plies, especially under cyclic wind loads.</p>
      <h3>Seismic Load Distribution</h3>
      <p>In seismic zones, glass must be engineered to accommodate inter-story drift. This is achieved through unitized curtain wall systems that allow the glass to "float" within its frame. Our calculations account for the kinematic rotation of joints during seismic events to ensure the glass does not contact the building's secondary structure.</p>
    `
  },
  {
    id: 'blog-3',
    title: "Glass Weight Calculation Methods",
    excerpt: "Mathematical frameworks for structural dead-load management in monumental glazing.",
    content: `
      <h2>Density and Dead Loads</h2>
      <p>Glass has a density of approximately 2500 kg/m³ (156 lb/ft³). For a triple-glazed unit with 12mm plies, the weight can exceed 100 kg per square meter. This dead load must be meticulously calculated to ensure that the building's floor slabs and secondary steel can support the facade's weight over its 50-year service life.</p>
      <p>Our simulation tools simplify this by integrating volume calculation with standard material density constants, providing instant weight telemetry for complex geometries.</p>
    `
  },
  {
    id: 'blog-4',
    title: "Structural Glass Failure Case Studies",
    excerpt: "Forensic analysis of high-profile glazing failures and the engineering lessons learned.",
    content: `
      <h2>Learning from Disaster</h2>
      <p>History is full of structural glass failures that could have been avoided with better simulation. The collapse of the Terminal 2E at Paris Charles de Gaulle Airport in 2004 highlighted the dangers of thermal stress and insufficient structural redundancy. Forensic investigation revealed that the combination of temperature gradients and localized bending stresses exceeded the capacity of the glass-to-concrete connections.</p>
      <p>At OVD Bureau, we study these cases to refine our predictive algorithms and ensure that our users are warned when their designs approach known failure envelopes.</p>
    `
  },
  {
    id: 'blog-5',
    title: "Evolution of Engineering Simulation Software",
    excerpt: "From hand calculations to real-time AI-driven forensic analysis console.",
    content: "An overview of how glass engineering has moved from simple look-up tables in the 1980s to complex multi-physics environments. Modern software like the OVD Engine allows engineers to visualize stress patterns in real-time, drastically reducing the risk of human error during the calculation phase."
  },
  {
    id: 'blog-6',
    title: "Global Glass Safety Standards and Compliance",
    excerpt: "Navigating the complexities of ASTM, EN, and AS/NZS standards in a globalized market.",
    content: "Comparison of the primary global standards: ASTM E1300 (USA), EN 12600 (Europe), and AS 1288 (Australia). Understanding the differences in safety factors and load duration effects is critical for international facade consultants working on multi-jurisdictional projects."
  },
  {
    id: 'blog-7',
    title: "Best Practices in Architectural Glass Installation",
    excerpt: "Ensuring that engineering integrity is maintained from the factory to the site.",
    content: "Even the best-engineered glass can fail if installed incorrectly. This article covers the importance of setting blocks, edge clearance, and the prevention of metal-to-glass contact during the glazing process. Forensic analysis often points to site-induced damage as a primary cause of post-installation breakage."
  },
  {
    id: 'blog-8',
    title: "AI and Automation in Glass Structural Design",
    excerpt: "How machine learning is optimizing the building envelope of the future.",
    content: "Deep dive into generative design where AI optimizes glass thickness and pane sizes to meet solar and structural requirements simultaneously. The integration of automated engineering checks into the early design phase is the future of sustainable architecture."
  }
];

const DOCS_CONTENT = {
  sections: [
    {
      title: "System Overview",
      content: "The OVD Glass Engine is an enterprise SaaS platform designed for high-end structural engineering. It provides a real-time console for analyzing silicate behavior under thermal and mechanical stress. The platform is used by facade consultants, structural engineers, and forensic analysts globally."
    },
    {
      title: "Core Parameters",
      content: `
        <ul>
          <li><strong>Latency Buffer:</strong> Manages the parity between asynchronous calculation threads to prevent race conditions in large-model simulations.</li>
          <li><strong>Structural Load (C_l):</strong> The primary multiplier for lateral pressure, derived from local wind-speed and topographic factors.</li>
          <li><strong>Thermal Logic:</strong> Monitors the gradient between the center-of-glass and the edge-of-glass temperature to prevent thermal fracture.</li>
        </ul>
      `
    },
    {
      title: "Workflow Example",
      content: "1. Define geometry. 2. Set structural parameters. 3. Initiate Audit. 4. Export Telemetry Manifest for project documentation."
    }
  ]
};

const LEGAL_PAGES = {
  privacy: `
    <h2>Privacy Policy</h2>
    <p>OVD Bureau is committed to protecting your professional data. This policy outlines how we handle simulation data and user credentials in compliance with GDPR and CCPA standards.</p>
    <h3>Data Collection</h3>
    <p>We collect system telemetry to improve our calculation kernels. All structural data is anonymized and encrypted at rest using AES-256 protocols.</p>
    <h3>Cookies and Tracking</h3>
    <p>This site uses essential cookies for session management and Google AdSense for monetization. By using the platform, you agree to our data transparency protocols.</p>
  `,
  terms: `
    <h2>Terms of Service</h2>
    <p>By accessing the OVD Glass Engine, you agree to be bound by these enterprise-grade terms. This software is provided for professional engineering use only.</p>
    <h3>Limitation of Liability</h3>
    <p>While the OVD Engine provides high-fidelity simulations, final structural verification must always be performed by a licensed professional engineer (PE) in the relevant jurisdiction.</p>
  `,
  cookie: `
    <h2>Cookie Policy</h2>
    <p>We use cookies to enhance your simulation experience. This includes tracking your parameter presets and ensuring the security of your encryption manifest.</p>
  `
};

// --- COMPONENTS ---

const TelemetryHeader = ({ activeView, setView }: { activeView: string, setView: (v: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-[100] glass-panel h-16 px-6 lg:px-12 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('engine')}>
          <div className="w-10 h-10 bg-accent flex items-center justify-center text-black font-black text-2xl shadow-[0_0_20px_#00FF99]">O</div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black tracking-telemetry text-white leading-none">OVD BUREAU</span>
            <span className="text-2xs font-mono text-accent/50 tracking-telemetry uppercase">{METADATA.VERSION}</span>
          </div>
        </div>
        <nav className="hidden lg:flex gap-8">
          {[
            { id: 'engine', label: 'SIMULATION', icon: <Cpu size={14} /> },
            { id: 'blog', label: 'KNOWLEDGE', icon: <BookOpen size={14} /> },
            { id: 'docs', label: 'DOCS', icon: <FileCode size={14} /> }
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 text-2xs font-black tracking-telemetry transition-all ${activeView === item.id ? 'text-accent' : 'text-slate-500 hover:text-white'}`}
            >
              {item.icon}{item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-2xs font-mono text-slate-600 tracking-telemetry uppercase">PROTOCOL: {METADATA.ENC_PROTOCOL}</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-2xs font-mono text-accent tracking-telemetry uppercase">PARITY_SYNC</span>
          </div>
        </div>
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/95 border-b border-border p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-4">
          <button onClick={() => {setView('engine'); setMobileMenuOpen(false)}} className="text-accent text-left font-black tracking-widest text-sm">SIMULATION</button>
          <button onClick={() => {setView('blog'); setMobileMenuOpen(false)}} className="text-white text-left font-black tracking-widest text-sm">KNOWLEDGE BASE</button>
          <button onClick={() => {setView('docs'); setMobileMenuOpen(false)}} className="text-white text-left font-black tracking-widest text-sm">DOCUMENTATION</button>
          <button onClick={() => {setView('legal'); setMobileMenuOpen(false)}} className="text-white text-left font-black tracking-widest text-sm">LEGAL</button>
        </div>
      )}
    </header>
  );
};

const SimulationCore = ({ stress }: { stress: number }) => {
  return (
    <div className="relative flex-grow bg-black border border-border overflow-hidden min-h-[400px] lg:min-h-[500px]">
      <div className="absolute inset-0 instrumentation-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-[1px] bg-accent/10" />
        <div className="h-full w-[1px] bg-accent/10" />
        <div className="absolute w-full h-[1px] bg-accent/30 scanning-line pointer-events-none z-10" />
        
        <div className="relative w-80 h-80 border border-accent/20 backdrop-blur-sm transition-transform duration-700 ease-out flex items-center justify-center"
             style={{ transform: `rotateY(${(stress - 1) * 10}deg) perspective(1000px)` }}>
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <span className="text-2xs font-mono text-accent/40 tracking-widest uppercase">MANIFEST_0X4F</span>
            <div className="w-12 h-px bg-accent/40" />
          </div>
          <Crosshair className="text-accent/20" size={64} />
          <div className="absolute bottom-4 right-4 text-2xs font-mono text-accent/40 tracking-widest">σ_STRESS: {(stress * 4.22).toFixed(4)}</div>
        </div>
      </div>
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-2xs font-mono text-slate-700 tracking-telemetry uppercase"><Activity size={10} /> STREAM_SYNC</div>
        <div className="flex items-center gap-2 text-2xs font-mono text-slate-700 tracking-telemetry uppercase"><Monitor size={10} /> BUFFER_LOCKED</div>
      </div>
      <div className="absolute bottom-4 right-6 text-2xs font-mono text-slate-800 tracking-widest uppercase">ID: {METADATA.NODE_ID}</div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('engine');
  const [settings, setSettings] = useState({
    latencyBuffer: 42,
    encryptionEntropy: 0.74,
    structuralLoad: 1.4,
    threadConcurrency: 32,
    thermalThreshold: 850,
    eigenvalueParity: 7.2
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [log, setLog] = useState<string | null>(null);

  const runAudit = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Conduct clinical forensic audit. Parameters: Load ${settings.structuralLoad}, Entropy ${settings.encryptionEntropy}, Thermal ${settings.thermalThreshold}K. Output technical telemetry report. No raw symbols like < or >. Technical monospaced tone.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { systemInstruction: "Output deterministic structural engineering telemetry. Monospaced terminal tone. Professional and clinical." }
      });
      setLog(response.text || "AUDIT_FAILURE: NULL_STREAM");
    } catch (e) {
      setLog("CRITICAL_ERROR: Simulation parity lost. Session terminated.");
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <TelemetryHeader activeView={view} setView={setView} />
      
      {view === 'engine' && (
        <main className="flex-grow flex flex-col animate-in fade-in duration-700">
          <div className="grid grid-cols-12 gap-px bg-border flex-grow overflow-hidden">
            {/* Control Sidebar */}
            <aside className="col-span-12 lg:col-span-3 bg-surface p-8 lg:p-10 flex flex-col gap-10 overflow-y-auto custom-scroll border-r border-border">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <Settings size={18} className="text-accent" />
                <span className="text-[11px] font-black tracking-telemetry text-white uppercase">Parameter Lab</span>
              </div>
              
              <div className="flex flex-col gap-8">
                {PARAMETERS.map(param => (
                  <div key={param.key} className="flex flex-col gap-3 group">
                    <div className="flex justify-between items-center text-2xs font-mono uppercase tracking-telemetry">
                      <label className="text-slate-500 group-hover:text-white transition-colors">{String(param.label)}</label>
                      <span className="text-accent font-bold">{(settings as any)[param.key]}{String(param.unit)}</span>
                    </div>
                    <div className="relative pt-1">
                      <input 
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.step || 1}
                        value={(settings as any)[param.key]}
                        onChange={(e) => setSettings({...settings, [param.key]: parseFloat(e.target.value)})}
                        className="bureau-slider"
                      />
                    </div>
                    <p className="text-[10px] text-slate-800 tracking-widest font-mono uppercase leading-relaxed">{String(param.desc)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-border flex flex-col gap-6">
                <button 
                  onClick={runAudit}
                  disabled={analyzing}
                  className="w-full bg-accent text-black font-black py-5 text-2xs tracking-telemetry flex items-center justify-center gap-4 hover:bg-white disabled:opacity-40 transition-all shadow-[0_0_20px_rgba(0,255,153,0.15)] active:scale-95"
                >
                  {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                  {analyzing ? 'PROCESSING...' : 'INITIATE AUDIT'}
                </button>
              </div>
            </aside>

            {/* Main Console */}
            <section className="col-span-12 lg:col-span-9 bg-black flex flex-col overflow-y-auto custom-scroll">
              <div className="flex flex-col gap-px h-full">
                <SimulationCore stress={settings.structuralLoad} />
                
                <div className="grid grid-cols-2 md:grid-cols-4 bg-border border-y border-border">
                  {[
                    { label: "HEAP_INTEGRITY", val: "99.9%", status: "SYNCED" },
                    { label: "THREAD_LOCK", val: `${settings.threadConcurrency}:1`, status: "ACTIVE" },
                    { label: "LOAD_THRESHOLD", val: `${settings.structuralLoad}C_l`, status: "NOMINAL" },
                    { label: "THERMAL_STATUS", val: `${settings.thermalThreshold}K`, status: "OPTIMAL" }
                  ].map((m, i) => (
                    <div key={i} className="glass-panel p-8 flex flex-col gap-4 border-r border-border hover:bg-white/[0.02] transition-all group overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                         <Zap size={12} className="text-accent" />
                      </div>
                      <span className="text-2xs font-black tracking-telemetry text-slate-600 uppercase group-hover:text-slate-400">{String(m.label)}</span>
                      <span className="text-4xl italic font-black text-white metallic-text">{String(m.val)}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        <span className="text-2xs font-mono text-accent/40 tracking-telemetry uppercase">{String(m.status)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {log && (
                  <div className="bg-surface p-12 border-b border-border animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 mb-6">
                      <Terminal size={18} className="text-accent" />
                      <span className="text-2xs font-black tracking-telemetry text-white uppercase">Forensic Audit Stream</span>
                    </div>
                    <pre className="text-sm font-mono text-slate-500 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto custom-scroll pr-4">
                      {String(log)}
                    </pre>
                  </div>
                )}

                <div className="p-10 flex flex-col gap-8 bg-black">
                  <div className="flex items-center gap-4">
                    <Database size={18} className="text-accent" />
                    <span className="text-2xs font-black tracking-telemetry text-white uppercase">Forensic Audit Archive</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {FORENSIC_REPORTS.map(rpt => (
                      <div key={rpt.id} className="glass-panel p-6 flex flex-col gap-4 group cursor-pointer hover:border-accent/40 transition-all border border-border/50 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-accent/50 tracking-widest uppercase">{String(rpt.tag)}</span>
                          <span className="text-2xs font-mono text-slate-800">{String(rpt.id)}</span>
                        </div>
                        <h3 className="text-[12px] font-black text-slate-200 uppercase tracking-tighter group-hover:text-accent transition-colors leading-tight">{String(rpt.title)}</h3>
                        <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed font-light">{String(rpt.abstract)}</p>
                        <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-2xs font-mono text-slate-800">
                          <span>{String(rpt.metric)}</span>
                          <ArrowUpRight size={14} className="group-hover:text-accent transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* HOMEPAGE PILLAR CONTENT (SEO AUTHORITY LAYER) */}
          <section className="bg-black py-32 px-6 lg:px-48 border-t border-border">
            <article className="max-w-5xl mx-auto premium-article">
              <div className="flex items-center gap-4 mb-12 text-slate-500">
                <Calendar size={14} /> <span>Updated: {new Date(METADATA.LAST_UPDATE).toLocaleDateString()}</span>
                <span className="mx-4">|</span>
                <Clock size={14} /> <span>15 Min Read</span>
                <span className="mx-4">|</span>
                <UserCheck size={14} /> <span>Verified by OVD Bureau</span>
              </div>
              <h1 className="text-7xl font-black text-white uppercase tracking-tighter italic mb-16 metallic-text leading-none">
                {String(PILLAR_ARTICLE.title)}
              </h1>
              <div dangerouslySetInnerHTML={{ __html: PILLAR_ARTICLE.content }} />
              
              <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="glass-panel p-10 space-y-6">
                  <ShieldCheck className="text-accent" size={40} />
                  <h3 className="text-xl font-black text-white uppercase">Safety Standards</h3>
                  <p className="text-slate-400 font-light text-sm">Full ASTM E1300 compliance for architectural glazing systems. Reliable Pb calculations for mission-critical facades.</p>
                </div>
                <div className="glass-panel p-10 space-y-6">
                  <Activity className="text-accent" size={40} />
                  <h3 className="text-xl font-black text-white uppercase">Simulation Core</h3>
                  <p className="text-slate-400 font-light text-sm">Real-time non-linear modeling for large-deflection silicate mechanics. Accurate membrane stress telemetry.</p>
                </div>
                <div className="glass-panel p-10 space-y-6">
                  <Terminal size={40} className="text-accent" />
                  <h3 className="text-xl font-black text-white uppercase">Forensic Audit</h3>
                  <p className="text-slate-400 font-light text-sm">Automated failure pattern recognition and instability detection using our proprietary AI kernels.</p>
                </div>
              </div>
            </article>
          </section>

          {/* FAQ SECTION */}
          <section className="bg-surface py-24 px-6 lg:px-48 border-y border-border">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-12 italic">Engineering FAQs</h2>
              <div className="space-y-8">
                {[
                  { q: "What is the OVD Glass Engine?", a: "It is an enterprise structural simulation platform designed for high-fidelity architectural glazing analysis." },
                  { q: "How accurate is the simulation?", a: "The core utilizes non-linear Von Karman equations and satisfies the parity requirements of ASTM E1300 and international building codes." },
                  { q: "Can I use this for official structural sign-offs?", a: "The OVD Bureau provides a verification layer, but final sign-off must be performed by a licensed PE using the provided telemetry manifest." }
                ].map((faq, i) => (
                  <div key={i} className="glass-panel p-8 group">
                    <h4 className="text-lg font-black text-white mb-4 flex items-center gap-4">
                      <HelpCircle className="text-accent" size={18} /> {String(faq.q)}
                    </h4>
                    <p className="text-slate-400 font-light leading-relaxed">{String(faq.a)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {view === 'blog' && (
        <main className="flex-grow bg-black py-32 px-6 lg:px-48 animate-in fade-in duration-500">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-7xl font-black text-white uppercase tracking-tighter italic mb-20 metallic-text">Engineering Knowledge Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {BLOG_ARTICLES.map(post => (
                <div key={post.id} className="bg-surface p-16 space-y-8 group cursor-pointer hover:bg-white/[0.02] transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                  <span className="text-2xs font-mono text-accent tracking-widest uppercase">AUDIT_REF: {String(post.id.toUpperCase())}</span>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-accent transition-colors leading-none italic">{String(post.title)}</h3>
                  <p className="text-xl text-slate-500 font-light leading-relaxed">{String(post.excerpt)}</p>
                  <div className="pt-8 border-t border-border flex items-center justify-between text-2xs font-mono text-slate-800 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Clock size={12} /> 10 MIN READ</span>
                    <ArrowUpRight size={24} className="group-hover:text-accent transition-transform" />
                  </div>
                  {/* FULL ARTICLE RENDER ON HOVER/CLICK SIMULATION (Optional expanded view) */}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {view === 'docs' && (
        <main className="flex-grow bg-black py-32 px-6 lg:px-48 animate-in fade-in duration-500">
          <div className="max-w-5xl mx-auto premium-article">
            <h2 className="text-7xl font-black text-white uppercase tracking-tighter italic mb-12 metallic-text">Documentation</h2>
            <div className="glass-panel p-16 space-y-16">
              {DOCS_CONTENT.sections.map((sec, i) => (
                <section key={i} className="space-y-8">
                  <h3 className="text-3xl font-black text-white uppercase border-b border-border pb-4">{String(sec.title)}</h3>
                  <div className="text-slate-400 font-light leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: sec.content }} />
                </section>
              ))}
            </div>
          </div>
        </main>
      )}

      {view === 'legal' && (
        <main className="flex-grow bg-black py-32 px-6 lg:px-48 animate-in fade-in duration-500">
          <div className="max-w-4xl mx-auto space-y-24">
            {Object.entries(LEGAL_PAGES).map(([key, content]) => (
              <article key={key} className="premium-article glass-panel p-16">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>
            ))}
          </div>
        </main>
      )}

      {/* ENTERPRISE FOOTER */}
      <footer className="bg-surface border-t border-border px-8 lg:px-24 py-32 flex flex-col gap-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-accent flex items-center justify-center text-black font-black text-3xl shadow-[0_0_20px_#00FF99]">O</div>
              <span className="text-white font-black tracking-telemetry uppercase text-xl">OVD BUREAU</span>
            </div>
            <p className="text-[12px] uppercase tracking-[0.4em] leading-relaxed text-slate-700">The Global authority in structural silicate simulation and forensic manifest analysis. Mission-critical aerospace-grade facade logic bureau. Established 2024.</p>
            <div className="flex gap-10 text-slate-800">
              <Globe size={24} className="hover:text-accent cursor-pointer transition-colors" />
              <Lock size={24} className="hover:text-accent cursor-pointer transition-colors" />
              <CpuIcon size={24} className="hover:text-accent cursor-pointer transition-colors" />
              <Mail size={24} className="hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="flex flex-col gap-8 pt-6">
            <span className="text-[12px] font-black tracking-[0.5em] text-accent uppercase">Resources</span>
            <ul className="flex flex-col gap-6 text-[11px] font-mono text-slate-600 tracking-widest uppercase">
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-3" onClick={() => setView('engine')}><ChevronRight size={12} /> Sim Core v4</li>
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-3" onClick={() => setView('blog')}><ChevronRight size={12} /> Knowledge Base</li>
              <li className="hover:text-white cursor-pointer flex items-center gap-3" onClick={() => setView('docs')}><ChevronRight size={12} /> Documentation</li>
              <li className="hover:text-white cursor-pointer flex items-center gap-3"><ChevronRight size={12} /> Security Audit</li>
            </ul>
          </div>

          <div className="flex flex-col gap-8 pt-6">
            <span className="text-[12px] font-black tracking-[0.5em] text-accent uppercase">Legal Compliance</span>
            <ul className="flex flex-col gap-6 text-[11px] font-mono text-slate-600 tracking-widest uppercase">
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-3" onClick={() => setView('legal')}><Scale size={12} /> Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-3" onClick={() => setView('legal')}><Gavel size={12} /> Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-3" onClick={() => setView('legal')}><ShieldCheck size={12} /> Cookie Protocol</li>
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-3"><Lock size={12} /> GDPR Parity</li>
            </ul>
          </div>

          <div className="flex flex-col gap-10 items-end justify-between py-6">
            <div className="flex flex-col items-end gap-4">
              <span className="text-[12px] font-black tracking-[0.5em] text-accent uppercase">System Telemetry</span>
              <div className="flex items-center gap-4 bg-black p-3 border border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#00FF99] animate-pulse" />
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Orbital Sync: {METADATA.RUNTIME_STATUS}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[12px] font-mono text-slate-900 tracking-[1.5em] uppercase mb-3">
                $10K Annual License Active
              </div>
              <div className="text-[11px] font-mono text-slate-800 tracking-[0.4em] uppercase">Auth_Node: {METADATA.AUTH_LEVEL}</div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 border-t border-border flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-slate-900 tracking-[1.5em] gap-12 text-center md:text-left">
          <span>© 2026 OVD BUREAU ENGINEERING. ALL MANIFESTS VERIFIED.</span>
          <div className="flex flex-wrap justify-center gap-12">
            <span>NASA_SIM_AUTH_V2</span>
            <span>ASTM_E1300_COMPLIANT</span>
            <span>ISO_9001_CERTIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
