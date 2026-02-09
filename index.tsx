import './globals.css';
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Database, Crosshair, Settings, Monitor, Terminal, Cpu, 
  ArrowUpRight, Globe, Lock, Loader2, Activity, Shield, 
  FileCode, Zap, ChevronRight, Menu, X, BookOpen, 
  ShieldCheck, HelpCircle, Calendar, Clock, UserCheck, Mail
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const METADATA = {
  NODE_ID: "BUREAU_7X_ORBITAL",
  VERSION: "4.3.0_DYNAMICS",
  AUTH_LEVEL: "BUREAU_ALPHA_CERT",
  ENC_PROTOCOL: "AES_512_HYPER_SYNC",
  RUNTIME_STATUS: "DYNAMIC_CORE_ACTIVE"
};

const PARAMETERS = [
  { key: "latencyBuffer", label: "Latency Parity", min: 0, max: 100, unit: "ms", desc: "Asynchronous thread synchronization." },
  { key: "encryptionEntropy", label: "Entropy Matrix", min: 0, max: 1.0, step: 0.01, unit: "h", desc: "Randomness of manifest keys." },
  { key: "structuralLoad", label: "Structural Load", min: 0, max: 5.0, step: 0.1, unit: "C_l", desc: "Lateral stress multiplier." },
  { key: "threadConcurrency", label: "Core Threads", min: 1, max: 128, unit: "thr", desc: "Parallel processing nodes." },
  { key: "thermalThreshold", label: "Thermal Limit", min: 200, max: 1500, unit: "K", desc: "Algorithmic stability boundary." },
  { key: "eigenvalueParity", label: "Eigen Parity", min: 0, max: 20.0, step: 0.5, unit: "λ", desc: "Buckling bifurcation factor." }
];

const DynamicCodeManifest = ({ settings }: { settings: any }) => {
  const jsonCode = useMemo(() => {
    return `{
  "manifest_id": "OVD_${METADATA.NODE_ID}",
  "timestamp": "${new Date().toISOString()}",
  "engine_state": {
    "load_coeff": ${settings.structuralLoad},
    "entropy": ${settings.encryptionEntropy},
    "thermal_parity": "${settings.thermalThreshold}K"
  },
  "concurrency": {
    "active_threads": ${settings.threadConcurrency},
    "buffer_latency": "${settings.latencyBuffer}ms"
  },
  "structural_analysis": {
    "eigen_factor": ${settings.eigenvalueParity},
    "stability": "${settings.structuralLoad > 4.0 ? 'CRITICAL' : 'STABLE'}",
    "fracture_risk": "${(settings.structuralLoad * settings.eigenvalueParity / 10).toFixed(2)}%"
  },
  "security": {
    "protocol": "${METADATA.ENC_PROTOCOL}",
    "auth": "${METADATA.AUTH_LEVEL}"
  }
}`;
  }, [settings]);

  return (
    <div className="relative flex-grow bg-[#020202] border border-border p-8 font-mono text-[13px] leading-relaxed syntax-flicker overflow-hidden flex flex-col">
      <div className="absolute inset-0 instrumentation-grid opacity-30 pointer-events-none" />
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <FileCode size={14} className="text-accent" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">Real-time_Manifest_Core</span>
        </div>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500/20" />
           <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
           <div className="w-2 h-2 rounded-full bg-green-500/20" />
        </div>
      </div>
      <pre className="relative z-10 custom-scroll overflow-y-auto">
        {jsonCode.split('\n').map((line, i) => (
          <div key={i} className="hover:bg-accent/5 transition-colors px-2">
            <span className="text-white/20 mr-4 select-none">{(i + 1).toString().padStart(2, '0')}</span>
            <span dangerouslySetInnerHTML={{ 
              __html: line
                .replace(/"([^"]+)":/g, '<span class="syntax-keyword">"$1"</span>:')
                .replace(/: "([^"]+)"/g, ': <span class="syntax-string">"$1"</span>')
                .replace(/: ([\d.]+)/g, ': <span class="syntax-number">$1</span>')
            }} />
          </div>
        ))}
      </pre>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/30 scanning-line pointer-events-none" />
    </div>
  );
};

