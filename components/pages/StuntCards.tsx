import Image from "next/image";

export default function StuntCards() {
    return (
        <section className="relative min-h-screen w-full bg-black text-white flex items-center justify-center py-24 px-6 md:px-20 overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/images/bg.jpeg"
                    alt="background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" /> {/* Darken overlay */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10 w-full max-w-7xl mx-auto">

                {/* CARD 1: IMAGE OVER TEXT */}
                <div className="relative group flex flex-col h-[600px] md:h-[700px] w-full">
                    {/* Depth Layer 1: Massive Background Text (Behind Image) */}
                    <div className="absolute top-10 left-0 z-0 pointer-events-none">
                        <h2 className="text-[12rem] md:text-[18rem] font-black text-white/[0.03] leading-none select-none">
                            PURE
                        </h2>
                    </div>

                    {/* Depth Layer 2: The Product (Middle) */}
                    <div className="relative flex-1 w-full z-10 transform transition-transform duration-700 group-hover:scale-105">
                        <Image
                            src="/images/product.png"
                            alt="Red Palm Oil"
                            fill
                            priority
                            className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                        />
                    </div>

                    {/* Depth Layer 3: Foreground Description (On Top) */}
                    <div className="relative z-20 mt-6 max-w-xs">
                        <div className="h-[1px] w-12 bg-orange-500 mb-4" />
                        <p className="text-xs md:text-sm uppercase tracking-widest font-medium text-gray-300 leading-relaxed">
                            Experience the pure, natural taste of palm oil. <br />
                            <span className="text-white font-bold">100% Organic Origin.</span>
                        </p>
                    </div>
                </div>

                {/* CARD 2: TEXT OVER IMAGE (Staggered Layout) */}
                <div className="relative group flex flex-col-reverse h-[600px] md:h-[700px] w-full md:mt-24">

                    {/* Depth Layer 1: Massive Background Text (Behind Image) */}
                    <div className="absolute bottom-20 right-0 z-0 pointer-events-none">
                        <h2 className="text-[12rem] md:text-[18rem] font-black text-orange-900/[0.05] leading-none select-none">
                            RICH
                        </h2>
                    </div>

                    {/* Depth Layer 2: The Product (Middle) */}
                    <div className="relative flex-1 w-full z-10 transform transition-transform duration-700 group-hover:rotate-2">
                        <Image
                            src="/images/product.png"
                            alt="Red Palm Oil"
                            fill
                            className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                        />
                    </div>

                    {/* Depth Layer 3: Foreground Description (Placed at Top now due to flex-col-reverse) */}
                    <div className="relative z-20 mb-6 max-w-xs ml-auto text-right">
                        <p className="text-xs md:text-sm uppercase tracking-widest font-medium text-gray-300 leading-relaxed">
                            Authentic flavor profile. <br />
                            <span className="text-white font-bold">Export Grade Quality.</span>
                        </p>
                        <div className="h-[1px] w-12 bg-orange-500 mt-4 ml-auto" />
                    </div>
                </div>

            </div>
        </section>
    );
}