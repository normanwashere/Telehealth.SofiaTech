import React, { useState } from 'react';
import Modal from '../components/Modal';

const GapSection: React.FC = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const challenges = [
        {
            id: 'gida',
            title: "The Last Mile",
            subtitle: "Reaching GIDA",
            description: "For constituents in geographically isolated areas, healthcare isn't just distant—it's a dangerous journey.",
            image: "https://sofia.static.domains/Health/images/GIda.png",
            icon: "ph-mountains",
            color: "cyan"
        },
        {
            id: 'vulnerable',
            title: "The Silent Wait",
            subtitle: "Seniors & PWDs",
            description: "Our most vulnerable citizens often suffer in silence, unable to overcome physical barriers to care.",
            image: "https://sofia.static.domains/Health/images/Senior.png",
            icon: "ph-person-simple-walk",
            color: "red"
        },
        {
            id: 'overwhelmed',
            title: "The Frontline",
            subtitle: "Overwhelmed & Burned Out",
            description: "Impossible patient ratios are compromising the quality of care for everyone.",
            image: "https://sofia.static.domains/Health/images/facility.png",
            icon: "ph-scales",
            color: "blue"
        },
        {
            id: 'waiting',
            title: "The True Cost",
            subtitle: "Lost Wages & Time",
            description: "A full day of lost wages and endless queues is a tax on the poor.",
            image: "https://sofia.static.domains/Health/images/patient.png",
            icon: "ph-timer",
            color: "amber"
        }
    ];

    return (
        <section className="animate-fade-in py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-screen-2xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        The Healthcare Challenge, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">The Human Cost</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Behind the statistics are real people. This is our opportunity to address their needs.
                    </p>
                </div>

                {/* Vertical stack on desktop, horizontal carousel on mobile */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-6 lg:gap-8 md:overflow-visible no-scrollbar">
                    {challenges.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[85vw] md:min-w-0 snap-center group relative rounded-3xl overflow-hidden cursor-pointer h-96 transition-all duration-500 hover:scale-[1.02] shadow-2xl border border-white/5"
                            onClick={() => setActiveModal(item.id)}
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Overlay/Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>
                            <div className={`absolute inset-0 bg-${item.color}-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className={`w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 text-${item.color}-400 group-hover:bg-${item.color}-500 group-hover:text-white group-hover:border-${item.color}-400 transition-all duration-300 shadow-lg`}>
                                    <i className={`${item.icon} text-3xl`}></i>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                                <p className={`text-sm sm:text-lg font-bold text-${item.color}-400 mb-3 uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300 delay-75`}>{item.subtitle}</p>
                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:text-white transition-colors duration-300">
                                    {item.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                    Read More <i className="ph-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={activeModal === 'gida'}
                onClose={() => setActiveModal(null)}
                title="The Last Mile: Reaching GIDA"
                colorClass="text-cyan-400"
                maxWidth="max-w-7xl"
                backgroundImage="https://sofia.static.domains/Health/images/GIda.png"
            >
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-6">
                        <div className="bg-transparent p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-cyan-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-path text-cyan-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase text-sm tracking-widest mb-3">The Logistical Nightmare</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        In GIDA sites, healthcare is a logistical nightmare. A simple consultation often requires a 4-hour journey, crossing rivers, and spending up to ₱500 on transport—a massive cost for a 10-minute checkup.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-transparent p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-cyan-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-activity text-cyan-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase text-sm tracking-widest mb-3">The Fatal Delay</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        Emergency response is effectively non-existent. When complications arise—whether a difficult childbirth or a sudden stroke—the delay in reaching professional help often turns treatable conditions into fatalities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-8 rounded-2xl bg-transparent border border-white/10 h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">Impact on Consultation Access</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> No access to doctors for early symptom detection
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Lack of consistent prenatal monitoring consultations
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Patients delay medical advice until conditions are critical
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Zero access to specialist opinions without travel
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === 'vulnerable'}
                onClose={() => setActiveModal(null)}
                title="The Silent Wait: Seniors & PWDs"
                colorClass="text-red-400"
                maxWidth="max-w-7xl"
                backgroundImage="https://sofia.static.domains/Health/images/Senior.png"
            >
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-6">
                        <div className="bg-transparent p-8 rounded-2xl border border-red-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-red-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-person-simple-walk text-red-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-red-400 font-bold uppercase text-sm tracking-widest mb-3">The Physical Barrier</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        Imagine having arthritis and needing a refill, but the health center is a painful tricycle ride away. Many seniors and PWDs choose to suffer in silence rather than feel like a "burden" to their working family members.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-transparent p-8 rounded-2xl border border-red-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-red-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-heart-break text-red-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-red-400 font-bold uppercase text-sm tracking-widest mb-3">The Silent Decline</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        Because follow-ups are physically difficult, chronic conditions like hypertension and diabetes go unmonitored. This lack of maintenance leads to preventable decline.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-8 rounded-2xl bg-transparent border border-white/10 h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">Impact on Consultation Access</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Caregivers miss work for simple prescription updates
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Conditions worsen because physical follow-ups are too hard
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Medication non-adherence due to lack of doctor supervision
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Seniors endure pain to avoid the burden of travel for check-ups
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === 'overwhelmed'}
                onClose={() => setActiveModal(null)}
                title="The Frontline: Overwhelmed"
                colorClass="text-blue-400"
                maxWidth="max-w-7xl"
                backgroundImage="https://sofia.static.domains/Health/images/facility.png"
            >
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-6">
                        <div className="bg-transparent p-8 rounded-2xl border border-blue-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-blue-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-users-three text-blue-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-blue-400 font-bold uppercase text-sm tracking-widest mb-3">The Impossible Ratio</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        With patient ratios hitting 1:5,000, our health workers are drowning. They spend hours on minor cases and paperwork, leaving them burned out and unable to focus on critical care.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-transparent p-8 rounded-2xl border border-blue-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-blue-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-warning-octagon text-blue-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-blue-400 font-bold uppercase text-sm tracking-widest mb-3">The Quality Gap</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        The sheer volume of patients forces an "assembly line" approach to medicine. Doctors have less than 3 minutes per patient, increasing the risk of misdiagnosis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-8 rounded-2xl bg-transparent border border-white/10 h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">Impact on Consultation Quality</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> RHUs clogged by minor cases suitable for tele-triage
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Rushed &lt;3 minute consultations due to volume
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> No continuity of care without digital patient records
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Specialists remain inaccessible at primary care level
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === 'waiting'}
                onClose={() => setActiveModal(null)}
                title="The True Cost of Waiting"
                colorClass="text-amber-400"
                maxWidth="max-w-7xl"
                backgroundImage="https://sofia.static.domains/Health/images/patient.png"
            >
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-6">
                        <div className="bg-transparent p-8 rounded-2xl border border-amber-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-amber-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-money text-amber-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-amber-400 font-bold uppercase text-sm tracking-widest mb-3">The Economic Tax</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        For a daily wage earner, a hospital visit is a tax. It means waking up at 4 AM, queuing for hours, and losing a full day's pay. This economic barrier forces them to delay treatment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-transparent p-8 rounded-2xl border border-amber-500/30 backdrop-blur-md">
                            <div className="flex items-start gap-6">
                                <div className="bg-amber-500/20 p-4 rounded-xl shrink-0">
                                    <i className="ph-trend-down text-amber-400 text-3xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-amber-400 font-bold uppercase text-sm tracking-widest mb-3">The Cycle of Poverty</h4>
                                    <p className="text-slate-200 leading-relaxed text-base">
                                        This "waiting tax" creates a vicious cycle. Families resort to self-medication or faith healers to avoid the cost of lost work, only seeking professional help when the condition is critical.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-8 rounded-2xl bg-transparent border border-white/10 h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">Impact on Consultation Access</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> A 10-minute consult costs a full day's wage
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Transport fares exceed the value of free medicine
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Reliance on unproven self-medication to avoid clinic visits
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 text-base">
                                    <i className="ph-x-circle text-red-400 text-xl"></i> Late-stage diagnosis increases long-term treatment costs
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default GapSection;