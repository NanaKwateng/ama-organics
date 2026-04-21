"use client";
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Leaf, Droplets, Nut, Fish, Wheat } from "lucide-react";
import Image from "next/image";

// --- Data Structure with local file support ---
const cardData = [
    {
        id: 1,
        category: "Staples",
        title: "Cereals & Grains",
        description: "Ghanaian white maize and aromatic rice, harvested at peak nutrition.",
        tag: "Pure Harvest",
        type: "video",
        src: "/videos/grains.mp4", // Local path
        icon: <Wheat size={20} />,
        className: "md:col-span-2 md:row-span-1",
    },
    {
        id: 2,
        category: "Essential",
        title: "Organic Oils",
        description: "Rich, grit-free red palm oil for authentic flavor.",
        tag: "Small-Batch",
        type: "image",
        src: "/images/kernel.jpeg", // Local path
        icon: <Droplets size={20} />,
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 3,
        category: "Nature",
        title: "Nuts & Spices",
        description: "Perfect groudnuts and sun-dried natural spices spices from local farms.",
        tag: "Organic",
        type: "image",
        src: "/images/spices.jpeg", // Local path
        icon: <Nut size={20} />,
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 4,
        category: "Fresh",
        title: "Proteins",
        description: "Hardwood-smoked fish and lean cuts, processed with care.",
        tag: "High Protein",
        type: "video",
        src: "/videos/goats.mp4", // Local path
        icon: <Fish size={20} />,
        className: "md:col-span-2 md:row-span-1",
    },
    {
        id: 5,
        category: "Vibrant",
        title: "Fruits & Veggies",
        description: "Sun-ripened produce delivered straight to your doorstep.",
        tag: "Garden Fresh",
        type: "image",
        src: "/images/orange.jpeg", // Local path
        icon: <Leaf size={20} />,
        className: "md:col-span-3 md:row-span-1",
    },
];

const Card = ({ item }: { item: typeof cardData[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(cardRef.current, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.6,
            ease: "power2.out",
        });

        // Subtle parallax for the media background
        gsap.to(mediaRef.current, {
            x: x * 20,
            y: y * 20,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    const onMouseLeave = () => {
        gsap.to([cardRef.current, mediaRef.current], {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
        });
    };

    return (
        <div
            className={`perspective-1000 w-full ${item.className}`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div
                ref={cardRef}
                className="relative h-full min-h-[400px] w-full bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden group"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Media Background Layer */}
                <div ref={mediaRef} className="absolute inset-0 z-0 scale-110 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                    {item.type === "video" ? (
                        <video
                            src={item.src}
                            autoPlay loop muted playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Top Content */}
                <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <span className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-[#4b68ff]">
                                {item.icon}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50">
                                {item.category}
                            </span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-tighter text-white/70 border border-white/5">
                            {item.tag}
                        </div>
                    </div>
                    <h3 className="text-4xl font-medium tracking-tighter text-white leading-none mb-4">
                        {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px]">
                        {item.description}
                    </p>
                </div>

                {/* Explore Button */}
                <div className="relative z-10 pt-6" style={{ transform: "translateZ(20px)" }}>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#4b68ff] hover:text-white transition-colors duration-300"
                    >
                        Explore Products
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function ProductCard() {
    return (
        <section className="bg-black min-h-screen py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-20 space-y-4">
                    <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-white leading-none">
                        Our Natural <br /> Categories.
                    </h2>
                    <p className="text-zinc-500 text-xl font-light max-w-lg">
                        Sourcing the finest organic staples from the fertile soils of Ghana.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {cardData.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}