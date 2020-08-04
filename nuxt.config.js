
export default {
  env: {
    APP_ENV: process.env.APP_ENV
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    // '@/plugins/element-ui',
    {
      src: "~/plugins/element-ui",
      ssr: true
    },
    {
      src: "~/plugins/axios.js",
      ssr: true
    },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios"
  ],
  axios: {
    // credentials: true // 跨域是否需要校验
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    vendor: ['element-ui','axios'], // 防止二次打包
    transpile: [/^element-ui/],
    postcss: [
      require("postcss-px2rem")({
        remUnit: 75 //1rem == 75px;
      })
    ],
    extractCSS: {
      allChunks: true,
      ignoreOrder: true,
    },
  }
}
