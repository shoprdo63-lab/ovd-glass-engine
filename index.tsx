
import './globals.css';
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Database, Crosshair, Settings, Monitor, Terminal, Cpu, 
  ArrowUpRight, Globe, Lock, Loader2, Activity, Shield, 
  FileCode, Zap, ChevronRight, Menu, X, BookOpen, 
  ShieldCheck, HelpCircle, Calendar, Clock, UserCheck, Mail, Info,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const METADATA = {
  NODE_ID: "BUREAU_7X_CORE",
  VERSION: "5.0.0_INTERACTIVE",
  AUTH_LEVEL: "S1_BUREAU_ADMIN",
  ENC_PROTOCOL: "AES_512_GCM",
  RUNTIME_STATUS: "LIVE_PARITY_ACTIVE"
};

const PARAMETERS = [
  { key: "latencyBuffer", label: "Latency Parity", min: 0, max: 100, unit: "ms", desc: "Stabilization offset for asynchronous structural threads." },
  { key: "encryptionEntropy", label: "Encryption Entropy", min: 0, max: 1.0, step: 0.01, unit: "h", desc: "Degree of randomness in manifest key generation." },
  { key: "structuralLoad", label: "Structural Load", min: 0, max: 5.0, step: 0.1, unit: "C_l", desc: "Stress distributed across the architecture." },
  { key: "threadConcurrency", label: "Thread Concurrency", min: 1, max: 128, unit: "thr", desc: "Parallelized execution nodes." },
  { key: "thermalThreshold", label: "Thermal Logic", min: 200, max: 1500, unit: "K", desc: "Critical limit before algorithmic degradation." },
  { key: "eigenvalueParity", label: "Eigenvalue Parity", min: 0, max: 20.0, step: 0.5, unit: "λ", desc: "Bifurcation threshold for structural components." }
];

const LiveCodeManifest = ({ settings }: { settings: any }) => {
  const [lastUpdateKey, setLastUpdateKey] = useState(0);

  useEffect(() => {
    setLastUpdateKey(prev => prev + 1);
  }, [settings]);

  const jsonContent = useMemo(() => {
    return {
      manifest_id: `OVD_${METADATA.NODE_ID}`,
      engine_parity: settings.structuralLoad > 4 ? "CRITICAL" : "STABLE",
      dynamic_parameters: {
        load_coeff: settings.structuralLoad,
        entropy_matrix: settings.encryptionEntropy,
        thermal_limit: settings.thermalThreshold,
        eigen_val: settings.eigenvalueParity
      },
      concurrency: {
        threads: settings.threadConcurrency,
        sync_offset: `${settings.latencyBuffer}ms`
      },
      security: {
        protocol: METADATA.ENC_PROTOCOL,
        auth: METADATA.AUTH_LEVEL
      }
    };
  }, [settings]);

  return (
    <div className="relative flex-grow bg-[#020202] border border-border p-8 font-mono text-[11px] leading-relaxed syntax-flicker overflow-hidden flex flex-col">
      <div className="absolute inset-0 instrumentation-grid opacity-20 pointer-events-none" />
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <Terminal size={12} className="text-accent" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">Realtime_Manifest_Stream</span>
        </div>
        <div className="flex gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
           <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
        </div>
      </div>
      <pre className="relative z-10 custom-scroll overflow-y-auto h-full text-slate-400">
        <code key={lastUpdateKey} className="code-value-update">
          {JSON.stringify(jsonContent, null, 2)}
        </code>
      </pre>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/30 scanning-line pointer-events-none z-20" />
    </div>
  );
};

