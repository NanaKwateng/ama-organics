"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const aboutData = [
    { heading: "Rooted in Purity", sub: "01 / Philosophy", content: "We believe the best ingredients aren’t made in a lab—they are grown in Ghana’s rich soil. Our philosophy is to keep food raw, honest, and free from artificial additives." },
    { heading: "Small-Batch Quality", sub: "02 / Standard", content: "From deep red palm oil to hardwood-smoked fish, we eliminate shortcuts. Every batch is meticulously processed to ensure it is nutrient-dense and grit-free." },
    { heading: "Ghanaian Legacy", sub: "03 / Heritage", content: "We serve as a bridge between traditional craftsmanship and the modern kitchen. We preserve the authentic flavors of our home while supporting local fishing and farming communities." },
    { heading: "Nationwide Access", sub: "04 / Logistics", content: "Purity should have no boundaries. We’ve built a robust delivery network that brings the premium taste of Ama Organics from our farms to your doorstep, anywhere in Ghana." },
    { heading: "Community Growth", sub: "05 / Impact", content: "Your health and our farmers' wealth are connected. By sourcing directly, we ensure fair prices for producers and superior organic quality for every household we serve." },
    { heading: "Future of Food", sub: "06 / Vision", content: "We are redefining the Ghanaian pantry. Our vision is to become the gold standard for organic staples, making healthy, traditional eating the easiest choice for everyone." },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray(".about-slide");

        // The core fix: get the exact scrollable distance
        // We need to move the track by its total width minus the visible screen width
        const getScrollDistance = () => {
            if (!horizontalRef.current) return 0;
            return horizontalRef.current.scrollWidth - window.innerWidth;
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                start: "top top",
                // "end" dictates how much the user has to scroll vertically
                // Setting it to 3x the width ensures the user has enough 'room' to see items 5 & 6
                end: () => `+=${horizontalRef.current?.scrollWidth}`,
                scrub: 1.2,
                invalidateOnRefresh: true,
            },
        });

        // Animate the horizontal track
        tl.to(horizontalRef.current, {
            x: () => -getScrollDistance(),
            ease: "none",
        });

        // Individual item animations tied to the horizontal move
        sections.forEach((section: any) => {
            const heading = section.querySelector("h2");
            const content = section.querySelector(".content-p");

            gsap.fromTo(
                [heading, content],
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: tl, // Important: links it to the timeline above
                        start: "left 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Parallax for video
        gsap.to(videoRef.current, {
            scale: 1.15,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="relative h-screen overflow-hidden bg-black font-sora">

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover opacity-50"
                    src="/videos/about-bg.mp4"
                />
            </div>

            {/* Liquid Glass & Textures */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Image
                    src="/images/liquid-glass.jpeg"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen backdrop-blur-[80px]"
                    alt="glassy look"
                    width={100}
                    height={100}
                    priority
                />
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/images/noise.svg')]" />
            </div>

            {/* Horizontal Track */}
            <div
                ref={horizontalRef}
                className="relative z-20 flex h-full w-fit items-center px-[10vw]"
            >
                {aboutData.map((item, index) => (
                    <div
                        key={index}
                        className="about-slide w-[80vw] md:w-[60vw] mr-[15vw] flex flex-col justify-center shrink-0"
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] text-[#4b68ff] font-bold mb-6">
                            {item.sub}
                        </span>

                        <h2 className="text-[10vw] md:text-[7vw] font-medium leading-[0.9] tracking-tighter text-white mb-8">
                            {item.heading}
                        </h2>

                        <p className="content-p text-lg md:text-2xl font-light text-zinc-400 max-w-xl leading-relaxed">
                            {item.content}
                        </p>
                    </div>
                ))}

                {/* Extra spacer at the end to ensure the 6th item is fully centered before unpinning */}
                <div className="w-[40vw] shrink-0" />
            </div>

            {/* Bottom UI */}
            <div className="absolute bottom-12 left-12 z-30 flex items-center gap-6">
                <div className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                    Keep Scrolling
                </div>
                <div className="w-16 h-[1px] bg-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#4b68ff] animate-pulse" />
                </div>
            </div>
        </main>
    );
}