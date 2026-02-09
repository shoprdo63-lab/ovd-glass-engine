import './globals.css';
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, ChevronRight, Loader2, 
  Database, FileText, 
  Target, Crosshair, Command,
  ArrowUpRight, Settings, Scan, 
  Globe, Lock, Cpu as Processor,
  Sliders, Monitor, Compass, 
  Copy, CheckCircle2, AlertCircle, Download,
  Activity, Maximize, Terminal, Radio, Info,
  Box, Layers, Zap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TELEMETRY META LAYER (CORNER INDICATORS) ---
const SYSTEM_TELEMETRY = {
  NODE_ID: "BUREAU_ORBITAL_7X",
  ENC_PROTOCOL: "AES-256_GCM",
  RUNTIME: "PARITY_VERIFIED",
  LATENCY: "1.24 MS",
  LOAD_CLASS: "AERO_SPEC_S1"
};

// --- PARAMETER LAB CONFIGURATION ---
const SIMULATION_PARAMETERS = [
  { key: "thermalGradient", label: "Thermal Gradient Coefficient", min: 0, max: 250, unit: "K", desc: "Differential heat propagation through silicate cross-sections." },
  { key: "fractureIndex", label: "Fracture Mechanics Index", min: 0.05, max: 2.5, step: 0.01, unit: "MPa√m", desc: "Critical stress intensity factor for brittle failure initiation." },
  { key: "eigenvalueFactor", label: "Eigenvalue Stability Factor", min: 1.0, max: 10.0, step: 0.1, unit: "λ", desc: "Bifurcation threshold for slender structural components." },
  { key: "stressTensor", label: "Stress Tensor Scaling", min: 0.1, max: 15.0, step: 0.1, unit: "σ_xx", desc: "Membrane stress concentration multiplier in non-linear states." },
  { key: "fatigueLimit", label: "Structural Fatigue Envelope", min: 100, max: 10000, unit: "N_f", desc: "Cycle boundary before catastrophic lattice dislocation." },
  { key: "shearModulus", label: "Viscoelastic Shear Modulus", min: 10, max: 300, unit: "MPa", desc: "Interlayer coupling constant (G) at operational temperatures." }
];

interface ForensicReport {
  id: string;
  title: string;
  category: string;
  author: string;
  metric: string;
  summary: string;
  content: ReactNode;
}

