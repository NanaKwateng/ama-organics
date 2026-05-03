"use client";
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ShoppingBag } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";

const menuLinks = [
    { name: "Home", href: "/", desc: "Return to the beginning of the journey." },
    { name: "About", href: "/about", desc: "Our philosophy, vision, and the team behind the code." },
    { name: "Products", href: "/products", desc: "Explore our collection of high-end digital assets." },
    { name: "Contact", href: "/contact", desc: "Let's start a conversation about your next big idea." },
];

export function DrawerMenu() {
    const menuRef = useRef<HTMLDivElement>(null);

    // GSAP Stagger Animation
    useGSAP(() => {
        const links = gsap.utils.toArray(".menu-item");

        // Ensure initial state is hidden for the fade-in
        gsap.set(links, { opacity: 0, y: 30 });

        // Trigger stagger animation when the component mounts/opens
        gsap.to(links, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.3, // Delay to allow the drawer slide-in to complete
        });
    }, { scope: menuRef });

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <div className="bg-black text-white p-2.5 rounded-full"><ShoppingBag className="size-5" /></div>

            </DrawerTrigger>

            <DrawerContent className="h-full w-full md:w-[500px] ml-auto rounded-none bg-white border-l border-zinc-100 outline-none">
                <div ref={menuRef} className="flex flex-col h-full p-8 md:p-16">

                    {/* Header & Accessibility Requirements */}
                    <div className="flex justify-between items-center mb-16 menu-item">
                        <div>
                            <DrawerTitle className="text-[10px] uppercase tracking-[0.5em] text-[#4b68ff] font-bold">
                                Navigation
                            </DrawerTitle>
                            {/* Hidden but present for Screen Readers */}
                            <DrawerDescription className="sr-only">
                                Main site navigation menu
                            </DrawerDescription>
                        </div>
                        <DrawerClose asChild>
                            <button className="p-3 rounded-full hover:bg-zinc-100 transition-colors">
                                <X className="text-black" size={24} />
                            </button>
                        </DrawerClose>
                    </div>

                    {/* Links Stack */}
                    <nav className="flex flex-col gap-12">
                        {menuLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="menu-item group block"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <h2 className="text-5xl md:text-6xl font-medium tracking-tighter text-black group-hover:text-[#4b68ff] transition-colors duration-300">
                                        {link.name}
                                    </h2>
                                    <ArrowRight
                                        className="text-[#4b68ff] opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out"
                                        size={32}
                                    />
                                </div>
                                <p className="text-zinc-400 text-sm font-light max-w-[300px] leading-relaxed">
                                    {link.desc}
                                </p>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Section */}
                    <div className="mt-auto pt-10 border-t border-zinc-100 menu-item">
                        <p className="text-[9px] uppercase tracking-widest text-zinc-300 mb-4">Social Presence</p>
                        <div className="flex gap-8">
                            {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                                <Link
                                    key={social}
                                    href="#"
                                    className="text-[11px] font-bold uppercase tracking-widest text-black hover:text-[#4b68ff] transition-colors"
                                >
                                    {social}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    );
}