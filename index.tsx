import './globals.css';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Shield, Database, Target, Crosshair, Command,
  Settings, Monitor, Compass, Copy, CheckCircle2,
  Download, FileText, LayoutGrid, Terminal,
  Cpu, Layers, Zap, ArrowUpRight, Globe, Lock,
  Info, Maximize, Activity, Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TELEMETRY DEFINITIONS ---
const METADATA = {
  NODE_ID: "BUREAU_ORBITAL_7X",
  ENC: "AES-256_GCM",
  STATUS: "PARITY_VERIFIED",
  LATENCY: "1.24 MS",
  LOAD_CLASS: "AERO_SPEC_S1"
};

const PARAMETERS = [
  { key: "thermalGradient", label: "THERMAL GRADIENT COEFFICIENT", min: 0, max: 250, unit: "K", desc: "Thermal propagation across silicate layers." },
  { key: "fractureIndex", label: "FRACTURE MECHANICS INDEX", min: 0.05, max: 2.5, step: 0.01, unit: "MPa√m", desc: "Critical stress intensity factor for failure." },
  { key: "eigenvalueStability", label: "EIGENVALUE STABILITY FACTOR", min: 1.0, max: 10.0, step: 0.1, unit: "λ", desc: "Bifurcation threshold for slender components." },
  { key: "stressTensor", label: "STRESS TENSOR SCALING", min: 0.1, max: 15.0, step: 0.1, unit: "σ_xx", desc: "Non-linear membrane stress multiplier." },
  { key: "fatigueEnvelope", label: "STRUCTURAL FATIGUE ENVELOPE", min: 100, max: 10000, unit: "N_f", desc: "Cycle boundary before lattice dislocation." },
  { key: "shearModulus", label: "VISCOELASTIC SHEAR MODULUS", min: 10, max: 300, unit: "MPa", desc: "Interlayer coupling constant at operational temp." }
];

const INTELLIGENCE_REPORTS = [
  { id: 'RPT-01', title: 'Lateral Torsional Buckling of Monumental Fins', tag: 'STRUCTURAL_STABILITY', metric: 'λ_crit: 1.44', abstract: 'Evaluation of secondary torsional instability in monolithic fins where span exceeds threshold for lateral support margins.' },
  { id: 'RPT-02', title: 'Anisotropic Stress Mapping in Strengthened Substrates', tag: 'MATERIAL_FORENSICS', metric: 'σ_res: 45MPa', abstract: 'Forensic documentation of surface compression variance where localized cooling rates stay below operational parity.' },
  { id: 'rpt-03', title: 'Transient Shockwave Propagation in PVB Laminates', tag: 'DEFENSE_SIM', metric: 'P_peak: 120kPa', abstract: 'Shockwave impulse modeling where duration exceeds structural envelope for standard interlayer adhesion coefficients.' },
  { id: 'RPT-04', title: 'Seismic Drift Capacity in Unitized Facades', tag: 'KINEMATIC_ANALYSIS', metric: 'Δ_drift: 2.5%', abstract: 'Kinematic study of joint rotation where inter-story displacement exceeds tolerance threshold for unit engagement.' },
  { id: 'RPT-05', title: 'NiS Inclusion Phase Transformation Analysis', tag: 'FAILURE_MODELING', metric: 'P_fracture: 0.98', abstract: 'Alpha-to-beta phase transition kinetics in tempered glass where internal stress remains above thermal boundary.' },
  { id: 'RPT-06', title: 'Thermal Fracture Risk in Solar Control Coatings', tag: 'THERMAL_DYNAMICS', metric: 'ΔT_edge: 42K', abstract: 'Edge stress analysis where absorption differential exceeds structural failure envelope during transient solar cycles.' },
  { id: 'RPT-07', title: 'Creep Mechanics in Structural Silicone Joints', tag: 'VISCOELASTICITY', metric: 'τ_sust: 0.11MPa', abstract: 'Long-term shear yield modeling where dead load duration exceeds stability envelope for 50-year service life.' },
  { id: 'RPT-08', title: 'Membrane Action in Large-Deflection Plate Theory', tag: 'NON_LINEAR_MECHANICS', metric: 'w/t: 1.52', abstract: 'Non-linear stiffening analysis where central deflection exceeds plate thickness threshold by a factor of 1.5.' }
];

