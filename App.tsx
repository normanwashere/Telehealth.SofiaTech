import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import VisionSection from './views/VisionSection';
import GapSection from './views/GapSection';
import SolutionSection from './views/SolutionSection';
import ProposalSection from './views/ProposalSection';
import JustificationSection from './views/JustificationSection';
import RoadmapSection from './views/RoadmapSection';
import WinSection from './views/WinSection';
import ScrollToTop from './components/ScrollToTop';
import { LguData } from './types';
import { ALL_LGU_DATA } from './constants';

const App: React.FC = () => {
    const [activeLgu, setActiveLgu] = useState<LguData | null>(null);

    const handleLguChange = (province: string, municipality: string) => {
        let newData: LguData | undefined;
        if (municipality && municipality !== 'All Municipalities') {
            newData = ALL_LGU_DATA.find(d => d.province === province && d.scope_name === municipality);
        } else {
            newData = ALL_LGU_DATA.find(d => d.province === province && d.scope_level === 'Province');
        }
        setActiveLgu(newData || null);
    };

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<VisionSection onNavigate={() => { }} />} />
                    <Route path="/gap" element={<GapSection />} />
                    <Route path="/solution" element={<SolutionSection />} />
                    <Route path="/impact" element={<WinSection onNavigate={() => { }} />} />
                    <Route path="/proposal" element={<ProposalSection activeLgu={activeLgu} onLguChange={handleLguChange} />} />
                    <Route path="/funding" element={<JustificationSection />} />
                    <Route path="/roadmap" element={<RoadmapSection />} />
                    {/* Redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;