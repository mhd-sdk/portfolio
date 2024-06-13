import { css, cx } from '@emotion/css'
import { useEffect } from 'react'
import gsap from 'gsap'

export const Networks = (): JSX.Element => {
  useEffect(() => {
    gsap.from('.network-buttons', {
      y: 100,
      stagger: 0.055,
      delay: 1.5,
      duration: 3,
      ease: 'power4.inOut',
    })
  }, [])
  return (
    <div className={styles.flex}>
      <a
        className={cx('network-buttons', styles.networkButtons)}
        href="https://www.linkedin.com/in/mehdi-seddik-841b341b9/"
        target="_blank"
        rel="noreferrer">
        <i className="fa fa-linkedin" aria-hidden="true"></i>
      </a>
      <a
        className={cx('network-buttons', styles.networkButtons)}
        href="https://www.instagram.com/bogoss.mhd_/"
        target="_blank"
        rel="noreferrer">
        <i className="fa fa-instagram" aria-hidden="true"></i>
      </a>
      <a
        className={cx('network-buttons', styles.networkButtons)}
        href="https://github.com/mhd-sdk"
        target="_blank"
        rel="noreferrer">
        <i className="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
  )
}

const styles = {
  flex: css`
    display: flex;
    gap: 15px;
    overflow: hidden;
    padding: 5px;
  `,
  networkButtons: css`
    height: 50px;
    transition: font-size 0.5s;
    &:hover {
      font-size: 1.5em;
    }
  `,
}
