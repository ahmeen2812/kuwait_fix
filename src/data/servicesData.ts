export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  image: string;
  badge: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  features: {
    ar: string[];
    en: string[];
  };
}

export const servicesData: ServiceItem[] = [
  {
    id: "washing-machine",
    number: "01",
    slug: "/washing-machine-repair",
    image: "/images/services/washing-machine.jpg",
    badge: { ar: "خدمة منزلية فورية", en: "Same-Day Home Visit" },
    category: { ar: "صيانة الغسالات", en: "Washing Machines" },
    title: {
      ar: "تصليح الغسالات الأوتوماتيك",
      en: "Automatic Washing Machine Repair",
    },
    description: {
      ar: "صيانة شاملة لكافة أنواع الغسالات الأوتوماتيك والعادية داخل المنزل مع تبديل القطع التالفة بقطع أصلية مكفولة.",
      en: "Comprehensive home repair for all automatic and front-load washing machines with genuine warranted spare parts.",
    },
    features: {
      ar: [
        "فحص إلكتروني دقيق للأعطال واللوحات",
        "تبديل طلمبة التصريف والمحرك والسير",
        "حل مشاكل عدم دوران الحلة والاهتزاز",
        "كفالة موثقة على الصيانة والقطع",
      ],
      en: [
        "Precision electronic diagnostic scan",
        "Drain pump, motor, and belt replacement",
        "Drum spin failure and vibration fix",
        "Certified warranty on parts & labor",
      ],
    },
  },
  {
    id: "ac-repair",
    number: "02",
    slug: "/ac-repair",
    image: "/images/services/ac-repair.jpg",
    badge: { ar: "طوارئ تكييف 24/7", en: "24/7 Emergency AC" },
    category: { ar: "التكييف والتبريد", en: "AC & Cooling" },
    title: {
      ar: "تصليح وصيانة المكيفات",
      en: "Air Conditioner Repair & Service",
    },
    description: {
      ar: "إصلاح وصيانة وحدات المكيفات السبليت والمركزي، فحص ضغط الغاز ومعالجة ضعف التبريد وتسريب المياه فورياً.",
      en: "Repair and servicing for split and central AC units, gas pressure testing, low cooling, and water leakage solutions.",
    },
    features: {
      ar: [
        "صيانة مكيفات سبليت ووحدات مركزية",
        "فحص تسريب الغاز وتعبئة فريون أمريكي",
        "معالجة تساقط المياه وضعف دفع الهواء",
        "فحص كمبيوتر لوحدات التحكم والثيرموستات",
      ],
      en: [
        "Split and central AC unit servicing",
        "Gas leak detection & US Freon refill",
        "Fixing water dripping & weak airflow",
        "Thermostat & electronic control scan",
      ],
    },
  },
  {
    id: "refrigerator-repair",
    number: "03",
    slug: "/refrigerator-repair",
    image: "/images/services/refrigerator.jpg",
    badge: { ar: "قطع غيار معتمدة", en: "Certified Parts" },
    category: { ar: "التبريد المنزلي", en: "Refrigeration" },
    title: {
      ar: "تصليح الثلاجات والفريزر",
      en: "Refrigerator & Freezer Repair",
    },
    description: {
      ar: "صيانة متخصصة للثلاجات العادية والذكية (Inverter)، حل انقطاع التبريد وتراكم الثلج وتبديل المراوح والثرموستات.",
      en: "Expert servicing for standard and smart inverter refrigerators, solving cooling loss, frost build-up, and fan repairs.",
    },
    features: {
      ar: [
        "إصلاح ضعف التبريد في الثلاجة والفريزر",
        "شحن غاز التبريد ومعالجة تسريب الفريون",
        "تغيير الثرموستات ومروحة تدوير الهواء",
        "فحص وتبديل حساسات إذابة الثلج (Defrost)",
      ],
      en: [
        "Resolving low cooling in fridge & freezer",
        "Refrigerant leak detection & recharge",
        "Thermostat & airflow fan replacement",
        "Defrost timer & sensor replacement",
      ],
    },
  },
  {
    id: "split-ac-wash",
    number: "04",
    slug: "/ac-repair",
    image: "/images/services/ac-cleaning.jpg",
    badge: { ar: "تنظيف بالضغط العالي", en: "Deep Jet Wash" },
    category: { ar: "نقاء الهواء", en: "Air Quality" },
    title: {
      ar: "غسيل وتنظيف مكيفات سبليت",
      en: "Split AC Deep Cleaning & Wash",
    },
    description: {
      ar: "تنظيف كيميائي وهيدروليكي للوحدات الداخلية والخارجية لإزالة الغبار والرواسب واستعادة نقاء الهواء وقوة التبريد.",
      en: "High-pressure chemical and water jet wash for indoor/outdoor coils to remove dust, bacteria, and restore airflow.",
    },
    features: {
      ar: [
        "غسيل الفلاتر والمبخر الداخلي بمواد معقمة",
        "تنظيف مروحة البلاور ومجرى التصريف",
        "إزالة الروائح الكريهة وتراكم البكتيريا",
        "توفير استهلاك الكهرباء وزيادة كفاءة التبريد",
      ],
      en: [
        "Filter and evaporator antibacterial wash",
        "Blower wheel and drain tray cleaning",
        "Elimination of odors & bacteria build-up",
        "Reduced power consumption & max airflow",
      ],
    },
  },
  {
    id: "central-ac",
    number: "05",
    slug: "/ac-repair",
    image: "/images/services/central-ac.jpg",
    badge: { ar: "للقسائم والمباني", en: "Residential & Commercial" },
    category: { ar: "تكييف مركزي", en: "Central HVAC" },
    title: {
      ar: "صيانة التكييف المركزي",
      en: "Central AC System Maintenance",
    },
    description: {
      ar: "صيانة وقائية وإصلاح أعطال التكييف المركزي للقسائم والفلل والمجمعات مع فحص الدكتات واللوحات الرئيسية.",
      en: "Preventative and emergency maintenance for central package and DX units across residential villas and buildings.",
    },
    features: {
      ar: [
        "فحص شامل لمحركات دفع الهواء والسيور",
        "تبديل الكونتاكتور والمكثفات الكهربائية",
        "موازنة ضغوط خطوط السحب والدفع",
        "عقود صيانة دورية للقسائم والمجمعات",
      ],
      en: [
        "Blower motor and belt system inspection",
        "Contactor, capacitor & relay replacement",
        "Suction and liquid line pressure balancing",
        "Scheduled maintenance service contracts",
      ],
    },
  },
  {
    id: "compressor",
    number: "06",
    slug: "/ac-repair",
    image: "/images/services/compressor.jpg",
    badge: { ar: "كفالة سنة كاملة", en: "1-Year Warranty" },
    category: { ar: "قطع الغيار الأصلية", en: "OEM Components" },
    title: {
      ar: "تغيير الكمبروسر وتعبئة الغاز",
      en: "Compressor Replacement & Gas Charge",
    },
    description: {
      ar: "استبدال كمبروسر المكيفات والثلاجات بكمبروسرات أصلية جديدة أو مجددة مع تفريغ هواء (Vacuum) وتعبئة غاز بالميزان.",
      en: "Replacement of AC and refrigerator compressors with genuine warranted units, including system vacuum and digital gas charging.",
    },
    features: {
      ar: [
        "توريد كمبروسرات معتمدة (Copeland, LG, Tecumseh)",
        "غسيل الدورة بالنيتروجين وسحب الرطوبة",
        "شحن غاز أمريكي نقي بميزان رقمي دقيق",
        "كفالة خطية موثقة لمدة عام كامل",
      ],
      en: [
        "OEM compressors (Copeland, LG, Tecumseh)",
        "Nitrogen cycle flush & deep vacuum test",
        "Digital scale charging with pure US Freon",
        "Official 1-year documented warranty",
      ],
    },
  },
];