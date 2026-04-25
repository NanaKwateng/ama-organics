"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_CARDS = [
    { id: 1, src: "/images/orange.jpeg", label: "Organic Orange" },
    { id: 2, src: "/images/peper-dry.jpeg", label: "Dried Pepper" },
    { id: 3, src: "/images/rice.jpeg", label: "Premium Rice" },
    { id: 4, src: "/images/cassava.jpeg", label: "Organic Cassava" },
    { id: 5, src: "/images/kernel.jpeg", label: "Kernel oil" },
    { id: 6, src: "/images/spices.jpeg", label: "Natural Spices" },
];

export default function HexagonHeroV2() {
    const containerRef = useRef<HTMLElement>(null);
    const cardItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%",
                    scrub: 1.5, // Slightly higher for more "weight"
                    pin: true,
                },
            });

            // RADIUS TWEAK: Increased to push cards to the far edges of the viewport
            const xRadius = isMobile ? window.innerWidth * 0.45 : window.innerWidth * 0.48;
            const yRadius = isMobile ? window.innerHeight * 0.40 : window.innerHeight * 0.45;

            cardItemsRef.current.forEach((card, i) => {
                if (!card) return;

                // Angle offset to ensure cards land in the "corners" of the screen
                const angle = (i * 60 - 30) * (Math.PI / 180);
                const xPos = Math.cos(angle) * xRadius;
                const yPos = Math.sin(angle) * yRadius;

                tl.to(card, {
                    x: xPos,
                    y: yPos,
                    // More aggressive rotation for the "editorial scatter" look
                    rotation: i % 2 === 0 ? 15 : -15,
                    scale: isMobile ? 0.4 : 0.6, // Smaller scale makes the center text pop
                    ease: "power3.inOut",
                }, 0);
            });

            // TEXT ANIMATION: Subtle zoom and fade-in
            tl.fromTo(".reveal-text",
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
                0.3
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-[#fcfcfc] overflow-hidden flex items-center justify-center">

            {/* BACKGROUND TEXT LAYER */}
            <div className="reveal-text absolute z-0 flex flex-col items-center justify-center text-center w-full px-4 select-none">
                <h1 className="text-4xl md:text-6xl font-[900] uppercase tracking-tighter leading-[0.8] text-black max-w-md">
                    One Stop<br />
                    <span className="text-orange-600">Digital</span><br />
                    Library.
                </h1>
                <p className="mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gray-400 max-w-md">
                    Organic Kitchen Essentials & Fresh Harvests
                </p>
                <div className="mt-10 h-[1px] w-20 bg-orange-600/30" />
            </div>

            {/* FOREGROUND CARD LAYER */}
            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                {PRODUCT_CARDS.map((card, i) => (
                    <div
                        key={card.id}
                        ref={(el) => { cardItemsRef.current[i] = el; }}
                        className="absolute w-[220px] h-[300px] md:w-[320px] md:h-[440px] pointer-events-auto shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden bg-white border border-white/20"
                        style={{
                            zIndex: 20 + i,
                            // Initial stack look: slight offset so they don't overlap perfectly
                            transform: `translate(${i * 2}px, ${i * -2}px) rotate(${i * 1.2}deg)`
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={card.label}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                            <p className="text-black text-xs font-black uppercase tracking-widest">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* UI Elements */}
            <div className="absolute top-8 left-8 hidden md:block">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-20">Ama Organics / v2.0</p>
            </div>
        </section>
    );
}
