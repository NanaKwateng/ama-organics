"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GridCardProps {
    images: string[];
    delay?: number;
    className?: string;
}

export function GridCard({ images, delay = 0, className }: GridCardProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Stagger initial start based on delay prop
        const initialTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % images.length);
            }, 3000);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(initialTimeout);
    }, [images.length, delay]);

    return (
        <div className={`relative overflow-hidden rounded-[2rem] shadow-xl ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </AnimatePresence>
        </div>
    );
}