import './globals.css';
import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Terminal, Cpu, Activity, Shield, 
  ChevronRight, Gauge, Layers, 
  Binary, Database, Target, Zap, 
  RefreshCw, Radio, HardDrive, Cpu as CpuIcon
} from 'lucide-react';

const METADATA = {
  NODE_ID: "BUREAU_7X",
  VERSION: "v6.0_STABLE",
  ENC: "AES-256",
  LATENCY: "1.12ms",
  PARITY: "VERIFIED",
  STABILITY_INDEX: "0.999842"
};

const PARAMETERS = [
  { key: "thermalEntropy", label: "Thermal Entropy", min: 0.01, max: 1.0, step: 0.01, unit: "ΔS" },
  { key: "fractureThreshold", label: "Fracture Threshold", min: 100, max: 5000, step: 10, unit: "MPa" },
  { key: "eigenvalueStability", label: "Eigenvalue Stability", min: 0, max: 1.0, step: 0.001, unit: "λ" },
  { key: "shearModulus", label: "Shear Modulus", min: 20, max: 120, step: 1, unit: "GPa" },
  { key: "stressTensor", label: "Stress Tensor", min: 0, max: 500, step: 5, unit: "σ" },
  { key: "youngsModulus", label: "Young's Modulus", min: 50, max: 200, step: 1, unit: "GPa" },
  { key: "poissonRatio", label: "Poisson Ratio", min: 0.1, max: 0.4, step: 0.01, unit: "ν" },
  { key: "molecularParity", label: "Molecular Parity", min: 0.5, max: 1.0, step: 0.01, unit: "Ψ" }
];

const FORENSIC_REPORTS = [
  { id: "REF-AX-001", status: 94, abstract: "Deterministic evaluation of discrete element convergence within sub-orbital silicate panels subjected to peak re-entry flux. Analysis confirms stress propagation remains below critical bifurcation margins." },
  { id: "REF-AX-002", status: 100, abstract: "Stochastic fatigue prediction models utilizing Bayesian inference for high-entropy aerospace alloy components. Probability of failure exceeds threshold only in cryogenic vacuum simulations." },
  { id: "REF-AX-003", status: 82, abstract: "Nodal bifurcation analysis of hypersonic windshields under lateral shear and non-linear thermal gradients. Structural parity verified through icosahedral mesh refinement protocols." },
  { id: "REF-AX-004", status: 100, abstract: "Verification of structural parity in monumental glass architecture through deep-learning mesh optimization. Eigenvalue stability resides within mission-critical operational tolerance." },
  { id: "REF-AX-005", status: 71, abstract: "Forensic failure investigation into 42mm quartz pane rupture during Mach 6.2 descent phase. Brittle fracture triggered by localized thermodynamic flux instability." },
  { id: "REF-AX-006", status: 88, abstract: "Calibration of molecular density substrate parity against static lateral loads. Shear modulus coefficient correlates directly with silicate substrate molecular alignment." },
  { id: "REF-AX-007", status: 100, abstract: "Algorithmic stability boundary detection utilizing thermal threshold governing. Fracture propagation remains inhibited by active structural stabilization rings." },
  { id: "REF-AX-008", status: 91, abstract: "Integrated multi-physics coupling between thermodynamic transfer and high-frequency stress oscillators. Parity verification exceeds baseline engineering requirements." }
];

const TelemetryCorner = ({ label, value, position }: { label: string, value: string, position: string }) => (
  <div className={`fixed ${position} z-[500] p-6 flex flex-col gap-0.5 pointer-events-none`}>
    <span className="scientific-label !text-accent/30 !text-[8px] font-black">{label}</span>
    <span className="scientific-label !text-accent !text-[9px] font-black tracking-widest">{value}</span>
  </div>
);

