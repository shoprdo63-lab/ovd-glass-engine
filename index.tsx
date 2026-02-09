import './globals.css';
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Settings, Terminal, Cpu, ArrowUpRight, Globe, Lock, 
  Activity, Shield, FileCode, Zap, CheckCircle2, 
  Layers, HardDrive, Share2, ShieldAlert
} from 'lucide-react';

const METADATA = {
  NODE_ID: "BUREAU_ZERO_ONE",
  VERSION: "6.5.0_SUPREME",
  AUTH_LEVEL: "MAX_ACCESS_LEVEL_S1",
  ENC_PROTOCOL: "QUANTUM_GCM_X2",
  RUNTIME_STATUS: "STABLE_REALTIME_SYNC"
};

const PARAMETERS = [
  { key: "latencyBuffer", label: "Rotation Velocity", min: 1, max: 100, unit: "rad/s", desc: "Kinematic rotation of the core stability rings." },
  { key: "encryptionEntropy", label: "Material Density", min: 0.1, max: 2.0, step: 0.01, unit: "ρ", desc: "Molecular density simulation of the silicate substrate." },
  { key: "structuralLoad", label: "Structural Stress", min: 0, max: 10.0, step: 0.1, unit: "kN/m²", desc: "Active vertical and lateral load distribution." },
  { key: "threadConcurrency", label: "Logic Nodes", min: 1, max: 256, unit: "nodes", desc: "Parallel processing nodes for failure forecasting." },
  { key: "thermalThreshold", label: "Thermal Flux", min: 0, max: 2000, unit: "K", desc: "Heat radiation and edge gradient threshold." },
  { key: "eigenvalueParity", label: "Buckling Delta", min: 0, max: 50, step: 1, unit: "Δ", desc: "Bifurcation parity for slender structural elements." }
];

const LiveCodeManifest = ({ settings }: { settings: any }) => {
  const jsonContent = useMemo(() => {
    return {
      manifest_id: `OVD_${METADATA.NODE_ID}`,
      status: settings.structuralLoad > 8 ? "DANGER" : settings.structuralLoad > 5 ? "WARNING" : "OPTIMAL",
      engine: {
        kinematics: `${(101 - settings.latencyBuffer).toFixed(2)}ms_sync`,
        load_coeff: settings.structuralLoad,
        thermal: `${settings.thermalThreshold}K`,
        material_ρ: settings.encryptionEntropy
      },
      forecast: {
        failure_risk: `${((settings.structuralLoad * settings.eigenvalueParity) / 50).toFixed(2)}%`,
        nodes_active: settings.threadConcurrency,
        parity_check: settings.eigenvalueParity > 40 ? "FAIL" : "PASS"
      },
      security: {
        protocol: METADATA.ENC_PROTOCOL,
        encryption: "AES_HYPER_LOCK"
      }
    };
  }, [settings]);

  return (
    <div className="relative flex-grow bg-black/40 backdrop-blur-3xl border border-white/5 p-6 font-mono text-[11px] leading-relaxed overflow-hidden flex flex-col group">
      <div className="absolute inset-0 instrumentation-grid opacity-20 pointer-events-none" />
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <Terminal size={12} className="text-accent" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">SYSTEM_MANIFEST_LIVE_STREAM</span>
        </div>
        <div className="flex gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${settings.structuralLoad > 8 ? 'bg-red-500 animate-pulse' : 'bg-accent/40'}`} />
        </div>
      </div>
      <pre className="relative z-10 custom-scroll overflow-y-auto h-full text-slate-500">
        <code className="block transition-all duration-200">
          {JSON.stringify(jsonContent, null, 2)}
        </code>
      </pre>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 scanning-line pointer-events-none z-20" />
    </div>
  );
};

