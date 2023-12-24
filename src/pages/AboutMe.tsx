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
gsap.registerPlugin(ScrollTrigger);

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
  // section 1 gsap
  useEffect(() => {
    SplitType.create('.animate-reveal-section-1', { charClass: 'char-section-1' });
    gsap.from('.char-section-1', {
      y: 100,
      stagger: 0.025,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut'
    });
  }, []);
  // section 2 reveal on scroll
  useEffect(() => {
    SplitType.create('.animate-reveal-section-2', { charClass: 'char-section-2' });
    gsap.from('.char-section-2', {
      y: 100,
      stagger: 0.025,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut'
    });
    gsap.from('#section-2-header-text .char-section-2', {
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
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  // section 3 reveal
  useEffect(() => {
    SplitType.create('#im-in-love-w-react', { charClass: 'char-section-3' });
    const reactTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#section-3',
        pin: true,
        start: 'center center',
        end: '+=100%',
        scrub: 3,
        markers: false
      }
    });

    // Ajouter les animations simultanément sans délai.
    reactTimeLine.add(gsap.from('.char-section-3', {
      y: 100,
      stagger: 0.025,
      duration: 1,
      ease: 'power4.out'
    }), 0);

    reactTimeLine.add(gsap.from('#react-icon', {
      rotate: 360,
      opacity: 0,
      width: 0,
      duration: 2,
      marginRight: 0,
      ease: 'power4.inOut'
    }), 0);
  }, []);

  return (
    <>
      <div id="scrollable-wrapper">
        <div id="scrollable-content">
          <Navbar onNavigate={handleNavigate} />
          <section id="section-1" className={styles.section1}>
            <div id="hi-im-mehdi" className={styles.overflowHidden}>
              <h5 className="animate-reveal-section-1">{"Hi, i'm Mehdi."}</h5>
            </div>
            <div id="a-full-stack-developer" className={styles.overflowHidden}>
              <h1
                ref={textRevealRef}
                className={cx('font-bold', 'animate-reveal-section-1')}
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
                  className={cx('animate-reveal-section-2', 'font-bold')}
                >
                  Code passionate
                </h2>
              </div>
              <div className={styles.overflowHidden}>

                <h2
                  id="section-2-header-text"
                  className={cx('animate-reveal-section-2', 'font-bold')}
                >
                  Eager learner
                </h2>

              </div>
              <div className={styles.overflowHidden}>
                <h2
                  id="section-2-header-text"
                  className={cx('animate-reveal-section-2', 'font-bold')}
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
              <img alt="" id="react-icon" className={cx(css`width:500px; z-index:500; margin-right:50px;`)} src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'} />
              <div className={styles.overflowHidden}>
                <h2 id="im-in-love-w-react" className="font-bold">
                  {"I'm in love with React"}
                </h2>
              </div>
            </div>
          </section>
          <section id="section-4">
            <h1 className='font-bold'>
              But i can also code with...
            </h1>
            <div>

            </div>
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
    overflow: hidden;
  `,
  heroContent: css`
    display: flex;
    flex-direction: column;
  `,
  image: css`
    width: 400px;
  `
};
