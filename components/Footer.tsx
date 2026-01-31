import React, { useState } from 'react';
import { X, Shield, FileText, Info } from 'lucide-react';

const Modal = ({ title, icon, children, onClose }: { title: string, icon: React.ReactNode, children?: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
    <div className="bg-[#050505] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-[#050505]/95 border-b border-slate-800 p-5 flex justify-between items-center rounded-t-2xl z-10 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-3">
            {icon}
            {title}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
      </div>
      <div className="p-8 text-slate-400 text-sm leading-relaxed overflow-y-auto custom-scrollbar">
        <div className="prose prose-invert prose-sm max-w-none">
            {children}
        </div>
      </div>
      <div className="p-4 border-t border-slate-800 bg-slate-900/30 rounded-b-2xl flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded transition-colors">Close</button>
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = () => {
    switch(activeModal) {
        case 'about':
            return (
                <div className="space-y-4">
                    <p className="text-lg text-slate-200 font-medium">Ovd Glass Engine is the industry standard for procedural CSS glassmorphism generation.</p>
                    <p>
                        Launched in 2025, Ovd was created to solve a specific problem: the inconsistency of "frosted glass" effects across different browsers and operating systems. 
                        By utilizing a complex algorithm that balances blur radius, saturation, and luminance-based borders, Ovd ensures your UI looks physical and grounded.
                    </p>
                    <h4 className="text-white font-bold mt-4">Our Mission</h4>
                    <p>
                        To provide developers with copy-paste ready code that pushes the visual fidelity of the web forward, moving away from "flat design" into the era of "spatial layering".
                    </p>
                    <h4 className="text-white font-bold mt-4">Contact</h4>
                    <p>
                        For enterprise integrations or feature requests, please contact us at: <a href="mailto:magic.reviewsite@gmail.com" className="text-cyan-400 underline">magic.reviewsite@gmail.com</a>
                    </p>
                </div>
            );
        case 'privacy':
            return (
                <div className="space-y-4">
                    <p className="text-xs text-slate-500 uppercase font-bold">Last Updated: October 2025</p>
                    <p>At Ovd ("we", "us", "our"), we prioritize the privacy of our users. This Privacy Policy explains how we handle your information.</p>
                    
                    <h4 className="text-white font-bold">1. Data Collection</h4>
                    <p>
                        <strong>We do not collect personal data.</strong> Ovd is a client-side application. The settings you configure (blur, opacity, colors) are stored locally in your browser's LocalStorage to persist your session. This data never leaves your device.
                    </p>

                    <h4 className="text-white font-bold">2. Third-Party Services</h4>
                    <p>
                        We use Google AdSense to serve advertisements. Google may use cookies to personalize ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
                    </p>

                    <h4 className="text-white font-bold">3. Analytics</h4>
                    <p>
                        We may use anonymous analytics tools (like Google Analytics) to track aggregate usage metrics (e.g., "50% of users prefer Dark Mode"). No personally identifiable information (PII) is attached to this data.
                    </p>
                </div>
            );
        case 'terms':
            return (
                <div className="space-y-4">
                    <p className="text-xs text-slate-500 uppercase font-bold">Last Updated: October 2025</p>
                    <p>By accessing Ovd Glass Engine, you agree to these Terms of Service.</p>
                    
                    <h4 className="text-white font-bold">1. License to Use</h4>
                    <p>
                        The CSS, SVG, and code snippets generated by Ovd are <strong>Open Source (MIT License)</strong>. You are free to use them in personal, commercial, and enterprise projects without attribution (though attribution is appreciated).
                    </p>

                    <h4 className="text-white font-bold">2. Disclaimer</h4>
                    <p>
                        The software is provided "as is", without warranty of any kind. Ovd is not liable for any damages or rendering issues arising from the use of the generated code in your applications.
                    </p>

                    <h4 className="text-white font-bold">3. Acceptable Use</h4>
                    <p>
                        You may not use this website to reverse-engineer our generation algorithms for the purpose of building a competing "clone" site.
                    </p>
                </div>
            );
        default: return null;
    }
  };

  return (
    <>
      <footer className="mt-24 border-t border-slate-800 bg-[#020202] py-16">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                            <span className="text-black font-black text-lg">O</span>
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">Ovd</span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                        The world's most advanced procedural glass generator. Built for the modern web.
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                     <div className="flex flex-col gap-3 text-center md:text-left">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Company</span>
                        <button onClick={() => setActiveModal('about')} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">About</button>
                        <a href="mailto:magic.reviewsite@gmail.com" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Contact</a>
                     </div>
                     <div className="flex flex-col gap-3 text-center md:text-left">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Legal</span>
                        <button onClick={() => setActiveModal('privacy')} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</button>
                        <button onClick={() => setActiveModal('terms')} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</button>
                     </div>
                </div>
            </div>
            
            <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-slate-700 uppercase tracking-widest">© 2026 Ovd Design. All rights reserved.</p>
                <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-900"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-900"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-900"></div>
                </div>
            </div>
        </div>
      </footer>
      {activeModal && (
        <Modal 
            title={activeModal === 'about' ? 'About Ovd' : activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} 
            icon={activeModal === 'about' ? <Info className="w-5 h-5 text-cyan-400"/> : activeModal === 'privacy' ? <Shield className="w-5 h-5 text-green-400"/> : <FileText className="w-5 h-5 text-purple-400"/>}
            onClose={() => setActiveModal(null)}
        >
            {renderModalContent()}
        </Modal>
      )}
    </>
  );
};

export default Footer;