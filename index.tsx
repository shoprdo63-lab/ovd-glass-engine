import './globals.css';
import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Database, Crosshair, Command, Settings, Monitor, Compass, 
  Copy, CheckCircle2, Terminal, Cpu, ArrowUpRight, Globe, Lock, 
  Loader2, Activity, Shield, Code, Server, Search, HardDrive, 
  Cpu as CpuIcon, Terminal as TerminalIcon, FileCode, Zap, AlertTriangle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TELEMETRY DEFINITIONS ---
const METADATA = {
  NODE_ID: "BUREAU_7X",
  ENC_PROTOCOL: "AES-256_GCM",
  SYS_LOAD: "12.4%",
  RUNTIME_STATUS: "PARITY_VERIFIED",
  LATENCY: "1.24 MS",
  AUTH_LEVEL: "S1_AERO_GOV"
};

const PARAMETERS = [
  { key: "latencyBuffer", label: "LATENCY BUFFER PARITY", min: 0, max: 100, unit: "MS", desc: "Stabilization offset for asynchronous structural threads." },
  { key: "encryptionEntropy", label: "ENCRYPTION ENTROPY MATRIX", min: 0, max: 1.0, step: 0.01, unit: "H", desc: "Degree of randomness in manifest key generation." },
  { key: "structuralLoad", label: "STRUCTURAL LOAD COEFFICIENT", min: 0, max: 2.0, step: 0.05, unit: "C_l", desc: "Virtual stress distributed across the code architecture." },
  { key: "threadConcurrency", label: "THREAD CONCURRENCY INDEX", min: 1, max: 64, unit: "THR", desc: "Maximum parallelized execution nodes for failure simulation." },
  { key: "thermalLogic", label: "THERMAL LOGIC THRESHOLD", min: 300, max: 1200, unit: "K", desc: "Critical limit before algorithmic degradation occurs." },
  { key: "eigenvalueParity", label: "EIGENVALUE PARITY FACTOR", min: 1.0, max: 10.0, step: 0.1, unit: "λ", desc: "Bifurcation threshold for slender components." }
];

const FORENSIC_AUDITS = [
  { id: 'AUDIT-01', title: 'Asynchronous Deadlock Mitigation in Silicate Logic', tag: 'SYNCHRONIZATION', metric: 'λ_crit: 1.44', abstract: 'Evaluation of secondary torsional instability in monolithic fins where execution delay exceeds threshold for lateral support margins.' },
  { id: 'AUDIT-02', title: 'Memory Leak Propagation in Laminated Structures', tag: 'HEAP_ANALYSIS', metric: 'σ_leak: 4.2MB', abstract: 'Forensic documentation of surface compression variance where localized cooling rates stay below operational parity in the memory heap.' },
  { id: 'AUDIT-03', title: 'Buffer Overflow in Thermal Gradient Sensors', tag: 'SECURITY_AUDIT', metric: 'P_overflow: 0.88', abstract: 'Shockwave impulse modeling where input duration exceeds structural envelope for standard lamination logic buffer.' },
  { id: 'AUDIT-04', title: 'Recursive Fault Detection in Anisotropic Substrates', tag: 'FAULT_TOLERANCE', metric: 'Δ_drift: 2.5%', abstract: 'Kinematic study of joint rotation where inter-story displacement exceeds tolerance threshold for unit engagement in code.' },
  { id: 'AUDIT-05', title: 'Logic Gate Failure during Seismic Story Displacement', tag: 'HARDWARE_PARITY', metric: 'P_fracture: 0.98', abstract: 'Alpha-to-beta phase transition kinetics in tempered glass where internal stress remains above thermal boundary in the gate.' },
  { id: 'AUDIT-06', title: 'Sub-routine Conflict in NiS Inclusion Forecasting', tag: 'CONFLICT_RESO', metric: 'ΔT_edge: 42K', abstract: 'Edge stress analysis where absorption differential exceeds structural failure envelope during transient solar cycles in sub-routines.' },
  { id: 'AUDIT-07', title: 'Heap Corruption during Viscoelastic Shear Modeling', tag: 'DATA_INTEGRITY', metric: 'τ_sust: 0.11MPa', abstract: 'Long-term shear yield modeling where dead load duration exceeds stability envelope for 50-year service life in the heap.' },
  { id: 'AUDIT-08', title: 'Concurrent Thread Desync in Large-Deflection Calculus', tag: 'CONCURRENCY', metric: 'w/t: 1.52', abstract: 'Non-linear stiffening analysis where central deflection exceeds plate thickness threshold by a factor of 1.5 in concurrent threads.' }
];

