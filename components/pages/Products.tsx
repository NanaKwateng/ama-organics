"use client";
import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { MoveRight, ShieldCheck, Leaf, Zap, Award } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- Types & Data ---
type Category = "All" | "Cereals & Grains" | "Fruits & Veggies" | "Oils" | "Nuts & Spices" | "Proteins" | "tubers" | "items";

interface Product {
    id: number;
    name: string;
    category: Category;
    description: string;
    image: string;
    badgeType: "organic" | "premium" | "fresh" | "pure";
}

const PRODUCTS: Product[] = [
    { id: 1, name: "Pure Ghanaian Palm Oil", category: "Oils", description: "Rich, cold-pressed oil sourced from premium palm fruits across Ghana. Nutrient-dense and 100% natural.", image: "/images/product.png", badgeType: "pure" },
    { id: 2, name: "Premium Local Rice", category: "Cereals & Grains", description: "Aromatic, long-grain local rice. Stone-free and perfectly parboiled for an authentic Ghanaian taste.", image: "/images/rice.jpeg", badgeType: "premium" },
    { id: 3, name: "Original Groundnut Paste", category: "Nuts & Spices", description: "Smooth, slow-roasted peanut butter with no added oils or preservatives. Pure protein in a jar.", image: "/images/groundnut.jpeg", badgeType: "organic" },
    { id: 4, name: "Hardwood Smoked Fish", category: "Proteins", description: "Traditionally smoked over natural hardwoods for a deep aroma. Grit-free and perfect for soups and stews.", image: "/images/smokeFish.png", badgeType: "fresh" },
    { id: 5, name: "Aidan Fruit (Prekese)", category: "Nuts & Spices", description: "A medicinal powerhouse rich in Vitamins A & B. Adds a distinct, healthy aroma to local soups.", image: "/images/prekese.jpeg", badgeType: "organic" },
    { id: 6, name: "White Maize Grains", category: "Cereals & Grains", description: "Sun-dried, high-quality white maize. Ideal for milling into flour or preparing diverse traditional dishes.", image: "/images/maize.jpeg", badgeType: "pure" },
    { id: 7, name: "Premium Dried Shrimps", category: "Proteins", description: "A lean source of protein and iodine. Carefully dried to preserve flavor and nutritional value.", image: "/images/shrimps.jpeg", badgeType: "fresh" },
    { id: 8, name: "Organic Soursop", category: "Fruits & Veggies", description: "Vitamin C-rich tropical fruit known for its immune-boosting properties and creamy texture.", image: "/images/soursop.jpeg", badgeType: "fresh" },
    { id: 9, name: "Farm-Fresh Tomatoes", category: "Fruits & Veggies", description: "Vibrant, vine-ripened tomatoes sourced daily from local farms for maximum freshness.", image: "/images/tomatoes.jpeg", badgeType: "fresh" },
    { id: 10, name: "Livestock - Healthy Goats", category: "Proteins", description: "Farm-raised, healthy goats processed under strict hygienic conditions. Ready for any occasion.", image: "/images/goat.jpeg", badgeType: "fresh" },
    { id: 11, name: "Sun-Dried Pepper", category: "Nuts & Spices", description: "Intensely flavored dried peppers. Perfect for long-term storage and adding a kick to your recipes.", image: "/images/peper-dry.jpeg", badgeType: "premium" },
    { id: 12, name: "Corn Dough", category: "Cereals & Grains", description: "Traditional fermented dough, expertly prepared for the perfect Banku, Kenkey, or porridge.", image: "/images/dough.jpeg", badgeType: "pure" },
    { id: 13, name: "Sweet Organic Mangoes", category: "Fruits & Veggies", description: "Fiber-rich, juicy mangoes harvested at peak ripeness. A sweet, natural treat for the family.", image: "/images/mangoes.jpeg", badgeType: "pure" },
    { id: 14, name: "Fresh Garden Oranges", category: "Fruits & Veggies", description: "Bursting with juice and Vitamin C. Organic oranges delivered fresh from the orchard.", image: "/images/orange.jpeg", badgeType: "pure" },
    { id: 15, name: "Traditional Earthenware", category: "items", description: "Authentic 'Asanka' for grinding spices. Retains the natural nutrients and flavors of your ingredients.", image: "/images/earthenware.jpeg", badgeType: "premium" },
    { id: 16, name: "Dried Cassava (Kokonte)", category: "tubers", description: "High-quality dried cassava chips. Perfect for milling into smooth, delicious 'Face the Wall'.", image: "/images/dry-cassava.jpeg", badgeType: "pure" },
    { id: 17, name: "Fresh Green & Ripe Plantains", category: "tubers", description: "Versatile organic plantains. Excellent for chips, fufu, or roasting. Available ripe or unripe.", image: "/images/plantain.jpeg", badgeType: "fresh" },
    { id: 18, name: "Sweet Sugar Pineapples", category: "Fruits & Veggies", description: "Ultra-sweet, juicy Ghanaian pineapples. Perfect for fresh juices and healthy salads.", image: "/images/pineapple.jpeg", badgeType: "fresh" },
    { id: 19, name: "Raw Peanuts (Groundnuts)", category: "Nuts & Spices", description: "Hand-selected raw groundnuts. A crunchy, nutritional blend for snacking or cooking.", image: "/images/groundnuts.jpeg", badgeType: "fresh" },
    { id: 20, name: "Ginger", category: "Nuts & Spices", description: "Hand-selected raw gingers. A crunchy, nutritional blend for snacking or cooking.", image: "/images/ginger.jpeg", badgeType: "fresh" },
    { id: 21, name: "Palm Kernel Oil", category: "Oils", description: "Enjoy the rich taste of organic, fresh palm kernel oil, with its nutritional benefits", image: "/images/kernel.jpeg", badgeType: "pure" },
    { id: 22, name: "Natural Spices", category: "Nuts & Spices", description: "All rich nutrient-first organic, dried natural spices curated for your recipie spicing.. ", image: "/images/spices.jpeg", badgeType: "premium" },
    { id: 23, name: "Fresh Farm Cassava", category: "tubers", description: "Fresh and organic cassava, get them fresh and dried, available in stock", image: "/images/cassava.jpeg", badgeType: "pure" },
];


