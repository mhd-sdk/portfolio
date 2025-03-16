'use client';
import gsap from 'gsap';
import { JSX, useEffect } from 'react';

import { default as LenisLib } from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import router from 'next/router';
import { About } from './components/About/About';
import { Landing } from './components/Landing/Landing';
import { Navbar } from './components/Navbar/Navbar';
import { Transition } from './components/Transition/Transition';
import { WannaWorkWithMe } from './components/WorkWithMe/WannaWorkWithMe';

gsap.registerPlugin(ScrollTrigger);

export const Home = (): JSX.Element => {
  const { themes, theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new LenisLib({
      duration: 3,
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
  }, [router]);

  return (
    <>
      <Navbar />
      <Landing />
      <About />
      <WannaWorkWithMe />
      {/* <Timeline />
          <section
            id="section4"
            className={css`
              height: 200px;
            `}
          >
            download my resume or contact me
          </section> */}

      <Transition />
    </>
  );
};

export default Home;
