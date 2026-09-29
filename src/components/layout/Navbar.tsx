"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Menu, X, Wrench, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { title: t("home"), href: "/" },
    { title: t("washingMachine"), href: "/washing-machine-repair" },
    { title: t("acRepair"), href: "/ac-repair" },
    { title: t("fridgeRepair"), href: "/refrigerator-repair" },
  ];

  return (
    <header className="sticky top-0 z-50 pt-3 pb-3 px-4 sm:px-6 lg:px-8 bg-white/85 backdrop-blur-md transition-all">
      <div className="relative max-w-7xl mx-auto bg-white/95 rounded-2xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.08)]">
        
        {/* Animated Perimeter Border */}
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
          
          {/* 1. Conversion Action & Language Toggle Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Primary Action Button */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="relative inline-flex items-center justify-center overflow-hidden bg-blue-600 hover:bg-blue-700 text-white text-sm font-black px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-500/25 transition-all duration-300 group"
            >
              <span className="relative flex items-center gap-2">
                <span>{t("contactUs")}</span>
                <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </span>
            </a>

            {/* NEW ANIMATED LANGUAGE SWITCHER (Replaces WhatsApp button) */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-600 border border-slate-200 hover:border-blue-400 text-sm font-extrabold px-4 py-2.5 rounded-full shadow-2xs transition-all duration-300 group overflow-hidden cursor-pointer"
              title={language === "en" ? "تبديل إلى العربية" : "Switch to English"}
            >
              {/* Subtle background glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Rotating Globe Icon */}
              <Globe className="w-4 h-4 text-blue-600 transition-transform duration-500 group-hover:rotate-180" />

              {/* Animated Text Swap */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="font-black text-xs sm:text-sm tracking-wide"
                >
                  {t("langButtonText")}
                </motion.span>
              </AnimatePresence>

              {/* Active Dot Indicator */}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </motion.button>
          </div>

          {/* 2. Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="nav-link-underline py-2 text-sm font-extrabold text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* 3. Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="flex flex-col text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  Kuwait Fix
                </span>
                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-200">
                  Fix
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                {t("brandTag")}
              </span>
            </div>

            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 border border-blue-200/80 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
              {!logoError ? (
                <Image
                  src={siteConfig.logoPath}
                  alt="Kuwait Fix"
                  width={42}
                  height={42}
                  className="object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Wrench className="w-5 h-5 text-blue-600 group-hover:rotate-45 transition-transform duration-300" />
              )}
            </div>
          </Link>

          {/* 4. Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg border border-slate-200 text-xs font-bold flex items-center gap-1 bg-slate-50"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{t("langButtonText")}</span>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 rounded-b-2xl px-6 pt-4 pb-6 space-y-3 shadow-inner">
            {navItems.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-bold text-slate-800 hover:text-blue-600 border-b border-slate-50 transition-colors"
              >
                {link.title}
              </Link>
            ))}

            <div className="pt-2">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-black py-3 rounded-xl text-sm shadow-sm"
              >
                <span>{t("contactUs")}</span>
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}