// --- KNOWLEDGE ENGINE (8 HIGH-LEVEL FORENSIC REPORTS) ---
const KNOWLEDGE_ARCHIVE: ForensicReport[] = [
  {
    id: 'rpt-buckling',
    title: 'Lateral Torsional Buckling of Monumental Glass Fins',
    category: 'Forensic Engineering',
    author: 'Dr. Elena Vance, Senior Lead',
    metric: 'Stability_λ: 1.22',
    summary: 'A forensic investigation into lateral-torsional instability in structural fins where vertical load exceeds critical bifurcation thresholds of 40kN. The analysis confirms that unbraced length is longer than the safety envelope of 4000mm.',
    content: (
      <div className="space-y-6">
        <p className="text-slate-400 leading-relaxed font-light">Structural modeling indicates that out-of-plane displacement is higher than the nominal safety threshold when unbraced length is longer than 4000mm. Support stiffness must be increased to ensure global stability.</p>
        <div className="bg-[#080808] border border-[#1A1A1A] p-6 font-mono text-xs text-[#00FF99]/70">
          STABILITY_EQUATION: M_cr = (π/L) * sqrt(E*Iz*G*It) * sqrt(1 + (π^2*E*Iw)/(L^2*G*It))
        </div>
      </div>
    )
  },
  {
    id: 'rpt-aniso',
    title: 'Anisotropic Stress Mapping in Heat-Strengthened Substrates',
    category: 'Material Science',
    author: 'Marcus Ovd, Director',
    metric: 'σ_Residual: 45MPa',
    summary: 'Clinical forensic mapping of stress distribution in annealed silicates post-tempering. This study identifies potential dislocation matrices where surface compression is lower than the safety margin.',
    content: <p className="text-slate-400 leading-relaxed font-light">Surface compression must remain higher than the design threshold of 400MPa but lower than the fracture boundary of 550MPa to ensure deterministic breakage patterns and fragmentation safety.</p>
  },
  {
    id: 'rpt-shock',
    title: 'Transient Shockwave Propagation in Laminated PVB Interlayers',
    category: 'Defense Simulation',
    author: 'Dr. Arthur Dent, Analyst',
    metric: 'GSA_Level: D_CERT',
    summary: 'High-fidelity modeling of impulse loads where peak reflected pressure exceeds 100kPa for durations shorter than 15 milliseconds. Results indicate perimeter tensile load is higher than standard anchorage limits.',
    content: <p className="text-slate-400 leading-relaxed font-light">Laminate integrity is verified when interlayer elongation is higher than 200 percent post-impact. Perimeter tensile load remains below the critical failure margin.</p>
  },
  {
    id: 'rpt-drift',
    title: 'Inter-Story Drift Capacity in Unitized Curtain Walls',
    category: 'Seismic Analysis',
    author: 'Sarah Jenkins, Scientist',
    metric: 'Drift_Max: 2.5%',
    summary: 'Evaluation of seismic performance where lateral story displacement is higher than the engagement envelope of structural gaskets. The study defines a drift limit lower than 3 percent for seismic zone 4.',
    content: <p className="text-slate-400 leading-relaxed font-light">Drift accommodation must exceed the calculated seismic displacement by a factor of 1.25. Mechanical retention ensures glass-to-metal collision remains lower than design tolerance.</p>
  },
  {
    id: 'rpt-acoustic',
    title: 'Coincidence Frequency Shifts in Acoustic Lamination',
    category: 'Acoustics',
    author: 'Jordan Smith, Specialist',
    metric: 'STC_Rating: 44',
    summary: 'Analyzing sound transmission loss where noise frequency is lower than the critical coincidence dip of asymmetric structural plys. Lamination thickness is higher than the acoustic resonance threshold.',
    content: <p className="text-slate-400 leading-relaxed font-light">Effective damping occurs when the coincidence frequency is lower than the target noise spectrum. Asymmetric lamination reduces the dip depth by 6dB, optimizing STC performance.</p>
  },
  {
    id: 'rpt-nis',
    title: 'NiS Inclusion Phase Transformation Forecasting',
    category: 'Forensic Engineering',
    author: 'Dr. Elena Vance',
    metric: 'HST_Parity: 0.99',
    summary: 'Predicting α-β phase expansion in tempered glass where inclusion diameter exceeds 60 micrometers under cyclic thermal loading. Expansion pressure is higher than internal compression limits.',
    content: <p className="text-slate-400 leading-relaxed font-light">Nickel Sulfide transformation triggers fracture if internal tension is higher than the compression boundary. HST remains the primary mitigation protocol for mission-critical facades.</p>
  },
  {
    id: 'rpt-creep',
    title: 'Long-Term Creep of Structural Silicone Adhesives',
    category: 'Bond Mechanics',
    author: 'Sarah Jenkins',
    metric: 'Shear_Yield: 0.21',
    summary: 'Longitudinal analysis of adhesive bond yield where sustained dead load exceeds the structural safety envelope. The creep coefficient is higher than the operational margin for 50-year service life.',
    content: <p className="text-slate-400 leading-relaxed font-light">Bond integrity is maintained if sustained shear stress remains lower than 0.11 MPa. Dynamic wind load duration must stay below 3 seconds for safe structural calculations.</p>
  },
  {
    id: 'rpt-plate',
    title: 'Membrane Action in Large-Deflection Plate Theory',
    category: 'Structural Mechanics',
    author: 'Marcus Ovd',
    metric: 'Von_Karman_OK',
    summary: 'Evaluating out-of-plane stiffening in oversized panels where central deflection is higher than 1.0 times the glass thickness. Non-linear stiffening effects exceed linear predictive models.',
    content: <p className="text-slate-400 leading-relaxed font-light">Linear theory fails when deflection exceeds the plate thickness. Von Karman equations must be applied for deterministic results in oversized silicate assemblies.</p>
  }
];

