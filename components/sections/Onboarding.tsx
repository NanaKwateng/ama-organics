"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const IMAGES = [
    { src: "/images/smokeFish.png", name: "Smoked Fish", tag: "Pure" },
    { src: "/images/ginger.jpeg", name: "Ginger", tag: "Organic" },
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div key="new-onboarding-v2" className="fixed inset-0 z-50 bg-[#FFF9F6] flex flex-col items-center justify-between py-12 px-8 min-h-screen overflow-hidden text-black">

            {/* --- Floating Illustrations --- */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-4 -translate-y-24 z-30"
            >
                <div className="w-16 h-20 bg-[#5EEAD4] rounded-full border-4 border-black relative flex items-center justify-center">
                    <div className="flex gap-2 mb-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /><div className="w-1.5 h-1.5 bg-black rounded-full" /></div>
                    <div className="absolute bottom-6 w-4 h-2 border-b-2 border-black rounded-full" />
                </div>
            </motion.div>

            <motion.div
                animate={{ x: [0, 5, 0], y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-24 -left-6 z-30 rotate-12"
            >
                <div className="w-24 h-24 bg-[#C084FC] rounded-t-full border-4 border-black relative flex flex-col items-center pt-6 shadow-xl">
                    <div className="flex gap-4"><div className="w-2 h-2 bg-black rounded-full" /><div className="w-2 h-2 bg-black rounded-full" /></div>
                    <div className="mt-2 w-6 h-3 border-t-2 border-black rounded-full" />
                </div>
            </motion.div>

            {/* --- Main Card Stack --- */}
            <div className="relative w-full max-w-sm h-[40vh] flex items-center justify-center mt-10">
                {IMAGES.map((item, i) => (
                    <motion.div
                        key={item.src}
                        initial={{ y: 50, opacity: 0, rotate: i === 0 ? -10 : 10 }}
                        animate={{ y: 0, opacity: 1, rotate: i === 0 ? -8 : 6 }}
                        className={cn(
                            "absolute w-44 h-60 rounded-[2.5rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] overflow-hidden bg-white",
                            i === 0 ? "-translate-x-12 mt-12 z-10" : "translate-x-12 -mt-4 z-20"
                        )}
                    >
                        <img src={item.src} alt={item.name} className="object-cover w-full h-full" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="font-black text-lg drop-shadow-md">{item.name}</p>
                            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-black/40 backdrop-blur-sm border border-white/20 uppercase tracking-tighter">
                                {item.tag}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- Text & Actions --- */}
            <div className="text-center w-full max-w-xs space-y-8 mb-6 z-40">
                <div className="flex justify-center gap-2">
                    <div className="w-6 h-2 bg-black rounded-full" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                </div>

                <h1 className="text-4xl font-black leading-[1.05] tracking-tight">
                    Choose quality, organic and healthy foods.
                </h1>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" exit={{ opacity: 0 }} className="py-4">
                            <LoaderIcon className="size-8 animate-spin text-gray-400" />
                        </motion.div>
                    ) : (
                        <motion.div key="cta" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
                            <Button
                                onClick={onComplete}
                                className="w-full rounded-2xl py-8 text-xl font-black bg-white text-black border-4 border-black hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 mb-6"
                            >
                                Get me in
                            </Button>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                                By tapping "Get me in" you're accepting the <br />
                                <span className="text-black underline cursor-pointer">Terms of Use</span> and <span className="text-black underline cursor-pointer">Privacy Policy</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
