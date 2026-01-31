import React from 'react';

export const AdWidgetTop: React.FC = () => (
  <div className="w-full max-w-4xl mx-auto mb-10 p-5 bg-[#050505] border border-slate-800 rounded-lg text-center flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="text-left">
        <span className="text-[10px] font-bold text-cyan-500 tracking-wider uppercase mb-1 block">Trending</span>
        <h3 className="text-slate-200 text-sm font-medium">
            2026 UI Forecast: <strong>"Depth is the new Flat."</strong> 
        </h3>
    </div>
    <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 transition-colors">
        Read Report
    </button>
  </div>
);

export const AdWidgetSidebar: React.FC = () => (
  <div className="mt-8 p-6 bg-[#050505] border border-slate-800 rounded-2xl">
    <h4 className="text-sm font-bold text-white mb-4 border-b border-slate-800 pb-2">Ovd Design Tips</h4>
    <ul className="space-y-4">
        {[
            "OLED Optimization: Use #000000 opacity layers for true battery savings on mobile.",
            "Visual Hierarchy: Use saturation, not just opacity, to indicate active states.", 
            "Border Physics: Light always comes from top-left (135deg) in standard western UI."
        ].map((tip, i) => (
            <li key={i} className="text-xs text-slate-400 flex gap-3">
                <span className="text-cyan-500 font-bold">{i+1}.</span> 
                <span className="leading-relaxed">{tip}</span>
            </li>
        ))}
    </ul>
    <div className="mt-6 pt-4 border-t border-slate-800 text-center">
        <span className="text-[10px] text-slate-600 uppercase tracking-widest">Featured Partner</span>
    </div>
  </div>
);

export const SeoArticle: React.FC = () => (
  <article className="mt-24 max-w-4xl mx-auto prose prose-invert prose-headings:text-slate-100 prose-p:text-slate-400 prose-a:text-cyan-400 prose-li:text-slate-400">
    <div className="border-l-2 border-cyan-500 pl-6 mb-12">
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 mb-4">
            Ovd Design Guide: The Science of Glassmorphism and UI Layering in 2026
        </h1>
        <p className="text-lg text-slate-400 font-light">
            Mastering transparency, refraction, and optical depth in the next generation of web interfaces.
        </p>
    </div>
    
    <p>
        The flat design revolution of the 2010s served a purpose: it cleaned up the web. But as screens became higher definition (Retina, OLED, 120Hz), flatness began to feel... dead. <strong>Ovd Glass Engine</strong> was built on the premise that interfaces should feel like physical objects manipulation light. We call this "Visual Layering."
    </p>

    <h2 className="text-2xl font-semibold mt-12 mb-6">1. The Physics of Digital Glass</h2>
    <p>
        True Glassmorphism isn't just about `opacity: 0.5`. It mimics the physical properties of frosted glass (polycarbonate) or acrylic. To achieve a production-ready look in 2026, you must balance three variables:
    </p>
    <ul className="list-none pl-0 space-y-4 mb-8">
        <li className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <strong className="text-cyan-400 block mb-1">Refraction (Blur)</strong>
            We interpret blur as distance. A higher `backdrop-filter: blur(20px)` implies the object behind the glass is further away. Ovd's engine allows up to 40px blur to simulate extreme depth.
        </li>
        <li className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <strong className="text-purple-400 block mb-1">Luminance (Border)</strong>
            Glass has thickness. When light hits the edge, it scatters. This is why a 1px solid border with low opacity (e.g., `rgba(255,255,255,0.4)`) is crucial. It defines the edge of the material.
        </li>
        <li className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <strong className="text-pink-400 block mb-1">Chromaticity (Saturation)</strong>
            Frosted glass scatters light, often intensifying colors. Using `saturate(150%)` in your backdrop filter creates that rich, "Apple-like" vibrancy that distinguishes premium UI from basic transparency.
        </li>
    </ul>

    <h2 className="text-2xl font-semibold mt-12 mb-6">2. Accessibility in Transparent UI</h2>
    <p>
        The biggest criticism of glass UI is readability. The <strong>Ovd Engine</strong> presets are calibrated to ensure contrast ratios remain compliant.
    </p>
    <p>
        <strong>The Rule of Tint:</strong> Never rely solely on the background image for contrast. Your glass pane must have its own tint. If your text is white, your glass background needs a white fill of at least 10-20% (`rgba(255,255,255,0.15)`), or a dark fill for dark mode.
    </p>

    <h2 className="text-2xl font-semibold mt-12 mb-6">3. Performance: The Cost of Blur</h2>
    <p>
        CSS filters are computationally expensive. Ovd optimizes the generated code by using standard CSS properties that trigger hardware acceleration in modern browsers (Chrome, Safari, Edge).
    </p>
    <h3 className="text-xl font-medium mt-6 mb-2">Best Practices for 2026 Deployment:</h3>
    <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Limit Nesting:</strong> Don't stack blur on top of blur. It causes exponential rendering cost.</li>
        <li><strong>Static Backgrounds:</strong> While Ovd showcases animated blobs, in production apps with heavy data, keep the background element static or transform-only (GPU).</li>
        <li><strong>Safari Webkit:</strong> Always include `-webkit-backdrop-filter`. Despite standards advancement, Safari on iOS still relies heavily on the prefix for optimal performance.</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-12 mb-6">4. The Future: "Dark Matter" Aesthetics</h2>
    <p>
        As showcased in our "Dark Matter" presets, the trend is moving toward deep, void-like interfaces with high-gloss accents. This "Neo-Noir" aesthetic saves battery life on OLED screens and reduces eye strain. Ovd is the first generator to offer a dedicated suite of presets for this specific dark-mode sub-genre.
    </p>

    <div className="mt-16 p-8 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-slate-800 rounded-2xl text-center">
        <h4 className="text-xl font-bold text-white mb-2">Ready to build?</h4>
        <p className="text-slate-400 text-sm mb-0">
            Use the <strong>Ovd Glass Engine</strong> above to export your CSS, then use our Wave Generator to add organic flow. The code is yours, royalty-free.
        </p>
    </div>
  </article>
);