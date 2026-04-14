"use client";

import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";

export default function WhatsAppButton() {
    const phone = "233XXXXXXXXX"; // replace with your number
    const message = encodeURIComponent(
        "Hello Ama Organics, I would like to order your premium palm oil."
    );

    const link = `https://wa.me/${phone}?text=${message}`;

    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order via WhatsApp"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 transition"
        >
            <MdWhatsapp size={25} /> WhatsApp
        </Link>
    );
}