// --- HIGH-FIDELITY INSTRUMENTATION GRID ---
const InstrumentationGrid = ({ stress }: { stress: number }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-full w-full bg-[#000000] border border-[#1A1A1A] relative overflow-hidden flex items-center justify-center cursor-crosshair group"
    >
      {/* 10px Micro Grid Base */}
      <div className="absolute inset-0 micro-grid-10 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.015)_0%,transparent_90%)]" />
      
      {/* Radar Sweep Animation */}
      <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 radar-sweep pointer-events-none" />

      {/* Crosshair Instrumentation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-[1px] bg-[#1A1A1A]" />
        <div className="h-full w-[1px] bg-[#1A1A1A]" />
        
        <div 
          style={{
            width: '480px', height: '480px',
            background: 'rgba(2, 2, 2, 0.4)',
            backdropFilter: 'blur(8px)',
            border: `1px solid rgba(0,255,153,${stress / 25})`,
            transform: `perspective(1200px) rotateY(${(stress - 7) * 4}deg)`
          }}
          className="relative transition-all duration-700 flex items-center justify-center border-dashed"
        >
          <Crosshair size={48} className="text-[#00FF99]/20" />
          <div className="absolute top-6 left-6 text-[10px] font-mono text-[#00FF99]/40 tracking-[0.3em] uppercase">Sector_Forensic_Delta</div>
          <div className="absolute bottom-6 right-6 text-[10px] font-mono text-[#00FF99]/40 tracking-[0.3em] uppercase">σ_Stress_Load: {(stress * 3.42).toFixed(4)}</div>
          
          {/* Active Vertical Scanning Line */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-[#00FF99]/25 shadow-[0_0_25px_#00FF99] scanning-v z-10" />
        </div>
      </div>

      {/* Coordinate Telemetry Overlays */}
      <div 
        className="absolute z-30 pointer-events-none flex flex-col gap-1 transition-all duration-75 opacity-0 group-hover:opacity-100"
        style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(20px, 20px)' }}
      >
        <div className="text-[10px] font-mono text-[#00FF99] tracking-widest bg-black/90 px-3 py-1 border border-[#1A1A1A]">COOR_X: {mousePos.x.toFixed(3)}</div>
        <div className="text-[10px] font-mono text-[#00FF99] tracking-widest bg-black/90 px-3 py-1 border border-[#1A1A1A]">COOR_Y: {mousePos.y.toFixed(3)}</div>
      </div>

      {/* System Status Indicators (Corner Data) */}
      <div className="absolute top-8 left-8 flex flex-col gap-3">
        <div className="flex items-center gap-4 text-[10px] font-mono text-[#00FF99]/40 tracking-widest uppercase"><Monitor size={12} /> Parity_Locked</div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-[#00FF99]/40 tracking-widest uppercase"><Compass size={12} /> Heading_V: 12.04°</div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-[#00FF99]/40 tracking-widest uppercase"><Scan size={12} /> Resolution: 10NM</div>
      </div>
      
      {/* Dynamic Telemetry corners */}
      <div className="absolute top-8 right-8 text-[10px] font-mono text-slate-800 tracking-[0.3em] uppercase">{SYSTEM_TELEMETRY.NODE_ID}</div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-[#00FF99]/30 tracking-[0.3em] uppercase">{SYSTEM_TELEMETRY.LATENCY}</div>
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-800 tracking-[0.3em] uppercase">{SYSTEM_TELEMETRY.RUNTIME}</div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState<'engine' | 'hub' | 'report'>('engine');
  const [activeReport, setActiveReport] = useState<ForensicReport | null>(null);
  const [settings, setSettings] = useState({
    thermalGradient: 42,
    fractureIndex: 0.74,
    eigenvalueFactor: 1.4,
    stressTensor: 4.2,
    fatigueLimit: 800,
    shearModulus: 72
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [simLog, setSimLog] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Conduct clinical forensic structural analysis. Parameters: Thermal ${settings.thermalGradient}K, Fracture ${settings.fractureIndex}, Eigenvalue ${settings.eigenvalueFactor}. Output mission-critical technical data only.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { systemInstruction: "Output clinic, monospaced forensic telemetry reports. Deterministic and authoritative tone only." }
      });
      setSimLog(response.text || "ERROR: PARITY_FAIL");
    } catch (e) {
      setSimLog("CRITICAL_ERR: Simulation parity failure.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#000000] min-h-screen text-slate-400 font-sans selection:bg-[#00FF99]/40 flex flex-col antialiased">
      {/* 12-COLUMN AEROSPACE HEADER */}
      <header className="sticky top-0 z-[200] border-b border-[#1A1A1A] bg-[#000000]/95 backdrop-blur-3xl px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-20">
          <div className="flex items-center gap-8 cursor-pointer group" onClick={() => { setView('engine'); setActiveReport(null); }}>
            <div className="w-14 h-14 bg-[#00FF99] flex items-center justify-center text-black font-black text-3xl shadow-[0_0_35px_rgba(0,255,153,0.3)]">O</div>
            <div className="flex flex-col">
              <span className="text-[16px] font-black uppercase tracking-[0.8em] text-white">Bureau_Forensic_v4</span>
              <span className="text-[10px] font-mono text-[#00FF99]/40 tracking-[0.4em] uppercase">Auth_Level: Mission_Critical</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-16">
            {[
              { id: 'engine', label: 'Analysis Core', icon: <Sliders size={12} /> },
              { id: 'hub', label: 'Intelligence Hub', icon: <Database size={12} /> }
            ].map(link => (
              <button 
                key={link.id}
                onClick={() => { setView(link.id as any); setActiveReport(null); }}
                className={`flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.6em] py-2 transition-all ${view === link.id ? 'text-white border-b border-[#00FF99]' : 'text-slate-700 hover:text-white'}`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono text-slate-800 tracking-[0.4em] uppercase">ENC: {SYSTEM_TELEMETRY.ENC_PROTOCOL}</span>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-2 rounded-full bg-[#00FF99] animate-pulse shadow-[0_0_12px_#00FF99]" />
              <span className="text-[11px] font-mono text-[#00FF99] uppercase tracking-widest">Parity_Active</span>
            </div>
          </div>
          <button className="bg-[#00FF99] text-black text-[12px] font-black uppercase tracking-[0.5em] px-12 py-4 hover:bg-white transition-all shadow-2xl shadow-[#00FF99]/10 active:scale-95">
            Export_Parity
          </button>
        </div>
      </header>

      {/* MODULAR SYSTEM MAIN */}
      <main className="flex-grow w-full max-w-[1920px] mx-auto py-2">
        {view === 'engine' && (
          <div className="grid grid-cols-12 gap-1 px-8 animate-in fade-in duration-1000">
            {/* Sidebar Command Center (Cols 1-3) */}
            <aside className="col-span-12 lg:col-span-3 bg-[#050505] border border-[#1A1A1A] p-12 flex flex-col h-full space-y-12">
              <div className="flex items-center gap-6 border-b border-white/5 pb-10">
                <Settings size={22} className="text-[#00FF99]" />
                <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white">Parameter Lab</span>
              </div>
              
              <div className="space-y-12 flex-grow overflow-y-auto custom-scroll pr-8">
                {SIMULATION_PARAMETERS.map(param => (
                  <div key={param.key} className="space-y-5 group">
                    <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-[0.3em]">
                      <label className="text-slate-600 group-hover:text-white transition-colors">{param.label}</label>
                      <span className="text-[#00FF99] font-bold">{(settings as any)[param.key]}{param.unit}</span>
                    </div>
                    <input 
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step || 1}
                      value={(settings as any)[param.key]}
                      onChange={(e) => setSettings({...settings, [param.key]: parseFloat(e.target.value)})}
                      className="bureau-range w-full"
                    />
                    <p className="text-[10px] text-slate-800 uppercase tracking-widest leading-relaxed font-mono">{param.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-white/5 space-y-6">
                <div className="flex justify-between text-[11px] font-mono text-slate-800 uppercase tracking-widest">
                  <span>Kernel_State</span>
                  <span>0xFA_42_C1</span>
                </div>
                <button 
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="w-full bg-[#00FF99] text-black font-black uppercase tracking-[0.6em] py-6 text-[12px] flex items-center justify-center gap-6 disabled:opacity-40 hover:bg-white transition-all shadow-xl shadow-[#00FF99]/5"
                >
                  {analyzing ? <Loader2 size={24} className="animate-spin" /> : <Command size={24} />}
                  {analyzing ? 'PROCESSING...' : 'INITIATE ANALYSIS'}
                </button>
              </div>
            </aside>

            {/* Analysis Instrumentation Center (Cols 4-12) */}
            <div className="col-span-12 lg:col-span-9 flex flex-col gap-1">
              <div className="h-[640px] bg-[#000000] border border-[#1A1A1A] relative">
                <InstrumentationGrid stress={settings.stressTensor} />
              </div>
              
              {/* AUTHORITATIVE METRIC GRID */}
              <div className="grid grid-cols-4 gap-1">
                {[
                  { label: "YIELD_STRENGTH_MAX", val: `${(158 + settings.thermalGradient).toFixed(0)} MPa`, status: "NOMINAL" },
                  { label: "YOUNGS_MODULUS_REF", val: `${settings.shearModulus} GPa`, status: "STABLE" },
                  { label: "RESIDUAL_MATRIX_RATIO", val: `${(settings.stressTensor * 4.3).toFixed(1)}%`, status: "SYNCED" },
                  { label: "STABILITY_LAMBDA", val: settings.eigenvalueFactor.toFixed(2), status: "OPTIMAL" }
                ].map((m, i) => (
                  <div key={i} className="bg-[#050505] p-12 border border-[#1A1A1A] hover:border-[#00FF99]/20 transition-all cursor-crosshair group relative overflow-hidden">
                    <span className="block text-[11px] font-mono text-slate-700 uppercase tracking-[0.4em] mb-8">{m.label}</span>
                    <span className="block text-4xl font-black italic text-white font-mono group-hover:text-[#00FF99] transition-colors leading-none tracking-tighter">{m.val}</span>
                    <span className="block text-[10px] font-mono text-[#00FF99]/40 mt-8 uppercase tracking-[0.6em]">{m.status}</span>
                  </div>
                ))}
              </div>

              {simLog && (
                <div className="bg-[#050505] border border-[#1A1A1A] p-16 mt-1 animate-in slide-in-from-bottom-8">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-8">
                      <FileText size={24} className="text-[#00FF99]" />
                      <span className="text-[16px] font-black uppercase tracking-[0.8em] text-white">Forensic Simulation Analysis Log</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(simLog)}
                      className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-[#00FF99] hover:text-white transition-all bg-[#00FF99]/10 px-8 py-3 border border-[#00FF99]/20"
                    >
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      {copied ? 'COPIED' : 'COPY LOG'}
                    </button>
                  </div>
                  <pre className="text-[18px] font-mono text-slate-500 leading-relaxed whitespace-pre-wrap">{simLog}</pre>
                </div>
              )}
              
              {/* KNOWLEDGE ENGINE ARCHIVE (8-CARD GRID) */}
              <div className="mt-1 grid grid-cols-4 gap-1 bg-[#1A1A1A]">
                {KNOWLEDGE_ARCHIVE.map(report => (
                  <div 
                    key={report.id}
                    onClick={() => { setActiveReport(report); setView('report'); window.scrollTo(0,0); }}
                    className="bg-[#050505] p-10 hover:bg-[#080808] cursor-pointer transition-all group border border-transparent hover:border-[#00FF99]/10"
                  >
                    <span className="text-[10px] font-mono text-[#00FF99]/40 uppercase tracking-[0.5em] mb-8 block">{report.category}</span>
                    <h4 className="text-[15px] font-black text-slate-200 uppercase tracking-tighter mb-8 line-clamp-2 group-hover:text-[#00FF99] transition-colors leading-tight">{report.title}</h4>
                    <p className="text-[11px] text-slate-700 line-clamp-4 leading-relaxed mb-12 font-light">{report.summary}</p>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-800 uppercase tracking-[0.4em]">
                      <span>{report.metric}</span>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'hub' && (
          <div className="px-20 py-40 animate-in fade-in duration-800">
            <div className="max-w-7xl mb-56 space-y-16">
              <h2 className="text-9xl font-black text-white uppercase tracking-tighter italic metallic-text">Forensic_Archive</h2>
              <p className="text-4xl text-slate-500 font-light leading-relaxed tracking-wide max-w-6xl">Professional engineering repository documenting material failure mechanics, forensic simulation logic, and mission-critical structural protocols.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-[#1A1A1A]">
              {KNOWLEDGE_ARCHIVE.map(report => (
                <div 
                  key={report.id}
                  onClick={() => { setActiveReport(report); setView('report'); window.scrollTo(0,0); }}
                  className="bg-[#050505] p-20 space-y-16 hover:bg-[#080808] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[13px] font-black text-[#00FF99] uppercase tracking-[0.8em]">{report.category}</span>
                    <span className="text-[12px] font-mono text-slate-800 tracking-[0.6em] uppercase">{report.metric}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-[#00FF99] transition-colors leading-tight">{report.title}</h3>
                  <p className="text-xl text-slate-600 line-clamp-4 leading-relaxed font-light">{report.summary}</p>
                  <div className="pt-16 border-t border-white/5 flex justify-between items-center text-[13px] font-mono text-slate-800 uppercase tracking-[0.7em]">
                    <span>{report.author.split(',')[0]}</span>
                    <ArrowUpRight size={32} className="text-slate-800 group-hover:text-[#00FF99]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'report' && activeReport && (
          <div className="max-w-7xl mx-auto py-64 px-24 animate-in fade-in slide-in-from-bottom-32">
            <div className="flex justify-between items-start mb-64">
              <button 
                onClick={() => setView('hub')}
                className="flex items-center gap-12 text-[#00FF99] text-[18px] font-black uppercase tracking-[1.5em] hover:text-white transition-all group"
              >
                <ChevronRight size={32} className="rotate-180 group-hover:translate-x-[-12px] transition-transform" /> BACK_TO_HUB
              </button>
              <div className="flex gap-8">
                <button 
                  onClick={() => copyToClipboard(activeReport.summary)}
                  className="flex items-center gap-8 text-[#00FF99] text-[15px] font-black uppercase tracking-[0.6em] border border-[#00FF99]/20 px-12 py-5 bg-[#00FF99]/5 hover:bg-[#00FF99]/10 transition-all"
                >
                  <Copy size={24} /> COPY_SUMMARY
                </button>
                <button className="flex items-center gap-8 text-white text-[15px] font-black uppercase tracking-[0.6em] border border-white/20 px-12 py-5 bg-white/5 hover:bg-white/10 transition-all">
                  <Download size={24} /> GENERATE_PDF
                </button>
              </div>
            </div>
            <div className="space-y-32">
              <div className="flex items-center gap-16">
                <span className="bg-[#00FF99] text-black px-12 py-3 text-[16px] font-black uppercase tracking-[0.6em]">{activeReport.category}</span>
                <span className="text-slate-700 font-mono text-[16px] tracking-[1em] uppercase">{activeReport.author}</span>
                <span className="text-slate-900 font-mono text-[16px] tracking-widest uppercase ml-auto">DOC_REF: {activeReport.id.toUpperCase()}</span>
              </div>
              <h1 className="text-9xl font-black uppercase tracking-tighter text-white italic metallic-text leading-none">{activeReport.title}</h1>
              <div className="border-l-[10px] border-[#1A1A1A] pl-32 py-12">
                {activeReport.content}
              </div>
              
              <div className="pt-72 border-t border-[#1A1A1A] mt-72">
                <h4 className="text-[16px] font-black uppercase tracking-[2em] text-slate-800 mb-32">Correlation Analysis Protocols</h4>
                <div className="grid grid-cols-2 gap-20">
                  {KNOWLEDGE_ARCHIVE.filter(r => r.id !== activeReport.id).slice(0, 2).map(r => (
                    <div key={r.id} onClick={() => { setActiveReport(r); window.scrollTo(0,0); }} className="bg-[#050505] border border-[#1A1A1A] p-24 hover:border-[#00FF99]/20 cursor-pointer transition-all">
                      <span className="text-[12px] font-mono text-[#00FF99]/40 mb-10 block uppercase tracking-[0.8em]">{r.category}</span>
                      <h5 className="text-4xl font-black text-white uppercase tracking-tighter mb-10 italic">{r.title}</h5>
                      <p className="text-lg text-slate-700 line-clamp-2 leading-relaxed font-light">{r.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ENTERPRISE FOOTER */}
      <footer className="pt-80 pb-40 px-24 border-t border-[#1A1A1A] bg-[#030303] mt-72">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-64 mb-80 max-w-[1900px] mx-auto">
          <div className="col-span-2 space-y-24">
            <div className="flex items-center gap-10">
              <div className="w-20 h-20 bg-[#00FF99] flex items-center justify-center text-black font-black text-6xl shadow-[0_0_50px_rgba(0,255,153,0.25)]">O</div>
              <span className="text-white font-black uppercase tracking-[1.2em] text-3xl">OVD Bureau</span>
            </div>
            <p className="text-xl text-slate-700 leading-relaxed uppercase tracking-[0.6em] max-w-3xl">Global authority in structural silicate simulation and aerospace-grade facade logic. Professional high-density SaaS platform for forensic engineering verification.</p>
            <div className="flex gap-20 pt-12">
              <Globe size={32} className="text-slate-800 hover:text-[#00FF99] transition-colors cursor-pointer" />
              <Lock size={32} className="text-slate-800 hover:text-[#00FF99] transition-colors cursor-pointer" />
              <Processor size={32} className="text-slate-800 hover:text-[#00FF99] transition-colors cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-[18px] font-black text-[#00FF99] uppercase tracking-[1.2em] mb-24">Laboratories</h4>
            <ul className="space-y-14 text-[16px] font-bold uppercase tracking-[0.8em] text-slate-800">
              <li className="hover:text-white cursor-pointer" onClick={() => setView('engine')}>Analysis Core</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setView('hub')}>Forensic Archive</li>
              <li className="hover:text-white cursor-pointer">Verification HST</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[18px] font-black text-[#00FF99] uppercase tracking-[1.2em] mb-24">Infrastructure</h4>
            <ul className="space-y-14 text-[16px] font-bold uppercase tracking-[0.8em] text-slate-800">
              <li className="hover:text-white cursor-pointer">Encryption_A256</li>
              <li className="hover:text-white cursor-pointer">Compliance_ASTM</li>
              <li className="hover:text-white cursor-pointer">Security_Protocol</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[18px] font-black text-[#00FF99] uppercase tracking-[1.2em] mb-24">System_Nodes</h4>
            <div className="space-y-14">
              <div className="flex items-center gap-8">
                <div className="w-4 h-4 rounded-full bg-[#00FF99] shadow-[0_0_20px_#00FF99]" />
                <span className="text-[16px] font-mono text-slate-800 uppercase tracking-widest">Orbital_Sync: ACTIVE</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-4 h-4 rounded-full bg-[#00FF99] shadow-[0_0_20px_#00FF99]" />
                <span className="text-[16px] font-mono text-slate-800 uppercase tracking-widest">ECC_Verification: ON</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1900px] mx-auto flex flex-col md:flex-row justify-between items-center pt-40 border-t border-white/5 text-[14px] font-mono text-slate-900 uppercase tracking-[2.5em] gap-24">
          <p>© 2026 OVD Bureau Engineering. MISSION_CRITICAL_SAAS_V4.1.0_AERO_SPEC</p>
          <div className="flex gap-40">
            <span>NASA_SIM_AUTH_V2</span>
            <span>$10,000_LICENSE_STABLE</span>
          </div>
        </div>
      </footer>

      {/* Global Background Grid Layer */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40">
        <div className="absolute top-0 left-0 w-full h-full micro-grid-10" />
      </div>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
