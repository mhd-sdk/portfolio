import { useEffect, useRef } from 'react';
import { css, cx } from '@emotion/css';
import { navigateWithDelay } from './navigateWithDelay';
import { Navbar } from '@ui/Navbar/Navbar';
import { Transition } from './Transition';
import gsap from 'gsap';
import image from '../../public/picture.png';
import { Timeline } from '@ui/Timeline/Timeline';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const AboutMe = () => {
  const privacyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 });
    gsap.to(privacyRef.current, {
      x: '0vw',
      duration: 1,
      ease: 'power4.inOut'
    });
    navigateWithDelay(to);
  };
  const textRevealRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    SplitType.create('.animate-text-reveal');

    gsap.from('.char', {
      y: 100,
      stagger: 0.025,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut'
    });
    // const tl = gsap.timeline();
    // void tl.to(textRevealRef, { x: '100px', duration: 1, ease: 'power4.inOut', delay: 5 })
  }, []);

  useEffect(() => {
    // const smoother = new ScrollSmoother({
    //   wrapper: '#scrollable-wrapper',
    //   content: '#scrollable-content'
    // });
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('#hi-im-mehdi-container', {
      yPercent: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section',
        scrub: true
      }
    });

    gsap.to('#job-desc-container', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section',
        scrub: true
      }
    });
  }, [])

  return (
    <>
      <div id="scrollable-wrapper">
        <div id="scrollable-content">

        <Navbar onNavigate={handleNavigate} />

          <section id="section" className={styles.section1}>
          <div className={styles.headerLine}>
              <h5 className="animate-text-reveal" >{"Hi, i'm Mehdi."}</h5>
          </div>
            <div className={(styles.headerLine)}>
            <h1
              ref={textRevealRef}
                className={cx('font-bold', 'animate-text-reveal')}
              >
              A full stack developer
            </h1>
          </div>
        </section>

        <section className={styles.section2}>
            <h2 id="i-like-complexity" className="font-bold">
              I like working on complex projects involving challenges and
              innovative features
            </h2>
            <div
              className={css`
            display: flex;
            flex-direction: row;
            gap: 50px;
            padding: 50px 0px 0px 0px;
            `}
            >
              <img src={image} alt="" className={styles.image} />
              <div>
                <Timeline />
              </div>
            </div>
          </section>

          <section className={styles.section2}>
            <h2 id="i-like-complexity" className="font-bold">
            I like working on complex projects involving challenges and
            innovative features
          </h2>
          <div
            className={css`
            display: flex;
            flex-direction: row;
            gap: 50px;
            padding: 50px 0px 0px 0px;
            `}
            >
            <img src={image} alt="" className={styles.image} />
            <div>
              <Timeline />
            </div>
          </div>
        </section>

        <section className={styles.section2}>
          <h2 className="font-bold">
            I use the latest technologies to build awesome products
          </h2>
          <img
            alt=""
            width="50px"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            />

          <img
            alt=""
            width="50px"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            />
        </section>

      </div>
      <Transition
        title="Mehdi Seddik"
        privacyRef={privacyRef}
        titleRef={titleRef}
        />
      </div>
    </>
  );
};

const styles = {
  headerLine: css`
    overflow: hidden;
  `,
  section1: css`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  section2: css`
    height: 100vh;
    width: 100vw;
    padding: 0px 80px 0px 80px;
    display: flex;
    flex-direction: column;
  `,
  heroContent: css`
    display: flex;
    flex-direction: column;
  `,
  image: css`
    width: 350px;
    margin: 50 auto;
  `
};
