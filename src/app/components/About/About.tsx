import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { JSX, useEffect, useRef } from 'react';
import SplitType from 'split-type';
import photo from '../../../../public/mhd-crop.jpg';
import './styles.css';

export const About = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize SplitType for the header
    const headerSplit = new SplitType(headerRef.current!, {
      types: 'chars',
      absolute: false,
    });

    // Initialize SplitType for the description
    const descriptionSplit = new SplitType(descriptionRef.current!, {
      types: 'lines',
      absolute: false,
    });

    // Create a timeline for the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'center center',
        scrub: false,
        once: true,
      },
    });

    // Animate the header characters
    tl.fromTo(
      headerSplit.chars,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 0.3,
        stagger: 0.05,
        ease: 'power3.out',
        duration: 0.8,
      }
    );

    // Animate the description lines
    tl.fromTo(
      descriptionSplit.lines,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.out',
        duration: 0.7,
      },
      '-=0.4' // Start slightly before the header animation finishes
    );

    // Cleanup function
    return () => {
      if (headerSplit) headerSplit.revert();
      if (descriptionSplit) descriptionSplit.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <Image id="photo" src={photo} alt="Photo de Mehdi" />
      <div id="about-content">
        <div className="title-container">
          <h1 id="about-bg-header" ref={headerRef}>
            About
          </h1>
        </div>
        {/* <h2 className="about-title">Mehdi est un ingénieur logiciel</h2>
        <div className="description-container">
          <p className="description-text" ref={descriptionRef}>
            Passionné par le développement web et les technologies modernes, je suis spécialisé dans la création d'applications réactives et
            performantes. Avec une expertise en React, TypeScript et NextJS, je transforme des concepts complexes en interfaces utilisateur
            intuitives. Mon approche combine créativité et rigueur technique pour livrer des solutions qui répondent précisément aux besoins des
            utilisateurs.
          </p>
        </div> */}
      </div>
    </section>
  );
};
