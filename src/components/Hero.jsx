
import {useRef } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'




export default function Hero() {

  const container = useRef(null)
  const text = useRef(null)
  const paragraph = useRef(null)
  const button1 = useRef(null)
  const button2 = useRef(null)
  

  useGSAP(() => {
    const tl=gsap.timeline()

     tl.fromTo(container.current, {opacity:0},{opacity:1,duration:1.5}, 0)
     tl.fromTo(text.current, {y:50 , opacity:0},{y:0, opacity:1,duration:1}, 0.5)
     tl.fromTo(paragraph.current, {y:50 , opacity:0},{y:0, opacity:1,duration:1}, 0.7)
     tl.fromTo(button1.current, { opacity:0},{y:0, opacity:1,duration:0.8}, 0.9)
     tl.fromTo(button2.current, { opacity:0},{y:0, opacity:1,duration:0.8}, 0.9)
    
  })


  
  return (
    <section ref={container} className="min-h-screen flex items-center justify-center bg-amber-50 text-black">
      <div className="text-center px-4">
        <h1 ref={text} className="text-5xl md:text-black lg:text-amber-400 font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Welcome to Our Site
        </h1>
        <p ref={paragraph} className="text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto">
          We build amazing digital experiences that help your business grow.
        </p>
        <div className="flex gap-4 justify-center">
          <button ref={button1} className="px-8 py-3 bg-amber-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 hover:scale-105">
            Get Started
          </button>
          <button ref={button2} className="px-8 py-3 border-2 border-amber-600 hover:border-white/60 rounded-full font-semibold transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}