"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowUpRight } from "lucide-react";

const carouselData = [
    {
        id: 1,
        title: "Feel the freshness of palm oil in the dense weather condition",
        video: "/videos/one.mp4",
    },
    {
        id: 2,
        title: "Made from pure, natural, and organic palm fruits harvested with care",
        video: "/videos/two.mp4",
    },
    {
        id: 3,
        title: "Enjoy cooking and frying with pure natural taste, no artificial flavours or colors, no preservatives",
        video: "/videos/three.mp4",
    },
    {
        id: 4,
        title: "Made to last longer than ever, while maintaing freshness",
        video: "/videos/plate.mp4",
    },
];

const VideoCard = ({
    item,
    isActive,
    isPlaying,
    onVideoEnd,
    onProgressUpdate
}: {
    item: any,
    isActive: boolean,
    isPlaying: boolean,
    onVideoEnd: () => void,
    onProgressUpdate: (p: number) => void
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive && isPlaying) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isActive, isPlaying]);

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.duration && isActive) {
            const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            onProgressUpdate(p);
        }
    };

    return (
        <div className="relative min-w-[85vw] md:min-w-[70vw] h-[65vh] md:h-[80vh] rounded-[40px] overflow-hidden bg-[#161617] snap-center shrink-0 border border-white/5">
            <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onVideoEnd}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                src={item.video}
            />
            <div className="absolute top-10 left-10 md:top-20 md:left-20 max-w-lg z-10">
                <h3 className="text-2xl md:text-4xl font-semibold leading-tight text-white/90 font-sora tracking-tight">
                    {item.title}
                </h3>
            </div>
        </div>
    );
};

export default function PalmCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // Function to handle scrolling to a specific index
    const scrollTo = useCallback((index: number) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const card = container.children[index] as HTMLElement;
            if (card) {
                const targetX = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
                container.scrollTo({
                    left: targetX,
                    behavior: "smooth"
                });
            }
            setActiveIdx(index);
            setCurrentProgress(0);
        }
    }, []);

    // AUTO-PLAY NEXT LOGIC
    const handleVideoEnd = () => {
        if (activeIdx < carouselData.length - 1) {
            scrollTo(activeIdx + 1);
        } else {
            setIsPlaying(false);
            setIsFinished(true);
        }
    };

    const handleManualScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const center = scrollLeft + container.offsetWidth / 2;

        let closestIdx = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((child, index) => {
            const card = child as HTMLElement;
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(center - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIdx = index;
            }
        });

        if (closestIdx !== activeIdx && closestIdx < carouselData.length) {
            setActiveIdx(closestIdx);
            setCurrentProgress(0);
            setIsFinished(false);
        }
    }, [activeIdx]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleManualScroll);
            return () => container.removeEventListener("scroll", handleManualScroll);
        }
    }, [handleManualScroll]);

    const toggleControls = () => {
        if (isFinished) {
            scrollTo(0);
            setIsFinished(false);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="bg-[#000] py-24 overflow-hidden font-sora text-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-20">

                <div className="flex justify-between items-end mb-14">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-sora">
                        What's inside?
                    </h2>
                </div>

                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-20"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {carouselData.map((item, i) => (
                            <VideoCard
                                key={item.id}
                                item={item}
                                isActive={activeIdx === i}
                                isPlaying={isPlaying}
                                onVideoEnd={handleVideoEnd}
                                onProgressUpdate={setCurrentProgress}
                            />
                        ))}
                        {/* End spacer to allow center-snap on last card */}
                        <div className="min-w-[10vw] shrink-0" />
                    </div>

                    {/* Apple Controls Capsule */}
                    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-[#424245]/40 backdrop-blur-3xl px-8 py-4 rounded-full z-40 border border-white/10 shadow-2xl">

                        <div className="flex items-center gap-3">
                            {carouselData.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    className="cursor-pointer flex items-center justify-center h-4"
                                >
                                    {activeIdx === i ? (
                                        <motion.div
                                            layoutId="activePill"
                                            className="w-14 h-2 bg-white/20 rounded-full relative overflow-hidden"
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-white"
                                                style={{ width: `${currentProgress}%` }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className={`w-2 h-2 rounded-full transition-colors duration-500 ${i < activeIdx ? "bg-white" : "bg-white/20"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="w-[1px] h-5 bg-white/10" />

                        <button
                            onClick={toggleControls}
                            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-90"
                        >
                            {isFinished ? (
                                <RotateCcw size={18} />
                            ) : isPlaying ? (
                                <Pause size={18} fill="currentColor" />
                            ) : (
                                <Play size={18} fill="currentColor" className="ml-1" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
        </section>
    );
}