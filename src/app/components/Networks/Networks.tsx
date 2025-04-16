import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX } from 'react';
import { Link } from '../Link/Link';
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
    <div id="networks" className="networks">
      <a className="network-buttons" href="https://www.linkedin.com/in/mehdi-seddik-841b341b9/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon size="xl" icon={faLinkedinIn} />
      </a>
      <a className="network-buttons" href="https://github.com/mhd-sdk" target="_blank" rel="noreferrer">
        <FontAwesomeIcon size="xl" icon={faGithub} />
      </a>
      <div className="ml-auto">
        <Link download="MehdiSeddikResume.pdf" href="/CV_En.pdf" target="_blank" rel="noopener noreferrer" text={'Download my resume'} />
      </div>
    </div>
  );
};
