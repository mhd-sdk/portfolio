import type React from 'react';
import icons from './technos.json';
import { css, cx } from '@emotion/css';
import Marquee from 'react-fast-marquee';

export const DevIcons: React.FC = () => {
    return (
        <div
            className={cx('marquee-scroll', styles.wrapper)}
        >
            <Marquee speed={30}>
                {icons.map((icon, index) => (
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    <img alt="" className={cx('devicon', css`width:30px; margin-right:50px;`)} key={index} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}`} />
                ))}
            </Marquee>
        </div>
    );
};

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
