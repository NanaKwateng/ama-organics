'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

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

            <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-2 md:px-5 lg:px-20 overflow-hidden">
                {/* Background Image Only */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/kente.jpeg"
                        alt="Ama Organics Background"
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" /> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10 w-full max-w-8xl mx-auto items-stretch bg-black px-12 py-7 rounded-2xl border-3 border-black">

                    {/* CARD 1: SMOKED FISH */}
                    <div className="relative flex flex-col rounded-2xl p-1 md:p-8">
                        {/* Depth Number Behind Image */}
                        <h2 className="absolute top-10 right-10 text-[8rem] md:text-[10rem] lg:text-[16rem] font-black text-white leading-none select-none z-0">
                            01
                        </h2>

                        {/* Hanging Product Image */}
                        <div className="relative h-[400px] md:h-[450px] w-full z-10 animate-hanging">
                            <Image
                                src="/images/dry-fish.png"
                                alt="Ghanaian Smoked Fish"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="mt-auto pt-4">
                            <p className="text-orange-500 text-[10px] uppercase tracking-[0.1em] font-bold mb-2">Artisanal Cure</p>
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Traditional Smoked Fish</h3>
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
                    <div className="relative flex flex-col-reverse rounded-2xl p-0 mt-8">
                        {/* Depth Number Behind Image */}
                        <h2 className="absolute bottom-10 left-10 text-[8rem] md:text-[9rem] lg:text-[16rem] font-black text-white leading-none select-none z-0 text-right">
                            02
                        </h2>

                        {/* Hanging Product Image */}
                        <div className="relative h-[400px] md:h-[600px] w-full z-10 animate-hanging [animation-delay:1.5s]">
                            <Image
                                src="/images/product.png"
                                alt="Pure Red Palm Oil"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] rotate-45"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="mb-auto pb-6 text-right md:text-left">
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
                <div className="relative z-20 mt-0 text-center group bg-black p-4 rounded-b-2xl max-w-sm md:max-w-md md:p-8">


                    <PlusIcon size={24} color="white" className="animate-spin absolute top-3 left-3" />
                    <PlusIcon size={24} color="white" className="animate-spin absolute top-3 right-3" />

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