"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { PhoneCall, MessageCircle, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  const dotToLineVariant: Variants = {
    hidden: { scaleY: 0, opacity: 0, transformOrigin: "top center" },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.35 },
    },
  };

  const textBehindLineVariant: Variants = {
    hidden: { x: 35, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.85 },
    },
  };

  const cornerTopRightVariant: Variants = {
    hidden: { x: -40, y: 40, opacity: 0, scale: 0.4 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  const cornerBottomLeftVariant: Variants = {
    hidden: { x: 40, y: -40, opacity: 0, scale: 0.4 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  const imageExpandVariant: Variants = {
    hidden: { scale: 0.88, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAFCFF] via-white to-slate-50 border-b border-slate-200/80">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px"
        }}
      />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <motion.div 
                variants={cornerTopRightVariant}
                initial="hidden"
                animate="visible"
                className="absolute -top-3.5 -right-3.5 w-16 h-16 border-t-[3.5px] border-r-[3.5px] border-blue-600 rounded-tr-2xl z-30 pointer-events-none"
              />
              <motion.div 
                variants={cornerBottomLeftVariant}
                initial="hidden"
                animate="visible"
                className="absolute -bottom-3.5 -left-3.5 w-16 h-16 border-b-[3.5px] border-l-[3.5px] border-blue-400 rounded-bl-2xl z-30 pointer-events-none"
              />

              <motion.div 
                variants={imageExpandVariant}
                initial="hidden"
                animate="visible"
                className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100"
              >
                {!imageError ? (
                  <Image
                    src={siteConfig.heroTeamImage}
                    alt="Kuwait Fix Technicians"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-blue-50/50 to-slate-100 text-slate-700">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center justify-center mb-3">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">
                      Kuwait Fix Team
                    </h3>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-6 space-y-7 order-1 lg:order-2">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.2] tracking-tight"
            >
              {t("heroTitlePart1")}{" "}
              <span className="relative inline-block px-3 py-1 my-1 rounded-xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                {t("heroTitleHighlight")}
              </span>{" "}
              {t("heroTitlePart2")}
            </motion.h1>

            <div className="relative pr-5 overflow-hidden">
              <motion.div
                variants={dotToLineVariant}
                initial="hidden"
                animate="visible"
                className="absolute top-0 right-0 w-[3.5px] h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
              />

              <motion.div
                variants={textBehindLineVariant}
                initial="hidden"
                animate="visible"
              >
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                  {t("heroDesc")}
                </p>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border-2 border-slate-300/80 hover:border-blue-600 text-slate-800 hover:text-blue-600 text-base font-black px-8 py-3.5 rounded-full shadow-2xs hover:shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
              >
                <span>{t("contactUs")}</span>
                <PhoneCall className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-2.5 overflow-hidden bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base font-extrabold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
              >
                <span>{t("whatsappBtn")}</span>
                <MessageCircle className="w-5 h-5 fill-current relative z-10" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}