"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Users,
  Wrench
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden py-10 md:py-16 lg:py-20 bg-gradient-to-b from-[#FAFCFF] via-white to-slate-50 border-b border-slate-200/80">
      
      {/* Decorative Ambient Dots & Radial Light */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px"
        }}
      />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ==========================================================
              Right Column: Hero Text, Border Accents & Actions
             ========================================================== */}
          <div className="lg:col-span-6 space-y-6 text-right">
            
            {/* 20+ Years Trust Badge with Live Radar Beacon */}
            <div className="inline-flex items-center gap-2.5 bg-blue-50/90 border border-blue-200/90 px-4 py-2 rounded-full shadow-2xs backdrop-blur-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-radar" />
              <span className="text-xs sm:text-sm font-extrabold text-blue-900">
                خبرة أكثر من {siteConfig.experienceYears} عاماً في صيانة الأجهزة داخل الكويت
              </span>
            </div>

            {/* Main Headline with Stylized Border Container on Keywords */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.22] tracking-tight">
              خبراء صيانة{" "}
              <span className="relative inline-block px-3 py-1 my-1 rounded-xl bg-blue-50/80 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                الأجهزة المنزلية
              </span>{" "}
              في الكويت
            </h1>

            {/* Polished Subtitle with Border Accent */}
            <div className="pr-3.5 border-r-3 border-blue-500/60">
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                نقدم خدمات صيانة فورية، معتمدة وموثوقة لجميع أنواع الغسالات والمكيفات والثلاجات في جميع مناطق الكويت. راحتكم وكفاءة أجهزتكم هي أولويتنا القصوى.
              </p>
            </div>

            {/* CTAs: WhatsApp Green + Unified Contact Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* WhatsApp Button with Shimmer Sweep */}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-2.5 overflow-hidden bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base font-extrabold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
              >
                {/* Ambient Shimmer Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/25 transform -skew-x-12 animate-shimmer pointer-events-none" />

                <MessageCircle className="w-5 h-5 fill-current relative z-10" />
                <span className="relative z-10">واتساب</span>
              </a>

              {/* Unified CTA Button (Strictly using "اتصل بنا") */}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border-2 border-slate-300/80 hover:border-blue-600 text-slate-800 hover:text-blue-600 text-base font-black px-8 py-3.5 rounded-full shadow-2xs hover:shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
              >
                <PhoneCall className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <span>{siteConfig.unifiedCtaText}</span>
              </a>

            </div>

            {/* Trust Metrics Cards (Bottom Text Area) */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
              {siteConfig.trustMetrics.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-2xs text-right hover:border-blue-300 hover:shadow-xs transition-all duration-200"
                >
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                    {idx === 0 && <Clock className="w-4 h-4" />}
                    {idx === 1 && <ShieldCheck className="w-4 h-4" />}
                    {idx === 2 && <Award className="w-4 h-4" />}
                    <span className="font-black text-xs text-slate-800">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ==========================================================
              Left Column: Image Animated from Top to Down with Badges
             ========================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Decorative Architectural Border Corners */}
              <div className="absolute -top-3.5 -right-3.5 w-14 h-14 border-t-3 border-r-3 border-blue-600 rounded-tr-2xl z-30 pointer-events-none" />
              <div className="absolute -bottom-3.5 -left-3.5 w-14 h-14 border-b-3 border-l-3 border-blue-400 rounded-bl-2xl z-30 pointer-events-none" />

              {/* Floating Live Status Badge (Top Left in RTL) */}
              <div className="absolute -top-4 left-6 z-30 bg-white/95 border border-slate-200/90 shadow-md px-3.5 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-radar" />
                <span className="text-xs font-extrabold text-slate-800">فني متاح الآن في الكويت</span>
              </div>

              {/* Image Container with Top-to-Down Reveal & Floating Physics */}
              <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[490px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100 animate-image-from-top animate-subtle-float">
                
                {!imageError ? (
                  <Image
                    src={siteConfig.heroTeamImage}
                    alt="فريق فنيي صيانة الأجهزة المنزلية والمكيفات في الكويت - كويت فيكس"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* High quality fallback canvas if the local image is not dropped yet */
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-blue-50/50 to-slate-100 text-slate-700">
                    <div className="w-18 h-18 rounded-2xl bg-white border border-blue-200 shadow-sm flex items-center justify-center mb-4">
                      <Users className="w-9 h-9 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-1.5">
                      فريق فنيي كويت فيكس المتخصص
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mb-4 leading-relaxed font-semibold">
                      جاهزية كاملة لخدمة جميع مناطق الكويت مع سيارات صيانة مجهزة بالكامل.
                    </p>
                    <span className="text-xs bg-white border border-slate-300 px-3 py-1 rounded-md text-blue-600 font-mono">
                      ضع صورتك في: public/images/hero-team.jpg
                    </span>
                  </div>
                )}

                {/* Subtle Bottom Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Floating 20+ Years Seal (Bottom Right in RTL) */}
                <div className="absolute bottom-4 right-4 z-20 bg-white/95 border border-slate-200 shadow-lg px-4 py-2.5 rounded-xl flex items-center gap-3 backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                    20+
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-black text-slate-900 leading-tight">
                      عاماً من التميز
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500">
                      ضمان وجودة معتمدة
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}