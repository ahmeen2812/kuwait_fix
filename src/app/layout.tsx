import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingActions from "@/components/ui/FloatingActions";
import JsonLdSchema from "@/components/seo/JsonLdSchema";
import { GOOGLE_TAG_ID, CALL_CONVERSION_ID } from "@/lib/gtag";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const GTM_ID = "GTM-T6VZCHNC";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Homexa | هوميكسا لصيانة الغسالات والمكيفات والثلاجات في الكويت",
    template: "%s | Homexa Kuwait",
  },
  description:
    "شركة هوميكسا (Homexa) الرائدة في صيانة وتصليح الغسالات والمكيفات والثلاجات في جميع مناطق الكويت. فنيون متخصصون، كفالة معتمدة، وخدمة فورية خلال 45 دقيقة. اتصل: 50626275",
  alternates: {
    canonical: siteConfig.url,
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
        <JsonLdSchema />

        {/* 1. Google Tag Manager (GTM) Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* 2. Google Ads (gtag.js) Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        />
        <Script id="google-ads-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');

            // Google Ads Click-to-Call Conversion Function
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': '${CALL_CONVERSION_ID}',
                  'value': 1.0,
                  'currency': 'PKR',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={`${cairo.className} bg-[#FAFCFF] text-slate-900 antialiased`}>
        {/* 3. Google Tag Manager (noscript) - Required right after <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LanguageProvider>
          <main>{children}</main>

          {/* Floating WhatsApp and Contact Us Widget */}
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}