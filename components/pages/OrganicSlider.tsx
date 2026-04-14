"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const sliderData = [
    {
        id: 1,
        category: "Fresh Harvest",
        title: "Fresh Soursop Fruits",
        description: "Earth-grown and pesticide-free. These carrots are harvested at peak sweetness to ensure maximum nutrient density.",
        image: "/images/soursop.jpeg",
    },
    {
        id: 2,
        category: "livestock",
        title: "Livestock",
        description: "The Swiss Cheese plant is a masterpiece of natural architecture, perfect for purifying indoor air and adding lush texture.",
        image: "/images/goat.jpeg",
    },
    {
        id: 3,
        category: "groundnut",
        title: "Groundnut Paste",
        description: "Bursting with spolyphenols and deep pigments, our wild-foraged berries are the ultimate skin-defense superfood.",
        image: "/images/groundnut.jpeg",
    },
    {
        id: 4,
        category: "pineapple",
        title: "Pineapple",
        description: "Bursting with spolyphenols and deep pigments, our wild-foraged berries are the ultimate skin-defense superfood.",
        image: "/images/pineapple.jpeg",
    },
    {
        id: 5,
        category: "shrimps",
        title: "Shrimps",
        description: "Bursting with spolyphenols and deep pigments, our wild-foraged berries are the ultimate skin-defense superfood.",
        image: "/images/shrimps.jpeg",
    },
    {
        id: 6,
        category: "mango",
        title: "Fresh Mangoes",
        description: "Bursting with spolyphenols and deep pigments, our wild-foraged berries are the ultimate skin-defense superfood.",
        image: "/images/mangoes.jpeg",
    },
    {
        id: 7,
        category: "plantain",
        title: "Ripe plantain",
        description: "Bursting with spolyphenols and deep pigments, our wild-foraged berries are the ultimate skin-defense superfood.",
        image: "/images/plantain.jpeg",
    },
    {
        id: 8,
        category: "spices",
        title: "Natural spices",
        description: "Bursting with spolyphenols and deep pigments, our wild-foraged berries are the ultimate skin-defense superfood.",
        image: "/images/spices.jpeg",
    },

];

export default function OrganicSlider() {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentX = useRef(0);

    // --- SLIDE LOGIC ---
    const slideTo = useCallback((newIndex: number) => {
        setIndex(newIndex);
        gsap.to(trackRef.current, {
            x: `-${newIndex * 100}%`,
            duration: 0.8,
            ease: "expo.out",
        });
    }, []);

    const handleNext = () => index < sliderData.length - 1 && slideTo(index + 1);
    const handlePrev = () => index > 0 && slideTo(index - 1);

    // --- TILT EFFECT ---
    const onMouseMove = (e: React.MouseEvent, elRef: HTMLDivElement) => {
        const { left, top, width, height } = elRef.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(elRef, {
            rotateY: x * 10,
            rotateX: -y * 10,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const onMouseLeave = (elRef: HTMLDivElement) => {
        gsap.to(elRef, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    // --- DRAG LOGIC ---
    const handleDragStart = (e: any) => {
        isDragging.current = true;
        startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    };

    const handleDragEnd = (e: any) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
        const diff = startX.current - endX;

        if (Math.abs(diff) > 100) {
            if (diff > 0) handleNext();
            else handlePrev();
        } else {
            slideTo(index); // Snap back
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-[#fafaf9] py-20 px-6 md:px-20 overflow-hidden font-sora select-none">
            <div className="max-w-[1440px] mx-auto">

                {/* Slider Track Container */}
                <div
                    ref={containerRef}
                    className="relative cursor-grab active:cursor-grabbing"
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchEnd={handleDragEnd}
                >
                    <div ref={trackRef} className="flex w-full">
                        {sliderData.map((item, i) => (
                            <div
                                key={item.id}
                                className="w-full shrink-0 pr-0 md:pr-16 space-x-8"
                            >
                                {/* 1. HERO IMAGE (With Tilt) */}
                                <div
                                    className="perspective-1000 group"
                                    onMouseMove={(e) => onMouseMove(e, e.currentTarget as HTMLDivElement)}
                                    onMouseLeave={(e) => onMouseLeave(e.currentTarget as HTMLDivElement)}
                                >
                                    <div className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-gray-200 pointer-events-none">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
                                            fill
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                </div>

                                {/* 2. TEXT CONTENT (Beneath) */}
                                <div className="mt-12 md:mt-16 space-y-6 max-w-4xl">
                                    <div className="overflow-hidden">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-green-800 translate-y-full animate-in slide-in-from-bottom duration-700">
                                            {item.category}
                                        </p>
                                    </div>

                                    <h3 className="text-md md:text-2xl font-black text-black tracking-tighter leading-[0.9]">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- CONTROLS: BOTTOM RIGHT --- */}
                <div className="flex items-center justify-end mt-12 md:mt-0 md:absolute md:bottom-20 md:right-20 gap-4 z-50">
                    <div className="mr-8 font-bold text-sm tracking-widest text-gray-300">
                        <span className="text-black">0{index + 1}</span> / 0{sliderData.length}
                    </div>

                    <button
                        onClick={handlePrev}
                        disabled={index === 0}
                        className={`group p-2 md:p-5 rounded-full border transition-all duration-500 ${index === 0
                            ? "border-black text-black cursor-not-allowed"
                            : "border-gray-200 text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 shadow-xl shadow-black/5"
                            }`}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={index === sliderData.length - 1}
                        className={`group p-2 md:p-5 rounded-full border transition-all duration-500 ${index === sliderData.length - 1
                            ? "border-black text-black cursor-not-allowed"
                            : "border-gray-200 text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 shadow-xl shadow-black/5"
                            }`}
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>

            </div>

            {/* Background Decor */}
            <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[30%] bg-green-100/40 blur-[120px] rounded-full -z-10" />
        </section>
    );
}