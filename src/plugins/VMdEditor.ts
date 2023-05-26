import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
// import hljs from 'highlight.js'

// Prism
import Prism from 'prismjs'
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json'

VMdPreview.use(vuepressTheme, {
  Prism,
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VMdPreview)
  nuxtApp.vueApp.component('VMdPreview', VMdPreview)
})
