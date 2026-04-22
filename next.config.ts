import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Fix 1: Compress all responses
  compress: true,

  images: {
    // ✅ Fix 2: Allow external image domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // ✅ Fix 3: Modern formats (WebP/AVIF = 50-80% smaller than JPEG)
    formats: ["image/avif", "image/webp"],
    // ✅ Fix 4: Cache images for 1 year
    minimumCacheTTL: 31536000,
    // ✅ Fix 5: Define your common image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },

  // ✅ Fix 6: Set cache headers for static assets
  async headers() {
    return [
      {
        // Videos - cache for 1 year
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Images - cache for 1 year
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Fonts - cache for 1 year
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;