"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const bigTextRef = useRef<HTMLHeadingElement>(null);

    // Dynamic Year Function
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Reveal Animation on Scroll
            gsap.from(".footer-reveal", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                },
            });

            // Parallax effect on the big brand name
            gsap.to(bigTextRef.current, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#f8f7f4] text-black pt-32 pb-10 px-6 md:px-20 overflow-hidden"
        >
            <div className="max-w-[1800px] mx-auto">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">

                    {/* Brand Voice / Mission */}
                    <div className="md:col-span-5 space-y-6">
                        <p className="footer-reveal text-2xl md:text-3xl font-medium leading-tight tracking-tight max-w-md text-zinc-600">
                            Ama Organics is a bridge between
                            <span className="text-black"> Ghana&apos;s rich soil </span>
                            and your kitchen table,
                            <span className="text-black"> providing uncompromised quality </span>
                            and
                            <span className="text-black"> ensuring absolute food safety </span>
                            in every drop and every bite.
                        </p>
                        <div className="footer-reveal flex gap-4 pt-4 space-y-5">
                            <Link href="/contact" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 transition-colors hover:text-[#4b68ff] hover:border-[#4b68ff]">
                                Let's Grow Together
                                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-2 md:col-start-7 space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">Explore</h4>
                        <ul className="space-y-3 font-medium">
                            <li className="footer-reveal hover:translate-x-2 transition-transform cursor-pointer">
                                <Link href={"/about"}>
                                    Our Story
                                </Link>
                            </li>
                            <li className="footer-reveal hover:translate-x-2 transition-transform cursor-pointer"> <Link href={"/products"}>
                                Market
                            </Link></li>
                            <li className="footer-reveal hover:translate-x-2 transition-transform cursor-pointer"> <Link href={"/contact"}>
                                Reach out
                            </Link></li>

                        </ul>
                    </div>

                    <div className="md:col-span-4 space-y-6 mt-20 md:mt-0">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">Connect</h4>
                        <div className="grid grid-cols-1 gap-4 font-medium">

                            {/* Email Connection */}
                            <Link
                                href="mailto:feli@amaorganics.com"
                                className="footer-reveal flex items-center gap-2 group cursor-pointer"
                            >
                                <HiOutlineMail size={18} className="text-zinc-400 group-hover:text-black transition-colors" />
                                <span className="group-hover:text-black transition-colors text-sm">Feli@amaorganics.com</span>
                            </Link>

                            {/* WhatsApp Connection */}
                            <Link
                                href="https://wa.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-reveal flex items-center gap-2 group cursor-pointer"
                            >
                                <FaWhatsapp size={18} className="text-zinc-400 group-hover:text-green-600 transition-colors" />
                                <span className="group-hover:text-black transition-colors text-sm">Chat on WhatsApp</span>
                            </Link>

                            {/* Phone Call Connection */}
                            <Link
                                href="tel:+233538616763"
                                className="footer-reveal flex items-center gap-2 group cursor-pointer"
                            >
                                <HiOutlinePhone size={18} className="text-zinc-400 group-hover:text-black transition-colors" />
                                <span className="group-hover:text-black transition-colors text-sm">+233 538 616 763</span>
                            </Link>

                        </div>
                    </div>
                </div>

                {/* Big Scalable Brand Mark - Inspired by "Faizur" */}
                <div className="relative select-none pointer-events-none mb-12">
                    <h2
                        ref={bigTextRef}
                        className="text-[22vw] font-bold leading-[0.7] tracking-tighter text-black lowercase -ml-[1vw]"
                    >
                        ama organics
                    </h2>
                </div>

                {/* Bottom Footer Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-black/5 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 gap-6">
                    <div className="footer-reveal">
                        Copyright © {currentYear} | Ama Organic Foods
                    </div>
                    <div className="flex gap-8">
                        <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                    <div className="footer-reveal flex items-center gap-2">
                        Ghana, West Africa <span className="w-1 h-1 bg-green-600 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </footer>
    );
}