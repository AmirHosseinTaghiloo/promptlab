export default defineNuxtConfig({
  compatibilityDate: '2026-10-25',
  devtools: { enabled: true },
  css: [],
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      meta: [
        { name: 'theme-color', content: '#050716' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
