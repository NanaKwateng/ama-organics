import Contact from "@/components/pages/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Ama Organics. Order pure Ghanaian palm oil, smoked fish, and organic produce. Call, email, or WhatsApp us today.",
    alternates: {
        canonical: "https://www.ama-organics.com/contact",
    },
};

export default function ContactPage() {
    return (
        <div className="w-full">
            <Contact />
        </div>
    );
}