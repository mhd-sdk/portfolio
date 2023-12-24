import { useEffect, useRef } from 'react';
import { css, cx } from '@emotion/css';
import { navigateWithDelay } from './navigateWithDelay';
import { Navbar } from '@ui/Navbar/Navbar';
import { Transition } from './Transition';
import gsap from 'gsap';
import image from '../../public/picture.png';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { DevIcons } from '@ui/DevIcons/DevIcons';

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
  }, []);
  // section 2 reveal on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#section-2-header-text .char', {
      opacity: 0.2,
      stagger: 3,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#section-2-header-text',
        start: 'top 80%',
        end: 'top 60%',
        scrub: 1,
        toggleActions: 'play play reverse reverse'
      }
    });

    gsap.from('#my-damn-sexy-pic', {
      opacity: 0.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#section-2-header-text',
        start: 'top 80%',
        end: 'top 60%',
        scrub: 1,
        toggleActions: 'play play reverse reverse'
      }
    });

    gsap.to('#my-damn-sexy-pic', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section-2',
        scrub: 1
      }
    });

    const lenis = new Lenis();
    lenis.on('scroll', (e: any) => {
      console.log(e);
    });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  // section 3 reveal

  // useEffect(() => {
  //   ScrollTrigger.create({
  //     trigger: '.hold-1',
  //     // animation: tl,
  //     pin: true,
  //    start: 'center center',
  //    end: '+=1000',

  //     scrub: 0, // I like the 1 sec delay, set to true for exact anime on scroll
  //     markers: true
  //   })
  // }, []);

  return (
    <>
      <div id="scrollable-wrapper">
        <div id="scrollable-content">
          <Navbar onNavigate={handleNavigate} />

          <section id="section-1" className={styles.section1}>
            <div className={styles.overflowHidden}>
              <h5 className="animate-text-reveal">{"Hi, i'm Mehdi."}</h5>
            </div>
            <div className={styles.overflowHidden}>
              <h1
                ref={textRevealRef}
                className={cx('font-bold', 'animate-text-reveal')}
              >
                A full stack developer
              </h1>
            </div>
            <DevIcons />
          </section>

          <section id="section-2" className={cx('hold-1', styles.section2)}>
            <div className={styles.section2HeroText}>
              <div className={styles.overflowHidden}>
                <h2
                  id="section-2-header-text"
                  className={cx('animate-text-reveal', 'font-bold')}
                >
                  Code passionate
                </h2>
              </div>
              <div className={styles.overflowHidden}>

                <h2
                  id="section-2-header-text"
                  className={cx('animate-text-reveal', 'font-bold')}
                >
                  Eager learner
                </h2>
              </div>
              <div className={styles.overflowHidden}>
                <h2
                  id="section-2-header-text"
                  className={cx('animate-text-reveal', 'font-bold')}
                >
                  Hard worker
                </h2>
              </div>
            </div>
            <img
              id="my-damn-sexy-pic"
              src={image}
              alt=""
              className={styles.image}
            />
          </section>
          <section id="section-3" className={styles.section3}>
            <div className={styles.techHeader}>
              <img alt="" className={cx(css`width:500px;`)} src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'} />
              <div className={styles.techWrapper}>

                <h2 className="font-bold">
                  {"I'm in love with"} <br /> {'React'}
                </h2>
              </div>
            </div>
          </section>
          <section>
            But i can also code with...
          </section>

          {/* <section className={styles.section3}>
            <div
              className={css`
                display: flex;
                flex-direction: row;
                gap: 50px;
                padding: 50px 0px 0px 0px;
              `}
            >
              <div>
                <Timeline />
              </div>
            </div>
          </section> */}

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
  techWrapper: css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    gap: 20px;
  `,
  techHeader: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  section2HeroText: css`
    display: flex;
    flex-direction: column;
  `,
  overflowHidden: css`
    overflow: hidden;
    padding:5px;
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
    width: 100%;
    height: 100vh;
    padding: 0px 100px 0px 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  `,
  section3: css`
    height: 100vh;
    width: 100vw;
    padding: 0px 80px 0px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  heroContent: css`
    display: flex;
    flex-direction: column;
  `,
  image: css`
    width: 400px;
  `
};
