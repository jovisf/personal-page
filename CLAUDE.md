# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for João Victor, a Fullstack Developer and Computer Science student at UFPE. This is a Next.js 14+ application showcasing technical excellence through a Tech-Constructivism design aesthetic.

**Critical Rule**: TechnicalPrompt.md is the source of truth for all development decisions. Never deviate from its specifications without explicit approval.

## Development Commands

```bash
# Initial setup (if not already done)
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir

# Install dependencies
npm install next-intl framer-motion clsx tailwind-merge
npm install -D @types/node

# Development server
npm run dev

# Production build
npm run build

# Linting
npm run lint
```

## Architecture & Directory Structure

The project follows a strict Next.js App Router architecture with internationalization:

```
src/
├── app/[locale]/           # Internationalized routes
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, etc.)
│   ├── sections/           # Page sections (Hero, Stack, Projects, About, Contact)
│   └── layout/             # Layout components (Header, Footer, Navigation)
├── hooks/                  # Custom hooks (useScrollObserver, useTheme, useLocale)
├── lib/                    # Utilities (utils.ts with cn() function, constants)
├── types/                  # TypeScript type definitions
├── i18n/                   # i18n configuration
└── messages/               # Translation files (pt-BR.json, en.json)
```

### Component Structure Pattern

Every component MUST follow this three-file pattern:

```
ComponentName/
├── ComponentName.tsx       # Implementation
├── ComponentName.types.ts  # TypeScript interfaces
└── index.ts               # Barrel export
```

## Design System: Tech-Constructivism

### Color Tokens (NEVER use raw hex values)

**Light Mode - Greeny Pastel:**
- Background: `bg-light-background` (#E9F5DB)
- Primary Accent: `bg-light-primary-accent` (#718355)
- Secondary Accent: `bg-light-secondary-accent` (#B5C99A)
- Surface: `bg-light-surface` (#CFE1B9)
- Text: `text-light-text` (#021024)

**Dark Mode - Deep Aurora Night:**
- Background: `bg-dark-background` (#021024)
- Primary Accent: `bg-dark-primary-accent` (#C1E8FF)
- Secondary Accent: `bg-dark-secondary-accent` (#5483B3)
- Surface: `bg-dark-surface` (#052659)
- Text: `text-dark-text` (#E9F5DB)

### Typography (TildaSans font family)

- Headlines: `font-tilda font-extrabold uppercase tracking-tight`
- Body: `font-tilda font-medium text-base leading-relaxed`
- All type sizes must be responsive using Tailwind's responsive prefixes

### Motion Principles (Framer Motion)

1. **Parallax Block Shifting**: Background geometric blocks move at different speeds on scroll
2. **Diagonal Slide-In**: Section titles enter from corners with diagonal motion
3. **Instant Color Inversion**: Hover effects use `duration: 0` for mechanical switch feel
4. **Respect `prefers-reduced-motion`**: Always check and disable animations when requested

## Critical Development Rules

### 1. Code Language
- ALL code (variables, functions, components, comments, commits) MUST be in English
- Exception: Translation files contain multilingual content

### 2. Internationalization (next-intl)
- NO hardcoded visible text in components
- ALL user-facing strings MUST come from `messages/{locale}.json`
- Use `useTranslations()` hook in every component with text

```typescript
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')
  return <h1>{t('title')}</h1>
}
```

### 3. Color Usage
- ✅ Correct: `className="bg-light-background dark:bg-dark-background"`
- ❌ WRONG: `className="bg-[#E9F5DB]"`
- Use Tailwind classes or CSS variables ONLY

### 4. Utility Function (lib/utils.ts)
Always use `cn()` for className merging:

```typescript
import { cn } from '@/lib/utils'

className={cn(
  'base-classes',
  conditionalClasses && 'conditional-classes',
  customClassName
)}
```

### 5. Scroll Observer Hook
Use the provided `useScrollObserver` hook for scroll-based animations (see TechnicalPrompt.md for full implementation). It returns `[elementRef, isVisible]` and automatically unobserves after first intersection.

## Component Patterns

### Button Component Structure
See TechnicalPrompt.md lines 242-302 for the exact Button component pattern. All UI components should follow this structure:
- Variant-based styling object
- Size-based styling object
- Props with defaults
- cn() for className merging
- TypeScript types in separate file

### Stack Display (Experience Circles)
Technology experience is visualized as circles with fill percentage based on years. See TechnicalPrompt.md lines 392-424 for implementation details.

## Content Structure

The site follows this section order:
1. Hero - Large headline with geometric shapes
2. About - Personal introduction and background
3. Timeline - Career/education milestones
4. Stacks - Technologies and certifications with visual indicators
5. Contact - Email and social links

All content is stored in `messages/pt-BR.json` and `messages/en.json`. The design system specifies "Tech-Constructivism" aesthetic: geometry-driven, asymmetrical Bauhaus grid, heavy divider lines, offset elements creating motion.

## Performance Requirements

- Use `next/image` for all images
- Lazy load sections below the fold
- TildaSans font loaded via `next/font/local`
- Animations must check `prefers-reduced-motion`

## Pre-Commit Checklist

Before committing, verify:
- [ ] All code is in English
- [ ] No hardcoded color values (only tokens)
- [ ] All visible text comes from i18n files
- [ ] Component follows three-file structure
- [ ] TypeScript types are defined
- [ ] Responsive design works (mobile-first)
- [ ] Dark mode functions correctly
- [ ] Basic accessibility (aria-labels, alt texts)
- [ ] cn() utility used for class merging

## Anti-Hallucination Protocol

**Before writing ANY code:**
1. Re-read the relevant section in TechnicalPrompt.md
2. Verify the pattern matches the document exactly
3. If TechnicalPrompt.md doesn't specify something, ASK

**Forbidden Actions:**
- Adding dependencies not listed in TechnicalPrompt.md
- Creating files outside the defined architecture
- Using different libraries (only next-intl for i18n, only Framer Motion for animations)
- Adding "improvements" not requested
- Modifying the color palette
- Using inline styles

**When Uncertain:** STOP and ASK. Never guess or assume.

## Tailwind Configuration

The exact Tailwind config is specified in TechnicalPrompt.md lines 78-119. It includes:
- `darkMode: 'class'`
- Extended color palette with light/dark tokens
- TildaSans font family variable
- Custom border widths (3px, 4px)

## CSS Variables

See TechnicalPrompt.md lines 122-149 for the exact global CSS setup. Variables are defined in `:root` and `.dark` class with corresponding Tailwind utility applications on body.

## Working with This Codebase

1. **Read TechnicalPrompt.md first** for any task
2. **Implement exactly as specified** - no more, no less
3. **Verify against specification** before considering complete
4. **Use the design system** - Tech-Constructivism aesthetic with geometric shapes, asymmetrical layouts, sharp transitions
5. **Respect the content** - All text is in Portuguese (pt-BR primary) with English translations
