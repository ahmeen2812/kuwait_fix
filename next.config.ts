import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // يسمح بتحميل الصور المحلية والخارجية دون أخطاء
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;