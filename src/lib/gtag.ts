export const GOOGLE_TAG_ID = "AW-18488864536";
export const CALL_CONVERSION_ID = "AW-18488864536/NPgDCMvIhY8dEJjelvBE";

// 1. Tracks Click to Call (Exact conversion snippet from your Google Ads manager)
export const trackCallConversion = (url?: string) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: CALL_CONVERSION_ID,
      value: 1.0,
      currency: "PKR",
      event_callback: () => {
        if (url) {
          window.location.href = url;
        }
      },
    });
  } else if (url) {
    window.location.href = url;
  }
};

// 2. Tracks WhatsApp Lead Click
export const trackWhatsAppClick = () => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "generate_lead", {
      event_category: "Engagement",
      event_label: "WhatsApp Chat",
    });
  }
};

// 3. Tracks Form Submission Lead
export const trackFormSubmission = () => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "generate_lead", {
      event_category: "Booking",
      event_label: "Service Form Submitted",
    });
  }
};