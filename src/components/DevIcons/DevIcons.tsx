import type React from 'react'
import { css, cx } from '@emotion/css'
import Marquee from 'react-fast-marquee'
import { technos } from './technos'

export const DevIcons: React.FC = () => {
  return (
    <div className={cx('marquee-scroll', styles.wrapper)}>
      <Marquee autoFill speed={30}>
        {technos.map((icon, index) => (
          <img
            alt=""
            className={cx(
              'devicon',
              css`
                width: 30px;
                margin-right: 50px;
              `
            )}
            key={index}
            src={icon.url}
          />
        ))}
      </Marquee>
    </div>
  )
}

const styles = {
  wrapper: css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
  `,
  deviconContainer: css`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    width: 100%;
  `
}
