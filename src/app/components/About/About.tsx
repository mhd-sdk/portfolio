import { JSX } from 'react';
import './styles.css';

export const About = (): JSX.Element => {
  // split text using split type
  return (
    <section id="about">
      <div>About me</div>
      <h1 id="about-bg-header">About</h1>
    </section>
  );
};
