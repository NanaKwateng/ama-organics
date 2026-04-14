"use client";
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue, // Added this
} from "framer-motion";

interface MarqueeProps {
    images: string[];
    baseVelocity: number;
    direction?: "left" | "right";
    skew?: number;
}

// Custom wrap function: ensures 'value' stays between 'min' and 'max'
export const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function MarqueeRow({ images, baseVelocity = 100, direction = "right", skew = -6 }: MarqueeProps) {
    // FIX: Changed useRef to useMotionValue because useTransform requires a MotionValue
    const baseX = useMotionValue(0);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // FIX: Explicitly typed 'v' as number to resolve the implicit 'any' error
    const x = useTransform(baseX, (v: number) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // If scrolling, add velocity to the movement
        if (velocityFactor.get() !== 0) {
            moveBy += directionFactor.current * (moveBy * velocityFactor.get());
        }

        // FIX: Use .get() and .set() for MotionValues instead of .current
        const currentX = baseX.get();
        const nextX = direction === "right" ? currentX + moveBy : currentX - moveBy;
        baseX.set(nextX);
    });

    return (
        <div className="flex whitespace-nowrap flex-nowrap overflow-hidden py-4">
            <motion.div
                className="flex flex-nowrap gap-4 md:gap-8 min-w-full"
                style={{ x, skewY: skew }}
            >
                {/* Render the images multiple times for a seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <React.Fragment key={i}>
                        {images.map((src, index) => (
                            <div
                                key={`${i}-${index}`}
                                className="relative h-[200px] w-[280px] md:h-[300px] md:w-[450px] shrink-0 overflow-hidden rounded-3xl"
                            >
                                <motion.img
                                    style={{ skewY: -skew }} // Counter-skew to keep content straight
                                    src={src}
                                    alt="Story visual"
                                    className="h-full w-full object-cover scale-110"
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
}

export default function ZigzagMarquee() {
    const topImages = [
        "/images/foods.jpeg",
        "/images/maize.jpeg",
        "/images/smokeFish.png",
        "/images/pepper.png",
        "/images/spices.jpeg",
        "/images/cassava.jpeg",
    ];

    const bottomImages = [
        "/images/maize.jpeg",
        "/imagey/smokeFish.png",
        "/images/foods.jpeg",
        "/images/cassava.jpeg",
        "/images/spices.jpeg",
        "/images/pepper.png",
    ];

    return (
        <section className="relative py-24 bg-black overflow-hidden font-sora">
            {/* Upper Zigzag Row (Moves Right) */}
            <div className="-rotate-2 translate-y-8">
                <MarqueeRow images={topImages} baseVelocity={1} direction="right" skew={-3} />
            </div>

            {/* Central Storytelling Text */}
            <div className="relative z-10 py-16 px-6 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                        A tradition <br />
                        <span className="text-orange-600">deeply rooted</span> <br />
                        in every soul.
                    </h2>
                    <p className="text-[#86868b] text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                        From the sun-drenched groves of West Africa to your daily ritual,
                        we preserve the artisanal methods that have defined purity for generations.
                    </p>
                </motion.div>
            </div>

            {/* Lower Zigzag Row (Moves Left) */}
            <div className="rotate-2 -translate-y-8">
                <MarqueeRow images={bottomImages} baseVelocity={1} direction="left" skew={3} />
            </div>

            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-orange-900/10 blur-[120px] pointer-events-none" />
        </section>
    );
}