module.exports = {
  mode: 'universal',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Code directory
  srcDir: 'client/',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax', '~/plugins/vuelidate', '~/plugins/lodash', '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  render: {
    compressor: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // axios: {
  //   baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
  // },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  axios: {
    proxy: process.env.PROFILE_ENV === 'dev' // Can be also an object with default options
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'success.access_token',
        },
        user: {
          property: 'success',
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: false,
          user: { url: '/api/user', method: 'get' }
        },
        redirect: {
          login: '/login',
          logout: '/login',
          callback: '/login',
          home: '/'
        }
      }
    }
  }, router: {
    middleware: ['auth']
  },

  proxy: {
    '/api/': { target: 'http://localhost:5000' },
  },

  telemetry: false
};

