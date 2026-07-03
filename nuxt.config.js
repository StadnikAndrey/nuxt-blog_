export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  telemetry: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/tooltip.js',
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/autologin.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['nuxt-highlightjs', {
      style: 'nord'
    }]
  ],
  axios: {
    proxy: true
  },
  proxy: { '/api': 'http://localhost:3001' },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

  router: {
    prefetchLinks: false,// to prevent code from loading for all pages and application components. When a page is accessed, only the code for that page is loaded.    
  },
  render: {
    etag: false
  },

  publicRuntimeConfig: {
    pathImgServer: process.env.NODE_ENV == "development" ? "http://localhost:3001/img/" : "http://localhost:3001/img/",
    pathVideoServer: process.env.NODE_ENV == "development" ? "http://localhost:3001/video/" : "http://localhost:3001/video/"
  }
}
