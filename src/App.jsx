import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Main from './components/Main';

// Register plugins once
gsap.registerPlugin( ScrollSmoother);

function App() {
  const wrapperRef = useRef(null);

  useGSAP(() => {
    // Create the ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: wrapperRef.current?.querySelector('#smooth-content'),
      smooth: 1.5,           // smoothness — lower = faster, higher = smoother
      effects: true,          // enables data-speed / data-lag attributes
      normalizeScroll: true,  // normalizes scroll behavior across devices
      ignoreResize: false,
    });

    return () => {
      smoother.revert();
    };
  });

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
              <Navbar />

      <div id="smooth-content">
        <Hero />
        <About />
        <Main />
        <About />
      </div>
    </div>
  );
}

export default App;
