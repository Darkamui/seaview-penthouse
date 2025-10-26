/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://seaview.j-web.ca",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://seaview.j-web.ca/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
  alternateRefs: [
    {
      href: "https://seaview.j-web.ca/en",
      hreflang: "en",
    },
    {
      href: "https://seaview.j-web.ca/he",
      hreflang: "he",
    },
    {
      href: "https://seaview.j-web.ca/en",
      hreflang: "x-default",
    },
  ],
  transform: async (config, path) => {
    // Set custom priority based on page
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/en" || path === "/he" || path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.includes("/gallery") || path.includes("/events")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.includes("/contact")) {
      priority = 0.9;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
