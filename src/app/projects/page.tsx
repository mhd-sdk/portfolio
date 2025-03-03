'use client';

import { Navbar } from '../components/Navbar/Navbar';
import { Transition } from '../components/Transition/Transition';

export default function Page() {
  return (
    <>
      <Navbar />
      <div>Projects</div>;
      <Transition />
    </>
  );
}
