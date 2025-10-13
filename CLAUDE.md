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

## Core Principles

1. **Understand Before Acting**: Always inspect the `docs` folder (or any md files) first to understand application phases, architecture, and recent changes
2. **Holistic Thinking**: Consider the entire application when making changes - every modification should maintain system-wide coherence
3. **Consistency Over Cleverness**: Follow established patterns in the codebase rather than introducing new approaches

## Before Making Changes

- [ ] Read relevant documentation in `docs` folder/md files
- [ ] Identify all files that will be affected by the change
- [ ] Verify existing patterns (naming conventions, state management, component structure)
- [ ] Check for similar existing implementations to maintain consistency

## Code Quality Standards

### Planning & Analysis

- **Stop and think**: When encountering obstacles, document the issue and analyze it systematically rather than trying multiple rapid solutions
- **Root cause first**: Identify why something isn't working before attempting fixes
- **Limit iteration**: If a solution isn't working after 2 attempts, step back and reconsider the approach

### Writing Code

- **Every line must justify itself**: Remove unused imports, commented code, and redundant logic
- **Follow existing abstractions**: If the codebase uses a `gameState` hook wrapping `gameContext`, always use `gameState` - never mix abstraction levels
- **Use latest best practices** for our tech stack, but only if they align with existing patterns
- **Validate before submitting**: Test that your changes work in context, not just in isolation

### Refactoring

- **Delete aggressively**: When refactoring, remove all unused code in the same commit
- **Update dependents**: Find and update all code that depends on what you're changing
- **Maintain backwards compatibility** unless explicitly asked to break it

### Testing

- **No Tests simplification**: When creating tests, if tests fail, do not simplify the tests just so they will pass. Analyze how they should properly be implemented so they will pass and still include 100% test coverage.

## When Expanding Features

### Problem: Loss of Control During Expansion

**Solution**: Break work into phases with validation checkpoints

1. **Phase 1: Plan**

   - Document what needs to change
   - List all affected files
   - Identify potential conflicts with existing code

2. **Phase 2: Minimal Implementation**

   - Implement the smallest working version
   - Ensure it integrates with existing code
   - Validate it works before expanding

3. **Phase 3: Expand Incrementally**
   - Add one feature/enhancement at a time
   - Test integration after each addition
   - Stop if something breaks - fix before continuing

### Scaling Checklist

Before submitting changes that expand the application:

- [ ] All new code follows existing architectural patterns
- [ ] No abstraction levels are mixed (e.g., don't use both hook and context directly)
- [ ] All unused code from previous iterations has been removed
- [ ] Changes work with the rest of the application, not just in isolation
- [ ] Documentation in `docs` folder has been updated if architecture changed

## Red Flags to Avoid

❌ **Don't**: Try 5 different solutions rapidly when stuck  
✅ **Do**: Document the obstacle, analyze it, then propose one well-reasoned solution

❌ **Don't**: Leave commented-out code "just in case"  
✅ **Do**: Remove it - version control preserves history

❌ **Don't**: Work on a component as if it exists in isolation  
✅ **Do**: Consider its role in the larger application flow

❌ **Don't**: Mix patterns (e.g., using both `useState` and `useReducer` for similar state)  
✅ **Do**: Identify the established pattern and follow it consistently

❌ **Don't**: Add new dependencies or patterns without considering existing solutions  
✅ **Do**: Check if existing code already solves the problem

## Communication Protocol

When stuck or uncertain:

1. **State the problem clearly**: What exactly isn't working?
2. **Show what you've tried**: What approaches have failed and why?
3. **Propose a path forward**: What do you think should be done?
4. **Ask for input**: Is this the right direction?

## Tech Stack Adherence

- Always use current best practices for our stack
- When multiple valid approaches exist, choose the one already used in the codebase
- Document any deviations from established patterns with clear justification

## Definition of Done

Code is complete when:

- ✅ It works in the context of the entire application
- ✅ It follows all established patterns and conventions
- ✅ All unused code has been removed
- ✅ Documentation is updated
- ✅ You can explain why every line of code exists
