import CreativeSlider from "@/components/pages/ProductSlider";
import HeroSection from "@/components/pages/Hero";
import LandingPage from "@/components/pages/LandingPage";
import PalmCarousel from "@/components/pages/PalmCarousel";
import VideoRiseSection from "@/components/pages/VideoRiseSection";
import ZigzagMarquee from "@/components/pages/ZigzagMarquee";
import PalmScroll from "@/components/pages/PalmScroll";
import OrganicSlider from "@/components/pages/OrganicSlider";


export default function Home() {
  return (
    <div className="w-full">
      <LandingPage />
      <PalmCarousel />
      <div className="bg-black">
        <h2 className="text-5xl text-white p-8 max-w-2xl">
          Experience the pure, natural taste of palm oil,authentic flavor of 100% organic palm oil
        </h2>
        <VideoRiseSection />
      </div>
      <PalmScroll />
      <ZigzagMarquee />
      <div className="">
        <h2 className="text-6xl py-12 px-5 max-w-3xl">
          Experience more of what Ama Organics has to offer.
        </h2>
        <OrganicSlider />
      </div>
    </div>
  );
}





