import { useEffect, useRef } from 'react'
import { Navbar } from '@ui/Navbar/Navbar'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Transition } from '../Transition'
import { navigateWithDelay } from '../navigateWithDelay'
import { Landing } from './Sections/Landing'
import { css } from '@emotion/css'
import { Profile } from './Sections/Profile'
import { WannaWorkWithMe } from './Sections/WannaWorkWithMe'
import { Timeline } from './Sections/Timeline'

gsap.registerPlugin(ScrollTrigger)

export const AboutMe = (): JSX.Element => {
  const privacyRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 })
    gsap.to(privacyRef.current, {
      x: '0vw',
      duration: 1,
      ease: 'power4.inOut',
    })
    navigateWithDelay(to)
  }

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <>
      <div id="scrollable-wrapper">
        <div
          id="scrollable-content"
          className={`scroll-snap-type: y mandatory;`}>
          <Navbar onNavigate={handleNavigate} />
          <Landing />
          <Profile />
          <Timeline />
          <WannaWorkWithMe />
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
