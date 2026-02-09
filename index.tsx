
import './globals.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
// Fix: Import GoogleGenAI as per @google/genai guidelines
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
  VERSION: "v10.0_QUANTUM",
  ENC: "QUANTUM_GCM_P2",
  LATENCY: "0.08ms",
  PARITY: "VERIFIED",
  STABILITY_INDEX: "0.999994",
  BUFFER_HEALTH: "99.8%"
};

const PARAMETERS = [
  { key: "thermalEntropy", label: "THERMAL_ENTROPY", min: 0, max: 1.0, step: 0.01, unit: "ΔS" },
  { key: "fractureThreshold", label: "FRACTURE_THRESHOLD", min: 100, max: 5000, step: 10, unit: "MPa" },
  { key: "eigenvalueStability", label: "EIGENVALUE_STABILITY", min: 0, max: 1.0, step: 0.001, unit: "λ" },
  { key: "shearModulus", label: "SHEAR_MODULUS", min: 20, max: 120, step: 1, unit: "GPa" },
  { key: "stressTensorAlpha", label: "STRESS_TENSOR_ALPHA", min: 0, max: 500, step: 5, unit: "σ" },
  { key: "momentOfInertia", label: "MOMENT_OF_INERTIA", min: 50, max: 200, step: 1, unit: "I_z" },
  { key: "molecularParity", label: "MOLECULAR_PARITY", min: 0.5, max: 1.0, step: 0.01, unit: "Ψ" },
  { key: "resonanceDelta", label: "RESONANCE_DELTA", min: 0, max: 100, step: 1, unit: "Hz" }
];

// Fix: Added 'metric' property to each report object to resolve TypeScript error on line 332
const FORENSIC_REPORTS = [
  { id: "R-701", title: "Non-Linear Elasticity in Vacuum Environments", abstract: "Evaluation of stress-strain curves for alumino-silicate composites in zero-atmosphere high-radiation chambers. Verification required for out-of-plane parity where loading exceeds operational margin.", metric: "VERIFIED" },
  { id: "R-702", title: "Quantum Decoherence in Optical Laminates", abstract: "Analysis of structural parity decay at sub-atomic levels during high-velocity photon bombardment simulations. Parity remains verified where stress is below cleavage threshold.", metric: "STABLE" },
  { id: "R-703", title: "Thermal Bifurcation in Cryogenic Silicates", abstract: "Prediction of crack initiation margins when temperature gradients exceed 400K per nanosecond in layered quartz. Thermodynamic flux mapping confirms stability boundary.", metric: "NOMINAL" },
  { id: "R-704", title: "Stochastic Vibration Modes in Hypersonic Fins", abstract: "Modeling aerodynamic fluttering frequencies where turbulence exceeds second-order damping thresholds. Simulation parity verified using icosahedral mesh optimization.", metric: "LOCKED" },
  { id: "R-705", title: "Molecular Anisotropy Mapping in Compression Cores", abstract: "Forensic investigation into crystal lattice orientation under 40GPa static compression loads. Discrete element mapping confirms density parity is above margin.", metric: "VERIFIED" },
  { id: "R-706", title: "Discrete Element Convergence in Fracture Nuclei", abstract: "Numerical verification of mesh density requirements for predicting atomic-level cleavage in tempered glass. Convergence factor resides below critical error threshold.", metric: "CONVERGED" },
  { id: "R-707", title: "Multi-Physics Coupling in Thermodynamic Shields", abstract: "Integrated simulation of radiative heat transfer and structural deformation parity during atmospheric skip-entry. Thermal entropy propagation is nominal.", metric: "ACTIVE" },
  { id: "R-708", title: "Residual Stress Parity in Vacuum-Deposited Coatings", abstract: "Measuring surface tension deltas in thin-film metallic layers where thickness exceeds 400nm operational specs. Forensic audit confirms molecular alignment is stable.", metric: "STABLE" }
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
    const numParticles = 100;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: numParticles }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        speed: 0.5 + Math.random() * 2
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF99';
      ctx.font = '7px JetBrains Mono';

      particles.forEach((p, i) => {
        p.y += p.speed;
        if (p.y > canvas.height) p.y = 0;

        const opacity = (p.z / 100) * 0.2;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();

        if (i % 10 === 0) {
          ctx.fillText(`X:${p.x.toFixed(0)} Y:${p.y.toFixed(0)} Z:${p.z.toFixed(0)}`, p.x + 5, p.y);
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
};

const TelemetryCorner = ({ label, value, position }: { label: string, value: string, position: string }) => (
  <div className={`fixed ${position} z-[500] p-6 flex flex-col gap-0.5 pointer-events-none`}>
    <span className="text-[7px] uppercase tracking-[0.4em] text-gray-700 font-black italic">{label}</span>
    <span className="text-[9px] font-mono text-[#00FF99] font-black tracking-widest">{value}</span>
  </div>
);

const App = () => {
  const [settings, setSettings] = useState({
    thermalEntropy: 0.42,
    fractureThreshold: 2450,
    eigenvalueStability: 0.992,
    shearModulus: 76,
    stressTensorAlpha: 142,
    momentOfInertia: 184,
    molecularParity: 0.98,
    resonanceDelta: 42
  });

  // Fix: Added states for manifest generation tracking
  const [isGenerating, setIsGenerating] = useState(false);
  const [manifestText, setManifestText] = useState<string | null>(null);

  // Fix: Implemented handleDeploy using Gemini API to generate engineering manifests
  const handleDeploy = async () => {
    setIsGenerating(true);
    try {
      // Create new instance before use as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a highly technical forensic manifest for a quantum engine based on these current telemetry parameters: ${JSON.stringify(settings)}. The output should be a detailed report in JSON format including summary, potential risks, and optimization steps.`,
        config: {
          responseMimeType: "application/json"
        }
      });
      // Access .text property directly
      setManifestText(response.text || "{}");
    } catch (error) {
      console.error("Failed to deploy manifest:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const codeOutput = useMemo(() => {
    // If we have a manifest from Gemini, prioritize it
    if (manifestText) {
      try {
        return JSON.stringify(JSON.parse(manifestText), null, 2);
      } catch {
        return manifestText;
      }
    }
    return JSON.stringify({
      OS: "OVD_COMMAND_CORE_v10.0",
      SYNC: "QUANTUM_STABLE",
      PARITY_VERIFIED: true,
      INPUT_MATRIX: {
        THERMAL: settings.thermalEntropy.toFixed(4) + " ΔS",
        FRACTURE: settings.fractureThreshold + " MPa",
        STABILITY: settings.eigenvalueStability.toFixed(4) + " λ",
        SHEAR: settings.shearModulus + " GPa",
        STRESS_ALPHA: settings.stressTensorAlpha.toFixed(2) + " σ",
        INERTIA: settings.momentOfInertia + " I_z",
        PARITY: settings.molecularParity.toFixed(4) + " Ψ",
        RESONANCE: settings.resonanceDelta + " Hz"
      },
      TELEMETRY_STREAM: {
        LOAD_PARITY: (settings.stressTensorAlpha / 500).toFixed(6),
        FRACTURE_RISK: settings.fractureThreshold > 4000 ? "CRITICAL" : "NOMINAL",
        BIFURCATION_DELTA: (1 - settings.eigenvalueStability).toFixed(8),
        ACTIVE_NODES: 4096,
        TIMESTAMP: new Date().getTime()
      }
    }, null, 2);
  }, [settings, manifestText]);

  return (
    <div className="h-screen w-screen bg-[#000000] flex flex-col overflow-hidden relative selection:bg-[#00FF99] selection:text-black cursor-crosshair">
      <div className="absolute inset-0 instrumentation-grid opacity-10 pointer-events-none z-10" />
      
      <TelemetryCorner label="SYNC_PARITY" value="1.0_LOCKED" position="top-0 left-0" />
      <TelemetryCorner label="BUFFER_HEALTH" value={METADATA.BUFFER_HEALTH} position="top-0 right-0" />
      <TelemetryCorner label="ENCRYPTION" value={METADATA.ENC} position="bottom-0 left-0" />
      <TelemetryCorner label="ENGINE_PARITY" value={METADATA.PARITY} position="bottom-0 right-0" />

      <header className="h-16 shrink-0 border-b border-[#1A1A1A] bg-[#000000] px-10 flex items-center justify-between z-20">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none border-b-2 border-[#00FF99]">OVD_BUREAU</h1>
            <span className="text-[7px] font-mono text-gray-600 tracking-[0.5em] mt-2 font-bold italic underline decoration-[#1A1A1A]">QUANTUM_ENGINEERING_OS_v10.0</span>
          </div>
          <div className="h-6 w-px bg-[#1A1A1A] mx-2" />
          <div className="flex gap-10">
            <div className="flex flex-col border-l border-[#1A1A1A] pl-3 py-1">
              <span className="text-[7px] uppercase tracking-[0.4em] text-gray-600 font-black italic">ORBITAL_SYNC</span>
              <span className="text-[10px] font-mono text-[#00FF99] font-bold tabular-nums">7X_ULTRA</span>
            </div>
            <div className="flex flex-col border-l border-[#1A1A1A] pl-3 py-1">
              <span className="text-[7px] uppercase tracking-[0.4em] text-gray-600 font-black italic">VERSION_HASH</span>
              <span className="text-[10px] font-mono text-[#00FF99] font-bold tabular-nums">0xBF42_7X</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="text-right">
            <div className="text-[9px] text-[#00FF99] font-mono uppercase tracking-[0.3em] font-black italic animate-pulse">COMMAND_CORE_ACTIVE</div>
            <div className="text-[8px] text-gray-700 font-mono font-bold tracking-widest uppercase italic">X: 104.2 // Y: 942.1 // Z: 0.08</div>
          </div>
          {/* Fix: Linked DEPLOY_MANIFEST button to Gemini action with loading state */}
          <button 
            onClick={handleDeploy}
            disabled={isGenerating}
            className="bg-[#00FF99] text-black px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,153,0.3)] disabled:opacity-50"
          >
            {isGenerating ? 'ANALYZING...' : 'DEPLOY_MANIFEST'}
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden z-20">
        
        <aside className="w-80 shrink-0 border-r border-[#1A1A1A] bg-[#000000] flex flex-col overflow-hidden">
          <div className="p-8 border-b border-[#1A1A1A] bg-[#020202]">
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 italic border-b border-[#1A1A1A] pb-4">INSTRUMENTATION_LAB</h2>
          </div>
          
          <div className="flex-grow p-8 flex flex-col gap-8 overflow-y-auto custom-scroll">
            {PARAMETERS.map(param => (
              <div key={param.key} className="group relative">
                <div className="flex justify-between mb-2">
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black group-hover:text-[#00FF99] transition-colors">{param.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <input 
                      type="range" min={param.min} max={param.max} step={param.step}
                      value={(settings as any)[param.key]}
                      onChange={(e) => {
                        setManifestText(null); // Clear Gemini output when user updates parameters manually
                        setSettings({...settings, [param.key]: parseFloat(e.target.value)});
                      }}
                      className="w-full h-[1px] bg-[#1A1A1A] accent-[#00FF99] appearance-none cursor-crosshair hover:bg-[#333]"
                    />
                  </div>
                  <span className="w-20 text-[18px] font-mono text-[#00FF99] font-black italic tabular-nums text-right">
                    {(settings as any)[param.key]}
                  </span>
                </div>
                <div className="scientific-label !text-slate-900 !text-[6px] mt-1 text-right">{param.unit}</div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-[#1A1A1A] bg-[#020202] mt-auto">
            <div className="flex flex-col gap-4">
               <div className="flex justify-between items-center">
                 <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-black italic">GLOBAL_PARITY</span>
                 <span className="text-[10px] font-mono text-[#00FF99] font-bold tabular-nums">99.98%</span>
               </div>
               <div className="h-[2px] w-full bg-[#1A1A1A] overflow-hidden">
                 <div className="h-full bg-[#00FF99] animate-pulse shadow-[0_0_10px_#00FF99]" style={{ width: '99.98%' }} />
               </div>
            </div>
          </div>
        </aside>

        <main className="flex-grow flex flex-col bg-[#000000] overflow-hidden border-r border-[#1A1A1A] relative">
          <PointCloudBackground />
          <div className="h-10 border-b border-[#1A1A1A] px-8 flex items-center justify-between bg-[#050505] relative z-10">
            <div className="flex items-center gap-4">
              <Terminal size={14} className="text-[#00FF99]" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">COMMAND_CORE_MANIFEST_STREAM</span>
            </div>
            <div className="flex gap-6 items-center">
              <RefreshCw size={12} className={`text-gray-800 ${isGenerating ? 'animate-spin text-[#00FF99]' : ''}`} />
              <span className="text-[8px] text-gray-700 font-mono font-black uppercase tracking-widest">
                {isGenerating ? 'INJECTING_GENAI_DATA...' : 'LIVE_INJECTION: ACTIVE'}
              </span>
            </div>
          </div>
          
          <div className="flex-grow p-10 overflow-y-auto custom-scroll font-mono relative bg-transparent z-10">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00FF99]/20 scanning-line pointer-events-none" />
            <pre className="text-[13px] leading-relaxed">
              <code className="text-[#00FF99]">
                {codeOutput.split('\n').map((line, i) => {
                  let colorClass = "text-[#00FF99]/60";
                  if (line.includes(':')) colorClass = "text-[#00FF99]";
                  if (line.includes('{') || line.includes('}')) colorClass = "text-white/20";
                  if (line.includes('"')) colorClass = "text-[#00FF99]";
                  if (line.includes('true') || line.includes('OPTIMAL') || line.includes('STABLE')) colorClass = "text-[#00FF99] font-black italic";
                  
                  return (
                    <div key={i} className={`flex ${colorClass}`}>
                      <span className="w-12 shrink-0 text-gray-900 select-none italic">{(i+1).toString().padStart(4, '0')}</span>
                      <span className="whitespace-pre-wrap">{line}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </main>

        <aside className="w-72 shrink-0 bg-[#000000] flex flex-col overflow-hidden">
          <div className="p-8 border-b border-[#1A1A1A] space-y-12">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-black italic">NODAL_TELEMETRY</h4>
            {[
              { l: 'THERMAL_FLUX_ALPHA', v: (settings.thermalEntropy * 42.4).toFixed(2), u: 'kW/m²' },
              { l: 'STRESS_PARITY_LIMIT', v: (settings.stressTensorAlpha * 1.84).toFixed(1), u: 'MPa' },
              { l: 'FRACTURE_VELOCITY', v: (settings.fractureThreshold / 142.1).toFixed(2), u: 'm/s' },
              { l: 'BIFURCATION_RISK', v: (1 - settings.eigenvalueStability).toFixed(5), u: 'index' }
            ].map((m, i) => (
              <div key={i} className="border-l border-[#1A1A1A] pl-6 space-y-2 group">
                <p className="text-[9px] uppercase text-gray-600 font-black tracking-[0.2em] group-hover:text-[#00FF99] transition-colors">{m.l}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(0,255,153,0.1)] group-hover:text-[#00FF99] transition-colors cursor-default">{m.v}</span>
                  <span className="text-[10px] font-mono text-gray-800 uppercase font-bold">{m.u}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex-grow p-8 flex flex-col justify-end gap-6 overflow-hidden">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Radio size={12} className="text-[#00FF99] animate-pulse" />
                  <span className="text-[9px] text-[#00FF99] font-mono uppercase tracking-[0.3em] font-black italic">LIVE_SENSOR_MATRIX</span>
                </div>
                <span className="text-[8px] text-gray-800 font-mono">NODE_7X: LOCKED</span>
             </div>
             <div className="h-40 w-full border border-[#1A1A1A] bg-[#020202] flex items-end gap-1 p-4 relative overflow-hidden">
               <div className="absolute inset-0 instrumentation-grid opacity-5" />
               {Array.from({ length: 30 }).map((_, i) => (
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

      <footer className="h-72 shrink-0 border-t border-[#1A1A1A] bg-[#000000] p-8 overflow-hidden z-20 flex flex-col gap-6">
        <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
          <h2 className="text-[11px] uppercase tracking-[0.5em] font-black text-white italic underline decoration-[#00FF99] underline-offset-8">FORENSIC_INTELLIGENCE_HUB_v10.0</h2>
          <span className="text-[8px] text-gray-700 font-mono font-black uppercase tracking-widest italic">QUANTUM_ARCHIVE_AUTHORIZED_ONLY</span>
        </div>
        <div className="grid grid-cols-4 gap-4 flex-grow overflow-hidden">
          {FORENSIC_REPORTS.map(report => (
            <div key={report.id} className="border border-[#1A1A1A] bg-[#020202] p-5 hover:border-[#00FF99]/40 transition-all group cursor-crosshair flex flex-col justify-between h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                <Crosshair size={10} className="text-[#00FF99]" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-mono text-[#00FF99] font-black bg-[#00FF99]/5 px-2 py-0.5">ID: {report.id}</span>
                  <div className="w-12 h-[1px] bg-[#1A1A1A] group-hover:bg-[#00FF99] transition-all" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-tight group-hover:text-[#00FF99] transition-colors leading-tight line-clamp-1">
                  {report.title}
                </h3>
                <p className="text-[8px] text-gray-500 leading-relaxed font-light italic border-l border-[#1A1A1A] pl-3 line-clamp-3">
                  {report.abstract}
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#1A1A1A] mt-2">
                {/* Fix: report.metric is now correctly typed as it exists in FORENSIC_REPORTS */}
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
