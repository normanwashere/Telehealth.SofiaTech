import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import VisionSection from './views/VisionSection';
import GapSection from './views/GapSection';
import SolutionSection from './views/SolutionSection';
import ProposalSection from './views/ProposalSection';
import JustificationSection from './views/JustificationSection';
import RoadmapSection from './views/RoadmapSection';
import WinSection from './views/WinSection';
import { SectionId, LguData } from './types';
import { ALL_LGU_DATA } from './constants';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionId>('vision');
    const [activeLgu, setActiveLgu] = useState<LguData | null>(null);

    // Refs for scrolling
    const sectionRefs = {
        vision: useRef<HTMLElement>(null),
        gap: useRef<HTMLElement>(null),
        solution: useRef<HTMLElement>(null),
        win: useRef<HTMLElement>(null),
        proposal: useRef<HTMLElement>(null),
        justification: useRef<HTMLElement>(null),
        roadmap: useRef<HTMLElement>(null),
    };

    const scrollToSection = (id: SectionId) => {
        sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll Spy using Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id as SectionId;
                        setActiveSection(id);
                    }
                });
            },
            {
                root: null, // viewport
                threshold: 0.5 // Trigger when 50% visible to avoid jitter during swipe
            }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    const handleLguChange = (province: string, municipality: string) => {
        let newData: LguData | undefined;
        if (municipality && municipality !== 'All Municipalities') {
            newData = ALL_LGU_DATA.find(d => d.province === province && d.scope_name === municipality);
        } else {
            newData = ALL_LGU_DATA.find(d => d.province === province && d.scope_level === 'Province');
        }
        setActiveLgu(newData || null);
    };

    // Helper to generate smooth transition classes
    const getSectionStyle = (id: SectionId) => {
        const isActive = activeSection === id;
        return `
            w-full h-full transition-all duration-700 ease-out transform
            ${isActive 
                ? 'opacity-100 scale-100 blur-0 translate-y-0' 
                : 'opacity-30 scale-95 blur-[2px] translate-y-4 pointer-events-none'}
        `;
    };

    return (
        <div className="bg-slate-900 text-slate-300 font-sans h-screen w-screen overflow-hidden relative">
            <main className="flex flex-row w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
                
                <section id="vision" ref={sectionRefs.vision} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('vision')}>
                        <VisionSection onNavigate={scrollToSection} />
                    </div>
                </section>

                <section id="gap" ref={sectionRefs.gap} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('gap')}>
                        <GapSection />
                    </div>
                </section>

                <section id="solution" ref={sectionRefs.solution} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('solution')}>
                        <SolutionSection />
                    </div>
                </section>

                <section id="win" ref={sectionRefs.win} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('win')}>
                        <WinSection onNavigate={scrollToSection} />
                    </div>
                </section>

                <section id="proposal" ref={sectionRefs.proposal} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('proposal')}>
                        <ProposalSection activeLgu={activeLgu} onLguChange={handleLguChange} />
                    </div>
                </section>

                <section id="justification" ref={sectionRefs.justification} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('justification')}>
                        <JustificationSection />
                    </div>
                </section>

                <section id="roadmap" ref={sectionRefs.roadmap} className="min-w-full w-full h-full snap-center overflow-y-auto pb-24 overflow-x-hidden">
                    <div className={getSectionStyle('roadmap')}>
                        <RoadmapSection />
                    </div>
                </section>

            </main>
            
            <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
        </div>
    );
};

export default App;