import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import LightRays from "@/components/LightRays";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Background layer - positioned behind all content */}
      <div className="fixed inset-0 -z-10">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={1.5}
          rayLength={2}
          pulsating={true}
          fadeDistance={1.2}
          saturation={0.8}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
      
      {/* Content layer - positioned above background */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturedProjectsSection />
        <ServicesSection />
        <AboutSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}