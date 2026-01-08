import React from 'react';
import { SectionId } from '../types';

interface NavigationProps {
    activeSection: SectionId;
    onNavigate: (section: SectionId) => void;
}

const navItems: { id: SectionId; label: string; icon: string }[] = [
    { id: 'vision', label: 'Vision', icon: 'ph-rocket-launch' },
    { id: 'gap', label: 'Gap', icon: 'ph-warning-circle' },
    { id: 'solution', label: 'Solution', icon: 'ph-lightbulb' },
    { id: 'win', label: 'Impact', icon: 'ph-trophy' },
    { id: 'proposal', label: 'Proposal', icon: 'ph-calculator' },
    { id: 'justification', label: 'Funding', icon: 'ph-scales' },
    { id: 'roadmap', label: 'Roadmap', icon: 'ph-map-trifold' },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50">
             {/* Gradient Line Top */}
             <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
             
             {/* Main Bar */}
            <div className="bg-slate-950/90 backdrop-blur-xl border-t border-white/5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.8)]">
                
                {/* Branding Strip */}
                <div className="flex justify-center items-center py-1.5 bg-slate-900/50 border-b border-white/5 gap-3">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Powering LGU Healthcare</span>
                    <div className="h-3 w-px bg-slate-700"></div>
                    <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                        <img src="https://sofia.static.domains/Health/SofiaLogoWhite.png" alt="Sofia Technology" className="h-3.5" />
                        <span className="text-[10px] font-bold text-slate-300 hidden sm:inline tracking-wide">Sofia Technology</span>
                    </div>
                </div>

                {/* Nav Buttons */}
                <nav className="max-w-screen-2xl mx-auto px-2">
                    <ul className="flex justify-between md:justify-center items-center md:gap-2">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id} className="flex-1 md:flex-none">
                                    <button
                                        onClick={() => onNavigate(item.id)}
                                        className="relative w-full md:w-28 h-20 flex flex-col items-center justify-center group focus:outline-none"
                                    >
                                        {/* Active Light Splash */}
                                        <div className={`absolute inset-x-0 top-0 h-full bg-gradient-to-b from-emerald-500/10 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                                        
                                        {/* Top Indicator */}
                                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-lg bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-300 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}></div>

                                        {/* Icon Container */}
                                        <div className={`
                                            relative z-10 w-10 h-10 mb-1 rounded-xl flex items-center justify-center transition-all duration-300
                                            ${isActive 
                                                ? 'bg-emerald-500/20 text-emerald-400 translate-y-[-2px] shadow-lg shadow-emerald-900/20' 
                                                : 'text-slate-500 group-hover:text-slate-300 group-hover:bg-white/5'}
                                        `}>
                                            <i className={`${item.icon} text-2xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}></i>
                                        </div>

                                        {/* Label */}
                                        <span className={`
                                            relative z-10 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
                                            ${isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}
                                        `}>
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Navigation;