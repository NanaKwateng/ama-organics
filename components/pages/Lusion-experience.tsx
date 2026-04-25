"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, ArrowUpRight, Plus, PlusIcon } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LusionExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgPathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        // 1. The Draw Animation
        // Increased the strokeDash values to 3500 to account for the rounder, longer loops
        gsap.fromTo(
            svgPathRef.current,
            { strokeDashoffset: 3500, strokeDasharray: 3500 },
            {
                strokeDashoffset: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // Starts drawing the moment the hero is visible
                    end: "bottom bottom", // Ends exactly at the bottom of the last section
                    scrub: 1.2,
                },
            }
        );

        gsap.from(".bottom-reveal", {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: ".bottom-trigger",
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-black text-white overflow-x-hidden font-sora relative">

            {/* THE GUIDING SVG - Now with "Much Rounder" Cubic Bézier Path */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 3000" // Increased height to ensure a full journey
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path
                        ref={svgPathRef}
                        /* M = Start at Hero
                           C = Cubic Bezier (ControlPoint1, ControlPoint2, EndPoint)
                           These coordinates create deep, circular sweeps across the x-axis
                        */
                        d="M 100 150 
               C 900 150 900 600 500 800 
               C 100 1000 100 1400 900 1600 
               C 1100 1900 100 2100 300 2400 
               C 500 2700 900 2700 850 2950"
                        stroke="#4b68ff"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* SECTION 1: HERO */}
            <section className="h-screen flex flex-col justify-center px-6 md:px-20 relative z-10">
                <h1 className="text-[10vw] md:text-[5vw] font-medium leading-[0.9] tracking-tight text-white">
                    Experience the <span className="text-orange-500">best</span>  of <br /> <span className="italic border-b">Smoked Fish.</span>

                </h1>
            </section>

            {/* SECTION 2: THE VIDEO EXPERIENCE */}
            <section className="relative min-h-screen px-6 md:px-20 py-20 z-20">
                <div className="max-w-6xl mx-auto relative h-[600px] md:h-auto group">
                    <div className="absolute -inset-4 border border-white/10 pointer-events-none z-30" />
                    <div className="absolute -top-4 -left-4 w-1.5 h-1.5 bg-white z-40" />
                    <div className="absolute -top-4 -right-4 w-1.5 h-1.5 bg-white z-40" />
                    <div className="absolute -bottom-4 -left-4 w-1.5 h-1.5 bg-white z-40" />
                    <div className="absolute -bottom-4 -right-4 w-1.5 h-1.5 bg-white z-40" />

                    <div className="relative w-full h-full aspect-video bg-zinc-900 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(75,104,255,0.1)]">
                        <video
                            src="/videos/smoke-fish.mp4"
                            autoPlay loop muted playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#4b68ff] font-bold">From the Coast to Your Kitchen</p>
                                    <h4 className="text-lg font-medium">Authentic Ghanaian <br /> Smoked Fish</h4>
                                </div>
                                <div className="text-[10px] font-mono opacity-40">[ REC ]</div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md pointer-events-auto cursor-pointer hover:bg-[#4b68ff] hover:border-[#4b68ff] transition-all duration-500">
                                    <Play fill="white" size={20} className="ml-1" />
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex gap-8">
                                    <div><p className="text-[8px] opacity-40 uppercase mb-1">Timecode</p><p className="text-[10px] font-mono">00:12:44:02</p></div>
                                    <div><p className="text-[8px] opacity-40 uppercase mb-1">Status</p><p className="text-[10px] font-mono text-[#4b68ff]">Smokey</p></div>
                                </div>
                                <Plus size={16} className="opacity-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: BOTTOM TEXT */}
            <section className="relative min-h-screen px-6 md:px-20 py-40 z-10 bottom-trigger">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-start-6 md:col-span-6 space-y-8">

                        <div className="flex gap-4">
                            <span className=" text-white">
                                <PlusIcon size={24} color="white" className="animate-spin" />
                            </span>
                            <p className="bottom-reveal text-2xl md:text-4xl font-light leading-tight text-zinc-300">
                                Traditionally cured over <span className="text-orange-300 font-medium">natural hardwoods</span> for that deep, smoky aroma and firm texture you love.   <span className="text-orange-300 font-medium">Clean, grit-free, and ready</span> for your favorite soups and other meals.
                            </p>
                        </div>
                        <div className="bottom-reveal pt-8">
                            <Link href={"/contact"}>

                                <button className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#4b68ff] group-hover:border-[#4b68ff] transition-all duration-500">
                                        <ArrowUpRight size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Want an order?</p>
                                        <p className="text-sm font-bold uppercase tracking-widest">Get in touch</p>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}