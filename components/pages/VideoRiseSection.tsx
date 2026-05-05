"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CgArrowTopRight } from "react-icons/cg";
import { Button } from "../ui/button";
import { Play, Plus } from "lucide-react";

export default function VideoRiseSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax Transitions
    const textY = useTransform(smoothProgress, [0, 0.45, 1], ["100vh", "0vh", "-15vh"]);
    const videoOpacity = useTransform(smoothProgress, [0.1, 0.4], [1, 0]);
    const overlayBg = useTransform(smoothProgress, [0.1, 0.4], ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]);

    // High-end Reveal timing
    const detailOpacity = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);
    const sidebarX = useTransform(smoothProgress, [0.5, 0.7], [-50, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* --- Background Media (Optional/Commented) --- */}
                {/* 
                <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0 z-0 w-full h-screen">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/images/product.png"
                        className="h-screen w-full rounded-2xl"
                    >
                        <source src="/videos/cook.mp4" type="video/mp4" />
                    </video>
                </motion.div> 
                */}

                <div className="max-w-6xl mx-auto relative h-full flex items-center justify-center group px-4">
                    {/* Decorative Borders */}
                    <div className="absolute inset-4 border border-white/10 pointer-events-none z-30" />
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white z-40" />
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white z-40" />
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white z-40" />
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white z-40" />

                    <div className="relative w-full aspect-3/4 lg:aspect-video bg-zinc-900 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(75,104,255,0.1)]">
                        <video
                            src="/videos/cook.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            poster="/images/product.png"
                        />

                        {/* UI Overlay Elements */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#4b68ff] font-bold">Enjoy cooking with pure flavor</p>
                                    <h4 className="text-lg font-medium text-white">Experience the freshness of palm oil</h4>
                                </div>
                                <div className="text-[10px] font-mono text-white opacity-40">[ REC ]</div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md pointer-events-auto cursor-pointer hover:bg-[#4b68ff] hover:border-[#4b68ff] transition-all duration-500">
                                    <Play fill="white" size={20} className="ml-1 text-white" />
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex gap-8 text-white">
                                    <div><p className="text-[8px] opacity-40 uppercase mb-1">Timecode</p><p className="text-[10px] font-mono">00:12:44:02</p></div>
                                    <div><p className="text-[8px] opacity-40 uppercase mb-1">Status</p><p className="text-[10px] font-mono text-[#4b68ff]">Flavor</p></div>
                                </div>
                                <Plus size={16} className="opacity-40 text-white" />
                            </div>
                        </div>

                        {/* --- Cinematic Dimmer --- */}
                        <motion.div style={{ backgroundColor: overlayBg }} className="absolute inset-0 z-10 pointer-events-none" />

                        {/* --- Primary Parallax Word --- */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <motion.h2
                                style={{ y: textY }}
                                className="text-[18vw] font-black text-white tracking-tighter leading-none select-none"
                            >
                                organic<span className="text-orange-600">.</span>
                            </motion.h2 >
                        </div>

                        {/* --- Luxury Editorial Overlays --- */}
                        <motion.div
                            style={{ opacity: detailOpacity }}
                            className="absolute inset-0 z-30 h-full w-full p-8 md:p-16 flex flex-col justify-between bg-black/40 backdrop-blur-sm"
                        >
                            {/* Top Row: Meta Data */}
                            <div className="flex justify-between items-start">
                                <motion.div style={{ x: sidebarX }} className="space-y-1">
                                    <p className="text-[12px] tracking-tight text-orange-600 font-bold">Ama Organics</p>
                                    <p className="text-xs text-[#86868b] font-medium">West African Coastline</p>
                                </motion.div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-orange-600 font-bold">Purity</p>
                                    <p className="text-xs text-[#86868b] font-medium">100% Cold Pressed</p>
                                </div>
                            </div>

                            {/* Bottom Content: Asymmetric Layout */}
                            <div className="grid grid-cols-12 gap-6 items-end">
                                <div className="col-span-12 md:col-span-5 space-y-3">
                                    <h3 className="text-xl md:text-2xl font-black text-white leading-[0.9] tracking-tighter">
                                        RAW. <br />
                                        RESTORATIVE. <br />
                                        <span className="text-[#86868b]">UNREFINED.</span>
                                    </h3>
                                    <div className="w-12 h-[2px] bg-orange-600" />
                                </div>

                                <div className="col-span-12 md:col-span-4 md:col-start-9">
                                    <p className="text-sm md:text-base text-[#86868b] leading-relaxed mb-8">
                                        Preserving traditional methods ensures every product remains 100% natural and effective.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
