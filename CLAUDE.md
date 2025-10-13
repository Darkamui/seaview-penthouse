# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

**TypeScript:**

- No explicit typecheck command in package.json - use `npx tsc --noEmit` to check types

## Architecture

This is a Next.js 15 application for a luxury vacation rental penthouse in Ashdod, featuring:

**Tech Stack:**

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4 (latest version with inline theming)
- Radix UI components (shadcn/ui)
- next-intl for internationalization
- Custom font stack: Inter (sans), Manrope (serif), JetBrains Mono (mono)

**Project Structure:**

- `app/[locale]/` - Locale-specific Next.js pages and layouts
- `components/` - React components organized by feature
- `components/ui/` - Reusable UI components (shadcn/ui)
- `i18n/` - Internationalization configuration and routing
- `messages/` - Translation files (he.json, en.json)
- `lib/` - Utility functions (cn helper for class merging)
- Path alias: `@/*` maps to root directory

**Styling System:**

- Uses Tailwind CSS v4 with custom luxury theme
- Color palette: Deep blue (#00274d), white, cream, and gold (#d4af37)
- Custom CSS variables for consistent theming
- Built-in dark mode support
- RTL/LTR support for Hebrew and English
- Custom animations and utilities in globals.css

**Component Patterns:**

- Uses class-variance-authority (cva) for component variants
- Radix UI Slot for polymorphic components
- Compound components pattern (Card, CardContent)
- Consistent use of cn() utility for conditional classes

**Internationalization:**

- Hebrew as primary language (default locale: 'he')
- English as secondary language (locale: 'en')
- Locale-prefixed URLs (/he/, /en/)
- All components use next-intl's useTranslations hook
- Navigation uses next-intl's Link component for locale-aware routing
- Language switcher component with flags and locale names
- RTL support with dynamic dir attribute and CSS adjustments

## Important when writing code

- Be consistent throughout. Do not treat items in isolation but rather as a whole to make sure the whole app is consistent when modifying/creating code.
- Always use ShadCN components if available rather than creating UI components from scratch.
- You are allowed to suggest third party libraries to achieve a result if they outweigh the manual benefit of doing it.
