# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for XERYUS (a market research / consulting company), in Spanish. Built from a Bolt.new Vite + React + TypeScript starter.

## Commands

```
npm run dev         # start Vite dev server
npm run build        # production build to dist/
npm run lint          # eslint over the repo
npm run typecheck    # tsc --noEmit -p tsconfig.app.json
npm run preview      # preview the production build
```

There is no test runner configured in this repo.

## Architecture

- **Single-page app with hash-based routing, no router library.** [App.tsx](src/App.tsx) holds a `page` string in state (initialized from `window.location.hash`), and a `switch` in `renderPage()` picks which top-level page component to render. Navigation happens by calling `onNavigate(page, data?)`, which updates state, sets `window.location.hash`, and scrolls to top. Every page component takes an `onNavigate` prop of this same shape rather than importing a router.
- `pageData` is a small side-channel for passing data between pages that hash routing can't express (e.g. `tool-detail` needs a `toolId`, passed via `onNavigate('tool-detail', { toolId })`).
- Pages live in `src/components/pages/` (Nosotros, Soluciones, Factibilidad, Herramientas, ToolDetail, Blog, Casos, Contacto). Homepage sections live in `src/components/home/` and are composed directly in `App.tsx`'s default case (Hero, TrustBar, ClientsCarousel, Challenges, Differentiators, HowWeWork, SuccessCases, Testimonials, Resources, FinalCTA).
- **Theming**: `ThemeProvider` ([src/context/ThemeContext.tsx](src/context/ThemeContext.tsx)) persists light/dark to `localStorage` under `xeryus-theme` and toggles the `dark` class on `<html>` (Tailwind `darkMode: 'class'`). Components consume `useTheme()` and manually branch styling with `isDark ? '...' : '...'` template strings rather than relying on Tailwind's `dark:` variant — follow this existing pattern for consistency rather than introducing `dark:` classes.
- No global state library, no data-fetching library, no backend calls currently wired up — `@supabase/supabase-js` is a dependency but unused in `src/` so far. Forms (e.g. [Contacto.tsx](src/components/pages/Contacto.tsx)) currently just flip local `submitted` state on submit with no network request.
- Import project modules via the `@/` alias (maps to `src/`, configured in [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json)) instead of relative paths like `../../components/Foo`.

## Styling conventions

- Tailwind CSS, square-cornered design (`rounded-none` is used deliberately throughout — don't default to rounded corners).
- Brand red is `#fd3838` (`primary` in [tailwind.config.js](tailwind.config.js)), used directly as `text-[#fd3838]` / `bg-[#fd3838]` in most components rather than via the `primary` token — match existing usage in the file you're editing.
- Reusable utility classes are defined in [src/index.css](src/index.css) under `@layer components`: `.btn-primary`, `.btn-secondary`, `.section-label`, `.section-title`, plus custom keyframe animations (`.animate-fade-in-up`, `.animate-float`, `.animate-marquee`, etc.) and `.delay-*` helper classes for staggered animations.
- Headings use the Montserrat font, body text uses Poppins (loaded via Google Fonts `@import` in `index.css`).
- Icons come from `lucide-react` only — do not add another icon library.

## Constraints from the original Bolt project prompt

- Designs should be fully featured and production-worthy, not generic/cookie-cutter.
- Do not install other UI/theming/icon packages unless strictly necessary.
