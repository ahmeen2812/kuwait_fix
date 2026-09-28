"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PhoneCall, Menu, X, Wrench, Sparkles, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-3 pb-3 px-4 sm:px-6 lg:px-8 bg-white/85 backdrop-blur-md transition-all">
      {/* Outer Floating Nav Container with Animated Tracing Border */}
      <div className="relative max-w-7xl mx-auto bg-white/95 rounded-2xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.08)]">
        
        {/* SVG Animated Perimeter Border (Starts from right, traces around on load) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx="16"
            fill="none"
            stroke="url(#navbarBorderGradient)"
            strokeWidth="2.5"
            className="animate-navbar-border"
          />
          <defs>
            <linearGradient id="navbarBorderGradient" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner Content */}
        <div className="flex items-center justify-between h-20 px-6 sm:px-8 relative z-10">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 border border-blue-200/80 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
              {!logoError ? (
                <Image
                  src={siteConfig.logoPath}
                  alt={siteConfig.brandName}
                  width={46}
                  height={46}
                  className="object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Wrench className="w-5 h-5 text-blue-600 group-hover:rotate-45 transition-transform duration-300" />
              )}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  Fix
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                صيانة معتمدة بالكويت
              </span>
            </div>
          </Link>

          {/* 2. Navigation Links with Left-to-Right Underline on Hover */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-underline py-2 text-sm font-extrabold text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* 3. Conversion Actions: WhatsApp & Unified "اتصل بنا" CTA */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Quick WhatsApp button */}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300 hover:border-emerald-600 text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all duration-300 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors" />
              <span>واتساب</span>
            </a>

            {/* Primary Action Button (Unified: اتصل بنا) */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="relative inline-flex items-center justify-center overflow-hidden bg-blue-600 hover:bg-blue-700 text-white text-sm font-black px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/25 transition-all duration-300 group"
            >
              {/* Shimmer Light Reflection Sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer pointer-events-none" />

              <span className="relative flex items-center gap-2">
                <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{siteConfig.unifiedCtaText}</span>
              </span>
            </a>
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 rounded-b-2xl px-6 pt-4 pb-6 space-y-3 shadow-inner">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-bold text-slate-800 hover:text-blue-600 border-b border-slate-50 transition-colors"
              >
                {link.title}
              </Link>
            ))}

            <div className="pt-2 grid grid-cols-2 gap-2.5">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-bold py-3 rounded-xl text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-black py-3 rounded-xl text-sm shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{siteConfig.unifiedCtaText}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}