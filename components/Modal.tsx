import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    colorClass?: string;
    isImageModal?: boolean;
    maxWidth?: string;
    backgroundImage?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, colorClass = "text-emerald-400", isImageModal = false, maxWidth, backgroundImage }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    // If a background image is present, we use a solid dark base and let the image + gradient handle the visuals.
    // Otherwise, we use the glassmorphism style.
    const backgroundStyle = backgroundImage && !isImageModal 
        ? 'bg-slate-900 border-white/20' 
        : 'bg-slate-900/90 backdrop-blur-xl border-white/10';

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 animate-fade-in" onClick={onClose}>
            <div 
                className={`relative transition-transform transform scale-100 ${
                    isImageModal 
                        ? 'flex items-center justify-center pointer-events-none' // Allow clicks to pass through empty space
                        : `w-full ${maxWidth || 'max-w-lg'} ${backgroundStyle} border rounded-2xl shadow-2xl overflow-hidden`
                }`} 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Optional Background Image */}
                {backgroundImage && !isImageModal && (
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        {/* Opacity set to 15% and mix-blend removed for clearer visibility as requested */}
                        <img src={backgroundImage} alt="" className="w-full h-full object-cover opacity-[0.15]" />
                        {/* Adjusted gradient to let more image show through at the top (to-transparent) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
                    </div>
                )}

                <div className={`relative z-10 ${!isImageModal ? 'p-8' : 'pointer-events-auto'}`}>
                    <button 
                        onClick={onClose} 
                        className={`absolute ${isImageModal ? '-top-4 -right-4 z-50' : 'top-4 right-4'} text-slate-400 hover:text-white transition-colors z-20`}
                        aria-label="Close modal"
                    >
                        <i className={`ph-x${isImageModal ? '-circle' : ''} text-${isImageModal ? '4xl bg-slate-900 rounded-full text-white shadow-lg' : '2xl'}`}></i>
                    </button>
                    
                    {!isImageModal && title && (
                        <h3 className={`text-2xl font-black mb-2 ${colorClass} tracking-tight drop-shadow-md`}>{title}</h3>
                    )}
                    
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default Modal;