import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { JSX, useEffect, useRef } from 'react';
import SplitType from 'split-type';
import photo from '../../../../public/my-picture.jpg';

gsap.registerPlugin(ScrollTrigger);

export const About = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headerRef.current || !descriptionRef.current || !sectionRef.current) return;

    const descriptionText = new SplitType(descriptionRef.current, { types: 'lines' });
    const imageEl = sectionRef.current.querySelector('img');

    // Set initial states
    gsap.set(descriptionText.lines, {
      y: 50,
      opacity: 0,
    });
    gsap.set(headerRef.current, {
      y: 50,
      opacity: 0,
    });
    gsap.set(imageEl, {
      y: 50,
      opacity: 0,
    });

    // Create a single timeline for all animations
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%', // Trigger when top of section reaches middle of viewport
        pin: false, // Pin the section
        pinSpacing: true,
        scrub: false,
      },
    });

    // Animate all elements
    mainTl
      .to(
        imageEl,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        0
      )
      .to(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        0.3
      )
      .to(
        descriptionText.lines,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
        },
        0.5
      );

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
      }

      mainTl.kill();
      if (descriptionText) {
        descriptionText.revert();
      }
    };
  }, []);

  return (
    <section id="about-section" ref={sectionRef} className="h-screen w-full flex flex-row items-center relative gap-18 pl-36 pr-36 ">
      <div className="w-4/10 h-full flex flex-col items-end justify-start pt-24 pb-24">
        <Image src={photo.src} alt="Me" className="object-cover" width={500} height={500} priority />
      </div>
      <div className="w-1/2 h-full flex flex-col gap-8 pt-24 pb-24">
        <div className="mb-2">
          <h1 id="about-title-header" ref={headerRef} className="text-5xl m-0">
            About
          </h1>
        </div>
        <div>
          <p className="text-[1.4rem] leading-[1.6]" ref={descriptionRef}>
            Passionate about software development and computer science, I specialize in building reactive and high-performance applications. I
            currently work as a Fullstack Developer at Fives CortX in France, where I contribute to the development of innovative software solutions
            for Industry 4.0. <br />
            In my free time, I enjoy learning new technologies and honing my skills. As a tech enthusiast and lifelong learner, I'm always excited to
            explore emerging trends and advancements in the field.
          </p>
        </div>
      </div>
    </section>
  );
};
