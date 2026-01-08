import React, { useState } from 'react';
import Modal from '../components/Modal';

type RolloutType = 'provincial' | 'municipal';
type TemplateType = 'province' | 'city';

const JustificationSection: React.FC = () => {
    const [activeRollout, setActiveRollout] = useState<RolloutType>('provincial');
    const [showResolutionModal, setShowResolutionModal] = useState(false);
    const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null); // New state for info modals
    const [activeTemplate, setActiveTemplate] = useState<TemplateType>('province');

    return (
        <section className="animate-fade-in py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-screen-2xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Funding Strategy & Compliance</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        A diversified funding mix ensuring stability, compliance, and long-term sustainability.
                    </p>
                </div>

                {/* Refined Tab Selector */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-700/50 inline-flex relative">
                        <button 
                            onClick={() => setActiveRollout('provincial')}
                            className={`relative px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 z-10 ${
                                activeRollout === 'provincial' 
                                ? 'text-white shadow-lg' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            Provincial Rollout
                        </button>
                        <button 
                            onClick={() => setActiveRollout('municipal')}
                            className={`relative px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 z-10 ${
                                activeRollout === 'municipal' 
                                ? 'text-white shadow-lg' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            City/Muni Rollout
                        </button>
                        
                        {/* Sliding Background */}
                        <div 
                            className={`absolute top-1 bottom-1 rounded-lg bg-emerald-600 transition-all duration-300 shadow-emerald-500/20 shadow-lg`}
                            style={{
                                left: activeRollout === 'provincial' ? '4px' : '50%',
                                width: 'calc(50% - 4px)',
                            }}
                        ></div>
                    </div>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    
                    {/* CARD 1: PRIMARY SOURCE (Double Width) */}
                    <div 
                        className="xl:col-span-2 glass glass-hover p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden group cursor-pointer transition-all duration-300"
                        onClick={() => setActiveInfoModal('primary')}
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="ph-bank text-9xl text-emerald-400"></i>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                                    Primary Source
                                </span>
                                <span className="text-xs text-slate-500 font-mono">
                                    RA 7160 Sec. 287
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">
                                {activeRollout === 'provincial' ? '20% Provincial Development Fund' : '20% Development Fund'}
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-6 max-w-lg">
                                {activeRollout === 'provincial' 
                                    ? "Appropriate under the province's development projects (health/social development). DBM guidance mandates 20% of NTA for development projects."
                                    : "Appropriate in the Annual Budget/AIP as a development project. DBM guidance is explicit on the 20% DF requirement and linkage to Sec. 287."}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-emerald-400 font-bold group-hover:text-emerald-300">
                                <i className="ph-info"></i> Click to view legal basis
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: SECONDARY SOURCE */}
                    <div 
                        className="glass p-8 rounded-3xl border border-blue-500/30 relative group hover:bg-slate-800/50 transition-all cursor-pointer"
                        onClick={() => setActiveInfoModal('secondary')}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <i className="ph-users-three text-xl"></i>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-700 px-2 py-1 rounded">
                                {activeRollout === 'provincial' ? 'Welfare Reprogramming' : 'RA 9994'}
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                            {activeRollout === 'provincial' ? 'Pension Reallocation' : 'Social Budgets'}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {activeRollout === 'provincial'
                                ? "Reprogram local social pension funds to health access, enhancing senior welfare."
                                : "Position as senior/indigent health access, consistent with national policy direction."}
                        </p>
                    </div>

                    {/* CARD 3: COUNTERPART / PARTNERS */}
                    <div 
                        className="glass p-8 rounded-3xl border border-purple-500/30 relative group hover:bg-slate-800/50 transition-all cursor-pointer"
                        onClick={() => setActiveInfoModal('shared')}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <i className={activeRollout === 'provincial' ? "ph-handshake text-xl" : "ph-buildings text-xl"}></i>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-700 px-2 py-1 rounded">
                                Shared Cost
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                            {activeRollout === 'provincial' ? 'LGU Counterpart' : 'Private/CSR'}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {activeRollout === 'provincial'
                                ? "Lock in Municipal co-funding via SP Resolution to ensure shared ownership and reduce provincial cash burn."
                                : "Leverage Telco partnerships (Smart/PLDT) for connectivity sponsorship and device subsidies."}
                        </p>
                    </div>

                    {/* CARD 4: AUGMENTATION (Double Width) */}
                    <div 
                        className="xl:col-span-2 glass glass-hover p-8 rounded-3xl border border-orange-500/30 relative group overflow-hidden cursor-pointer"
                        onClick={() => setActiveInfoModal('augmentation')}
                    >
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors"></div>
                        <div className="relative z-10">
                             <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/20">
                                    Layer 2 Augmentation
                                </span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <i className="ph-first-aid text-orange-400"></i> DSWD AICS
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Subsidize medical-related needs for indigent beneficiaries (telehealth access subsidy).
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <i className="ph-projector-screen text-orange-400"></i> KALAHI-CIDSS
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Barangay-level "digital health infra" proposals through CDD grants.
                                    </p>
                                </div>
                            </div>
                             <div className="mt-4 flex items-center gap-2 text-xs text-orange-400 font-bold group-hover:text-orange-300">
                                <i className="ph-info"></i> View National Agency details
                            </div>
                        </div>
                    </div>

                    {/* CARD 5: SUSTAINABILITY (Revenue) */}
                    <div 
                        className="glass-strong p-8 rounded-3xl border border-emerald-400/50 bg-gradient-to-br from-emerald-900/20 to-slate-900 relative group overflow-hidden cursor-pointer hover:border-emerald-400 transition-all"
                        onClick={() => setActiveInfoModal('sustainability')}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <i className="ph-trend-up text-6xl text-emerald-400"></i>
                        </div>
                        <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-1">Revenue Engine</h4>
                        <h3 className="text-xl font-bold text-white mb-4">PhilHealth Konsulta</h3>
                        
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-3xl font-black text-white">₱1,700</span>
                            <span className="text-xs text-slate-400 uppercase font-bold">/ Capita / Year</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            The path to revenue-positive operations. Claim capitation for every registered member.
                        </p>
                        <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full w-3/4"></div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 font-bold group-hover:text-emerald-300">
                                <i className="ph-calculator"></i> View ROI Projection
                        </div>
                    </div>

                    {/* CARD 6: LEGAL TOOLKIT (Action) */}
                    <div 
                        className="glass-strong p-8 rounded-3xl border border-slate-600 hover:border-emerald-400/50 cursor-pointer transition-all duration-300 group flex flex-col justify-center text-center relative overflow-hidden"
                        onClick={() => {
                            setActiveTemplate(activeRollout === 'provincial' ? 'province' : 'city');
                            setShowResolutionModal(true);
                        }}
                    >
                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 mx-auto bg-slate-700 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:bg-emerald-500">
                                <i className="ph-file-text text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Resolution Templates</h3>
                            <p className="text-xs text-slate-400 mb-4">View ready-to-use legal documents</p>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider group-hover:underline">Open Library <i className="ph-arrow-right"></i></span>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- INFO MODALS --- */}
            
            {/* 1. Primary Funding Modal */}
            <Modal isOpen={activeInfoModal === 'primary'} onClose={() => setActiveInfoModal(null)} title="20% Development Fund Details" colorClass="text-emerald-400">
                <div className="space-y-6 mt-4">
                    <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20">
                        <h4 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">Legal Basis</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            <strong>Section 287 of RA 7160 (Local Government Code):</strong> Mandates that each LGU shall appropriate in its annual budget no less than 20% of its annual internal revenue allotment for development projects.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-2">Eligible Expenditures</h4>
                        <p className="text-slate-400 text-sm mb-4">According to DBM-DILG Joint Memorandum Circulars, the 20% DF can be utilized for:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-300">
                                <i className="ph-check-circle text-emerald-500 mt-0.5"></i>
                                <span><strong>Social Development:</strong> Construction or rehabilitation of health centers, rural health units, and purchase of medical equipment.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-300">
                                <i className="ph-check-circle text-emerald-500 mt-0.5"></i>
                                <span><strong>Capital Outlay:</strong> Procurement of IT equipment (tablets, kiosks) and connectivity infrastructure (Starlink kits) supporting health digitization.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>

            {/* 2. Secondary/Welfare Modal */}
            <Modal isOpen={activeInfoModal === 'secondary'} onClose={() => setActiveInfoModal(null)} title="Social Welfare & GAD Funds" colorClass="text-blue-400">
                 <div className="space-y-6 mt-4">
                    <div className="bg-blue-950/30 p-4 rounded-xl border border-blue-500/20">
                        <h4 className="text-blue-400 font-bold text-sm mb-2 uppercase tracking-wide">RA 9994 (Senior Citizens Act)</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Mandates that 1% of the LGU budget be allocated for programs benefitting Senior Citizens. Since the target demographic of this telehealth program is primarily seniors (for maintenance medicine & monitoring), this is a direct and compliant use of funds.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-2">Alternative Sources</h4>
                         <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-300">
                                <i className="ph-check-circle text-blue-500 mt-0.5"></i>
                                <div>
                                    <strong className="block text-white">GAD Fund (5%)</strong>
                                    <span className="text-slate-400">Maternal health, women's wellness checks, and family planning teleconsultations are eligible GAD expenditures.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-300">
                                <i className="ph-check-circle text-blue-500 mt-0.5"></i>
                                <div>
                                    <strong className="block text-white">Social Pension Reprogramming</strong>
                                    <span className="text-slate-400">Unutilized social pension funds or savings can be reprogrammed to provide "in-kind" health benefits (telehealth subscriptions) which offer higher value than small cash dole-outs.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>

            {/* 3. Shared Cost Modal */}
            <Modal isOpen={activeInfoModal === 'shared'} onClose={() => setActiveInfoModal(null)} title="Shared Cost Strategies" colorClass="text-purple-400">
                 <div className="space-y-6 mt-4">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Reduces the financial burden on the main funder by distributing costs across stakeholders who also benefit from the program's success.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-purple-950/20 p-4 rounded-xl border border-purple-500/20">
                            <h4 className="text-purple-400 font-bold text-sm mb-2 flex items-center gap-2"><i className="ph-buildings"></i> LGU Counterparting (Equity Fund)</h4>
                            <p className="text-slate-400 text-sm mb-2">
                                For Provincial rollouts, requires component Cities/Municipalities to shoulder 30-50% of the subscription cost for their own constituents.
                            </p>
                            <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                                <li>Increases local ownership and utilization monitoring.</li>
                                <li>Formalized via Sangguniang Panlalawigan Resolution.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><i className="ph-handshake"></i> Private Sector / CSR</h4>
                            <p className="text-slate-400 text-sm">
                                Partnerships with Telcos (Smart/Globe) to subsidize the <strong>Connectivity Layer</strong> (SIM cards, data plans, or satellite kits) as part of their Corporate Social Responsibility (CSR) or expansion targets.
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* 4. Augmentation Modal */}
            <Modal isOpen={activeInfoModal === 'augmentation'} onClose={() => setActiveInfoModal(null)} title="National Agency Augmentation" colorClass="text-orange-400">
                <div className="space-y-6 mt-4">
                    <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/20">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-orange-400 font-bold text-sm uppercase">DSWD AICS</h4>
                            <span className="text-[10px] bg-orange-900/50 text-orange-200 px-2 py-0.5 rounded border border-orange-500/30">Assistance to Individuals in Crisis</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            The telehealth subscription can be classified as a form of <strong>Medical Assistance</strong>. Indigent beneficiaries can apply for AICS to cover the cost of the subscription or the "medicine" prescribed via the platform.
                        </p>
                    </div>

                    <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/20">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-orange-400 font-bold text-sm uppercase">KALAHI-CIDSS</h4>
                            <span className="text-[10px] bg-orange-900/50 text-orange-200 px-2 py-0.5 rounded border border-orange-500/30">Community Driven Development</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Barangays can propose "Digital Health Stations" as their community sub-project. KALAHI grants can fund the <strong>hardware (Tablets, Starlink, Solar Kits)</strong> while the LGU funds the operations.
                        </p>
                    </div>
                </div>
            </Modal>

             {/* 5. Sustainability Modal */}
             <Modal isOpen={activeInfoModal === 'sustainability'} onClose={() => setActiveInfoModal(null)} title="PhilHealth Konsulta Sustainability" colorClass="text-emerald-400">
                <div className="space-y-6 mt-4">
                    <div className="flex items-center justify-center py-6 bg-gradient-to-br from-emerald-900/40 to-slate-900 rounded-2xl border border-emerald-500/20">
                        <div className="text-center">
                            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Revenue Potential</p>
                            <h3 className="text-5xl font-black text-white">₱17M<span className="text-2xl text-slate-500 font-normal">+</span></h3>
                            <p className="text-emerald-400 text-sm font-bold mt-2">Per 10,000 Beneficiaries / Year</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm">How it works:</h4>
                        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-3 marker:text-emerald-500 marker:font-bold">
                            <li>
                                <strong>Accreditation:</strong> The LGU's Rural Health Unit (RHU) accredits as a Konsulta Provider. Our platform fulfills the <em>"Electronic Medical Record (EMR)"</em> requirement for accreditation.
                            </li>
                            <li>
                                <strong>Registration:</strong> Beneficiaries are registered to the RHU.
                            </li>
                            <li>
                                <strong>First Patient Encounter (FPE):</strong> Telehealth doctors conduct the initial profiling (FPE), triggering the release of the <strong>₱1,700 capitation fund</strong> per patient from PhilHealth.
                            </li>
                            <li>
                                <strong>Reinvestment:</strong> The revenue is placed in a trust fund to renew subscriptions and expand the program, making it zero-cost to the LGU after Year 1.
                            </li>
                        </ol>
                    </div>
                </div>
            </Modal>

            {/* Resolution Modal */}
            <Modal isOpen={showResolutionModal} onClose={() => setShowResolutionModal(false)} title="Resolution Templates" maxWidth="max-w-4xl">
                <div className="mt-4">
                    {/* Template Toggle */}
                    <div className="flex p-1 bg-slate-800 rounded-lg mb-6">
                        <button 
                            onClick={() => setActiveTemplate('province')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTemplate === 'province' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Provincial Template
                        </button>
                        <button 
                            onClick={() => setActiveTemplate('city')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTemplate === 'city' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            City/Muni Template
                        </button>
                    </div>

                    {/* Document Viewer */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 h-[60vh] overflow-y-auto font-mono text-sm text-slate-300 shadow-inner">
                        {activeTemplate === 'province' ? (
                            <div className="space-y-4">
                                <div className="text-center font-bold text-white mb-6 border-b border-slate-800 pb-4">
                                    <p>RESOLUTION NO. [____]-[YEAR]</p>
                                    <p className="mt-2">A RESOLUTION AUTHORIZING THE PROVINCIAL GOVERNOR OF [PROVINCE] TO ENTER INTO A MEMORANDUM OF AGREEMENT (MOA) FOR THE IMPLEMENTATION OF THE “[PROGRAM NAME]” PROVINCIAL TELEHEALTH PROGRAM, APPROPRIATING FUNDS THEREFOR, AND FOR OTHER PURPOSES</p>
                                </div>
                                
                                <p><span className="font-bold text-emerald-400">WHEREAS</span>, the Province of [PROVINCE] recognizes the urgent need to improve access to primary care and medical consultation services, particularly for indigent families, senior citizens, persons with disabilities, and residents in geographically isolated and disadvantaged areas;</p>
                                
                                <p><span className="font-bold text-emerald-400">WHEREAS</span>, telehealth services provide a cost-effective and scalable platform to expand access to medical consultation, reduce non-emergency congestion in health facilities, and improve health outcomes through timely medical advice and navigation;</p>
                                
                                <p><span className="font-bold text-emerald-400">WHEREAS</span>, the Provincial Government intends to implement the “[PROGRAM NAME]” Provincial Telehealth Program covering eligible beneficiaries across component cities/municipalities, subject to guidelines, availability of funds, and applicable government accounting and auditing rules;</p>
                                
                                <p><span className="font-bold text-emerald-400">WHEREAS</span>, the Provincial Government may utilize available sources of funds chargeable against the Province’s approved Annual Investment Program (AIP), including but not limited to the 20% Development Fund, and/or other legally available funds, subject to budgeting, accounting, and auditing rules;</p>
                                
                                <p><span className="font-bold text-emerald-400">WHEREAS</span>, the program requires a clear implementation structure, including the designation of lead offices, beneficiary selection and validation, data privacy compliance, monitoring and evaluation, and coordination with component LGUs;</p>
                                
                                <p className="py-4 font-bold text-white">NOW THEREFORE, on motion of [NAME OF MEMBER], duly seconded by [NAME OF MEMBER], BE IT RESOLVED, as it is hereby RESOLVED, by the Sangguniang Panlalawigan of [PROVINCE], in session assembled, that:</p>
                                
                                <div className="pl-4 border-l-2 border-slate-800 space-y-4">
                                    <div>
                                        <p className="font-bold text-white">1. Authority to Execute MOA</p>
                                        <p>The Provincial Governor of [PROVINCE] is hereby authorized to negotiate, sign, and execute a Memorandum of Agreement (MOA) with [SERVICE PROVIDER / IMPLEMENTING PARTNER] for the implementation of the “[PROGRAM NAME]” Provincial Telehealth Program, subject to applicable procurement/partnering rules and submission of the final MOA for notation/ratification when required by local policy.</p>
                                    </div>
                                    
                                    <div>
                                        <p className="font-bold text-white">2. Funding and Appropriation</p>
                                        <p>An initial amount of PHP [AMOUNT] is hereby authorized to be charged against [FUND SOURCE: 20% Development Fund / General Fund / Other], consistent with the Province’s AIP/APP and applicable budgeting rules, to cover [YEAR / PERIOD] implementation costs including telehealth subscriptions, onboarding, program management, and related allowable expenses.</p>
                                        <p className="mt-2 text-slate-400 italic">The Provincial Budget Officer is directed to ensure the appropriate budgetary allocation and, if necessary, to prepare a Supplemental Budget subject to Sanggunian approval.</p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-white">3. Program Governance and Implementing Offices</p>
                                        <p>The Provincial Health Office (PHO) is designated as the Lead Implementing Office, in coordination with the PSWDO, Provincial Information Office/ICT Office, and other relevant offices, to:</p>
                                        <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
                                            <li>finalize implementation guidelines;</li>
                                            <li>define beneficiary eligibility and validation;</li>
                                            <li>oversee onboarding and utilization monitoring;</li>
                                            <li>ensure coordination with provincial/district hospitals and RHUs;</li>
                                            <li>submit periodic accomplishment and utilization reports.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="font-bold text-white">4. Component LGU Counterparting and Participation</p>
                                        <p>Component cities/municipalities are enjoined to participate and provide counterpart support, which may include any of the following (as applicable):</p>
                                        <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
                                            <li>co-funding a portion of beneficiary slots;</li>
                                            <li>logistical support for distribution/onboarding;</li>
                                            <li>designation of a local focal person (CHO/CSWDO/MHO);</li>
                                            <li>venue, connectivity, or staffing support.</li>
                                        </ul>
                                        <p className="mt-2 text-slate-400 italic">The Governor/PHO is authorized to enter into Implementing Agreements with component LGUs to operationalize counterparting, subject to local rules.</p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-white">5. Monitoring, Evaluation, and Reporting</p>
                                        <p>The PHO shall submit to the Sangguniang Panlalawigan, through the appropriate committee(s), a quarterly report on: enrollment counts, utilization rates, common health concerns (aggregated), referrals, issues encountered, and recommendations.</p>
                                    </div>
                                </div>

                                <p className="pt-4 font-bold text-white">APPROVED this [DATE] at [VENUE], [PROVINCE].</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-center font-bold text-white mb-6 border-b border-slate-800 pb-4">
                                    <p>RESOLUTION NO. [____]-[YEAR]</p>
                                    <p className="mt-2">A RESOLUTION AUTHORIZING THE CITY/MUNICIPAL MAYOR OF [LGU NAME] TO ENTER INTO A MEMORANDUM OF AGREEMENT (MOA) FOR THE IMPLEMENTATION OF THE “[PROGRAM NAME]” TELEHEALTH PROGRAM FOR QUALIFIED RESIDENTS OF [LGU NAME], APPROPRIATING FUNDS THEREFOR, AND FOR OTHER PURPOSES</p>
                                </div>
                                
                                <p><span className="font-bold text-sky-400">WHEREAS</span>, the City/Municipality of [LGU NAME] seeks to improve access to basic healthcare services, especially for indigent residents, senior citizens, PWDs, and those with limited access to medical consultation;</p>
                                
                                <p><span className="font-bold text-sky-400">WHEREAS</span>, telehealth services can provide timely consultation, guidance, and navigation to appropriate care, reduce avoidable facility visits, and support better health-seeking behavior;</p>
                                
                                <p><span className="font-bold text-sky-400">WHEREAS</span>, the City/Municipality intends to implement the “[PROGRAM NAME]” Telehealth Program for eligible beneficiaries, subject to guidelines, availability of funds, and applicable rules;</p>
                                
                                <p><span className="font-bold text-sky-400">WHEREAS</span>, funds may be charged to the City/Municipality’s approved AIP, including the 20% Development Fund and/or other legally available funds, subject to budgeting and auditing rules;</p>
                                
                                <p className="py-4 font-bold text-white">NOW THEREFORE, on motion of [NAME], duly seconded by [NAME], BE IT RESOLVED, as it is hereby RESOLVED, by the Sangguniang [Panlungsod/Bayan] of [LGU NAME], that:</p>
                                
                                <div className="pl-4 border-l-2 border-slate-800 space-y-4">
                                    <div>
                                        <p className="font-bold text-white">1. Authority to Execute MOA</p>
                                        <p>The City/Municipal Mayor of [LGU NAME] is hereby authorized to negotiate and sign a MOA with [SERVICE PROVIDER / IMPLEMENTING PARTNER] for the implementation of the “[PROGRAM NAME]” Telehealth Program for [NUMBER] eligible beneficiaries for [PERIOD], subject to applicable rules.</p>
                                    </div>
                                    
                                    <div>
                                        <p className="font-bold text-white">2. Appropriation / Funding</p>
                                        <p>The amount of PHP [AMOUNT] is hereby authorized to be allocated/charged against [FUND SOURCE: 20% DF / General Fund / Other] consistent with the AIP/APP, to cover allowable program costs including telehealth subscriptions, onboarding, information drive, and program administration.</p>
                                        <p className="mt-2 text-slate-400 italic">If necessary, the Local Chief Executive is authorized to submit a Supplemental Budget to the Sanggunian for approval.</p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-white">3. Implementing Offices and Local Focal Person</p>
                                        <p>The City/Municipal Health Office (CHO/MHO) is designated as Lead Implementer, in coordination with CSWDO/MSWDO, ICT/Information Office, and Barangay health structures, to:</p>
                                        <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
                                            <li>finalize local guidelines and rollout plan;</li>
                                            <li>validate beneficiaries and maintain master lists;</li>
                                            <li>conduct onboarding and utilization support;</li>
                                            <li>coordinate referrals to RHU/hospitals as needed;</li>
                                            <li>submit monthly utilization and issue reports.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="font-bold text-white">4. Beneficiary Eligibility and Prioritization</p>
                                        <p>Priority beneficiaries shall include [SENIORS / PWD / INDIGENT / SOLO PARENTS / OTHERS], subject to verification using [LISTAHANAN / local registry / barangay certification / CSWDO validation] and program guidelines.</p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-white">5. Monitoring and Evaluation</p>
                                        <p>The CHO/MHO shall submit a quarterly report to the Sanggunian through the Committee on Health on program enrollment, utilization, referral patterns, and recommendations.</p>
                                    </div>
                                </div>

                                <p className="pt-4 font-bold text-white">APPROVED this [DATE] at [VENUE], [LGU NAME].</p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Optional Add-On Clauses (Select as needed)</p>
                            <div className="space-y-3">
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <p className="font-semibold text-emerald-400 text-xs mb-1">“Subject to Procurement/Partnering Rules”</p>
                                    <p className="text-xs">“Implementation shall comply with applicable procurement/partnering rules and supporting documentation requirements.”</p>
                                </div>
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <p className="font-semibold text-emerald-400 text-xs mb-1">“Pilot then Scale”</p>
                                    <p className="text-xs">“The program shall be implemented as a pilot for [PERIOD], after which expansion may be recommended subject to performance results and availability of funds.”</p>
                                </div>
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <p className="font-semibold text-emerald-400 text-xs mb-1">“Counterpart in Kind”</p>
                                    <p className="text-xs">“Counterpart may be in cash or in kind (venue, staff, connectivity support, onboarding teams) as documented.”</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default JustificationSection;