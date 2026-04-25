"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_CARDS = [
    { id: 1, src: "/images/kernel.jpeg", label: "Organic Gold" },
    { id: 2, src: "/images/smokeFish.png", label: "Pure Palm" },
    { id: 4, src: "/images/ginger.jpeg", label: "Smoked Fish" },
    { id: 3, src: "/images/cassava.jpeg", label: "Premium Nuts" },
    { id: 6, src: "/images/prekese.jpeg", label: "Natural Spices" },
    { id: 5, src: "/images/orange.jpeg", label: "Traditional" },
];

export default function HexagonHero() {
    const containerRef = useRef(null);
    const cardItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Ensure we are on client
        if (typeof window === "undefined") return;

        const ctx = gsap.context(() => {
            const vH = window.innerHeight;
            const vW = window.innerWidth;
            const isMobile = vW < 768;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%",
                    scrub: 1,
                    pin: true,
                    // CRITICAL: Helps prevent that "jump" or "scratch" on mobile
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // CALCULATE RADIUS: Pushing them widely to the corners
            const xRadius = isMobile ? vW * 0.45 : vW * 0.4;
            const yRadius = isMobile ? vH * 0.4 : vH * 0.42;

            // Hexagon point math (starting from top-right)
            cardItemsRef.current.forEach((card, i) => {
                if (!card) return;
                const angle = (i * 60 - 30) * (Math.PI / 180);
                const xPos = Math.cos(angle) * xRadius;
                const yPos = Math.sin(angle) * yRadius;

                tl.to(card, {
                    x: xPos,
                    y: yPos,
                    rotation: (i % 2 === 0 ? 8 : -8),
                    scale: isMobile ? 0.45 : 0.75,
                    opacity: 1, // Ensure they don't fade out and pop back
                    ease: "power2.inOut",
                }, 0);
            });

            // TEXT REVEAL: Bold and Centered
            tl.fromTo(".reveal-text",
                { opacity: 0, scale: 0.9, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6 },
                0.3
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-[#fdfdfd] overflow-hidden flex items-center justify-center touch-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >

            {/* BACKGROUND TEXT: Massive and Readable */}
            <div className="reveal-text absolute z-0 flex flex-col items-center justify-center text-center w-full px-6 select-none">
                <h1 className="text-[15vw] md:text-[11vw] font-[900] uppercase tracking-tighter leading-[0.8] text-black">
                    One Stop<br />
                    <span className="text-orange-600">Digital</span><br />
                    Library.
                </h1>
                <p className="mt-8 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-gray-400 max-w-sm">
                    Pure Ghanaian Harvests
                </p>
            </div>

            {/* FOREGROUND CARDS */}
            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                {PRODUCT_CARDS.map((card, i) => (
                    <div
                        key={card.id}
                        ref={(el) => { cardItemsRef.current[i] = el; }}
                        className="absolute w-[240px] h-[320px] md:w-[320px] md:h-[440px] pointer-events-auto shadow-2xl rounded-xl overflow-hidden bg-white will-change-transform"
                        style={{
                            zIndex: 20 + i,
                            // Start stacked perfectly in the center
                            transform: `rotate(${i * 1.5 - 3}deg)`
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={card.label}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ))}
            </div>

            {/* Subtle Bottom Branding */}
            <div className="absolute bottom-10 w-full text-center opacity-20 pointer-events-none">
                <p className="text-[10px] font-bold uppercase tracking-[1em]">Ama Organics</p>
            </div>
        </section>
    );
}