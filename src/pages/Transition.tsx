import gsap from 'gsap';
import { css } from '@emotion/css';
import { type RefObject, useEffect } from 'react';
import { darkTheme, lightTheme } from '../dim-theme';
import { useTheme } from '../hooks/useTheme';
interface Props {
    privacyRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLHeadingElement>;
    title: string;
}
export const Transition = ({ privacyRef, titleRef, title }: Props) => {
    useEffect(() => {
        const tl = gsap.timeline();
        void tl.to(privacyRef.current, { x: '0vw', duration: 0, delay: 0, ease: 'power4.inOut' })
            .to(privacyRef.current, { x: '100vw', duration: 1, delay: 1.5, ease: 'power4.inOut' })
            .to(privacyRef.current, { x: '-100vw', duration: 0, delay: 0, ease: 'power4.inOut' })
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        // make title fade in, then fade out, while moving from bottom to top
        void tl.to(titleRef.current, { opacity: 0, y: '-100px', duration: 0, ease: 'power4.inOut', delay: 0 })
            .to(titleRef.current, { opacity: 1, y: '-50px', duration: 1, ease: 'power4.inOut', display: 'block' })
            .to(titleRef.current, { opacity: 0, y: '0px', duration: 1, ease: 'power4.inOut', display: 'none' })
    }, []);

    const { theme } = useTheme();
    const isDark = theme === 'dim';

    return (<>
        <div ref={privacyRef} className={css`
        background-color: ${isDark ? darkTheme['base-100'] : lightTheme['base-300']};
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 200;
        
        `} />
        <h1 ref={titleRef} className={css`
        // center of the screen
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 300;
        display: none;
        `}>{title}</h1>
    </>
    )
};
