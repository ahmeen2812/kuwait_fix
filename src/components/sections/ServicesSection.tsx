"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  PhoneCall, 
  ArrowLeft, 
  ArrowRight, 
  Wrench, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { servicesData, ServiceItem } from "@/data/servicesData";

export default function ServicesSection() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  return (
    <section 
      id="services" 
      className="py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80 relative overflow-hidden overflow-x-clip"
    >
      {/* Lightweight Ambient Background */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px"
        }}
      />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==========================================================
            Section Header: Smooth GPU Fade-Up
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-20 gpu-layer"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 px-4 py-1.5 rounded-full mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-wide">
              {isAr ? "دقة، جودة، وكفالة معتمدة" : "Precision, Quality & Certified Warranty"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
            {isAr ? (
              <>
                خدماتنا المعتمدة في{" "}
                <span className="text-blue-600 inline-block relative">
                  الكويت
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-600/30 rounded-full" />
                </span>
              </>
            ) : (
              <>
                Our Certified Services in{" "}
                <span className="text-blue-600 inline-block relative">
                  Kuwait
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-600/30 rounded-full" />
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isAr
              ? "نوفر حلول صيانة منزلية متكاملة لجميع أنواع الأجهزة الكهربائية والتكييف، مع فحص إلكتروني فوري وضمان كتابي لراحة بالك."
              : "We provide complete home maintenance solutions for all major home appliances and AC systems, backed by certified diagnostic checks and written warranties."}
          </p>
        </motion.div>

        {/* ==========================================================
            Services Grid: Multi-Directional Staggered GPU Entrance
           ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <OptimizedServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isAr={isAr} 
              ctaText={t("contactUs")}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ==========================================================
   High-Performance Animated Card Component (Zero Lag / GPU Accelerated)
   ========================================================== */
interface OptimizedServiceCardProps {
  service: ServiceItem;
  index: number;
  isAr: boolean;
  ctaText: string;
}

function OptimizedServiceCard({ service, index, isAr, ctaText }: OptimizedServiceCardProps) {
  const [imgError, setImgError] = useState(false);

  // Directional assignment based on 3-column grid position:
  // Col 0 (left): Slides in from Left
  // Col 1 (center): Drops from Top or rises from Bottom
  // Col 2 (right): Slides in from Right
  const colIndex = index % 3;

  const initialOffset = useMemo(() => {
    if (colIndex === 0) return { x: -60, y: 0 };
    if (colIndex === 1) return { x: 0, y: index < 3 ? -50 : 50 };
    return { x: 60, y: 0 };
  }, [colIndex, index]);

  // Master Parent Card Variant (Handles entry and cascades down to children without extra observers)
  const masterCardVariant: Variants = {
    hidden: { 
      opacity: 0, 
      x: initialOffset.x, 
      y: initialOffset.y,
      scale: 0.96
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.12, // Efficient column stagger
        when: "beforeChildren",    // Triggers internal elements smoothly
        staggerChildren: 0.06,     // Rapid cascade for text & checklist
      },
    },
  };

  // Image Frame Reveal Variant
  const imageFrameVariant: Variants = {
    hidden: { opacity: 0, scale: 1.08, y: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Title & Text Variant (Slides in from origin)
  const textElementVariant: Variants = {
    hidden: { opacity: 0, x: isAr ? 20 : -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Checklist Item Variant
  const checklistItemVariant: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  // Action Buttons Spring-Free GPU Pop-Up
  const buttonsVariant: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      variants={masterCardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px", amount: 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-blue-500/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.16)] overflow-hidden flex flex-col justify-between transition-colors duration-250 group gpu-layer"
    >
      {/* ==========================================================
          Part A: Top Image Frame with Staged Scale/Reveal
         ========================================================== */}
      <div className="relative w-full h-56 sm:h-60 bg-slate-900 overflow-hidden">
        <motion.div 
          variants={imageFrameVariant}
          className="relative w-full h-full gpu-layer"
        >
          {!imgError ? (
            <Image
              src={service.image}
              alt={isAr ? service.title.ar : service.title.en}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-50 to-slate-100 text-slate-700">
              <div className="w-12 h-12 rounded-xl bg-white border border-blue-200 shadow-2xs flex items-center justify-center mb-2">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-slate-500 font-mono">
                {service.image}
              </span>
            </div>
          )}
        </motion.div>

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Warranty / Action Badge */}
        <div className={`absolute top-4 ${isAr ? "right-4" : "left-4"} z-10`}>
          <span className="bg-white/95 backdrop-blur-xs text-blue-700 text-xs font-black px-3.5 py-1 rounded-full shadow-sm border border-blue-100 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{isAr ? service.badge.ar : service.badge.en}</span>
          </span>
        </div>

        {/* Number Indicator in Opposite Corner */}
        <div className={`absolute top-4 ${isAr ? "left-4" : "right-4"} z-10`}>
          <span className="w-8 h-8 rounded-xl bg-slate-950/80 backdrop-blur-xs text-white text-xs font-black flex items-center justify-center border border-white/20">
            {service.number}
          </span>
        </div>

        {/* Bottom Category Tag */}
        <div className={`absolute bottom-3.5 ${isAr ? "right-4" : "left-4"} z-10`}>
          <span className="text-white text-xs font-extrabold bg-blue-600/90 backdrop-blur-xs px-3 py-1 rounded-md shadow-xs">
            {isAr ? service.category.ar : service.category.en}
          </span>
        </div>
      </div>

      {/* ==========================================================
          Part B: Staged Title, Description & Checklist Sequence
         ========================================================== */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Animated Service Title */}
          <motion.div variants={textElementVariant} className="gpu-layer">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-200 mb-2.5 leading-snug">
              {isAr ? service.title.ar : service.title.en}
            </h3>

            {/* Service Description Paragraph */}
            <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
              {isAr ? service.description.ar : service.description.en}
            </p>
          </motion.div>

          {/* 4-Point Feature Checklist (Cascading Stagger via Parent) */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
            {(isAr ? service.features.ar : service.features.en).map((feat, idx) => (
              <motion.div 
                key={idx} 
                variants={checklistItemVariant}
                className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 gpu-layer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==========================================================
            Part C: Action Buttons Smooth Entrance
           ========================================================== */}
        <motion.div 
          variants={buttonsVariant}
          className="pt-4 border-t border-slate-100 flex items-center gap-3 gpu-layer"
        >
          {/* Unified CTA Phone Call Button */}
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-blue-500/25 transition-all duration-200 active:scale-95 group/btn"
          >
            <PhoneCall className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform duration-200" />
            <span>{ctaText}</span>
          </a>

          {/* Dedicated Landing Page Arrow Link */}
          <Link
            href={service.slug}
            className="bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors duration-200"
            title={isAr ? "تفاصيل الخدمة" : "Service Details"}
          >
            <span className="hidden sm:inline">{isAr ? "التفاصيل" : "Details"}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform duration-200" />
            ) : (
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
}