import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */

  // Enable standalone output for Docker optimization
  output: "standalone",

  // Experimental features for better performance
  experimental: {
    // Enable modern JavaScript features
    esmExternals: true,
  },
};

export default withNextIntl(nextConfig);
