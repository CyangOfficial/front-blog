import md from 'markdown-it'
// import MarkdownItHighlightjs from 'markdown-it-highlightjs'

import markdownItPrism from 'markdown-it-prism'
import 'prismjs/themes/prism.css'

import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-js-extras'
import 'prismjs/components/prism-js-templates'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-markup.js'

// import markdownItAbbr from 'markdown-it-abbr'
import multimdTable from 'markdown-it-multimd-table'
import taskList from 'markdown-it-task-lists'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItEmoji from 'markdown-it-emoji'
import markdownItClass from 'markdown-it-class'

// import markdownItContainer from 'markdown-it-container'
// import { markdownItTable } from 'markdown-it-table'

// import hljs from 'highlight.js/lib/core'
// import 'highlight.js/styles/atom-one-dark.css'

// import javascript from 'highlight.js/lib/languages/javascript'
// import bash from 'highlight.js/lib/languages/bash'

// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('bash', bash)

// const highlight = () => {

// }

export default defineNuxtPlugin(() => {
  const mdit = md({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItPrism, { highlightInlineCode: true, defaultLanguageForUnknown: 'bash' })
    .use(markdownItEmoji)
    .use(taskList)
    .use(markdownItAnchor)
    .use(multimdTable, {
      multiline: true,
      rowspan: true,
      headerless: true,
      multibody: true,
      aotolabel: true,
    })
    .use(markdownItClass, { table: ['md-table'] })
    // .use(markdownItContainer)
    // .use(markdownItCustomBlock, {
    //   table() {
    //     return '<table class="blog-table"></table>'
    //   },
    // })

  // const defaultRender = mdit.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  //   return self.renderToken(tokens, idx, options)
  // }

  mdit.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target') // attrIndex 按名称搜索属性索引。
    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']) // 添加新属性
    } else {
      if (tokens[idx]?.attrs?.length > 0) {
        // console.log(tokens[idx].attrs[aIndex])
        tokens[idx].attrs[aIndex][1] = '_blank' // 替换现有属性的值
      }
    }

    return self.renderToken(tokens, idx, options)
    // pass token to default renderer.
    // return defaultRender(tokens, idx, options, env, self)
  }
  // mdit.renderer.rules.my_token = function (tokens, idx, options, env, self) {
  //   console.log('sdfsdfsdfds------', { tokens })

  //   return self.renderToken(tokens, idx, options)
  // }
  return {
    provide: {
      mdit,
    },
  }
})
