import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      {/* 1. Navbar with Animated Perimeter Border & Left-to-Right Hover */}
      <Navbar />

      {/* 2. Hero Section with Top-to-Down Image Entrance & Unified CTAs */}
      <Hero />
    </div>
  );
}