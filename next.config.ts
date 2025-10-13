import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */

  // Enable standalone output for Docker optimization
  output: "standalone",

  // Phase 5: Image Optimization for Mobile-First Experience
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'airbnb.com',
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    // Enable modern JavaScript features
    esmExternals: true,
  },
};

export default withNextIntl(nextConfig);