const CATEGORIES: Category[] = ["All", "Cereals & Grains", "Fruits & Veggies", "Oils", "Nuts & Spices", "Proteins", "items", "tubers"];

// --- Helper Components ---
const Badge = ({ type }: { type: Product["badgeType"] }) => {
    const configs = {
        organic: { icon: Leaf, label: "100% Organic", color: "bg-green-50 text-green-600 border-green-100" },
        premium: { icon: Award, label: "Premium Grade", color: "bg-amber-50 text-amber-600 border-amber-100" },
        fresh: { icon: Zap, label: "Freshly Harvested", color: "bg-blue-50 text-blue-600 border-blue-100" },
        pure: { icon: ShieldCheck, label: "Pure & Natural", color: "bg-zinc-50 text-zinc-600 border-zinc-100" },
    };
    const { icon: Icon, label, color } = configs[type];
    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${color}`}>
            <Icon size={12} /> {label}
        </div>
    );
};

export default function AmaProductShowcase() {
    const [activeTab, setActiveTab] = useState<Category>("All");
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProducts = useMemo(() =>
        activeTab === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab),
        [activeTab]);

    // --- Animations ---
    useGSAP(() => {
        // Initial reveal
        gsap.from(".header-element", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out"
        });

        // Animate products when filtered
        gsap.fromTo(".product-card",
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "back.out(1.2)" }
        );
    }, [activeTab]);

    return (
        <section ref={containerRef} className="min-h-screen bg-white py-24 px-6 md:px-12 lg:px-20 font-sora overflow-hidden">

            {/* --- Filter Navigation --- */}
            <div className="max-w-7xl mx-auto mb-20 space-y-12">
                <div className="header-element space-y-4">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-black">Our Harvest</h2>
                    <p className="text-zinc-400 max-w-md font-light">Sourced directly from Ghanaian soil to your kitchen. Quality you can taste, purity you can trust.</p>
                </div>

                <nav className="header-element flex flex-wrap gap-3 border-b border-zinc-100 pb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${activeTab === cat
                                ? "bg-black text-white shadow-xl shadow-black/10 scale-105"
                                : "bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-black"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </div>

            {/* --- Product Grid --- */}
            <div
                ref={gridRef}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card group flex flex-col h-full">
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] bg-zinc-100 rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute top-6 left-6">
                                <Badge type={product.badgeType} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow space-y-3 px-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-semibold tracking-tight text-black group-hover:text-[#4b68ff] transition-colors">
                                    {product.name}
                                </h3>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mt-2">
                                    {product.category.split(' ')[0]}
                                </span>
                            </div>

                            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="mt-auto pt-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-black group-hover:gap-6 transition-all duration-500"
                                >
                                    Order Now <MoveRight size={16} className="text-[#4b68ff]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-40">
                    <p className="text-zinc-300 uppercase tracking-widest font-bold">New inventory arriving soon</p>
                </div>
            )}
        </section>
    );
}