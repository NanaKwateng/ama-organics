"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Leaf, ShieldCheck, Zap, Globe, ArrowRight, ArrowLeft, Beaker, Milk } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);

const FULL_MARKET_DATA: any = {
    "fresh-harvest": {
        label: "Fresh Harvest",
        name: "Fresh Soursop Fruits",
        scientificName: "Annona muricata",
        image: "/images/soursop.jpeg",
        description: "Experience the creamy texture and tangy-sweet profile of our sun-ripened soursop. Rich in antioxidants and Vitamin C, it's nature's ultimate immune booster.",
        benefits: [
            { icon: <ShieldCheck className="w-5 h-5 text-green-600" />, title: "Immune Support", detail: "High Vitamin C content for defense." },
            { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: "Energy Boost", detail: "Natural fructose for sustained vitality." }
        ],
        specs: { origin: "Tropical Orchards", season: "Year Round", texture: "Creamy", shelfLife: "3-5 Days" }
    },
    "livestock": {
        label: "Livestock",
        name: "Premium Livestock",
        scientificName: "Capra hircus / Bos taurus",
        image: "/images/goat.jpeg",
        description: "Ethically raised and pasture-fed. Our livestock program focuses on sustainable farming practices to provide the highest quality protein.",
        benefits: [
            { icon: <Milk className="w-5 h-5 text-blue-500" />, title: "Lean Protein", detail: "Essential for muscle growth and repair." },
            { icon: <ShieldCheck className="w-5 h-5 text-zinc-500" />, title: "Pesticide Free", detail: "Naturally grazed without harmful chemicals." }
        ],
        specs: { origin: "Green Pastures", season: "All Season", texture: "Tender", shelfLife: "Fresh" }
    },
    "groundnut-paste": {
        label: "Groundnut",
        name: "Organic Groundnut Paste",
        scientificName: "Arachis hypogaea",
        image: "/images/groundnut.jpeg",
        description: "Slow-roasted and stone-ground to perfection. This rich, velvety paste contains no additives—just pure, protein-packed energy.",
        benefits: [
            { icon: <Zap className="w-5 h-5 text-orange-500" />, title: "Healthy Fats", detail: "Rich in monounsaturated fatty acids." },
            { icon: <Leaf className="w-5 h-5 text-green-500" />, title: "Pure Organic", detail: "Zero additives or preservatives used." }
        ],
        specs: { origin: "Northern Plains", season: "Dry Season", texture: "Velvety", shelfLife: "6 Months" }
    },
    "natural-spices": {
        label: "Spices",
        name: "Natural Spices",
        scientificName: "Aromatic Blends",
        image: "/images/spices.jpeg",
        description: "Unlock the aromatic secrets of our hand-selected spice blends. Sun-dried and carefully preserved to maintain potent medicinal properties.",
        benefits: [
            { icon: <Beaker className="w-5 h-5 text-red-500" />, title: "Anti-Inflammatory", detail: "Helps reduce systemic inflammation." },
            { icon: <Globe className="w-5 h-5 text-blue-400" />, title: "Antioxidants", detail: "Rich in free-radical fighting compounds." }
        ],
        specs: { origin: "Coastal Farms", season: "Year Round", texture: "Fine Powder", shelfLife: "12 Months" }
    },
    "fresh-mangoes": {
        label: "Mango",
        name: "Sun-Dried Mangoes",
        scientificName: "Mangifera indica",
        image: "/images/mangoes.jpeg",
        description: "The 'King of Fruits' in its finest form. Our mangoes are buttery, fiber-free, and bursting with tropical juices.",
        benefits: [
            { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: "Vitamin A", detail: "Crucial for vision and skin health." },
            { icon: <ShieldCheck className="w-5 h-5 text-orange-400" />, title: "Fiber Rich", detail: "Supports healthy digestion." }
        ],
        specs: { origin: "Tropical Highlands", season: "Summer", texture: "Buttery", shelfLife: "5-7 Days" }
    }
};

export default function FoodVarietyDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contentRef = useRef(null);

    const initialCategory = searchParams.get("category") || "fresh-harvest";
    const [activeCatId, setActiveCatId] = useState(initialCategory);

    const activeItem = FULL_MARKET_DATA[activeCatId] || FULL_MARKET_DATA["fresh-harvest"];

    const handleSwitchCategory = (id: string) => {
        // Smooth scroll to top
        gsap.to(window, { duration: 0.6, scrollTo: 0, ease: "power4.inOut" });
        setActiveCatId(id);
        // Better Next.js practice for updating URL
        router.push(`?category=${id}`, { scroll: false });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".animate-text",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
            );
        }, contentRef);
        return () => ctx.revert();
    }, [activeCatId]);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
            <header className="py-3 px-6 md:px-20 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-zinc-100 transition-colors"
                        onClick={() => router.push("/")}
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Market
                    </Button>
                    <span className="text-zinc-200">|</span>
                    <Badge variant="outline" className="text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-zinc-50 border-zinc-200">
                        {activeItem.label}
                    </Badge>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 md:px-20" ref={contentRef}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="lg:sticky lg:top-32">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCatId}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="relative aspect-square rounded-[3rem] overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center p-12 rounded-2xl"
                            >
                                <Image
                                    src={activeItem.image}
                                    alt={activeItem.name}
                                    className="w-full h-full object-contain mix-blend-multiply absolute insert-0"
                                    fill
                                    preload

                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="space-y-12">
                        <div className="animate-text">
                            <p className="text-zinc-400 italic text-lg mb-2">{activeItem.scientificName}</p>
                            <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">{activeItem.name}</h2>
                        </div>

                        <p className="animate-text text-xl text-zinc-600 leading-relaxed font-light border-l-2 border-zinc-100 pl-6">
                            {activeItem.description}
                        </p>

                        <div className="space-y-8">
                            <h3 className="animate-text text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 border-b pb-4">Key Properties</h3>
                            <div className="grid gap-8">
                                {activeItem.benefits.map((benefit: any, idx: number) => (
                                    <div key={idx} className="animate-text flex gap-6">
                                        <div className="mt-1 w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 mb-1">{benefit.title}</h4>
                                            <p className="text-zinc-500 leading-relaxed text-sm">{benefit.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-text grid grid-cols-2 gap-y-8 pt-10 border-t border-zinc-100">
                            {Object.entries(activeItem.specs).map(([key, value]: [string, any]) => (
                                <div key={key}>
                                    <p className="text-[11px] font-bold uppercase text-zinc-300 mb-1 tracking-widest">{key}</p>
                                    <p className="text-sm font-medium">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <section className="bg-zinc-950 text-white py-24 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Discover More</p>
                            <h3 className="text-4xl font-light italic">Market Varieties</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {Object.keys(FULL_MARKET_DATA)
                            .filter(key => key !== activeCatId)
                            .slice(0, 3)
                            .map((key) => (
                                <div
                                    key={key}
                                    className="group cursor-pointer"
                                    onClick={() => handleSwitchCategory(key)}
                                >
                                    <figure className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all duration-500">
                                        <Image
                                            src={FULL_MARKET_DATA[key].image}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            alt={FULL_MARKET_DATA[key].name}
                                            fill
                                            priority
                                        />
                                    </figure>
                                    <h4 className="text-xl font-light flex items-center gap-3">
                                        {FULL_MARKET_DATA[key].name}
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </h4>
                                    <p className="text-zinc-500 text-sm mt-2">{FULL_MARKET_DATA[key].label}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}