// --- COMPONENTS ---

const TelemetryHeader = () => (
  <header className="sticky top-0 z-50 glass-panel h-16 px-6 flex items-center justify-between">
    <div className="flex items-center gap-12">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-accent flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_#00FF99]">O</div>
        <div className="flex flex-col">
          <span className="text-[12px] font-black tracking-telemetry text-white leading-none">OVD BUREAU</span>
          <span className="text-2xs font-mono text-accent/50 tracking-telemetry">FORENSIC_ENG_S4</span>
        </div>
      </div>
      <nav className="hidden lg:flex gap-8">
        {['COMMAND', 'ARCHIVE', 'SIM_NODES', 'PROTOCOLS'].map(item => (
          <button key={item} className="text-2xs font-black tracking-telemetry text-slate-500 hover:text-white transition-colors">{item}</button>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-end">
        <span className="text-2xs font-mono text-slate-600 tracking-telemetry">{METADATA.ENC}</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-2xs font-mono text-accent tracking-telemetry uppercase">{METADATA.STATUS}</span>
        </div>
      </div>
      <button className="bg-accent text-black text-2xs font-black px-6 py-2 tracking-telemetry hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,153,0.2)]">SYNC_PARITY</button>
    </div>
  </header>
);

const RadarSimulationCore = ({ stress }: { stress: number }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex-grow bg-black border border-border overflow-hidden cursor-crosshair group"
    >
      <div className="absolute inset-0 micro-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] radar-sweep pointer-events-none" />
      
      {/* Instrumentation Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-[1px] bg-border/40" />
        <div className="h-full w-[1px] bg-border/40" />
        <div className="absolute w-[400px] h-[400px] border border-accent/10 border-dashed rounded-full" />
        <div className="absolute w-[200px] h-[200px] border border-accent/10 border-dashed rounded-full" />
        
        {/* Dynamic Focus Box */}
        <div 
          className="absolute w-80 h-80 border border-accent/20 backdrop-blur-sm transition-transform duration-700 ease-out"
          style={{ transform: `rotateY(${(stress - 7) * 4}deg) rotateX(${(stress - 7) * 2}deg)` }}
        >
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="text-[8px] font-mono text-accent/40 tracking-widest uppercase">SCAN_SECTOR_0X4F</span>
            <div className="w-12 h-[1px] bg-accent/40" />
          </div>
          <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1">
            <span className="text-[8px] font-mono text-accent/40 tracking-widest uppercase">σ_MATRIX: {(stress * 3.12).toFixed(4)}</span>
            <div className="w-12 h-[1px] bg-accent/40" />
          </div>
          <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent/10" size={40} />
          <div className="absolute top-0 w-full h-[1px] bg-accent/40 scanning-line" />
        </div>
      </div>

      {/* Mouse Telemetry */}
      <div 
        className="absolute z-20 pointer-events-none flex flex-col gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ left: coords.x + 20, top: coords.y + 20 }}
      >
        <div className="bg-surface/90 border border-border p-2 flex flex-col">
          <span className="text-[8px] font-mono text-accent tracking-telemetry">X_POS: {coords.x.toFixed(0)}</span>
          <span className="text-[8px] font-mono text-accent tracking-telemetry">Y_POS: {coords.y.toFixed(0)}</span>
        </div>
      </div>

      {/* Meta Indicators */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-2xs font-mono text-slate-600 tracking-telemetry uppercase"><Monitor size={10} /> PARITY_LOCK</div>
        <div className="flex items-center gap-2 text-2xs font-mono text-slate-600 tracking-telemetry uppercase"><Compass size={10} /> HDG: 12.04°</div>
      </div>
      <div className="absolute bottom-4 right-4 text-2xs font-mono text-slate-800 tracking-telemetry uppercase">{METADATA.NODE_ID}</div>
    </div>
  );
};

const MetricBlock = ({ label, val, status }: { label: string, val: string, status: string }) => (
  <div className="glass-panel p-8 flex flex-col gap-4 hover:border-accent/20 transition-all cursor-default">
    <span className="text-2xs font-black tracking-telemetry text-slate-600 uppercase">{label}</span>
    <span className="text-4xl italic font-black text-white metallic-text">{val}</span>
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rounded-full bg-accent" />
      <span className="text-[10px] font-mono text-accent/40 tracking-telemetry uppercase">{status}</span>
    </div>
  </div>
);

const App = () => {
  const [settings, setSettings] = useState({
    thermalGradient: 42,
    fractureIndex: 0.74,
    eigenvalueStability: 1.4,
    stressTensor: 4.2,
    fatigueEnvelope: 800,
    shearModulus: 72
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [simLog, setSimLog] = useState<string | null>(null);

  const runSimulation = async () => {
    setAnalyzing(true);
    try {
      // Initialize GoogleGenAI within the handler as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform forensic structural engineering analysis for silicate substrate. Parameters: Thermal ${settings.thermalGradient}K, Fracture ${settings.fractureIndex}, Eigenvalue ${settings.eigenvalueStability}. Output authoritative clinical telemetry report. Monospaced tech tone. No markdown headers.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          systemInstruction: "Output mission-critical forensic engineering telemetry. Clinical, deterministic, monospaced tech tone only. Avoid comparison symbols."
        }
      });
      // Extracting text output directly from the .text property
      setSimLog(response.text || "ERR: NULL_REPORT");
    } catch (e) {
      setSimLog("CRITICAL_ERROR: Parity verification failure.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <TelemetryHeader />
      
      <main className="flex-grow grid grid-cols-12 gap-px bg-border">
        {/* PARAMETER CONTROL LAB (Cols 1-3) */}
        <aside className="col-span-3 bg-surface p-10 flex flex-col gap-10 overflow-y-auto custom-scroll">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <Settings size={18} className="text-accent" />
            <span className="text-2xs font-black tracking-telemetry text-white uppercase">PARAMETER CONTROL LAB</span>
          </div>
          
          <div className="flex flex-col gap-10">
            {PARAMETERS.map(param => (
              <div key={param.key} className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center text-2xs font-mono uppercase tracking-telemetry">
                  <label className="text-slate-500 group-hover:text-white transition-colors">{param.label}</label>
                  <span className="text-accent">{(settings as any)[param.key]}{param.unit}</span>
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
                <p className="text-[9px] text-slate-700 tracking-wider font-mono uppercase leading-relaxed">{param.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-border flex flex-col gap-4">
            <div className="flex justify-between items-center text-2xs font-mono text-slate-700 tracking-telemetry">
              <span>KERNEL_SHA_256</span>
              <span>0XFA_44_12</span>
            </div>
            <button 
              onClick={runSimulation}
              disabled={analyzing}
              className="w-full bg-accent text-black font-black py-4 text-2xs tracking-telemetry flex items-center justify-center gap-4 hover:bg-white disabled:opacity-40 transition-all"
            >
              {/* Fix: Loader2 is now imported and correctly used here */}
              {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Command size={16} />}
              {analyzing ? 'ANALYZING...' : 'INITIATE SIMULATION'}
            </button>
          </div>
        </aside>

        {/* SIMULATION COMMAND CENTER (Cols 4-12) */}
        <section className="col-span-9 bg-black flex flex-col gap-px">
          {/* Main Visualizer Area */}
          <div className="h-[600px] flex gap-px">
            <RadarSimulationCore stress={settings.stressTensor} />
          </div>

          {/* Metric Authority Blocks */}
          <div className="grid grid-cols-4 gap-px bg-border">
            <MetricBlock label="YIELD_STRENGTH_MAX" val={`${(160 + settings.thermalGradient).toFixed(0)}MPa`} status="NOMINAL" />
            <MetricBlock label="SHEAR_MODULUS_REF" val={`${settings.shearModulus}GPa`} status="STABLE" />
            <MetricBlock label="RESIDUAL_RATIO" val={`${(settings.stressTensor * 4.1).toFixed(1)}%`} status="SYNCED" />
            <MetricBlock label="BIFURCATION_λ" val={settings.eigenvalueStability.toFixed(2)} status="OPTIMAL" />
          </div>

          {/* Analysis Log */}
          {simLog && (
            <div className="bg-surface p-12 border-t border-border animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 mb-8">
                <Terminal size={18} className="text-accent" />
                <span className="text-2xs font-black tracking-telemetry text-white uppercase">SIMULATION TELEMETRY REPORT</span>
              </div>
              <pre className="text-sm font-mono text-slate-500 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto custom-scroll pr-4">
                {simLog}
              </pre>
            </div>
          )}

          {/* Intelligence Knowledge Hub */}
          <div className="p-10 bg-black flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Database size={18} className="text-accent" />
              <span className="text-2xs font-black tracking-telemetry text-white uppercase">INTELLIGENCE KNOWLEDGE ARCHIVE</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {INTELLIGENCE_REPORTS.map(rpt => (
                <div key={rpt.id} className="glass-panel p-6 flex flex-col gap-4 group cursor-pointer hover:border-accent/40 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-accent/50 tracking-widest uppercase">{rpt.tag}</span>
                    <span className="text-2xs font-mono text-slate-800">{rpt.id}</span>
                  </div>
                  <h3 className="text-[12px] font-black text-slate-200 uppercase tracking-tighter group-hover:text-accent transition-colors leading-tight">{rpt.title}</h3>
                  <p className="text-[10px] text-slate-600 line-clamp-3 leading-relaxed font-light">{rpt.abstract}</p>
                  <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-2xs font-mono text-slate-500">
                    <span>{rpt.metric}</span>
                    <ArrowUpRight size={14} className="text-slate-800 group-hover:text-accent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ENTERPRISE FOOTER */}
      <footer className="bg-surface border-t border-border px-12 py-16 flex flex-col gap-12">
        <div className="grid grid-cols-4 gap-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center text-black font-black text-2xl">O</div>
              <span className="text-white font-black tracking-telemetry uppercase">OVD BUREAU</span>
            </div>
            <p className="text-2xs uppercase tracking-[0.4em] leading-relaxed text-slate-700">Global authority in structural material simulation and aerospace-grade facade logic protocols. Mission-critical verification bureau.</p>
            <div className="flex gap-8 text-slate-800">
              <Globe size={18} />
              <Lock size={18} />
              <Cpu size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-2xs font-black tracking-telemetry text-accent uppercase">LABORATORIES</span>
            <ul className="flex flex-col gap-3 text-2xs font-mono text-slate-600 tracking-widest uppercase">
              <li className="hover:text-white cursor-pointer transition-colors">Analysis_Core_v4</li>
              <li className="hover:text-white cursor-pointer transition-colors">Forensic_Lattice</li>
              <li className="hover:text-white cursor-pointer transition-colors">HST_Verification</li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-2xs font-black tracking-telemetry text-accent uppercase">SECURITY</span>
            <ul className="flex flex-col gap-3 text-2xs font-mono text-slate-600 tracking-widest uppercase">
              <li className="hover:text-white cursor-pointer transition-colors">AES-256_Encryption</li>
              <li className="hover:text-white cursor-pointer transition-colors">Parity_Verified</li>
              <li className="hover:text-white cursor-pointer transition-colors">ASTM_Compliance</li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-2xs font-black tracking-telemetry text-accent uppercase">SYSTEM_NODES</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-2xs font-mono text-slate-700 uppercase tracking-widest">ORBITAL_SYNC: ACTIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-2xs font-mono text-slate-700 uppercase tracking-widest">ECC_VERIFY: ON</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-900 tracking-[1.5em] gap-8">
          <span>© 2026 OVD BUREAU ENGINEERING. MISSION_CRITICAL_SAAS_V4.1.0</span>
          <div className="flex gap-16">
            <span>NASA_SIM_AUTH_V2</span>
            <span>LICENSE: $10K_ANNUAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);