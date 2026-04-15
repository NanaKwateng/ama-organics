import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const ChevronPattern: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className={className} aria-hidden="true">
        <path d="M0 20 L25 0 L50 20 L75 0 L100 20 Z" fill="#006400" />
        <path d="M0 15 L25 -5 L50 15 L75 -5 L100 15 Z" fill="#FFD700" />
        <path d="M0 10 L25 -10 L50 10 L75 -10 L100 10 Z" fill="#B22222" />
        <path d="M0 5 L25 -15 L50 5 L75 -15 L100 5 Z" fill="#0000CD" />
    </svg>
);

const DiamondPattern: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
        <rect x="0" y="0" width="100" height="100" fill="#B22222" />
        <polygon points="50,10 90,50 50,90 10,50" fill="#FFFFFF" />
        <polygon points="50,25 75,50 50,75 25,50" fill="#0000CD" />
    </svg>
);

// Pixel Grid following the white card's color distribution
const PixelGridWhite = () => {
    const colors = ['#FFD700', '#B22222', '#006400', '#0000CD', '#f3f4f6', '#d1d5db', '#0ea5e9'];
    return (
        <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 40 }).map((_, i) => (
                <div
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-[4px] shadow-sm"
                    style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                />
            ))}
        </div>
    );
};

const CTASection: React.FC = () => {
    return (
        <section className="bg-[#f8f9fa] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Container mimicking the white business card */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-stretch min-h-[480px] border border-gray-100">

                    {/* TOP DECOR (Subtle Brand Tag) */}
                    <div className="absolute top-0 left-12 w-16 opacity-10">
                        <ChevronPattern className="w-full h-6" />
                    </div>

                    {/* LEFT CONTENT AREA */}
                    <div className="relative z-10 w-full md:w-3/5 p-12 md:p-20 flex flex-col justify-center">
                        <div className="mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                    <Image
                                        src="/images/logo.jpg"
                                        width={100}
                                        height={100}
                                        alt='logo'
                                        priority
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tighter text-black uppercase">Ama Organic Foods</h3>
                                    <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-medium">Premium Quality</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-[ -0.04em] leading-[1.05] mb-6">
                            Ready to Experience <br />
                            <span className="text-orange-600">Pure Palm Oil?</span>
                        </h2>

                        <p className="text-gray-500 text-lg mb-10 max-w-md font-normal leading-relaxed">
                            Order now and get fast delivery anywhere in Ghana.
                            The authentic taste of the tropics, delivered to your doorstep.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Button className="bg-black hover:bg-zinc-800 text-white px-10 py-7 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-gray-200">
                                Order Now
                            </Button>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-4">
                                Fast Delivery • Ghana
                            </span>
                        </div>
                    </div>

                    {/* RIGHT VISUAL AREA (The light gray sidebar from the white card) */}
                    <div className="relative w-full md:w-2/5 bg-gray-50/50 p-12 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
                        {/* Soft vertical shadow line matching the card design */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

                        <div className="relative z-10">
                            <PixelGridWhite />
                        </div>

                        {/* Minimalist pattern decoration in the corner */}
                        <div className="absolute bottom-8 right-8 opacity-5">
                            <DiamondPattern className="w-24 h-24" />
                        </div>

                        {/* Background Text Overlay - Subtle */}
                        <div className="absolute bottom-12 left-12 rotate-90 origin-left text-[10px] font-bold text-gray-200 tracking-[1em] uppercase whitespace-nowrap">
                            Organic • Pure • Fresh
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;