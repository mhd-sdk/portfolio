import { css, cx } from '@emotion/css';
import { theme } from '../../dim-theme';

interface Props {
    onNavigate: (to: string) => void;
}

export const Navbar = ({ onNavigate }: Props): JSX.Element => {
    const handleNavigate = (to: string) => {
        if (window.location.pathname === to) {
            return
        };
        onNavigate(to);
    }
    return (
        <div className={cx('navbar', styles.navbarWrapper)}>
            <button className={`btn btn-ghost ${window.location.pathname === '/' ? 'btn-active' : ''}`} onClick={() => { handleNavigate('/') }}>Home</button>
            <button className={`btn btn-ghost ${window.location.pathname === '/about' ? 'btn-active' : ''}`} onClick={() => { handleNavigate('/about') }}>About me</button>
            <button className={`btn btn-ghost ${window.location.pathname === '/career' ? 'btn-active' : ''}`} onClick={() => { handleNavigate('/career') }}>Career</button>
        </div>
    )
}

const styles = {
    navbarWrapper: css`
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: fit-content;
        z-index: 100;
        background-color: ${theme['base-200']};
        backdrop-filter: blur(5px);
        display: flex;
        gap: 5px;
        border-radius: 10px;
    `
}