const App = () => {
  const [settings, setSettings] = useState({
    thermalEntropy: 0.42,
    fractureThreshold: 2450,
    eigenvalueStability: 0.992,
    shearModulus: 76,
    stressTensor: 142,
    youngsModulus: 184,
    poissonRatio: 0.22,
    molecularParity: 0.98
  });

  const [codeOutput, setCodeOutput] = useState("");

  useEffect(() => {
    const jsonStr = JSON.stringify({
      manifest: "OVD_STRUCTURAL_v6.0",
      target: "AEROSPACE_SILICATE_X1",
      parity: METADATA.PARITY,
      telemetry: {
        thermal_flux: (settings.thermalEntropy * 42.1).toFixed(4),
        fracture_delta: (settings.fractureThreshold / 12).toFixed(2),
        shear_modulus_sync: settings.shearModulus + " GPa",
        stress_tensor_v: settings.stressTensor.toFixed(4),
        poisson_ratio_parity: settings.poissonRatio.toFixed(3),
        molecular_alignment: "OPTIMAL",
        nodes_active: 1024,
        bifurcation_risk: "BELOW_MARGIN"
      },
      structural_state: {
        eigenvalue: settings.eigenvalueStability.toFixed(6),
        parity_verification: "SUCCESSFUL",
        timestamp: new Date().toISOString()
      },
      diagnostics: Array.from({ length: 5 }).map(() => "SYSLOG: " + Math.random().toString(36).substring(7).toUpperCase() + "_PARITY_SYNC_OK")
    }, null, 2);
    setCodeOutput(jsonStr);
  }, [settings]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden relative selection:bg-accent selection:text-black cursor-default">
      {/* 20px Instrumentation Grid Overlay */}
      <div className="absolute inset-0 instrumentation-grid opacity-15 pointer-events-none z-10" />
      
      {/* Quad-Corner Telemetry Meta Layer */}
      <TelemetryCorner label="NODE_ID" value={METADATA.NODE_ID} position="top-0 left-0" />
      <TelemetryCorner label="ENC" value={METADATA.ENC} position="top-0 right-0" />
      <TelemetryCorner label="LATENCY" value={METADATA.LATENCY} position="bottom-0 left-0" />
      <TelemetryCorner label="PARITY" value={METADATA.PARITY} position="bottom-0 right-0" />

      {/* Header Construction */}
      <header className="h-14 shrink-0 border-b border-border bg-black px-12 flex items-center justify-between z-20">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 bg-accent flex items-center justify-center text-black font-black text-lg">O</div>
            <div className="flex flex-col">
              <span className="metallic-subtitle text-[12px] italic leading-none">OVD_STRUCTURAL_CONSOLE</span>
              <span className="scientific-label !text-accent/40 !text-[7px] tracking-[0.5em] mt-1">{METADATA.VERSION}</span>
            </div>
          </div>
          <div className="h-5 w-px bg-border mx-2" />
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="scientific-label !text-slate-800 !text-[7px]">SYSTEM_STATUS</span>
              <span className="scientific-label !text-accent !text-[8px] animate-pulse">CORE_STABLE_ACTIVE</span>
            </div>
            <div className="flex flex-col">
              <span className="scientific-label !text-slate-800 !text-[7px]">RUNTIME_CLOCK</span>
              <span className="scientific-label !text-white !text-[8px] tracking-widest font-mono">112:42:01:04</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-6">
            <span className="scientific-label !text-slate-800 !text-[8px]">ALPHA_STABILITY_INDEX</span>
            <span className="text-4xl data-point !text-accent tracking-widest">{METADATA.STABILITY_INDEX}</span>
          </div>
          <div className="flex items-center gap-4 border-l border-border pl-8">
            <Shield size={16} className="text-accent" />
            <RefreshCw size={14} className="text-slate-800 animate-spin" />
          </div>
        </div>
      </header>

      {/* Primary Workspace */}
      <div className="flex-grow flex overflow-hidden z-20">
        
        {/* The Parameter Lab (Sidebar) */}
        <aside className="w-80 shrink-0 border-r border-border bg-black flex flex-col overflow-hidden">
          <div className="p-8 border-b border-border bg-surface/30">
            <div className="flex items-center gap-3 mb-2">
              <Gauge size={14} className="text-accent" />
              <span className="scientific-label !text-white !text-[9px]">PARAMETER_LAB_S1</span>
            </div>
            <p className="scientific-label !text-slate-800 !text-[7px] !tracking-widest !normal-case leading-relaxed">Adjust kinematic parameters to evaluate stress parity in real-time structural simulations.</p>
          </div>
          
          <div className="flex-grow p-8 flex flex-col gap-10 overflow-y-auto custom-scroll">
            {PARAMETERS.map(param => (
              <div key={param.key} className="flex flex-col gap-4 group">
                <div className="flex justify-between items-end">
                  <label className="scientific-label !text-slate-600 !text-[8px] group-hover:text-white transition-colors">{param.label}</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-mono text-[11px] font-black italic tabular-nums group-hover:text-accent transition-colors">{(settings as any)[param.key]}</span>
                    <span className="scientific-label !text-slate-900 !text-[7px]">{param.unit}</span>
                  </div>
                </div>
                <input 
                  type="range" min={param.min} max={param.max} step={param.step}
                  value={(settings as any)[param.key]}
                  onChange={(e) => setSettings({...settings, [param.key]: parseFloat(e.target.value)})}
                  className="bureau-slider"
                />
              </div>
            ))}
          </div>

          <div className="p-8 bg-surface/30 border-t border-border mt-auto">
            <div className="p-5 border border-border bg-black/60 space-y-4">
              <div className="flex items-center gap-3">
                <Target size={12} className="text-accent" />
                <span className="scientific-label !text-accent !text-[8px]">TARGET_STABILITY</span>
              </div>
              <div className="w-full h-[2px] bg-border relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-accent transition-all duration-700 shadow-[0_0_15px_#00FF99]" 
                  style={{ width: `${(settings.eigenvalueStability * 100)}%` }} 
                />
              </div>
              <p className="scientific-label !text-slate-900 !text-[7px] !normal-case leading-tight">Nodal bifurcation threshold resides below critical operational margin.</p>
            </div>
          </div>
        </aside>

        {/* Central Workspace (High-Density Terminal) */}
        <main className="flex-grow flex flex-col bg-black overflow-hidden border-r border-border">
          <div className="h-10 border-b border-border px-8 flex items-center justify-between bg-surface/50">
            <div className="flex items-center gap-4">
              <Terminal size={14} className="text-accent" />
              <span className="scientific-label !text-white !text-[9px]">DIAGNOSTIC_MANIFEST_CONSOLE</span>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="scientific-label !text-accent !text-[8px]">STREAMING_DATA_OK</span>
              </div>
              <span className="scientific-label !text-slate-800 !text-[8px]">PARITY_SYNC: 100%</span>
            </div>
          </div>
          
          <div className="flex-grow p-10 overflow-y-auto custom-scroll font-mono relative bg-black">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 scanning-line pointer-events-none" />
            <pre className="text-[12px] leading-relaxed">
              <code className="text-accent">
                {codeOutput.split('\n').map((line, i) => {
                  let colorClass = "text-accent/60";
                  if (line.includes(':')) colorClass = "text-accent";
                  if (line.includes('{') || line.includes('}')) colorClass = "text-white/30";
                  if (line.includes('"')) colorClass = "text-accent";
                  if (line.includes('OPTIMAL') || line.includes('SUCCESSFUL')) colorClass = "text-accent font-black";
                  
                  return (
                    <div key={i} className={`flex ${colorClass}`}>
                      <span className="w-12 shrink-0 text-slate-900 select-none italic">{(i+1).toString().padStart(4, '0')}</span>
                      <span className="whitespace-pre-wrap">{line}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </main>

        {/* Right Performance Column */}
        <aside className="w-72 shrink-0 bg-black flex flex-col overflow-hidden">
          <div className="p-8 border-b border-border space-y-10">
            <div className="flex items-center gap-3">
              <CpuIcon size={14} className="text-accent" />
              <h4 className="scientific-label !text-white !text-[9px]">NODAL_LIVE_TELEMETRY</h4>
            </div>
            {[
              { label: "THERMAL_FLUX_D", val: (settings.thermalEntropy * 4.2).toFixed(4), unit: "W/m²" },
              { label: "STRESS_PARITY_σ", val: settings.stressTensor.toFixed(2), unit: "MPa" },
              { label: "FRACTURE_DELTA_K", val: (settings.fractureThreshold / 12.4).toFixed(3), unit: "ΔK" },
              { label: "BIFURCATION_Λ", val: settings.eigenvalueStability.toFixed(5), unit: "λ" }
            ].map(m => (
              <div key={m.label} className="space-y-2 border-l border-border pl-6">
                <span className="scientific-label !text-slate-800 !text-[7px]">{m.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl data-point !text-white tracking-tighter">{m.val}</span>
                  <span className="scientific-label !text-slate-900 !text-[7px]">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex-grow p-8 flex flex-col justify-end gap-6 overflow-hidden">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Radio size={12} className="text-accent animate-pulse" />
                  <span className="scientific-label !text-accent !text-[8px]">LIVE_SENSOR_MAP</span>
                </div>
                <span className="scientific-label !text-slate-900 !text-[7px]">NODES: 1024/1024</span>
             </div>
             <div className="h-28 w-full border border-border bg-surface/20 flex items-end gap-1 p-3">
               {Array.from({ length: 24 }).map((_, i) => (
                 <div 
                   key={i} 
                   className="flex-grow bg-accent/20 hover:bg-accent transition-all duration-300 border-t border-accent/40"
                   style={{ height: `${Math.random() * 80 + 20}%` }}
                 />
               ))}
             </div>
          </div>
        </aside>
      </div>

      {/* Intelligence Archive (Bottom Grid 4x2) */}
      <footer className="h-64 shrink-0 border-t border-border bg-black p-8 overflow-hidden z-20 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Database size={16} className="text-accent" />
          <span className="scientific-label !text-white !text-[10px] tracking-[0.5em]">FORENSIC_INTELLIGENCE_ARCHIVE_X7</span>
        </div>
        <div className="flex-grow grid grid-cols-4 gap-4 overflow-hidden">
          {FORENSIC_REPORTS.map(report => (
            <div key={report.id} className="glass-card p-6 flex flex-col justify-between group hover:border-accent/40 transition-all border border-border bg-surface/5 overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="scientific-label !text-accent !text-[8px] font-black">{report.id}</span>
                <div className="flex gap-1 h-1.5 w-16 bg-white/5 relative overflow-hidden">
                  <div className="h-full bg-accent shadow-[0_0_8px_#00FF99]" style={{ width: `${report.status}%` }} />
                </div>
              </div>
              <p className="scientific-label !text-slate-600 !tracking-normal !normal-case !text-[8px] leading-relaxed line-clamp-4 italic flex-grow">
                {report.abstract}
              </p>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-border">
                <span className="scientific-label !text-slate-900 !text-[7px] uppercase tracking-widest font-bold italic">STATUS: {report.status === 100 ? "VERIFIED_PARITY" : "CALIBRATING"}</span>
                <ChevronRight size={10} className="text-slate-900 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);