"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const CARDS = [
    { id: 1, img: "/images/product.png", title: "Pure Palm", video: "/videos/goats.mp4" },
    { id: 4, img: "/images/spices.jpeg", title: "Natural Spices" },
    { id: 2, img: "/images/smokeFish.png", title: "Smoked Fish" },
    { id: 3, img: "/images/prekese.jpeg", title: "Pure Red Palm Oil", video: "/videos/one.mp4" },
    { id: 5, img: "/images/kernel.jpeg", title: "Palm kernel oil" },
];

export default function EditorialHero() {
    const sceneRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2 } });

            tl.from(".hero-text-block", {
                opacity: 0,
                y: -20,
                filter: "blur(10px)",
            }, 0.2);

            // The staggered entrance from the depths
            tl.from(".stack-card", {
                z: -2000,
                x: 500,
                y: 200,
                opacity: 0,
                rotationY: -60,
                stagger: 0.1,
                duration: 2.5,
            }, 0.4);

            cardsRef.current.forEach((card) => {
                if (!card) return;
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, {
                        z: 150, // Pulls card toward camera
                        x: "+=20", // Slight offset for juice
                        rotateY: 0,
                        scale: 1.02,
                        duration: 0.6,
                        ease: "power3.out",
                        zIndex: 100
                    });
                });
                card.addEventListener("mouseleave", () => {
                    const originalX = card.dataset.x;
                    const originalZ = card.dataset.z;
                    const originalRotate = card.dataset.rotate;

                    gsap.to(card, {
                        x: originalX,
                        z: originalZ,
                        rotateY: originalRotate,
                        scale: 1,
                        duration: 0.6,
                        ease: "power3.out",
                        zIndex: card.dataset.index
                    });
                });
            });
        }, sceneRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={sceneRef} className="relative w-full h-screen bg-black overflow-hidden text-white py-8 font-sora"
            style={{ backgroundImage: "/images/bg.jpeg" }}
        >
            <div className="grain-overlay opacity-10 pointer-events-none" />

            <nav className="absolute top-0 w-full z-[100] flex justify-between items-center px-4 py-8 md:p-8">
                {/* <div className="text-xs tracking-tighter font-bold uppercase">Ama Organics®</div> */}
                <div className="hero-text-block max-w-lg py-5">
                    <p className="text-2xl uppercase text-gray-400 mb-2">Ama Organic Foods®</p>
                    <h2 className="text-md md:text-2xl font-medium leading-tight">
                        Sourced from carefully selected organic and natural foods, our premium foods are rich in natural nutrients and more..
                    </h2>
                </div>
            </nav>

            <div className="relative w-full h-full flex items-center justify-center [perspective:3000px] [transform-style:preserve-3d]">
                <div className="relative w-full max-w-6xl h-[60vh] flex items-center justify-center [transform-style:preserve-3d]">
                    {CARDS.map((card, i) => {
                        // THE STAIRCASE LOGIC
                        // We recede cards backward (negative Z) and shift them horizontally (X)
                        // to create a depth-heavy fan.
                        const rotateY = -35 + (i * 12);
                        const translateX = -350 + (i * 160);
                        const translateZ = (CARDS.length - i) * -500; // Higher index = further away
                        const translateY = (i * 50); // Subtle staircase height drop

                        return (
                            <div
                                key={card.id}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                data-rotate={rotateY}
                                data-x={translateX}
                                data-z={translateZ}
                                data-index={i}
                                className="stack-card absolute w-[300px] md:w-[450px] aspect-[10/12] rounded-sm overflow-hidden border border-white/5 bg-[#0a0a0a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] cursor-pointer transition-shadow hover:shadow-orange-500/10 py-12"
                                style={{
                                    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                                    zIndex: i,
                                }}
                            >
                                {card.video ? (
                                    <video
                                        src={card.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover grayscale-[0.2] contrast-125"
                                    />
                                ) : (
                                    <Image
                                        src={card.img}
                                        alt={card.title}
                                        fill
                                        priority
                                        className="object-cover grayscale-[0.2] contrast-125"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                                    <span className="text-[10px] uppercase tracking-widest text-orange-500 mb-1">0{i + 1}</span>
                                    <h3 className="text-sm font-bold uppercase tracking-tighter leading-none">{card.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <article className="absolute bottom-0 w-full px-10 md:px-20 z-[100] flex justify-between items-end">
                <div className="absolute bottom-0 md:bottom-10 left-5 md:left-10 text-[10px] font-bold tracking-tight uppercase origin-left -rotate-90">AMA ORGANIC FOODS</div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-3 px-8">
                    <div className="max-w-[150px]">
                        <p className="hidden md:block text-[10px] font-thin text-zinc-300 mb-2 uppercase tracking-tighter italic px-3">
                            "Let the flavor bow its head, let's do some cooking."
                        </p>
                        <div className="h-[1px] w-full bg-black/10" />
                    </div>
                    <div className="">
                        <span className="text-5xl font-semibold text-white">100%</span>
                        <p className="text-[10px] font-thin uppercase tracking-widest">Organic, Purely Natural </p>
                    </div>
                </div>
            </article>
        </main>
    );
}