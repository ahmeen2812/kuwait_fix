"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    home: "الرئيسية",
    washingMachine: "تصليح الغسالات",
    acRepair: "تصليح المكيفات",
    fridgeRepair: "تصليح الثلاجات",
    contactUs: "اتصل بنا",
    langButtonText: "English",
    brandTag: "صيانة معتمدة بالكويت",
    heroTitlePart1: "خبراء صيانة",
    heroTitleHighlight: "الأجهزة المنزلية",
    heroTitlePart2: "في الكويت",
    heroDesc: "نقدم خدمات صيانة فورية، معتمدة وموثوقة لجميع أنواع الغسالات والمكيفات والثلاجات في جميع مناطق الكويت. راحتكم وجودة أجهزتكم هي أولويتنا القصوى.",
    whatsappBtn: "واتساب",
  },
  en: {
    home: "Home",
    washingMachine: "Washing machine repair",
    acRepair: "Air conditioner repair",
    fridgeRepair: "Refrigerator repair",
    contactUs: "Contact us",
    langButtonText: "العربية",
    brandTag: "Certified maintenance in Kuwait",
    heroTitlePart1: "Maintenance experts",
    heroTitleHighlight: "Home appliances",
    heroTitlePart2: "Kuwait",
    heroDesc: "We offer prompt, certified, and reliable maintenance services for all types of washing machines, air conditioners, and refrigerators throughout Kuwait. Your comfort and the quality of your appliances are our top priority.",
    whatsappBtn: "WhatsApp",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en"); // Default matching your screenshot

  useEffect(() => {
    // Check saved language or default to en
    const saved = localStorage.getItem("preferred_lang") as Language;
    if (saved && (saved === "ar" || saved === "en")) {
      setLanguage(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
    localStorage.setItem("preferred_lang", nextLang);
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = nextLang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}