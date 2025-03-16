import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { JSX, useEffect, useRef } from 'react';
import SplitType from 'split-type';
import './styles.css';
import { Cube } from '../Cube/Cube';
export const About = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        start: 'top top',
        end: '+=100%',
        pinSpacing: true,
        scrub: true,
      },
    });

    headerTl.to(headerRef.current, {
      opacity: 1,
      ease: 'power2.out',
      y: 0,
      duration: 9,
    });
    headerTl.to({}, { duration: 5 }); // Adjust the duration (1 second in this example)

    const descriptionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });

    descriptionTl.to(descriptionText.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    });
    descriptionTl.to({}, { duration: 5 }); // Adjust the duration (1 second in this example)

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
    <section id="about" ref={sectionRef}>
      <Cube />
      <div id="about-content">
        <div className="content-wrapper">
          <div className="title-container">
            <h1 id="about-title-header" ref={headerRef}>
              About
            </h1>
          </div>
          <div className="description-container">
            <p className="description-text" ref={descriptionRef}>
              Passionate about software development and new technologies,
              <br /> I specialize in building reactive and high-performance applications. I am currently working as a Fullstack Developer at Fives
              CortX in Vénissieux, France, where I contribute to the development of modern software solutions for Industry 4.0.
              <br /> In my free time, I enjoy keeping up with the latest tech trends, learning new technologies and watching animes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
