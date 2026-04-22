"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CgArrowTopRight } from "react-icons/cg";
import { Button } from "../ui/button";

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

                {/* --- Background Media --- */}
                <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0 z-0">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/videos/cook.mp4" />
                </motion.div>

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
                    className="relative z-30 h-full w-full p-8 md:p-16 flex flex-col justify-between"
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
                                By preserving the natural carotenoids and cellular structure of the fruit,
                                we deliver an oil that behaves like a second skin.
                                <span className="text-white block mt-2 italic font-light">No heat. No chemicals. Just life.</span>
                            </p>

                            <Button className="relative group overflow-hidden px-5 py-2 border border-white/20 rounded-full transition-all duration-500 hover:border-orange-600 text-white">
                                <span className="relative z-10 text-xs uppercase tracking-widest font-bold group-hover:text-white transition-colors">
                                    Buy now
                                </span>
                                <CgArrowTopRight />
                                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}