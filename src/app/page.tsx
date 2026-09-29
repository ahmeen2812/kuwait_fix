import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustFeatures from "@/components/sections/TrustFeatures";
import ServicesSection from "@/components/sections/ServicesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFCFF] overflow-x-hidden">
      {/* 1. Navbar with Language Switcher */}
      <Navbar />

      {/* 2. Hero Section with Line Reveal */}
      <Hero />

      {/* 3. Scroll-Triggered Standards Section */}
      <TrustFeatures />

      {/* 4. Complete Services Section (6 Cards) */}
      <ServicesSection />

      {/* 5. Google Maps Reviews Section */}
      <ReviewsSection />

      {/* 6. Client Info Showcase & Booking Form */}
      <ContactSection />
    </div>
  );
}

