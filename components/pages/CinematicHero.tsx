"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function CinematiclHero() {
    const containerRef = useRef(null);
    const bottleRef = useRef(null);
    const bgTextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // INSTANT ENTRANCE: No blank screen. Elements slide into their "Lookbook" positions.
            const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

            tl.from(".line-reveal", { yPercent: 100, stagger: 0.1, opacity: 0 })
                .from(bottleRef.current, {
                    scale: 1.5,
                    y: 100,
                    rotate: 15,
                    opacity: 0,
                    filter: "blur(10px)"
                }, "-=1")
                .from(bgTextRef.current, { x: -100, opacity: 0 }, "-=1.2")
                .from(".corner-ui", { opacity: 0, stagger: 0.05 }, "-=1");

            // SCROLL PARALLAX: Subtle depth as the user starts to move
            gsap.to(bgTextRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    scrub: true
                },
                x: 150,
                opacity: 0.02
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black text-white overflow-hidden select-none pt-8">
            {/* CORNER UI (The Deskrisk Blueprint) */}
            {/* <div className="corner-ui absolute bottom-10 left-10 text-[10px] font-bold tracking-widest uppercase origin-left -rotate-90">AMA ORGANIC FOODS</div> */}

            {/* LAYER 1: THE BACKGROUND DEPTH (Behind Product) */}
            <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-[35vw] font-black text-black/20 leading-none tracking-tighter">
                    PALM
                </h2>
            </div>

            {/* LAYER 2: THE PRODUCT (The Anchor) */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div ref={bottleRef} className="relative w-[90vw] md:w-[600px] h-[112vh] drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]">
                    <Image
                        src="/images/product.png"
                        alt="Ama Palm Oil"
                        fill
                        priority
                        className="object-contain -rotate-6"
                    />
                </div>
            </div>

            {/* LAYER 3: THE CONTENT (In Front) */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 md:p-24 pointer-events-none">
                <div className="max-w-md">
                    <div className="overflow-hidden">
                        <h1 className="line-reveal text-4xl mt-8 md:text-8xl font-black leading-[0.85] tracking-tighter text-[#1a1a1a]">
                            PURE.<br />RICH.<br /><span className="text-orange-900">ORGANIC.</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mt-8">
                        <p className="line-reveal text-sm md:text-base text-gray-500 font-medium max-w-xs leading-relaxed">
                            This product alerts the senses to the heritage of Ghanaian groves.
                            Sustainably sourced, nutrient-dense, and cold-pressed.
                        </p>
                    </div>
                </div>

                {/* BOTTOM UI: Product Specs */}
                <div className="flex justify-between items-end">
                    <div className="max-w-[150px]">
                        <p className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-tighter italic px-3">
                            "Let the flavor bow its head, let's do some cooking."
                        </p>
                        <div className="h-[1px] w-full bg-black/10" />
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-black text-black">01</span>
                        <p className="text-[10px] font-bold uppercase tracking-widest">Master Product</p>
                    </div>
                </div>
            </div>
        </section>
    );
}