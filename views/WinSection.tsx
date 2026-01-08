import React, { useState } from 'react';
import { SectionId } from '../types';

type ImpactLevel = 'beneficiary' | 'community' | 'lgu' | 'landscape' | 'nation';

interface WinSectionProps {
    onNavigate: (section: SectionId) => void;
}

const WinSection: React.FC<WinSectionProps> = ({ onNavigate }) => {
    const [activeLevel, setActiveLevel] = useState<ImpactLevel>('beneficiary');

    const content = {
        beneficiary: {
            title: "The Beneficiary",
            subtitle: "Dignity & Access",
            color: "emerald",
            icon: "ph-heart",
            stats: [
                { label: "Annual Savings", value: "₱13,200", sub: "per family on transport & fees" },
                { label: "Response Time", value: "< 15m", sub: "to connect with a doctor" },
                { label: "Access Cost", value: "₱0", sub: "zero balance billing" }
            ],
            description: "For the single mother, the senior citizen, or the farmer—healthcare becomes instant and dignified. No more waking up at 4 AM to queue. No more choosing between buying food or paying for a tricycle ride to the clinic.",
            win: "Healthcare is no longer a luxury, but a reliable utility.",
            comments: [
                { name: "Mommy Rose", handle: "@rose_cooks", text: "Grabe laking tipid nito! Dati uubusin mo 500 sa pamasahe lang papuntang bayan. Ngayon sa iPad na lang ni Kapitan. 🙌 #HealthForAll", time: "2h ago", likes: "1.2k" },
                { name: "Carlo J.", handle: "@cj_rides", text: "Legit yung 15 mins may kausap na doctor agad. Very helpful lalo na pag gabi at wala kaming masakyan. Salamat Mayor!", time: "4h ago", likes: "856" },
                { name: "Lola Nena", handle: "@nena_ph", text: "Hindi na masakit sa tuhod pumila. Dito na lang sa bahay nagpapa-checkup. God bless this program.", time: "1d ago", likes: "3.4k" }
            ]
        },
        community: {
            title: "The Community",
            subtitle: "Resilience & Productivity",
            color: "orange",
            icon: "ph-users-three",
            stats: [
                { label: "Productivity", value: "+12", sub: "work days saved per year" },
                { label: "Herd Immunity", value: "Real-time", sub: "outbreak monitoring" },
                { label: "Trust Index", value: "High", sub: "in local leadership" }
            ],
            description: "A healthy barangay is a productive barangay. By treating illnesses early at the household level, we prevent contagion and keep the workforce active. We transform healthcare from a 'sick-care' system into a preventative shield.",
            win: "A population that spends less time sick and more time thriving.",
            comments: [
                { name: "Brgy. Captain Mike", handle: "@kap_mike", text: "Ramdam yung difference. Dati pag may sakit isa, hawaan na sa sitio. Ngayon naagapan agad via telehealth. 👌", time: "5h ago", likes: "542" },
                { name: "Teacher Anna", handle: "@teach_anna", text: "Less absents sa klase ko! Healthy kids = better learning. Ang galing ng initiative na to.", time: "12h ago", likes: "1.1k" },
                { name: "Toda Pres.", handle: "@tricyle_king", text: "Kahit kami sa toda, nakakapag pa-checkup na hindi umaabsent sa byahe. Solid!", time: "1d ago", likes: "920" }
            ]
        },
        lgu: {
            title: "The City / Municipality",
            subtitle: "Legacy & Sustainability",
            color: "sky",
            icon: "ph-buildings",
            stats: [
                { label: "Revenue", value: "₱17M+", sub: "potential PhilHealth capitation" },
                { label: "Data Points", value: "100%", sub: "digitized health records" },
                { label: "Smart City", value: "Tier 1", sub: "infrastructure status" }
            ],
            description: "The LGU transitions from a mere service provider to a Smart City innovator. You gain a self-sustaining revenue stream via PhilHealth accreditation, a dashboard of real-time health insights, and a political legacy defined by modernization and care.",
            win: "Governance that is data-driven, revenue-positive, and politically rewarding.",
            comments: [
                { name: "PolSci Analyst", handle: "@gov_watch_ph", text: "This is what good governance looks like! 👏 Data-driven and futuristic. Sana all LGUs ganito mag-isip.", time: "1h ago", likes: "2.1k" },
                { name: "Proud Resident", handle: "@juan_delacruz", text: "Tier 1 Smart City na tayo! Nakaka-proud maging taga-dito. Tax ko may pinupuntahan. 🏙️", time: "3h ago", likes: "1.5k" },
                { name: "Tech Blogger", handle: "@tech_pinoy", text: "Revenue generating project via PhilHealth? Genius move. Sustainable healthcare funding right there.", time: "6h ago", likes: "3k" }
            ]
        },
        landscape: {
            title: "Healthcare Landscape",
            subtitle: "Decongestion & Efficiency",
            color: "blue",
            icon: "ph-activity",
            stats: [
                { label: "ER Decongestion", value: "40%", sub: "reduction in non-emergency cases" },
                { label: "Bed Capacity", value: "Optimized", sub: "for critical care only" },
                { label: "Doctor Ratio", value: "1:1", sub: "virtual access parity" }
            ],
            description: "We solve the overcrowding crisis. By handling primary care cases digitally (80% of volume), we free up physical hospitals to focus on what they do best: critical and trauma care. It is the ultimate realization of the referral network.",
            win: "The right care, at the right time, in the right place.",
            comments: [
                { name: "Dr. Reyes", handle: "@doc_reyes_md", text: "Finally! Sobrang luwag na sa District Hospital ER. We can focus on critical trauma cases now. Thank you for this system! 🩺", time: "4h ago", likes: "4.5k" },
                { name: "Nurse Joy", handle: "@rn_joy", text: "Hindi na kami exhausted sa duty. Efficient system! Yung mga simpleng ubo't sipon sa telehealth na lang.", time: "8h ago", likes: "2.2k" },
                { name: "Health Policy PH", handle: "@health_policy", text: "This is the referral network working as intended. Digital gatekeeping is key to decongestion.", time: "1d ago", likes: "1.8k" }
            ]
        },
        nation: {
            title: "The Nation",
            subtitle: "UHC Realization",
            color: "purple",
            icon: "ph-flag",
            stats: [
                { label: "UHC Goal", value: "Achieved", sub: "digital integration benchmark" },
                { label: "Equity", value: "100%", sub: "GIDA inclusion" },
                { label: "Blueprint", value: "Model", sub: "for national replication" }
            ],
            description: "This implementation serves as the 'Gold Standard' for the Philippines. It proves that Universal Health Care is possible even in the most challenging geographies through the intelligent application of technology.",
            win: "A blueprint for a digitally empowered Philippines.",
            comments: [
                { name: "DOH Insider", handle: "@health_gov_ph", text: "UHC is real! Hindi na lang pangarap. Congratulations to the pilot LGUs for setting the Gold Standard. 🇵🇭", time: "2h ago", likes: "5.6k" },
                { name: "Juan Patriot", handle: "@pinoy_pride", text: "Hope other provinces replicate this. Galing ng Pinoy! Connecting the islands via tech.", time: "5h ago", likes: "3.2k" },
                { name: "Global Dev", handle: "@un_sdg_goals", text: "A model for developing nations. Achieving universal access through digital transformation.", time: "1d ago", likes: "10k" }
            ]
        }
    };

    // Explicit color mapping to ensure Tailwind classes are generated
    const getColorClasses = (color: string) => {
        const map: Record<string, { text: string; bg: string; bgLight: string; border: string }> = {
            emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', bgLight: 'bg-emerald-500/20', border: 'border-emerald-500' },
            orange: { text: 'text-orange-400', bg: 'bg-orange-500', bgLight: 'bg-orange-500/20', border: 'border-orange-500' },
            sky: { text: 'text-sky-400', bg: 'bg-sky-500', bgLight: 'bg-sky-500/20', border: 'border-sky-500' },
            blue: { text: 'text-blue-400', bg: 'bg-blue-500', bgLight: 'bg-blue-500/20', border: 'border-blue-500' },
            purple: { text: 'text-purple-400', bg: 'bg-purple-500', bgLight: 'bg-purple-500/20', border: 'border-purple-500' },
        };
        return map[color] || map.emerald;
    };

    const activeContent = content[activeLevel];
    const activeColors = getColorClasses(activeContent.color);

    return (
        <section className="animate-fade-in py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex flex-col justify-center">
             {/* Hidden Safelist for Tailwind to detect dynamic classes */}
             <div className="hidden">
                <div className="text-emerald-400 bg-emerald-500 bg-emerald-500/20 border-emerald-500"></div>
                <div className="text-orange-400 bg-orange-500 bg-orange-500/20 border-orange-500"></div>
                <div className="text-sky-400 bg-sky-500 bg-sky-500/20 border-sky-500"></div>
                <div className="text-blue-400 bg-blue-500 bg-blue-500/20 border-blue-500"></div>
                <div className="text-purple-400 bg-purple-500 bg-purple-500/20 border-purple-500"></div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            </div>

            <div className="max-w-screen-2xl mx-auto relative z-10 w-full">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Total Victory</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        A systemic transformation that creates value at every level of society.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT: Navigation / Stack */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {Object.entries(content).map(([key, data]) => {
                            const isActive = activeLevel === key;
                            const colors = getColorClasses(data.color);
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveLevel(key as ImpactLevel)}
                                    className={`
                                        group relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-300 border
                                        ${isActive 
                                            ? `bg-slate-800 ${colors.border} shadow-[0_0_30px_rgba(0,0,0,0.3)] scale-[1.02]` 
                                            : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                                        }
                                    `}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${isActive ? colors.bg : 'bg-transparent'}`}></div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                {data.title}
                                            </h4>
                                            <p className={`text-xs uppercase tracking-wider font-semibold mt-1 transition-colors ${isActive ? colors.text : 'text-slate-600'}`}>
                                                {data.subtitle}
                                            </p>
                                        </div>
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                            ${isActive ? `${colors.bgLight} ${colors.text}` : 'bg-slate-800 text-slate-600 group-hover:bg-slate-700 group-hover:text-slate-400'}
                                        `}>
                                            <i className={`ph ${data.icon} text-xl`}></i>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT: Active Content Display */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="glass-strong p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden min-h-[500px] flex flex-col">
                            
                            {/* Animated Background Gradient for Active Card */}
                            <div className={`absolute -top-24 -right-24 w-96 h-96 ${activeColors.bgLight} rounded-full blur-[80px] transition-colors duration-500`}></div>

                            {/* Key Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 relative z-10">
                                {activeContent.stats.map((stat, idx) => (
                                    <div key={idx} className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors">
                                        <p className={`text-3xl md:text-4xl font-black ${activeColors.text} mb-1`}>{stat.value}</p>
                                        <p className="text-white font-bold text-sm">{stat.label}</p>
                                        <p className="text-slate-500 text-xs mt-1">{stat.sub}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Main Description */}
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <i className={`ph ${activeContent.icon} ${activeColors.text}`}></i>
                                    The Impact
                                </h3>
                                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                    {activeContent.description}
                                </p>
                            </div>

                            {/* The Bottom Line "Win" */}
                            <div className={`relative z-10 mt-auto ${activeColors.bgLight} border ${activeColors.border} border-opacity-20 p-6 rounded-2xl`}>
                                <p className={`text-xs font-bold ${activeColors.text} uppercase tracking-widest mb-2`}>
                                    The Bottom Line
                                </p>
                                <p className="text-xl md:text-2xl font-bold text-white italic">
                                    "{activeContent.win}"
                                </p>
                            </div>
                        </div>

                         {/* Social Pulse Section */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {activeContent.comments.map((comment, i) => (
                                <div 
                                    key={i} 
                                    className="animate-fade-in h-full relative hover:z-50"
                                    style={{animationDelay: `${i * 150}ms`, animationFillMode: 'both'}}
                                >
                                    <div className="glass p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full hover:scale-[2] hover:bg-slate-950/[0.98] hover:backdrop-blur-3xl hover:border-emerald-500/50 transition-all duration-500 shadow-sm hover:shadow-[0_0_80px_rgba(0,0,0,0.9)] cursor-default origin-center">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-8 h-8 rounded-full ${activeColors.bgLight} flex items-center justify-center ${activeColors.text}`}>
                                                <i className="ph ph-user-circle text-xl"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white leading-none">{comment.name}</p>
                                                <p className="text-[10px] text-slate-500 leading-none mt-1">{comment.handle} • {comment.time}</p>
                                            </div>
                                            <i className="ph ph-twitter-logo text-slate-600 text-sm ml-auto"></i>
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed mb-3 flex-grow">
                                            {comment.text}
                                        </p>
                                        <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold">
                                            <span className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer group/action">
                                                <i className="ph ph-heart-fill group-hover/action:scale-125 transition-transform"></i> {comment.likes}
                                            </span>
                                            <span className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer group/action">
                                                <i className="ph ph-chat-circle group-hover/action:scale-125 transition-transform"></i> Reply
                                            </span>
                                            <span className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer group/action">
                                                <i className="ph ph-share-fat group-hover/action:scale-125 transition-transform"></i> Share
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Final CTA - UPDATED */}
                <div className="mt-24 text-center">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 mb-8 animate-pulse-glow">
                        <div className="bg-slate-900 rounded-full px-8 py-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 font-bold text-lg">
                                Ready to execute?
                            </span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                        Turn this vision <br/> into your legacy.
                    </h2>
                    <button 
                        onClick={() => onNavigate('proposal')}
                        className="bg-white text-slate-900 hover:bg-emerald-50 text-lg font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
                    >
                        Build Your Proposal <i className="ph-calculator text-emerald-600"></i>
                    </button>
                    <p className="mt-6 text-slate-500 text-sm">
                        Sofia Technology • mWell • KonsultaMD • PLDT/Smart
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WinSection;