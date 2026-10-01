"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Sparkles,
  ChevronDown,
  Snowflake,
  Zap,
  Droplets,
  Volume2,
  Cpu,
  Flame,
  Send,
  Loader2,
  ThermometerSnowflake,
  Fan,
  Layers,
  AlertTriangle
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RefrigeratorRepairPage() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeBrandTab, setActiveBrandTab] = useState<"samsung" | "lg" | "daewoo" | "bosch">("samsung");
  const [heroImgError, setHeroImgError] = useState(false);

  // Formspree State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fridgeType: isAr ? "ثلاجة بابين منزلية" : "Double Door Refrigerator",
    brand: "Samsung",
    area: isAr ? "السالمية" : "Salmiya",
    fault: isAr ? "انقطاع التبريد في الثلاجة" : "Refrigerator stopped cooling",
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
          service: "Refrigerator & Freezer Repair Service",
          ...formData,
          _subject: `❄️ [طلب صيانة ثلاجة] ${formData.name} - ${formData.brand} (${formData.area})`,
        }),
      });
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        fridgeType: isAr ? "ثلاجة بابين منزلية" : "Double Door Refrigerator",
        brand: "Samsung",
        area: isAr ? "السالمية" : "Salmiya",
        fault: isAr ? "انقطاع التبريد في الثلاجة" : "Refrigerator stopped cooling",
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
  const fridgeTypes = [
    {
      id: "side-by-side",
      title: { ar: "ثلاجات سايد باي سايد", en: "Side-by-Side Refrigerators" },
      desc: {
        ar: "صيانة شاملة للثلاجات ذات البابين المتقابلين، فحص نظام صانع الثلج (Ice Maker)، وموزع المياه الرقمي، وضواغط الانفرتر المزدوجة.",
        en: "Complete diagnostic and servicing for dual-door side-by-side units, automatic ice maker modules, water dispensers, and dual inverter compressors.",
      },
      badge: { ar: "شائعة بالقسائم", en: "Popular in Villas" },
    },
    {
      id: "french-door",
      title: { ar: "ثلاجات فرينش دور (4 أبواب)", en: "French Door Multi-Zone" },
      desc: {
        ar: "صيانة الثلاجات الفاخرة متعددة الحجيرات، موازنة درجات حرارة الأدراج المستقلة، وحساسات الرطوبة الرقمية لمنع تلف الأطعمة.",
        en: "Advanced multi-zone refrigeration repair, custom temperature drawer calibration, humidity sensors, and multi-airflow dampers.",
      },
      badge: { ar: "موديلات فاخرة", en: "Luxury Models" },
    },
    {
      id: "top-mount",
      title: { ar: "ثلاجات البابين المنزلية", en: "Top/Bottom Freezer Mount" },
      desc: {
        ar: "صيانة الثلاجات المنزلية القياسية، معالجة عدم نزول البرودة للحوض السفلي، تبديل هيتر إذابة الثلج، والثرموستات الميكانيكي والرقمي.",
        en: "Standard household two-door fridge repairs, airflow channel unblocking, defrost bimetal replacement, and thermostat calibration.",
      },
      badge: { ar: "صيانة منزلية", en: "Home Repair" },
    },
    {
      id: "commercial-freezer",
      title: { ar: "فريزرات وثلاجات عرض تجارية", en: "Deep Freezers & Displays" },
      desc: {
        ar: "صيانة الفريزرات الصندوقية والرأسية، ثلاجات العرض للمطاعم والأسواق المركزية، وتعبئة الغاز بضغوط عالية مع كفالة شاملة.",
        en: "Upright and chest deep freezer repairs, supermarket and restaurant display chillers, high-pressure condensing units, and fast emergency response.",
      },
      badge: { ar: "مطاعم وشركات", en: "Commercial" },
    },
  ];

  // 6 Specialized Services with Dedicated Images
  const fridgeServicesWithImages = [
    {
      id: "gas-recharge",
      image: "/images/services/fridge-gas-recharge.webp",
      imageAlt: "كشف تسريب الفريون وشحن غاز الثلاجة في الكويت",
      number: "01",
      badge: { ar: "غاز نقي 100%", en: "Pure Refrigerant" },
      title: { ar: "كشف تسريب الفريون وشحن الغاز الأصلي", en: "Freon Leak Detection & Gas Recharge" },
      desc: {
        ar: "كشف دقيق لمواقع تسريب الغاز في المواسير الداخلية والخارجية بواسطة أجهزة المسح الإلكتروني، ولحام الثقوب، وتفريغ الرطوبة (Vacuum)، وشحن غاز R134a أو R600a الصديق للبيئة بالميزان الرقمي.",
        en: "Pinpoint electronic halogen leak detection along internal and external copper lines, silver-brazing micro-punctures, vacuum moisture purge, and digital-scale charging with genuine R134a or eco-friendly R600a refrigerant.",
      },
      points: {
        ar: [
          "شحن غاز أصلي معتمد مطابق لمعايير الشركة المصنعة",
          "استبدال فلتر دراير (Filter Drier) لمنع انسداد الكابلري",
          "فحص ضغوط الضاغط للتأكد من استقرار دورة التبريد",
          "كفالة كتابية موثقة ضد عودة تسريب الغاز",
        ],
        en: [
          "100% genuine factory-certified gas (R134a & Isobutane R600a)",
          "Copper filter drier replacement to prevent capillary tube choking",
          "High/low side pressure verification for optimal heat exchange",
          "Documented written warranty against recurring gas leaks",
        ],
      },
    },
    {
      id: "compressor-swap",
      image: "/images/services/fridge-compressor-swap.webp",
      imageAlt: "تبديل كمبروسر ثلاجة انفرتر مع الكفالة بالكويت",
      number: "02",
      badge: { ar: "ضواغط انفرتر أصلية", en: "Inverter Compressors" },
      title: { ar: "تبديل كمبروسر الثلاجة (انفرتر وعادي)", en: "Compressor Replacement & Vacuum Flush" },
      desc: {
        ar: "استبدال ضواغط الثلاجة المحترقة أو الضعيفة بضواغط انفرتر موفرة للطاقة أو ضواغط ترددية معتمدة تتحمل العمل الشاق في مطابخ الكويت مع تنظيف الدورة بالنيتروجين.",
        en: "Replacing dead, locked, or grounded refrigerator compressors with genuine inverter or reciprocating units designed for high-ambient Kuwait kitchens, complete with nitrogen flushing.",
      },
      points: {
        ar: [
          "توريد كمبروسرات معتمدة (Samsung, LG Linear, Embraco, Secop)",
          "غسيل شبكة التبريد بالنيتروجين لإزالة الزيت المحترق والرواسب",
          "تركيب ريليه تشغيل ومكثف إقلاع أصلي جديد",
          "كفالة رسمية موثقة لمدة عام كامل على الكمبروسر والتركيب",
        ],
        en: [
          "OEM compressors (Samsung Inverter, LG Linear, Embraco, Secop)",
          "Deep nitrogen flush to eradicate acidic sludge and carbonized oil",
          "Brand new PTC start relay, overload protector, and run capacitor",
          "Full 1-Year written warranty on compressor and labor",
        ],
      },
    },
    {
      id: "defrost-system",
      image: "/images/services/fridge-defrost-system.webp",
      imageAlt: "صيانة دورة إذابة الثلج وهيتر الديفروست في الكويت",
      number: "03",
      badge: { ar: "علاج تراكم الثلج", en: "No-Frost Repair" },
      title: { ar: "صيانة دورة إذابة الثلج (No-Frost)", en: "Defrost System & Heater Repair" },
      desc: {
        ar: "حل مشكلة تراكم كتل الجليد على كويل الفريزر مما يمنع انتقال البرودة للحوض السفلي وتوقف تبريد الأطعمة، وإصلاح هيتر الإذابة، وحساس الثرموديسك، وتايمر الديفروست.",
        en: "Solving excessive ice and frost build-up on the evaporator coil that chokes cold airflow to the fresh food compartment, replacing burnt defrost heaters, bimetal thermostats, and defrost timers.",
      },
      points: {
        ar: [
          "استبدال سخان إذابة الثلج الزجاجي أو الألومنيوم الأصلي (Heater)",
          "فحص وتغيير حساس إذابة الثلج (Bimetal Defrost Thermostat)",
          "تبديل الفيوز الحراري لحماية الثلاجة من ارتفاع الحرارة",
          "إعادة انسياب الهواء البارد للثلاجة بكفاءة 100%",
        ],
        en: [
          "OEM quartz glass or aluminum defrost heating element renewal",
          "Bimetal defrost thermal switch and thermistor replacement",
          "Thermal safety fuse replacement to protect against overheating",
          "Airflow channel de-icing and return damper restoration",
        ],
      },
    },
    {
      id: "fan-motor",
      image: "/images/services/fridge-fan-motor.webp",
      imageAlt: "تبديل مروحة توزيع تبريد الثلاجة في الكويت",
      number: "04",
      badge: { ar: "تدفق هواء مثالي", en: "Airflow Motor" },
      title: { ar: "تبديل مروحة التبريد ومروحة المكثف", en: "Evaporator & Condenser Fan Motor" },
      desc: {
        ar: "إصلاح توقف مروحة توزيع الهواء البارد داخل الفريزر أو صدور صوت صرير مزعج، وصيانة مروحة المكثف السفلية المسؤولة عن تبريد الكمبروسر ومنع فصله الحراري.",
        en: "Fixing locked or squeaking internal evaporator circulation fans causing poor cooling distribution, and replacing bottom condenser cooling fans preventing compressor thermal trips.",
      },
      points: {
        ar: [
          "تركيب محركات مراوح أصلية مطابقة لجهد وسرعة الدوران (RPM)",
          "معايرة ريش المروحة ومنع احتكاكها بالثلج أو الجدران",
          "تنظيف زعانف المكثف السفلي من الغبار والدهون",
          "التشغيل الهادئ التام بدون أي اهتزاز أو أصوات صرير",
        ],
        en: [
          "OEM DC & AC evaporator fan motor replacements (exact RPM match)",
          "Fan blade realignment to eliminate rattling against ice shrouds",
          "Bottom condenser coil fin descaling to maximize airflow",
          "Ultra-quiet, vibration-free operation guaranteed",
        ],
      },
    },
    {
      id: "inverter-board",
      image: "/images/services/fridge-inverter-board.webp",
      imageAlt: "تصليح كارت وبرمجة ثلاجة انفرتر في الكويت",
      number: "05",
      badge: { ar: "هندسة لوحات ذكية", en: "Smart PCB Diagnostics" },
      title: { ar: "صيانة كارت الانفرتر واللوحات الإلكترونية", en: "Inverter PCB Board & Sensor Diagnostics" },
      desc: {
        ar: "صيانة اللوحات الإلكترونية الرئيسية وموديولات الانفرتر للثلاجات الذكية، وإصلاح وميض شاشة العرض الرقمية، وأكواد الأعطال الإلكترونية الناتجة عن تذبذب التيار الكهربائي.",
        en: "Component-level micro-soldering and diagnostic testing for smart inverter refrigerator motherboards, resolving blinking digital displays, power surge burnt chips, and erratic sensor signals.",
      },
      points: {
        ar: [
          "فحص وتحديد الآيسيهات والريليهات ومكثفات الباور التالفة",
          "معايرة حساسات درجات الحرارة الرقمية (NTC Temperature Sensors)",
          "توفير كروت تشغيل أصلية مبرمجة وجاهزة لجميع الموديلات",
        ],
        en: [
          "Oscilloscope testing of IPM inverter driver microchips and power relays",
          "Precision calibration of internal fridge and freezer NTC sensors",
          "Factory pre-programmed OEM control boards in stock",
        ],
      },
    },
    {
      id: "door-seal",
      image: "/images/services/fridge-door-seal.webp",
      imageAlt: "استبدال ربلة باب الثلاجة المغناطيسية في الكويت",
      number: "06",
      badge: { ar: "إحكام الإغلاق 100%", en: "Airtight Seal" },
      title: { ar: "استبدال ربلة الباب المغناطيسية وضبط المفصلات", en: "Magnetic Door Gasket & Hinge Alignment" },
      desc: {
        ar: "معالجة تسريب البرودة وتكون قطرات الماء والتعرق داخل الثلاجة نتيجة تمزق أو جفاف الربلة المطاطية، وإصلاح هبوط أبواب الثلاجات الثقيلة وضبط المفصلات لضمان الإغلاق التام.",
        en: "Eliminating cold air loss, internal condensation, and frost build-up caused by cracked, stiff, or torn magnetic door gaskets, along with heavy-duty door hinge realignment.",
      },
      points: {
        ar: [
          "تركيب إطار مطاطي مغناطيسي أصلي مرن عالي الالتصاق",
          "ضبط زوايا ومفصلات الأبواب لمنع ميلان الباب أو انفتاحه",
          "توفير استهلاك الكهرباء بنسبة 25% ومنع إجهاد الكمبروسر",
        ],
        en: [
          "High-grade flexible magnetic silicone rubber door gaskets",
          "Precision multi-axis hinge leveling to prevent door sagging",
          "Up to 25% energy savings by preventing continuous cooling loss",
        ],
      },
    },
  ];

  // Error Codes Guide by Brand
  const errorCodesData = {
    samsung: [
      { code: "5E / 5C", cause: { ar: "عطل حساس دورة إذابة الثلج (Defrost Sensor)", en: "Defrost temperature sensor fault" }, fix: { ar: "استبدال حساس الديفروست وفحص أسلاك التوصيل", en: "Replace defrost sensor & test wire harness" } },
      { code: "22E", cause: { ar: "عطل في محرك مروحة الفريزر (Evaporator Fan)", en: "Evaporator fan motor error" }, fix: { ar: "تبديل مروحة الفريزر والتأكد من عدم احتكاكها بالثلج", en: "Replace fan motor & clear ice obstruction" } },
      { code: "25E", cause: { ar: "عطل في هيتر إذابة الثلج أو الفيوز الحراري", en: "Defrost heater or thermal fuse open" }, fix: { ar: "استبدال سخان الديفروست والفيوز الحراري", en: "Replace heating element & safety fuse" } },
      { code: "84E / 84C", cause: { ar: "قفل دوران كمبروسر الانفرتر (Compressor Locked)", en: "Inverter compressor locked rotor error" }, fix: { ar: "فحص موديول الانفرتر وتغيير الضاغط التالف", en: "Test IPM power module & replace compressor" } },
      { code: "40E", cause: { ar: "عطل مروحة حجيرة مكعبات الثلج (Ice Room Fan)", en: "Ice room blower fan motor failure" }, fix: { ar: "إذابة الثلج العالق وتبديل مروحة صانع الثلج", en: "De-ice duct & replace ice maker fan" } },
    ],
    lg: [
      { code: "ER FF", cause: { ar: "عطل مروحة الفريزر الداخلية (Freezer Fan)", en: "Freezer blower fan motor failure" }, fix: { ar: "تبديل محرك مروحة الفريزر وفحص كارت الباور", en: "Replace fan motor & test power PCB" } },
      { code: "ER dH", cause: { ar: "فشل نظام إذابة الثلج (Defrost Heater Issue)", en: "Defrost heater timeout / circuit open" }, fix: { ar: "استبدال هيتر التسخين وحساس الثرموديسك", en: "Replace glass heater & defrost bimetal" } },
      { code: "ER CF", cause: { ar: "عطل مروحة المكثف السفلية بجانب الكمبروسر", en: "Condenser fan motor error at bottom" }, fix: { ar: "تنظيف الأتربة وتبديل محرك مروحة المكثف", en: "Descale coils & install new condenser fan" } },
      { code: "ER FS", cause: { ar: "عطل حساس درجة حرارة الفريزر (Freezer Sensor)", en: "Freezer NTC temperature sensor fault" }, fix: { ar: "استبدال حساس الفريزر ومعايرة القراءة", en: "Replace NTC sensor & recalibrate ohms" } },
      { code: "ER rS", cause: { ar: "عطل حساس حرارة الثلاجة السفلية (Fridge Sensor)", en: "Refrigerator fresh food sensor fault" }, fix: { ar: "تغيير حساس التبريد وضبط بوابة الهواء", en: "Replace compartment sensor & test damper" } },
    ],
    daewoo: [
      { code: "F1", cause: { ar: "عطل حساس تبريد الفريزر", en: "Freezer sensor open or shorted" }, fix: { ar: "استبدال حساس الفريزر الأصلي", en: "Replace OEM freezer sensor" } },
      { code: "r1", cause: { ar: "عطل حساس حرارة الثلاجة السفلية", en: "Fridge compartment sensor error" }, fix: { ar: "تبديل حساس درجة الحرارة الداخلي", en: "Replace internal temperature sensor" } },
      { code: "d1", cause: { ar: "عطل حساس إذابة الثلج (Defrost Sensor)", en: "Defrost cycle sensor error" }, fix: { ar: "استبدال حساس الديفروست وفحص الهيتر", en: "Replace defrost sensor & test heater" } },
      { code: "d2", cause: { ar: "وضع الإذابة الإجبارية للثلج مفعل", en: "Forced defrost mode active" }, fix: { ar: "إعادة ضبط الكارت وإلغاء الوضع اليدوي", en: "Reset control board & exit test mode" } },
      { code: "dF", cause: { ar: "انقطاع أو تلف هيتر إذابة الثلج", en: "Defrost heater circuit disconnected" }, fix: { ar: "استبدال هيتر التسخين الأصلي", en: "Install new defrost heating element" } },
    ],
    bosch: [
      { code: "E01", cause: { ar: "عطل حساس درجة حرارة الغرفة الخارجي", en: "Ambient temperature sensor fault" }, fix: { ar: "استبدال حساس الحرارة الخارجي", en: "Replace ambient NTC sensor" } },
      { code: "E02", cause: { ar: "عطل حساس حجيرة التبريد العلوية", en: "Refrigerator compartment sensor fault" }, fix: { ar: "تغيير الحساس وفحص عزل الكابينة", en: "Replace compartment sensor & check seal" } },
      { code: "E03", cause: { ar: "عطل حساس حجيرة التجميد (الفريزر)", en: "Freezer compartment sensor fault" }, fix: { ar: "استبدال حساس التجميد وفحص البرودة", en: "Replace freezer sensor & test ohms" } },
      { code: "E10", cause: { ar: "خطأ في لوحة التحكم الإلكترونية الرئيسية", en: "Main power PCB board software glitch" }, fix: { ar: "إعادة برمجة الكارت أو استبداله", en: "Reprogram or replace main PCB board" } },
      { code: "E20", cause: { ar: "فقدان الاتصال بين شاشة العرض وكارت الباور", en: "Display to main PCB communication error" }, fix: { ar: "فحص كابل نقل البيانات وموصلات الباب", en: "Inspect door hinge wire harness & connectors" } },
    ],
  };

  const brandBadges = [
    { name: "Samsung", text: isAr ? "ثلاجات سامسونج ديجيتال انفرتر" : "Samsung Digital Inverter" },
    { name: "LG", text: isAr ? "ثلاجات إل جي سمارت انفرتر" : "LG Smart Inverter & DoorCooling" },
    { name: "Daewoo", text: isAr ? "ثلاجات دايو الكورية المعتمدة" : "Daewoo Korean No-Frost" },
    { name: "Bosch", text: isAr ? "ثلاجات بوش الألمانية الفاخرة" : "Bosch VitaFresh Series" },
    { name: "Whirlpool", text: isAr ? "ثلاجات وفريزرات ويرلبول الأمريكية" : "Whirlpool American Refrigeration" },
    { name: "Hitachi", text: isAr ? "ثلاجات هيتاشي اليابانية المتطورة" : "Hitachi Dual Fan Cooling" },
    { name: "Toshiba", text: isAr ? "ثلاجات توشيبا انفرتر عالية الكفاءة" : "Toshiba Pure BIO Inverter" },
    { name: "Panasonic", text: isAr ? "ثلاجات باناسونيك إيكونافي" : "Panasonic ECONAVI Refrigerators" },
  ];

  const faqs = [
    {
      q: { ar: "كم من الوقت يستغرق وصول فني الثلاجات لمنزلي لمنع تلف الأطعمة؟", en: "How quickly does a refrigerator emergency technician arrive to prevent food spoilage?" },
      a: {
        ar: "ندرك أن تعطل الثلاجة يمثل حالة طوارئ قصوى للحفاظ على اللحوم والمواد الغذائية من التلف. ورشنا المتنقلة موزعة في جميع محافظات الكويت (حولي، السالمية، الفروانية، القرين، مبارك الكبير، الجهراء، والعاصمة) لتصلك خلال 30 إلى 45 دقيقة فقط.",
        en: "Recognizing that refrigerator failure is a critical food safety emergency, our fully-stocked mobile repair vans are deployed across all Kuwait areas to reach your home in 30 to 45 minutes guaranteed.",
      },
    },
    {
      q: { ar: "هل يتم تصليح الثلاجة وتبديل القطع داخل المنزل دون نقلها؟", en: "Is the refrigerator repaired at home or taken away to a workshop?" },
      a: {
        ar: "أكثر من 98% من أعطال الثلاجات (شحن الغاز، كشف التسريب، تبديل الكمبروسر، تغيير هيتر الديفروست، صيانة المروحة، وكروت الانفرتر) تتم بالكامل داخل مطبخك أمام عينيك دون الحاجة لنقل الثلاجة نهائياً.",
        en: "Over 98% of repairs (gas recharge, leak detection, compressor replacement, defrost heater, fan motor, and inverter boards) are completed directly inside your kitchen on the same visit without moving the unit.",
      },
    },
    {
      q: { ar: "هل تقدمون كفالة وضمان كتابي على صيانة الثلاجة وقطع الغيار؟", en: "Do you provide a written warranty on refrigerator repairs and parts?" },
      a: {
        ar: "نعم، يحصل العميل على سند كفالة رسمي معتمد وموثق يمتد من 6 أشهر إلى سنة كاملة على كافة قطع الغيار الأصلية المستبدلة وأعمال الصيانة المنجزة.",
        en: "Yes, every customer receives an official written warranty invoice covering parts and labor from 6 months up to a full year.",
      },
    },
    {
      q: { ar: "لماذا يتوقف التبريد في الحوض السفلي بينما الفريزر يثلج بشكل طبيعي؟", en: "Why does the lower fridge stop cooling while the upper freezer still freezes?" },
      a: {
        ar: "هذا العطل يحدث بنسبة 90% نتيجة خلل في دورة إذابة الثلج (No-Frost Defrost System) وتراكم كتل الجليد على فتحات التهوية، أو تعطل مروحة توزيع الهواء البارد (Evaporator Fan). يقوم فنينا بفحص الهيتر والحساس وتبديل التالف فورياً بنفس اليوم.",
        en: "This classic issue happens 90% of the time due to a failed defrost system (burnt heater, bad bimetal, or sensor) causing ice to choke the airflow channel, or a locked circulation fan. Our technician diagnoses and swaps the failed part on-site in one hour.",
      },
    },
    {
      q: { ar: "ما نوع غاز التبريد المستخدم في شحن فريون الثلاجة؟", en: "What type of refrigerant gas do you use for refrigerator refills?" },
      a: {
        ar: "نستخدم حصرياً غاز التبريد الأصلي المعتمد المطابق لمواصفات الشركة المصنعة (R134a للثلاجات التقليدية، و R600a Isobutane النقي للثلاجات الانفرتر الحديثة) مع تفريغ الهواء بالفاكيوم لضمان أعلى درجات التبريد.",
        en: "We strictly utilize genuine, factory-specified refrigerants (high-purity R134a for conventional units and pure Isobutane R600a for modern inverter units), accompanied by deep vacuum moisture extraction.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 overflow-x-hidden">
      {/* Sticky Auto-Hiding Navbar with Language Switcher */}
      <Navbar />

      {/* ==========================================================
          SECTION 1: HERO - SPECIALIZED REFRIGERATOR REPAIR LANDING
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

                {/* Floating 45-Min Emergency Food-Safety Guarantee Seal */}
                <div className="absolute -top-4 left-6 z-30 bg-white/95 border border-slate-200 shadow-lg px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-800">
                    {isAr ? "طوارئ تبريد - وصول خلال 45 دقيقة لمنع تلف الأطعمة" : "Cooling Emergency • 45-Min Fast Dispatch"}
                  </span>
                </div>

                {/* Hero Image Container */}
                <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-slate-900">
                  {!heroImgError ? (
                    <Image
                      src="/images/services/refrigerator.jpg"
                      alt="فني تصليح وصيانة ثلاجات وفريزر في الكويت - كويت فيكس"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 620px"
                      className="object-cover object-center transform hover:scale-104 transition-transform duration-700 ease-out"
                      onError={() => setHeroImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-blue-50 to-slate-100 text-slate-700">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center justify-center mb-3">
                        <ThermometerSnowflake className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">
                        {isAr ? "ورشة صيانة ثلاجات متنقلة" : "Mobile Refrigerator Repair Van"}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs font-semibold">
                        {isAr ? "صيانة وتصليح جميع الثلاجات المنزلية والتجارية بالكويت" : "Complete fridge & freezer repair across all Kuwait areas"}
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
                        {isAr ? "كفالة سنة على كمبروسر الثلاجة" : "1-Year Compressor Warranty"}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-500">
                        {isAr ? "قطع غيار وكالة أصلية 100%" : "100% Genuine OEM Spare Parts"}
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
                  {isAr ? "المركز المعتمد لصيانة الثلاجات والفريزر في الكويت" : "Kuwait's Premier Certified Refrigerator Service Center"}
                </span>
              </div>

              {/* Main Headline with Blue Keyword Accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.2] tracking-tight">
                {isAr ? (
                  <>
                    تصليح وصيانة{" "}
                    <span className="relative inline-block px-3 py-1 my-1 rounded-2xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                      الثلاجات والفريزر
                    </span>{" "}
                    في الكويت
                  </>
                ) : (
                  <>
                    Certified{" "}
                    <span className="relative inline-block px-3 py-1 my-1 rounded-2xl bg-blue-50 border-2 border-blue-500/40 text-blue-600 shadow-2xs">
                      Refrigerator & Freezer
                    </span>{" "}
                    Repair in Kuwait
                  </>
                )}
              </h1>

              {/* Lead Paragraph */}
              <div className="pr-4 border-r-4 border-blue-600">
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                  {isAr
                    ? "خدمة طوارئ سريعة لحل انقطاع التبريد وتراكم الجليد داخل الثلاجات المنزلية والتجارية. فحص تسريب الفريون، شحن الغاز الأصلي، تبديل ضواغط الانفرتر، وصيانة دورة الديفروست بنفس اليوم داخل منزلك دون نقل الجهاز."
                    : "Rapid emergency home service to solve cooling loss and ice blockages in residential and commercial refrigerators. Freon leak detection, OEM inverter compressor replacement, and defrost system restoration right in your kitchen."}
                </p>
              </div>

              {/* Trust Metric Bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "فنيو ثلاجات خبرة 20 عاماً" : "20+ Years Refrigerator Techs"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {isAr ? "غاز أصلي R134a / R600a" : "Genuine R134a & R600a Gas"}
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
                  <span>{isAr ? "اطلب فني ثلاجات الآن" : "Call Refrigerator Technician"}</span>
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
          SECTION 2: TYPES OF REFRIGERATORS WE SERVICE
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "شامل لكافة الموديلات" : "All Fridge Types & Designs"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              {isAr ? "أنواع الثلاجات والفريزر التي نقوم بصيانتها" : "Refrigerator & Freezer Types We Service"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {isAr
                ? "خبرة ممتدة وقطع غيار أصلية متوافقة مع الثلاجات الذكية الحديثة، الفريزرات، ووحدات التبريد العادية والتجارية."
                : "Comprehensive diagnostic and repair capabilities for high-end smart inverter fridges, deep freezers, and commercial display chillers."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fridgeTypes.map((type, idx) => (
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
                    <ThermometerSnowflake className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
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
          SECTION 3: 6 TECHNICAL REFRIGERATOR SERVICES WITH IMAGES
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "حلول التبريد المتخصصة" : "Specialized Cooling Engineering"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-3">
              {isAr ? "خدمات تصليح أجزاء الثلاجة مع الصور التوضيحية" : "Refrigerator Component Repairs & Visual Diagnostics"}
            </h2>
            <p className="text-base text-slate-600 mt-2 font-medium">
              {isAr
                ? "نوفر قطع غيار ثلاجات أصلية، ضواغط انفرتر معتمدة، وغاز فريون نقي مطابق لمواصفات المصنع لضمان سلامة الأطعمة."
                : "Dedicated OEM components, certified inverter compressors, and high-purity refrigerant matching factory standards to safeguard your food."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fridgeServicesWithImages.map((service, index) => (
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
          SECTION 4: REFRIGERATOR ERROR CODES INTERACTIVE TERMINAL
         ========================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "دليل فحص الأخطاء الرقمية" : "Fridge Error Codes Quick Guide"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2.5">
              {isAr ? "جدول رموز أعطال الثلاجات حسب الماركة" : "Refrigerator Error Codes by Major Brand"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              {isAr
                ? "اختر ماركة ثلاجتك لعرض كود العطل وسببه الفني وطريقة حله الفورية من قبل فنيينا:"
                : "Select your refrigerator brand to view the error code, technical cause, and doorstep fix:"}
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {(["samsung", "lg", "daewoo", "bosch"] as const).map((b) => (
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
          SECTION 5: 4-STAGE REFRIGERATOR REPAIR WORKFLOW
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAFCFF] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "دقة وسرعة وراحة بال" : "Streamlined Doorstep Workflow"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5">
              {isAr ? "خطوات صيانة الثلاجة في منزلك" : "Our 4-Step Home Refrigerator Repair Process"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            {[
              {
                step: "01",
                title: { ar: "اتصال طوارئ وتوجيه الورشة", en: "1-Click Request & Dispatch" },
                desc: { ar: "اتصل بنا هاتفياً أو املأ النموذج وسيتم توجيه أقرب سيارة تبريد لعنوانك.", en: "Call or book online. Our nearest mobile refrigeration van is dispatched immediately." },
              },
              {
                step: "02",
                title: { ar: "فحص إلكتروني للدورة والحساسات", en: "Digital Diagnostic Scan" },
                desc: { ar: "فحص ضغط الغاز، حرارة الكويل، هيتر الديفروست، ومقاومة كارت الانفرتر.", en: "Technician tests freon PSI, coil defrost circuit, thermistors, and inverter board." },
              },
              {
                step: "03",
                title: { ar: "إصلاح فوري بقطع أصلية", en: "On-Site OEM Part Replacement" },
                desc: { ar: "لحام تسريب الغاز، شحن فريون أصلي أو تبديل الحساسات والكمبروسر دون نقل الثلاجة.", en: "Soldering leaks, charging pure gas, or swapping parts on-site in your kitchen." },
              },
              {
                step: "04",
                title: { ar: "قياس برودة الكابينة والكفالة", en: "Digital Cooling Test & Warranty" },
                desc: { ar: "قياس انخفاض درجات الحرارة بمقياس ليزري وتسليم سند الكفالة الرسمي المعتمد.", en: "Laser thermometer chamber test followed by official written warranty invoice." },
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
            {isAr ? "الماركات العالمية التي نقوم بصيانتها" : "Major Refrigerator Brands We Service in Kuwait"}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-10 font-medium">
            {isAr
              ? "نوفر قطع غيار أصلية مستوردة معتمدة لجميع موديلات الثلاجات والفريزر المنزلية والتجارية."
              : "We stock authentic imported factory parts for American, Korean, Japanese, and European refrigerator brands."}
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
          SECTION 7: FORMSPREE REFRIGERATOR BOOKING FORM
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80" id="booking">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 text-right">
            
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
              <div>
                <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase">
                  {isAr ? "حجز فوري للثلاجات" : "Instant Refrigerator Booking"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {isAr ? "احجز فني صيانة ثلاجات وفريزر الآن" : "Book Your Refrigerator Technician Now"}
                </h2>
              </div>
              <ThermometerSnowflake className="w-8 h-8 text-blue-600 hidden sm:block" />
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isAr ? "تم إرسال طلب صيانة الثلاجة بنجاح!" : "Refrigerator Service Request Received!"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isAr
                    ? `شكراً لك. سيتصل بك فني التبريد المتخصص خلال 10 دقائق لتأكيد وصول ورشة الصيانة المتنقلة إلى منزلك.`
                    : `Thank you. Our refrigeration dispatch technician will call you in 10 minutes to confirm doorstep arrival.`}
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
                      {isAr ? "ماركة الثلاجة *" : "Refrigerator Brand *"}
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Samsung">Samsung</option>
                      <option value="LG">LG</option>
                      <option value="Daewoo">Daewoo</option>
                      <option value="Bosch">Bosch</option>
                      <option value="Whirlpool">Whirlpool</option>
                      <option value="Hitachi">Hitachi</option>
                      <option value="Toshiba">Toshiba</option>
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
                    {isAr ? "وصف المشكلة في الثلاجة *" : "Refrigerator Fault Description *"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      isAr
                        ? "مثال: الثلاجة لا تبرد بينما الفريزر يعمل، أو الكمبروسر يصدر صوتاً ويفصل، أو تجمع ثلج في الفريزر..."
                        : "e.g. Fridge not cooling while freezer works, compressor clicking, or ice build-up in freezer..."
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
                      <span>{isAr ? "إرسال طلب صيانة الثلاجة فورياً" : "Submit Refrigerator Repair Request"}</span>
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
          SECTION 8: REFRIGERATOR FAQS ACCORDION
         ========================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5">
              {isAr ? "كل ما تريد معرفته عن صيانة الثلاجات والفريزر" : "Refrigerator & Freezer Repair FAQs"}
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
   SUB-COMPONENT: DEDICATED REFRIGERATOR SERVICE CARD WITH IMAGE
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
                <ThermometerSnowflake className="w-6 h-6 text-blue-600" />
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



