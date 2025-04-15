import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { Footer } from '../Footer';
import { initMatterJS } from './initMatterJS';

interface FallingSpritesProps {
  backgroundColor?: string;
}

export const Stack: React.FC<FallingSpritesProps> = ({ backgroundColor = 'transparent' }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const isInitializedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (containerRef === null || sceneRef === null) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom-=100',
      end: 'bottom top+=100',
      onEnter: () => {
        if (!isInitializedRef.current) {
          initMatterJS({
            // @ts-expect-error - TS doesn't know that the ref is not null
            containerRef,
            // @ts-expect-error - TS doesn't know that the ref is not null
            sceneRef,
            engineRef,
            renderRef,
            runnerRef,
            isInitializedRef,
            backgroundColor,
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [backgroundColor]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!headerRef.current || !descriptionRef.current || !sectionRef.current) return;

    const descriptionText = new SplitType(descriptionRef.current, { types: 'lines' });

    gsap.set(descriptionText.lines, {
      y: 50,
      opacity: 0,
    });
    gsap.set(headerRef.current, {
      y: -20,
      opacity: 0,
    });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: '+=100%',
        scrub: false,
      },
    });

    headerTl.to(headerRef.current, {
      opacity: 1,
      ease: 'power2.out',
      y: 0,
      duration: 2.5,
    });

    const descriptionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        scrub: false,
      },
    });

    descriptionTl.to(descriptionText.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    });

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
      }

      descriptionTl.kill();
      if (descriptionText) {
        descriptionText.revert();
      }
    };
  }, []);

  return (
    <>
      <section id="stack-section" className="h-[80vh] w-full flex items-center justify-center relative" ref={sectionRef}>
        <div ref={containerRef} id="stack-container" className="absolute inset-0 overflow-hidden z-20">
          <div id="stack-scene" ref={sceneRef} className="w-full h-full" />
        </div>
        <div className="absolute z-10 text-center">
          <h1 id="stack-title-header" ref={headerRef} className="text-5xl mb-8 m-0">
            Technologies
          </h1>
          <p className="text-[1.4rem] leading-[1.6]">
            I use a variety of technologies and i'm language agnostic so i&apos;m always open to learn new ones.
            <br />
            At the moment, I&apos;m having fun with Golang, TypeScript, and React.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};
