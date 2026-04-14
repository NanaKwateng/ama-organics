"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GiCook, GiHealthNormal } from "react-icons/gi";
import { MdEco, MdVerifiedUser, MdOutlineHighQuality } from "react-icons/md";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const benefitsData = [
    {
        id: "eco",
        title: "Eco-Conscious Harvesting",
        description: "Our palm oil is more than just a commodity; it's a commitment. By utilizing RSPO-certified sustainable practices, we protect the rainforests and provide a habitat for wildlife to thrive.",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVhdmVzfGVufDB8fDB8fHww",
        icon: <MdEco />,
        tag: "Sustainability"
    },
    {
        id: "culinary",
        title: "Superior Culinary Texture",
        description: "Renowned by world-class chefs for its incredible stability. With a high smoke point of 232°C, it’s perfect for frying, creating the ultimate smooth texture in baked goods.",
        mediaType: "video",
        mediaUrl: "/videos/cook.mp4",
        icon: <GiCook />,
        tag: "Chef Grade"
    },
    {
        id: "health",
        title: "Antioxidant Rich Vitality",
        description: "Fuel your body with a natural source of Vitamin E and Carotenoids. Our cold-pressed process preserves vital nutrients, supporting cardiovascular health and energy.",
        mediaType: "image",
        mediaUrl: "/images/fruit.jpeg",
        icon: <GiHealthNormal />,
        tag: "Clean Label"
    }
];

const PalmBenefits = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const laptopRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const texts = gsap.utils.toArray(".benefit-text-item");
            const medias = gsap.utils.toArray(".laptop-media-item");

            // Create a master timeline for the scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%", // Length of the scroll experience
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // Animate through each benefit
            texts.forEach((text: any, i: number) => {
                // Fade in text and media
                tl.to(text, { opacity: 1, y: 0, duration: 1 }, i === 0 ? 0 : ">")
                    .to(medias[i] as HTMLElement, { opacity: 1, scale: 1, duration: 1 }, "<");

                // If it's not the last item, fade it out before the next one comes in
                if (i < texts.length - 1) {
                    tl.to(text, { opacity: 0, y: -20, duration: 1 }, "+=1")
                        .to(medias[i] as HTMLElement, { opacity: 0, scale: 1.1, duration: 1 }, "<");
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-screen w-full">

                {/* MACBOOK SIDE: Top on mobile, Left on Desktop */}
                <div
                    ref={laptopRef}
                    className="w-full lg:w-[70%] h-[50vh] lg:h-screen flex items-center justify-center p-6 lg:p-12 z-20"
                >
                    <div className="relative w-full max-w-[1100px]">
                        {/* The Mockup */}
                        <div className="relative bg-[#080808] rounded-[2rem] lg:rounded-[2.5rem] p-[8px] lg:p-[12px] shadow-2xl border border-white/10 overflow-hidden">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] lg:rounded-[1.8rem] bg-black">

                                {/* macOS UI Header */}
                                <div className="absolute top-0 left-0 w-full h-6 lg:h-8 bg-black/20 backdrop-blur-xl z-30 flex items-center px-5 justify-between rounded-tr-[1.5rem] rounded-tl-[1.5rem]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                    </div>
                                    <div className="text-[9px] lg:text-[11px] text-white/30 font-medium uppercase tracking-tighter">Palm Intelligence</div>
                                    <div className="w-10" />
                                </div>

                                {/* Media Stack */}
                                {benefitsData.map((benefit, idx) => (
                                    <div
                                        key={`media-${benefit.id}`}
                                        className="laptop-media-item absolute inset-0 opacity-0 scale-110 pointer-events-none transition-transform duration-500"
                                        style={{ zIndex: idx + 1 }}
                                    >
                                        {benefit.mediaType === "video" ? (
                                            <video src={benefit.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover brightness-75" />
                                        ) : (
                                            <img src={benefit.mediaUrl} alt={benefit.title} className="w-full h-full object-cover brightness-75" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-white/5" />
                                    </div>
                                ))}

                                {/* MacBook Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 lg:w-36 h-5 lg:h-7 bg-black rounded-b-2xl z-40" />
                            </div>
                        </div>
                        {/* Hinge Detail */}
                        <div className="relative -mt-1 mx-auto w-[101%] h-3 lg:h-5 bg-[#1a1a1a] rounded-b-2xl shadow-xl border-t border-white/5" />
                    </div>
                </div>

                {/* TEXT SIDE: Bottom on mobile, Right on Desktop */}
                <div ref={textContainerRef} className="w-full lg:w-[30%] px-8 lg:pr-20 relative h-[50vh] lg:h-screen">
                    <div className="relative w-full h-full">
                        {benefitsData.map((benefit) => (
                            <div
                                key={`text-${benefit.id}`}
                                className="benefit-text-item absolute inset-0 flex flex-col justify-center opacity-0 translate-y-10"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg text-xl">
                                        {benefit.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
                                        {benefit.tag}
                                    </span>
                                </div>

                                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
                                    {benefit.title}
                                </h2>

                                <p className="text-sm lg:text-base text-gray-500 leading-relaxed mb-8">
                                    {benefit.description}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                        <MdOutlineHighQuality className="text-green-500 text-lg" /> Premium Grade
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                        <MdVerifiedUser className="text-blue-500 text-lg" /> Certified Sustainable
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PalmBenefits;