"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  Loader2,
  Calendar,
  AlertCircle
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactSection() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  // Kuwait Areas List (Bilingual)
  const kuwaitAreas = [
    { ar: "حولي", en: "Hawally" },
    { ar: "السالمية", en: "Salmiya" },
    { ar: "الجابرية", en: "Jabriya" },
    { ar: "مشرف", en: "Mishref" },
    { ar: "بيان", en: "Bayan" },
    { ar: "القادسية", en: "Al-Qadisiya" },
    { ar: "الروضة", en: "Al-Rawda" },
    { ar: "الفروانية", en: "Farwaniya" },
    { ar: "مبارك الكبير", en: "Mubarak Al-Kabeer" },
    { ar: "صباح السالم", en: "Sabah Al-Salem" },
    { ar: "الجهراء", en: "Al-Jahra" },
    { ar: "مدينة الكويت", en: "Kuwait City" },
  ];

  // Service Options (Bilingual)
  const serviceOptions = [
    { id: "washing-machine", ar: "تصليح غسالة أوتوماتيك", en: "Automatic Washing Machine" },
    { id: "ac-split", ar: "تصليح وصيانة مكيف سبليت", en: "Split AC Repair & Servicing" },
    { id: "ac-central", ar: "صيانة تكييف مركزي للقسائم", en: "Central AC System Service" },
    { id: "fridge", ar: "تصليح ثلاجة وفريزر", en: "Refrigerator & Freezer Repair" },
    { id: "compressor", ar: "تبديل كمبروسر وشحن فريون", en: "Compressor Replacement & Gas" },
  ];

  // Visit Timing Options (Bilingual)
  const urgencyOptions = [
    { id: "urgent", ar: "طوارئ فوري (خلال 45 دقيقة)", en: "Urgent (Within 45 Mins)" },
    { id: "morning", ar: "الفترة الصباحية (9ص - 1م)", en: "Morning (9 AM - 1 PM)" },
    { id: "evening", ar: "الفترة المسائية (4م - 10م)", en: "Evening (4 PM - 10 PM)" },
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: isAr ? "تصليح غسالة أوتوماتيك" : "Automatic Washing Machine",
    area: isAr ? "السالمية" : "Salmiya",
    urgency: isAr ? "طوارئ فوري (خلال 45 دقيقة)" : "Urgent (Within 45 Mins)",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle Form Submit (Calls API & prepares mailto fallback)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }
    } catch (err) {
      console.warn("Direct API call error, falling back to instant client mail link:", err);
      // Fallback: Opens user's default email client addressed to client email
      const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `طلب صيانة من ${formData.name} - ${formData.service}`
      )}&body=${encodeURIComponent(
        `الاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالبريد: ${formData.email}\nالخدمة: ${formData.service}\nالمنطقة: ${formData.area}\nالموعد: ${formData.urgency}\nالملاحظات: ${formData.notes}`
      )}`;
      window.open(mailtoUrl, "_blank");
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-[#FAFCFF] border-b border-slate-200/80 relative overflow-hidden overflow-x-clip">
      
      {/* Background Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px"
        }}
      />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==========================================================
            Section Header
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-18 gpu-layer"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 px-4 py-1.5 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-wide">
              {isAr ? "خدمة عملاء وحجوزات فورية بالكويت" : "Instant Customer Support & Booking in Kuwait"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {isAr ? (
              <>
                تواصل معنا{" "}
                <span className="text-blue-600 inline-block relative">
                  واطلب فني صيانة الآن
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-600/30 rounded-full" />
                </span>
              </>
            ) : (
              <>
                Contact Us &{" "}
                <span className="text-blue-600 inline-block relative">
                  Book a Technician Now
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-600/30 rounded-full" />
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isAr
              ? "فريقنا الهندسي جاهز للوصول إلى باب منزلك في جميع مناطق الكويت خلال 45 دقيقة. فحص فوري وقطع أصلية مكفولة."
              : "Our certified technicians are ready to dispatch to your doorstep across all Kuwait areas within 45 minutes with genuine parts."}
          </p>
        </motion.div>

        {/* ==========================================================
            Main Grid: Client Info Card (Col 1) + Interactive Form (Col 2)
           ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ==========================================================
              Column 1: Complete Client Information Showcase
             ========================================================== */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6 text-right gpu-layer"
          >
            {/* Contact Channels Card */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                {isAr ? "معلومات التواصل المباشرة" : "Direct Contact Details"}
              </h3>

              {/* Channel 1: Phone */}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-100/70 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-108 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-500">
                    {isAr ? "الاتصال المباشر (طوارئ 24 ساعة):" : "Direct Call (24/7 Hotline):"}
                  </span>
                  <span dir="ltr" className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {siteConfig.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Channel 2: Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-108 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-slate-500">
                    {isAr ? "البريد الإلكتروني للعملاء:" : "Official Support Email:"}
                  </span>
                  <span dir="ltr" className="text-sm sm:text-base font-bold text-slate-800 truncate block">
                    {siteConfig.email}
                  </span>
                </div>
              </a>

              {/* Channel 3: WhatsApp */}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100/70 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-108 transition-transform">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-800">
                    {isAr ? "محادثة واتساب سريعة:" : "Quick WhatsApp Chat:"}
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {isAr ? "اضغط للدردشة المباشرة" : "Click to chat directly"}
                  </span>
                </div>
              </a>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-700">
                    {isAr ? "وصول خلال 45 دقيقة" : "45-Min Rapid Dispatch"}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-700">
                    {isAr ? "قطع أصلية مع كفالة" : "Original Parts Warranty"}
                  </span>
                </div>
              </div>
            </div>

            {/* Kuwait Coverage Areas Card */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h4 className="text-base font-black text-slate-900">
                  {isAr ? "تغطية كافة مناطق ومحافظات الكويت:" : "Coverage Across All Kuwait Areas:"}
                </h4>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">
                {isAr
                  ? "سيارات الورش المتنقلة تجوب كافة المناطق يومياً لضمان الوصول السريع:"
                  : "Fully equipped mobile workshops deployed daily across all governorates:"}
              </p>

              {/* Interactive Kuwait Area Pills */}
              <div className="flex flex-wrap gap-2">
                {kuwaitAreas.map((loc) => (
                  <button
                    key={loc.en}
                    type="button"
                    onClick={() => setFormData({ ...formData, area: isAr ? loc.ar : loc.en })}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      formData.area === (isAr ? loc.ar : loc.en)
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs scale-103"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400"
                    }`}
                  >
                    {isAr ? loc.ar : loc.en}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>

          {/* ==========================================================
              Column 2: Interactive Contact & Booking Form
             ========================================================== */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 lg:p-10 relative overflow-hidden gpu-layer"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isAr ? "احجز موعد صيانة منزلي" : "Book a Home Maintenance Visit"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  {isAr
                    ? "املأ النموذج وسنقوم بالاتصال بك خلال 10 دقائق لتأكيد الموعد وإرسال الفني."
                    : "Fill the form and our dispatch coordinator will call you in 10 minutes."}
                </p>
              </div>
              <div className="hidden sm:block">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse block" />
              </div>
            </div>

            {/* Success Notification Animation */}
            <AnimatePresence>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-18 h-18 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">
                    {isAr ? "تم إرسال طلبك بنجاح!" : "Booking Request Sent Successfully!"}
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? `شكراً لك ${formData.name}. تم إرسال تفاصيل الحجز إلى بريد الإدارة (acmaintenance96@gmail.com). سيتصل بك الفني خلال 10 دقائق.`
                      : `Thank you ${formData.name}. Your request has been emailed to management (acmaintenance96@gmail.com). We will call you within 10 minutes.`}
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      {isAr ? "إرسال طلب جديد" : "Send Another Request"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        {isAr ? "الاسم الكريم *" : "Your Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAr ? "مثال: فهد المطيري" : "e.g. Fahad Al-Mutairi"}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        {isAr ? "رقم الهاتف بالكويت *" : "Kuwait Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+965 5062 6275"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 transition-all text-right"
                      />
                    </div>
                  </div>

                  {/* Row 2: Customer Email */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "بريدك الإلكتروني (لإرسال تفاصيل الحجز) *" : "Your Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@gmail.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 transition-all text-right"
                    />
                  </div>

                  {/* Row 3: Service Type & Kuwait Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        {isAr ? "الجهاز المطلوب صيانته *" : "Appliance Type *"}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 transition-all cursor-pointer"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.id} value={isAr ? opt.ar : opt.en}>
                            {isAr ? opt.ar : opt.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        {isAr ? "المنطقة داخل الكويت *" : "Area in Kuwait *"}
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 transition-all cursor-pointer"
                      >
                        {kuwaitAreas.map((loc) => (
                          <option key={loc.en} value={isAr ? loc.ar : loc.en}>
                            {isAr ? loc.ar : loc.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Urgency / Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "موعد الزيارة المفضل *" : "Preferred Visit Time *"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {urgencyOptions.map((u) => {
                        const val = isAr ? u.ar : u.en;
                        const isSelected = formData.urgency === val;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, urgency: val })}
                            className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                              isSelected
                                ? "bg-blue-50 border-blue-600 text-blue-700 shadow-2xs font-black"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 5: Notes / Problem Description */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      {isAr ? "وصف العطل أو أي ملاحظات إضافية" : "Fault Description / Notes"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={
                        isAr
                          ? "مثال: الغسالة لا تصرف الماء وتصدر صوتاً عند العصر، أو المكيف يخرج هواء حار..."
                          : "e.g. Washer doesn't drain or AC is blowing warm air..."
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base py-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{isAr ? "جاري إرسال الحجز للإدارة..." : "Sending Booking Request..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{isAr ? "إرسال طلب الصيانة فورياً" : "Submit Service Request"}</span>
                          <Send className="w-4 h-4 rotate-180" />
                        </>
                      )}
                    </motion.button>
                  </div>

                </form>
              )}
            </AnimatePresence>

          </motion.div>

        </div>

      </div>
    </section>
  );
}