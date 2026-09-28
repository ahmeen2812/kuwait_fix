import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "خبراء صيانة الأجهزة المنزلية في الكويت | كويت فيكس",
  description: "خدمة صيانة وتصليح الغسالات والمكيفات والثلاجات في الكويت. اتصل بنا على 50626275 لفحص فوري وخدمة منزلية معتمدة.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-[#FAFCFF] text-slate-900 antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}