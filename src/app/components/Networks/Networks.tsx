import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX } from 'react';
import { NavLink } from '../NavLink/NavLink';
import './styles.css';

export const Networks = (): JSX.Element => {
  useGSAP(() => {
    gsap.from('.network-buttons', {
      y: 100,
      stagger: 0.055,
      delay: 1.5,
      duration: 3,
      ease: 'power4.inOut',
    });
  }, []);
  return (
    <div id="networks" className="networks flex flex-column color-white-100 ml-auto items-end">
      {/* <NavLink invertColor={true} isActive={true} href="projects" onNavigate={() => {}} text="Projects" />
      <a className="network-buttons" href="https://www.linkedin.com/in/mehdi-seddik-841b341b9/" target="_blank" rel="noreferrer">
      <FontAwesomeIcon size="xl" icon={faLinkedinIn} />
      </a>
      <a className="network-buttons" href="https://github.com/mhd-sdk" target="_blank" rel="noreferrer">
      <FontAwesomeIcon size="xl" icon={faGithub} />
      </a>
      <div className="ml-auto">
      <Link download="MehdiSeddikResume.pdf" href="/CV_En.pdf" target="_blank" rel="noopener noreferrer" text={'Download my resume'} />
      </div> */}
      <div className="flex flex-col gap-1 text-[var(--bg)]! items-end">
        <div className="flex gap-2 align-end">
          <NavLink invertColor={true} blank isActive href="https://github.com/mhd-sdk" text="Github" />
          <img className="w-5" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
        </div>
        <div className="flex gap-2">
          mhdsdk_.
          <img
            className="w-5"
            src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png"
          />
        </div>
        <a href="" className="flex gap-2">
          <NavLink blank invertColor={true} isActive href="https://www.linkedin.com/in/mehdi-seddik/" text="LinkedIn" />
          <img className="w-5" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" />
        </a>
      </div>
    </div>
  );
};
