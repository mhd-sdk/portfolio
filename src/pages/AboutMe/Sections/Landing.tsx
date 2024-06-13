import { css, cx } from '@emotion/css'
import { Networks } from '@ui/Networks/Networks'
import { useEffect } from 'react'
import SplitType from 'split-type'

import gsap from 'gsap'

export const Landing = (): JSX.Element => {
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
  return (
    <section id="section-1" className={styles.section1}>
      <div id="hi-im-mehdi" className={styles.overflowHidden}>
        <h5 className="animate-reveal-section-1">{"Hi, i'm Mehdi."}</h5>
      </div>
      <div id="a-full-stack-developer" className={styles.overflowHidden}>
        <h1 className={cx('font-bold', 'animate-reveal-section-1')}>
          A full stack developer
        </h1>
      </div>
      <div
        className={css`
          margin-top: 25px;
        `}>
        <Networks />
      </div>
    </section>
  )
}

const styles = {
  overflowHidden: css`
    overflow: hidden;
  `,
  section1: css`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}
