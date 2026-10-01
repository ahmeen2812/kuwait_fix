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
  Droplets,
  RotateCcw,
  Volume2,
  Cpu,
  Zap,
  Flame,
  Send,
  Loader2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Award,
  Calendar,
  AlertCircle
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WashingMachineRepairPage() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeBrandTab, setActiveBrandTab] = useState<"lg" | "samsung" | "daewoo" | "bosch">("lg");
  const [heroImgError, setHeroImgError] = useState(false);

  // Formspree State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    machineType: isAr ? "غسالة فتحة أمامية" : "Front-Load Automatic",
    brand: "LG",
    area: isAr ? "السالمية" : "Salmiya",
    fault: isAr ? "لا تصرف الماء" : "Does not drain water",
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
          service: "Washing Machine Repair Service",
          ...formData,
          _subject: `🚨 [طلب صيانة غسالة] ${formData.name} - ${formData.brand} (${formData.area})`,
        }),
      });
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        machineType: isAr ? "غسالة فتحة أمامية" : "Front-Load Automatic",
        brand: "LG",
        area: isAr ? "السالمية" : "Salmiya",
        fault: isAr ? "لا تصرف الماء" : "Does not drain water",
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
  // 6 DETAILED SERVICES WITH DEDICATED IMAGES
  // -------------------------------------------------------------
  const washerServicesWithImages = [
    {
      id: "drain-pump",
      image: "/images/services/washer-drain-pump.webp",
      imageAlt: "تصليح وتبديل طلمبة تصريف الغسالة الأوتوماتيك بالكويت",
      number: "01",
      badge: { ar: "العطل الأكثر شيوعاً", en: "Most Common Fault" },
      title: { ar: "تبديل طلمبة التصريف وفحص الفلتر", en: "Drain Pump Replacement & Filter Flush" },
      desc: {
        ar: "معالجة مشكلة بقاء الماء داخل الغسالة بعد انتهاء الدورة، ظهور رمز OE أو 5E، وصدور صوت أزيز من المضخة دون تصريف.",
        en: "Resolving trapped water inside the drum, OE or 5E drainage error codes, and buzzing pumps unable to evacuate water.",
      },
      points: {
        ar: [
          "استبدال طلمبة طرد أصلية معتمدة من الوكالة",
          "تنظيف كامل لخرطوم الصرف ومجرى الفلتر الداخلي",
          "فحص مفتاح حساس مستوى ضغط الماء (Pressure Switch)",
          "كفالة كتابية موثقة لمدة 6 إلى 12 شهراً",
        ],
        en: [
          "OEM magnetic high-capacity drain pump replacement",
          "Deep hydraulic flush of internal hoses and coin trap",
          "Water level pressure switch diagnostic check",
          "Official 6 to 12 months written warranty",
        ],
      },
    },
    {
      id: "motor-belt",
      image: "/images/services/washer-motor-belt.webp",
      imageAlt: "صيانة محرك الغسالة وسير الدوران بالكويت",
      number: "02",
      badge: { ar: "فحص إلكتروني فوري", en: "Instant Motor Scan" },
      title: { ar: "صيانة محرك الدوران وتبديل السيور", en: "Drive Motor & Belt Replacement" },
      desc: {
        ar: "إصلاح توقف الحلة عن الدوران نهائياً أو دورانها ببطء شديد دون القدرة على عصر الملابس بسبب انقطاع السير أو احتراق ملفات الموتور.",
        en: "Fixing drums that refuse to rotate, spin sluggishly, or lack power during spin cycles due to snapped drive belts or motor wear.",
      },
      points: {
        ar: [
          "تركيب سيور ألمانية وأمريكية الصنع مقاومة للحرارة",
          "فحص وتبديل شربون المحرك الأصلي (Carbon Brushes)",
          "معايرة محركات الانفرتر والدفع المباشر (Direct Drive)",
          "تشغيل تجريبي لدورة العصر السريع بكفاءة 100%",
        ],
        en: [
          "Heavy-duty heat-resistant German & US drive belts",
          "OEM carbon brush replacement & commutator polishing",
          "Inverter Direct Drive motor calibration",
          "Full 1400 RPM spin-cycle balance test on-site",
        ],
      },
    },
    {
      id: "drum-bearing",
      image: "/images/services/washer-drum-bearing.webp",
      imageAlt: "تبديل رولمان بلي ومساعدين غسالة أوتوماتيك",
      number: "03",
      badge: { ar: "قطع ستانلس ستيل", en: "Heavy-Duty Bearings" },
      title: { ar: "تبديل رولمان بلي الحلة والمساعدين", en: "Drum Bearings & Shock Absorbers" },
      desc: {
        ar: "حل صوت الطحن المعدني العالي كصوت الطائرة النفاثة واهتزاز الغسالة العنيف من مكانها أثناء العصر بسبب تآكل كراسي التحميل والمساعدين.",
        en: "Eliminating loud roaring metallic noise during spin cycles and violent cabinet vibrations caused by worn drum bearings and failed dampers.",
      },
      points: {
        ar: [
          "تركيب كراسي رولمان بلي ستانلس ستيل يابانية أو إيطالية",
          "استبدال مانع تسريب الزيت والماء الأصلي (Oil Seal)",
          "تغيير مساعدين امتصاص الصدمات الهيدروليكية (Shock Absorbers)",
          "كفالة سنة كاملة ضد الصوت والاهتزاز",
        ],
        en: [
          "High-grade stainless steel Japanese/Italian bearings",
          "Double-lip watertight rubber oil seal replacement",
          "Hydraulic suspension damper and balance spring upgrade",
          "1-Year documented anti-noise & vibration warranty",
        ],
      },
    },
    {
      id: "pcb-board",
      image: "/images/services/washer-pcb-board.webp",
      imageAlt: "تصليح كارت وبرمجة غسالة أوتوماتيك في الكويت",
      number: "04",
      badge: { ar: "هندسة إلكترونية", en: "Micro-Electronic Fix" },
      title: { ar: "صيانة اللوحة الإلكترونية والبرمجة", en: "Electronic PCB Control Board Repair" },
      desc: {
        ar: "إصلاح توقف الغسالة المفاجئ بمنتصف البرامج، أخطاء الشاشة الرقمية المتكررة، وعدم استجابة أزرار اللمس أو احتراق ريليهات الطاقة.",
        en: "Repairing washers that freeze midway, display erratic error codes, fail to power on, or suffer from power surge board burns.",
      },
      points: {
        ar: [
          "فحص وتحديد الآيسيهات والريليهات التالفة بالكمبيوتر",
          "إعادة لحام المسارات وبرمجة ذاكرة المعالج (EEPROM)",
          "حماية الدائرة من تذبذب التيار الكهربائي",
          "توفير كروت أصلية بديلة مبرمجة لجميع الموديلات",
        ],
        en: [
          "Computerized oscilloscope testing of microcontrollers",
          "Relay, capacitor, and EEPROM firmware reprogramming",
          "Power surge protection circuitry optimization",
          "Pre-programmed factory OEM replacement boards available",
        ],
      },
    },
    {
      id: "door-gasket",
      image: "/images/services/washer-door-gasket.webp",
      imageAlt: "تبديل ربلة باب الغسالة وقفل اللوك في الكويت",
      number: "05",
      badge: { ar: "مانع بكتيريا وتسريب", en: "Antibacterial Seal" },
      title: { ar: "تبديل ربلة الباب وقفل الأمان (dE)", en: "Door Boot Gasket & Lock Switch (dE)" },
      desc: {
        ar: "معالجة تسريب المياه من أسفل الباب، تمزق الإطار المطاطي أو انبعاث روائح عفن، وإصلاح عطل قفل الباب الذي يمنع بدء دورة الغسيل.",
        en: "Solving door frame water leaks, torn moldy rubber gaskets, and electromagnetic door latch failures causing 'dE' error codes.",
      },
      points: {
        ar: [
          "تركيب ربلة باب أصلية مقاومة للبكتيريا والعفن",
          "استبدال سويتش قفل الباب الكهرومغناطيسي الأصلي",
          "ضبط مفصلات ومقبض الباب لضمان الإغلاق المحكم",
          "اختبار ضغط الماء للتأكد من انعدام أي تسريب نهائياً",
        ],
        en: [
          "OEM antibacterial mold-resistant silicone door bellow",
          "Electromagnetic safety door lock interlock switch renewal",
          "Door hinge and latch alignment for airtight closure",
          "High-pressure hydraulic flood test to verify zero leaks",
        ],
      },
    },
    {
      id: "heating-element",
      image: "/images/services/washer-heating-element.webp",
      imageAlt: "تبديل هيتر وحساس حرارة الغسالة بالكويت",
      number: "06",
      badge: { ar: "أمان حراري وكهربائي", en: "Thermal Safety" },
      title: { ar: "تبديل هيتر التسخين وحساس الحرارة", en: "Heating Element & NTC Thermistor" },
      desc: {
        ar: "حل مشكلة عدم تسخين الماء، بقاء الملابس غير نظيفة، أو فصل قاطع الكهرباء الرئيسي للمنزل بمجرد وصول الغسالة لمرحلة التسخين.",
        en: "Fixing washing machines that remain ice cold, fail wash cycles due to heating errors (tE/H6), or trip the home electrical circuit breaker.",
      },
      points: {
        ar: [
          "استبدال سخان مياه ستانلس ستيل أصلي مطابق للوات",
          "فحص وتغيير حساس الحرارة الرقمي (NTC Sensor)",
          "فحص العزل الكهربائي للتأكد من عدم وجود التماس",
          "تعقيم الحلة ببرنامج غسيل ساخن عالي الكفاءة",
        ],
        en: [
          "OEM stainless steel heating element calibrated to exact wattage",
          "Precision digital NTC temperature thermistor replacement",
          "Full earth-leakage safety testing to prevent power trips",
          "High-temperature sanitization cycle verification",
        ],
      },
    },
  ];

  // Error Codes Guide by Brand
  const errorCodesData = {
    lg: [
      { code: "OE", cause: { ar: "انسداد أو تعطل طلمبة التصريف", en: "Drain pump blocked or motor burnt" }, fix: { ar: "تنظيف الفلتر واستبدال مضخة الطرد الأصلية", en: "Flush filter and install new OEM pump" } },
      { code: "UE", cause: { ar: "عدم توازن الملابس داخل الحلة أثناء العصر", en: "Unbalanced laundry load in drum" }, fix: { ar: "تعديل توزيع الملابس ومعايرة المساعدين", en: "Rebalance clothes & calibrate shock absorbers" } },
      { code: "dE", cause: { ar: "عطل مفتاح قفل الباب (Door Lock)", en: "Door latch safety lock switch fault" }, fix: { ar: "تبديل سويتش قفل الباب الكهرومغناطيسي الأصلي", en: "Replace electromagnetic door lock switch" } },
      { code: "LE", cause: { ar: "حمل زائد على المحرك أو عطل حساس Hall", en: "Motor drive overload or Hall sensor fault" }, fix: { ar: "فحص حساس الدوران وتبديل كارت المحرك", en: "Direct-drive hall sensor calibration" } },
      { code: "tE", cause: { ar: "عطل حساس درجة حرارة الماء (Thermistor)", en: "Water temperature sensor (NTC) error" }, fix: { ar: "استبدال حساس NTC وفحص أسلاك التوصيل", en: "Replace NTC sensor & check wiring harness" } },
    ],
    samsung: [
      { code: "5E / 5C", cause: { ar: "مشكلة في تصريف المياه", en: "Water drainage failure" }, fix: { ar: "إزالة الانسداد وتبديل مضخة التصريف", en: "Clear blockage & replace drain pump" } },
      { code: "4E / 4C", cause: { ar: "ضعف سحب الماء أو انسداد الصمام", en: "Water supply issue or blocked valve" }, fix: { ar: "تنظيف فلتر المدخل وتبديل صمام السحب الثنائي", en: "Clean mesh filter & replace dual inlet valve" } },
      { code: "dE / dC", cause: { ar: "الباب غير مغلق بإحكام أو تلف القفل", en: "Door open or door switch error" }, fix: { ar: "استبدال لوك الباب وضبط المفصلات", en: "Replace door lock switch & adjust hinges" } },
      { code: "3E / 3C", cause: { ar: "عطل في دوران محرك الغسالة", en: "Motor drive hall sensor error" }, fix: { ar: "فحص كارت الانفرتر وملفات الموتور", en: "Test inverter PCB board & motor windings" } },
      { code: "HE / HC", cause: { ar: "عطل في سخان تسخين الماء", en: "Water heater failure" }, fix: { ar: "استبدال هيتر التسخين وفحص قاطع الأمان", en: "Replace heating element & thermal fuse" } },
    ],
    daewoo: [
      { code: "OE", cause: { ar: "عدم تصريف الماء خلال الوقت المحدد", en: "Water drain timeout" }, fix: { ar: "استبدال طلمبة الطرد الأصلية", en: "Replace OEM drainage pump" } },
      { code: "IE", cause: { ar: "الماء لا يدخل إلى الغسالة", en: "Water inlet timeout" }, fix: { ar: "تبديل صمام السحب وفحص ضغط المياه", en: "Replace solenoid valve & check water line" } },
      { code: "UE", cause: { ar: "اهتزاز الحلة وعدم التوازن", en: "Unbalanced spin cycle" }, fix: { ar: "ضبط أرجل الغسالة وتبديل المساعدين", en: "Level leveling legs & replace dampers" } },
      { code: "LE", cause: { ar: "الباب مفتوح أثناء التشغيل", en: "Door lock open" }, fix: { ar: "تبديل لوك الباب الكهرومغناطيسي", en: "Replace electromagnetic door lock" } },
      { code: "H6", cause: { ar: "عطل في دائرة تسخين الماء", en: "Heater circuit fault" }, fix: { ar: "فحص ريليه الهيتر وتغيير السخان", en: "Inspect heater relay & swap element" } },
    ],
    bosch: [
      { code: "E18 / F18", cause: { ar: "انسداد فلتر أو مضخة التصريف", en: "Blocked pump or drain hose" }, fix: { ar: "تنظيف المضخة وفحص مروحة الطرد", en: "Clean pump chamber & test impeller" } },
      { code: "E17 / F17", cause: { ar: "تجاوز وقت امتلاء الماء", en: "Water intake time exceeded" }, fix: { ar: "فحص صمام الأكواستوب (AquaStop)", en: "Test AquaStop valve & water pressure" } },
      { code: "E23 / F23", cause: { ar: "تفعيل نظام منع تسريب المياه (AquaStop)", en: "AquaStop anti-flood leak activated" }, fix: { ar: "معالجة التسريب الداخلي وتفريغ القاعدة", en: "Repair internal leak & drain safety tray" } },
      { code: "E21 / F21", cause: { ar: "عطل في محرك الدوران الرئيسي", en: "Motor drive malfunction" }, fix: { ar: "استبدال شربون المحرك أو صيانة الكارت", en: "Replace carbon brushes or overhaul motor" } },
    ],
  };

  const brandBadges = [
    { name: "LG", text: isAr ? "غسالات إل جي سمارت انفرتر" : "LG Smart Inverter" },
    { name: "Samsung", text: isAr ? "غسالات سامسونج ايكوبابل" : "Samsung EcoBubble" },
    { name: "Daewoo", text: isAr ? "غسالات دايو الكورية" : "Daewoo Air Bubble" },
    { name: "Bosch", text: isAr ? "غسالات بوش الألمانية" : "Bosch German Series" },
    { name: "Whirlpool", text: isAr ? "غسالات ويرلبول الأمريكية" : "Whirlpool Heavy Duty" },
    { name: "Panasonic", text: isAr ? "غسالات باناسونيك" : "Panasonic Washers" },
    { name: "Siemens", text: isAr ? "غسالات سيمنز الألمانية" : "Siemens iQ Series" },
    { name: "Midea", text: isAr ? "غسالات ميديا" : "Midea Washers" },
  ];

  const faqs = [
    {
      q: { ar: "كم من الوقت يستغرق وصول فني الغسالات لمنزلي في الكويت؟", en: "How fast will the washer technician arrive at my house in Kuwait?" },
      a: {
        ar: "بفضل ورشنا المتنقلة المنتشرة في جميع محافظات الكويت (حولي، السالمية، الفروانية، القرين، مبارك الكبير، الجهراء والعاصمة)، يصلك الفني خلال 30 إلى 45 دقيقة من اتصالك.",
        en: "Thanks to our mobile service vans deployed across all Kuwait governorates (Hawally, Salmiya, Farwaniya, Jahra, Mubarak Al-Kabeer, and Capital), our technician reaches your doorstep in 30 to 45 minutes.",
      },
    },
    {
      q: { ar: "هل يتم تصليح الغسالة في المنزل أم يتطلب نقلها للورشة؟", en: "Is the washing machine repaired at home or taken to a workshop?" },
      a: {
        ar: "أكثر من 95% من الأعطال (تبديل الطلمبة، السير، المساعدين، كروت التشغيل، ربلة الباب) يتم إصلاحها فورياً داخل منزلك أمام عينيك دون الحاجة لنقل الغسالة نهائياً.",
        en: "Over 95% of washer repairs (drain pump, drive belt, shock absorbers, PCB board, door gasket) are completed right inside your home on the same visit without moving the appliance.",
      },
    },
    {
      q: { ar: "هل تقدمون كفالة وضمان كتابي على التصليح والقطع؟", en: "Do you provide a written warranty on parts and labor?" },
      a: {
        ar: "نعم، نقدم كفالة رسمية معتمدة من 6 أشهر إلى سنة كاملة على كافة قطع الغيار الأصلية المستبدلة وأعمال الصيانة المنفذة.",
        en: "Yes, every service comes with an official written invoice and warranty covering parts and labor from 6 to 12 months.",
      },
    },
    {
      q: { ar: "ما هي تكلفة الفحص وتحديد العطل؟", en: "What are your inspection and diagnostic charges?" },
      a: {
        ar: "نقدم فحصاً إلكترونياً شاملاً بأسعار رمزية ومنافسة، وفي حال إتمام الصيانة معنا يتم خصم رسوم الفحص بالكامل وتدفع فقط قيمة الإصلاح المتفق عليها.",
        en: "We offer complete computerized diagnosis at very competitive rates. When you proceed with the repair, the inspection fee is fully waived.",
      },
    },
    {
      q: { ar: "هل تحمل سيارات الصيانة قطع غيار أصلية جاهزة؟", en: "Do your service vans carry genuine spare parts in stock?" },
      a: {
        ar: "نعم، جميع سيارات كويت فيكس عبارة عن ورش متنقلة مجهزة بمضخات تصريف، سيور، كروت تشغيل، رولمان بلي، ومساعدين لجميع ماركات الغسالات الشائعة في الكويت.",
        en: "Yes, all Kuwait Fix service vehicles are mobile workshops stocked with OEM pumps, belts, circuit boards, bearings, and shock absorbers for all major washer brands in Kuwait.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 overflow-x-hidden">
      {/* Sticky Auto-Hiding Navbar with Language Switcher */}
      <Navbar />

      {/* ==========================================================
          SECTION 1: HERO - HIGH-CONVERTING WASHING MACHINE SECTION
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
                    {isAr ? "وصول خلال 45 دقيقة بجميع مناطق الكويت" : "45-Min Doorstep Arrival in Kuwait"}
                  </span>
                </div>

                {/* Hero Image Container */}
                <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-slate-900">
                  {!heroImgError ? (
                    <Image
                      src="/images/services/washing-machine.jpg"
                      alt="فني تصليح غسالات أوتوماتيك معتمد في الكويت - كويت فيكس"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 620px"
                      className="object-cover object-center transform hover:scale-104 transition-transform duration-700 ease-out"
                      onError={() => setHeroImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-blue-50 to-slate-100 text-slate-700">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center justify-center mb-3">
                        <Wrench className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">
                        {isAr ? "ورشة تصليح غسالات متنقلة" : "Mobile Washer Repair Workshop"}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs font-semibold">
                        {isAr ? "خدمة منزلية سريعة لجميع ماركات الغسالات بالكويت" : "Fast on-site repair for all washer brands in Kuwait"}
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
                        {isAr ? "كفالة كتابية معتمدة" : "Official Written Warranty"}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-500">
                        {isAr ? "قطع غيار أصلية 100%" : "100% Genuine Spare Parts"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Content Side with Animated Text and Conversion CTAs */}
            <div className="lg:col-span-6 space-y-7 order-1 lg:order-2 text-right">
              
              {/* Category Breadcrumb Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 px-4 py-1.5 rounded-full shadow-2xs">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold text-blue-900">
                  {isAr ? "المركز المعتمد لصيانة الغسالات في الكويت" : "Kuwait's Premier Certified Washer Repair Center"}
                </span>
              </div>

              {/* Main Headline with Blue Keyword Accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.2] tracking-tight">
                {isAr ? (
                  <>
                    تصليح وصيانة{" "}
                    <span className="relative inline-block px-3 py-1 my-1 rounded-2xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                      الغسالات الأوتوماتيك
                    </span>{" "}
                    في الكويت
                  </>
                ) : (
                  <>
                    Automatic{" "}
                    <span className="relative inline-block px-3 py-1 my-1 rounded-2xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                      Washing Machine
                    </span>{" "}
                    Repair in Kuwait
                  </>
                )}
              </h1>

              {/* Lead Paragraph */}
              <div className="pr-4 border-r-4 border-blue-600">
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                  {isAr
                    ? "خدمة صيانة منزلية فورية لجميع أنواع الغسالات الأوتوماتيك والعادية بجميع مناطق الكويت. فحص كمبيوتر دقيق، تبديل قطع الغيار التالفة بقطع أصلية مكفولة، وإصلاح العطل بنفس اليوم دون نقل الغسالة."
                    : "Immediate on-site repair for front-load, top-load, and combo washing machines across all Kuwait governorates. Precision computer scanning, OEM spare parts with warranty, repaired right in your home."}
                </p>
              </div>

              {/* Trust Metric Bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "فنيون محترفون خبرة 20 عاماً" : "20+ Years Certified Technicians"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "كفالة 6 إلى 12 شهراً" : "6 to 12 Months Warranty"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "صيانة فورية بنفس الزيارة" : "Same-Day Doorstep Fix"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "أسعار واضحة بدون مفاجآت" : "Fixed Transparent Pricing"}
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
                  <span>{isAr ? "احجز فني غسالات الآن" : "Book Washer Technician"}</span>
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
          SECTION 2: 6 TECHNICAL SERVICES WITH DEDICATED IMAGES
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "خدمات الصيانة التخصصية" : "Specialized Technical Solutions"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-3">
              {isAr ? "خدمات تصليح أجزاء الغسالة مع الصور التوضيحية" : "Washer Component Repairs & Visual Diagnostics"}
            </h2>
            <p className="text-base text-slate-600 mt-2 font-medium">
              {isAr
                ? "نوفر قطع غيار أصلية ومعدات فحص متخصصة لكل قطعة في الغسالة مع كفالة خطية معتمدة."
                : "Dedicated OEM components and specialized diagnostic testing for every mechanical and electronic part."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {washerServicesWithImages.map((service, index) => (
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
          SECTION 3: ERROR CODES INTERACTIVE TERMINAL
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "دليل فحص الأخطاء" : "Error Codes Diagnostic Tool"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2.5">
              {isAr ? "جدول رموز أعطال الغسالات حسب الماركة" : "Washing Machine Error Codes by Brand"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              {isAr
                ? "اختر ماركة غسالتك لعرض كود العطل وسببه وطريقة حله الفورية من قبل فنيينا:"
                : "Select your washer brand to view the error code, cause, and on-site fix:"}
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {(["lg", "samsung", "daewoo", "bosch"] as const).map((b) => (
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

          {/* Codes Table with Smooth Transitions */}
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
                    <td className="p-4 font-mono font-black text-rose-600 text-sm sm:text-base">{row.code}</td>
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
              <span>{isAr ? "ظهر لك رمز عطل آخر؟ اتصل بالفني للمساعدة الفورية" : "Got another error code? Call our technician for instant phone advice"}</span>
            </a>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECTION 4: 4-STAGE REPAIR WORKFLOW
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAFCFF] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "دقة وسرعة وراحة بال" : "Streamlined Doorstep Workflow"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5">
              {isAr ? "خطوات صيانة الغسالة بمنزلك" : "Our 4-Step Home Repair Process"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            {[
              {
                step: "01",
                title: { ar: "طلب فوري وتحديد الموعد", en: "1-Click Request & Dispatch" },
                desc: { ar: "اتصل بنا أو املأ النموذج وسيتم توجيه أقرب ورشة متنقلة لعنوانك.", en: "Call or book online. Our nearest mobile van is dispatched immediately." },
              },
              {
                step: "02",
                title: { ar: "فحص إلكتروني بالمنزل", en: "Computerized Diagnosis" },
                desc: { ar: "يقوم الفني بفحص الدوائر الكهربائية ومضخات وسير الغسالة وتحديد العطل.", en: "Technician arrives in 45 mins to diagnose electronics, pumps, and drum." },
              },
              {
                step: "03",
                title: { ar: "تبديل القطع التالفة فورياً", en: "Genuine Parts Replacement" },
                desc: { ar: "تركيب قطع غيار أصلية مكفولة مباشرة من سيارة الصيانة دون نقل الغسالة.", en: "OEM parts installed on the spot from our fully-stocked mobile workshop." },
              },
              {
                step: "04",
                title: { ar: "تشغيل تجريبي والكفالة", en: "Testing & Written Warranty" },
                desc: { ar: "تجربة دورة الغسيل والعصر الكاملة وتسليم سند الكفالة الرسمي المعتمد.", en: "Full test cycle executed, followed by official documented warranty invoice." },
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
          SECTION 5: BRANDS SUPPORTED IN KUWAIT
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
            {isAr ? "قطع أصلية 100%" : "100% Genuine OEM Parts"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5 mb-3">
            {isAr ? "الماركات العالمية التي نقوم بصيانتها" : "Major Washer Brands We Service in Kuwait"}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-10 font-medium">
            {isAr
              ? "نوفر قطع غيار وكالة مستوردة معتمدة لجميع الموديلات الأمريكية، الكورية، والأوروبية."
              : "We stock authentic imported factory parts for American, Korean, Japanese, and European washers."}
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
          SECTION 6: FORMSPREE BOOKING FORM
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80" id="booking">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 text-right">
            
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
              <div>
                <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase">
                  {isAr ? "حجز فوري للغسالات" : "Instant Washer Booking"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {isAr ? "احجز فني صيانة غسالات الآن" : "Book Your Washer Technician Now"}
                </h2>
              </div>
              <Wrench className="w-8 h-8 text-blue-600 hidden sm:block" />
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isAr ? "تم إرسال طلب صيانة الغسالة بنجاح!" : "Washer Service Request Received!"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isAr
                    ? `شكراً لك. سيتصل بك الفني المتخصص خلال 10 دقائق لتأكيد وصول ورشة الصيانة المتنقلة إلى منزلك.`
                    : `Thank you. Our dispatch technician will call you in 10 minutes to confirm doorstep arrival.`}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs cursor-pointer"
                >
                  {isAr ? "حجز موعد آخر" : "Book Another Machine"}
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
                      {isAr ? "ماركة الغسالة *" : "Washer Brand *"}
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                    >
                      <option value="LG">LG</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Daewoo">Daewoo</option>
                      <option value="Bosch">Bosch</option>
                      <option value="Whirlpool">Whirlpool</option>
                      <option value="Panasonic">Panasonic</option>
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
                    {isAr ? "وصف العطل في الغسالة *" : "Fault Description *"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      isAr
                        ? "مثال: الغسالة لا تصرف الماء، أو الحلة تصدر صوتاً مزعجاً أثناء العصر، أو يظهر رمز OE..."
                        : "e.g. Water won't drain, loud noise during spin cycle, or OE code displayed..."
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
                      <span>{isAr ? "إرسال طلب صيانة الغسالة فورياً" : "Submit Washer Repair Request"}</span>
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
          SECTION 7: FAQ ACCORDION
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5">
              {isAr ? "كل ما تريد معرفته عن صيانة الغسالات" : "Washing Machine Repair FAQs"}
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
   SUB-COMPONENT: DEDICATED SERVICE CARD WITH IMAGE
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
                <Wrench className="w-6 h-6 text-blue-600" />
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