# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Rules

**IMPORTANT:** Do NOT test or run the project. Only create and modify code. The user will test the changes themselves.

- Do NOT execute `pnpm dev`, `pnpm build`, `pnpm preview`, or any other project execution commands unless explicitly requested by the user
- Focus on writing, editing, and reviewing code
- The user is responsible for testing and running the application

## Project Overview

This is **Magiancestral** — a spiritual/ancestral medicine website built with Nuxt 3. It was scaffolded from the "Agrikol" agriculture template, so many component and CSS class names still reference that origin but the content is entirely different.

## Development Commands

**Package Manager:** This project uses **pnpm**.

```bash
pnpm install       # Install dependencies
pnpm dev           # Run dev server (localhost:3000)
pnpm build         # Build for production
pnpm generate      # Static generation
pnpm preview       # Preview production build
pnpm postinstall   # Nuxt prepare (run after install)
```

## Architecture

### Framework
- **Nuxt 3** with SSR enabled, static generation via Nitro
- **Vue 3** with `<script setup>` (Composition API) — preferred pattern for all components
- **Pinia** for state management (three stores in `store/index.js`)
- Site content is in **Spanish**

### Data Layer

**Products** — `public/data/products.json`
- Single JSON file; shape: `{ products: [...] }` with fields `id`, `slug`, `name`, `shortName`, `price`, `currency`, `category`, `image`, `benefits`, `inStock`, `topProduct`, etc.
- Loaded in components via `$fetch('/data/products.json')` or `useAsyncData`.
- Product detail routes: `/producto/[slug]` (`pages/producto/[slug].vue`).

**Blog** — `public/data/blog/`
- NOT Nuxt Content. Articles are plain JSON files (`<slug>.json`).
- `index.json` — array of article metadata (slug, title, description, date, image, author, category, optional `pdfUrl`).
- Individual article files hold the full article content (HTML string in `content` field).
- **Server API**: `server/api/blog/index.get.ts` and `server/api/blog/[slug].get.ts` read these files with `readFileSync` and expose them at `/api/blog` and `/api/blog/<slug>`.
- Two blog categories: `estudios-cientificos` and `reflexiones-del-espiritu`.
- Articles with a `pdfUrl` field link directly to a PDF instead of an article page.
- When adding a new blog article: (1) create `public/data/blog/<slug>.json` with `slug`, `title`, `description`, `date`, `image`, `author`, `category`, `content` (HTML), and optionally `pdfUrl`; (2) add a metadata entry to `public/data/blog/index.json`; (3) add the route to `nitro.prerender.routes` in `nuxt.config.ts`.

### Pinia Stores (`store/index.js`)
- **`useCartStore`** — shopping cart persisted to `localStorage` under key `magiancestral-cart`. Has `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `loadCart`, `openWhatsApp`. WhatsApp number: `584241600760`.
- **`useMainStore`** — search popup visibility toggle (`searchPopupStatus`).
- **`useRadioStore`** — online radio state (`isPlaying`, `volume`, `nowPlaying`, `radioUrl`). The audio element is created in `plugins/radio.client.js` and registered via `setAudioElement`.

### Plugins (all client-only)
- `plugins/global-scripts.client.js` — loads GLightbox and accordion JS from `/assets/plugins/`, then initializes GLightbox.
- `plugins/radio.client.js` — creates a hidden `<audio>` element, wires event listeners to `useRadioStore`, appends it to `<body>`.
- `plugins/owl.client.js` — legacy placeholder; no active functionality.

### Nuxt Config Highlights
- CSS is loaded globally via the `css` array in `nuxt.config.ts` (Bootstrap, FontAwesome, custom theme, `assets/css/global-overrides.css`).
- External scripts (radio widget) loaded via `app.head.script`.
- Google Fonts (Poppins + Fraunces) via `app.head.link`.
- `routeRules` sets long-lived cache headers on `/assets/**` and short cache on `/data/**`.
- `nitro.prerender.routes` lists the static routes that must be pre-rendered (update when adding new blog articles).
- `devtools.componentInspector.openInEditor: 'webstorm'`.

### Static Assets
- Served from `public/assets/` (URL path `/assets/`).
- Custom CSS overrides live in `assets/css/global-overrides.css` (global font-weight resets using `!important`).
- Images: `public/assets/images/`; blog images in `blog/` sub-folder; shop/product images in `shop/botica/`.

### Navigation & Layout
- **`components/Nav.vue`** — the only active navigation. Contains sticky scroll logic, mobile hamburger with per-dropdown toggle, cart badge from `useCartStore`, and embeds `<RadioPlayer />` inside the sticky nav bar. Loads cart from localStorage on `onMounted`.
- **`layouts/default.vue`** — wraps every page in `.page-wrapper` and renders `<SearchPopup />`.
- **`app.vue`** — root; uses `<NuxtLayout>` + `<NuxtPage>`.

### E-Commerce Checkout
- Cart is client-side only (Pinia + localStorage).
- Checkout submits the order as a pre-formatted WhatsApp message via `useCartStore.openWhatsApp()` — no payment gateway.

### Page Routes
Active pages: `/` (index), `/about`, `/farmers`, `/gallery`, `/service-detail`, `/projects`, `/projects_detail`, `/radio`, `/product`, `/producto/[slug]`, `/cart`, `/checkout`, `/blog`, `/blog/[slug]`, `/blog/estudios-cientificos`, `/blog/reflexiones-del-espiritu`.

Unused/legacy pages still in `pages/`: `index2.vue`, `index3.vue`, `index5.vue`, `index-old.vue` (original template variants).
