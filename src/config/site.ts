/* Arabic:
بيانات وهوية شركة هوميكسا (Homexa) وإعدادات محركات البحث
English Translation:
Homexa brand configuration, verified contact details, and SEO sitelinks mapping
*/

export const siteConfig = {
  // Brand Identity
  brandName: "هوميكسا",
  brandNameEn: "Homexa",
  legalName: "Homexa Home Appliance & AC Maintenance Kuwait",
  tagline: "هوميكسا | خبراء صيانة الأجهزة المنزلية والتكييف في الكويت",
  taglineEn: "Homexa | Certified Home Appliance & AC Repair Experts in Kuwait",
  experienceYears: "20+",
  
  // Production Domain (Replace with your actual domain when deployed)
  url: "https://homexa.site",

  // Formspree Integration Endpoint
  formspreeEndpoint: "https://formspree.io/f/xkjgeaep",

  // Unified CTA Text
  unifiedCtaText: "اتصل بنا",
  unifiedCtaTextEn: "Contact us",

  // Client Contact Details
  phoneDisplay: "5062 6275",
  phoneRaw: "+96550626275",
  email: "acmaintenance96@gmail.com",
  whatsappUrl: "https://wa.me/96550626275?text=مرحباً%20هوميكسا%20أحتاج%20فني%20صيانة%20عاجل",

  // Local Assets
  logoPath: "/images/logo.png",
  heroTeamImage: "/images/hero-team.jpg",

  // Core Sitelinks (The 3 rows that will show on Google Search under Homexa)
  sitelinks: [
    {
      titleAr: "تصليح الغسالات الأوتوماتيك",
      titleEn: "Washing Machine Repair",
      descAr: "صيانة جميع أنواع الغسالات الأوتوماتيك بالمنزل مع قطع غيار أصلية وكفالة",
      descEn: "Doorstep repair for all front and top load automatic washing machines with genuine parts",
      href: "/washing-machine-repair",
    },
    {
      titleAr: "تصليح وصيانة المكيفات",
      titleEn: "Air Conditioner Repair",
      descAr: "طوارئ تكييف 24/7، شحن فريون أمريكي أصلي وتبديل كمبروسر سبليت ومركزي",
      descEn: "24/7 emergency AC repair, pure US Freon recharge, and tropical compressor replacement",
      href: "/ac-repair",
    },
    {
      titleAr: "تصليح الثلاجات والفريزر",
      titleEn: "Refrigerator & Freezer Repair",
      descAr: "حل مشاكل ضعف التبريد وتراكم الثلج وتبديل كروت الانفرتر بالمنزل",
      descEn: "On-site diagnostic for cooling failures, defrost circuits, and inverter boards",
      href: "/refrigerator-repair",
    },
  ],

  // Navigation Links
  navLinks: [
    { title: "الرئيسية", href: "/" },
    { title: "تصليح الغسالات", href: "/washing-machine-repair" },
    { title: "تصليح المكيفات", href: "/ac-repair" },
    { title: "تصليح الثلاجات", href: "/refrigerator-repair" },
  ],
};