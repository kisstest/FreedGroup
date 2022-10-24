module.exports = {
  /*
  ** Headers of the page
  */
  devtools: true,
  telemetry: true,
  head: {
    title: 'freed_groupp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],
  axios: {
      proxy: true     // proxy 사용
  },
  proxy: {
      '/prefix-url': 'proxy-url'    // proxy url
  },
  plugins: [
    { src: '~plugins/client', ssr: false },
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    beforeResolve(to, from, next) {
      if (this.$store.getters.isLoggedIn)
            next('/resource')
    }
  }
}

