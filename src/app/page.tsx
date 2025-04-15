'use client';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import router from 'next/router';
import { useEffect } from 'react';
import { About } from './components/About/About';
import Citation from './components/Citation/Citation';
import { Landing } from './components/Landing/Landing';
import { Navbar } from './components/Navbar/Navbar';
import { Stack } from './components/Stack/Stack';
import { Transition } from './components/Transition/Transition';

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
        <Citation />
        <Stack />
        <Transition />
      </div>
    </>
  );
};

export default Home;
