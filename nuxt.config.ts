// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src/',
  app: {
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
  // components: {
  //   dirs: ['~/src/components'],
  // },
  runtimeConfig: {
    // 只在服务端可以访问的配置项
    apiKey: '',
    // 可以暴露给客户端使用的配置项
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
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
  // },
  modules: [
    // 'nuxt-svgo',
    'nuxt-icons',
    // 'nuxt-svg-icons',
    '@unocss/nuxt',
    ['@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@vueuse/nuxt',
  ],
})
