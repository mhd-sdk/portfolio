import { css, cx } from '@emotion/css'
import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import gsap from 'gsap'

interface Props {
  onNavigate: (to: string) => void
}

export const Navbar = ({ onNavigate }: Props): JSX.Element => {
  const [lastScrollY, setLastScrollY] = useState(0)
  const { theme, switchTheme } = useTheme()
  const isDark = theme === 'black'
  useEffect(() => {
    gsap.from('.navbar', {
      y: 30,
      opacity: 0,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut',
    })
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        setLastScrollY(window.scrollY)
      })
      return () => {
        window.removeEventListener('scroll', () => {
          setLastScrollY(window.scrollY)
        })
      }
    }
  }, [lastScrollY])

  const handleNavigate = (to: string) => {
    if (window.location.pathname === to) {
      return
    }
    onNavigate(to)
  }
  return (
    <div
      className={css`
        width: 100%;
        padding: 0 100px;
        height: 50px;
      `}>
      <div className={cx('navbar', styles.navbarWrapper(lastScrollY, isDark))}>
        <div className="navbar-start"></div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1" style={{ gap: 10 }}>
            <button
              className={`btn btn-ghost ${
                window.location.pathname === '/' ? 'btn-active' : ''
              }`}
              onClick={() => {
                handleNavigate('/')
              }}>
              About me
            </button>
            <button
              className={`btn btn-ghost ${
                window.location.pathname === '/projects' ? 'btn-active' : ''
              }`}
              onClick={() => {
                handleNavigate('/projects')
              }}>
              Projects
            </button>
            <button
              className={`btn btn-ghost ${
                window.location.pathname === '/contact' ? 'btn-active' : ''
              }`}
              onClick={() => {
                handleNavigate('/contact')
              }}>
              Contact
            </button>
          </ul>
        </div>
        <div className="navbar-end">
          <label className={cx('swap swap-rotate', styles.darkSwitch)}>
            {/* this hidden checkbox controls the state */}
            <input
              checked={theme === 'light'}
              className="theme-controller"
              type="checkbox"
              value={theme}
              onChange={switchTheme}
            />
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  )
}

const styles = {
  darkSwitch: css`
    margin-right: 10px;
  `,
  navbarWrapper: (lastScroll: number, isDark: boolean) => css`
    position: fixed;
    top: 0px;
    position: fixed;
    margin: 0px 0px;
    left: 0;
    right: 0;

    z-index: 100;
    transition: top 0.5s ease-in-out, background-color 0.5s ease-in-out,
      box-shadow 0.5s ease-in-out, border 0.5s ease-in-out,
      backdrop-filter 0.5s ease-in-out, -webkit-backdrop-filter 0.5s ease-in-out;
    display: flex;
    gap: 5px;
    z-index: 100;
    width: 100%;
    height: 50px;

    ${lastScroll > 250 &&
    `
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            `}
  `,
}
