'use client';
import gsap from 'gsap';
import { JSX, useEffect } from 'react';

import { default as LenisLib } from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import router from 'next/router';
import { About } from './components/About/About';
import Citation from './components/Citation/Citation';
import { Landing } from './components/Landing/Landing';
import { Marquee } from './components/Marquee/Marquee';
import { Navbar } from './components/Navbar/Navbar';
import { Stack } from './components/Stack/Stack';
import { Transition } from './components/Transition/Transition';

gsap.registerPlugin(ScrollTrigger);

export const Home = (): JSX.Element => {
  useEffect(() => {
    const lenis = new LenisLib({
      duration: 2,
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
      <Navbar />
      <Landing />
      <About />
      <Citation />
      <Stack />
      {/* <Timeline /> */}
      <Marquee />

      <Transition />
    </>
  );
};

export default Home;