const InteractiveLogo = ({ settings }: { settings: any }) => {
  // הלוגו מגיב לשינויים בזמן אמת
  const loadColor = settings.structuralLoad > 4.0 ? 'var(--warning-red)' : 'var(--neon-mint)';
  const rotationSpeed = (101 - settings.latencyBuffer) / 10;
  const logoScale = 1 + (settings.structuralLoad / 15);
  const glowIntensity = settings.thermalThreshold / 1500;

  return (
    <div className="relative flex items-center justify-center p-20 group">
      {/* Halo Glow */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-[100px] transition-all duration-1000"
        style={{ 
          backgroundColor: loadColor, 
          opacity: 0.1 * glowIntensity,
          transform: `scale(${1 + glowIntensity})`
        }} 
      />

      {/* Main Interactive SVG Logo */}
      <div className="relative" style={{ transform: `scale(${logoScale})` }}>
        <svg width="200" height="200" viewBox="0 0 200 200" className="transition-all duration-300">
          {/* Outer Ring - Rotates with Latency */}
          <circle 
            cx="100" cy="100" r="90" 
            fill="none" 
            stroke={loadColor} 
            strokeWidth="1" 
            strokeDasharray="10 20" 
            className="opacity-20"
            style={{ 
              animation: `spin ${rotationSpeed}s linear infinite`,
              transformOrigin: 'center'
            }}
          />
          
          {/* Middle Ring - Responds to Entropy */}
          <circle 
            cx="100" cy="100" r="75" 
            fill="none" 
            stroke={loadColor} 
            strokeWidth={1 + settings.encryptionEntropy * 4} 
            className="opacity-40"
            style={{ transition: 'all 0.3s ease' }}
          />

          {/* Core Symbol - The "O" */}
          <path 
            d="M100 60 A40 40 0 1 1 100 140 A40 40 0 1 1 100 60" 
            fill="none" 
            stroke="white" 
            strokeWidth="12" 
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
          
          {/* Dynamic Accents */}
          <line 
            x1="100" y1="20" x2="100" y2="40" 
            stroke={loadColor} 
            strokeWidth="2"
            style={{ transform: `rotate(${settings.eigenvalueParity * 18}deg)`, transformOrigin: 'center' }}
          />
        </svg>

        {/* Floating Telemetry Tags */}
        <div className="absolute -top-10 -right-20 flex flex-col items-end gap-1 font-mono text-[9px] text-accent/50">
          <span>PARITY_INDEX</span>
          <span className="text-white text-sm font-black italic">{settings.structuralLoad.toFixed(2)}</span>
        </div>
        <div className="absolute -bottom-10 -left-20 flex flex-col items-start gap-1 font-mono text-[9px] text-accent/50">
          <span>EIGEN_VAL</span>
          <span className="text-white text-sm font-black italic">{settings.eigenvalueParity.toFixed(1)}λ</span>
        </div>
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
  const [log, setLog] = useState<string | null>(null);

  const triggerAudit = async () => {
    setAnalyzing(true);
    try {
      // Fix: Always use the latest instance for calls
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform forensic structural audit. Load: ${settings.structuralLoad}, Eigenvalue: ${settings.eigenvalueParity}. Output mission-critical telemetry. Monospaced.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { systemInstruction: "Output deterministic engineering telemetry. Clinical tone." }
      });
      // Fix: response.text is a property, not a function
      setLog(response.text || "AUDIT_FAILURE");
    } catch (e) {
      setLog("ERROR: Connection to Bureau Core lost.");
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
              <span className="premium-header text-[12px] leading-none">OVD BUREAU</span>
              <span className="text-[9px] font-mono text-accent/50 uppercase tracking-[0.2em]">{METADATA.VERSION}</span>
            </div>
          </div>
          <nav className="hidden lg:flex gap-10">
            {['SIMULATION', 'KNOWLEDGE', 'DOCS', 'API'].map(item => (
              <button key={item} className="text-[10px] font-black tracking-[0.4em] text-slate-500 hover:text-white transition-all">{item}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
             <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{METADATA.ENC_PROTOCOL}</span>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-mono text-accent uppercase tracking-widest">ACTIVE_PARITY</span>
             </div>
           </div>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-12 gap-px bg-border overflow-hidden">
        {/* Left Control Column */}
        <aside className="col-span-12 lg:col-span-3 bg-surface p-10 flex flex-col gap-10 overflow-y-auto custom-scroll border-r border-border">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <Settings size={18} className="text-accent" />
            <span className="text-[11px] font-black tracking-telemetry text-white uppercase italic">System_Logic</span>
          </div>

          <div className="flex flex-col gap-10">
            {PARAMETERS.map(param => (
              <div key={param.key} className="flex flex-col gap-3 group">
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
            onClick={triggerAudit}
            disabled={analyzing}
            className="mt-auto bg-accent text-black font-black py-6 text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white disabled:opacity-40 transition-all shadow-[0_0_30px_rgba(0,255,153,0.2)] active:scale-95"
          >
            {analyzing ? <Loader2 size={18} className="animate-spin" /> : <Shield size={18} />}
            {analyzing ? 'AUDITING...' : 'INITIATE_FORENSIC_AUDIT'}
          </button>
        </aside>

        {/* Center/Right Dynamic Column */}
        <section className="col-span-12 lg:col-span-9 bg-black flex flex-col">
          <div className="grid grid-rows-12 h-full gap-px bg-border">
            
            {/* Simulation Zone with Interactive Logo */}
            <div className="row-span-7 bg-[#050505] relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 instrumentation-grid opacity-30 pointer-events-none" />
               <div className="absolute top-10 left-10 flex flex-col gap-2">
                 <span className="text-[10px] font-black tracking-[0.5em] text-accent/50 uppercase italic">Visual_Forensics</span>
                 <div className="w-12 h-px bg-accent/20" />
               </div>
               
               <InteractiveLogo settings={settings} />

               {/* Grid Metrics Overlays */}
               <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-[10px] font-mono text-slate-800 tracking-[0.5em] uppercase">
                 <span>Lat: {settings.latencyBuffer}ms</span>
                 <span>Thr: {settings.threadConcurrency}</span>
                 <span>Ent: {settings.encryptionEntropy}h</span>
               </div>
            </div>

            {/* Live Manifest Code Zone */}
            <div className="row-span-5 bg-black flex flex-col">
               <LiveCodeManifest settings={settings} />
            </div>

          </div>
        </section>
      </main>

      {/* Authority Content Layer */}
      <footer className="bg-surface border-t border-border px-12 py-24 flex flex-col gap-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="metallic-heading text-6xl md:text-8xl italic uppercase leading-none">
            Structural Glass & Silicate Load Analysis
          </h2>
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto italic">
            Professional-grade structural silicate simulation and forensic failure analysis. 
            Compliant with ASTM E1300 and international engineering benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-border pt-20">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center text-black font-black text-xl">O</div>
              <span className="premium-header text-sm">OVD_BUREAU</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] leading-relaxed text-slate-800">
              Enterprise structural material simulation platform. Aerospace-grade silicate verification logic bureau.
            </p>
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">Verification</span>
            <ul className="text-[10px] font-mono text-slate-700 space-y-4 tracking-widest uppercase">
              {/* Fix: CheckCircle2 is now correctly imported from lucide-react */}
              <li className="flex items-center gap-2"><CheckCircle2 size={12} /> ASTM_E1300_PARITY</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} /> ISO_9001_COMPLIANT</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} /> NASA_SIM_AUTH_V2</li>
            </ul>
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">Infrastructure</span>
            <ul className="text-[10px] font-mono text-slate-700 space-y-4 tracking-widest uppercase">
              <li className="flex items-center gap-2"><Globe size={12} /> GLOBAL_SYNC_STABLE</li>
              <li className="flex items-center gap-2"><Lock size={12} /> ENCRYPTED_STREAM</li>
              <li className="flex items-center gap-2"><Activity size={12} /> REALTIME_FORENSICS</li>
            </ul>
          </div>

          <div className="flex flex-col items-end gap-10">
            <div className="text-right">
              <div className="text-[11px] font-mono text-slate-900 tracking-[1.5em] uppercase mb-2">License_Verified</div>
              <div className="text-[10px] font-mono text-slate-800 tracking-[0.4em] uppercase">Node_Auth: {METADATA.AUTH_LEVEL}</div>
            </div>
            <div className="flex items-center gap-4 bg-black p-4 border border-border shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#00FF99] animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Bureau_Connection: Stable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
