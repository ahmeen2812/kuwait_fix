"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Star, 
  ThumbsUp, 
  CheckCircle2, 
  MapPin, 
  PenLine, 
  X, 
  Sparkles,
  Send,
  Sparkle
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { initialReviewsData, ReviewItem } from "@/data/reviewsData";

export default function ReviewsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // Reviews List State
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviewsData);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Dynamic Rating Counts State (Realistic baseline: 184 reviews totaling 4.9)
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({
    5: 170,
    4: 11,
    3: 3,
    2: 0,
    1: 0,
  });

  // Form States
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formArea, setFormArea] = useState(isAr ? "حولي" : "Hawally");
  const [formCategory, setFormCategory] = useState<"washing-machine" | "ac" | "fridge">("ac");
  const [formComment, setFormComment] = useState("");

  // ==========================================================
  // DYNAMIC CALCULATIONS: Total, Percentages & Overall Average
  // ==========================================================
  const totalReviewsCount = useMemo(() => {
    return Object.values(ratingCounts).reduce((a, b) => a + b, 0);
  }, [ratingCounts]);

  const dynamicAverageScore = useMemo(() => {
    const totalScore = Object.entries(ratingCounts).reduce(
      (sum, [star, count]) => sum + Number(star) * count,
      0
    );
    const avg = totalScore / (totalReviewsCount || 1);
    return avg.toFixed(1);
  }, [ratingCounts, totalReviewsCount]);

  const ratingBars = useMemo(() => {
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = ratingCounts[stars] || 0;
      const pctNumber = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
      return {
        stars,
        count,
        pct: `${Math.round(pctNumber)}%`,
        pctValue: pctNumber,
      };
    });
  }, [ratingCounts, totalReviewsCount]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return reviews;
    return reviews.filter((r) => r.serviceCategory === selectedFilter);
  }, [reviews, selectedFilter]);

  // Handle helpful thumbs-up click with micro-vibration
  const handleLike = (id: string) => {
    const isCurrentlyLiked = likedReviews[id];
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !isCurrentlyLiked,
    }));

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            helpfulCount: isCurrentlyLiked ? r.helpfulCount - 1 : r.helpfulCount + 1,
          };
        }
        return r;
      })
    );
  };

  // Submit new review: Dynamically recalculates scores & progress bars!
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    // 1. Update Rating Counts dynamically
    setRatingCounts((prev) => ({
      ...prev,
      [formRating]: (prev[formRating] || 0) + 1,
    }));

    // 2. Determine Service Tag based on category
    const serviceTagAr =
      formCategory === "washing-machine"
        ? "تصليح غسالة أوتوماتيك"
        : formCategory === "ac"
        ? "تصليح وصيانة مكيف"
        : "تصليح ثلاجة وفريزر";

    const serviceTagEn =
      formCategory === "washing-machine"
        ? "Washer Machine Repair"
        : formCategory === "ac"
        ? "AC Repair & Servicing"
        : "Refrigerator & Freezer Repair";

    // 3. Create New Review Item
    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: { ar: formName, en: formName },
      avatarColor: "bg-blue-600",
      isLocalGuide: false,
      rating: formRating,
      date: { ar: "الآن", en: "Just now" },
      area: { ar: formArea, en: formArea },
      serviceCategory: formCategory,
      serviceTag: { ar: serviceTagAr, en: serviceTagEn },
      comment: { ar: formComment, en: formComment },
      helpfulCount: 0,
      isNew: true, // Triggers arrival spotlight animation
    };

    // Prepend to top of list
    setReviews([newReview, ...reviews]);
    setSubmissionSuccess(true);

    setTimeout(() => {
      setSubmissionSuccess(false);
      setIsModalOpen(false);
      setFormName("");
      setFormComment("");
      setFormRating(5);
    }, 1200);
  };

  // Animation Variants
  const cardEntranceVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: (custom % 3) * 0.08,
      },
    }),
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-28 bg-[#FAFCFF] border-b border-slate-200/80 relative overflow-hidden overflow-x-clip">
      
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px"
        }}
      />
      <div className="absolute top-1/4 -right-36 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-36 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

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
            Google Maps Overall Score Card with DYNAMIC Recalculation
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 lg:p-10 mb-12 gpu-layer"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score & Counter */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-right border-b lg:border-b-0 lg:border-l border-slate-100 pb-6 lg:pb-0 lg:pl-8">
              <div className="flex items-center gap-2 mb-3">
                <GoogleLogoSvg size={24} />
                <span className="text-sm font-black text-slate-700 tracking-tight">
                  Google Reviews
                </span>
              </div>

              {/* Dynamic Average Rating */}
              <div className="flex items-baseline gap-3 mb-2">
                <motion.span 
                  key={dynamicAverageScore}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-5xl sm:text-6xl font-black text-slate-900 leading-none"
                >
                  {dynamicAverageScore}
                </motion.span>
                <span className="text-lg font-bold text-slate-400">/ 5.0</span>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex items-center gap-1 text-[#FBBC04] mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Dynamic Total Reviews Count */}
              <motion.span 
                key={totalReviewsCount}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs sm:text-sm font-bold text-slate-500 mb-5"
              >
                {isAr
                  ? `بناءً على ${totalReviewsCount} تقييم حقيقي وموثق`
                  : `Based on ${totalReviewsCount} verified reviews`}
              </motion.span>

              {/* Write a Review Button */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <PenLine className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>{isAr ? "اكتب مراجعة وتقييم" : "Write a review"}</span>
              </motion.button>
            </div>

            {/* DYNAMIC Animated Progress Bars */}
            <div className="lg:col-span-5 space-y-3">
              {ratingBars.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-600">
                  <span className="w-4 flex items-center justify-center">{bar.stars}</span>
                  <Star className="w-3.5 h-3.5 text-[#FBBC04] fill-current flex-shrink-0" />
                  
                  {/* Outer Bar Track */}
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: bar.pct }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                      style={{ 
                        transformOrigin: isAr ? "right" : "left"
                      }}
                      className="h-full bg-[#FBBC04] rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Percentage Counter */}
                  <motion.span 
                    key={bar.pct}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-10 text-slate-500 font-mono text-xs text-right"
                  >
                    {bar.pct}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Trust Seal */}
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
            Category Filter Chips
           ========================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: "all", label: isAr ? `جميع التقييمات (${totalReviewsCount})` : `All Reviews (${totalReviewsCount})` },
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
            Reviews Grid (Animated Boxes & Staged Text Reveal)
           ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev, index) => (
              <motion.div
                key={rev.id}
                layout
                custom={index}
                variants={cardEntranceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 gpu-layer ${
                  rev.isNew
                    ? "bg-blue-50/70 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-2 ring-blue-500/20"
                    : "bg-white border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-md"
                }`}
              >
                <div>
                  {/* Card Header (Customer Avatar, Name, Badge) */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${rev.avatarColor} text-white font-black text-base flex items-center justify-center shadow-xs flex-shrink-0`}>
                        {isAr ? rev.name.ar.charAt(0) : rev.name.en.charAt(0)}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-black text-slate-900 leading-snug">
                            {isAr ? rev.name.ar : rev.name.en}
                          </h4>
                          {rev.isNew && (
                            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkle className="w-2.5 h-2.5 fill-current" />
                              <span>{isAr ? "جديد" : "New"}</span>
                            </span>
                          )}
                        </div>

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

                    <div className="opacity-75">
                      <GoogleLogoSvg size={18} />
                    </div>
                  </div>

                  {/* Star Rating & Timestamp */}
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

                  {/* Animated Text Quote */}
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="text-slate-600 text-sm leading-relaxed font-medium"
                  >
                    "{isAr ? rev.comment.ar : rev.comment.en}"
                  </motion.p>
                </div>

                {/* Helpful Like Button */}
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
          ANIMATED "Write a Review" Modal (Google Maps Style)
         ========================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Dialog with Spring Physics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-right overflow-hidden border border-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-2">
                <GoogleLogoSvg size={24} />
                <h3 className="text-xl font-black text-slate-900">
                  {isAr ? "كتابة مراجعة وتقييم" : "Write a Review"}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">
                {isAr
                  ? "شارك تجربتك مع فنيي كويت فيكس لمساعدة الآخرين في الكويت."
                  : "Share your honest experience with Kuwait Fix to help homeowners."}
              </p>

              {/* Success Notification Alert */}
              <AnimatePresence>
                {submissionSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 text-center justify-center"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      {isAr
                        ? "تم نشر تقييمك بنجاح وتحديث إحصائيات Google!"
                        : "Your review was published and Google ratings updated!"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Body */}
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* 1. Interactive Star Rating Picker */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {isAr ? "التقييم العام" : "Overall Rating"}
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormRating(star)}
                        className="p-1 cursor-pointer transition-colors"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || formRating)
                              ? "text-[#FBBC04] fill-current drop-shadow-xs"
                              : "text-slate-300"
                          }`}
                        />
                      </motion.button>
                    ))}
                    <span className="text-xs font-black text-slate-600 mr-2">
                      ({formRating} / 5)
                    </span>
                  </div>
                </div>

                {/* 2. Customer Name */}
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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                {/* 3. Area & Service Category Dropdown */}
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      {isAr ? "نوع الخدمة" : "Service Type"}
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="ac">{isAr ? "تصليح مكيف" : "AC Repair"}</option>
                      <option value="washing-machine">{isAr ? "تصليح غسالة" : "Washing Machine"}</option>
                      <option value="fridge">{isAr ? "تصليح ثلاجة" : "Refrigerator"}</option>
                    </select>
                  </div>
                </div>

                {/* 4. Review Comment Textarea */}
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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isAr ? "نشر التقييم فورياً" : "Post Review Now"}</span>
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>

              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Google Multi-Colored Official SVG Logo
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