const InteractiveCore = ({ settings }: { settings: any }) => {
  const isCritical = settings.structuralLoad > 8.0;
  const isWarning = settings.structuralLoad > 5.0 && !isCritical;
  
  const coreColor = isCritical ? '#FF3333' : isWarning ? '#FFAA00' : '#00FF99';
  const rotationSpeed = (101 - settings.latencyBuffer) / 8;
  const coreScale = 0.8 + (settings.structuralLoad / 12);
  const glowBlur = settings.thermalThreshold / 15;

  return (
    <div className="relative flex items-center justify-center p-24">
      {/* Background Dynamics */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-[120px] transition-all duration-700"
        style={{ 
          backgroundColor: coreColor, 
          opacity: 0.05 + (settings.thermalThreshold / 4000),
          transform: `scale(${1 + settings.encryptionEntropy})`
        }} 
      />

      {/* Main Vector Core */}
      <div className="relative z-10" style={{ transform: `scale(${coreScale})` }}>
        <svg width="300" height="300" viewBox="0 0 200 200" className="transition-all duration-300 overflow-visible">
          {/* Outer Parity Ring */}
          <circle 
            cx="100" cy="100" r="95" 
            fill="none" 
            stroke={coreColor} 
            strokeWidth="0.5" 
            strokeDasharray="4 8"
            className="opacity-30"
            style={{ animation: `spin ${rotationSpeed}s linear infinite` }}
          />
          
          {/* Middle Density Ring */}
          <circle 
            cx="100" cy="100" r="80" 
            fill="none" 
            stroke={coreColor} 
            strokeWidth={0.5 + settings.encryptionEntropy * 5} 
            className="opacity-20"
            style={{ transition: 'stroke-width 0.4s ease' }}
          />

          {/* Primary Geometry */}
          <g className="transition-all duration-500" style={{ transformOrigin: 'center', transform: `rotate(${settings.eigenvalueParity * 7}deg)` }}>
            <rect x="70" y="70" width="60" height="60" fill="none" stroke="white" strokeWidth="1" className="opacity-10" />
            <path 
              d="M100 50 L143 125 L57 125 Z" 
              fill="none" 
              stroke={coreColor} 
              strokeWidth="0.5" 
              className="opacity-40"
            />
          </g>

          {/* Core Symbol "O" */}
          <circle 
            cx="100" cy="100" r="45" 
            fill="none" 
            stroke="white" 
            strokeWidth="8" 
            className="drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          />
          
          {/* Processing Nodes around core */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle 
              key={i}
              cx={100 + 60 * Math.cos((i * 45 * Math.PI) / 180)}
              cy={100 + 60 * Math.sin((i * 45 * Math.PI) / 180)}
              r={1 + (settings.threadConcurrency / 60)}
              fill={coreColor}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>

        {/* Floating Metrics */}
        <div className="absolute top-0 -right-24 flex flex-col items-start gap-1">
          <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Force_Vector</span>
          <span className="text-2xl font-black text-white italic tracking-tighter italic">{settings.structuralLoad.toFixed(1)}</span>
        </div>
        <div className="absolute bottom-0 -left-24 flex flex-col items-end gap-1">
          <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Thermal_Flux</span>
          <span className="text-2xl font-black text-white italic tracking-tighter italic">{settings.thermalThreshold}K</span>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, unit, status }: { label: string, value: string | number, unit: string, status?: string }) => (
  <div className="glass-panel p-6 flex flex-col gap-4 hover:bg-white/[0.03] transition-all group border-white/5">
    <div className="flex justify-between items-center">
      <span className="text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">{label}</span>
      {status && <span className="text-[8px] font-mono text-accent/40">{status}</span>}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black text-white italic tracking-tighter group-hover:text-accent transition-colors">{value}</span>
      <span className="text-xs font-mono text-slate-700">{unit}</span>
    </div>
    <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-full bg-accent/40 w-1/3 animate-shimmer" />
    </div>
  </div>
);

const App = () => {
  const [settings, setSettings] = useState({
    latencyBuffer: 42,
    encryptionEntropy: 0.74,
    structuralLoad: 1.4,
    threadConcurrency: 64,
    thermalThreshold: 850,
    eigenvalueParity: 12
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#010101] text-slate-400 selection:bg-accent/30 selection:text-white">
      {/* High-End Navigation */}
      <header className="sticky top-0 z-[100] h-16 px-10 flex items-center justify-between border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-5">
            <div className="w-9 h-9 bg-accent flex items-center justify-center text-black font-black text-xl shadow-[0_0_25px_rgba(0,255,153,0.3)]">O</div>
            <div className="flex flex-col">
              <span className="font-black text-[12px] tracking-[0.5em] text-white uppercase italic">OVD BUREAU</span>
              <span className="text-[8px] font-mono text-accent/50 uppercase tracking-[0.3em]">{METADATA.VERSION}</span>
            </div>
          </div>
          <nav className="hidden xl:flex gap-10">
            {['Control_Matrix', 'Kinematic_Lab', 'Forensic_Report', 'Neural_Node'].map(item => (
              <button key={item} className="text-[9px] font-black tracking-[0.5em] text-slate-600 hover:text-white transition-all uppercase">{item}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-10">
           <div className="hidden sm:flex flex-col items-end">
             <span className="text-[8px] font-mono text-slate-700 uppercase tracking-widest">{METADATA.ENC_PROTOCOL}</span>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#00FF99] animate-pulse" />
                <span className="text-[8px] font-mono text-accent uppercase tracking-widest">REALTIME_PARITY_ACTIVE</span>
             </div>
           </div>
           <button className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-white/5 transition-all">
             <Layers size={16} />
           </button>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-12 gap-px bg-white/5 overflow-hidden">
        {/* Aerospace Control Panel */}
        <aside className="col-span-12 lg:col-span-3 bg-[#050505] p-10 flex flex-col gap-10 overflow-y-auto custom-scroll border-r border-white/5">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <Settings size={14} className="text-accent" />
            <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase italic">Core_Parameters</span>
          </div>

          <div className="flex flex-col gap-12">
            {PARAMETERS.map(param => (
              <div key={param.key} className="flex flex-col gap-4 group">
                <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.3em]">
                  <label className="text-slate-500 group-hover:text-white transition-colors">{param.label}</label>
                  <span className="text-accent font-bold">{(settings as any)[param.key]}<span className="text-slate-700 ml-1">{param.unit}</span></span>
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
                <p className="text-[8px] text-slate-800 tracking-widest font-mono uppercase leading-relaxed max-w-[90%]">{param.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-6">
            <div className="flex items-center gap-4 px-2">
              <ShieldAlert size={14} className={settings.structuralLoad > 8 ? 'text-red-500' : 'text-slate-800'} />
              <span className="text-[9px] font-mono text-slate-800 uppercase tracking-widest">
                {settings.structuralLoad > 8 ? 'CRITICAL_LOAD_DETECTED' : 'SYSTEM_PARITY_VERIFIED'}
              </span>
            </div>
          </div>
        </aside>

        {/* Global Visualization Hub */}
        <section className="col-span-12 lg:col-span-9 bg-black flex flex-col relative">
          <div className="grid grid-rows-12 h-full gap-px bg-white/5">
            
            {/* Visual Core Zone */}
            <div className="row-span-7 bg-[#020202] relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 instrumentation-grid opacity-30 pointer-events-none" />
               <div className="absolute top-10 left-10 flex flex-col gap-2">
                 <span className="text-[10px] font-black tracking-[0.6em] text-accent/40 uppercase italic">Interactive_Kinematics</span>
                 <div className="w-16 h-[1px] bg-accent/20" />
               </div>
               
               <InteractiveCore settings={settings} />

               {/* Dynamic Background Telemetry */}
               <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
                 <div className="flex items-center gap-2">
                   <span className="text-[8px] font-mono text-slate-800 uppercase">Buffer_Parity</span>
                   <span className="text-xs text-slate-400">0.00{settings.latencyBuffer}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="text-[8px] font-mono text-slate-800 uppercase">Entropy_H</span>
                   <span className="text-xs text-slate-400">{settings.encryptionEntropy}</span>
                 </div>
               </div>
            </div>

            {/* Metrics & Code Manifest Zone */}
            <div className="row-span-5 grid grid-cols-12 gap-px bg-white/5">
               <div className="col-span-12 md:col-span-7 flex flex-col">
                  <LiveCodeManifest settings={settings} />
               </div>
               <div className="col-span-12 md:col-span-5 bg-[#050505] p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                  <MetricCard label="STRESS_INDEX" value={settings.structuralLoad} unit="kN" status="LIVE" />
                  <MetricCard label="NODE_COUNT" value={settings.threadConcurrency} unit="thr" status="ACTIVE" />
                  <MetricCard label="THERMAL_G" value={settings.thermalThreshold} unit="K" status="NOMINAL" />
                  <MetricCard label="STABILITY" value={settings.eigenvalueParity} unit="λ" status="STABLE" />
               </div>
            </div>

          </div>
        </section>
      </main>

      {/* Trust & Authority Footer */}
      <footer className="bg-[#050505] border-t border-white/5 p-20 flex flex-col gap-24">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="metallic-heading text-6xl md:text-9xl italic uppercase leading-none opacity-90">
            Precision Silicate Simulation
          </h2>
          <p className="text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto italic tracking-wide">
            The world's first high-fidelity digital enforcement platform for structural glass engineering. 
            Compliant with ASTM E1300 and aerospace-grade forensic benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 border-t border-white/5 pt-20">
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-9 h-9 bg-accent flex items-center justify-center text-black font-black text-xl">O</div>
              <span className="font-black text-[12px] tracking-[0.5em] text-white uppercase italic">OVD_BUREAU</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] leading-relaxed text-slate-800 font-mono">
              Global authority in structural material logic and forensic manifest analysis. Established mission-critical verified protocols.
            </p>
          </div>

          {[
            { title: "Verification", items: ["ASTM_E1300_PARITY", "ISO_9001_COMPLIANT", "NASA_SIM_AUTH_V2"] },
            { title: "Infrastructure", items: ["GLOBAL_SYNC_STABLE", "QUANTUM_LOCK_AES", "REALTIME_FORENSICS"] }
          ].map(sec => (
            <div key={sec.title} className="space-y-8">
              <span className="text-[11px] font-black tracking-[0.5em] text-accent uppercase italic">{sec.title}</span>
              <ul className="text-[10px] font-mono text-slate-700 space-y-4 tracking-widest uppercase">
                {sec.items.map(item => (
                  <li key={item} className="flex items-center gap-3"><CheckCircle2 size={12} className="text-slate-800" /> {item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col items-end justify-between gap-10">
            <div className="text-right">
              <div className="text-[11px] font-mono text-slate-900 tracking-[1.5em] uppercase mb-2">License_Verified</div>
              <div className="text-[9px] font-mono text-slate-800 tracking-[0.4em] uppercase">Node_ID: {METADATA.NODE_ID}</div>
            </div>
            <div className="bg-black/50 p-5 border border-white/5 shadow-2xl flex items-center gap-5">
              <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_15px_#00FF99] animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Bureau_Connection: High_Fidelity</span>
            </div>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-900 tracking-[1em] uppercase">
          <span>© 2024 OVD GLOBAL BUREAU. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-10">
            <span>S_PROTOCOL_LOCK</span>
            <span>DATA_INTEGRITY_SAFE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);