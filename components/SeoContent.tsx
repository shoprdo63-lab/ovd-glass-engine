import React from 'react';
import { BookOpen, TrendingUp, Zap } from 'lucide-react';

export const AdWidgetTop: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto mb-12 p-6 bg-[#080808] border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    <div className="text-left relative z-10">
        <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-900 tracking-wider uppercase">Design Trend 2026</span>
            <span className="text-[10px] text-slate-500 font-mono">UPDATED TODAY</span>
        </div>
        <h3 className="text-slate-200 text-lg font-medium leading-tight">
            UI Report: <strong className="text-white">Why "Spatial Glass" is replacing Flat Design</strong> in mobile operating systems.
        </h3>
        <p className="text-xs text-slate-400 mt-2 max-w-2xl">
            From visionOS to the latest Android updates, depth is making a comeback. Learn how to implement performant blur without draining battery life.
        </p>
    </div>
    <button className="flex-shrink-0 px-6 py-2.5 bg-slate-100 hover:bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10">
        Read Analysis
    </button>
  </div>
);

export const AdWidgetSidebar: React.FC = () => (
  <div className="p-6 bg-[#080808] border border-slate-800 rounded-2xl shadow-xl sticky top-6">
    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
        <Zap className="w-3 h-3 text-yellow-500" />
        Quick Tips
    </h4>
    <div className="space-y-6">
        <div className="group cursor-pointer">
            <h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">Performance First</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
                Always use <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-200">transform: translateZ(0)</code> on glass elements to force GPU acceleration.
            </p>
        </div>
        <div className="border-t border-slate-800/50"></div>
        <div className="group cursor-pointer">
            <h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">Accessibility</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
                Don't rely on blur alone. Always add a semi-transparent solid fill (e.g. #000 at 40%) to ensure text contrast passes WCAG AA.
            </p>
        </div>
        <div className="border-t border-slate-800/50"></div>
        <div className="group cursor-pointer">
            <h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">The "Noise" Trick</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
                Add a subtle SVG noise overlay to your glass to reduce color banding on lower-quality displays.
            </p>
        </div>
    </div>
    <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase block mb-2">Sponsored Tool</span>
            <p className="text-xs text-white font-medium mb-3">Need icons for your glass cards?</p>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-[10px] text-slate-300 font-bold uppercase transition-colors">Browse Icon Library</button>
        </div>
    </div>
  </div>
);

