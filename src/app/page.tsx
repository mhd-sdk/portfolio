'use client';
import gsap from 'gsap';
import { JSX, useEffect } from 'react';

import { default as LenisLib } from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTheme } from 'next-themes';
import { Landing } from './components/Landing/Landing';
import { Navbar } from './components/Navbar/Navbar';
import { Transition } from './components/Transition/Transition';
import { navigateWithDelay } from './utils/navigateWithDelay';

gsap.registerPlugin(ScrollTrigger);

export const AboutMe = (): JSX.Element => {
  const handleNavigate = (to: string) => {
    gsap.to('.privacy', { display: 'block', duration: 0, delay: 0 });
    gsap.to('.privacy', {
      x: '0vw',
      duration: 1,
      ease: 'power4.inOut',
    });
    navigateWithDelay(to);
  };
  const { themes, theme } = useTheme();
  console.log(themes, theme);
  useEffect(() => {
    const lenis = new LenisLib();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div id="scrollable-wrapper">
        <div id="scrollable-content" className={`scroll-snap-type: y mandatory;`}>
          <Navbar onNavigate={handleNavigate} />
          <Landing />
          {/* <Profile /> */}
          {/* <Timeline />
          <WannaWorkWithMe />
          <section
            id="section4"
            className={css`
              height: 200px;
            `}
          >
            download my resume or contact me
          </section> */}
        </div>
        <Transition title={'Mehdi seddik'}></Transition>
      </div>
    </>
  );
};

export default AboutMe;
