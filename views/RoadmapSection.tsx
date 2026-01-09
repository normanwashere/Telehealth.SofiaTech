import React from 'react';

const RoadmapSection: React.FC = () => {
    return (
        <section className="animate-fade-in py-16 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

            <div className="max-w-screen-xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        Our Partnership <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Roadmap</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        A phased, risk-free approach to implementing digital healthcare in your LGU.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line - Left on mobile, Center on desktop */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-teal-500/50 to-emerald-500/50 md:-translate-x-1/2"></div>

                    <div className="space-y-12 md:space-y-0">
                        <TimelineItem
                            month="MONTH 1"
                            phase="Co-Planning & Mobilization"
                            icon="ph-flag-check"
                            color="sky"
                            items={[
                                "Formal MOA Signing & JTWG Creation",
                                "Initiation of RA 9184-compliant procurement",
                                "Finalization of beneficiary list & site selection"
                            ]}
                            position="left"
                        />
                        <TimelineItem
                            month="MONTHS 2-3"
                            phase="System Setup & Training"
                            icon="ph-wrench"
                            color="cyan"
                            items={[
                                "Hardware delivery, installation, and testing",
                                "Development of localized IEC materials",
                                "Training of Trainers (ToT) for BHWs & LGU staff"
                            ]}
                            position="right"
                        />
                        <TimelineItem
                            month="MONTHS 4-6"
                            phase="Phased Rollout & Go-Live"
                            icon="ph-rocket-launch"
                            color="teal"
                            items={[
                                "Pilot launch in select barangays for feedback",
                                "Full-scale rollout to all beneficiaries",
                                "Launch of IEC campaign & technical support channels"
                            ]}
                            position="left"
                        />
                        <TimelineItem
                            month="ONGOING"
                            phase="Operations & Evaluation"
                            icon="ph-chart-line"
                            color="emerald"
                            items={[
                                "Continuous technical support & system maintenance",
                                "Generation of health data dashboards for LGU",
                                "Quarterly JTWG meetings & annual impact reports"
                            ]}
                            position="right"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const TimelineItem: React.FC<{
    month: string,
    phase: string,
    icon: string,
    color: string,
    items: string[],
    position: 'left' | 'right'
}> = ({ month, phase, icon, color, items, position }) => {

    // Desktop: Alternating Layout
    // Mobile: All align right of the line

    return (
        <div className={`relative md:flex items-center justify-between group ${position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

            {/* Spacer for desktop alignment - only visible on desktop */}
            <div className="hidden md:block w-5/12"></div>

            {/* Center Node / Mobile Left Node */}
            <div className={`
                absolute left-6 md:left-1/2 -translate-x-1/2 
                w-12 h-12 rounded-full border-4 border-slate-900 z-20
                flex items-center justify-center
                transition-transform duration-500 group-hover:scale-110
                bg-${color}-500 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)]
                top-0 md:top-auto
            `}>
                <i className={`${icon} text-xl`}></i>
            </div>

            {/* Content Card */}
            <div className={`
                w-full pl-16 pr-0 md:w-5/12 md:p-0 
                ${position === 'left' ? 'md:pr-12' : 'md:pl-12'}
            `}>
                <div className={`
                    glass p-5 md:p-8 rounded-3xl border border-slate-700/50 
                    relative overflow-hidden group-hover:border-${color}-500/50 transition-all duration-300
                    shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]
                    ${position === 'left' ? 'md:text-right' : 'md:text-left'} text-left
                `}>
                    {/* Background Icon Watermark */}
                    <div className={`absolute -bottom-6 ${position === 'left' ? 'md:left-0 -left-6' : '-right-6'} p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500`}>
                        <i className={`${icon} text-9xl text-white`}></i>
                    </div>

                    <div className="relative z-10">
                        <div className={`inline-block px-3 py-1 rounded-full bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 text-xs font-bold uppercase tracking-widest mb-4`}>
                            {month}
                        </div>
                        <h3 className={`text-2xl font-bold text-white mb-6 group-hover:text-${color}-400 transition-colors`}>
                            {phase}
                        </h3>
                        <ul className={`space-y-4 flex flex-col ${position === 'left' ? 'md:items-end' : 'md:items-start'}`}>
                            {items.map((item, i) => (
                                <li key={i} className={`flex items-start gap-3 text-slate-400 text-sm ${position === 'left' ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                    <div className={`mt-0.5 w-5 h-5 rounded-full bg-${color}-500/20 flex items-center justify-center shrink-0`}>
                                        <i className={`ph-check text-xs text-${color}-400`}></i>
                                    </div>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapSection;