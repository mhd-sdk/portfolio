import { css, cx } from '@emotion/css';
import { theme } from '../../dim-theme';
import { useEffect, useRef, useState } from 'react';

interface Props {
    onNavigate: (to: string) => void;
}

export const Navbar = ({ onNavigate }: Props): JSX.Element => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // wait 1 sec
                setTimeout(() => {
                    if (window.scrollY > lastScrollY && window.scrollY > 100) {
                        setShow(false);
                    } else {
                        setShow(true);
                    }
                    setLastScrollY(window.scrollY);
                }, 500);
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const handleNavigate = (to: string) => {
        if (window.location.pathname === to) {
            return
        };
        onNavigate(to);
    }
    return (
        <div ref={navbarRef} className={cx('navbar', styles.navbarWrapper(lastScrollY, show))}>
            <button className={`btn btn-ghost ${window.location.pathname === '/' ? 'btn-active' : ''}`} onClick={() => { handleNavigate('/') }}>About me</button>
            <button className={`btn btn-ghost ${window.location.pathname === '/projects' ? 'btn-active' : ''}`} onClick={() => { handleNavigate('/projects') }}>Projects</button>
            <button className={`btn btn-ghost ${window.location.pathname === '/contact' ? 'btn-active' : ''}`} onClick={() => { handleNavigate('/contact') }}>Contact</button>
        </div>
    )
}

const styles = {
    navbarWrapper: (lastScroll: number, show: boolean) => css`
        position: fixed;
        top: ${show ? '10px' : '-100px'};
        left: 50%;
        transform: translateX(-50%);
        width: fit-content;
        z-index: 100;
        ${lastScroll > 300 ? `background-color: ${theme['base-200']};` : ''}
        transition: background-color 0.5s ease-in-out;
        transition: top 0.7s ease-in-out;
        display: flex;
        gap: 5px;
        border-radius: 10px;
        z-index: 100;
    `
}
