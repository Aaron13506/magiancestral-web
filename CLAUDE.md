# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Agrikol" - a Vue.js Nuxt.js template for agriculture farm & farmers websites. It's a Nuxt 3 application with multiple page layouts and Vue components for an agriculture business website.

## Development Commands

**Package Manager:** This project uses **pnpm** instead of npm.

```bash
# Install dependencies
pnpm install

# Run development server (localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate static files
pnpm generate

# Prepare Nuxt
pnpm postinstall
```

## Project Architecture

### Framework & Version
- **Nuxt.js 3.x** - Universal mode with static generation support
- **Vue.js 3.x** - Component-based architecture with Composition API
- **TypeScript** - Configuration in TypeScript, components can use either JS or TS
- **Pinia** - State management (replaced Vuex)

### Key Dependencies
- `swiper` (^11.1.4) - Touch slider components (updated for Vue 3)
- `@pinia/nuxt` (^0.5.1) - Pinia integration for Nuxt 3
- `pinia` (^2.1.7) - State management store
- `vue` (^3.4.0) - Vue 3 framework

### Migration Notes
- **Carousel Components**: Old Vue 2 carousel libraries (`v-owl-carousel`, `vue-awesome-swiper`, etc.) have been removed as they're not compatible with Vue 3. Consider using Swiper Vue components directly.
- **State Management**: Migrated from Vuex to Pinia with `useMainStore` composable
- **Composition API**: Components migrated to use `<script setup>` syntax
- **Auto-imports**: Nuxt 3 auto-imports components, so explicit imports are not needed in pages
- **Assets**: Moved from `static/` to `public/` directory for Nuxt 3 compatibility
- **CSS Loading**: CSS files now loaded via `css` array in nuxt.config.ts instead of head links
- **JavaScript Loading**: Global scripts loaded via client-side plugin
- **Asset Redirects**: Added server middleware to redirect legacy `/static/` paths to `/assets/`
- **Route Rules**: Configured cache headers for all asset types

### Project Structure

**Pages Architecture:**
- `pages/` - Nuxt.js auto-routing (index.vue, about.vue, contact.vue, etc.)
- Multiple homepage variants (index.vue, index2.vue, index3.vue, index4.vue, index5.vue)
- E-commerce pages (product.vue, cart.vue, checkout.vue)
- Content pages (blog.vue, blog_detail.vue, gallery.vue, farmers.vue, etc.)

**Component System:**
- `components/` - 60+ reusable Vue components
- Component naming follows descriptive patterns (AboutOne, ServiceOne, TestimonialOne, etc.)
- Navigation components: Nav.vue, NavTwo.vue, NavThree.vue, NavFour.vue, NavFive.vue
- Footer variants: Footer.vue, FooterTwo.vue
- Slider components: Slider.vue, SliderTwo.vue, SliderThree.vue, etc.

**State Management:**
- `store/index.js` - Pinia store managing search popup state
- Uses Pinia actions for state changes with `useMainStore` composable

**Layouts:**
- `layouts/default.vue` - Main layout wrapper with SearchPopup component using Composition API
- `app.vue` - Root application component

### Configuration Details

**Nuxt Config (`nuxt.config.ts`):**
- Universal mode with SSR enabled
- External CSS/JS assets loaded via CDN and static files
- Bootstrap, FontAwesome, custom CSS included
- Plugins: owl.client.js for carousel functionality (client-side only)
- Pinia module integration
- TypeScript configuration

**Static Assets:**
- `static/assets/` - All static resources (CSS, images, fonts, plugins)
- Pre-built CSS framework (Bootstrap) with custom agriculture theme
- FontAwesome icons and custom icon fonts
- Organized by type: css/, images/, fonts/, plugins/

### Key Features Architecture

**Multi-layout Support:**
- 5 different homepage layouts
- Different navigation styles per layout
- Flexible component composition per page

**E-commerce Integration:**
- Product listing and detail pages
- Shopping cart functionality
- Checkout process

**Content Management:**
- Blog system (blog.vue, blog_detail.vue)
- Gallery functionality
- Team/farmer profiles
- Service pages with detail views

**Blog System:**
- Blog uses **Nuxt Content** with Markdown files
- Articles are stored in `content/blog/` directory as `.md` files
- Blog listing page: `pages/blog/index.vue` (route: `/blog`)
- Blog detail page: `pages/blog/[slug].vue` (route: `/blog/article-slug`)
- To add a new article, create a `.md` file in `content/blog/` with frontmatter metadata

**Adding New Blog Articles:**
1. Create a new `.md` file in `content/blog/` with the article slug as filename
2. Add frontmatter at the top with: title, description, date, image, author, tags
3. Write content in Markdown below the frontmatter
4. The article will automatically appear on `/blog`

Example article structure:
```markdown
---
title: Article Title
description: Article description
date: 2025-01-15
image: /assets/images/blog/image.jpg
author: Admin
tags:
  - tag1
  - tag2
---

# Article content in Markdown...
```

### Plugin System
- `plugins/owl.client.js` - Placeholder for carousel functionality (needs Vue 3 compatible replacement)
- Client-side only plugins (`.client.js` suffix)

### Development Notes
- Uses Vue 3 Composition API with `<script setup>` syntax
- Components are auto-imported by Nuxt 3
- Static generation friendly with Nitro engine
- Bootstrap 4 styling with custom agriculture theme
- Pinia for state management instead of Vuex
- TypeScript configuration available