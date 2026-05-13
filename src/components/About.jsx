import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Create a timeline that's controlled by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,  // Smooth scrubbing
      }
    });
    tl.to('.image-box', {
      rotate: 360/2,
      duration: 1.5,
      borderRadius: "50%",
    })
    // Add animations in sequence
    .from('.title', {
      y: 100,
      opacity: 0,
      duration: 1
    })
    
    .from('.subtitle', {
      x: -100,
      opacity: 0,
      duration: 0.8
    }, "-=0.5")  // Overlap by 0.5 seconds
    .from('.description', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6
    }, "-=0.3")
    
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen">
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="title text-6xl mb-4">Our Story</h1>
        <p className="subtitle text-2xl mb-8">Since 2024</p>
        <div className="description">A journey of innovation</div>
        <div className="image-box w-32 h-32 bg-amber-500 mt-10 border-4 border-black rounded-2xl "></div>
      </div>
    </div>
  );
};