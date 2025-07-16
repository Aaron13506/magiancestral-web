# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Agrikol" - a Vue.js Nuxt.js template for agriculture farm & farmers websites. It's a Nuxt 3 application with multiple page layouts and Vue components for an agriculture business website.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static files
npm run generate

# Prepare Nuxt
npm run postinstall
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
- Content pages (news.vue, gallery.vue, farmers.vue, etc.)

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
- Blog/news system
- Gallery functionality
- Team/farmer profiles
- Service pages with detail views

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