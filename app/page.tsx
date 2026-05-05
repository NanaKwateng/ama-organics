// app/page.tsx

import dynamic from "next/dynamic";
import RootPage from "@/components/sections/RootPage";
import PalmCarousel from "@/components/pages/PalmCarousel";
import VideoRiseSection from "@/components/pages/VideoRiseSection";
import ZigzagMarquee from "@/components/pages/ZigzagMarquee";
import ProductCard from "@/components/pages/ProductCard";
import StuntCards from "@/components/pages/StuntCards";
import Experience from "@/components/pages/Experience";

// Lazy load heavy animation section


export default function Page() {
  return (
    <main className="w-full">

      {/* ✅ STRUCTURED DATA (MUST be inside component) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ama Organics",
            url: "https://ama-organics.com",
            logo: "https://ama-organics.com/logo.png",
          }),
        }}
      />

      {/* ✅ H1 (CRITICAL FOR SEO) */}
      <h1 className="sr-only">
        Buy Organic Food in Ghana – Palm Oil, Smoked Fish, Grains | Ama Organics
      </h1>

      <RootPage />
      <PalmCarousel />
      <StuntCards />

      <section className="bg-black">
        <h2 className="text-3xl md:text-5xl text-white p-8 max-w-2xl">
          Experience pure, natural palm oil — authentic flavor, 100% organic.
        </h2>
        <VideoRiseSection />
      </section>
      <Experience />
      <ProductCard />
      <ZigzagMarquee />

    </main>
  );
}