# 🏖️ The Sea View Penthouse

> Where luxury meets the Mediterranean. A stunning 570m² penthouse rental experience in Ashdod, Israel.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ What's This?

A multilingual, production-ready vacation rental website for a luxury Mediterranean penthouse. Built with cutting-edge tech, optimized for performance, and designed for conversions. Think Airbnb meets modern web excellence.

**Live Site:** [seaview-penthouse.com](https://seaview-penthouse.com)

---

## 🚀 Tech Stack

- **Framework:** Next.js 15.5.2 with App Router & Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (latest inline theming)
- **UI Components:** Radix UI + shadcn/ui
- **i18n:** next-intl (Hebrew, English, French)
- **Fonts:** Inter (sans), Poppins (display), self-hosted
- **PWA:** Service Worker + Web Manifest
- **SEO:** Structured data, multilingual metadata

---

## 🌟 Features

### 🌍 **True Internationalization**

- **3 Languages:** Hebrew (primary), English, French
- RTL/LTR support with automatic text direction
- Locale-prefixed URLs (`/he`, `/en`, `/fr`)

### 📱 **Progressive Web App**

- Installable on mobile & desktop
- Optimized icons for all devices
- Native app-like experience

### ⚡ **Performance First**

- Static generation for all routes
- Image optimization (AVIF/WebP)
- Lazy-loaded video showcase
- Code splitting & tree shaking
- 90+ Lighthouse scores

### 🔍 **SEO Optimized**

- JSON-LD structured data
- Dynamic OG images & Twitter cards
- Canonical URLs with hreflang tags
- Manual sitemap with 18 routes
- Google Analytics integration

---

## 🛠️ Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/seaview-penthouse.git
cd seaview-penthouse

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and experience luxury! 🌊

---

## 📋 Available Scripts

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Start development server with Turbopack |
| `npm run build`    | Build for production                    |
| `npm start`        | Start production server (port 3007)     |
| `npm run lint`     | Run ESLint checks                       |
| `npx tsc --noEmit` | TypeScript type checking                |

---

## 📁 Project Structure

```
seaview-penthouse/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── page.tsx       # Homepage
│   │   ├── gallery/       # Photo gallery with tabs
│   │   ├── events/        # Event venue info
│   │   ├── vacation/      # Vacation rental details
│   │   ├── bridal-event/  # Bridal preparation
│   │   └── contact/       # Contact form
│   ├── layout.tsx         # Root layout
│   └── manifest.ts        # PWA manifest
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── gallery-client.tsx # Interactive gallery
│   ├── language-switcher.tsx
│   └── ...
├── messages/
│   ├── en.json            # English translations
│   ├── he.json            # Hebrew translations
│   └── fr.json            # French translations
├── i18n/
│   ├── routing.ts         # i18n routing config
│   └── request.ts         # Server-side i18n
├── lib/
│   ├── structured-data.ts # SEO schema generation
│   └── ...
├── public/
│   ├── images/            # Optimized images
│   ├── sitemap.xml        # Manual sitemap
│   ├── robots.txt         # Search engine directives
│   └── sw.js              # Service Worker
└── next.config.ts         # Next.js configuration
```

---

## 🌐 Internationalization

The site supports **3 languages** with full translations:

- 🇮🇱 **Hebrew** - Default locale, RTL layout
- 🇺🇸 **English** - LTR layout
- 🇫🇷 **French** - LTR layout

All routes are automatically generated for each locale:

- `/he`, `/en`, `/fr` (homepages)
- `/he/gallery`, `/en/gallery`, `/fr/gallery`
- ... and 12 more routes

---

## 🎯 Production Deployment

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=your-verification-code
```

### Build & Deploy

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

**Deployment Platforms:**

- ✅ Docker (standalone output enabled)

---

## 🎨 Customization

### Adding a New Language

1. Create `/messages/{locale}.json`
2. Add locale to `i18n/routing.ts`, `i18n/request.ts`, `app/[locale]/layout.tsx`:
   ```typescript
   locales: ["he", "en", "fr", "es"]; // Add Spanish
   ```
3. Update `components/language-switcher.tsx`
4. Add routes to `public/sitemap.xml`
5. Rebuild

### Updating Content

All content is in `/messages/*.json` files. Edit these for translations without touching code!

---

## 📊 SEO Features

- **Structured Data:** Rich snippets for Google Search
- **Open Graph:** Beautiful social media previews
- **hreflang Tags:** Correct language indexing
- **Sitemap:** All 18 routes across 3 languages
- **robots.txt:** Optimized crawler directives
- **Performance:** Fast load times boost rankings

---

## 🤝 Contributing

This is a private project, but ideas are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📝 License

Copyright © 2025 [J-Web](https://j-web.ca). All rights reserved.

---

<div align="center">

**Made with intense amounts of ☕**

[Website](https://seaview-penthouse.com) · [Issues](https://github.com/yourusername/seaview-penthouse/issues)

</div>
