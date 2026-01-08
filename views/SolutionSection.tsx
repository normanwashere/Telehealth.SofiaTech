import React, { useState } from 'react';
import Modal from '../components/Modal';

const SolutionSection: React.FC = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [zoomImage, setZoomImage] = useState<string | null>(null);

    return (
        <section className="animate-fade-in py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-screen-2xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        The Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Integration</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Digital health fails when it's fragmented. We deliver the only
                        <span className="font-semibold text-white"> Unified Health Infrastructure </span>
                        that combines software, hardware, and human capability.
                    </p>
                </div>

                {/* The 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {/* Pillar 1 */}
                    <div
                        className="glass glass-hover p-8 rounded-3xl border border-emerald-500/20 relative group cursor-pointer overflow-hidden flex flex-col animate-slide-up"
                        style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}
                        onClick={() => setActiveModal('pillar1')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                                <i className="ph-app-window text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The Ecosystem</h3>
                            <p className="text-sm text-emerald-400 font-bold uppercase tracking-wider mb-4">Software & Telehealth</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                Instant access to the nation's largest network of doctors and digital health tools via mWell and KonsultaMD.
                            </p>
                            <div className="flex items-center gap-3 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                                <img src="https://sofia.static.domains/Health/mwell%20logo.png" alt="mWell" className="h-6 object-contain" />
                                <div className="h-4 w-px bg-slate-600"></div>
                                <img src="https://konsulta.md/assets/img/logo.svg" alt="KonsultaMD" className="h-5 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2 */}
                    <div
                        className="glass glass-hover p-8 rounded-3xl border border-orange-500/20 relative group cursor-pointer overflow-hidden flex flex-col animate-slide-up"
                        style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}
                        onClick={() => setActiveModal('pillar2')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400">
                                <i className="ph-wifi-high text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The Lifeline</h3>
                            <p className="text-sm text-orange-400 font-bold uppercase tracking-wider mb-4">Universal Connectivity</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                Guaranteed internet access for every barangay using a hybrid of Fiber, LTE, and LEO Satellite technology.
                            </p>
                            <div className="flex items-center gap-3 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                                <img src="https://pldthome.com/images/default-source/navbar-update-072023/pldt-logo-size-optimized.png" alt="PLDT" className="h-4 bg-white p-0.5 rounded-sm object-contain" />
                                <img src="https://smart.com.ph/smartrevamp/assets_HeaderRevamp/img/smart_logo_white.png" alt="Smart" className="h-4 object-contain" />
                                <img src="https://sofia.static.domains/Health/Starlink.png" alt="Starlink" className="h-6 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3 */}
                    <div
                        className="glass glass-hover p-8 rounded-3xl border border-sky-500/20 relative group cursor-pointer overflow-hidden flex flex-col animate-slide-up"
                        style={{ animationDelay: '300ms', opacity: 0, animationFillMode: 'forwards' }}
                        onClick={() => setActiveModal('pillar3')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 flex items-center justify-center mb-6 text-sky-400">
                                <i className="ph-handshake text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The Execution</h3>
                            <p className="text-sm text-sky-400 font-bold uppercase tracking-wider mb-4">End-to-End Implementation</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                We don't just hand over software. We train, deploy, and manage the entire operation on the ground.
                            </p>
                            <div className="flex items-center gap-3 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                                <img src="https://sofia.static.domains/Health/SofiaLogoWhite.png" alt="Sofia" className="h-8 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* The "1+1+1 > 3" Multiplier Effect Section */}
                <div className="mb-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-orange-500/20 blur-[100px] -z-10"></div>

                    <div className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6">
                                    The Multiplier Effect: <br />
                                    <span className="text-emerald-400">Why 1 + 1 + 1 &gt; 3</span>
                                </h3>
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    Most digital health projects fail because they treat these pillars as separate procurements.
                                    Software is useless without signal. Connection is wasted without training.
                                </p>
                                <p className="text-slate-300 leading-relaxed font-semibold">
                                    By unifying them, we solve the friction points that kill adoption:
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 bg-slate-900/50 p-6 rounded-2xl border border-emerald-500/30">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                        <i className="ph-plugs text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">Platform + Connectivity</p>
                                        <p className="text-sm text-slate-400">Software that actually works in remote GIDA sites.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 bg-slate-900/50 p-6 rounded-2xl border border-sky-500/30">
                                    <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                                        <i className="ph-users-three text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">Platform + Execution</p>
                                        <p className="text-sm text-slate-400">Turning complex tech into daily habits for Health Workers.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 bg-slate-900/50 p-6 rounded-2xl border border-orange-500/30">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                                        <i className="ph-lightning text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">Connectivity + Execution</p>
                                        <p className="text-sm text-slate-400">Guaranteed 24/7 uptime through managed support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="flex items-center justify-center mb-12">
                        <div className="px-6 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm uppercase tracking-widest font-semibold">
                            See It In Action
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-stretch">
                        <div className="fb-video-container glass shadow-2xl rounded-2xl overflow-hidden border border-slate-700/50 group h-full">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                            <iframe
                                src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmwellph%2Fvideos%2F772718078570405%2F&show_text=false&width=560&t=0"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title="Launch Video"
                                className="relative z-0 h-full w-full"
                            ></iframe>
                        </div>

                        <div className="glass p-8 rounded-2xl shadow-xl border border-slate-700/50 h-full flex flex-col">
                            <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                                <i className="ph-images text-emerald-400"></i> Deployment Gallery
                            </h4>
                            <div className="grid grid-cols-2 gap-4 flex-grow content-start">
                                {[
                                    "https://sofia.static.domains/Health/images/signing.jpg",
                                    "https://sofia.static.domains/Health/images/videoconsult3.jpg",
                                    "https://sofia.static.domains/Health/images/videoconsult2.jpg",
                                    "https://sofia.static.domains/Health/images/videoconsult.jpg"
                                ].map((src, idx) => (
                                    <div key={idx} className="relative group overflow-hidden rounded-xl cursor-pointer shadow-lg aspect-video" onClick={() => setZoomImage(src)}>
                                        <img
                                            src={src}
                                            alt={`Gallery ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                                        />
                                        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/30 transition-colors duration-300 flex items-center justify-center">
                                            <i className="ph-magnifying-glass-plus text-white opacity-0 group-hover:opacity-100 text-3xl transition-opacity duration-300 drop-shadow-xl transform translate-y-4 group-hover:translate-y-0"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* News Headlines Section */}
                <div className="mt-24">
                    <div className="flex items-center justify-center mb-10">
                        <h4 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                            <i className="ph-newspaper text-emerald-400"></i> Making Headlines
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a
                            href="https://newsinfo.inquirer.net/1974407/makatis-free-online-medical-consultation-kicks-off"
                            target="_blank"
                            rel="noreferrer"
                            className="glass p-8 rounded-2xl hover:bg-slate-800/60 transition-all group border border-slate-700/50 hover:border-emerald-500/30 flex flex-col animate-fade-in hover:-translate-y-2 hover:shadow-lg"
                            style={{ animationDelay: '0ms', animationFillMode: 'both' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-1 rounded">Inquirer.net</span>
                                <i className="ph-arrow-up-right text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <h5 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                                Makati's free online medical consultation kicks off
                            </h5>
                            <p className="text-sm text-slate-400 line-clamp-3 mt-auto">
                                Expanding digital health access to residents through innovative partnerships and free teleconsultation services.
                            </p>
                        </a>

                        <a
                            href="https://www.makati.gov.ph/content/news/86286"
                            target="_blank"
                            rel="noreferrer"
                            className="glass p-8 rounded-2xl hover:bg-slate-800/60 transition-all group border border-slate-700/50 hover:border-emerald-500/30 flex flex-col animate-fade-in hover:-translate-y-2 hover:shadow-lg"
                            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-1 rounded">Makati.gov.ph</span>
                                <i className="ph-arrow-up-right text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <h5 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                                Makati City Official News
                            </h5>
                            <p className="text-sm text-slate-400 line-clamp-3 mt-auto">
                                Official updates on the city's comprehensive digital health program and benefits for constituents.
                            </p>
                        </a>

                        <a
                            href="https://mb.com.ph/2025/10/15/mpics-mwell-dict-partner-to-integrate-digital-health-into-egov-ph-app"
                            target="_blank"
                            rel="noreferrer"
                            className="glass p-8 rounded-2xl hover:bg-slate-800/60 transition-all group border border-slate-700/50 hover:border-emerald-500/30 flex flex-col animate-fade-in hover:-translate-y-2 hover:shadow-lg"
                            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-1 rounded">Manila Bulletin</span>
                                <i className="ph-arrow-up-right text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <h5 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                                mWell & DICT Partner for National Integration
                            </h5>
                            <p className="text-sm text-slate-400 line-clamp-3 mt-auto">
                                Strategic partnership to integrate digital health services into the national eGov PH app infrastructure.
                            </p>
                        </a>
                    </div>
                </div>

            </div>

            {/* Pillar 1 Modal: The Ecosystem */}
            <Modal isOpen={activeModal === 'pillar1'} onClose={() => setActiveModal(null)} title="The Ecosystem" colorClass="text-emerald-400" maxWidth="max-w-3xl">
                <div className="space-y-6 mt-2">
                    {/* Header Card */}
                    <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <i className="ph-squares-four text-4xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-xl mb-2">The Super-App Approach</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                We combine the nation's two largest health platforms, <strong>mWell</strong> and <strong>KonsultaMD</strong>, to give your constituents the widest possible network of doctors and wellness features in a single interface.
                            </p>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Clinical Care - UPDATED ICON */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-video-camera text-emerald-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Clinical Care</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                24/7 video consults with GPs, specialist referrals, and instant e-prescriptions sent to the patient's app.
                            </p>
                        </div>

                        {/* Preventive Wellness - UPDATED ICON */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-heart text-emerald-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Preventive Wellness</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Daily fitness trackers, nutrition guides, and mental health scores to encourage a healthy lifestyle.
                            </p>
                        </div>

                        {/* Integrated Records - UPDATED ICON */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-file-text text-emerald-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Integrated Records</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                A centralized, portable Electronic Medical Record (EMR) compliant with UHC standards.
                            </p>
                        </div>

                        {/* Marketplace - UPDATED ICON */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-shopping-cart text-emerald-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Marketplace</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                In-app purchasing of medicine and booking of lab tests with home service options.
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Pillar 2 Modal: Universal Connectivity */}
            <Modal isOpen={activeModal === 'pillar2'} onClose={() => setActiveModal(null)} title="Universal Connectivity" colorClass="text-orange-400" maxWidth="max-w-3xl">
                <div className="space-y-6 mt-2">
                    {/* Header Card - UPDATED ICON */}
                    <div className="bg-orange-950/40 p-6 rounded-2xl border border-orange-500/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                        <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                            <i className="ph-wifi-slash text-4xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-xl mb-2">No Signal? No Problem.</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                A digital health program is worthless if you can't connect. We deploy a <strong>Hybrid Network Strategy</strong> to ensure 100% uptime, regardless of geography.
                            </p>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* GIDA Solution */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-3 relative z-10">
                                <i className="ph-broadcast text-orange-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">GIDA Solution</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                                Deployment of <span className="text-white font-semibold">Starlink Satellite Kits</span> for remote barangays, bypassing terrestrial dead zones completely.
                            </p>
                            <div className="absolute right-0 bottom-0 p-2 opacity-5"><i className="ph-planet text-6xl text-orange-400"></i></div>
                        </div>

                        {/* Town Centers */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-buildings text-orange-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Town Centers</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                High-speed Fiber connection for Rural Health Units (RHUs) and Command Centers via PLDT Enterprise.
                            </p>
                        </div>

                        {/* Field Mobility */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-device-mobile text-orange-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Field Mobility</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                5G/LTE SIMs for Barangay Health Workers (BHWs) conducting house-to-house profiling in coverage areas.
                            </p>
                        </div>

                        {/* Prioritized Traffic */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-shield-check text-orange-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Prioritized Traffic</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Health app data is whitelisted/zero-rated to ensure access even with low load balance.
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Pillar 3 Modal: Execution & Support */}
            <Modal isOpen={activeModal === 'pillar3'} onClose={() => setActiveModal(null)} title="Execution & Support" colorClass="text-sky-400" maxWidth="max-w-3xl">
                <div className="space-y-6 mt-2">
                    {/* Header Card */}
                    <div className="bg-sky-950/40 p-6 rounded-2xl border border-sky-500/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                        <div className="w-20 h-20 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                            <i className="ph-handshake text-4xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-xl mb-2">Boots on the Ground</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Software doesn't implement itself. <strong>Sofia Technology</strong> acts as your managed service provider, handling the complexity so the LGU can focus on governance.
                            </p>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Training Academy */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-student text-sky-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Training Academy</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Comprehensive onboarding for doctors, BHWs, and admin staff to ensure digital literacy and system mastery.
                            </p>
                        </div>

                        {/* Deployment Logistics */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-truck text-sky-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Deployment Logistics</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                We handle the distribution, asset tagging, and setup of thousands of tablets and satellite kits.
                            </p>
                        </div>

                        {/* Technical Support */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-headset text-sky-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Technical Support</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Dedicated helpdesk for troubleshooting hardware or software issues in the field, ensuring maximum uptime.
                            </p>
                        </div>

                        {/* Data Analytics */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <i className="ph-chart-line-up text-sky-400 text-2xl"></i>
                                <h5 className="text-white font-bold text-base">Data Analytics</h5>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Regular reporting on utilization rates and disease surveillance to the Mayor's office to guide policy.
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Image Zoom Modal */}
            <Modal isOpen={!!zoomImage} onClose={() => setZoomImage(null)} isImageModal={true}>
                {zoomImage && (
                    <img src={zoomImage} alt="Zoomed" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-slate-700/50 backdrop-blur-sm" />
                )}
            </Modal>
        </section>
    );
};

export default SolutionSection;