"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Phone, Mail, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 1. Zod Validation Schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactDetails = [
    { label: "Direct Call", value: "+233 24 123 4567", href: "tel:+233241234567", icon: Phone },
    { label: "Official Email", value: "Feli@amaorganics.com", href: "mailto:Feli@amaorganics.com", icon: Mail },
    { label: "WhatsApp", value: "Chat with Us", href: "https://wa.me/233241234567", icon: MessageSquare },
];

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // Entry Sequence
        tl.from(".image-container", { scale: 1.2, duration: 2 })
            .from(".form-reveal", { y: 60, opacity: 0, stagger: 0.1, duration: 1.2 }, "-=1.5");

        // Interactive Image Parallax
        const handleMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;

            gsap.to(".contact-image", {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, { scope: containerRef });

    const onSubmit = async (data: ContactFormValues) => {
        // Simulate real-time functionality
        console.log("Form Data:", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Message sent successfully via Lusion Pipeline.");
    };

    return (
        <main ref={containerRef} className="bg-white min-h-screen w-full overflow-x-hidden font-sora">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* --- LEFT: DYNAMIC IMAGE SECTION --- */}
                <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-hidden bg-zinc-100">
                    <div className="image-container h-full w-full relative">
                        <Image
                            src="/images/orange.jpeg"
                            alt="Studio Interior"
                            className="contact-image absolute inset-0 w-[110%] h-[110%] object-cover object-center scale-110"
                            fill
                            priority
                        />
                        {/* Architectural Overlay */}
                        <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
                        <div className="absolute bottom-12 left-12 text-white z-10 hidden lg:block">
                            <p className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-60 mb-2">Location</p>
                            <h4 className="text-xl font-medium">Accra - Ghana</h4>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: INTERACTIVE FORM SECTION --- */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">

                    <div className="max-w-xl mx-auto w-full space-y-12">
                        <div className="form-reveal space-y-4">
                            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.85] text-black">
                                Let's <br /> Connect.
                            </h1>
                            <p className="text-zinc-700 text-lg font-light leading-relaxed">
                                Whether you have a specific project in mind or just want to say hi, our doors are always open.
                            </p>
                        </div>

                        {/* Quick Contact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 form-reveal">
                            {contactDetails.map((item, i) => (
                                <Link key={i} href={item.href} className="group border-b border-zinc-100 pb-6 transition-all hover:border-[#4b68ff]">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-3 group-hover:text-[#4b68ff]">{item.label}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-black">{item.value}</span>
                                        <item.icon size={14} className="text-[#4b68ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Zod Validated Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 form-reveal pt-8">
                            <div className="relative group">
                                <input
                                    {...register("name")}
                                    placeholder="Your Name"
                                    className={`w-full text-xl bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-zinc-200'} py-4 outline-none focus:border-[#4b68ff] transition-colors placeholder:text-zinc-800`}
                                />
                                {errors.name && <span className="text-[10px] text-red-500 uppercase font-bold mt-1 block">{errors.name.message}</span>}
                            </div>

                            <div className="relative group">
                                <input
                                    {...register("email")}
                                    placeholder="Email Address"
                                    className={`w-full text-xl bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-zinc-200'} py-4 outline-none focus:border-[#4b68ff] transition-colors placeholder:text-zinc-800`}
                                />
                                {errors.email && <span className="text-[10px] text-red-500 uppercase font-bold mt-1 block">{errors.email.message}</span>}
                            </div>

                            <div className="relative group">
                                <textarea
                                    {...register("message")}
                                    placeholder="Your message"
                                    rows={4}
                                    className={`w-full text-xl bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-zinc-200'} py-4 outline-none resize-none focus:border-[#4b68ff] transition-colors placeholder:text-zinc-800`}
                                />
                                {errors.message && <span className="text-[10px] text-red-500 uppercase font-bold mt-1 block">{errors.message.message}</span>}
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="group relative flex items-center gap-6 bg-black text-white px-10 py-5 rounded-full overflow-hidden hover:bg-[#4b68ff] transition-all duration-500 disabled:opacity-50"
                            >
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] relative z-10">
                                    {isSubmitting ? "Transmitting..." : "Send Inquiry"}
                                </span>
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Aesthetic Border Framing */}
            <div className="fixed inset-0 pointer-events-none border-[12px] border-white z-50 hidden lg:block" />
        </main>
    );
}