import './globals.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Terminal, Cpu, Activity, Shield, 
  ChevronRight, Gauge, Layers, 
  Binary, Database, Target, Zap, 
  RefreshCw, Radio, Cpu as CpuIcon,
  Crosshair, Monitor, ShieldAlert, BarChart3,
  Box, Hexagon, Wind, Thermometer
} from 'lucide-react';

const METADATA = {
  NODE_ID: "BUREAU_7X",
  VERSION: "v10.0_STABLE",
  ORBITAL_SYNC: "7X_ULTRA",
  VERSION_HASH: "0xBF42_7X",
  ENCRYPTION: "QUANTUM_GCM_P2",
  GLOBAL_PARITY: "99.98%",
  LATENCY: "0.08ms"
};

const PARAMETERS = [
  { key: "thermalEntropy", label: "THERMAL_ENTROPY", min: 0, max: 1.0, step: 0.01, unit: "ΔS" },
  { key: "fractureThreshold", label: "FRACTURE_THRESHOLD", min: 100, max: 5000, step: 10, unit: "MPa" },
  { key: "eigenvalueStability", label: "EIGENVALUE_STABILITY", min: 0, max: 1.0, step: 0.001, unit: "λ" },
  { key: "shearModulus", label: "SHEAR_MODULUS", min: 20, max: 120, step: 1, unit: "GPa" },
  { key: "stressTensorAlpha", label: "STRESS_TENSOR_ALPHA", min: 0, max: 500, step: 5, unit: "σ" }
];

const FORENSIC_REPORTS = [
  { id: "R-101", title: "Non-Linear Elasticity in Vacuum Environments", abstract: "Evaluation of stress-strain curves for alumino-silicate composites in zero-atmosphere high-radiation chambers. Verification confirms that loading exceeds baseline operational margins in sub-orbital vectors.", metric: "PARITY: VERIFIED" },
  { id: "R-102", title: "Quantum Decoherence in Optical Laminates", abstract: "Analysis of structural parity decay at sub-atomic levels during high-velocity photon bombardment simulations. Parity remains stable where stress resides below cleavage thresholds.", metric: "ENGINE: STABLE" },
  { id: "R-103", title: "Transient Shockwave Propagation in interlayers", abstract: "Modeling residual strength in aerospace-grade laminates when peak pressure is higher than standard thermal boundary conditions. Stress parity is verified.", metric: "DLF: 2.14" },
  { id: "R-104", title: "Thermal Gradient Stress in High-Absorption Coatings", abstract: "Predicting thermal fracture risks where solar energy absorption exceeds failure envelope for non-toughened float glass. Critical dissipation parity confirmed.", metric: "DELTA-T: 45K" },
  { id: "R-105", title: "Anisotropy Detection and residual Stress Mapping", abstract: "Utilizing polariscopic telemetry to verify surface compression uniformity remains within the aerospace mission-critical safety margin. Birefringence delta is low.", metric: "SCAN: 92MPa" },
  { id: "R-106", title: "Interstory Drift Parity in unitized multi-layer Facades", abstract: "Simulating seismic lateral force distribution when floor displacement exceeds critical load safety margin for unitized anchors. Response is nominal.", metric: "DRIFT: 2.5%" },
  { id: "R-107", title: "High-Modulus Structural Silicone Adhesion Protocols", abstract: "Evaluation of adhesive bond performance under sustained negative wind load cycles lower than load safety margin specifications. Hyper-elastic modeling active.", metric: "BITE: 24mm" },
  { id: "R-108", title: "Cyclic Loading Degradation in Alumino-Silicate Glass", abstract: "Determining fatigue life for mission-critical viewing ports where micro-flaw propagation exceeds structural safety boundary. Surface integrity verified at parity.", metric: "LIFE: 10^6" }
];

const PointCloudBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; z: number; speed: number }[] = [];
    const numParticles = 120;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: numParticles }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        speed: 0.8 + Math.random() * 1.5
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF99';
      ctx.font = '7px JetBrains Mono';

      particles.forEach((p, i) => {
        p.y += p.speed;
        if (p.y > canvas.height) p.y = 0;

        const opacity = (p.z / 100) * 0.15;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (i % 12 === 0) {
          ctx.fillText(`X:${p.x.toFixed(0)} Y:${p.y.toFixed(0)} Z:${p.z.toFixed(0)}`, p.x + 8, p.y);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
};

const TelemetryCorner = ({ label, value, position }: { label: string, value: string, position: string }) => (
  <div className={`fixed ${position} z-[500] p-6 flex flex-col gap-0.5 pointer-events-none`}>
    <span className="text-[7px] uppercase tracking-[0.4em] text-gray-700 font-black italic">{label}</span>
    <span className="text-[9px] font-mono text-[#00FF99] font-black tracking-widest uppercase">{value}</span>
  </div>
);

const App = () => {
  const [settings, setSettings] = useState({
    thermalEntropy: 0.42,
    fractureThreshold: 2450,
    eigenvalueStability: 0.992,
    shearModulus: 76,
    stressTensorAlpha: 142
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [manifestText, setManifestText] = useState<string | null>(null);

  const handleDeploy = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a high-authority forensic manifest for a quantum aerospace engine. Parameters: ${JSON.stringify(settings)}. The manifest must exceed baseline safety criteria and address potential boundary instabilities in structural SILICATE_X1 cores. Output JSON format only.`,
        config: {
          responseMimeType: "application/json"
        }
      });
      setManifestText(response.text || "{}");
    } catch (error) {
      console.error("MANIFEST_DEPLOY_ERROR:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const codeOutput = useMemo(() => {
    if (manifestText) {
      try {
        return JSON.stringify(JSON.parse(manifestText), null, 2);
      } catch {
        return manifestText;
      }
    }
    return JSON.stringify({
      MANIFEST_ID: "COMMAND_CORE_v10.0",
      SYNC_LOCKED: true,
      ORBITAL_VECTOR: METADATA.ORBITAL_SYNC,
      SYSTEM_STATE: {
        THERMAL: settings.thermalEntropy.toFixed(4) + " ΔS",
        FRACTURE: settings.fractureThreshold + " MPa",
        STABILITY: settings.eigenvalueStability.toFixed(4) + " λ",
        SHEAR: settings.shearModulus + " GPa",
        STRESS_ALPHA: settings.stressTensorAlpha.toFixed(2) + " σ"
      },
      TELEMETRY_LOG: {
        NODAL_PARITY: "VERIFIED",
        LATENCY: METADATA.LATENCY,
        VERSION_HASH: METADATA.VERSION_HASH,
        STABILITY_TARGET: "0.999842",
        BIFURCATION_RISK: settings.eigenvalueStability > 0.95 ? "NOMINAL" : "CRITICAL_BOUNDARY"
      }
    }, null, 2);
  }, [settings, manifestText]);

  return (
    <div className="h-screen w-screen bg-[#000000] flex flex-col overflow-hidden relative selection:bg-[#00FF99] selection:text-black cursor-crosshair">
      <div className="absolute inset-0 instrumentation-grid opacity-15 pointer-events-none z-10" />
      
      {/* 4-Corner Telemetry Layer */}
      <TelemetryCorner label="ORBITAL_SYNC" value={METADATA.ORBITAL_SYNC} position="top-0 left-0" />
      <TelemetryCorner label="VERSION_HASH" value={METADATA.VERSION_HASH} position="top-0 right-0" />
      <TelemetryCorner label="ENCRYPTION" value={METADATA.ENCRYPTION} position="bottom-0 left-0" />
      <TelemetryCorner label="GLOBAL_PARITY" value={METADATA.GLOBAL_PARITY} position="bottom-0 right-0" />

      {/* Primary Navigation Header */}
      <header className="h-16 shrink-0 border-b border-[#1A1A1A] bg-[#000000] px-10 flex items-center justify-between z-20">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none border-b-2 border-[#00FF99]">OVD_BUREAU</h1>
            <span className="text-[7px] font-mono text-gray-600 tracking-[0.5em] mt-2 font-bold italic underline decoration-[#1A1A1A]">COMMAND_CONSOLE_v10.0</span>
          </div>
          <div className="h-6 w-px bg-[#1A1A1A] mx-2" />
          <div className="flex gap-10">
            <div className="flex flex-col border-l border-[#1A1A1A] pl-3 py-1">
              <span className="text-[7px] uppercase tracking-[0.4em] text-gray-600 font-black italic">Sync_Status</span>
              <span className="text-[10px] font-mono text-[#00FF99] font-bold tabular-nums uppercase">Locked_7X</span>
            </div>
            <div className="flex flex-col border-l border-[#1A1A1A] pl-3 py-1">
              <span className="text-[7px] uppercase tracking-[0.4em] text-gray-600 font-black italic">Parity_Check</span>
              <span className="text-[10px] font-mono text-[#00FF99] font-bold tabular-nums uppercase">Verified_Stable</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="text-right">
            <div className="text-[9px] text-[#00FF99] font-mono uppercase tracking-[0.3em] font-black italic animate-pulse">CORE_ACTIVE</div>
            <div className="text-[8px] text-gray-700 font-mono font-bold tracking-widest uppercase italic">X: 294.2 // Y: 104.1 // Z: 0.08</div>
          </div>
          <button 
            onClick={handleDeploy}
            disabled={isGenerating}
            className="bg-[#00FF99] text-black px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,153,0.2)] disabled:opacity-50"
          >
            {isGenerating ? 'DEPLOYING...' : 'DEPLOY_MANIFEST'}
          </button>
        </div>
      </header>

      {/* Centerpiece Architecture */}
      <div className="flex-grow flex overflow-hidden z-20">
        
        {/* Left Wing: Instrumentation Lab (5 Sliders) */}
        <aside className="w-80 shrink-0 border-r border-[#1A1A1A] bg-[#000000] flex flex-col overflow-hidden">
          <div className="p-8 border-b border-[#1A1A1A] bg-[#020202]">
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 italic border-b border-[#1A1A1A] pb-4 uppercase">Instrumentation Lab</h2>
          </div>
          
          <div className="flex-grow p-8 flex flex-col gap-10 overflow-y-auto custom-scroll">
            {PARAMETERS.map(param => (
              <div key={param.key} className="group relative">
                <div className="flex justify-between mb-3">
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-black group-hover:text-[#00FF99] transition-colors">{param.label}</span>
                  <span className="text-[11px] font-mono text-[#00FF99] font-bold italic tabular-nums">
                    {(settings as any)[param.key]}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" min={param.min} max={param.max} step={param.step}
                    value={(settings as any)[param.key]}
                    onChange={(e) => {
                      setManifestText(null);
                      setSettings({...settings, [param.key]: parseFloat(e.target.value)});
                    }}
                    className="w-full h-[1px] bg-[#1A1A1A] accent-[#00FF99] appearance-none cursor-crosshair hover:bg-[#333]"
                  />
                </div>
                <div className="text-[7px] text-gray-800 font-mono uppercase tracking-[0.2em] mt-2 text-right">{param.unit} CALIBRATION</div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-[#1A1A1A] bg-[#020202] mt-auto">
            <div className="p-5 border border-[#1A1A1A] bg-[#050505] space-y-4">
               <div className="flex items-center gap-3">
                 <ShieldAlert size={12} className="text-[#00FF99]" />
                 <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-black italic">Operational Integrity</span>
               </div>
               <div className="h-[1px] w-full bg-[#1A1A1A] overflow-hidden relative">
                 <div className="h-full bg-[#00FF99] animate-pulse" style={{ width: '99.98%' }} />
               </div>
               <p className="text-[7px] text-gray-800 font-mono leading-relaxed uppercase italic">Warning: Manual adjustment exceeds baseline safety boundaries. Parity verification required.</p>
            </div>
          </div>
        </aside>

        {/* Command Core Matrix (Central Terminal) */}
        <main className="flex-grow flex flex-col bg-[#000000] overflow-hidden border-r border-[#1A1A1A] relative">
          <PointCloudBackground />
          <div className="h-10 border-b border-[#1A1A1A] px-8 flex items-center justify-between bg-[#050505] relative z-10">
            <div className="flex items-center gap-4">
              <Terminal size={14} className="text-[#00FF99]" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest italic font-bold">COMMAND_CORE_MANIFEST_STREAM</span>
            </div>
            <div className="flex gap-6 items-center">
              <RefreshCw size={12} className={`text-gray-800 ${isGenerating ? 'animate-spin text-[#00FF99]' : ''}`} />
              <span className="text-[8px] text-gray-700 font-mono font-black uppercase tracking-widest">Injection: Active</span>
            </div>
          </div>
          
          <div className="flex-grow p-12 overflow-y-auto custom-scroll font-mono relative bg-transparent z-10">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00FF99]/20 scanning-line pointer-events-none" />
            <pre className="text-[13px] leading-relaxed">
              <code className="text-[#00FF99]">
                {codeOutput.split('\n').map((line, i) => {
                  let colorClass = "text-[#00FF99]/60";
                  if (line.includes(':')) colorClass = "text-[#00FF99]";
                  if (line.includes('{') || line.includes('}')) colorClass = "text-white/20";
                  if (line.includes('"')) colorClass = "text-[#00FF99]";
                  if (line.includes('true') || line.includes('OPTIMAL') || line.includes('LOCKED')) colorClass = "text-[#00FF99] font-black italic";
                  
                  return (
                    <div key={i} className={`flex ${colorClass}`}>
                      <span className="w-12 shrink-0 text-gray-900 select-none italic text-[10px]">{(i+1).toString().padStart(4, '0')}</span>
                      <span className="whitespace-pre-wrap">{line}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </main>

        {/* Right Wing: Nodal Telemetry (4 Massive Numeric Blocks) */}
        <aside className="w-80 shrink-0 bg-[#000000] flex flex-col overflow-hidden">
          <div className="p-8 border-b border-[#1A1A1A] flex items-center gap-4">
            <Activity size={14} className="text-[#00FF99]" />
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-black italic">Nodal_Telemetry</h4>
          </div>
          
          <div className="p-8 space-y-12 overflow-y-auto custom-scroll flex-grow">
            {[
              { l: 'THERMAL_FLUX_ALPHA', v: (settings.thermalEntropy * 42.4).toFixed(2), u: 'kW/m²' },
              { l: 'STRESS_PARITY_LIMIT', v: (settings.stressTensorAlpha * 1.84).toFixed(1), u: 'MPa' },
              { l: 'FRACTURE_VELOCITY', v: (settings.fractureThreshold / 142.1).toFixed(2), u: 'm/s' },
              { l: 'BIFURCATION_RISK', v: (1 - settings.eigenvalueStability).toFixed(5), u: 'index' }
            ].map((m, i) => (
              <div key={i} className="border-l-2 border-[#1A1A1A] pl-8 space-y-3 group hover:border-[#00FF99] transition-all cursor-default">
                <p className="text-[9px] uppercase text-gray-600 font-black tracking-[0.2em] group-hover:text-white transition-colors">{m.l}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,255,153,0.1)] group-hover:text-[#00FF99] transition-colors">
                    {m.v}
                  </span>
                  <span className="text-[10px] font-mono text-gray-800 uppercase font-black">{m.u}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-8 bg-[#020202] border-t border-[#1A1A1A]">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Radio size={12} className="text-[#00FF99] animate-pulse" />
                  <span className="text-[9px] text-[#00FF99] font-mono uppercase tracking-[0.3em] font-black italic">Live_Sensor_Stream</span>
                </div>
                <span className="text-[7px] text-gray-700 font-mono">BUREAU_STABLE</span>
             </div>
             <div className="h-28 w-full border border-[#1A1A1A] bg-[#000000] flex items-end gap-1 p-2 relative overflow-hidden">
               <div className="absolute inset-0 instrumentation-grid opacity-5" />
               {Array.from({ length: 24 }).map((_, i) => (
                 <div 
                   key={i} 
                   className="flex-grow bg-[#00FF99]/20 hover:bg-[#00FF99] transition-all duration-300 border-t border-[#00FF99]/40 relative z-10"
                   style={{ height: `${Math.random() * 80 + 20}%` }}
                 />
               ))}
             </div>
          </div>
        </aside>
      </div>

      {/* Forensic Intelligence Hub (4x2 Rigid Grid) */}
      <footer className="h-72 shrink-0 border-t border-[#1A1A1A] bg-[#000000] p-8 overflow-hidden z-20 flex flex-col gap-6">
        <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
          <div className="flex items-center gap-4">
            <Database size={14} className="text-[#00FF99]" />
            <h2 className="text-[11px] uppercase tracking-[0.5em] font-black text-white italic underline decoration-[#00FF99] underline-offset-8">Forensic Intelligence Hub</h2>
          </div>
          <span className="text-[8px] text-gray-700 font-mono font-black uppercase tracking-widest italic underline decoration-[#1A1A1A]">Archive_Level_4_Authorized</span>
        </div>
        <div className="grid grid-cols-4 gap-4 flex-grow overflow-hidden">
          {FORENSIC_REPORTS.map(report => (
            <div key={report.id} className="border border-[#1A1A1A] bg-[#020202] p-5 hover:border-[#00FF99]/40 transition-all group cursor-crosshair flex flex-col justify-between h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-100 transition-opacity">
                <Crosshair size={10} className="text-[#00FF99]" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-mono text-[#00FF99] font-black bg-[#00FF99]/10 px-2 py-0.5">REF: {report.id}</span>
                  <div className="w-12 h-[1px] bg-[#1A1A1A] group-hover:bg-[#00FF99] transition-all" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-tight group-hover:text-[#00FF99] transition-colors leading-tight line-clamp-1">
                  {report.title}
                </h3>
                <p className="text-[8px] text-gray-500 leading-relaxed font-light italic border-l border-[#1A1A1A] pl-3 line-clamp-2">
                  {report.abstract}
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#1A1A1A] mt-2">
                <span className="text-[9px] font-mono text-[#00FF99] tracking-tighter uppercase font-black">{report.metric}</span>
                <ChevronRight size={10} className="text-gray-900 group-hover:text-[#00FF99] group-hover:translate-x-1 transition-all" />
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
