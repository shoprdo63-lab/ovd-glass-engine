import React, { useState } from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, children, onClose }: { title: string, children?: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
    <div className="bg-[#0A0A0A] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-[#0A0A0A]/95 border-b border-slate-800 p-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
      </div>
      <div className="p-6 text-slate-400 text-sm space-y-4">
        {children}
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
                <>
                    <p><strong>Ovd Glass Engine</strong> is the world's most advanced design asset generator. We specialize in "Visual Layering"—the intersection of depth, light, and transparency in user interface design.</p>
                    <p>Our mission is to provide developers and designers with production-ready code that pushes the boundaries of what CSS can achieve in the browser.</p>
                </>
            );
        case 'privacy':
            return (
                <>
                    <p><strong>Privacy Policy</strong></p>
                    <p>At Ovd, privacy is built into our architecture. This application functions as a client-side utility. We do not store, collect, or transmit your design configurations to any server.</p>
                    <p>We use local storage only to remember your preferences. No third-party tracking scripts are active beyond standard analytics for site performance.</p>
                </>
            );
        case 'terms':
            return (
                <>
                    <p><strong>Terms of Service</strong></p>
                    <p>By using Ovd Glass Engine, you agree that the generated CSS and SVG code is yours to use freely in personal and commercial projects. Attribution to Ovd is appreciated but not required.</p>
                    <p>The software is provided "as is". Ovd is not liable for any rendering issues in legacy browsers.</p>
                </>
            );
        default: return null;
    }
  };

  return (
    <>
      <footer className="mt-20 border-t border-slate-800 bg-[#050505] py-12">
        <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
                <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-600 tracking-tighter">Ovd</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500 mb-8">
                <button onClick={() => setActiveModal('about')} className="hover:text-cyan-400 transition-colors">About Ovd</button>
                <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
                <button onClick={() => setActiveModal('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button>
            </div>
            <p className="text-[10px] text-slate-700 uppercase tracking-widest">© 2026 Ovd Design. All rights reserved.</p>
        </div>
      </footer>
      {activeModal && <Modal title={activeModal === 'about' ? 'About Ovd' : activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} onClose={() => setActiveModal(null)}>{renderModalContent()}</Modal>}
    </>
  );
};

export default Footer;