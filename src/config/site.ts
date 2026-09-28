/* Arabic:
بيانات الموقع وتفاصيل التواصل المعتمدة لشركة كويت فيكس
English Translation:
Verified site settings, client details, and navigation config
*/

export const siteConfig = {
  brandName: "كويت فيكس",
  brandNameEn: "Kuwait Fix",
  tagline: "خبراء صيانة الأجهزة المنزلية والتكييف في الكويت",
  experienceYears: "20+",

  // Unified CTA text for Google Ads conversion tracking
  unifiedCtaText: "اتصل بنا",

  // Client Details
  phoneDisplay: "5062 6275",
  phoneRaw: "+96550626275",
  email: "acmaintenance96@gmail.com",
  whatsappUrl: "https://wa.me/96550626275?text=مرحباً%20كويت%20فيكس%20أحتاج%20فني%20صيانة%20عاجل",

  // Local images placed in public/images/
  logoPath: "/images/logo.png",
  heroTeamImage: "/images/hero-team.jpg",

  // Navigation Links
  navLinks: [
    { title: "الرئيسية", href: "/" },
    { title: "تصليح الغسالات", href: "/washing-machine-repair" },
    { title: "تصليح المكيفات", href: "/ac-repair" },
    { title: "تصليح الثلاجات", href: "/refrigerator-repair" },
  ],

  // Core Trust Badges
  trustMetrics: [
    { title: "وصول سريع", desc: "خلال 45 دقيقة لجميع المناطق" },
    { title: "كفالة معتمدة", desc: "ضمان شامل على قطع الغيار" },
    { title: "خبرة 20 عاماً", desc: "فنيون معتمدون داخل الكويت" },
  ],
};