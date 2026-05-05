"use client";
import { RotatingLogo, TiltCard } from "@/components/sections/TiltCards";
import { Search, User, ShoppingBag, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function MainPage() {
    return (
        <main className="relative min-h-screen bg-white text-[#1a1a1a] font-sans px-6 md:px-12 py-6">
            {/* Navigation */}


            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto">
                <h1 className="text-center text-5xl md:text-[84px] font-bold leading-[0.9] mb-16 tracking-tight">
                    Nature&apos;s Raw <br /> Unfiltered Perfection
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

                    {/* Left Section */}
                    <div className="md:col-span-3 pt-10">
                        <div className="mb-16">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">The Standard</p>
                            <h3 className="text-xl font-semibold leading-none max-w-[150px] fomt-mono">Zero Chemicals, Total Vitality</h3>
                        </div>


                        <TiltCard className="relative w-full aspect-[4/3] bg-[#f9b14d] rounded-[40px] overflow-hidden mb-12">
                            <Image src="/images/smokeFish.png" alt="smoke Fish" className="w-full h-full object-cover"
                                fill
                                priority
                            />
                        </TiltCard>

                        <div className="max-w-[240px]">
                            <span className="text-5xl font-serif leading-none italic block mb-2">“</span>
                            <p className="text-sm font-medium leading-snug">
                                I'm very much of the 'buy less but buy better' persuasion but never really knew where to look.
                            </p>
                            <div className="mt-4">
                                <span className="text-5xl font-serif leading-none italic block mb-5 rotate-180">“</span>
                                <div className="h-1.5 w-16 bg-yellow-400 -mt-2 ml-2 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section (The Grid) */}
                    <div className="md:col-span-6 grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <TiltCard className="relative w-full aspect-square bg-[#e2d6c5] rounded-[40px] overflow-hidden">
                                <Image src="/images/maize.jpeg" alt="maize" className="w-full h-full object-cover"
                                    fill
                                    priority
                                />
                            </TiltCard>
                            <TiltCard className="relative w-full aspect-square bg-[#e2d6c5] rounded-[40px] overflow-hidden">
                                <Image src="/images/aidan.jpeg" alt="aidan fruit" className="w-full h-full object-cover"
                                    fill
                                    priority
                                />
                            </TiltCard>
                        </div>

                        <div className="relative">
                            {/* The Star Icon on top of the tall image */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl">✦</div>
                            <TiltCard className="relative w-full aspect-[2/3] bg-[#ffd95b] rounded-full overflow-hidden border-[12px] border-white shadow-sm">
                                <Image src="/images/kernel.jpeg" alt="palm kernel" className="w-full h-full object-cover" fill priority />
                            </TiltCard>
                            <div className="mt-8 flex justify-center items-center ">
                                <div className="flex flex-col space-y-2 items-center justify-center gap-2 border border-gray-200 px-6 py-5 rounded-3xl text-[10px] font-thin font-serif uppercase bg-black text-white max-w-xs">

                                    <span>
                                        We bring the farm, the coast, and the forest directly to your kitchen.
                                    </span>
                                    <Link href="/products" className="w-full relative">

                                        <span className="bg-white text-orange-600 rounded-xl px-2 py-3 w-full text-md">Explore Products</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="md:col-span-3 space-y-4">
                        <TiltCard className="relative w-full aspect-[4/5] bg-[#7540a8] rounded-t-full rounded-b-[40px] overflow-hidden">
                            <Image src="/images/goat.jpeg" alt="livestock" className="w-full h-full object-cover" fill priority />
                        </TiltCard>

                        <div className="grid grid-cols-2 gap-4">
                            <TiltCard className="relative w-full aspect-square bg-[#3496ff] rounded-[30px] overflow-hidden">
                                <Image src="/images/groundnuts.jpeg" alt="groundnuts" className="w-full h-full object-cover" fill priority />
                            </TiltCard>
                            <TiltCard className="relative w-full aspect-square bg-[#3496ff] rounded-[30px] overflow-hidden">
                                <Image src="/images/cassava.jpeg" alt="foodstuff" className="w-full h-full object-cover" fill priority />
                            </TiltCard>

                        </div>

                        <div className="pt-10 flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <span className="text-6xl font-light tracking-tighter">01</span>
                                <div className="text-[10px] font-black uppercase leading-tight">
                                    <div className="space-y-1">
                                        <p className="text-gray-400 mb-1">Curation • Heritage</p>
                                        <p className="text-balance">
                                            Fuel your body with <strong>authentic nutrition</strong>—crafted for those who value
                                            longevity and real flavor.
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <Link href="/products">
                                <button className="bg-black text-white p-4 rounded-full">
                                    <ArrowRight className="size-5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Icons */}
            <div className="absolute top-48 left-20 text-xl">🌻</div>
            <div className="absolute top-80 left-1/4 text-xl">🌼</div>
            <div className="absolute top-48 right-24 text-xl">🌺</div>
            <div className="absolute bottom-20 right-1/4 text-xl">🌸</div>
            <div className="absolute bottom-40 right-40 text-xl">🥀</div>
        </main>
    );
}