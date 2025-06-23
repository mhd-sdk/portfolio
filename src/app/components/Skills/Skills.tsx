// import Content from '@/markdown/content.mdx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { JSX } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { DevIcons } from '../Stack/Devicon';
import { tools, webDev } from '../Stack/technos';
import './custom-styles.css';

gsap.registerPlugin(ScrollTrigger);

export const Skills = (): JSX.Element => {
  return (
    <section id="skills" className="w-full px-10 mb-20 mt-20 text-justify">
      <SectionHeader title="Skills | #003" url={'#skills'} />
      <p className="mt-3">
        From frontend to backend, I have a diverse skill set that allows me to tackle various challenges in web development. I&apos;m also willing to
        learn more about low level, system programming languages in the future.
      </p>
      <div className="mt-4 flex-wrap flex flex-wrap ">
        <DevIcons list={webDev} />
      </div>
      <p className="mt-3">
        I&apos;m also experienced with a variety of tools and technologies that streamline the development workflow, and I have a strong appreciation
        for DevOps practices and Cloud native technologies.
      </p>
      <div className="mt-4 flex-wrap flex flex-wrap ">
        <DevIcons list={tools} />
      </div>
    </section>
  );
};
