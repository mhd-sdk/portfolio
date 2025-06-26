'use client';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import { About } from './components/About/About';
import { Footer } from './components/Footer';
import { Landing } from './components/Landing/Landing';
import { Navbar } from './components/Navbar/Navbar';
import { Skills } from './components/Skills/Skills';
import { Experience } from './components/WorkExperience/WorkExperience';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => setShowSections(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence>
          {showSections && (
            <motion.div key="sections" initial="hidden" animate="visible" exit="exit" variants={fadeUpVariant}>
              <Landing />
              <About />
              <Experience />
              <Skills />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* {process.env.NEXT_PUBLIC_ENV !== 'dev' && <Transition />} */}
      </main>
    </div>
  );
};

export default Home;
