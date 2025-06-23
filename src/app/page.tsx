'use client';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import router from 'next/router';
import { useEffect } from 'react';
import { About } from './components/About/About';
import { Footer } from './components/Footer';
import { Landing } from './components/Landing/Landing';
import { Navbar } from './components/Navbar/Navbar';
import { Skills } from './components/Skills/Skills';
import { Transition } from './components/Transition/Transition';
import { Experience } from './components/WorkExperience/WorkExperience';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Landing />
        <About />
        <Experience />
        <Skills />
        <Footer />
        {process.env.NEXT_PUBLIC_ENV !== 'dev' && <Transition />}
      </div>
    </>
  );
};

export default Home;
