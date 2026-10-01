"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp, 
  ChevronRight, 
  ChevronLeft, 
  MessageCircle, 
  Wrench, 
  Sparkles, 
  CheckCircle2,
  Award
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";
  const [logoError, setLogoError] = useState(false);

  // Smooth scroll back to top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const kuwaitAreas = [
    { ar: "السالمية", en: "Salmiya" },
    { ar: "حولي", en: "Hawally" },
    { ar: "الجابرية", en: "Jabriya" },
    { ar: "الفروانية", en: "Farwaniya" },
    { ar: "مشرف", en: "Mishref" },
    { ar: "بيان", en: "Bayan" },
    { ar: "صباح السالم", en: "Sabah Al-Salem" },
    { ar: "الروضة", en: "Al-Rawda" },
    { ar: "مبارك الكبير", en: "Mubarak Al-Kabeer" },
    { ar: "الجهراء", en: "Al-Jahra" },
    { ar: "القادسية", en: "Al-Qadisiya" },
    { ar: "مدينة الكويت", en: "Kuwait City" },
  ];

  const servicesList = [
    { ar: "تصليح الغسالات الأوتوماتيك", en: "Washing Machine Repair", href: "/washing-machine-repair" },
    { ar: "تصليح وصيانة المكيفات", en: "Air Conditioner Repair", href: "/ac-repair" },
    { ar: "تصليح الثلاجات والفريزر", en: "Refrigerator & Freezer Repair", href: "/refrigerator-repair" },
    { ar: "غسيل وتنظيف مكيفات سبليت", en: "Split AC Deep Cleaning", href: "/ac-repair" },
    { ar: "صيانة التكييف المركزي للقسائم", en: "Central AC System Service", href: "/ac-repair" },
    { ar: "تبديل كمبروسر وشحن فريون", en: "Compressor & Gas Recharge", href: "/ac-repair" },
  ];

  const quickLinks = [
    { ar: "الرئيسية", en: "Home", href: "/" },
    { ar: "خدماتنا المعتمدة", en: "Our Services", href: "#services" },
    { ar: "آراء وتقييمات العملاء", en: "Customer Reviews", href: "#reviews" },
    { ar: "طلب فني صيانة", en: "Book a Technician", href: "#contact" },
  ];

  // Motion Variants
  const columnVariant: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: custom * 0.08,
      },
    }),
  };

  return (
    <footer className="bg-[#07131F] text-slate-300 relative overflow-hidden border-t-2 border-slate-800">
      
      {/* Ambient Gradient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ==========================================================
          1. PRE-FOOTER: Urgent Dispatch Callout Banner
         ========================================================== */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="bg-gradient-to-r from-blue-900/40 via-slate-900/80 to-blue-900/40 border border-blue-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Left/Content Side */}
            <div className="space-y-3 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-black text-blue-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {isAr ? "فنيو الطوارئ متواجدون الآن في الكويت" : "Emergency Technicians On Duty in Kuwait"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isAr ? "هل تحتاج إلى فني صيانة عاجل في منزلك؟" : "Need Urgent Appliance Repair at Home?"}
              </h3>

              <p className="text-sm text-slate-400 font-medium max-w-xl">
                {isAr
                  ? "فنيونا المعتمدون مجهزون بأحدث أدوات الفحص وقطع الغيار الأصلية ويصلون إلى باب منزلك خلال 45 دقيقة."
                  : "Certified technicians equipped with genuine parts arrive at your doorstep across all Kuwait areas in 45 minutes."}
              </p>
            </div>

            {/* Right/Action Buttons Side */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 flex-shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-103 active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span dir="ltr">{siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-103 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isAr ? "محادثة واتساب" : "WhatsApp Chat"}</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ==========================================================
          2. MAIN FOOTER CONTENT GRID
         ========================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-right">
          
          {/* Column 1: Brand & Credibility (4 Cols) */}
          <motion.div
            custom={0}
            variants={columnVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-4 space-y-5 gpu-layer"
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                {!logoError ? (
                  <Image
                    src={siteConfig.logoPath}
                    alt={siteConfig.brandName}
                    width={42}
                    height={42}
                    className="object-contain p-1"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <Wrench className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-white tracking-tight">
                    {siteConfig.brandName}
                  </span>
                  <span className="text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
                    Fix
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                  {isAr ? "صيانة معتمدة داخل الكويت" : "Certified Maintenance in Kuwait"}
                </span>
              </div>
            </Link>

            {/* Mission Statement */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              {isAr
                ? "الشركة الرائدة والمتخصصة في صيانة وتصليح الغسالات والمكيفات والثلاجات في كافة مناطق الكويت. خبرة تتجاوز 20 عاماً بكوادر فنية مؤهلة وقطع غيار أصلية مع كفالة كتابية معتمدة."
                : "The leading certified repair contractor for washing machines, air conditioning, and refrigerators in Kuwait. Over 20 years of experience with genuine parts and written warranties."}
            </p>

            {/* Credibility Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? "خبرة 20+ عاماً" : "20+ Years Trust"}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? "كفالة قطع أصلية" : "OEM Parts Warranty"}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? "خدمة 24 ساعة" : "24/7 Service"}</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links (2 Cols) */}
          <motion.div
            custom={1}
            variants={columnVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-2 space-y-4 gpu-layer"
          >
            <h4 className="text-sm font-black text-white tracking-wide border-b border-slate-800 pb-2.5">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    {isAr ? (
                      <ChevronLeft className="w-3.5 h-3.5 text-blue-400 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    )}
                    <span>{isAr ? item.ar : item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Core Services (3 Cols) */}
          <motion.div
            custom={2}
            variants={columnVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-3 space-y-4 gpu-layer"
          >
            <h4 className="text-sm font-black text-white tracking-wide border-b border-slate-800 pb-2.5">
              {isAr ? "خدمات الصيانة المعتمدة" : "Repair Services"}
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {servicesList.map((item) => (
                <li key={item.ar}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    {isAr ? (
                      <ChevronLeft className="w-3.5 h-3.5 text-blue-400 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    )}
                    <span>{isAr ? item.ar : item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Kuwait Areas (3 Cols) */}
          <motion.div
            custom={3}
            variants={columnVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-3 space-y-4 gpu-layer"
          >
            <h4 className="text-sm font-black text-white tracking-wide border-b border-slate-800 pb-2.5">
              {isAr ? "التواصل ومناطق التغطية" : "Contact & Coverage"}
            </h4>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <span dir="ltr" className="font-bold">{siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span dir="ltr" className="text-xs truncate">{siteConfig.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{isAr ? "دولة الكويت - كافة المحافظات" : "State of Kuwait - All Governorates"}</span>
              </div>
            </div>

            {/* Kuwait Areas Badges */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold text-slate-400 mb-2">
                {isAr ? "نخدم جميع مناطق الكويت:" : "Serving All Kuwait Regions:"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {kuwaitAreas.slice(0, 8).map((area) => (
                  <span
                    key={area.en}
                    className="text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded"
                  >
                    {isAr ? area.ar : area.en}
                  </span>
                ))}
                <span className="text-[10px] text-blue-400 font-bold px-1.5 py-0.5">
                  {isAr ? "+ باقي المناطق" : "+ More"}
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* ==========================================================
          3. BOTTOM BAR (Copyright, Legal & Scroll to Top)
         ========================================================== */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium text-center sm:text-right">
            
            {/* Copyright */}
            <div>
              <span>
                {isAr
                  ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} كويت فيكس (Kuwait Fix). صيانة الأجهزة المنزلية والتكييف بالكويت.`
                  : `© ${new Date().getFullYear()} Kuwait Fix. All rights reserved. Certified Home Appliance & AC Maintenance in Kuwait.`}
              </span>
            </div>

            {/* Scroll to Top Action Button */}
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-slate-400 hidden md:inline">
                {isAr ? "خدمة معتمدة منذ 2004" : "Serving Kuwait Homeowners since 2004"}
              </span>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                title={isAr ? "الرجوع لأعلى الصفحة" : "Scroll to top"}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}