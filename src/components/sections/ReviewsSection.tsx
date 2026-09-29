"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Star, 
  ThumbsUp, 
  CheckCircle2, 
  MapPin, 
  PenLine, 
  X, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { initialReviewsData, ReviewItem } from "@/data/reviewsData";

export default function ReviewsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviewsData);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form states
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formArea, setFormArea] = useState(isAr ? "حولي" : "Hawally");
  const [formCategory, setFormCategory] = useState<"washing-machine" | "ac" | "fridge">("washing-machine");
  const [formComment, setFormComment] = useState("");

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === "all") return true;
    return r.serviceCategory === selectedFilter;
  });

  // Handle like button
  const handleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isLiked = likedReviews[id];
          return {
            ...r,
            helpfulCount: isLiked ? r.helpfulCount - 1 : r.helpfulCount + 1,
          };
        }
        return r;
      })
    );
  };

  // Submit new review (Google Maps simulator)
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: { ar: formName, en: formName },
      avatarColor: "bg-blue-600",
      isLocalGuide: false,
      rating: formRating,
      date: { ar: "الآن", en: "Just now" },
      area: { ar: formArea, en: formArea },
      serviceCategory: formCategory,
      serviceTag: {
        ar: formCategory === "washing-machine" ? "تصليح غسالات" : formCategory === "ac" ? "تصليح مكيفات" : "تصليح ثلاجات",
        en: formCategory === "washing-machine" ? "Washer Repair" : formCategory === "ac" ? "AC Repair" : "Fridge Repair",
      },
      comment: { ar: formComment, en: formComment },
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    setFormName("");
    setFormComment("");
    setFormRating(5);
  };

  // Ratings breakdown percentages
  const ratingBars = [
    { stars: 5, pct: "92%" },
    { stars: 4, pct: "6%" },
    { stars: 3, pct: "2%" },
    { stars: 2, pct: "0%" },
    { stars: 1, pct: "0%" },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-28 bg-[#FAFCFF] border-b border-slate-200/80 relative overflow-hidden overflow-x-clip">
      
      {/* Ambient Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==========================================================
            Section Header
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 gpu-layer"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 px-4 py-1.5 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-wide">
              {isAr ? "تقييمات موثقة من عملاء الكويت" : "Verified Customer Reviews in Kuwait"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {isAr ? "آراء وتقييمات عملائنا على خرائط Google" : "Customer Reviews on Google Maps"}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isAr
              ? "نفخر بثقة أكثر من 1,500 عميل في كافة مناطق ومحافظات الكويت. شفافية مطلقة، أسعار واضحة، وكفالة معتمدة."
              : "Trusted by over 1,500 satisfied homeowners across Kuwait. Absolute transparency, genuine warranties, and same-day home service."}
          </p>
        </motion.div>

        {/* ==========================================================
            Google Maps Overall Score & Breakdown Card
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 lg:p-10 mb-12 gpu-layer"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col (Score & Stars) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-right border-b lg:border-b-0 lg:border-l border-slate-100 pb-6 lg:pb-0 lg:pl-8">
              
              {/* Google Brand Logo Header */}
              <div className="flex items-center gap-2 mb-3">
                <GoogleLogoSvg />
                <span className="text-sm font-black text-slate-700 tracking-tight">
                  Google Reviews
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-slate-900 leading-none">
                  4.9
                </span>
                <span className="text-lg font-bold text-slate-400">/ 5.0</span>
              </div>

              {/* 5 Big Gold Stars */}
              <div className="flex items-center gap-1 text-[#FBBC04] mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <span className="text-xs sm:text-sm font-bold text-slate-500 mb-5">
                {isAr ? "بناءً على 184 تقييم حقيقي وموثق" : "Based on 184 verified reviews"}
              </span>

              {/* Write a Review Button */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <PenLine className="w-4 h-4" />
                <span>{isAr ? "اكتب مراجعة وتقييم" : "Write a review"}</span>
              </motion.button>
            </div>

            {/* Middle Col (Progress Bars) */}
            <div className="lg:col-span-5 space-y-2.5">
              {ratingBars.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-600">
                  <span className="w-4 flex items-center justify-center">{bar.stars}</span>
                  <Star className="w-3.5 h-3.5 text-[#FBBC04] fill-current flex-shrink-0" />
                  
                  {/* Progress Bar Container */}
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{ 
                        width: bar.pct,
                        transformOrigin: isAr ? "right" : "left"
                      }}
                      className="h-full bg-[#FBBC04] rounded-full"
                    />
                  </div>

                  <span className="w-9 text-slate-400 text-right">{bar.pct}</span>
                </div>
              ))}
            </div>

            {/* Right Col (Google Guarantee Badge) */}
            <div className="lg:col-span-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1">
                {isAr ? "كفالة خدمة معتمدة" : "Verified Guarantee"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {isAr
                  ? "جميع التقييمات صادرة من عملاء حقيقيين في دولة الكويت بعد إتمام الصيانة."
                  : "All ratings are from real verified homeowners in Kuwait after service completion."}
              </p>
            </div>

          </div>
        </motion.div>

        {/* ==========================================================
            Filter Chips
           ========================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: "all", label: isAr ? "جميع التقييمات (184)" : "All Reviews (184)" },
            { id: "ac", label: isAr ? "تصليح المكيفات" : "AC Repair" },
            { id: "washing-machine", label: isAr ? "تصليح الغسالات" : "Washing Machine" },
            { id: "fridge", label: isAr ? "تصليح الثلاجات" : "Refrigerator" },
          ].map((chip) => {
            const active = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* ==========================================================
            Reviews Grid (Google Maps Style Cards)
           ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev, index) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-md p-6 flex flex-col justify-between transition-shadow duration-300 gpu-layer"
              >
                <div>
                  {/* Top Customer Info */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle with Initial */}
                      <div className={`w-11 h-11 rounded-full ${rev.avatarColor} text-white font-black text-base flex items-center justify-center shadow-xs flex-shrink-0`}>
                        {isAr ? rev.name.ar.charAt(0) : rev.name.en.charAt(0)}
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-snug">
                          {isAr ? rev.name.ar : rev.name.en}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mt-0.5">
                          {rev.isLocalGuide ? (
                            <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">
                              {isAr ? `مرشد محلي • ${rev.reviewsCount} تقييم` : `Local Guide • ${rev.reviewsCount} reviews`}
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80">
                              {isAr ? "عميل موثق" : "Verified Customer"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Google Small Icon */}
                    <div className="opacity-70">
                      <GoogleLogoSvg size={18} />
                    </div>
                  </div>

                  {/* Star Rating & Date */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="flex items-center gap-0.5 text-[#FBBC04]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-400 text-xs font-semibold">
                      • {isAr ? rev.date.ar : rev.date.en}
                    </span>
                  </div>

                  {/* Service & Area Tag */}
                  <div className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md mb-3 border border-blue-100">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? `${rev.serviceTag.ar} (${rev.area.ar})` : `${rev.serviceTag.en} (${rev.area.en})`}</span>
                  </div>

                  {/* Customer Review Text */}
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    "{isAr ? rev.comment.ar : rev.comment.en}"
                  </p>
                </div>

                {/* Helpful / Thumbs Up Button Footer */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>{isAr ? "هل كان هذا التقييم مفيداً؟" : "Was this review helpful?"}</span>

                  <motion.button
                    onClick={() => handleLike(rev.id)}
                    whileTap={{ scale: 0.85 }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      likedReviews[rev.id]
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[rev.id] ? "fill-current" : ""}`} />
                    <span>{rev.helpfulCount}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* ==========================================================
          Interactive "Write a Review" Modal (Google Maps Style)
         ========================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-right overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <GoogleLogoSvg size={22} />
                <h3 className="text-xl font-black text-slate-900">
                  {isAr ? "كتابة مراجعة وتقييم" : "Write a Review"}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">
                {isAr
                  ? "شارك تجربتك مع فنيي كويت فيكس لمساعدة الآخرين في الكويت."
                  : "Share your honest experience with Kuwait Fix to help homeowners."}
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Interactive Star Picker */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {isAr ? "التقييم العام" : "Overall Rating"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-120"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || formRating)
                              ? "text-[#FBBC04] fill-current"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 mr-2">
                      ({formRating} / 5)
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    {isAr ? "الاسم الكريم" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={isAr ? "مثال: فهد الشمري" : "e.g. Fahad Al-Shammari"}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                {/* Area and Category Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      {isAr ? "المنطقة (الكويت)" : "Area in Kuwait"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formArea}
                      onChange={(e) => setFormArea(e.target.value)}
                      placeholder={isAr ? "حولي، السالمية..." : "Hawally, Salmiya..."}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      {isAr ? "نوع الخدمة" : "Service Type"}
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option value="washing-machine">{isAr ? "تصليح غسالة" : "Washing Machine"}</option>
                      <option value="ac">{isAr ? "تصليح مكيف" : "AC Repair"}</option>
                      <option value="fridge">{isAr ? "تصليح ثلاجة" : "Refrigerator"}</option>
                    </select>
                  </div>
                </div>

                {/* Review Description */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    {isAr ? "رأيك في جودة الصيانة وسرعة الفني" : "Your Review"}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder={
                      isAr
                        ? "اكتب تفاصيل تجربتك، سرعة وصول الفني، والكفالة المقدمة..."
                        : "Describe the technician's arrival time, parts quality, and warranty..."
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    {isAr ? "نشر التقييم فورياً" : "Post Review Now"}
                  </button>
                </div>

              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Small Google Multi-Colored Logo SVG Icon
function GoogleLogoSvg({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.18 3.645-9.15z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.18 0 10.03 0 12s.46 3.82 1.26 5.42l4.06-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.06 3.15c.94-2.83 3.58-4.98 6.68-4.98z"
      />
    </svg>
  );
}