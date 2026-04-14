"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sliderData = [
    {
        id: 1,
        category: "Restoration",
        title: "The Gold Standard of Purity.",
        description: "Our proprietary cold-press method ensures every drop of oil maintains its molecular integrity and nutrient density.",
        image: "/images/slider/palm-1.jpg",
    },
    {
        id: 2,
        category: "Sustainability",
        title: "Rooted in the Community.",
        description: "We work directly with West African smallholder farmers to ensure fair trade and complete forest preservation.",
        image: "/images/slider/palm-2.jpg",
    },
    {
        id: 3,
        category: "Innovation",
        title: "Molecularly Precise Care.",
        description: "Rich in rare tocotrienols, our palm oil provides a level of antioxidant protection that synthetic oils simply can't match.",
        image: "/images/slider/palm-3.jpg",
    },
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        z: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        z: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
    }),
};

export default function CreativeSlider() {
    const [[page, direction], setPage] = useState([0, 0]);

    const slideIndex = Math.abs(page % sliderData.length);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <section className="relative h-screen w-full bg-[#f5f5f7] overflow-hidden font-sora">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center px-6 md:px-20 py-20 md:py-0"
                >
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 z-10 space-y-6 md:space-y-8 order-2 md:order-1 mt-10 md:mt-0">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-orange-700"
                        >
                            {sliderData[slideIndex].category}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-[0.9]"
                        >
                            {sliderData[slideIndex].title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed"
                        >
                            {sliderData[slideIndex].description}
                        </motion.p>
                    </div>

                    {/* Image Container */}
                    <div className="w-full md:w-1/2 h-[40vh] md:h-[70vh] relative order-1 md:order-2">
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src={sliderData[slideIndex].image}
                                alt={sliderData[slideIndex].title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* --- Controls: Bottom Right --- */}
            <div className="absolute bottom-8 right-8 md:bottom-16 md:right-20 z-50 flex items-center gap-4">
                {/* Slide Counter */}
                <div className="hidden md:block mr-4 font-bold text-sm tracking-widest text-gray-400">
                    <span className="text-black">0{slideIndex + 1}</span> / 0{sliderData.length}
                </div>

                <button
                    onClick={() => paginate(-1)}
                    className="p-4 md:p-6 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-sm active:scale-90"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={() => paginate(1)}
                    className="p-4 md:p-6 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-sm active:scale-90"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Background Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}