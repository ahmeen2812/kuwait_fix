"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Menu, X, Wrench, Globe, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { language, toggleLanguage, t } = useLanguage();
  const isAr = language === "ar";

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  // Inactivity Auto-Hide Logic (4.5s)
  const resetInactivityTimer = useCallback(() => {
    setIsVisible(true);

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    if (mobileMenuOpen || isHoveredRef.current) {
      return;
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4500);
  }, [mobileMenuOpen]);

  useEffect(() => {
    resetInactivityTimer();

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("scroll", handleUserActivity, { passive: true });
    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("touchmove", handleUserActivity, { passive: true });
    window.addEventListener("click", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });

    return () => {
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
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
      className="fixed top-0 inset-x-0 z-50 pt-2 sm:pt-3 pb-2 sm:pb-3 px-3 sm:px-6 lg:px-8 transition-colors pointer-events-auto"
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

        {/* Inner Content Bar (Zero Overflow, Symmetrical on Mobile & Desktop) */}
        <div className="flex items-center justify-between h-16 sm:h-20 px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* ==========================================================
              SIDE A: BRAND LOGO (Always pinned to start, compact on mobile)
             ========================================================== */}
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-3.5 group flex-shrink-0 select-none"
          >
            {/* Logo Emblem Icon */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 border border-blue-200/80 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              {!logoError ? (
                <Image
                  src={siteConfig.logoPath}
                  alt={siteConfig.brandNameEn}
                  width={40}
                  height={40}
                  className="object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Wrench className="w-5 h-5 text-blue-600 group-hover:rotate-45 transition-transform" />
              )}
            </div>

            {/* Brand Titles */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {siteConfig.brandNameEn}
                </span>
                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-200 hidden xs:inline-block">
                  {siteConfig.brandName}
                </span>
              </div>
              {/* Subtitle hidden on small screens to save space */}
              <span className="text-[10px] font-bold text-slate-400 tracking-wider hidden sm:block">
                {t("brandTag")}
              </span>
            </div>
          </Link>

          {/* ==========================================================
              SIDE B: DESKTOP NAVIGATION LINKS (Hidden on mobile)
             ========================================================== */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 xl:gap-8">
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

          {/* ==========================================================
              SIDE C: ACTIONS, LANGUAGE SWITCHER & MOBILE HAMBURGER
              (Always pinned to end, never hidden on mobile)
             ========================================================== */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Desktop-Only Primary Contact Button */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="hidden sm:inline-flex items-center justify-center overflow-hidden bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black px-4 sm:px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-500/25 transition-all duration-300 group"
            >
              <span className="relative flex items-center gap-1.5">
                <span>{t("contactUs")}</span>
                <PhoneCall className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </span>
            </a>

            {/* Language Toggle Button (Visible on Mobile & Desktop) */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-600 border border-slate-200 hover:border-blue-400 text-xs sm:text-sm font-extrabold px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xs transition-all cursor-pointer flex-shrink-0"
              title={isAr ? "Switch to English" : "تبديل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span className="font-black text-xs">
                {t("langButtonText")}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 hidden sm:inline-block animate-pulse" />
            </motion.button>

            {/* Mobile Hamburger Button (lg:hidden, always visible on mobile) */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                resetInactivityTimer();
              }}
              className="flex lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-blue-600 transition-colors flex-shrink-0 border border-slate-200 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>

          </div>

        </div>

        {/* ==========================================================
            MOBILE DRAWER MENU (Dropdown on Hamburger Tap)
           ========================================================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-white border-t border-slate-100 rounded-b-2xl px-5 pt-3 pb-6 space-y-3 shadow-2xl overflow-hidden"
            >
              <div className="space-y-1">
                {navItems.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-sm sm:text-base font-black text-slate-800 hover:text-blue-600 border-b border-slate-50 transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* Direct Action Buttons Inside Drawer */}
              <div className="pt-2 grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs sm:text-sm shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t("contactUs")}</span>
                </a>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black py-3 rounded-xl text-xs sm:text-sm shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{t("whatsappBtn")}</span>
                </a>
              </div>

              {/* Hotline Micro-Badge */}
              <div className="text-center pt-1 text-[11px] font-bold text-slate-400">
                {isAr ? "طوارئ تكييف وغسالات 24 ساعة بالكويت" : "24/7 Appliance & AC Emergency Hotline"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
}