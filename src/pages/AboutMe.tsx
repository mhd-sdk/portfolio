import { useEffect, useRef } from 'react'
import { css, cx } from '@emotion/css'
import { navigateWithDelay } from './navigateWithDelay'
import { Navbar } from '@ui/Navbar/Navbar'
import { Transition } from './Transition'
import gsap from 'gsap'
import image from '../assets/picture.png'
import thatsme from '../assets/thatsme.png'
import whitethatsme from '../assets/white-itsme.png'
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Networks } from '@ui/Networks/Networks'
import { useTheme } from '../hooks/useTheme'
import { TechSearch } from '@ui/TechSearch/TechSearch'
gsap.registerPlugin(ScrollTrigger)

export const AboutMe = (): JSX.Element => {
  const privacyRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const { theme } = useTheme()

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 })
    gsap.to(privacyRef.current, {
      x: '0vw',
      duration: 1,
      ease: 'power4.inOut',
    })
    navigateWithDelay(to)
  }
  const textRevealRef = useRef<HTMLHeadingElement>(null)
  // section 1 gsap
  useEffect(() => {
    SplitType.create('.animate-reveal-section-1', {
      charClass: 'char-section-1',
    })
    gsap.from('.char-section-1', {
      y: 100,
      stagger: 0.025,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut',
    })
  }, [])
  // section 2 reveal on scroll
  useEffect(() => {
    SplitType.create('.string-to-split-section2-h2', {
      charClass: 'char-section-2',
    })

    SplitType.create('.string-to-split-section2-p', {
      charClass: 'char-section-2-p',
    })

    gsap.from('#section-2-header-text-1 .char-section-2', {
      opacity: 0.2,
      stagger: 3,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#section-2-header-text-1',
        start: 'top 80%',
        end: 'top 25%',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    })

    gsap.from('#section-2-body-text-1', {
      opacity: 0.2,
      translateX: -20,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#my-damn-sexy-pic',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    })

    gsap.from('#my-damn-sexy-pic', {
      opacity: 0.2,
      translateX: 20,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#my-damn-sexy-pic',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    })

    gsap.from('#techsearch', {
      opacity: 0.2,
      translateY: 20,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#my-damn-sexy-pic',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    })

    gsap.to('#thatsme', {
      yPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section-2',
        scrub: 1,
      },
    })

    gsap.to('#banderolle1', {
      translateX: -2500,
      scrollTrigger: {
        trigger: '#section-3',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    })
    gsap.from('#banderolle2', {
      translateX: -2500,
      scrollTrigger: {
        trigger: '#section-3',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    })

    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  // section 4 reveal on scroll

  return (
    <>
      <div id="scrollable-wrapper">
        <div
          id="scrollable-content"
          className={`scroll-snap-type: y mandatory;`}>
          <Navbar onNavigate={handleNavigate} />
          <section id="section-1" className={styles.section1}>
            <div id="hi-im-mehdi" className={styles.overflowHidden}>
              <h5 className="animate-reveal-section-1">{"Hi, i'm Mehdi."}</h5>
            </div>
            <div id="a-full-stack-developer" className={styles.overflowHidden}>
              <h1
                ref={textRevealRef}
                className={cx('font-bold', 'animate-reveal-section-1')}>
                A full stack developer
              </h1>
            </div>
            {/* <DevIcons /> */}
            <div
              className={css`
                margin-top: 25px;
              `}>
              <Networks />
            </div>
          </section>
          <section id="section-2" className={cx(styles.section2)}>
            <div className={styles.section2HeroText}>
              <h2
                id="section-2-header-text-1"
                className={cx('string-to-split-section2-h2', 'font-bold')}>
                Create, test, restart...
              </h2>
              <div>
                <p
                  id="section-2-body-text-1"
                  className={cx('string-to-split-section2-p', 'font-bold')}>
                  I'm a code enthusiast, I love to create useful softwares with
                  advanced features.
                </p>
                <p
                  id="section-2-body-text-1"
                  className={cx('string-to-split-section2-p', 'font-bold')}>
                  Specialized in web development, I'm always looking for new
                  challenges.
                </p>
                <p
                  id="section-2-body-text-1"
                  className={cx('string-to-split-section2-p', 'font-bold')}>
                  I love to learn new technologies and improve my skills.
                </p>
              </div>
              <div>
                <p
                  id="section-2-body-text-1"
                  className={cx(
                    'string-to-split-section2-p',
                    'font-bold',
                    css`
                      margin-bottom: 20px;
                    `,
                  )}>
                  Here are some of the technologies I like to work with:
                </p>
                <div id="techsearch">
                  <TechSearch />
                </div>
              </div>
            </div>
            <div
              className={css`
                display: flex;
                flex-direction: column;
              `}>
              <div id="my-damn-sexy-pic">
                <img src={image} alt="" className={styles.image} />
                <img
                  id="thatsme"
                  src={theme === 'light' ? thatsme : whitethatsme}
                  alt=""
                  className={styles.thatsme}
                />
              </div>
            </div>
          </section>
          <section id="section-3" className={styles.section3}>
            <p
              id="banderolle1"
              className="opacity-40 text-6xl sm:text-7xl font-semibold whitespace-nowrap ui-left transform-gpu">
              {Array(5)
                .fill(' Frontend Backend Fullstack Devops Deployment Testing ')
                .reduce((str, el) => str.concat(el), '')}{' '}
            </p>
            <h2
              className={css`
                // center
                text-align: center;
              `}>
              Want to work with me ?
            </h2>
            <p
              id="banderolle2"
              className="opacity-40 text-6xl sm:text-7xl font-semibold whitespace-nowrap ui-left transform-gpu">
              {Array(5)
                .fill(' Integration Engineering Maintenance Documentation ')
                .reduce((str, el) => str.concat(el), '')}{' '}
            </p>
          </section>
          <section
            id="section4"
            className={css`
              height: 200px;
            `}>
            download my resume or contact me
          </section>
        </div>
        <Transition
          title="Mehdi Seddik"
          privacyRef={privacyRef}
          titleRef={titleRef}
        />
      </div>
    </>
  )
}

const styles = {
  thatsme: css`
    // small thats me image with an arrow, position it on top of the big image
    position: relative;
    width: 200px;
    height: 80px;
    right: 0px;
    align-self: flex-end;
  `,
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
    // take left space of flex parent
    flex: 1;
    gap: 20px;
  `,
  overflowHidden: css`
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
    width: 100%;
    height: 100vh;
    padding: 100px 150px 0px 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  `,
  section3: css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
  `,
  heroContent: css`
    display: flex;
    flex-direction: column;
  `,
  image: css`
    width: 400px;

    object-fit: cover;
    height: 600px;
    border-radius: 10px;
  `,
}
