// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  ssr: true,
  // experimental: {
  //   headNext: true
  // },
  srcDir: 'src/',
  app: {
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: '我的个人博客网站' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      // script: [
      //   { src: '/node_modules/aplayer/dist/APlayer.min.js' },
      // ],
    },
  },
  css: [
    '@/assets/css/common/index.scss',
    '@/assets/css/style.css',
    '@unocss/reset/normalize.css',
    '@unocss/reset/sanitize/sanitize.css',
    '@unocss/reset/sanitize/assets.css',
    // 'aplayer/dist/APlayer.min.css',
    // '~/assets/css/tailwind.css',
  ],
  build: {
    transpile: ['vue-toastification'],
  },
  // components: {
  //   dirs: ['~/src/components'],
  // },
  runtimeConfig: {
    // 只在服务端可以访问的配置项
    apiKey: '',
    // 可以暴露给客户端使用的配置项
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
      secretKey: process.env.NUXT_SECRET_KEY,
      host: process.env.NUXT_HOST,
      port: process.env.NUXT_PORT,
    },
  },
  imports: {
    dirs: ['stores'],
  },
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@import \'@/assets/css/common/index.scss\'',
  //       },
  //     },
  //   },
  // plugins: [
  //   ViteSvgLoader({
  //     defaultImport: 'component',
  //   }),
  // ],
  // },
  modules: [
    'nuxt-svgo',
    '@nuxthq/ui',
    '@unocss/nuxt',
    ['@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@vueuse/nuxt',

  ],
  ui: {
    // global: true,
    // icons: ['mdi', 'simple-icons'],
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-0',
    },
  },
  // toast: {
  //   position: 'top-center',
  // },
  svgo: {
    autoImportPath: false,
    global: false,
    // defaultImport: 'componentext',
    // autoImportPath: './assets/icons/',

  },
})
