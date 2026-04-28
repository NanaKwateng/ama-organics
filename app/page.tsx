
import LandingPage from "@/components/pages/LandingPage";
import PalmCarousel from "@/components/pages/PalmCarousel";
import VideoRiseSection from "@/components/pages/VideoRiseSection";
import ZigzagMarquee from "@/components/pages/ZigzagMarquee";
import PalmScroll from "@/components/pages/PalmScroll";
import LusionSection from "@/components/pages/ScrollFiish";
import LusionExperience from "@/components/pages/Lusion-experience";
import ProductCard from "@/components/pages/ProductCard";
import About from "@/components/pages/About";
import Contact from "@/components/pages/contact";
import AmaProductShowcase from "@/components/pages/Products";
import CinematicHero from "@/components/pages/CinematicHero";
import EditorialHero from "@/components/pages/EditorialHero";
import StuntCards from "@/components/pages/StuntCards";
import HexagonHero from "@/components/pages/HexagonHero";


export default function Home() {
  return (
    <div className="w-full">
      {/* <LandingPage /> */}
      <EditorialHero />
      {/* <CinematicHero /> */}
      <PalmCarousel />
      <StuntCards />
      <div className="bg-black">
        <h2 className="text-3xl md:text-5xl text-white p-8 max-w-2xl">
          Experience the pure, natural taste of palm oil,authentic flavor - 100% organic palm oil
        </h2>
        <VideoRiseSection />
      </div>
      <LusionExperience />
      <ProductCard />
      <div className="hidden">
        <HexagonHero />
      </div>
      {/* <PalmScroll /> */}
      <ZigzagMarquee />
    </div>
  );
}





