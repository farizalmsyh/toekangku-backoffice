export default {
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  ssr: false,
  head: {
    title: 'Dashboard | ToekangKu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: '~/components/Loader.vue',

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@fortawesome/fontawesome-free/css/all.css',
    'boxicons/css/boxicons.min.css',
    '~/assets/scss/main.scss',
    '~/assets/css/style.css'
  ],

  plugins: [
    '~/plugins/axios',
    '~/plugins/datepicker.js',
    '~/plugins/fontawesome.js',
    '~/plugins/filters.js',
    '~/plugins/vue-json-excel.js'
  ],

  components: {
    dirs: [
      '~/components',
    ]
  },

  buildDir: 'dist',
  target: 'static',
  generate: {
    fallback: true,
  },

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'nuxt-highcharts',
    '@nuxtjs/style-resources',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/toast'
  ],

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: false,
    componentPlugins: [],
    directivePlugins: [],
    components: [],
    directives: [],
  },

  styleResources: {
    scss: '~/assets/scss/_variables.scss'
  },

  axios: {
    baseURL: process.env.NUXT_APP_API_URL || 'https://toekangku-backend-5mballdzpa-et.a.run.app/v1/mobile',
  },

  toast: {
    position: 'top-right',
    duration: 3000,
  },

  build: {
    babel: {
      compact: true,
    },
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
}
