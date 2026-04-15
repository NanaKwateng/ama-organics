"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const sliderData = [
    {
        id: "fresh-harvest",
        category: "Fresh Harvest",
        title: "Fresh Soursop Fruits",
        description: "Experience the creamy texture and tangy-sweet profile of our sun-ripened soursop. Rich in antioxidants and Vitamin C, it's nature's ultimate immune booster.",
        image: "/images/soursop.jpeg",
    },
    {
        id: "livestock",
        category: "Livestock",
        title: "Livestock",
        description: "Ethically raised and pasture-fed. Our livestock program focuses on sustainable farming practices to provide the highest quality protein for your family.",
        image: "/images/goat.jpeg",
    },
    {
        id: "groundnut-paste",
        category: "Groundnut",
        title: "Groundnut Paste",
        description: "Slow-roasted and stone-ground to perfection. This rich, velvety paste contains no additives—just pure, protein-packed energy in every spoonful.",
        image: "/images/groundnut.jpeg",
    },
    {
        id: "pineapple-harvest",
        category: "Pineapple",
        title: "Pineapple",
        description: "Grown in tropical volcanic soil, our pineapples are famous for their golden color and intense sweetness. A perfect source of natural bromelain.",
        image: "/images/pineapple.jpeg",
    },
    {
        id: "premium-shrimps",
        category: "Shrimps",
        title: "Shrimps",
        description: "Sustainably sourced and flash-frozen to lock in oceanic freshness. These premium shrimps offer a delicate texture and sweet, briny flavor.",
        image: "/images/shrimps.jpeg",
    },
    {
        id: "fresh-mangoes",
        category: "Mango",
        title: "Fresh Mangoes",
        description: "The 'King of Fruits' in its finest form. Our mangoes are buttery, fiber-free, and bursting with tropical juices and essential Vitamin A.",
        image: "/images/mangoes.jpeg",
    },
    {
        id: "ripe-plantain",
        category: "Plantain",
        title: "Ripe plantain",
        description: "Naturally ripened to a perfect yellow-black peel. These plantains caramelize beautifully, offering a rich source of potassium and complex carbs.",
        image: "/images/plantain.jpeg",
    },
    {
        id: "natural-spices",
        category: "Spices",
        title: "Natural spices",
        description: "Unlock the aromatic secrets of our hand-selected spice blends. Sun-dried and carefully preserved to maintain their potent medicinal properties.",
        image: "/images/spices.jpeg",
    },
];

export default function OrganicSlider() {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);

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
            slideTo(index);
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-[#fafaf9] py-20 px-6 md:px-20 overflow-hidden font-sora select-none">
            <div className="max-w-[1440px] mx-auto">
                <div
                    ref={containerRef}
                    className="relative cursor-grab active:cursor-grabbing"
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchEnd={handleDragEnd}
                >
                    <div ref={trackRef} className="flex w-full space-x-8">
                        {sliderData.map((item, i) => (
                            <div
                                key={item.id}
                                className="w-full shrink-0 pr-0 md:pr-16"
                            >
                                <div
                                    className="perspective-1000 group"
                                    onMouseMove={(e) => onMouseMove(e, e.currentTarget as HTMLDivElement)}
                                    onMouseLeave={(e) => onMouseLeave(e.currentTarget as HTMLDivElement)}
                                >
                                    <figure className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-gray-200 pointer-events-none">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
                                            fill
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    </figure>
                                </div>

                                <div className="mt-12 md:mt-16 space-y-6 max-w-4xl">
                                    <div className="overflow-hidden">
                                        <p className="text-xs uppercase tracking-[0.4em] font-bold text-green-800">
                                            {item.category}
                                        </p>
                                    </div>

                                    <h3 className="text-xl md:text-3xl font-black text-black tracking-tighter leading-[0.9]">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm md:text-md text-gray-500 font-medium leading-relaxed max-w-2xl">
                                        {item.description}
                                    </p>

                                    {/* NAVIGATION BUTTON */}
                                    <Button
                                        variant="outline"
                                        className="mt-6 rounded-full border-zinc-300 px-8 py-6 text-lg hover:bg-black hover:text-white transition-all group"
                                        onClick={() => router.push(`/products?category=${item.id}`)}
                                    >
                                        Explore Variety
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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

            <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[30%] bg-green-100/40 blur-[120px] rounded-full -z-10" />
        </section>
    );
}