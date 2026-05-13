import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const linksRef = useRef([]);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Opening animation
            gsap.set(mobileMenuRef.current, { display: "block" });
            
            const tl = gsap.timeline();
            tl.fromTo(mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: "50vh", opacity: 1, duration: 1, ease: "power2.out" , backgroundColor: "black" }
            );
            tl.fromTo(linksRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1)" },
                "-=0.3"
            );
            
            gsap.to(hamburgerRef.current, { rotation: 90, duration: 0.3 });
        } else {
            // Closing animation
            const tl = gsap.timeline();
            
            tl.to(linksRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in" ,
                
            });
            
            tl.to(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in"
            }, "-=0.2");
            
            gsap.to(hamburgerRef.current, { rotation: 0, duration: 0.3 });
        }
    }, [isOpen]);

    return (
        <nav className=" p-2 fixed top-0 left-0 w-full h-16 z-50 ">
            <div className="flex items-center justify-between flex-wrap">
                {/* Logo */}
                <div className="flex items-center flex-shrink-0 text-black mr-6">
                    <span className="font-semibold text-xl tracking-tight">Logo</span>
                </div>

                {/* Hamburger Menu Button - Mobile Only */}
                <div className="block lg:hidden">
                    <button
                        ref={hamburgerRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex px-3 py-2 border rounded-xl text-gray-500 border-gray-600 hover:text-white hover:border-white"
                        aria-label="Menu"
                    >
                        <GiHamburgerMenu className="text-amber-600 h-5 w-5" />
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex  lg:justify-center flex-1">
                    <div className="flex space-x-6 text-gray-700 hover:text-amber-900 ">
                        <Link to="/" className=" transition-all duration-300 ease-in-out hover:text-2xl">
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-amber-600  transition-all duration-300 ease-in-out hover:text-2xl">
                            About
                        </Link>
                        <Link to="/services" className="hover:text-amber-600  transition-all duration-300 ease-in-out hover:text-2xl">
                            Services
                        </Link>
                        <Link to="/contact" className="hover:text-amber-600  transition-all duration-300 ease-in-out hover:text-2xl">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Always in DOM, visibility controlled by GSAP */}
            <div 
                ref={mobileMenuRef} 
                className="mt-4 pt-4 border-t border-amber-500 w-full rounded-b-4xl left-0 bg-gray-800 overflow-hidden"
                style={{ height: 0, opacity: 0, display: "none" }}
            >
                <div className="flex flex-col text-center text-xl space-y-5 mt-4 pb-8">
                    {["Home", "About", "Services", "Contact"].map((item, index) => (
                        <Link
                            key={item}
                            ref={el => linksRef.current[index] = el}
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}