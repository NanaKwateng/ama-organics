import Hero from "@/components/pages/Hero";
import WhySection from "@/components/sections/WhySection";
import ProductSection from "@/components/sections/ProductSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

export default function LandingPage() {
    return (
        <main className="bg-[#fdfaf6]">
            <Hero />
            <WhySection />
            {/* <ProductSection /> */}
            <TestimonialSection />
            <CTASection />

            {/* Floating WhatsApp */}
            <WhatsAppButton />
        </main>
    );
}