const DynamicLogo = ({ settings }: { settings: any }) => {
  // חישוב גודל וסיבוב לפי הפרמטרים
  const scale = 1 + (settings.structuralLoad / 10);
  const rotation = settings.eigenvalueParity * 18;
  const glow = settings.thermalThreshold / 1500;

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px]" style={{ opacity: glow }} />
      <div 
        className="logo-pulse relative w-48 h-48 border-[10px] border-accent flex items-center justify-center shadow-[0_0_50px_rgba(0,255,153,0.2)]"
        style={{ 
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          borderColor: settings.structuralLoad > 4.0 ? '#ff3333' : '#00FF99',
          boxShadow: `0 0 ${glow * 100}px ${settings.structuralLoad > 4.0 ? 'rgba(255,51,51,0.4)' : 'rgba(0,255,153,0.4)'}`
        }}
      >
        <span className="text-7xl font-black text-white italic select-none">O</span>
        
        {/* קישוטים מסביב ללוגו שמשתנים */}
        <div className="absolute inset-[-20px] border border-accent/20 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-[-40px] border border-accent/10 rounded-full animate-spin" style={{ animationDuration: '20s', direction: 'reverse' }} />
        
        {/* קווי אינסטרומנטציה */}
        <div className="absolute h-[150%] w-[1px] bg-accent/10 rotate-45" />
        <div className="absolute h-[150%] w-[1px] bg-accent/10 -rotate-45" />
      </div>
      
      {/* תגיות טקסט צפות ליד הלוגו */}
      <div className="absolute -right-32 top-0 flex flex-col gap-1 items-start">
        <span className="text-[9px] font-mono text-accent/50 uppercase">Sync_Node</span>
        <span className="text-xl font-black text-white italic">{settings.structuralLoad.toFixed(2)}</span>
      </div>
      <div className="absolute -left-32 bottom-0 flex flex-col gap-1 items-end">
        <span className="text-[9px] font-mono text-accent/50 uppercase">Eigen_Val</span>
        <span className="text-xl font-black text-white italic">{settings.eigenvalueParity.toFixed(1)}</span>
      </div>
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
  const [auditLog, setAuditLog] = useState<string | null>(null);

  const runAudit = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform structural forensic audit on OVD Manifest. Load: ${settings.structuralLoad}, Entropy: ${settings.encryptionEntropy}. Output clinical engineering log.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { systemInstruction: "You are OVD BUREAU AI. Output deterministic engineering telemetry." }
      });
      setAuditLog(response.text || "AUDIT_ERR");
    } catch (e) {
      setAuditLog("CRITICAL_ERROR: Parity verification failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-[100] glass-panel h-16 px-12 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('engine')}>
            <div className="w-10 h-10 bg-accent flex items-center justify-center text-black font-black text-2xl shadow-[0_0_20px_#00FF99]">O</div>
            <div className="flex flex-col">
              <span className="text-[13px] font-black tracking-[0.4em] text-white leading-none">OVD BUREAU</span>
              <span className="text-[9px] font-mono text-accent/50 uppercase">{METADATA.VERSION}</span>
            </div>
          </div>
          <nav className="hidden lg:flex gap-10">
            {['SIMULATION', 'MANIFEST', 'KNOWLEDGE', 'DOCS'].map(nav => (
              <button key={nav} className="text-[10px] font-black tracking-[0.4em] text-slate-500 hover:text-accent transition-all uppercase">{nav}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase">{METADATA.ENC_PROTOCOL}</span>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-mono text-accent tracking-widest uppercase">{METADATA.RUNTIME_STATUS}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-12 gap-px bg-border overflow-hidden">
        {/* Left Control Column */}
        <aside className="col-span-12 lg:col-span-3 bg-surface p-10 flex flex-col gap-10 overflow-y-auto custom-scroll border-r border-border">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <Settings size={18} className="text-accent" />
            <span className="text-[11px] font-black tracking-telemetry text-white uppercase italic">SYSTEM_PARAMETERS</span>
          </div>

          <div className="flex flex-col gap-10">
            {PARAMETERS.map(param => (
              <div key={param.key} className="flex flex-col gap-4 group">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em]">
                  <label className="text-slate-500 group-hover:text-white transition-colors">{param.label}</label>
                  <span className="text-accent font-bold">{(settings as any)[param.key]}{param.unit}</span>
                </div>
                <input 
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step || 1}
                  value={(settings as any)[param.key]}
                  onChange={(e) => setSettings({...settings, [param.key]: parseFloat(e.target.value)})}
                  className="bureau-slider"
                />
                <p className="text-[9px] text-slate-800 tracking-widest font-mono uppercase leading-relaxed">{param.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={runAudit}
            disabled={analyzing}
            className="mt-auto bg-accent text-black font-black py-6 text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white disabled:opacity-40 transition-all shadow-[0_0_30px_rgba(0,255,153,0.2)]"
          >
            {analyzing ? <Loader2 size={18} className="animate-spin" /> : <Shield size={18} />}
            {analyzing ? 'AUDITING...' : 'INITIATE_FORENSIC_AUDIT'}
          </button>
        </aside>

        {/* Center Simulation & Manifest Column */}
        <section className="col-span-12 lg:col-span-9 bg-black flex flex-col">
          <div className="grid grid-rows-12 h-full gap-px bg-border">
            
            {/* Simulation Header with Variable Logo */}
            <div className="row-span-7 bg-[#050505] relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 instrumentation-grid opacity-20 pointer-events-none" />
              <div className="absolute top-10 left-10 flex flex-col gap-2">
                <span className="premium-title text-sm">Visual_Telemetry</span>
                <div className="w-20 h-px bg-accent/20" />
              </div>
              
              <DynamicLogo settings={settings} />

              <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-[10px] font-mono text-slate-800 tracking-[0.5em] uppercase">
                <span>Load: {settings.structuralLoad.toFixed(2)}C_l</span>
                <span>Eigen: {settings.eigenvalueParity.toFixed(2)}λ</span>
              </div>
            </div>

            {/* Live Manifest Code Output */}
            <div className="row-span-5 bg-black flex flex-col">
               <DynamicCodeManifest settings={settings} />
            </div>

          </div>
        </section>
      </main>

      {/* Footer / Knowledge Layer */}
      <footer className="bg-surface border-t border-border px-12 py-20 flex flex-col gap-12">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-6xl font-black text-white italic tracking-tighter metallic-text uppercase leading-none">
            Structural Glass Engineering & Load Analysis
          </h2>
          <p className="text-lg text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">
            Our OVD Bureau provides mission-critical simulation parity for monumental silicate architectures. 
            Utilizing high-entropy encryption and real-time Von Karman non-linear modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-border pt-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-accent flex items-center justify-center text-black font-black">O</div>
              <span className="text-white font-black tracking-[0.4em] uppercase">OVD_BUREAU</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] leading-relaxed text-slate-800">
              Advanced structural logic and forensic manifest analysis bureau. Aerospace-grade silicate verification protocols.
            </p>
          </div>
          
          <div className="space-y-6">
             <span className="text-[11px] font-black tracking-[0.4em] text-accent uppercase">Simulation_Info</span>
             <ul className="text-[10px] font-mono text-slate-700 space-y-3 tracking-widest uppercase">
               <li>ASTM_E1300_COMPLIANT</li>
               <li>ISO_9001_CERTIFIED</li>
               <li>NASA_SIM_AUTH_V4</li>
             </ul>
          </div>

          <div className="space-y-6">
             <span className="text-[11px] font-black tracking-[0.4em] text-accent uppercase">Connect_Manifest</span>
             <ul className="text-[10px] font-mono text-slate-700 space-y-3 tracking-widest uppercase">
               <li className="flex items-center gap-3"><Globe size={12} /> Global_Sync</li>
               <li className="flex items-center gap-3"><Lock size={12} /> Encrypted_Stream</li>
               <li className="flex items-center gap-3"><Mail size={12} /> Bureau_Report</li>
             </ul>
          </div>

          <div className="flex flex-col items-end gap-6">
             <div className="text-right">
               <div className="text-[11px] font-mono text-slate-900 tracking-[1.5em] uppercase mb-2">License_Active</div>
               <div className="text-[10px] font-mono text-slate-800 tracking-[0.4em] uppercase">Auth_Node: {METADATA.AUTH_LEVEL}</div>
             </div>
             <div className="flex items-center gap-4 bg-black p-4 border border-border">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#00FF99] animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Realtime_Sync: ON</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);