"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const container = useRef(null);
    const wrapperRef = useRef(null); // Ref for pinning
    const bottleRef = useRef(null);
    const palmRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Entry Animation (On Mount)
            gsap.from(".reveal-char", {
                opacity: 0,
                y: 40,
                stagger: 0.02,
                duration: 1.2,
                ease: "expo.out",
            });

            gsap.from(".fade-in-ui", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 1,
                delay: 0.5,
                ease: "power2.out",
            });

            // 2. Main Scroll Sequence (Pinning & Parallax)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=100%", // Scroll duration (100% of viewport height)
                    pin: wrapperRef.current, // Use GSAP pinning instead of CSS sticky
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            tl.to(".bg-text", { scale: 1.2, opacity: 0.02 }, 0)
                .to(bottleRef.current, { y: -60, rotation: -2 }, 0)
                .to(palmRef.current, {
                    y: -220,
                    x: -40,
                    rotation: 25,
                    scale: 1.1
                }, 0)
                .to(".fade-out-scroll", { opacity: 0, y: -20 }, 0);

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full bg-[#fdfaf6] text-black font-sora">
            {/* We use wrapperRef for pinning. 
          The 'h-screen' ensures it fills the viewport.
      */}
            <div ref={wrapperRef} className="relative h-screen w-full overflow-hidden">

                {/* BACKGROUND TEXT */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <h1 className="bg-text text-[38vw] font-black tracking-tighter text-black leading-none opacity-10 select-none">
                        PALM
                    </h1>
                </div>

                {/* LEFT CONTENT */}
                <div className="absolute top-20 md:top-16 left-8 md:left-16 max-w-sm z-30 fade-out-scroll">
                    <p className="fade-in-ui text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-orange-800 mb-2">
                        Ama Organics • Pure Ghanaian Palm Oil
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold leading-[1.1] mb-6">
                        {"Pure. Rich. Authentically Ghanaian.".split("").map((char, i) => (
                            <span key={i} className="reveal-char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>

                    <p className="fade-in-ui text-sm text-gray-400 leading-relaxed max-w-[280px] p-3 rounded-xl backdrop-blur-sm">
                        Sourced from carefully selected palm fruits across Ghana, our premium
                        palm oil is rich in natural nutrients, bold flavor, and deep color.
                    </p>

                    <div className="fade-in-ui mt-8 flex items-center gap-4">
                        <Link href={"/contact"}>
                            <Button className="bg-orange-900 text-white px-8 py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-orange-800 transition shadow-xl shadow-orange-900/10">
                                Order Now
                            </Button>
                        </Link>
                        <p className="text-[10px] text-gray-800 font-medium leading-tight">
                            Nationwide delivery <br /> across Ghana
                        </p>
                    </div>
                </div>

                {/* CENTER IMAGES (BOTTLE & PALM) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="relative w-full max-w-2xl h-full flex items-center justify-center">

                        {/* Main Bottle */}
                        <div ref={bottleRef} className="relative w-[280px] h-[500px] md:w-[340px] md:h-[580px] -rotate-6 transition-transform duration-300">
                            <Image
                                src="/images/product.png"
                                alt="Ama Organics Bottle"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]"
                            />
                        </div>

                        {/* Floating Palm Fruit */}
                        <div
                            ref={palmRef}
                            className="absolute bottom-[15%] left-[15%] md:left-[20%] w-[180px] h-[180px] md:w-[250px] md:h-[250px] z-20"
                        >
                            <Image
                                src="/images/palm.png"
                                alt="Fresh Palm Fruit"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM LEFT BADGE */}
                <div className="absolute bottom-12 md:bottom-16 left-8 md:left-16 z-30 fade-in-ui">
                    <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center border border-gray-200 rounded-full bg-white/30 backdrop-blur-sm">
                        <div className="absolute inset-0 border-t-2 border-orange-800 rounded-full animate-[spin_8s_linear_infinite]" />
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-black">
                                3.3<span className="text-sm ml-1">L</span>
                            </p>
                            <p className="text-[9px] uppercase font-bold tracking-widest text-gray-500">
                                Premium
                            </p>
                        </div>
                    </div>
                </div>

                {/* FEATURES (BOTTOM RIGHT) */}
                <div className="absolute bottom-12 md:bottom-16 right-8 md:right-16 z-30 space-y-8 md:space-y-10 text-right fade-in-ui">
                    <div className="group">
                        <span className="text-orange-900 text-[10px] font-black tracking-widest">[01]</span>
                        <p className="text-lg md:text-xl font-black uppercase mt-1">Nutrient Rich</p>
                        <p className="text-[11px] text-gray-500 mt-1 max-w-[180px] ml-auto font-medium">
                            Natural vitamins & authentic taste
                        </p>
                    </div>

                    <div className="group">
                        <span className="text-orange-900 text-[10px] font-black tracking-widest">[02]</span>
                        <p className="text-lg md:text-xl font-black uppercase mt-1">Locally Sourced</p>
                        <p className="text-[11px] text-gray-500 mt-1 max-w-[180px] ml-auto font-medium">
                            Supporting Ghanaian farmers
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}