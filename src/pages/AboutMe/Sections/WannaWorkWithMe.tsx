import { css } from '@emotion/css'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export const WannaWorkWithMe = (): JSX.Element => {
  useEffect(() => {
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
  }, [])

  return (
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
  )
}

const styles = {
  section3: css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    overflow: hidden;
  `,
}
