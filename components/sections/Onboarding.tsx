"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const IMAGES = [
    "/images/orange.jpeg",
    "/images/ginger.jpeg",
    "/images/prekese.jpeg",
    "/images/rice.jpeg",
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3500); // Simulate page load
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between py-12 px-6">
            <div className="w-full max-w-md grid grid-cols-2 gap-4 h-[60vh] overflow-hidden">
                {IMAGES.map((src, i) => (
                    <motion.div
                        key={src}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2, duration: 0.8, ease: "circOut" }}
                        className={cn(
                            "relative rounded-3xl overflow-hidden",
                            i % 2 === 0 ? "h-64 mt-8" : "h-72"
                        )}
                    >
                        <img src={src} alt="Fashion" className="object-cover w-full h-full" />
                    </motion.div>
                ))}
            </div>

            <div className="text-center space-y-6 bg-transparent">
                <h1 className="text-3xl font-bold tracking-tight">Ama organic Foods</h1>
                <div className="flex flex-col items-center gap-4">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div key="loader" exit={{ opacity: 0 }}>
                                <LoaderIcon className="size-8 animate-spin text-primary" role="status" aria-label="Loading" />
                            </motion.div>
                        ) : (
                            <motion.div key="button" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                <Button onClick={onComplete} className="rounded-full px-8 py-6 text-lg bg-red-500">
                                    Continue
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}