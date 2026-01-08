import React from 'react';
import { SectionId } from '../types';

interface VisionSectionProps {
    onNavigate: (section: SectionId) => void;
}

const VisionSection: React.FC<VisionSectionProps> = ({ onNavigate }) => {
    return (
        <section className="animate-fade-in min-h-screen flex flex-col justify-center items-center text-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-slate-900">
            
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center">
                
                {/* Status Badge */}
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-md shadow-lg animate-fade-in">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-300 tracking-widest uppercase">
                        System Ready for Deployment
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-tight tracking-tight text-white mb-6">
                    Universal Health Care. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">
                        Your Legacy, Delivered.
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-slate-300 leading-relaxed font-light">
                    The mandate is clear, but the opportunity is yours. Transform your LGU into a <span className="text-white font-semibold">Smart Health City</span> in 90 days and ensure no constituent is left behind.
                </p>

                {/* CTA Button */}
                <button 
                    onClick={() => onNavigate('gap')}
                    className="mt-12 group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white transition-all duration-200 bg-emerald-500 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transform hover:-translate-y-1"
                >
                    <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-600 opacity-20 blur-lg transition-all duration-200 group-hover:opacity-40 group-hover:inset-1"></div>
                    <span className="relative flex items-center gap-3">
                        Launch the Partnership <i className="ph-arrow-right font-bold"></i>
                    </span>
                </button>

                {/* Trust/Authority Bar */}
                <div className="mt-24 pt-8 border-t border-white/5 w-full animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                        Powered by the Nation's Digital Leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                         {/* Metro Pacific / mWell */}
                        <img src="https://sofia.static.domains/Health/mwell%20logo.png" alt="mWell" className="h-8 md:h-10 object-contain" />

                         {/* KonsultaMD */}
                         <img src="https://konsulta.md/assets/img/logo.svg" alt="KonsultaMD" className="h-6 md:h-8 object-contain" />
                        
                        {/* PLDT */}
                        <img src="https://pldthome.com/images/default-source/navbar-update-072023/pldt-logo-size-optimized.png" alt="PLDT" className="h-6 md:h-8 object-contain brightness-0 invert" />
                        
                        {/* Smart */}
                        <img src="https://smart.com.ph/smartrevamp/assets_HeaderRevamp/img/smart_logo_white.png" alt="Smart" className="h-6 md:h-8 object-contain" />
                        
                        {/* Starlink */}
                        <img src="https://sofia.static.domains/Health/Starlink.png" alt="Starlink" className="h-8 md:h-10 object-contain brightness-0 invert" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionSection;