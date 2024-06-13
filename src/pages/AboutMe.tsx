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
    SplitType.create('.animate-reveal-section-2', {
      charClass: 'char-section-2',
    })
    gsap.from('.char-section-2', {
      y: 100,
      stagger: 0.025,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut',
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

    // gsap.from('#my-damn-sexy-pic', {
    //   opacity: 0.2,
    //   ease: 'power4.inOut',
    //   scrollTrigger: {
    //     trigger: '#section-2-header-text',
    //     start: 'top 80%',
    //     end: 'top 60%',
    //     scrub: 1,
    //     toggleActions: 'play play reverse reverse',
    //   },
    // })

    // gsap.to('#my-damn-sexy-pic', {
    //   yPercent: -50,
    //   ease: 'none',
    //   scrollTrigger: {
    //     trigger: '#section-2',
    //     scrub: 1,
    //   },
    // })

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
        <div id="scrollable-content">
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
              <div className={styles.overflowHidden}>
                <h2
                  id="section-2-header-text-1"
                  className={cx('animate-reveal-section-2', 'font-bold')}>
                  Create, test, restart...
                </h2>
              </div>
              <div className={styles.overflowHidden}>
                <p
                  id="section-2-header-text-1"
                  className={cx('animate-reveal-section-2-body', 'font-bold')}>
                  I'm a code enthusiast, I love to create useful softwares with
                  advanced features.
                </p>
              </div>
              <div className={styles.overflowHidden}>
                <p
                  id="section-2-header-text-1"
                  className={cx('animate-reveal-section-2-body', 'font-bold')}>
                  Specialized in web development, I'm always looking for new
                  challenges.
                </p>
              </div>
              <div className={styles.overflowHidden}>
                <p
                  id="section-2-header-text-1"
                  className={cx('animate-reveal-section-2-body', 'font-bold')}>
                  I love to learn new technologies and improve my skills.
                </p>
              </div>
            </div>
            <div
              className={css`
                display: flex;
                flex-direction: column;
              `}>
              <img
                id="my-damn-sexy-pic"
                src={image}
                alt=""
                className={styles.image}
              />

              <img
                id="thatsme"
                src={theme === 'light' ? thatsme : whitethatsme}
                alt=""
                className={styles.thatsme}
              />
            </div>
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
  `,
  overflowHidden: css`
    overflow: hidden;
    padding: 5px;
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
    padding: 0px 100px 0px 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  `,
  section3: css`
    height: 100vh;
    width: 100%;
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

    object-fit: cover;
    height: 600px;
  `,
}
