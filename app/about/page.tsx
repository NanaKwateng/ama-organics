import About from "@/components/pages/About";
import LusionSection from "@/components/pages/ScrollFiish";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Ama Organics — our story, mission, and commitment to pure, organic Ghanaian food. Supporting local farmers since day one.",
    alternates: {
        canonical: "https://www.ama-organics.com/about",
    },
};


export default function AboutPage() {
    return (
        <div className="w-full">
            <LusionSection />

            <div className="relative py-12 px-8 mt-8 mb-6">
                <h2 className="text-5xl font-medium max-w-xl text-wrap">Discover more about Ama Organic Foods</h2>
            </div>
            <About />
        </div>
    );
}