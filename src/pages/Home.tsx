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
    <div className="min-h-screen bg-background relative">
      {/* Background layer - positioned behind all content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={1.5}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0.02}
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