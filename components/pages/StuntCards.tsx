'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function StuntCards() {
    return (
        <>
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-hanging {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

            <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 md:px-20 overflow-hidden">
                {/* Background Image Only */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/bg.jpeg"
                        alt="Ama Organics Background"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10 w-full max-w-6xl mx-auto items-stretch">

                    {/* CARD 1: SMOKED FISH */}
                    <div className="relative flex flex-col border border-white/20 rounded-2xl p-8 md:p-12 bg-black/20 backdrop-blur-md transition-all hover:border-white/40">
                        {/* Depth Number Behind Image */}
                        <h2 className="absolute top-10 right-10 text-[12rem] md:text-[16rem] font-black text-white/[0.03] leading-none select-none z-0">
                            01
                        </h2>

                        {/* Hanging Product Image */}
                        <div className="relative h-[350px] md:h-[450px] w-full z-10 animate-hanging">
                            <Image
                                src="/images/dry-fish.png"
                                alt="Ghanaian Smoked Fish"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="mt-auto pt-8 border-t border-white/10">
                            <p className="text-orange-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Artisanal Cure</p>
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter italic">Traditional Smoked Fish</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                                Sourced from the pristine coastal waters of Ghana, our fish is slow-smoked over indigenous hardwoods for an unmistakable aroma and deep, savory richness that elevates any local dish.
                            </p>
                            <Link href="/products">
                                <Button variant={"link"} className="text-white text-xs font-bold uppercase tracking-widest border-b  pb-1 hover:text-orange-500 transition-colors">
                                    Order Fresh Batch →
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* CARD 2: PALM OIL (Staggered Layout) */}
                    <div className="relative flex flex-col-reverse border border-white/20 rounded-2xl p-8 md:p-12 bg-black/20 backdrop-blur-md md:mt-20 transition-all hover:border-white/40">
                        {/* Depth Number Behind Image */}
                        <h2 className="absolute bottom-10 left-10 text-[12rem] md:text-[16rem] font-black text-white/[0.03] leading-none select-none z-0">
                            02
                        </h2>

                        {/* Hanging Product Image */}
                        <div className="relative h-[350px] md:h-[450px] w-full z-10 animate-hanging [animation-delay:1.5s]">
                            <Image
                                src="/images/product.png"
                                alt="Pure Red Palm Oil"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="mb-auto pb-8 border-b border-white/10">
                            <p className="text-orange-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Premium Harvest</p>
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter italic">Pure Red Palm Oil</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                100% organic, cold-pressed, and rich in natural antioxidants. Our palm oil retains its vibrant crimson hue and nutty profile—the golden standard for authentic West African cuisine.
                            </p>
                            <Link href="/products">
                                <Button variant={"link"} className="text-white text-xs font-bold uppercase tracking-widest border-b  pb-1 hover:text-orange-500 transition-colors">
                                    Buy the harvest →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Global CTA */}
                <div className="relative z-20 mt-24 text-center group">
                    <p className="text-xs font-medium tracking-[0.4em] text-white/40 mb-6 uppercase">
                        Discover the Ghanaian organic kitchen
                    </p>
                    <Link href="/products">
                        <Button variant={"secondary"} className="text-black text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors px-4 py-5 rounded-full">
                            See all products
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}