"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Menu, X, Wrench, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { language, toggleLanguage, t } = useLanguage();

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  // -------------------------------------------------------------
  // INACTIVITY AUTO-HIDE LOGIC (4.5 Seconds Timer)
  // -------------------------------------------------------------
  const resetInactivityTimer = useCallback(() => {
    // Always bring the navbar back into view upon interaction
    setIsVisible(true);

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    // Do not hide if the user is hovering over the navbar or mobile menu is open
    if (mobileMenuOpen || isHoveredRef.current) {
      return;
    }

    // Start 4.5 seconds countdown
    inactivityTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4500);
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Start initial timer
    resetInactivityTimer();

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    // Listen for any activity: scroll, touch, mouse movement, click, or key press
    window.addEventListener("scroll", handleUserActivity, { passive: true });
    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("touchmove", handleUserActivity, { passive: true });
    window.addEventListener("click", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("touchmove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [resetInactivityTimer]);

  const navItems = [
    { title: t("home"), href: "/" },
    { title: t("washingMachine"), href: "/washing-machine-repair" },
    { title: t("acRepair"), href: "/ac-repair" },
    { title: t("fridgeRepair"), href: "/refrigerator-repair" },
  ];

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsVisible(true);
        if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        resetInactivityTimer();
      }}
      className="fixed top-0 inset-x-0 z-50 pt-3 pb-3 px-4 sm:px-6 lg:px-8 transition-colors pointer-events-auto"
    >
      <div className="relative max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.12)]">
        
        {/* Animated Perimeter SVG Border */}
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

            {/* Language Toggle Button */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-600 border border-slate-200 hover:border-blue-400 text-sm font-extrabold px-4 py-2.5 rounded-full shadow-2xs transition-all duration-300 group overflow-hidden cursor-pointer"
              title={language === "en" ? "تبديل إلى العربية" : "Switch to English"}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Globe className="w-4 h-4 text-blue-600 transition-transform duration-500 group-hover:rotate-180" />

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

              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </motion.button>
          </div>

          {/* 2. Navigation Links */}
         <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7">
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
        Homexa
      </span>
      <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-200">
        هوميكسا
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
        alt="Homexa"
        width={42}
        height={42}
        className="object-contain p-1"
        onError={() => setLogoError(true)}
      />
    ) : (
      <span className="font-black text-sm text-blue-600">HX</span>
    )}
  </div>
</Link>

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
    </motion.header>
  );
}

