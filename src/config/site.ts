/* Arabic:
بيانات الموقع وتفاصيل التواصل المعتمدة لشركة كويت فيكس
English Translation:
Verified site settings, client details, navigation config, and Formspree ID
*/

export const siteConfig = {
  brandName: "كويت فيكس",
  brandNameEn: "Kuwait Fix",
  tagline: "خبراء صيانة الأجهزة المنزلية والتكييف في الكويت",
  experienceYears: "20+",

  // Formspree Integration Endpoint
  // Replace YOUR_FORMSPREE_ID with your Formspree Form ID from formspree.io
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORMSPREE_ID",

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
};