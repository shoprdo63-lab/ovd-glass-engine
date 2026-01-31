import React, { useState } from 'react';
import { GlassSettings } from '../types';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeOutputProps {
  settings: GlassSettings;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ settings }) => {
  const [copied, setCopied] = useState(false);
  
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(settings.color);
  const rgbString = rgb 
    ? `${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(rgb[3], 16)}`
    : '255, 255, 255';

  const cssCode = `.glass-panel {
  /* Base Glass Style */
  background: rgba(${rgbString}, ${settings.transparency});
  backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  -webkit-backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  
  /* Border & Shape */
  border-radius: ${settings.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${settings.outlineOpacity});
  
  /* Shadows */
  box-shadow: 
    0 ${Math.round(settings.shadowBlur/4)}px ${Math.round(settings.shadowBlur/2)}px rgba(0, 0, 0, ${settings.shadowOpacity}),
    0 ${settings.shadowBlur}px ${Math.round(settings.shadowBlur * 1.5)}px rgba(0, 0, 0, ${settings.shadowOpacity * 0.5});
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0A0A0A] border border-slate-800 rounded-xl overflow-hidden shadow-xl relative group">
      <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-cyan-500" />
            <span className="text-xs font-mono text-slate-400">CSS Output</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors text-xs text-slate-300"
          title="Copy to clipboard"
        >
          {copied ? <><Check className="w-3 h-3 text-green-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy CSS</>}
        </button>
      </div>
      <div className="p-4 overflow-x-auto bg-[#050505]">
        <pre className="text-xs font-mono text-slate-300 leading-relaxed">
          <code>{cssCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeOutput;