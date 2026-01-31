import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      {/* Mesh Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),rgba(15,23,42,1))]" />
      
      {/* Animated Blob 1 */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob" />
      
      {/* Animated Blob 2 */}
      <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob animation-delay-2000" />
      
      {/* Animated Blob 3 */}
      <div className="absolute -bottom-32 left-[20%] w-[50vw] h-[50vw] bg-pink-600/30 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob animation-delay-4000" />
    </div>
  );
};

export default Background;