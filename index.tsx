import './globals.css';
import React, { useState, useId, useEffect, ReactNode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, ChevronRight, AlertTriangle, Loader2, 
  Terminal, BarChart3, Microscope, 
  Cpu, Database, FileText, Info, 
  Target, Crosshair, Command,
  ArrowUpRight, Settings, Radio, Scan, Box, Activity,
  Layers, Zap, Share2, Printer, Globe, Lock, Cpu as Processor,
  History, Sliders, LayoutGrid, Monitor, Compass, Maximize
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TELEMETRY META LAYER ---
const META_INDICATORS = [
  { label: "NODE_ID", val: "BUREAU_ORBITAL_7X" },
  { label: "ENC_PROTOCOL", val: "AES-256_GCM" },
  { label: "LATENCY_P99", val: "1.24 MS" },
  { label: "LOAD_CLASS", val: "AEROSPACE_SPEC_S1" }
];

const PARAMETER_CONFIG = [
  { key: "thermalGradient", label: "Thermal Gradient Coefficient", min: 0, max: 250, unit: "K", desc: "Differential heat distribution through silicate layers." },
  { key: "fractureIndex", label: "Fracture Mechanics Index", min: 0.05, max: 2.5, step: 0.01, unit: "MPa√m", desc: "Critical stress intensity factor for brittle failure." },
  { key: "eigenvalueFactor", label: "Eigenvalue Stability Factor", min: 1.0, max: 10.0, step: 0.1, unit: "λ", desc: "Bifurcation point for slender structural elements." },
  { key: "stressTensor", label: "Stress Tensor Scaling", min: 0.1, max: 15.0, step: 0.1, unit: "σ_xx", desc: "Membrane stress concentration multiplier." },
  { key: "fatigueLimit", label: "Structural Fatigue Envelope", min: 100, max: 10000, unit: "N_f", desc: "Cycle boundary before lattice dislocation." },
  { key: "shearModulus", label: "Viscoelastic Shear Modulus", min: 10, max: 300, unit: "MPa", desc: "Interlayer coupling constant (G) at 20°C." }
];

// --- KNOWLEDGE INTELLIGENCE HUB (8 HIGH-LEVEL REPORTS) ---
interface ForensicReport {
  id: string;
  title: string;
  category: string;
  author: string;
  metric: string;
  summary: string;
  content: ReactNode;
}

const KNOWLEDGE_BASE: ForensicReport[] = [
  {
    id: 'von-karman-plate',
    title: 'Non-Linear Plate Response in Large-Format Facades',
    category: 'Forensic Engineering',
    author: 'Elena Vance, Senior Materials Lead',
    metric: 'Von_Kármán: 0.998',
    summary: 'Evaluating membrane stress stiffening in oversized panels where central deflection exceeds tolerance threshold of 1.0 thickness.',
    content: (
      <div className="space-y-8 font-sans">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Non-Linear Plate Theory in Structural Silicates</h1>
        <p className="text-slate-400 text-lg leading-relaxed font-light">Structural analysis of architectural glass requires the application of Von Kármán equations when out-of-plane displacement is higher than the nominal plate thickness. Standard Kirchhoff-Love theory remains valid only when deflection is lower than this critical margin.</p>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-[#050505] border border-[#1A1A1A] p-6">
            <h3 className="text-[#00FF99] text-[10px] font-mono tracking-widest uppercase mb-4">Boundary Parity</h3>
            <p className="text-xs text-slate-500 font-mono">Simple support (SS1) with zero rotation constraint. In-plane movement exceeds 0.5mm threshold.</p>
          </div>
          <div className="bg-[#050505] border border-[#1A1A1A] p-6">
            <h3 className="text-[#00FF99] text-[10px] font-mono tracking-widest uppercase mb-4">Stress Matrix</h3>
            <p className="text-xs text-slate-500 font-mono">Radial stress distribution is above failure boundary at 145MPa. Mitigation required.</p>
          </div>
          <div className="bg-[#050505] border border-[#1A1A1A] p-6">
            <h3 className="text-[#00FF99] text-[10px] font-mono tracking-widest uppercase mb-4">Mesh Convergence</h3>
            <p className="text-xs text-slate-500 font-mono">Mesh density exceeds 8000 elements per m2. Error rate lower than 0.1 percent.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'viscoelastic-creep',
    title: 'Viscoelastic Coupling and Shear Transfer Protocols',
    category: 'Material Science',
    author: 'Marcus Ovd, Structural Director',
    metric: 'Shear_G: 1.48 GPa',
    summary: 'Detailed evaluation of shear transfer efficiency in laminated glass under load durations that exceeds 3-second wind protocol.',
    content: <p className="text-slate-400 text-lg font-light">The effective thickness of a laminate is a factor of the interlayer shear modulus (G). This value varies as temperatures exceeds 30 degrees Celsius or load duration is longer than the standard 3-second wind gust protocol.</p>
  },
  {
    id: 'seismic-dissipation',
    title: 'Seismic Dissipation in Double-Skin Facades',
    category: 'Seismic Analysis',
    author: 'Sarah Jenkins, Materials Scientist',
    metric: 'Drift_Parity: 0.94',
    summary: 'Evaluating inter-story drift capacity where lateral displacement exceeds the structural safety envelope of standard fixings.',
    content: <p className="text-slate-400 text-lg font-light">Seismic resilience is dictated by the ability to accommodate story drift without inducing glass-to-metal contact. Required clearance is higher than calculated drift by a factor of 1.5.</p>
  },
  {
    id: 'blast-mitigation',
    title: 'Blast Mitigation for High-Velocity Impulse Loads',
    category: 'Defense Simulation',
    author: 'Dr. Arthur Dent, Lead Analyst',
    metric: 'GSA_Level_D_Verified',
    summary: 'Modeling shockwaves where peak reflective pressure exceeds 120kPa with duration lower than 10ms.',
    content: <p className="text-slate-400 text-lg font-light">Structural retention is guaranteed if interlayer elongation remains higher than 220 percent post-fracture of all primary glass plies.</p>
  },
  {
    id: 'thermal-stress-prop',
    title: 'Thermal Stress Propagation in Solar Control Glass',
    category: 'Thermal Dynamics',
    author: 'Dr. Elena Vance',
    metric: 'ΔT_Limit: 40.2K',
    summary: 'Predicting phase transformation triggers in coatings when thermal environment exceeds standard operational envelope of HST.',
    content: <p className="text-slate-400 text-lg font-light">If edge thermal gradient is higher than 40K in annealed substrates, spontaneous fracture occurs. HST is mandatory where absorption exceeds 50 percent.</p>
  },
  {
    id: 'torsional-buckling',
    title: 'Lateral Torsional Buckling of 12m Cantilevered Fins',
    category: 'Structural Mechanics',
    author: 'Marcus Ovd',
    metric: 'Bifurcation_Point: 45kN',
    summary: 'Stability analysis for monumental glass fins where slenderness ratio is higher than standard engineering boundaries.',
    content: <p className="text-slate-400 text-lg font-light">Buckling failure occurs if compressive load exceeds the bifurcation point. We require lateral support spacing lower than 3.5 meters.</p>
  },
  {
    id: 'nis-forensics',
    title: 'Forensic evaluation of Nickel Sulfide spontaneous fracture',
    category: 'Forensic Engineering',
    author: 'Sarah Jenkins',
    metric: 'NiS_Detection_P: 0.99',
    summary: 'Investigation of α-β phase transformation in tempered silicates causing failure when internal stress exceeds compression boundary.',
    content: <p className="text-slate-400 text-lg font-light">Nickel Sulfide inclusions undergo phase expansion over time. Spontaneous fracture is triggered when inclusion diameter is higher than 50 micrometers.</p>
  },
  {
    id: 'acoustic-damping',
    title: 'Acoustic Damping and Coincidence Frequency Shifts',
    category: 'Material Science',
    author: 'Jordan Smith, Lead Aero-Engineer',
    metric: 'STC_Rating: 44',
    summary: 'Optimizing sound transmission ratings by ensuring coincidence frequency is lower than critical architectural noise spectrum.',
    content: <p className="text-slate-400 text-lg font-light">Asymmetric laminate build-ups shift the coincidence dip to a frequency range lower than that of urban transit noise, improving STC performance.</p>
  }
];

// --- MISSION CRITICAL COMPONENTS ---

const InstrumentationGrid = ({ stress }: { stress: number }) => (
  <div className="h-full w-full bg-[#000000] border border-[#1A1A1A] relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 micro-grid-10 opacity-30 pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.01)_0%,transparent_90%)]" />
    
    {/* Radar Sweep Animation */}
    <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 radar-sweep pointer-events-none" />

    {/* Coordinate Crosshairs */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-full h-[1px] bg-[#1A1A1A]" />
      <div className="h-full w-[1px] bg-[#1A1A1A]" />
      
      {/* Target Focus UI */}
      <div 
        style={{
          width: '400px', height: '400px',
          background: 'rgba(2, 2, 2, 0.2)',
          border: `1px solid rgba(0,255,153,${stress / 20})`,
          transform: `perspective(1200px) rotateY(${(stress - 7) * 5}deg)`
        }}
        className="relative transition-all duration-700 flex items-center justify-center border-dashed"
      >
        <Crosshair size={40} className="text-[#00FF99]/20" />
        <div className="absolute top-4 left-4 text-[8px] font-mono text-[#00FF99]/40 tracking-[0.4em] uppercase">Sector_0x44</div>
        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-[#00FF99]/40 tracking-[0.4em] uppercase">Stress_Sigma: {(stress * 2.8).toFixed(3)}</div>
        
        {/* Active Scanning Lines */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-[#00FF99]/10 shadow-[0_0_15px_#00FF99] scanning-h z-10" />
      </div>
    </div>

    {/* Real-time Telemetry corner labels */}
    <div className="absolute top-4 left-4 space-y-2">
      <div className="flex items-center gap-3 text-[9px] font-mono text-[#00FF99]/30 tracking-widest uppercase">
        <Monitor size={10} /> Parity_X: 1.0442
      </div>
      <div className="flex items-center gap-3 text-[9px] font-mono text-[#00FF99]/30 tracking-widest uppercase">
        <Compass size={10} /> Heading: 12.04°
      </div>
    </div>
  </div>
);

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

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Forensic Engineering Analysis: Thermal ${settings.thermalGradient}K, Fracture ${settings.fractureIndex}MPa√m, Eigenvalue λ=${settings.eigenvalueFactor}. Output technical clinical report. Monospaced.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { systemInstruction: "Output mission-critical forensic engineering telemetry. Clinical, deterministic, monospaced tech tone only." }
      });
      setSimLog(response.text || "ERR: NULL_REPORT");
    } catch (e) {
      setSimLog("CRITICAL_ERROR: Parity verification failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const openReport = (report: ForensicReport) => {
    setActiveReport(report);
    setView('report');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#000000] min-h-screen text-slate-400 font-sans selection:bg-[#00FF99]/40 flex flex-col antialiased">
      {/* AEROSPACE HUD HEADER */}
      <header className="sticky top-0 z-[200] border-b border-[#1A1A1A] bg-[#000000]/95 backdrop-blur-3xl px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-5 cursor-pointer group" onClick={() => { setView('engine'); setActiveReport(null); }}>
            <div className="w-10 h-10 bg-[#00FF99] flex items-center justify-center text-black font-black text-2xl shadow-[0_0_30px_rgba(0,255,153,0.3)]">O</div>
            <div className="flex flex-col">
              <span className="text-[14px] font-black uppercase tracking-[0.6em] text-white">Bureau_Forensic_S1</span>
              <span className="text-[9px] font-mono text-[#00FF99]/40 tracking-[0.4em] uppercase">Auth_Level: Mission_Critical</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-12">
            {[
              { id: 'engine', label: 'Analysis Core', icon: <Sliders size={12} /> },
              { id: 'hub', label: 'Intelligence Hub', icon: <Database size={12} /> }
            ].map(link => (
              <button 
                key={link.id}
                onClick={() => { setView(link.id as any); setActiveReport(null); }}
                className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] py-2 transition-all ${view === link.id ? 'text-white border-b border-[#00FF99]' : 'text-slate-700 hover:text-white'}`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-mono text-slate-800 tracking-widest uppercase">Encryption_SHA512</span>
            <div className="flex gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF99] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00FF99] uppercase tracking-widest">System_Online</span>
            </div>
          </div>
          <button className="bg-[#00FF99] text-black text-[11px] font-black uppercase tracking-[0.5em] px-10 py-3 hover:bg-white transition-all shadow-xl shadow-[#00FF99]/10">
            Export_Parity
          </button>
        </div>
      </header>

      {/* SYSTEM META LAYER INDICATORS */}
      <div className="grid grid-cols-4 gap-1 px-8 py-1">
        {META_INDICATORS.map((indicator, i) => (
          <div key={i} className="bg-[#050505] border border-[#1A1A1A] p-3 flex justify-between items-center">
            <span className="text-[8px] font-mono text-slate-700 tracking-[0.3em] uppercase">{indicator.label}</span>
            <span className="text-[9px] font-mono text-white font-bold tracking-widest">{indicator.val}</span>
          </div>
        ))}
      </div>

      <main className="flex-grow w-full max-w-[1920px] mx-auto py-1">
        {view === 'engine' && (
          <div className="grid grid-cols-12 gap-1 px-8 animate-in fade-in duration-700">
            {/* Control Lab Sidebar */}
            <aside className="col-span-12 lg:col-span-3 bg-[#050505] border border-[#1A1A1A] p-10 flex flex-col h-full space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                <Settings size={18} className="text-[#00FF99]" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Parameter Lab</span>
              </div>
              
              <div className="space-y-10 flex-grow">
                {PARAMETER_CONFIG.map(param => (
                  <div key={param.key} className="space-y-4 group">
                    <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-widest">
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
                    <p className="text-[9px] text-slate-800 uppercase tracking-widest leading-relaxed font-mono">{param.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-[9px] font-mono text-slate-800 uppercase tracking-widest">
                  <span>Kernel_Parity</span>
                  <span>0xFA_42_C1</span>
                </div>
                <button 
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="w-full bg-[#00FF99] text-black font-black uppercase tracking-[0.5em] py-5 text-[11px] flex items-center justify-center gap-4 disabled:opacity-40 hover:bg-white transition-all"
                >
                  {analyzing ? <Loader2 size={18} className="animate-spin" /> : <Command size={18} />}
                  {analyzing ? 'PROCESSING...' : 'INITIATE ANALYSIS'}
                </button>
              </div>
            </aside>

            {/* Central Analysis Core */}
            <div className="col-span-12 lg:col-span-9 flex flex-col gap-1">
              <div className="h-[540px] bg-[#000000] border border-[#1A1A1A] relative">
                <InstrumentationGrid stress={settings.stressTensor} />
              </div>
              
              {/* HIGH AUTHORITY METRICS */}
              <div className="grid grid-cols-4 gap-1">
                {[
                  { label: "YIELD_LIMIT", val: `${(160 + settings.thermalGradient).toFixed(0)} MPa`, status: "NOMINAL" },
                  { label: "YOUNGS_MODULUS", val: `${settings.shearModulus} GPa`, status: "STABLE" },
                  { label: "RESIDUAL_MATRIX", val: `${(settings.stressTensor * 4.1).toFixed(1)}%`, status: "SYNCED" },
                  { label: "STABILITY_λ", val: settings.eigenvalueFactor.toFixed(2), status: "OPTIMAL" }
                ].map((m, i) => (
                  <div key={i} className="bg-[#050505] p-10 border border-[#1A1A1A] hover:border-[#00FF99]/20 transition-all cursor-crosshair group relative overflow-hidden">
                    <span className="block text-[11px] font-mono text-slate-700 uppercase tracking-[0.3em] mb-5">{m.label}</span>
                    <span className="block text-5xl font-black text-white font-mono group-hover:text-[#00FF99] transition-colors leading-none tracking-tighter">{m.val}</span>
                    <span className="block text-[9px] font-mono text-[#00FF99]/40 mt-4 uppercase tracking-[0.5em]">{m.status}</span>
                  </div>
                ))}
              </div>

              {simLog && (
                <div className="bg-[#050505] border border-[#1A1A1A] p-12 mt-1 animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-5 mb-8">
                    <FileText size={18} className="text-[#00FF99]" />
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Analysis Log Output</span>
                  </div>
                  <pre className="text-[14px] font-mono text-slate-500 leading-relaxed whitespace-pre-wrap">{simLog}</pre>
                </div>
              )}
              
              {/* Intelligence Preview Layer */}
              <div className="mt-1 grid grid-cols-4 gap-1">
                {KNOWLEDGE_BASE.slice(0, 4).map(report => (
                  <div 
                    key={report.id}
                    onClick={() => openReport(report)}
                    className="bg-[#050505] border border-[#1A1A1A] p-6 hover:bg-[#080808] cursor-pointer transition-all group"
                  >
                    <span className="text-[8px] font-mono text-[#00FF99]/30 uppercase tracking-widest mb-4 block">{report.category}</span>
                    <h4 className="text-[11px] font-black text-slate-200 uppercase tracking-tighter mb-4 line-clamp-1 group-hover:text-[#00FF99] transition-colors">{report.title}</h4>
                    <p className="text-[9px] text-slate-700 line-clamp-2 leading-relaxed mb-6">{report.summary}</p>
                    <div className="flex justify-between items-center text-[8px] font-mono text-slate-800 uppercase tracking-widest">
                      <span>{report.metric}</span>
                      <ArrowUpRight size={10} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'hub' && (
          <div className="px-12 py-24 animate-in fade-in duration-800">
            <div className="max-w-5xl mb-32 space-y-8">
              <h2 className="text-7xl font-black text-white uppercase tracking-tighter metallic-text">Forensic_Archive</h2>
              <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-wide max-w-4xl">Technical repository of structural failure mechanics, forensic material modeling, and mission-critical documentation protocols.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-[#1A1A1A]">
              {KNOWLEDGE_BASE.map(report => (
                <div 
                  key={report.id}
                  onClick={() => openReport(report)}
                  className="bg-[#050505] p-12 space-y-8 hover:bg-[#080808] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-black text-[#00FF99] uppercase tracking-[0.4em]">{report.category}</span>
                    <span className="text-[10px] font-mono text-slate-800 tracking-widest uppercase">{report.metric}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#00FF99] transition-colors leading-tight">{report.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed font-light">{report.summary}</p>
                  <div className="pt-10 border-t border-white/5 flex justify-between items-center text-[11px] font-mono text-slate-800 uppercase tracking-[0.4em]">
                    <span>{report.author.split(',')[0]}</span>
                    <ArrowUpRight size={20} className="text-slate-800 group-hover:text-[#00FF99]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'report' && activeReport && (
          <div className="max-w-6xl mx-auto py-40 px-16 animate-in fade-in slide-in-from-bottom-16">
            <button 
              onClick={() => setView('hub')}
              className="flex items-center gap-6 text-[#00FF99] text-[13px] font-black uppercase tracking-[0.8em] mb-32 hover:text-white transition-all group"
            >
              <ChevronRight size={20} className="rotate-180 group-hover:translate-x-[-6px] transition-transform" /> Back to hub archive
            </button>
            <div className="space-y-16">
              <div className="flex items-center gap-8">
                <span className="bg-[#00FF99] text-black px-6 py-1.5 text-[11px] font-black uppercase tracking-[0.3em]">{activeReport.category}</span>
                <span className="text-slate-700 font-mono text-[11px] tracking-[0.4em] uppercase">{activeReport.author}</span>
                <span className="text-slate-900 font-mono text-[11px] tracking-widest uppercase ml-auto">DOC_REF: {activeReport.id.toUpperCase()}</span>
              </div>
              <div className="border-l-4 border-[#1A1A1A] pl-16 py-4">
                {activeReport.content}
              </div>
              
              <div className="pt-40 border-t border-[#1A1A1A] mt-40">
                <h4 className="text-[11px] font-black uppercase tracking-[1em] text-slate-800 mb-20">Correlation Protocols</h4>
                <div className="grid grid-cols-2 gap-10">
                  {KNOWLEDGE_BASE.filter(r => r.id !== activeReport.id).slice(0, 2).map(r => (
                    <div key={r.id} onClick={() => openReport(r)} className="bg-[#050505] border border-[#1A1A1A] p-12 hover:border-[#00FF99]/20 cursor-pointer transition-all">
                      <span className="text-[9px] font-mono text-[#00FF99]/40 mb-5 block uppercase tracking-widest">{r.category}</span>
                      <h5 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{r.title}</h5>
                      <p className="text-xs text-slate-700 line-clamp-2">{r.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SYSTEM FOOTER */}
      <footer className="pt-48 pb-20 px-16 border-t border-[#1A1A1A] bg-[#030303] mt-32">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-32 mb-40 max-w-[1600px] mx-auto">
          <div className="col-span-2 space-y-12">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#00FF99] flex items-center justify-center text-black font-black text-3xl">O</div>
              <span className="text-white font-black uppercase tracking-[0.6em] text-lg">OVD Structural Bureau</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed uppercase tracking-[0.4em] max-w-md">Professional authority in structural material simulation, forensic silicate engineering, and aerospace-grade facade logic protocols.</p>
            <div className="flex gap-10">
              <Globe size={20} className="text-slate-800 hover:text-[#00FF99] transition-colors cursor-pointer" />
              <Lock size={20} className="text-slate-800 hover:text-[#00FF99] transition-colors cursor-pointer" />
              <Processor size={20} className="text-slate-800 hover:text-[#00FF99] transition-colors cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-[12px] font-black text-[#00FF99] uppercase tracking-[0.6em] mb-14">Labs</h4>
            <ul className="space-y-8 text-[11px] font-bold uppercase tracking-[0.4em] text-slate-800">
              <li className="hover:text-white cursor-pointer" onClick={() => setView('engine')}>Analysis Core</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setView('hub')}>Intelligence Hub</li>
              <li className="hover:text-white cursor-pointer">HST Verification</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-black text-[#00FF99] uppercase tracking-[0.6em] mb-14">Parity</h4>
            <ul className="space-y-8 text-[11px] font-bold uppercase tracking-[0.4em] text-slate-800">
              <li className="hover:text-white cursor-pointer">Security Stack</li>
              <li className="hover:text-white cursor-pointer">ASTM Compliance</li>
              <li className="hover:text-white cursor-pointer">Bureau Terms</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-black text-[#00FF99] uppercase tracking-[0.6em] mb-14">Nodes</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#00FF99]" />
                <span className="text-[11px] font-mono text-slate-800 uppercase tracking-widest">Orbital_Sync: OK</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#00FF99]" />
                <span className="text-[11px] font-mono text-slate-800 uppercase tracking-widest">Encrypt_Active: ON</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 text-[10px] font-mono text-slate-900 uppercase tracking-[1.2em] gap-12">
          <p>© 2026 OVD Bureau Engineering. MISSION_CRITICAL_SAAS_v4.1.0_AERO_SPEC</p>
          <div className="flex gap-20">
            <span>NASA_SIM_AUTH</span>
            <span>GOVT_X9_VERIFIED</span>
            <span>LICENSE: $10k_SaaS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
