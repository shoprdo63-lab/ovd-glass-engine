import React, { useMemo } from 'react';
import { GlassSettings } from '../types';

interface GlassPreviewProps {
  settings: GlassSettings;
}

/**
 * Converts a hex color to RGB object for easier manipulation
 */
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
};

const GlassPreview: React.FC<GlassPreviewProps> = ({ settings }) => {
  const { 
    blur, 
    transparency, 
    saturation, 
    color, 
    outlineOpacity, 
    shadowBlur, 
    shadowOpacity,
    lightAngle,
    borderRadius
  } = settings;

  const rgb = hexToRgb(color);

  // High-precision Math for border gradients based on light angle
  const calculateBorderGradient = useMemo(() => {
    return `linear-gradient(${lightAngle}deg, rgba(255, 255, 255, ${outlineOpacity}) 0%, rgba(255, 255, 255, ${outlineOpacity * 0.1}) 100%)`;
  }, [lightAngle, outlineOpacity]);

  const glassStyle: React.CSSProperties = {
    background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    borderRadius: `${borderRadius}px`,
    boxShadow: `
      0 0 0 1px rgba(255,255,255, ${outlineOpacity * 0.1}) inset, 
      0 ${shadowBlur/4}px ${shadowBlur/2}px rgba(0,0,0,${shadowOpacity}),
      0 ${shadowBlur}px ${shadowBlur * 1.5}px rgba(0,0,0,${shadowOpacity * 0.5})
    `,
  };
  
  return (
    <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center p-8 group">
       {/* The Glass Card */}
       <div 
         className="relative w-full h-full flex flex-col items-center justify-center p-8 transition-all duration-300 ease-out"
         style={glassStyle}
       >
         {/* Gradient Border Overlay (absolute to handle gradient + radius) */}
         <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                borderRadius: `${borderRadius}px`,
                padding: '1px', // Border width
                background: calculateBorderGradient,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
            }}
         />

         {/* Content */}
         <div className="z-10 text-center select-none">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-white/40 to-white/5 mb-4 mx-auto backdrop-blur-md shadow-lg flex items-center justify-center border border-white/20">
               <span className="text-3xl font-black text-white/90">O</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-1 drop-shadow-md tracking-tighter">Ovd</h2>
            <p className="text-white/70 text-xs uppercase tracking-widest font-medium">
              Glass Engine v2.0
            </p>
         </div>
       </div>
    </div>
  );
};

export default GlassPreview;