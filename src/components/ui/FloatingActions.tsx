"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingActions() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [isHovered, setIsHovered] = useState<"whatsapp" | "call" | null>(null);

  return (
    <motion.aside
      layout
      initial={{ opacity: 0, y: 50, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label={isAr ? "أزرار التواصل السريع" : "Quick Contact Actions"}
      /* 
        OPPOSITE-SIDE DYNAMIC POSITIONING:
        - In English (LTR): Content is on Left -> Floating buttons dock to the RIGHT (right-4 sm:right-8)
        - In Arabic (RTL): Content is on Right -> Floating buttons dock to the LEFT (left-4 sm:left-8)
      */
      className={`fixed bottom-5 ${
        isAr 
          ? "left-4 sm:left-8 origin-bottom-left items-start" 
          : "right-4 sm:right-8 origin-bottom-right items-end"
      } z-40 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto select-none scale-85 sm:scale-100 transition-all duration-500`}
    >
      <motion.div 
        layout 
        className={`flex ${isAr ? "flex-col" : "flex-col-reverse"} gap-3 ${
          isAr ? "items-start" : "items-end"
        }`}
      >

        {/* ==========================================================
            1. REALISTIC OFFICIAL WHATSAPP FLOATING BUTTON
           ========================================================== */}
        <motion.a
          layout
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered("whatsapp")}
          onMouseLeave={() => setIsHovered(null)}
          whileHover={{ scale: 1.05, x: isAr ? 4 : -4 }}
          whileTap={{ scale: 0.94 }}
          className="relative group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.45)] border border-emerald-400/40 backdrop-blur-xs transition-colors duration-300 overflow-hidden cursor-pointer"
          title={isAr ? "محادثة واتساب سريعة" : "Instant WhatsApp Chat"}
        >
          {/* Ambient diagonal shimmer sweep */}
          <motion.div
            animate={{
              x: ["-150%", "250%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/2 h-full bg-white/25 transform -skew-x-20 pointer-events-none"
          />

          {/* Genuine WhatsApp Official Emblem SVG */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            {/* Pulsing Live Beacon Ring */}
            <span className="absolute w-8 h-8 rounded-full bg-white/30 animate-ping opacity-75 pointer-events-none" />

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-xs">
              <svg 
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#25D366]" 
                viewBox="0 0 24 24"
              >
                <path d="M12.031 2C6.495 2 2 6.508 2 12.062c0 1.947.557 3.765 1.523 5.308L2 22l4.814-1.488a9.988 9.988 0 0 0 5.217 1.55h.004c5.536 0 10.031-4.508 10.031-10.062C22.066 6.508 17.571 2 12.031 2zm0 18.257c-1.684 0-3.32-.472-4.743-1.365l-.34-.213-3.176.982.997-3.089-.228-.352a8.214 8.214 0 0 1-1.325-4.408c0-4.549 3.69-8.249 8.225-8.249 4.536 0 8.226 3.7 8.226 8.249 0 4.55-3.69 8.249-8.226 8.249zm4.508-6.195c-.247-.124-1.464-.724-1.691-.806-.228-.083-.393-.124-.559.124-.165.248-.642.806-.787.971-.144.166-.29.186-.537.062-.247-.124-1.045-.386-1.99-1.23-.736-.657-1.233-1.47-1.378-1.718-.145-.248-.015-.382.108-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.165.042-.31-.02-.434-.063-.125-.559-1.347-.766-1.846-.201-.486-.406-.42-.559-.428l-.476-.008c-.165 0-.434.062-.662.31-.228.249-.868.85-.868 2.073 0 1.223.889 2.405 1.013 2.571.124.165 1.75 2.677 4.24 3.753.593.256 1.056.409 1.417.524.595.19 1.137.163 1.565.099.478-.072 1.464-.6 1.671-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.475-.29z" />
              </svg>
            </div>
          </div>

          {/* Text & Status Micro-Tag */}
          <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-black tracking-tight leading-none">
                {isAr ? "واتساب" : "WhatsApp"}
              </span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-100 leading-tight mt-0.5 opacity-90">
              {isAr ? "متواجد الآن للرد" : "Online • Instant Reply"}
            </span>
          </div>
        </motion.a>

        {/* ==========================================================
            2. REALISTIC LUXURY PHONE CALL BUTTON
           ========================================================== */}
        <motion.a
          layout
          href={`tel:${siteConfig.phoneRaw}`}
          onMouseEnter={() => setIsHovered("call")}
          onMouseLeave={() => setIsHovered(null)}
          whileHover={{ scale: 1.05, x: isAr ? 4 : -4 }}
          whileTap={{ scale: 0.94 }}
          className="relative group flex items-center gap-3 bg-[#0B1F33] hover:bg-[#1266A8] text-white px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(11,31,51,0.5)] border-2 border-blue-400/50 backdrop-blur-xs transition-colors duration-300 overflow-hidden cursor-pointer"
          title={isAr ? "اتصال هاتفي مباشر" : "Direct Phone Call"}
        >
          {/* Ambient diagonal sheen */}
          <motion.div
            animate={{
              x: ["-150%", "250%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              delay: 1.5,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/2 h-full bg-white/15 transform -skew-x-20 pointer-events-none"
          />

          {/* Realistic Phone Handset with Wiggle Attention */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            {/* Soundwave Pulse Effect */}
            <motion.div 
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeOut"
              }}
              className="absolute w-8 h-8 rounded-full bg-blue-500/40 pointer-events-none"
            />

            <motion.div
              animate={{
                rotate: [0, -12, 12, -12, 12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                repeatDelay: 3.5,
                ease: "easeInOut",
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs"
            >
              <PhoneCall className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </motion.div>
          </div>

          {/* Unified CTA Text & Phone Number */}
          <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
            <span className="text-sm sm:text-base font-black tracking-tight leading-none text-white group-hover:text-amber-300 transition-colors">
              {isAr ? "اتصل بنا" : "Call us"}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span dir="ltr" className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-300">
                {siteConfig.phoneDisplay}
              </span>
              <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1 py-0.2 rounded font-bold">
                24/7
              </span>
            </div>
          </div>
        </motion.a>

      </motion.div>
    </motion.aside>
  );
}