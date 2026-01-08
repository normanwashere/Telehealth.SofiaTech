import React from 'react';

interface InteractiveCardProps {
    icon: string;
    iconColor: string;
    title: string;
    subtitle: string;
    onClick: () => void;
    cornerIcon?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ icon, iconColor, title, subtitle, onClick, cornerIcon = true }) => {
    return (
        <div 
            className="glass glass-hover p-8 rounded-2xl transition-all duration-300 cursor-pointer relative group text-center border-t border-slate-700/50"
            onClick={onClick}
        >
            {cornerIcon && (
                <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 text-slate-500 group-hover:text-emerald-400 group-hover:bg-slate-700/50 transition-all duration-300">
                    <i className="ph-corners-out text-lg"></i>
                </div>
            )}
            <div className={`inline-flex items-center justify-center p-4 rounded-full bg-slate-800/50 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${icon} text-4xl ${iconColor}`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{subtitle}</p>
        </div>
    );
};

export default InteractiveCard;