export const SeoArticle: React.FC = () => (
  <article className="mt-32 max-w-5xl mx-auto">
    <div className="flex items-center gap-4 mb-12">
        <div className="h-px bg-slate-800 flex-1"></div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Documentation & Guide</span>
        <div className="h-px bg-slate-800 flex-1"></div>
    </div>

    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-400 prose-p:leading-8 prose-li:text-slate-400">
        <header className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
                Ovd Design Guide: Mastering Glassmorphism Dynamics in 2026
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
                A comprehensive technical deep-dive into optical depth, refraction physics, and the architectural principles of modern "Spatial UI".
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#080808] p-8 rounded-2xl border border-slate-800">
                <h3 className="text-2xl text-white mb-4 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-cyan-500" />
                    The Evolution of Transparency
                </h3>
                <p>
                    Glassmorphism isn't new. It appeared in Windows Vista (Aero) and iOS 7. However, the 2026 iteration—often called "Spatial Glass"—differs fundamentally in its implementation. Modern glass isn't just a static blur; it is a dynamic material that responds to light, proximity, and underlying content.
                </p>
                <p>
                    The <strong>Ovd Engine</strong> was built to replicate these physics. Unlike simple CSS generators, Ovd calculates the relationship between <em>Saturation</em> and <em>Blur</em> to mimic how photons scatter through polycarbonate materials versus crystal glass.
                </p>
            </div>
            <div className="bg-[#080808] p-8 rounded-2xl border border-slate-800">
                <h3 className="text-2xl text-white mb-4 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                    Why "Dark Matter" UI?
                </h3>
                <p>
                    With the prevalence of OLED screens, true black (#000000) pixels turn off completely, saving energy. However, pure black creates harsh contrast. "Dark Matter" UI solves this by using deep, translucent greys (#050505 to #121212) with high-gloss borders.
                </p>
                <p>
                    This aesthetic creates a sense of "void" depth, where interface elements float in a deep space rather than sitting on a 2D plane. It is the dominant design language for high-performance dashboards and developer tools in 2026.
                </p>
            </div>
        </div>

        <h2 className="text-3xl text-white mt-20 mb-8 border-l-4 border-cyan-500 pl-6">1. The Mathematics of Optical Depth</h2>
        <p>
            To achieve a believable glass effect, one cannot simply apply `backdrop-filter: blur(10px)`. The perception of depth is governed by the <strong>Blur-Luminance Ratio</strong>. As an object moves further behind a frosted surface:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
            <li className="bg-[#0A0A0A] p-6 rounded-xl border border-slate-800">
                <span className="text-4xl font-black text-slate-700 mb-2 block">01</span>
                <strong className="text-white block mb-2">Blur Radius Increases</strong>
                <p className="text-sm text-slate-400">The further the background, the higher the blur value. Ovd allows up to 40px to simulate extreme depth.</p>
            </li>
            <li className="bg-[#0A0A0A] p-6 rounded-xl border border-slate-800">
                <span className="text-4xl font-black text-slate-700 mb-2 block">02</span>
                <strong className="text-white block mb-2">Saturation Spikes</strong>
                <p className="text-sm text-slate-400">Light scattering causes colors to appear more vibrant. We recommend 120-140% saturation.</p>
            </li>
            <li className="bg-[#0A0A0A] p-6 rounded-xl border border-slate-800">
                <span className="text-4xl font-black text-slate-700 mb-2 block">03</span>
                <strong className="text-white block mb-2">Contrast Drops</strong>
                <p className="text-sm text-slate-400">Details are lost. You must compensate with a stronger overlay tint (opacity).</p>
            </li>
        </ul>

        <h2 className="text-3xl text-white mt-20 mb-8 border-l-4 border-purple-500 pl-6">2. Implementing Glass in CSS: The Stack</h2>
        <p>
            Production-ready glassmorphism requires a specific CSS stacking context to avoid rendering artifacts. Here is the Ovd recommended stack:
        </p>
        <pre className="bg-[#050505] border border-slate-800 p-6 rounded-xl text-sm font-mono text-slate-300 overflow-x-auto">
{`.glass-container {
  /* 1. Hardware Acceleration */
  transform: translate3d(0, 0, 0);
  
  /* 2. The Filter */
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  
  /* 3. The Tint (Crucial for readability) */
  background-color: rgba(17, 25, 40, 0.75);
  
  /* 4. The Edge (Simulates thickness) */
  border: 1px solid rgba(255, 255, 255, 0.125);
}`}
        </pre>

        <h2 className="text-3xl text-white mt-20 mb-8 border-l-4 border-pink-500 pl-6">3. Common Pitfalls & Performance</h2>
        <p>
            <strong>The "Laggy Scroll" Issue:</strong> Overusing backdrop-filter can tank scrolling performance, especially on mobile devices with high refresh rates (120Hz). The browser has to repaint the blurred area every time the content behind it moves.
        </p>
        <p>
            <strong>The Fix:</strong> Use glass sparingly. Do not make your entire background a moving video behind a full-screen glass panel. Use static backgrounds where possible, or limit the size of the glass elements. Ovd's generated code is optimized for modern engines, but architectural restraint is still required.
        </p>

        <div className="mt-20 p-10 bg-gradient-to-r from-slate-900 via-[#050505] to-slate-900 border border-slate-800 rounded-2xl text-center">
            <h4 className="text-2xl font-bold text-white mb-4">Start Designing Today</h4>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                Ovd Glass Engine is free for commercial and personal use. Whether you are building a dashboard, a mobile app, or a portfolio, the code generated here is compliant with 2026 web standards.
            </p>
            <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-slate-200 transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                Back to Generator
            </button>
        </div>
    </div>
  </article>
);