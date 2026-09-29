export interface ReviewItem {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  email: string; // Stored email to be displayed half-encrypted with stars
  avatarColor: string;
  isLocalGuide: boolean;
  reviewsCount?: number;
  rating: number;
  date: {
    ar: string;
    en: string;
  };
  area: {
    ar: string;
    en: string;
  };
  serviceCategory: "all" | "washing-machine" | "ac" | "fridge";
  serviceTag: {
    ar: string;
    en: string;
  };
  comment: {
    ar: string;
    en: string;
  };
  helpfulCount: number;
  isNew?: boolean;
}

export const initialReviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    name: {
      ar: "فهد الشمري",
      en: "Fahad Al-Shammari",
    },
    email: "fahad.shammari92@gmail.com",
    avatarColor: "bg-blue-600",
    isLocalGuide: true,
    reviewsCount: 38,
    rating: 5,
    date: {
      ar: "منذ يومين",
      en: "2 days ago",
    },
    area: {
      ar: "السالمية",
      en: "Salmiya",
    },
    serviceCategory: "ac",
    serviceTag: {
      ar: "تصليح مكيف سبليت وتعبئة فريون",
      en: "Split AC Repair & Freon Refill",
    },
    comment: {
      ar: "ما شاء الله، الفني وصل خلال 35 دقيقة بالضبط للسالمية. كان المكيف ينقط ماء وتبريده ضعيف جداً، تم تنظيف حوض الصرف وتعبئة الغاز بفريون أمريكي والآن التبريد ممتاز. تعامل راقي وأسعار واضحة بدون مبالغة.",
      en: "Outstanding service. The technician arrived in exactly 35 minutes in Salmiya. The AC was leaking water and barely cooling; he unclogged the drain line and recharged genuine US freon. Transparent pricing and great manners.",
    },
    helpfulCount: 14,
  },
  {
    id: "rev-2",
    name: {
      ar: "سارة الكندري",
      en: "Sara Al-Kandari",
    },
    email: "sara.kandari.kw@gmail.com",
    avatarColor: "bg-purple-600",
    isLocalGuide: true,
    reviewsCount: 24,
    rating: 5,
    date: {
      ar: "منذ 4 أيام",
      en: "4 days ago",
    },
    area: {
      ar: "الجابرية",
      en: "Jabriya",
    },
    serviceCategory: "washing-machine",
    serviceTag: {
      ar: "تصليح غسالة دايو أوتوماتيك",
      en: "Daewoo Washer Repair",
    },
    comment: {
      ar: "غسالة الملابس كانت تتوقف فجأة أثناء مرحلة العصر وتصدر صوتاً عالياً. الفني فحصها بالكمبيوتر واستبدل طلمبة التصريف والرولمان بلي بقطع أصلية مع كفالة كتابية 6 شهور. شكراً كويت فيكس على الأمانة والسرعة.",
      en: "Our washing machine stopped mid-spin and made loud screeching noise. The technician scanned it, replaced the drain pump and bearings with genuine parts, and gave a 6-month written warranty. Very honest team.",
    },
    helpfulCount: 19,
  },
  {
    id: "rev-3",
    name: {
      ar: "م. ناصر المطيري",
      en: "Eng. Nasser Al-Mutairi",
    },
    email: "eng.nasser.mutairi@gmail.com",
    avatarColor: "bg-emerald-600",
    isLocalGuide: false,
    rating: 5,
    date: {
      ar: "الأسبوع الماضي",
      en: "Last week",
    },
    area: {
      ar: "الروضة",
      en: "Al-Rawda",
    },
    serviceCategory: "fridge",
    serviceTag: {
      ar: "صيانة ثلاجة سامسونج انفرتر",
      en: "Samsung Inverter Refrigerator",
    },
    comment: {
      ar: "أفضل خدمة صيانة ثلاجات تعاملت معها بالكويت. الثلاجة توقف تبريدها بالكامل، فحص المهندس لوحة التشغيل وتم استبدال الحساسات والمروحة فورياً بنفس اليوم بالمنزل بدون نقل الجهاز. وفروا علي وقت وجهد كبير.",
      en: "The most professional fridge repair service in Kuwait. Cooling died completely; the technician diagnosed the inverter control board and swapped the sensor and fan at home without taking the fridge away. Highly recommended.",
    },
    helpfulCount: 8,
  },
  {
    id: "rev-4",
    name: {
      ar: "خالد الهاجري",
      en: "Khaled Al-Hajri",
    },
    email: "khaled.hajri88@gmail.com",
    avatarColor: "bg-amber-600",
    isLocalGuide: true,
    reviewsCount: 52,
    rating: 5,
    date: {
      ar: "منذ أسبوعين",
      en: "2 weeks ago",
    },
    area: {
      ar: "صباح السالم",
      en: "Sabah Al-Salem",
    },
    serviceCategory: "ac",
    serviceTag: {
      ar: "صيانة تكييف مركزي للقسيمة",
      en: "Central Villa AC Maintenance",
    },
    comment: {
      ar: "صيانة دقيقة جداً لوحدات التكييف المركزي بالقسيمة. تم فحص ضغوط الغاز وتغيير المكثفات وتنظيف الفلاتر. الفنيين مجهزين بأحدث الأدوات ومحترمين للغاية. أنصح بالتعامل معهم لمن يبحث عن راحة البال.",
      en: "Thorough seasonal servicing for our villa's central AC units. Gas pressure balanced, capacitors replaced, and coils washed. Technicians came fully equipped with professional digital gauges. Top quality.",
    },
    helpfulCount: 11,
  },
  {
    id: "rev-5",
    name: {
      ar: "دلال العتيبي",
      en: "Dalal Al-Otaibi",
    },
    email: "dalal.otaibi95@gmail.com",
    avatarColor: "bg-rose-600",
    isLocalGuide: false,
    rating: 5,
    date: {
      ar: "منذ 3 أسابيع",
      en: "3 weeks ago",
    },
    area: {
      ar: "حولي",
      en: "Hawally",
    },
    serviceCategory: "ac",
    serviceTag: {
      ar: "استبدال كمبروسر مكيف صالون",
      en: "AC Compressor Replacement",
    },
    comment: {
      ar: "تم استبدال كمبروسر مكيف الصالون بواحد أصلي جديد. تفريغ الهواء (Vacuum) وتعبئة الغاز تمت بميزان دقيق وبنفس اليوم رجع التبريد كالجديد مع كفالة سنة كاملة. السعر كان مناسب جداً مقارنة بالشركات الأخرى.",
      en: "Replaced our salon AC compressor with a brand new OEM unit. System vacuum purge and digital gas fill were done on the same afternoon with an official 1-year warranty. Best price in Kuwait.",
    },
    helpfulCount: 6,
  },
  {
    id: "rev-6",
    name: {
      ar: "عبدالله البلوشي",
      en: "Abdullah Al-Baloushi",
    },
    email: "a.baloushi.kw@gmail.com",
    avatarColor: "bg-teal-600",
    isLocalGuide: true,
    reviewsCount: 17,
    rating: 5,
    date: {
      ar: "منذ شهر",
      en: "1 month ago",
    },
    area: {
      ar: "مشرف",
      en: "Mishref",
    },
    serviceCategory: "washing-machine",
    serviceTag: {
      ar: "تصليح غسالة LG أوتوماتيك",
      en: "LG Front-Load Washer",
    },
    comment: {
      ar: "الغسالة كانت تعطي رمز خطأ OE ولا تصرف المياه. الفني وصلني بمشرف وحل المشكلة خلال 20 دقيقة ونظف الفلتر الداخلي بدون أي فوضى. خدمة سريعة وسعر معقول.",
      en: "Washer threw an OE error code and wouldn't drain. Technician came to Mishref and solved it in 20 minutes, flushed the internal filter, and left the area spotless. Rapid and reasonable.",
    },
    helpfulCount: 9,
  },
];