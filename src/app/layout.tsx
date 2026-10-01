import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingActions from "@/components/ui/FloatingActions";
import JsonLdSchema from "@/components/seo/JsonLdSchema";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/* ==========================================================
   HOMEXA GOOGLE SEARCH APPEARANCE METADATA
   Configures the Title & Snippet shown on Google Search
   ========================================================== */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Homexa | هوميكسا لصيانة الغسالات والمكيفات والثلاجات في الكويت",
    template: "%s | Homexa Kuwait",
  },
  description:
    "شركة هوميكسا (Homexa) الرائدة في صيانة وتصليح الغسالات والمكيفات والثلاجات في جميع مناطق الكويت. فنيون متخصصون، كفالة معتمدة، وخدمة فورية خلال 45 دقيقة. اتصل: 50626275",
  keywords: [
    "Homexa",
    "هوميكسا",
    "هوميكسا الكويت",
    "تصليح غسالات الكويت",
    "تصليح مكيفات الكويت",
    "تصليح ثلاجات الكويت",
    "فني تكييف مركزي",
    "صيانة أجهزة منزلية",
  ],
  authors: [{ name: "Homexa Kuwait" }],
  creator: "Homexa",
  publisher: "Homexa",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Homexa | هوميكسا لصيانة الأجهزة المنزلية والتكييف بالكويت",
    description:
      "خدمة صيانة فورية لجميع مناطق الكويت خلال 45 دقيقة مع قطع غيار أصلية وكفالة معتمدة.",
    url: siteConfig.url,
    siteName: "Homexa",
    locale: "ar_KW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homexa | هوميكسا لصيانة الأجهزة بالكويت",
    description: "فنيون معتمدون لصيانة الغسالات والمكيفات والثلاجات في الكويت. اتصل: 50626275",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Injects the Google Search Sitelinks & Business Schema */}
        <JsonLdSchema />
      </head>
      <body className={`${cairo.className} bg-[#FAFCFF] text-slate-900 antialiased`}>
        <LanguageProvider>
          <main>{children}</main>

          {/* Floating WhatsApp and Call Us Widget */}
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}