// --- COMPONENTS ---

const TelemetryHeader = () => (
  <header className="sticky top-0 z-50 glass-panel h-16 px-8 flex items-center justify-between border-b border-border">
    <div className="flex items-center gap-16">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-accent flex items-center justify-center text-black font-black text-2xl shadow-[0_0_25px_#00FF99]">O</div>
        <div className="flex flex-col">
          <span className="text-[13px] font-black tracking-[0.4em] text-white leading-none">OVD_MANIFEST_CONSOLE</span>
          <span className="text-[10px] font-mono text-accent/50 tracking-[0.4em]">AUTH: {METADATA.AUTH_LEVEL}</span>
        </div>
      </div>
      <nav className="hidden xl:flex gap-12">
        {['MANIFEST_IDE', 'FORENSIC_DATABASE', 'SECURITY_SIM', 'KERNEL_LOGS'].map(item => (
          <button key={item} className="text-[10px] font-black tracking-[0.4em] text-slate-500 hover:text-accent transition-colors active:scale-95">{item}</button>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-12">
      <div className="flex flex-col items-end">
        <span className="micro-telemetry text-slate-500">{METADATA.ENC_PROTOCOL}</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FF99]" />
          <span className="micro-telemetry text-accent">{METADATA.RUNTIME_STATUS}</span>
        </div>
      </div>
      <button className="bg-accent text-black text-[10px] font-black px-8 py-3 tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,153,0.3)] active:scale-95">RELOAD_SYSTEM</button>
    </div>
  </header>
);

const IdeCoreManifest = () => {
  const codeContent = `{
  "manifest_id": "BUREAU_7X_STRICT_CORE",
  "simulation_kernel": "0xFA_44_12_VER_4",
  "layers": [
    { "type": "SILICATE_PRIMARY", "thickness": 12.0, "status": "VERIFIED" },
    { "type": "PVB_INTERLAYER", "adhesion_coeff": 0.85, "thermal_limit": "STABLE" }
  ],
  "failure_modes": {
    "torsional_buckling": { "threshold": 1.44, "state": "NOMINAL" },
    "shear_deflection": { "margin": "above_critical", "coefficient": 0.11 }
  },
  "runtime_telemetry": {
    "latency_buffer": "1.24ms",
    "cpu_load": "12.4%",
    "concurrency_index": 64,
    "heap_stability": 0.999
  },
  "security_audit": {
    "protocol": "AES-256_GCM",
    "entropy": "OPTIMAL",
    "parity": "SYNCED"
  },
  "signature": "OVD_SYSTEMS_ROOT_VERIFIED"
}`;

  return (
    <div className="relative flex-grow bg-black border border-border overflow-hidden group font-mono text-[13px] leading-relaxed syntax-flicker flex flex-col">
      <div className="absolute inset-0 instrumentation-grid opacity-20 pointer-events-none" />
      
      {/* Instrumentation Axis Markers */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 text-[9px] text-accent/30 tracking-[0.5em] pointer-events-none z-20">
        <span>X_COORD: {Math.random().toFixed(4)}</span>
        <span>Y_COORD: {Math.random().toFixed(4)}</span>
        <span>Z_COORD: 0.0000</span>
      </div>

      <div className="p-12 text-accent/90 h-full overflow-y-auto custom-scroll relative z-10">
        <div className="flex items-center gap-4 mb-8 border-b border-accent/10 pb-4">
          <FileCode size={14} className="text-accent/50" />
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-50">CODE_INTEGRITY_MANIFEST_CORE_v7.1.0</span>
          <div className="ml-auto flex gap-4">
             <span className="text-[9px] text-accent/20">UTF-8</span>
             <span className="text-[9px] text-accent/20">JSON_STRICT</span>
          </div>
        </div>
        <pre className="selection:bg-accent selection:text-black">
          {codeContent}
        </pre>
        {/* Active Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/40 scanning-line pointer-events-none z-20" />
      </div>

      {/* Dynamic Telemetry Corner Overlay */}
      <div className="absolute bottom-6 right-8 flex flex-col items-end gap-1 pointer-events-none z-20">
        <span className="text-[10px] text-slate-800 font-mono tracking-[0.4em] uppercase">NODE: {METADATA.NODE_ID}</span>
        <span className="text-[10px] text-slate-800 font-mono tracking-[0.4em] uppercase">LOAD: {METADATA.SYS_LOAD}</span>
        <span className="text-[10px] text-slate-800 font-mono tracking-[0.4em] uppercase">ENC: {METADATA.ENC_PROTOCOL}</span>
      </div>
    </div>
  );
};

const MetricBlock = ({ label, val, status, unit }: { label: string, val: string, status: string, unit: string }) => (
  <div className="glass-panel p-10 flex flex-col gap-6 border-r border-border hover:bg-white/[0.03] transition-all cursor-default group overflow-hidden relative">
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
       <Zap size={12} className="text-accent" />
    </div>
    <span className="text-[10px] font-black tracking-[0.4em] text-slate-600 uppercase group-hover:text-slate-400 transition-colors">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-5xl italic font-black text-white metallic-text tracking-tighter">{val}</span>
      <span className="text-xs font-mono text-slate-700 tracking-telemetry">{unit}</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#00FF99]" />
      <span className="text-[10px] font-mono text-accent/40 tracking-[0.4em] uppercase">{status}</span>
    </div>
  </div>
);

const App = () => {
  const [settings, setSettings] = useState({
    latencyBuffer: 42,
    encryptionEntropy: 0.74,
    structuralLoad: 1.4,
    threadConcurrency: 64,
    thermalLogic: 800,
    eigenvalueParity: 7.2
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [auditLog, setAuditLog] = useState<string | null>(null);

  const runManifestAudit = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform clinical code integrity audit and forensic structural manifest analysis. Parameters: Latency ${settings.latencyBuffer}ms, Entropy ${settings.encryptionEntropy}, Load ${settings.structuralLoad}, Concurrency ${settings.threadConcurrency}. Output technical forensic audit telemetry. Monospaced terminal tone only. Descriptive wording only, avoid raw angle brackets.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          systemInstruction: "You are a mission-critical forensic code auditor. Output deterministic terminal telemetry. Descriptive wording: exceeds threshold, below safety margin, above thermal limit. Never use < or > symbols."
        }
      });
      setAuditLog(response.text || "AUDIT_ERR: NULL_STREAM");
    } catch (e) {
      setAuditLog("CRITICAL_ERROR: Parity verification failure. Session terminated by kernel.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-300">
      <TelemetryHeader />
      
      <main className="flex-grow grid grid-cols-12 gap-px bg-border overflow-hidden">
        {/* SIDEBAR: PARAMETER LAB (Cols 1-3) */}
        <aside className="col-span-12 lg:col-span-3 bg-surface p-12 flex flex-col gap-12 overflow-y-auto custom-scroll border-r border-border">
          <div className="flex items-center gap-6 border-b border-border pb-8">
            <Server size={20} className="text-accent" />
            <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase">PARAMETER LAB</span>
          </div>
          
          <div className="flex flex-col gap-12">
            {PARAMETERS.map(param => (
              <div key={param.key} className="flex flex-col gap-5 group">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.4em]">
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
                <p className="text-[10px] text-slate-800 tracking-widest font-mono uppercase leading-relaxed">{param.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-12 border-t border-border flex flex-col gap-6">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-800 tracking-[0.4em]">
              <span>MANIFEST_ID</span>
              <span>BUREAU_7X_STRICT</span>
            </div>
            <button 
              onClick={runManifestAudit}
              disabled={analyzing}
              className="w-full bg-accent text-black font-black py-6 text-[11px] tracking-[0.4em] flex items-center justify-center gap-5 hover:bg-white disabled:opacity-40 transition-all shadow-[0_0_25px_rgba(0,255,153,0.15)] active:scale-95"
            >
              {analyzing ? <Loader2 size={18} className="animate-spin" /> : <Shield size={18} />}
              {analyzing ? 'AUDITING...' : 'INITIATE AUDIT'}
            </button>
          </div>
        </aside>

        {/* MAIN CONSOLE: IDE CORE & AUDITS (Cols 4-12) */}
        <section className="col-span-12 lg:col-span-9 bg-black flex flex-col overflow-hidden">
          <div className="flex-grow flex flex-col gap-px">
            
            {/* Manifest IDE Core Window */}
            <div className="h-[560px] flex">
              <IdeCoreManifest />
            </div>

            {/* Metric Authority Strip */}
            <div className="grid grid-cols-4 bg-border">
              <MetricBlock label="HEAP_STABILITY" val="99.9" status="LOCKED" unit="PARITY" />
              <MetricBlock label="THREAD_SYNC" val="1:1" status="SYNCED" unit="THR" />
              <MetricBlock label="LOAD_COEFF" val={settings.structuralLoad.toFixed(2)} status="NOMINAL" unit="C_L" />
              <MetricBlock label="ENTROPY_IDX" val={settings.encryptionEntropy.toFixed(2)} status="OPTIMAL" unit="H" />
            </div>

            {/* Audit Log Terminal Output */}
            {auditLog && (
              <div className="bg-surface p-12 border-t border-border animate-in fade-in slide-in-from-bottom-8 max-h-[450px] overflow-y-auto custom-scroll relative">
                <div className="sticky top-0 bg-surface flex items-center gap-5 mb-10 pb-4 border-b border-border z-10">
                  <TerminalIcon size={18} className="text-accent" />
                  <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase">FORENSIC SECURITY AUDIT TELEMETRY</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[9px] font-mono text-accent/30 tracking-widest uppercase">REALTIME_DECRYPT</span>
                  </div>
                </div>
                <pre className="text-sm font-mono text-slate-500 whitespace-pre-wrap leading-relaxed">
                  {auditLog}
                </pre>
              </div>
            )}

            {/* Forensic Intelligence Archive (8-Card Grid) */}
            <div className="p-12 bg-black flex flex-col gap-10 flex-shrink-0">
              <div className="flex items-center gap-5">
                <HardDrive size={20} className="text-accent" />
                <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase">FORENSIC AUDIT REPOSITORY</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {FORENSIC_AUDITS.map(rpt => (
                  <div key={rpt.id} className="glass-panel p-8 flex flex-col gap-5 group cursor-pointer hover:border-accent/40 transition-all border border-border/60 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                       <AlertTriangle size={32} className="text-accent" />
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono text-accent/50 tracking-[0.4em] uppercase">{rpt.tag}</span>
                      <span className="text-[9px] font-mono text-slate-800">{rpt.id}</span>
                    </div>
                    <h3 className="text-[13px] font-black text-slate-200 uppercase tracking-tighter group-hover:text-accent transition-colors leading-tight">{rpt.title}</h3>
                    <p className="text-[10px] text-slate-600 line-clamp-3 leading-relaxed font-light">{rpt.abstract}</p>
                    <div className="mt-auto pt-5 border-t border-border flex justify-between items-center text-[10px] font-mono text-slate-800">
                      <span>{rpt.metric}</span>
                      <ArrowUpRight size={14} className="text-slate-900 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: MISSION CRITICAL STATUS */}
      <footer className="bg-surface border-t border-border px-12 py-20 grid grid-cols-4 gap-24">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-accent flex items-center justify-center text-black font-black text-3xl">O</div>
            <span className="text-white font-black tracking-[0.5em] text-lg">OVD_BUREAU</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] leading-relaxed text-slate-800 max-w-sm">Advanced structural logic simulation and forensic manifest verification. Defense-grade code integrity analytics for mission-critical aerospace infrastructure.</p>
          <div className="flex gap-10 text-slate-900">
            <Globe size={20} className="hover:text-accent cursor-pointer transition-colors" />
            <Lock size={20} className="hover:text-accent cursor-pointer transition-colors" />
            <CpuIcon size={20} className="hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="flex flex-col gap-8 pt-4">
          <span className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">SYSTEM_INFRA</span>
          <ul className="flex flex-col gap-4 text-[10px] font-mono text-slate-700 tracking-[0.4em] uppercase">
            <li className="hover:text-white cursor-pointer transition-colors">BUREAU_7X_STABLE</li>
            <li className="hover:text-white cursor-pointer transition-colors">ORBITAL_SYNC_V4.1</li>
            <li className="hover:text-white cursor-pointer transition-colors">ECC_VERIFIED_PROTOCOL</li>
            <li className="hover:text-white cursor-pointer transition-colors">PARITY_LOCKED_ACTIVE</li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 pt-4">
          <span className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">SECURITY_PROTOCOL</span>
          <ul className="flex flex-col gap-4 text-[10px] font-mono text-slate-700 tracking-[0.4em] uppercase">
            <li className="hover:text-white cursor-pointer transition-colors">AES-256_GCM_ENCRYPT</li>
            <li className="hover:text-white cursor-pointer transition-colors">HASH_SHA256_MANIFEST</li>
            <li className="hover:text-white cursor-pointer transition-colors">STRICT_AUTH_GATEWAY</li>
            <li className="hover:text-white cursor-pointer transition-colors">THREAD_DESYNC_ALERTS</li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 items-end justify-between py-4">
          <div className="flex flex-col items-end gap-3">
            <span className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">TELEMETRY_STATUS</span>
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#00FF99]" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">REALTIME_MANIFEST_SYNC: ON</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="text-[11px] font-mono text-slate-900 tracking-[1.5em] uppercase text-right">
               $10K_ANNUAL_LICENSE_ACTIVE
             </div>
             <div className="text-[9px] font-mono text-slate-800 tracking-[0.4em] uppercase">RUNTIME: 12.04.44.STABLE</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);