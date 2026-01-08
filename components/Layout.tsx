import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './Navigation';

// Page Transition Variants
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 0.98
    }
};

const pageTransition = {
    type: "tween",
    ease: [0.25, 1, 0.5, 1], // ease-spring
    duration: 0.5
};

const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="bg-slate-900 text-slate-300 font-sans min-h-screen w-screen overflow-x-hidden relative">

            {/* Persistent Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.15) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.15) 0px, transparent 50%)
                        `
                    }}
                ></div>
            </div>

            {/* Main Content Area with Transitions */}
            <main className="relative z-10 pb-24 min-h-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="w-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Navigation Bar */}
            <Navigation />
        </div>
    );
};

export default Layout;
