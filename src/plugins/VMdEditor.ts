import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'

import hljs from 'highlight.js'
// import json from 'highlight.js/lib/languages/json'
// import javascript from 'highlight.js/lib/languages/javascript'

// hljs.registerLanguage('json', json)
// hljs.registerLanguage('js', javascript)

VMdPreview.use(githubTheme, {

  Hljs: hljs,
  // Prism,
})

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.use(VMdPreview)
  nuxtApp.vueApp.component('VMdPreview', VMdPreview)
})
