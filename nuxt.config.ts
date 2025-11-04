// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      title: 'Magiancestral',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Magiancestral' }
      ],
      link: [
        { rel: 'icon', href: '/assets/images/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/images/favicons/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/assets/images/favicons/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/assets/images/favicons/favicon-16x16.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap' }
      ],
      script: [
        {
          id: 'sonic_js',
          'data-port': '8202',
          src: 'https://radio.cimaspeed.com/cp/widgets.js?r=824'
        }
      ]
    }
  },

  css: [
    '~/public/assets/css/bootstrap.min.css',
    '~/public/assets/css/bootstrap-datepicker.min.css',
    '~/public/assets/css/vegas.min.css',
    '~/public/assets/css/animate.min.css',
    '~/public/assets/plugins/glightbox/glightbox.min.css',
    '~/public/assets/css/fontawesome-all.min.css',
    '~/public/assets/css/agrikol_iconl.css',
    '~/public/assets/css/style.css',
    '~/public/assets/css/responsive.css',
    '~/assets/css/global-overrides.css'
  ],

  modules: [
    '@pinia/nuxt'
  ],

  plugins: [
    '~/plugins/owl.client.js',
    '~/plugins/global-scripts.client.js'
  ],

  nitro: {
    prerender: {
      routes: [
        '/',
        '/blog',
        '/blog/psilocibina-terapia-oncologica',
        '/blog/australia-nueva-zelanda-psilocibina',
        '/blog/estudio-ayahuasca-salud-publica'
      ]
    }
  },

  compatibilityDate: '2024-07-16',

  routeRules: {
    '/assets/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/assets/images/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/assets/css/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/assets/js/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/assets/fonts/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/assets/plugins/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/data/**': { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } }
  }
})
