import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../constants';
import { LguData, ProposalState } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';
import { supabase } from '../services/supabase';
import Modal from '../components/Modal';

interface ProposalSectionProps {
    activeLgu: LguData | null;
    onLguChange: (province: string, municipality: string) => void;
}

type PlanType = 'individual' | 'family';

const ProposalSection: React.FC<ProposalSectionProps> = ({ activeLgu, onLguChange }) => {
    // Database Data State
    const [fullData, setFullData] = useState<LguData[]>([]);
    const [loading, setLoading] = useState(true);

    // Dropdown Selection State
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');

    // Plan State
    const [planType, setPlanType] = useState<PlanType>('individual');

    // Calculator State
    // Note: 'beneficiaries' usually refers to the "units" sold. 
    // If Individual Plan, unit = Person. If Family Plan, unit = Household.
    const [units, setUnits] = useState<number>(50000);
    const [priceOverride, setPriceOverride] = useState<number | null>(null);

    // Modal State
    const [activeDetailModal, setActiveDetailModal] = useState<string | null>(null);

    // Collapsible Selector State
    const [isSelectorOpen, setIsSelectorOpen] = useState(true);

    // 1. Fetch Data on Mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('CompleteComelecData2025')
                .select('*');

            if (error) {
                console.error('Error fetching data:', error);
            } else if (data) {
                setFullData(data as unknown as LguData[]);
                // Default Selection logic after load
                const initialRegion = "NATIONAL CAPITAL REGION";
                const regionExists = data.some(r => r.Region === initialRegion);
                if (regionExists) {
                    setSelectedRegion(initialRegion);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // 2. Derive Dropdown Options based on Selections
    const regions = useMemo(() => {
        return [...new Set(fullData.map(d => String(d.Region)).filter(Boolean))].sort();
    }, [fullData]);

    const provinces = useMemo(() => {
        if (!selectedRegion) return [];
        return [...new Set(fullData
            .filter(d => String(d.Region) === selectedRegion)
            .map(d => String(d['Province/City']))
            .filter(Boolean)
        )].sort();
    }, [fullData, selectedRegion]);

    const municipalities = useMemo(() => {
        if (!selectedRegion || !selectedProvince) return [];
        let cities = [...new Set(fullData
            .filter(d => String(d.Region) === selectedRegion && String(d['Province/City']) === selectedProvince)
            .map(d => String(d['City/Municipality/District']))
            .filter(Boolean)
        )].sort();

        // Handle cases where the Province/City itself is the lowest level (e.g. HUCs like Quezon City)
        if (cities.length === 0) {
            const hasDirectRecord = fullData.some(d => String(d.Region) === selectedRegion && String(d['Province/City']) === selectedProvince);
            if (hasDirectRecord) cities = [selectedProvince];
        }
        return cities;
    }, [fullData, selectedRegion, selectedProvince]);

    // 3. Handle Changes
    useEffect(() => {
        if (selectedProvince && !provinces.includes(selectedProvince) && provinces.length > 0) {
            setSelectedProvince(provinces[0]);
        } else if (provinces.length > 0 && !selectedProvince) {
            setSelectedProvince(provinces[0]);
        }
    }, [provinces, selectedProvince]);

    useEffect(() => {
        if (selectedMunicipality && !municipalities.includes(selectedMunicipality) && municipalities.length > 0) {
            setSelectedMunicipality(municipalities[0]);
        } else if (municipalities.length > 0 && !selectedMunicipality) {
            setSelectedMunicipality(municipalities[0]);
        }
    }, [municipalities, selectedMunicipality]);

    // 4. Update Active LGU and Reset Defaults
    useEffect(() => {
        if (selectedRegion && selectedProvince && selectedMunicipality) {
            const match = fullData.find(d =>
                String(d.Region) === selectedRegion &&
                String(d['Province/City']) === selectedProvince &&
                (String(d['City/Municipality/District']) === selectedMunicipality || (!d['City/Municipality/District'] && String(d['Province/City']) === selectedMunicipality))
            );

            if (match) {
                onLguChange(selectedProvince, selectedMunicipality);
                const totalVoters = match["All Ages Both Sexes"] || 0;

                // Reset to Individual plan by default on LGU change
                setPlanType('individual');

                // Default to 30% of total voters for individual
                const defaultUnits = Math.round(totalVoters * 0.30);
                setUnits(defaultUnits > 0 ? defaultUnits : 1000);
                setPriceOverride(null);
            }
        }
    }, [selectedRegion, selectedProvince, selectedMunicipality, fullData, onLguChange]);

    // Re-find the active record for rendering to ensure sync
    const currentRecord = useMemo(() => {
        return fullData.find(d =>
            String(d.Region) === selectedRegion &&
            String(d['Province/City']) === selectedProvince &&
            (String(d['City/Municipality/District']) === selectedMunicipality || (!d['City/Municipality/District'] && String(d['Province/City']) === selectedMunicipality))
        ) || null;
    }, [fullData, selectedRegion, selectedProvince, selectedMunicipality]);


    // Dynamic Chart Data Processing
    const chartData = useMemo(() => {
        if (!currentRecord) return { age: [], gen: [], sex: [] };

        const ageRanges = ["18-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60+"];
        const ageGroups = { MALE: {} as any, FEMALE: {} as any };
        ageRanges.forEach(r => { ageGroups.MALE[r] = 0; ageGroups.FEMALE[r] = 0; });

        Object.keys(currentRecord).forEach(key => {
            if (!key.includes('Years Old') && !key.includes('Yrs Old')) return;
            const value = Number(currentRecord[key]) || 0;
            const agePart = key.match(/\d+/);
            const age = agePart ? parseInt(agePart[0], 10) : NaN;

            if (isNaN(age)) {
                if ((key.includes('60') || key.includes('65')) && (key.includes('Over') || key.includes('+'))) {
                    if (key.includes('Male')) ageGroups.MALE["60+"] += value;
                    else if (key.includes('Female')) ageGroups.FEMALE["60+"] += value;
                }
                return;
            }

            const group = key.includes('Male') ? ageGroups.MALE : (key.includes('Female') ? ageGroups.FEMALE : null);
            if (!group) return;

            if (age >= 18 && age <= 24) group["18-24"] += value;
            else if (age >= 25 && age <= 29) group["25-29"] += value;
            else if (age >= 30 && age <= 34) group["30-34"] += value;
            else if (age >= 35 && age <= 39) group["35-39"] += value;
            else if (age >= 40 && age <= 44) group["40-44"] += value;
            else if (age >= 45 && age <= 49) group["45-49"] += value;
            else if (age >= 50 && age <= 54) group["50-54"] += value;
            else if (age >= 55 && age <= 59) group["55-59"] += value;
            else if (age >= 60) group["60+"] += value;
        });

        const ageData = ageRanges.map(range => ({
            name: range,
            Male: ageGroups.MALE[range],
            Female: ageGroups.FEMALE[range]
        }));

        const generations = { "Youth (18-28)": 0, "Millennials (29-44)": 0, "Gen X (45-59)": 0, "Boomers (60+)": 0 };
        Object.keys(currentRecord).forEach(key => {
            if (!key.includes('Both Sexes')) return;
            const value = Number(currentRecord[key]) || 0;
            const agePart = key.match(/\d+/);
            const age = agePart ? parseInt(agePart[0], 10) : NaN;

            if (isNaN(age)) {
                if ((key.includes('60') || key.includes('65')) && (key.includes('Over') || key.includes('+'))) {
                    generations["Boomers (60+)"] += value;
                }
                return;
            }

            if (age >= 18 && age <= 28) generations["Youth (18-28)"] += value;
            else if (age >= 29 && age <= 44) generations["Millennials (29-44)"] += value;
            else if (age >= 45 && age <= 59) generations["Gen X (45-59)"] += value;
            else if (age >= 60) generations["Boomers (60+)"] += value;
        });

        const genData = Object.entries(generations).map(([name, value]) => ({ name, value }));

        const sexData = [
            { name: 'Male', value: Number(currentRecord["All Ages Male"]) || 0 },
            { name: 'Female', value: Number(currentRecord["All Ages Female"]) || 0 }
        ];

        return { age: ageData, gen: genData, sex: sexData };
    }, [currentRecord]);

    // Calculate totals for percentages
    const totalGen = useMemo(() => chartData.gen.reduce((acc, curr) => acc + curr.value, 0), [chartData.gen]);
    const totalSex = useMemo(() => chartData.sex.reduce((acc, curr) => acc + curr.value, 0), [chartData.sex]);

    const COLORS = ['#14b8a6', '#f97316', '#8b5cf6', '#f59e0b'];
    const SEX_COLORS = ['#3b82f6', '#ec4899'];
    const formatCurrency = (val: number) => `₱${Math.round(val).toLocaleString('en-PH')}`;

    // --- Dynamic Pricing Logic ---
    const calculateSuggestedPrice = (numUnits: number, type: PlanType) => {
        if (type === 'individual') {
            if (numUnits < 50000) return null;
            if (numUnits <= 100000) return 999;
            if (numUnits <= 150000) return 969;
            if (numUnits <= 200000) return 929;
            return 899;
        } else {
            // Family Plan Pricing
            // Base assumes roughly 3.5x multiplier of individual for 5 pax value
            if (numUnits < 5000) return null; // Lowered threshold for families to 5k
            if (numUnits <= 20000) return 3499;
            if (numUnits <= 30000) return 3299;
            return 2999;
        }
    };

    const suggestedPrice = calculateSuggestedPrice(units, planType);
    const isCustomQuote = suggestedPrice === null;
    const bundlePrice = priceOverride !== null ? priceOverride : (suggestedPrice || (planType === 'individual' ? 999 : 3499));

    // Pricing Bounds
    const minAllowedPrice = planType === 'individual' ? 899 : 2499;
    const maxAllowedPrice = planType === 'individual' ? 999 : 3999;

    // Calculations
    const dailyCost = bundlePrice / 365;
    const monthlyCost = bundlePrice / 12;

    // Traditional Costs Breakdown
    // Traditional Costs Breakdown
    const visitsPerYear = planType === 'individual' ? 12 : 60; // 12 for individual, 60 shared for family
    const costPerConsult = 500;
    const transportCostPerVisit = 150;
    const dailyWage = 400; // Opportunity cost
    const mobileDataCost = 50 * visitsPerYear;

    const annualConsultCost = visitsPerYear * costPerConsult;
    const annualTransportCost = visitsPerYear * transportCostPerVisit;
    const annualLostWages = visitsPerYear * dailyWage;

    const traditionalCostPerUnit = annualConsultCost + annualTransportCost + annualLostWages + mobileDataCost;

    // Hardware Ratio: 1 kit per 900 subscriptions regardless of plan type
    const hardwareDivisor = 900;
    const includedHardwareSets = Math.ceil(units / hardwareDivisor);

    const totalProjectCost = units * bundlePrice;
    const totalTraditionalValue = units * traditionalCostPerUnit;
    const totalSavings = totalTraditionalValue - totalProjectCost;

    const totalVoters = currentRecord ? (currentRecord["All Ages Both Sexes"] as number) : 0;
    const estimatedHouseholds = Math.round(totalVoters / 5); // Estimate 5 pax per household based on total pop (proxying voters as pop for simplicity or using a multiplier)

    const maxSliderValue = planType === 'individual' ? (totalVoters > 0 ? totalVoters : 500000) : (estimatedHouseholds > 0 ? estimatedHouseholds : 100000);
    const minSliderValue = planType === 'individual' ? 1000 : 200;

    // Handle Plan Toggle
    const togglePlan = (type: PlanType) => {
        setPlanType(type);
        setPriceOverride(null);
        // Reset units to a sensible default for the new type
        if (type === 'family') {
            setUnits(Math.round(estimatedHouseholds * 0.30) || 5000);
        } else {
            setUnits(Math.round(totalVoters * 0.30) || 50000);
        }
    };

    return (
        <section className="animate-fade-in py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="w-full max-w-screen-2xl mx-auto space-y-24 relative z-10">

                {/* SECTION 1: DEMOGRAPHICS */}
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                            Target <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Demographics</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
                            Data-driven insights for {selectedMunicipality || 'your LGU'}, powered by the latest Comelec census data.
                        </p>
                    </div>

                    <div className="glass rounded-3xl mb-12 border border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300">
                        {/* Selector Header / Toggle */}
                        <div
                            className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
                            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                        >
                            <div>
                                <h3 className="font-bold text-white text-lg flex items-center gap-3">
                                    <i className="ph-map-pin text-emerald-400"></i>
                                    {selectedMunicipality ? `${selectedMunicipality}, ${selectedProvince}` : "Select Location"}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    {selectedRegion || "Choose your target LGU to see data"}
                                </p>
                            </div>
                            <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition-transform duration-300 ${isSelectorOpen ? 'rotate-180' : ''}`}>
                                <i className="ph-caret-down text-slate-400"></i>
                            </div>
                        </div>

                        {/* Collapsible Content */}
                        <div className={`transition-all duration-500 ease-in-out ${isSelectorOpen ? 'max-h-[1000px] opacity-100 border-t border-slate-700/50' : 'max-h-0 opacity-0'}`}>
                            <div className="p-6 md:p-8 pt-0 md:pt-6">
                                {loading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <i className="ph-spinner animate-spin text-3xl text-emerald-400"></i>
                                        <span className="ml-3 text-slate-400 font-medium">Syncing with National Database...</span>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Region</label>
                                            <div className="relative">
                                                <select
                                                    value={selectedRegion}
                                                    onChange={(e) => { setSelectedRegion(e.target.value); setSelectedProvince(''); setSelectedMunicipality(''); }}
                                                    className="appearance-none block w-full bg-slate-900/50 border border-slate-700 text-white py-4 px-5 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all font-medium cursor-pointer hover:bg-slate-800"
                                                >
                                                    <option value="" disabled>Select Region</option>
                                                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                                <i className="ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Province/City</label>
                                            <div className="relative">
                                                <select
                                                    value={selectedProvince}
                                                    onChange={(e) => { setSelectedProvince(e.target.value); setSelectedMunicipality(''); }}
                                                    className="appearance-none block w-full bg-slate-900/50 border border-slate-700 text-white py-4 px-5 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all font-medium cursor-pointer hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!selectedRegion}
                                                >
                                                    <option value="" disabled>Select Province</option>
                                                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                                <i className="ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Municipality</label>
                                            <div className="relative">
                                                <select
                                                    value={selectedMunicipality}
                                                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                                                    className="appearance-none block w-full bg-slate-900/50 border border-slate-700 text-white py-4 px-5 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all font-medium cursor-pointer hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!selectedProvince}
                                                >
                                                    <option value="" disabled>Select Municipality</option>
                                                    {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
                                                </select>
                                                <i className="ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-3xl border border-slate-700/50 flex flex-col min-h-[300px] md:min-h-[450px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <i className="ph-chart-bar text-9xl text-white"></i>
                            </div>
                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <div>
                                    <h3 className="font-bold text-white text-lg">Age Distribution</h3>
                                    <p className="text-xs text-slate-400">Voter Population</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> M</span>
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500"></span> F</span>
                                </div>
                            </div>
                            <div className="flex-grow relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart layout="vertical" data={chartData.age} margin={{ left: 0, right: 10, top: 0, bottom: 0 }} barGap={2}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={40} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            formatter={(value: number) => value.toLocaleString()}
                                        />
                                        <Bar dataKey="Male" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={20} />
                                        <Bar dataKey="Female" stackId="a" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl border border-slate-700/50 flex flex-col min-h-[300px] md:min-h-[450px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <i className="ph-chart-pie-slice text-9xl text-white"></i>
                            </div>
                            <div className="mb-8 relative z-10">
                                <h3 className="font-bold text-white text-lg">Generational Mix</h3>
                                <p className="text-xs text-slate-400">Voter Segments</p>
                            </div>
                            <div className="flex-grow relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData.gen} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="55%" outerRadius="75%" paddingAngle={5}>
                                            {chartData.gen.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.05)" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                        <PieTooltip
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                                            formatter={(value: number) => {
                                                const percent = totalGen > 0 ? ((value / totalGen) * 100).toFixed(1) : '0';
                                                return `${value.toLocaleString()} (${percent}%)`;
                                            }}
                                        />
                                        <Legend
                                            layout="horizontal"
                                            verticalAlign="bottom"
                                            align="center"
                                            wrapperStyle={{ fontSize: '11px', fontWeight: '500', color: '#cbd5e1', paddingTop: '20px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl border border-slate-700/50 flex flex-col min-h-[300px] md:min-h-[450px] relative overflow-hidden group md:col-span-2 xl:col-span-1">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <i className="ph-gender-intersex text-9xl text-white"></i>
                            </div>
                            <div className="mb-8 relative z-10">
                                <h3 className="font-bold text-white text-lg">Gender Ratio</h3>
                                <p className="text-xs text-slate-400">Demographic Split</p>
                            </div>
                            <div className="flex-grow relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData.sex} dataKey="value" nameKey="name" cx="50%" cy="50%" startAngle={180} endAngle={0} innerRadius="60%" outerRadius="90%" paddingAngle={2}>
                                            {chartData.sex.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={SEX_COLORS[index % SEX_COLORS.length]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <PieTooltip
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                                            formatter={(value: number) => {
                                                const percent = totalSex > 0 ? ((value / totalSex) * 100).toFixed(1) : '0';
                                                return `${value.toLocaleString()} (${percent}%)`;
                                            }}
                                        />
                                        <Legend
                                            layout="vertical"
                                            verticalAlign="middle"
                                            align="center"
                                            wrapperStyle={{ top: '60%', fontSize: '14px', fontWeight: '600' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: THE PROPOSITION */}
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Proposition</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light mb-8">
                            Comprehensive healthcare infrastructure for a fraction of the cost.
                        </p>

                        {/* PLAN TOGGLE */}
                        <div className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/50 relative">
                            <button
                                onClick={() => togglePlan('individual')}
                                className={`relative px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 z-10 ${planType === 'individual' ? 'text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                Individual Coverage
                            </button>
                            <button
                                onClick={() => togglePlan('family')}
                                className={`relative px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 z-10 ${planType === 'family' ? 'text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                Family Care Bundle
                            </button>
                            {/* Sliding BG */}
                            <div
                                className="absolute top-1 bottom-1 rounded-lg bg-emerald-600 transition-all duration-300 shadow-emerald-500/20 shadow-lg"
                                style={{
                                    left: planType === 'individual' ? '4px' : '50%',
                                    width: 'calc(50% - 4px)',
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 xl:grid xl:grid-cols-2 xl:gap-10 xl:overflow-visible no-scrollbar">

                        {/* LEFT: INCLUSIONS - REDESIGNED */}
                        <div className="min-w-[90vw] md:min-w-0 snap-center glass rounded-3xl p-8 border border-emerald-500/30 relative overflow-hidden flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <i className="ph-package text-emerald-400"></i> The {planType === 'family' ? 'Family' : ''} Bundle Inclusions
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                                {/* 1. Video Consults */}
                                <div
                                    className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-transparent hover:border-emerald-500/50 transition-all duration-300"
                                    onClick={() => setActiveDetailModal('consults')}
                                >
                                    <img
                                        src={planType === 'individual'
                                            ? "https://sofia.static.domains/Health/images/teleconsult1.png"
                                            : "https://sofia.static.domains/Health/images/family1.png"
                                        }
                                        alt="Video Consult"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    <div className="relative z-10 flex flex-col h-full justify-between p-6">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm self-start">
                                            <i className="ph-video-camera text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg mb-0.5 leading-tight">
                                                {planType === 'individual' ? '12 Video Consults' : '60 Video Consults'}
                                            </p>
                                            <p className="text-xs text-slate-300 font-medium tracking-wide">
                                                {planType === 'individual' ? 'Annual access to GPs' : 'Shared by 5 Family Members'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Voice Calls */}
                                <div
                                    className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-transparent hover:border-emerald-500/50 transition-all duration-300"
                                    onClick={() => setActiveDetailModal('voice')}
                                >
                                    <img
                                        src="https://sofia.static.domains/Health/images/voice1.png"
                                        alt="Voice Call"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    <div className="relative z-10 flex flex-col h-full justify-between p-6">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm self-start">
                                            <i className="ph-phone-call text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg mb-0.5 leading-tight">Unli Voice Calls</p>
                                            <p className="text-xs text-slate-300 font-medium tracking-wide">24/7 Medical Advice</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Integrated EMR */}
                                <div
                                    className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-transparent hover:border-emerald-500/50 transition-all duration-300"
                                    onClick={() => setActiveDetailModal('emr')}
                                >
                                    <img
                                        src="https://sofia.static.domains/Health/images/epress1.png"
                                        alt="EMR"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    <div className="relative z-10 flex flex-col h-full justify-between p-6">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm self-start">
                                            <i className="ph-file-cloud text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg mb-0.5 leading-tight">Integrated EMR</p>
                                            <p className="text-xs text-slate-300 font-medium tracking-wide">Digital records & eRx</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Hardware & Net */}
                                <div
                                    className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-transparent hover:border-emerald-500/50 transition-all duration-300"
                                    onClick={() => setActiveDetailModal('hardware')}
                                >
                                    <img
                                        src="https://sofia.static.domains/Health/images/connectivity1.png"
                                        alt="Hardware"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    <div className="relative z-10 flex flex-col h-full justify-between p-6">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm self-start">
                                            <i className="ph-hard-drives text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg mb-0.5 leading-tight">Hardware & Net</p>
                                            <p className="text-xs text-slate-300 font-medium tracking-wide">iPad + Fiber/Starlink</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: COST COMPARISON - REDESIGNED */}
                        <div className="min-w-[90vw] md:min-w-0 snap-center glass rounded-3xl p-8 border border-slate-700/50 flex flex-col relative overflow-hidden">
                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500"></div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                                    <i className="ph-scales text-sky-400"></i> Value Analysis
                                </h3>

                                <div className="flex gap-4 mb-6 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setActiveDetailModal('value')}>
                                    <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative overflow-hidden group">
                                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <i className="ph-sun text-4xl text-white"></i>
                                        </div>
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-widest block mb-1">
                                            Daily Cost {planType === 'family' && <span className="text-emerald-500 opacity-70">(Per Person)</span>}
                                        </span>
                                        <span className="text-3xl font-black text-white">
                                            ₱{(planType === 'family' ? dailyCost / 5 : dailyCost).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative overflow-hidden group">
                                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <i className="ph-calendar text-4xl text-emerald-400"></i>
                                        </div>
                                        <span className="text-xs text-emerald-500/80 uppercase font-bold tracking-widest block mb-1">
                                            Monthly Cost {planType === 'family' && <span className="text-emerald-400 opacity-70">(Per Person)</span>}
                                        </span>
                                        <span className="text-3xl font-black text-emerald-400">
                                            ₱{(planType === 'family' ? monthlyCost / 5 : monthlyCost).toFixed(0)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 relative overflow-hidden">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 shadow-lg border border-sky-500/30">
                                            <i className="ph-bus text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white mb-1">Less than a Bus Fare</p>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                Instead of a single trip to the city, this covers <span className="text-emerald-400 font-semibold">24/7 Healthcare & Connectivity</span> for an entire month{planType === 'family' ? ' for the whole family' : ''}.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-grow space-y-4">
                                {/* Comparison Grid */}
                                <div
                                    className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors"
                                    onClick={() => setActiveDetailModal('value')}
                                >
                                    <div className="grid grid-cols-3 bg-slate-900 p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                                        <div className="text-left pl-2">Cost Driver</div>
                                        <div className="text-red-400">Traditional</div>
                                        <div className="text-emerald-400">Our Bundle</div>
                                    </div>

                                    <div className="divide-y divide-slate-800/50 text-sm">
                                        {[
                                            { label: "Consultations", sub: `${visitsPerYear} visits / year`, trad: annualConsultCost, bundle: "Included" },
                                            { label: "Transportation", sub: "Fares & Fuel", trad: annualTransportCost, bundle: "₱0" },
                                            { label: "Lost Wages", sub: "Opportunity Cost", trad: annualLostWages, bundle: "₱0" },
                                        ].map((item, i) => (
                                            <div key={i} className="grid grid-cols-3 p-4 hover:bg-slate-900/50 transition-colors items-center group">
                                                <div className="text-slate-300 font-bold pl-2">
                                                    {item.label} <br />
                                                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wide group-hover:text-slate-400 transition-colors">{item.sub}</span>
                                                </div>
                                                <div className="text-center font-bold text-red-400/80 group-hover:text-red-400 transition-colors">₱{item.trad.toLocaleString()}</div>
                                                <div className="text-center font-black text-emerald-500">{item.bundle}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 bg-slate-900/50 text-center text-xs text-slate-500 border-t border-slate-800">
                                        Click for detailed breakdown
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROJECT CALCULATOR - COMMAND CENTER STYLE */}
                    <div className="mt-12 glass-strong border border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-900 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <i className="ph-calculator text-3xl font-bold"></i>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white">Project Calculator</h3>
                                <p className="text-slate-400 text-sm">Estimate costs and ROI for your rollout.</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-12 relative z-10">

                            {/* ROW 1: INPUTS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                                {/* Units Slider */}
                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="text-slate-300 text-sm font-bold uppercase tracking-widest">
                                            {planType === 'individual' ? 'Beneficiaries' : 'Households'}
                                        </label>
                                        <div className="text-right">
                                            <span className="text-3xl font-black text-white block leading-none">{units.toLocaleString()}</span>
                                            <span className="text-xs text-emerald-400 font-medium">
                                                {planType === 'individual'
                                                    ? `${(units / (totalVoters || 1) * 100).toFixed(1)}% of Voters`
                                                    : `~${(units * 5).toLocaleString()} Lives Covered`
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-12 flex items-center">
                                        <input
                                            type="range" min={minSliderValue} max={maxSliderValue} step="100"
                                            value={units}
                                            onChange={(e) => {
                                                const newVal = parseInt(e.target.value);
                                                setUnits(newVal);
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex items-center gap-3">
                                        <i className="ph-info text-emerald-400"></i>
                                        <p className="text-xs text-slate-400">
                                            Includes <span className="text-white font-bold">{includedHardwareSets}</span> sets of hardware
                                            (1 per 900 {planType === 'individual' ? 'beneficiaries' : 'households'}).
                                        </p>
                                    </div>
                                </div>

                                {/* Price Slider/Input */}
                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex flex-col">
                                            <label className="text-slate-300 text-sm font-bold uppercase tracking-widest">
                                                {planType === 'individual' ? 'Unit Price' : 'Family Bundle Price'}
                                            </label>
                                            {priceOverride !== null && (
                                                <button
                                                    onClick={() => setPriceOverride(null)}
                                                    className="text-xs text-amber-400 hover:text-amber-300 uppercase font-bold tracking-wider mt-1 text-left"
                                                >
                                                    Reset to Tier
                                                </button>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-3xl font-black block leading-none ${isCustomQuote ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                {isCustomQuote ? "Custom" : `₱${bundlePrice.toLocaleString()}`}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">Per {planType === 'individual' ? 'Person' : 'Family'} / Year</span>
                                        </div>
                                    </div>
                                    <div className="h-12 flex items-center">
                                        <input
                                            type="range"
                                            min={minAllowedPrice}
                                            max={maxAllowedPrice}
                                            step="1"
                                            value={bundlePrice}
                                            onChange={(e) => setPriceOverride(parseInt(e.target.value))}
                                            className={`w-full ${isCustomQuote ? 'opacity-30 cursor-not-allowed' : ''}`}
                                            disabled={isCustomQuote}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        {isCustomQuote ? (
                                            <p className="text-xs text-amber-400 font-medium bg-amber-900/20 p-2 rounded-lg border border-amber-500/20 inline-block">
                                                * Volume below {planType === 'individual' ? '50k' : '5k'} requires custom quotation.
                                            </p>
                                        ) : (
                                            <p className="text-xs text-slate-500">Tiered pricing applied based on volume.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ROW 2: STATS */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className={`bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center flex flex-col justify-center shadow-inner ${isCustomQuote ? 'opacity-50' : ''}`}>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Total Project Cost</p>
                                    <p className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                        {isCustomQuote ? "—" : formatCurrency(totalProjectCost)}
                                    </p>
                                </div>
                                <div className={`bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center relative overflow-hidden flex flex-col justify-center shadow-inner group ${isCustomQuote ? 'opacity-50' : ''}`}>
                                    <p className="text-[10px] text-red-400/70 font-bold uppercase tracking-widest mb-3">Traditional Value</p>
                                    <p className="text-2xl md:text-3xl font-black text-red-400/80 tracking-tight group-hover:text-red-400 transition-colors">
                                        {isCustomQuote ? "—" : formatCurrency(totalTraditionalValue)}
                                    </p>
                                </div>
                                <div className={`bg-gradient-to-br from-amber-500/20 to-orange-600/20 p-6 rounded-2xl border border-amber-500/30 text-center relative overflow-hidden flex flex-col justify-center shadow-lg group ${isCustomQuote ? 'opacity-50' : ''}`}>
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-500">
                                        <i className="ph-trend-up text-5xl text-amber-400"></i>
                                    </div>
                                    <p className="text-[10px] text-amber-300 font-bold uppercase tracking-widest mb-3">Total Savings Generated</p>
                                    <p className={`text-2xl md:text-4xl font-black text-amber-400 tracking-tight drop-shadow-sm ${!isCustomQuote ? 'animate-pulse' : ''}`}>
                                        {isCustomQuote ? "—" : formatCurrency(totalSavings)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- DETAILED MODALS --- */}

                {/* 1. Video Consults Modal */}
                <Modal isOpen={activeDetailModal === 'consults'} onClose={() => setActiveDetailModal(null)} title="Video Consultations" colorClass="text-emerald-400">
                    <div className="space-y-6 mt-4">
                        <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-500/20">
                            <div className="flex justify-between items-end mb-2">
                                <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest">Market Value</h4>
                                <span className="text-2xl font-black text-white">₱{(visitsPerYear * 500).toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-4 border-b border-emerald-500/10 pb-4">
                                {visitsPerYear} Sessions x ₱500 per consult
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {planType === 'individual'
                                    ? "Beneficiaries get 12 Video Consults per year with licensed General Practitioners."
                                    : "Families get 60 Video Consults per year, shareable among up to 6 registered family members."}
                                This covers common primary care needs, reducing the need to visit physical RHUs or Hospitals for non-emergency cases.
                            </p>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <i className="ph-check text-emerald-500 mt-1"></i>
                                <span><strong>On-Demand:</strong> Connect within minutes, no appointment needed.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <i className="ph-clock-countdown text-emerald-500 mt-1"></i>
                                <span><strong>15-Minute Guarantee:</strong> Patients are connected to a doctor within 15 minutes max.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <i className="ph-check text-emerald-500 mt-1"></i>
                                <span><strong>Digital Prescriptions:</strong> e-Rx sent directly to the app/email.</span>
                            </li>
                        </ul>
                    </div>
                </Modal>

                {/* 2. Voice Calls Modal */}
                <Modal isOpen={activeDetailModal === 'voice'} onClose={() => setActiveDetailModal(null)} title="24/7 Voice Hotline" colorClass="text-emerald-400">
                    <div className="space-y-6 mt-4">
                        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                            <h4 className="text-white font-bold text-sm mb-2">Pure Voice GP Access</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Direct access to General Practitioners via standard cellular voice call. No internet required. This ensures that even those with basic keypad phones or weak data signals can reach a doctor 24/7.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-start gap-4">
                            <div className="bg-emerald-500/10 p-3 rounded-lg shrink-0">
                                <i className="ph-person-simple-walk text-2xl text-emerald-400"></i>
                            </div>
                            <div>
                                <h5 className="font-bold text-white text-sm mb-1">Senior Friendly</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Designed for ease of use. No complex apps to navigate—beneficiaries can simply dial and speak to a professional.
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* 3. EMR Modal */}
                <Modal isOpen={activeDetailModal === 'emr'} onClose={() => setActiveDetailModal(null)} title="Integrated EMR" colorClass="text-emerald-400">
                    <div className="space-y-6 mt-4">
                        <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-500/20">
                            <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-2">PhilHealth Ready</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Our Electronic Medical Record (EMR) system is designed to meet Universal Health Care (UHC) data standards. It creates a <strong>Patient Longitudinal Record</strong> that stays with the beneficiary.
                            </p>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <i className="ph-database text-emerald-500 mt-1"></i>
                                <span><strong>Data Provision:</strong> While we do not provide a built-in visualization dashboard, we provide full access to the raw data sets for LGU analysis.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <i className="ph-shield-check text-emerald-500 mt-1"></i>
                                <span><strong>Data Privacy:</strong> Fully compliant with the Data Privacy Act of 2012.</span>
                            </li>
                        </ul>
                    </div>
                </Modal>

                {/* 4. Hardware Modal */}
                <Modal isOpen={activeDetailModal === 'hardware'} onClose={() => setActiveDetailModal(null)} title="Hardware & Connectivity" colorClass="text-emerald-400">
                    <div className="space-y-6 mt-4">
                        <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-white font-bold text-sm">Deployment Scale</h4>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-500/20">
                                    {includedHardwareSets} Sets Included
                                </span>
                            </div>
                            <p className="text-sm text-slate-400">
                                Calculated at a ratio of <strong>1 Kit per 900 {planType === 'individual' ? 'Beneficiaries' : 'Households'}</strong>. This ensures adequate coverage for Barangay Health Stations.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                                    <i className="ph-tablet text-2xl text-emerald-400"></i>
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-sm">Apple iPad</h5>
                                    <p className="text-xs text-slate-400">We favor Apple iPads (9th/10th Gen) for their superior camera quality, critical for clear tele-diagnosis. Includes industrial-grade rugged cases for field durability.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                                    <i className="ph-broadcast text-2xl text-emerald-400"></i>
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-sm">The Connectivity</h5>
                                    <p className="text-xs text-slate-400">
                                        <strong>Starlink Satellite Kit</strong> for GIDA areas or <strong>Fiber/5G Modem</strong> for urban centers. Includes monthly data subscription.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* 5. Value Analysis Modal */}
                <Modal isOpen={activeDetailModal === 'value'} onClose={() => setActiveDetailModal(null)} title="Detailed Value Analysis" colorClass="text-sky-400">
                    <div className="space-y-6 mt-4">
                        <p className="text-sm text-slate-300">
                            The "Hidden Costs" of traditional healthcare access often exceed the cost of the medical service itself. Here is the breakdown of the savings generated per {planType === 'individual' ? 'beneficiary' : 'family'} per year.
                        </p>

                        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-900 text-[10px] uppercase font-bold text-slate-400">
                                    <tr>
                                        <th className="p-3 pl-4">Cost Driver</th>
                                        <th className="p-3 text-right">Calculation</th>
                                        <th className="p-3 text-right pr-4">Annual Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <tr>
                                        <td className="p-3 pl-4 font-bold text-white">Consultations</td>
                                        <td className="p-3 text-right text-slate-400 text-xs">{visitsPerYear} visits x ₱500</td>
                                        <td className="p-3 text-right pr-4 text-red-400 font-mono">₱{annualConsultCost.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 pl-4 font-bold text-white">Transportation</td>
                                        <td className="p-3 text-right text-slate-400 text-xs">{visitsPerYear} trips x ₱150 (trike/jeep)</td>
                                        <td className="p-3 text-right pr-4 text-red-400 font-mono">₱{annualTransportCost.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 pl-4 font-bold text-white">Lost Wages</td>
                                        <td className="p-3 text-right text-slate-400 text-xs">{visitsPerYear} days x ₱400 (min daily)</td>
                                        <td className="p-3 text-right pr-4 text-red-400 font-mono">₱{annualLostWages.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 pl-4 font-bold text-white">Mobile Data</td>
                                        <td className="p-3 text-right text-slate-400 text-xs">Research/Coordination Load</td>
                                        <td className="p-3 text-right pr-4 text-red-400 font-mono">₱{mobileDataCost.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="bg-slate-900 font-bold border-t-2 border-slate-700">
                                    <tr>
                                        <td className="p-3 pl-4 text-white">Total Traditional Cost</td>
                                        <td className="p-3"></td>
                                        <td className="p-3 text-right pr-4 text-red-500">₱{traditionalCostPerUnit.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 pl-4 text-emerald-400">Our Bundle Cost</td>
                                        <td className="p-3 text-right text-emerald-500/50 text-xs">All Inclusive</td>
                                        <td className="p-3 text-right pr-4 text-emerald-400">- ₱{bundlePrice.toLocaleString()}</td>
                                    </tr>
                                    {planType === 'family' && (
                                        <tr className="bg-emerald-900/10">
                                            <td className="p-2 pl-8 text-emerald-400/80 text-xs italic font-medium" colSpan={2}>
                                                ↳ Effective cost per person (max 6 members)
                                            </td>
                                            <td className="p-2 text-right pr-4 text-emerald-400/80 text-xs italic font-mono">
                                                ₱{(bundlePrice / 6).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="bg-emerald-900/20">
                                        <td className="p-4 pl-4 text-emerald-300 uppercase tracking-widest text-xs">Net Savings Per {planType === 'individual' ? 'Person' : 'Family'}</td>
                                        <td className="p-4"></td>
                                        <td className="p-4 text-right pr-4 text-emerald-400 text-lg">₱{(traditionalCostPerUnit - bundlePrice).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 italic text-center">
                            *Calculations based on average rural minimum wage and transport costs.
                        </p>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default ProposalSection;