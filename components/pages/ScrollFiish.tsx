"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function LusionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgPathRef = useRef<SVGPathElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. SVG Drawing Animation
            // We animate the strokeDashoffset to "draw" the coil as we scroll
            gsap.fromTo(
                svgPathRef.current,
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                    },
                }
            );

            // 2. Video Container Morphing (The "MacBook" expansion)
            gsap.to(videoContainerRef.current, {
                width: "70%",
                height: "70vh",
                borderRadius: "10px",
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: ".reel-section",
                    start: "top 20%",
                    end: "bottom 80%",
                    scrub: true,
                },
            });

            // 3. Text Stagger Reveal
            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                scrollTrigger: {
                    trigger: ".second-section",
                    start: "top 70%",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative bg-white text-black overflow-x-hidden">

            {/* Background SVG Coil Path */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg viewBox="0 0 1000 1000" className="w-full h-full opacity-20">
                    <path
                        ref={svgPathRef}
                        d="M-50,200 C200,100 400,600 100,800 C-200,1000 800,900 1100,500"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="16"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* SECTION 1: HERO */}
            <section className="relative h-screen flex flex-col items-start justify-center px-6 z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full space-y-20"
                >
                    <h2 className="text-4xl md:text-6xl text-left leading-[0.9] font-bold tracking-tight">
                        Returning to the <br />Roots of Good Food.
                    </h2>

                    <p className="max-w-md text-right ml-auto reveal-text text-lg font-light text-gray-800">
                        At Ama Organics, we believe that the best ingredients aren&apos;t made in a lab—they are grown in the rich soils, and perfected by tradition. We bring the farm, the coast, and the forest directly to your kitchen.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 2: CONTENT REVEAL */}
            <section className="second-section relative min-h-[50vh] grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-10 z-10">
                <div className="flex justify-center">
                    {/* The morphing origin point */}
                    <div
                        ref={videoContainerRef}
                        className="w-100 h-100 bg-blue-200 rounded-3xl overflow-hidden shadow-md relative cursor-pointer group border-5"
                    >
                        <Image
                            src="/images/smokeFish.png"
                            alt="Project"
                            className="w-full h-full object-cover"
                            fill
                            priority
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase text-xs tracking-widest shadow-lg">
                                <div className="w-2 h-2 bg-black rounded-full" /> Our Approach
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-md space-y-6">
                    <p className="reveal-text text-lg text-black font-medium">
                        Ama Organics was born out of a simple need: the desire for food that is as honest as it is flavorful. In a world of additives and over-processing, we went back to the basics.
                    </p>
                </div>
            </section>

            {/* SECTION 3: PLAY REEL (The Expanded State) */}
            <section className="reel-section relative h-screen flex items-center justify-center z-20">

                <div className="relative w-full max-w-6xl min-h-[60vh] border rounded-2xl overflow-hidden">
                    <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover" src="/videos/cook.mp4" />
                </div>

            </section>
        </div>
    );
}