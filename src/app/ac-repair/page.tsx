"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Sparkles,
  ChevronDown,
  Wind,
  Snowflake,
  Zap,
  Droplets,
  Volume2,
  Cpu,
  Flame,
  Send,
  Loader2,
  ArrowLeft,
  ArrowRight,
  ThermometerSnowflake,
  Fan
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AcRepairPage() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeBrandTab, setActiveBrandTab] = useState<"gree" | "carrier" | "lg" | "midea">("gree");
  const [heroImgError, setHeroImgError] = useState(false);

  // Formspree State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    acType: isAr ? "مكيف سبليت جداري" : "Wall Split AC",
    brand: "Gree",
    area: isAr ? "السالمية" : "Salmiya",
    fault: isAr ? "ضعف التبريد / خروج هواء حار" : "Weak cooling / blowing warm air",
    urgency: isAr ? "طوارئ فوري (خلال 45 دقيقة)" : "Urgent (Within 45 Mins)",
    notes: "",
    _gotcha: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) return;
    if (formData._gotcha) return;

    setIsSubmitting(true);
    try {
      await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          service: "AC Repair & Cooling Maintenance",
          ...formData,
          _subject: `❄️ [طلب صيانة تكييف] ${formData.name} - ${formData.brand} (${formData.area})`,
        }),
      });
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        acType: isAr ? "مكيف سبليت جداري" : "Wall Split AC",
        brand: "Gree",
        area: isAr ? "السالمية" : "Salmiya",
        fault: isAr ? "ضعف التبريد / خروج هواء حار" : "Weak cooling / blowing warm air",
        urgency: isAr ? "طوارئ فوري (خلال 45 دقيقة)" : "Urgent (Within 45 Mins)",
        notes: "",
        _gotcha: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // DATA COLLECTIONS (BILINGUAL)
  // -------------------------------------------------------------
  const acTypes = [
    {
      id: "split-wall",
      title: { ar: "مكيفات سبليت جدارية", en: "Wall-Mounted Split AC" },
      desc: {
        ar: "صيانة وتصليح جميع أحجام السبليت (1.5 طن إلى 3 طن)، غسيل الفلاتر والمبخر، وتعبئة غاز فريون R410A الأصلي.",
        en: "Repair and servicing for all split capacities (1.5 to 3 Tons), high-pressure coil wash, and original R410A Freon refills.",
      },
      badge: { ar: "الأكثر شيوعاً", en: "Most Popular" },
    },
    {
      id: "central-pack",
      title: { ar: "تكييف مركزي للقسائم (Package)", en: "Central Package Units" },
      desc: {
        ar: "صيانة شاملة للوحدات المركزية على أسطح القسائم والفلل، فحص الكونتاكتور، محركات مراوح الدفع، وضغوط خطوط السحب.",
        en: "Complete rooftop central HVAC maintenance for villas, testing contactors, blower fan motors, and suction pressures.",
      },
      badge: { ar: "للقسائم والفلل", en: "Residential Villas" },
    },
    {
      id: "ducted-split",
      title: { ar: "تكييف كونسيلد (مخفي / دكت)", en: "Ducted Concealed Split" },
      desc: {
        ar: "صيانة مجاري الهواء (Ducting)، فحص وحدات التبريد المخفية بالجبس بورد، موازنة تدفق الهواء وتصريف المياه.",
        en: "Duct inspection, concealed ceiling coil servicing, airflow CFM rebalancing, and condensation drainage unclogging.",
      },
      badge: { ar: "تبريد متطور", en: "Advanced Cooling" },
    },
    {
      id: "vrf-multi",
      title: { ar: "أنظمة VRF والتبريد المتغير", en: "VRF & Multi-Split Systems" },
      desc: {
        ar: "برمجة وصيانة أنظمة التبريد الذكية للمجمعات والمباني التجارية مع فحص المحابس الإلكترونية وضواغط الانفرتر.",
        en: "Smart variable refrigerant flow diagnostics, electronic expansion valve testing, and multi-zone inverter servicing.",
      },
      badge: { ar: "مجمعات ومباني", en: "Commercial" },
    },
  ];

  // 6 Dedicated Services with Images
  const acServicesWithImages = [
    {
      id: "gas-leak",
      image: "/images/services/ac-gas-leak.webp",
      imageAlt: "فحص تسريب غاز التكييف وتعبئة فريون أمريكي بالكويت",
      number: "01",
      badge: { ar: "فريون أمريكي نقي", en: "Pure US Freon" },
      title: { ar: "كشف تسريب الغاز وتعبئة فريون R410A / R22", en: "Freon Leak Detection & Gas Recharge" },
      desc: {
        ar: "كشف دقيق لمواقع تسريب الغاز في المواسير النحاسية واللحام بواسطة أجهزة الاستشعار الإلكترونية، ثم تفريغ الهواء (Vacuum) وإعادة شحن غاز أمريكي أصلي بالميزان الرقمي.",
        en: "Electronic leak detection across copper lines, nitrogen pressure testing, moisture evacuation vacuum pump cycle, and precise digital scale freon charging.",
      },
      points: {
        ar: [
          "شحن غاز أمريكي أصلي 100% عالي النقاوة (DuPont / Honeywell)",
          "لحام ومعالجة تسريبات المواسير النحاسية بلهب الفضة",
          "فحص ضغط خط السحب والدفع وفق مواصفات المصنع",
          "كفالة معتمدة ضد نقص أو تسريب الغاز",
        ],
        en: [
          "100% genuine pure US Freon (DuPont / Honeywell R410A / R22)",
          "Silver braze repair on damaged copper refrigeration piping",
          "Digital manifold gauge calibration of suction & discharge",
          "Certified warranty against gas pressure drops",
        ],
      },
    },
    {
      id: "compressor-swap",
      image: "/images/services/ac-compressor-swap.webp",
      imageAlt: "تبديل كمبروسر تكييف استوائي T3 في الكويت",
      number: "02",
      badge: { ar: "كمبروسرات استوائية T3", en: "T3 Tropical Compressors" },
      title: { ar: "تبديل كمبروسر المكيف مع الكفالة", en: "Compressor Replacement & Vacuum Purge" },
      desc: {
        ar: "استبدال ضواغط التكييف المحترقة أو الضعيفة بكمبروسرات استوائية T3 مصممة لتحمل حرارة صيف الكويت فوق 50 درجة مئوية مع تنظيف دورة التبريد بالنيتروجين.",
        en: "Replacing burnt-out or grounded compressors with heavy-duty T3 tropical compressors rated for 55°C Kuwait summer ambient temperatures.",
      },
      points: {
        ar: [
          "توريد كمبروسرات معتمدة (Copeland, Bristol, LG, Gree)",
          "غسيل شبكة التبريد بالنيتروجين لإزالة الزيوت المحترقة",
          "استبدال فلتر دراير ومكثف الإقلاع (Capacitor) الأصلي",
          "كفالة كتابية موثقة لمدة عام كامل على الكمبروسر",
        ],
        en: [
          "OEM certified compressors (Copeland, Bristol, LG, Gree)",
          "Nitrogen flush to remove acid and carbonized burnt oil",
          "New filter drier and heavy-duty start capacitor install",
          "Full 1-Year written warranty on compressor and labor",
        ],
      },
    },
    {
      id: "water-leak",
      image: "/images/services/ac-water-leak.webp",
      imageAlt: "حل مشكلة خرير وتساقط مياه المكيف في الكويت",
      number: "03",
      badge: { ar: "حل فوري للخرير", en: "Instant Leak Fix" },
      title: { ar: "علاج تساقط وخرير مياه المكيف", en: "Water Leakage & Drain Line Unclogging" },
      desc: {
        ar: "معالجة تسريب المياه وتجمع القطرات من الوحدة الداخلية على الجدران والأرضيات بسبب انسداد مجرى التصريف أو تراكم الطحالب والأتربة في حوض المكثف.",
        en: "Eliminating indoor unit water dripping and ceiling puddles caused by clogged condensate drain lines, algae build-up, or cracked drain pans.",
      },
      points: {
        ar: [
          "تسليك مجرى الصرف بضغط النيتروجين والماء العالي",
          "تنظيف وتعقيم حوض تجميع المياه الداخلي",
          "ضبط زاوية ميلان الوحدة الداخلية لضمان انسياب الماء",
          "عزل مواسير التبريد لمنع تكثف الرطوبة الخارجية",
        ],
        en: [
          "High-pressure nitrogen drain line clearance",
          "Chemical sanitization of indoor condensate drip tray",
          "Spirit-level realignment of indoor evaporator unit",
          "Closed-cell foam pipe re-insulation to prevent condensation",
        ],
      },
    },
    {
      id: "fan-motor",
      image: "/images/services/ac-fan-motor.webp",
      imageAlt: "صيانة مروحة مكيف ومكثفات الكونتاكتور في الكويت",
      number: "04",
      badge: { ar: "كهرباء وميكانيك", en: "Electrical & Motors" },
      title: { ar: "صيانة محرك المروحة والكونتاكتور", en: "Condenser Fan Motor & Contactor" },
      desc: {
        ar: "إصلاح توقف مروحة الوحدة الخارجية أو بطء دورانها مما يسبب ارتفاع ضغط الغاز وفصل الكمبروسر، وتبديل الكونتاكتور والمكثفات المحترقة.",
        en: "Fixing locked or sluggish condenser fan motors that cause high head pressure compressor thermal cut-offs, plus contactor and capacitor renewals.",
      },
      points: {
        ar: [
          "استبدال محركات مراوح تبريد أصلية مطابقة لسرعة الدوران (RPM)",
          "تبديل مكثفات تشغيل أمريكية الصنع مقاومة للحرارة العالية",
          "تغيير كونتاكتورات شنايدر وسيمينز المعتمدة",
          "معايرة ريش المروحة لمنع الاهتزاز والصوت العالي",
        ],
        en: [
          "OEM condenser and blower fan motor replacements",
          "Heavy-duty 440V high-temperature motor run capacitors",
          "Industrial contactor relays (Schneider / Siemens)",
          "Fan blade balancing to eliminate vibration and bearing noise",
        ],
      },
    },
    {
      id: "pcb-thermostat",
      image: "/images/services/ac-pcb-thermostat.webp",
      imageAlt: "تصليح كارت وبرمجة ثيرموستات المكيف في الكويت",
      number: "05",
      badge: { ar: "تحكم ذكي وبرمجة", en: "Smart Controls" },
      title: { ar: "صيانة كارت التكييف والثيرموستات", en: "Inverter PCB Board & Thermostat" },
      desc: {
        ar: "صيانة اللوحات الإلكترونية للمكيفات الانفرتر، برمجة وحدات التحكم الرقمية، واستبدال الثيرموستات الجداري الذكي لمعالجة عدم استجابة المكيف لأوامر التبريد.",
        en: "Electronic inverter board micro-repair, digital room thermostat reprogramming, and sensor calibration to solve temperature cut-out glitches.",
      },
      points: {
        ar: [
          "فحص وتحديد أعطال كارت الانفرتر الخارجي والداخلي",
          "تركيب ثيرموستات ديجيتال متطور دقيق لقراءة درجات الحرارة",
          "استبدال حساسات حرارة الغاز وحرارة الهواء (Ambient / Coil Sensors)",
          "حماية الدوائر الحساسة من تقلبات الجهد الكهربائي",
        ],
        en: [
          "Oscilloscope diagnostic of inverter IPM power modules",
          "Digital programmable touch thermostat installation",
          "Coil freeze and ambient thermistor sensor calibration",
          "Voltage surge suppression module installation",
        ],
      },
    },
    {
      id: "chemical-wash",
      image: "/images/services/ac-deep-chemical-wash.webp",
      imageAlt: "غسيل وتنظيف مكيف سبليت ومركزي بالضغط العالي بالكويت",
      number: "06",
      badge: { ar: "نقاء 100% وتوفير كهرباء", en: "Max Airflow Wash" },
      title: { ar: "غسيل المكيف بمضخات الضغط العالي", en: "High-Pressure Chemical Coil Wash" },
      desc: {
        ar: "غسيل عميق للوحدات الداخلية والخارجية بمضخات الضغط المائي ومواد كيميائية آمنة تزيل الطين والأتربة المترسبة، مما يضاعف قوة دفع الهواء ويخفض استهلاك الكهرباء بنسبة 30%.",
        en: "Deep hydrodynamic pressure wash and non-corrosive chemical foam cleaning of indoor evaporator and outdoor condenser coils, boosting cooling efficiency by 30%.",
      },
      points: {
        ar: [
          "تغطية وحماية الأثاث والجدران بأكياس غسيل احترافية مخصصة",
          "غسيل مروحة البلاور الداخلية وإزالة الروائح الكريهة والعفن",
          "تنظيف زعانف المكثف الخارجي لضمان التبادل الحراري السريع",
          "فحص ضغط الغاز والتبريد بعد الغسيل مجاناً",
        ],
        en: [
          "Complete furniture and wall protection with tailored wash jackets",
          "Cross-flow blower wheel deep cleaning and mold eradication",
          "Outdoor coil fin descaling to restore optimal heat rejection",
          "Complimentary post-wash refrigerant pressure verification",
        ],
      },
    },
  ];

  // Error Codes Guide by Brand
  const errorCodesData = {
    gree: [
      { code: "E1", cause: { ar: "حماية من ارتفاع ضغط الغاز (High Pressure)", en: "High refrigerant pressure protection" }, fix: { ar: "غسيل المكثف الخارجي وفحص مروحة التبريد", en: "Wash outdoor condenser & inspect fan" } },
      { code: "E3", cause: { ar: "حماية من انخفاض ضغط الغاز (Low Pressure)", en: "Low refrigerant pressure protection" }, fix: { ar: "كشف تسريب الغاز وشحن فريون أصلي", en: "Detect leak & refill pure freon" } },
      { code: "E6", cause: { ar: "عطل اتصال الإشارة بين الوحدة الداخلية والخارجية", en: "Indoor & outdoor comms failure" }, fix: { ar: "فحص أسلاك التوصيل وكارت التشغيل الرئيسي", en: "Test signal wiring & main PCB board" } },
      { code: "F0", cause: { ar: "نقص حاد في سائل التبريد أو انسداد الصمام", en: "Refrigerant shortage or valve blockage" }, fix: { ar: "فحص ضغط الفريون وإصلاح انسداد الأنبوب الشعري", en: "Verify gas charge & unblock capillary" } },
      { code: "H6", cause: { ar: "عطل في محرك مروحة الوحدة الداخلية (PG Motor)", en: "Indoor blower fan motor feedback error" }, fix: { ar: "تبديل محرك البلاور الداخلي أو مكثف المروحة", en: "Replace blower motor or fan capacitor" } },
    ],
    carrier: [
      { code: "E1", cause: { ar: "عطل حساس حرارة الهواء الداخلي (Room Sensor)", en: "Indoor ambient temperature sensor fault" }, fix: { ar: "استبدال حساس الثيرموستات الرقمي", en: "Replace digital NTC room sensor" } },
      { code: "E3", cause: { ar: "عطل حساس حرارة مواسير المبخر (Coil Sensor)", en: "Evaporator pipe coil sensor fault" }, fix: { ar: "تغيير حساس تجميد الكويل وفحص التبريد", en: "Replace freeze sensor & check airflow" } },
      { code: "E5", cause: { ar: "تسريب غاز أو حماية من تجميد الكويل", en: "Refrigerant leakage or frost protection" }, fix: { ar: "معالجة تهريب الفريون وتفريغ الرطوبة بالفاكيوم", en: "Repair gas leak & vacuum moisture" } },
      { code: "P4", cause: { ar: "ارتفاع حرارة موديول الانفرتر (IPM Overheat)", en: "Inverter compressor module overheating" }, fix: { ar: "تنظيف مشتت الحرارة واستبدال معجون التبريد", en: "Clean heatsink & renew thermal paste" } },
    ],
    lg: [
      { code: "CH05", cause: { ar: "فقدان إشارة الاتصال بين الوحدتين الداخلية والخارجية", en: "Communication loss between indoor/outdoor" }, fix: { ar: "فحص كابلات الكنترول وريليهات الطاقة", en: "Check control line & power relays" } },
      { code: "CH21", cause: { ar: "تيار زائد على كمبروسر الانفرتر (Overcurrent)", en: "DC peak overcurrent on compressor" }, fix: { ar: "فحص كارت الانفرتر ومقاومة ملفات الضاغط", en: "Test IPM circuit & compressor windings" } },
      { code: "CH38", cause: { ar: "اكتشاف نقص وسيط التبريد (Low Refrigerant)", en: "Low refrigerant gas detection" }, fix: { ar: "كشف التسريب وإعادة التعبئة بالميزان", en: "Find leak & recharge with digital scale" } },
      { code: "CH26", cause: { ar: "عطل تشغيل كمبروسر الانفرتر (Inverter Comp Locked)", en: "Inverter compressor start failure" }, fix: { ar: "تبديل موديول IPM وفحص دوران الضاغط", en: "Replace inverter module & verify rotation" } },
    ],
    midea: [
      { code: "EC", cause: { ar: "كشف تسريب غاز الفريون وتوقف التبريد", en: "Refrigerant leakage detection" }, fix: { ar: "لحام التسريب وشحن فريون أمريكي مطابق", en: "Braze leak point & recharge factory freon" } },
      { code: "E1", cause: { ar: "خطأ اتصال في لوحة التحكم الإلكترونية", en: "Indoor / outdoor communication error" }, fix: { ar: "إصلاح مسارات كارت التشغيل الرئيسي", en: "Repair PCB communication circuit" } },
      { code: "E3", cause: { ar: "سرعة مروحة الوحدة الداخلية خارج نطاق السيطرة", en: "Indoor fan speed out of control" }, fix: { ar: "تبديل محرك مروحة البلاور وحساس القراءة", en: "Replace blower motor & hall IC sensor" } },
      { code: "P0", cause: { ar: "حماية من الحمل الكهربائي الزائد لموديول الطاقة", en: "Inverter IGBT over-current protection" }, fix: { ar: "فحص عزل الضاغط وتبديل كارت الباور", en: "Test compressor insulation & power board" } },
    ],
  };

  const brandBadges = [
    { name: "Gree", text: isAr ? "تكييف جري سبليت ومركزي" : "Gree Tropical Split & VRF" },
    { name: "Carrier", text: isAr ? "تكييف كاريير الأمريكي" : "Carrier American Central & Split" },
    { name: "York", text: isAr ? "تكييف يورك للقسائم والفلل" : "York Central Package Units" },
    { name: "LG", text: isAr ? "مكيفات إل جي Dual Inverter" : "LG Dual Inverter Smart AC" },
    { name: "Daikin", text: isAr ? "تكييف دايكن الياباني المتطور" : "Daikin Japanese Engineering" },
    { name: "Midea", text: isAr ? "مكيفات ميديا بكافة أحجامها" : "Midea Inverter & Window AC" },
    { name: "General", text: isAr ? "تكييف جنرال واوجنرال الأصلي" : "General & O General Heavy Duty" },
    { name: "Mitsubishi", text: isAr ? "ميتسوبيشي تكييف قوي ومعمر" : "Mitsubishi Electric Tropical" },
  ];

  const faqs = [
    {
      q: { ar: "كم من الوقت يستغرق وصول فني التكييف لمنزلي في حر الصيف؟", en: "How quickly does an AC emergency technician arrive during Kuwait summer?" },
      a: {
        ar: "ندرك تماماً قسوة درجات الحرارة بالكويت، لذا تنتشر سيارات طوارئ التكييف بكافة المناطق (حولي، السالمية، الفروانية، صباح السالم، القرين، الجهراء، والعاصمة) لتصلك خلال 30 إلى 45 دقيقة فقط من اتصالك.",
        en: "Understanding Kuwait's extreme summer heat, our mobile AC emergency vans are deployed across all governorates to reach your doorstep in 30 to 45 minutes guaranteed.",
      },
    },
    {
      q: { ar: "ما نوع غاز الفريون الذي تستخدمونه وهل هو أصلي؟", en: "What brand and purity of Freon gas do you use for AC refills?" },
      a: {
        ar: "نستخدم حصرياً غاز الفريون الأمريكي الأصلي عالي النقاوة 100% (DuPont / Honeywell R410A و R22) الخالي تماماً من شوائب الرطوبة التي تسبب احتراق الكمبروسر.",
        en: "We strictly utilize 100% pure genuine American Freon (DuPont / Honeywell R410A and R22) certified moisture-free to safeguard compressors against overheating and acid burn-out.",
      },
    },
    {
      q: { ar: "هل تقدمون كفالة وضمان كتابي على تبديل الكمبروسر؟", en: "Do you provide a written warranty on compressor replacements?" },
      a: {
        ar: "نعم، نقدم كفالة رسمية موثقة لمدة عام كامل على الكمبروسرات الاستوائية الجديدة المعتمدة، تشمل تبديل الكمبروسر، الفاكيوم، وشحن الغاز.",
        en: "Yes, every new T3 tropical compressor comes with an official documented 1-year written warranty covering the compressor, vacuum flush, and freon gas charge.",
      },
    },
    {
      q: { ar: "لماذا ينقط المكيف ماء داخل الغرفة وكيف يتم حله؟", en: "Why is water dripping from the indoor AC unit and how is it fixed?" },
      a: {
        ar: "يحدث ذلك نتيجة انسداد خرطوم تصريف المياه بالأتربة والطحالب أو تراكم الرواسب بحوض المكيف الداخلي. يقوم فني كويت فيكس بتسليك مجرى التصريف بمضخة الضغط العالي وتعقيم الحوض فورياً في 20 دقيقة.",
        en: "Water leaks happen when the condensate drain pipe is clogged with dirt, dust, and algae jelly. Our technician flushes the drain line using high-pressure nitrogen and chemical wash in 20 minutes.",
      },
    },
    {
      q: { ar: "هل تقومون بصيانة التكييف المركزي للقسائم والشركات؟", en: "Do you service central package AC units for villas and commercial buildings?" },
      a: {
        ar: "نعم، فريقنا الهندسي متخصص بالوحدات المركزية (Package Units) وفحص المراوح، الكونتاكتورات، الدكتات، وتبديل محركات الدفع مع تقديم عقود صيانة دورية.",
        en: "Yes, our HVAC engineering crew specializes in rooftop central package units, blower motors, heavy contactors, duct airflow, and offers preventative maintenance contracts.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 overflow-x-hidden">
      {/* Sticky Auto-Hiding Navbar with Language Switcher */}
      <Navbar />

      {/* ==========================================================
          SECTION 1: HERO - SPECIALIZED AC REPAIR LANDING
         ========================================================== */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-200/80">
        
        {/* Background Dots */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px"
          }}
        />
        <div className="absolute top-1/4 -right-36 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-36 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Visual Image Side with Expanding Corner Borders & Curtain Drop */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Decorative Expanding Frame Corners */}
                <div className="absolute -top-3.5 -right-3.5 w-16 h-16 border-t-[3.5px] border-r-[3.5px] border-blue-600 rounded-tr-2xl z-30 pointer-events-none" />
                <div className="absolute -bottom-3.5 -left-3.5 w-16 h-16 border-b-[3.5px] border-l-[3.5px] border-blue-400 rounded-bl-2xl z-30 pointer-events-none" />

                {/* Floating 45-Min Guarantee Seal */}
                <div className="absolute -top-4 left-6 z-30 bg-white/95 border border-slate-200 shadow-lg px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-800">
                    {isAr ? "طوارئ تكييف 24/7 - وصول خلال 45 دقيقة" : "24/7 AC Emergency • 45-Min Arrival"}
                  </span>
                </div>

                {/* Hero Image Container */}
                <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-slate-900">
                  {!heroImgError ? (
                    <Image
                      src="/images/services/ac-repair.jpg"
                      alt="فني تصليح وصيانة مكيفات سبليت ومركزي في الكويت - كويت فيكس"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 620px"
                      className="object-cover object-center transform hover:scale-104 transition-transform duration-700 ease-out"
                      onError={() => setHeroImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-blue-50 to-slate-100 text-slate-700">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center justify-center mb-3">
                        <Snowflake className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">
                        {isAr ? "ورشة صيانة تكييف متنقلة" : "Mobile AC Service Workshop"}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs font-semibold">
                        {isAr ? "صيانة وتصليح جميع وحدات التكييف في الكويت" : "Complete AC repair across all Kuwait governorates"}
                      </p>
                    </div>
                  )}

                  {/* Dark Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Certified Warranty Badge */}
                  <div className="absolute bottom-5 right-5 z-20 bg-white/95 border border-slate-200 shadow-xl px-4 py-2.5 rounded-2xl flex items-center gap-3 backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-black text-slate-900 leading-tight">
                        {isAr ? "كفالة سنة على الكمبروسر" : "1-Year Compressor Warranty"}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-500">
                        {isAr ? "غاز أمريكي R410A / R22 أصلي" : "100% Genuine US Refrigerant"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Content Side with Targeted Copy & Conversion Triggers */}
            <div className="lg:col-span-6 space-y-7 order-1 lg:order-2 text-right">
              
              {/* Category Breadcrumb Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 px-4 py-1.5 rounded-full shadow-2xs">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold text-blue-900">
                  {isAr ? "المركز المعتمد لصيانة التكييف في الكويت" : "Kuwait's Premier Certified AC Maintenance Center"}
                </span>
              </div>

              {/* Main Headline with Blue Keyword Accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.2] tracking-tight">
                {isAr ? (
                  <>
                    تصليح وصيانة{" "}
                    <span className="relative inline-block px-3 py-1 my-1 rounded-2xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                      المكيفات في الكويت
                    </span>{" "}
                    سبليت ومركزي
                  </>
                ) : (
                  <>
                    Certified{" "}
                    <span className="relative inline-block px-3 py-1 my-1 rounded-2xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                      Air Conditioner Repair
                    </span>{" "}
                    in Kuwait
                  </>
                )}
              </h1>

              {/* Lead Paragraph */}
              <div className="pr-4 border-r-4 border-blue-600">
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                  {isAr
                    ? "خدمة طوارئ تكييف سريعة لجميع مناطق الكويت لمواجهة حرارة الصيف القاسية. كشف تسريب الغاز، تعبئة فريون أمريكي أصلي، تبديل كمبروسرات استوائية T3، وغسيل الوحدات بالضغط العالي بنفس اليوم."
                    : "Rapid 24/7 AC emergency repair across all Kuwait areas. Electronic leak detection, authentic US Freon recharge, T3 tropical compressor replacements, and high-pressure jet coil wash on the spot."}
                </p>
              </div>

              {/* Trust Metric Bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "فنيو تكييف خبرة 20 عاماً" : "20+ Years HVAC Technicians"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "غاز أمريكي نقي 100%" : "100% Pure US Freon Gas"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "كفالة سنة على الكمبروسر" : "1-Year Compressor Warranty"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "صيانة فورية بنفس الزيارة" : "Same-Day Doorstep Fix"}
                  </span>
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white text-base font-black px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
                >
                  <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{isAr ? "اطلب فني مكيفات الآن" : "Call AC Emergency Tech"}</span>
                </a>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base font-extrabold px-7 py-4 rounded-full shadow-sm hover:shadow-md hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{isAr ? "واتساب مباشر" : "WhatsApp Chat"}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================
          SECTION 2: TYPES OF AC SYSTEMS WE SERVICE
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "شامل لكافة الأنظمة" : "All AC Architectures"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              {isAr ? "أنواع أجهزة التكييف التي نقوم بصيانتها" : "AC System Types We Service in Kuwait"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {isAr
                ? "خبرة ممتدة ومعدات فحص رقمية متخصصة لجميع أنظمة التبريد المنزلية، القسائم، والشركات."
                : "Comprehensive diagnostic and repair capabilities for residential split units, central villa packages, and commercial VRF."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {acTypes.map((type, idx) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#FAFCFF] border-2 border-slate-200/80 hover:border-blue-500 p-6 rounded-3xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-right group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {isAr ? type.badge.ar : type.badge.en}
                    </span>
                    <Wind className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {isAr ? type.title.ar : type.title.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {isAr ? type.desc.ar : type.desc.en}
                  </p>
                </div>
                <div className="pt-4 mt-5 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{isAr ? "فحص تبريد فوري" : "Instant Diagnostic Scan"}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 3: 6 TECHNICAL AC SERVICES WITH DEDICATED IMAGES
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "حلول التبريد المتخصصة" : "Specialized Cooling Engineering"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-3">
              {isAr ? "خدمات تصليح أجزاء المكيف مع الصور التوضيحية" : "AC Component Repairs & Visual Diagnostics"}
            </h2>
            <p className="text-base text-slate-600 mt-2 font-medium">
              {isAr
                ? "نوفر قطع غيار تكييف أصلية، كمبروسرات استوائية T3، وغاز فريون أمريكي مطابق لمواصفات المصنع."
                : "Dedicated OEM components, T3 tropical compressors, and high-purity US Freon matching factory standards."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {acServicesWithImages.map((service, index) => (
              <ServiceImageCard 
                key={service.id} 
                service={service} 
                index={index} 
                isAr={isAr} 
                ctaText={t("contactUs")} 
              />
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 4: AC ERROR CODES INTERACTIVE TERMINAL
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "دليل فحص الأخطاء الرقمية" : "AC Error Codes Quick Guide"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2.5">
              {isAr ? "جدول رموز أعطال المكيفات حسب الماركة" : "AC Error Codes by Major Brand"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              {isAr
                ? "اختر ماركة مكيفك لعرض كود العطل وسببه الفني وطريقة حله الفورية من قبل فنيينا:"
                : "Select your AC brand to view the error code, technical cause, and doorstep fix:"}
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {(["gree", "carrier", "lg", "midea"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setActiveBrandTab(b)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer uppercase ${
                  activeBrandTab === b
                    ? "bg-blue-600 text-white shadow-md scale-103"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Codes Table */}
          <div className="overflow-x-auto rounded-3xl border-2 border-slate-200 shadow-xs bg-white">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-black">
                  <th className="p-4">{isAr ? "كود العطل" : "Code"}</th>
                  <th className="p-4">{isAr ? "سبب العطل الفني" : "Probable Cause"}</th>
                  <th className="p-4">{isAr ? "الإصلاح المعتمد بالمنزل" : "Doorstep Repair"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {errorCodesData[activeBrandTab].map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-4 font-mono font-black text-blue-600 text-sm sm:text-base">{row.code}</td>
                    <td className="p-4">{isAr ? row.cause.ar : row.cause.en}</td>
                    <td className="p-4 text-emerald-700 font-bold">{isAr ? row.fix.ar : row.fix.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <a 
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:underline"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isAr ? "ظهر لك كود عطل مختلف؟ اتصل بالفني للمساعدة الفورية" : "Facing another error code? Call our technician for instant advice"}</span>
            </a>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 5: 4-STAGE AC REPAIR WORKFLOW
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAFCFF] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "دقة وسرعة وراحة بال" : "Streamlined Doorstep Workflow"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5">
              {isAr ? "خطوات صيانة المكيف في منزلك" : "Our 4-Step Home AC Repair Process"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            {[
              {
                step: "01",
                title: { ar: "اتصال طوارئ وتوجيه الورشة", en: "1-Click Request & Dispatch" },
                desc: { ar: "اتصل بنا هاتفياً أو املأ النموذج وسيتم توجيه أقرب سيارة تكييف لعنوانك.", en: "Call or book online. Our nearest mobile AC van is dispatched immediately." },
              },
              {
                step: "02",
                title: { ar: "فحص ضغوط الغاز والكهرباء", en: "Pressure & Electrical Diagnostic" },
                desc: { ar: "يقوم الفني بقياس ضغط الفريون بالساعة الرقمية وفحص أمبير الكمبروسر.", en: "Technician tests freon PSI gauges, compressor amperage, and electrical relays." },
              },
              {
                step: "03",
                title: { ar: "معالجة العطل وقطع أصلية", en: "Leak Repair & OEM Parts" },
                desc: { ar: "لحام التسريب، شحن فريون أمريكي أو تبديل الكمبروسر فورياً دون نقل الوحدة.", en: "Brazing leak points, charging pure US Freon, or replacing parts on-site." },
              },
              {
                step: "04",
                title: { ar: "قياس برودة الهواء والكفالة", en: "CFM Cooling Test & Warranty" },
                desc: { ar: "فحص درجة حرارة خروج الهواء بالليزر وتسليم سند الكفالة الرسمي المعتمد.", en: "Laser thermometer airflow test followed by official written warranty invoice." },
              },
            ].map((st, i) => (
              <div 
                key={i} 
                className="bg-white border-2 border-slate-200/80 p-7 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <span className="text-5xl font-black text-blue-50 absolute top-4 left-4 pointer-events-none">
                  {st.step}
                </span>
                <div className="relative z-10">
                  <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-4">
                    {st.step}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {isAr ? st.title.ar : st.title.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {isAr ? st.desc.ar : st.desc.en}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 6: BRANDS SUPPORTED IN KUWAIT
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
            {isAr ? "قطع أصلية 100%" : "100% Genuine OEM Parts"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5 mb-3">
            {isAr ? "الماركات العالمية التي نقوم بصيانتها" : "Major AC Brands We Service in Kuwait"}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-10 font-medium">
            {isAr
              ? "نوفر قطع غيار أصلية مستوردة معتمدة لجميع موديلات التكييف السبليت والمركزي."
              : "We stock authentic imported factory parts for American, Japanese, and Gulf AC manufacturers."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {brandBadges.map((b) => (
              <div 
                key={b.name}
                className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200/80 hover:border-blue-600 shadow-2xs hover:shadow-sm transition-all flex flex-col items-center justify-center group"
              >
                <span className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold mt-0.5 text-center">
                  {b.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 7: FORMSPREE AC BOOKING FORM
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80" id="booking">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 text-right">
            
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
              <div>
                <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase">
                  {isAr ? "حجز فوري للتكييف" : "Instant AC Booking"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {isAr ? "احجز فني صيانة مكيفات الآن" : "Book Your AC Technician Now"}
                </h2>
              </div>
              <Snowflake className="w-8 h-8 text-blue-600 hidden sm:block" />
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isAr ? "تم إرسال طلب صيانة المكيف بنجاح!" : "AC Service Request Received!"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isAr
                    ? `شكراً لك. سيتصل بك فني التكييف المتخصص خلال 10 دقائق لتأكيد وصول ورشة الصيانة المتنقلة إلى منزلك.`
                    : `Thank you. Our AC dispatch technician will call you in 10 minutes to confirm doorstep arrival.`}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs cursor-pointer"
                >
                  {isAr ? "حجز موعد آخر" : "Book Another Unit"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-5">
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "الاسم الكريم *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "فهد المطيري" : "Fahad Al-Mutairi"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "رقم الهاتف داخل الكويت *" : "Kuwait Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+965 5062 6275"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@gmail.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "ماركة المكيف *" : "AC Brand *"}
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Gree">Gree</option>
                      <option value="Carrier">Carrier</option>
                      <option value="York">York</option>
                      <option value="LG">LG</option>
                      <option value="Daikin">Daikin</option>
                      <option value="Midea">Midea</option>
                      <option value="General">General / O General</option>
                      <option value="Other">{isAr ? "ماركة أخرى" : "Other Brand"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "المنطقة في الكويت *" : "Area in Kuwait *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder={isAr ? "حولي، السالمية..." : "Hawally, Salmiya..."}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {isAr ? "وصف المشكلة في التكييف *" : "AC Fault Description *"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      isAr
                        ? "مثال: المكيف يخرج هواء حار، أو ينقط ماء داخل الغرفة، أو يظهر كود E1، أو الكمبروسر يفصل فجأة..."
                        : "e.g. AC blows warm air, water leaks inside room, code E1 displayed, or compressor trips..."
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{isAr ? "جاري الإرسال..." : "Dispatching Request..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isAr ? "إرسال طلب صيانة المكيف فورياً" : "Submit AC Repair Request"}</span>
                      <Send className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 8: AC FAQS ACCORDION
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5">
              {isAr ? "كل ما تريد معرفته عن صيانة المكيفات" : "Air Conditioner Repair FAQs"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="border-2 border-slate-200/80 rounded-2xl overflow-hidden transition-colors text-right"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 bg-slate-50 hover:bg-blue-50/50 transition-colors text-right cursor-pointer"
                  >
                    <ChevronDown className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      {isAr ? faq.q.ar : faq.q.en}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="p-5 sm:p-6 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                          {isAr ? faq.a.ar : faq.a.en}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Master Footer */}
      <Footer />
    </div>
  );
}

/* ==========================================================
   SUB-COMPONENT: DEDICATED AC SERVICE CARD WITH IMAGE
   ========================================================== */
interface ServiceImageCardProps {
  service: any;
  index: number;
  isAr: boolean;
  ctaText: string;
}

function ServiceImageCard({ service, index, isAr, ctaText }: ServiceImageCardProps) {
  const [imgError, setImgError] = useState(false);

  // Multi-directional entrance assignment for grid columns
  const colIndex = index % 3;
  const initialX = colIndex === 0 ? -60 : colIndex === 2 ? 60 : 0;
  const initialY = colIndex === 1 ? 40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-blue-500/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.16)] overflow-hidden flex flex-col justify-between transition-colors duration-250 group gpu-layer text-right"
    >
      <div>
        {/* Service Image Banner with Dedicated Fallback */}
        <div className="relative w-full h-56 sm:h-60 bg-slate-900 overflow-hidden">
          {!imgError ? (
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-50 to-slate-100 text-slate-700">
              <div className="w-12 h-12 rounded-xl bg-white border border-blue-200 shadow-2xs flex items-center justify-center mb-2">
                <Snowflake className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-slate-500 font-mono">
                {service.image}
              </span>
            </div>
          )}

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Top Badge */}
          <div className={`absolute top-4 ${isAr ? "right-4" : "left-4"} z-10`}>
            <span className="bg-white/95 backdrop-blur-xs text-blue-700 text-xs font-black px-3.5 py-1 rounded-full shadow-sm border border-blue-100 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{isAr ? service.badge.ar : service.badge.en}</span>
            </span>
          </div>

          {/* Number Stamp */}
          <div className={`absolute top-4 ${isAr ? "left-4" : "right-4"} z-10`}>
            <span className="w-8 h-8 rounded-xl bg-slate-950/80 backdrop-blur-xs text-white text-xs font-black flex items-center justify-center border border-white/20">
              {service.number}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 leading-snug">
            {isAr ? service.title.ar : service.title.en}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-5">
            {isAr ? service.desc.ar : service.desc.en}
          </p>

          {/* 4 Feature Points */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
            {(isAr ? service.points.ar : service.points.en).map((pt: string, i: number) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-blue-500/25 transition-all duration-200 active:scale-95 group/btn"
        >
          <PhoneCall className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
          <span>{ctaText}</span>
        </a>
      </div>
    </motion.div>
  );
}
