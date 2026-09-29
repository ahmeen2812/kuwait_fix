"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustFeatures() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const cards = [
    {
      title: isAr ? "وصول سريع" : "Fast Dispatch",
      desc: isAr ? "خلال 45 دقيقة لجميع المناطق" : "Within 45 mins to all areas",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      initialX: isAr ? 40 : -40,
    },
    {
      title: isAr ? "كفالة معتمدة" : "Certified Warranty",
      desc: isAr ? "ضمان شامل على قطع الغيار" : "Comprehensive parts warranty",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      initialX: 0,
    },
    {
      title: isAr ? "خبرة 20 عاماً" : "20+ Years Experience",
      desc: isAr ? "فنيون معتمدون داخل الكويت" : "Certified technicians in Kuwait",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      initialX: isAr ? -40 : 40,
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-100 overflow-hidden overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-10 gpu-layer"
        >
          <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {isAr ? "معايير الخدمة المعتمدة" : "Approved Service Standards"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5">
            {isAr ? "لماذا يختارنا العملاء في الكويت؟" : "Why do customers in Kuwait choose us?"}
          </h2>
        </motion.div>

        {/* 3 Lightweight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: card.initialX, y: card.initialX === 0 ? 30 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-7 rounded-2xl bg-[#FAFCFF] border-2 border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-md transition-colors duration-200 text-right group gpu-layer"
              >
                <div className={`w-14 h-14 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className={`w-7 h-7 ${card.color}`} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}