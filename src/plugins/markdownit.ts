import md from 'markdown-it'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'

// import markdownItAbbr from 'markdown-it-abbr'
import multimdTable from 'markdown-it-multimd-table'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItEmoji from 'markdown-it-emoji'
import markdownItClass from 'markdown-it-class'
import mdItContainer from 'markdown-it-container'
// import taskList from 'markdown-it-task-lists'

// import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-dark.css'

import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import typescript from 'highlight.js/lib/languages/typescript'
import nginx from 'highlight.js/lib/languages/nginx'
import json from 'highlight.js/lib/languages/json'
import scss from 'highlight.js/lib/languages/scss'
import css from 'highlight.js/lib/languages/css'

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
    .use(MarkdownItHighlightjs, { inline: false, register: [javascript, bash, typescript, nginx, json, scss, css] })
    .use(markdownItEmoji)
    // .use(taskList, { label: true, labelAfter: true })
    .use(markdownItAnchor)
    .use(multimdTable, {
      multiline: true,
      rowspan: true,
      headerless: true,
      multibody: true,
      aotolabel: true,
    })
    // .use(mdItAdmonition, { marker: ':' })
    .use(mdItContainer, 'tip-container', {
      // marker: ':',
      validate(params: string) {
        // const reg = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})/
        // const reg2 = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
        // 函数在开始标记后验证尾部，成功时返回true
        // const types = ['tip', 'warning', 'error', 'success']
        const matchReg = params.trim().match(/^(tip|warning|danger|details)\s*(.*)$/)
        return matchReg
      },
      render(tokens: any, idx: number) {
        const detailsReg = /(\s+)?details(\s+)?/
        const m = tokens[idx].info.trim().match(/^(tip|warning|danger|details)\s*(.*)$/) as Array<string>
        // details添加添加类型
        if (detailsReg.test(tokens[idx].info)) {
          tokens[idx].tag = 'details'
          tokens[idx + 4].tag = 'details'
        }
        const tipTypes: Record<string, any> = {
          tip: { name: '提示', className: 'tip' },
          details: { name: '详情', className: 'md-tip-details' },
          warning: { name: '注意', className: 'warning' },
          danger: { name: '警告', className: 'danger' },
        }
        if (tokens[idx].nesting === 1) {
          if (detailsReg.test(tokens[idx].tag)) {
            return `
                <details class='${tipTypes[m[1]].className}'>
                <summary>${mdit.utils.escapeHtml(tipTypes[m[1]].name)}</summary>\n
              `
          }
          return `
            <div class='md-tip-container ${tipTypes[m[1]].className}'>
              <p class='md-tip-title'>${mdit.utils.escapeHtml(tipTypes[m[1]].name)}</p>\n
          `
        } else {
          if (detailsReg.test(tokens[idx].tag)) {
            return '</details>'
          }
          // 闭合标签
          return '</div>\n'
        }
      },
    })
    .use(markdownItClass, { table: ['md-table'], a: ['md-link'] })
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
  return {
    provide: {
      mdit,
    },
  }
})
