<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

interface Titles {
  title: string
  lineIndex: string
  indent: number
}
interface MdPreviewFn<T> {
  scrollToTarget: (value: T) => void
}
interface ToTarget {
  target: HTMLElement
  scrollContainer: Window
  top: number
}

const route = useRoute()
const { postDetail, updatePv } = useApi()

const params = ref(route.params?.id as string)
// 获取数据
const [{ data: detailResult, error }] = await Promise.all([
  postDetail({ _id: params.value }),
  updatePv({ _id: params.value }),
])

const postItem = ref(detailResult.value?.result.items)

// 错误处理
if (error.value) {
  const errData = error.value.data
  throw createError({
    statusCode: errData.statusCode,
    message: errData.message || '服务器内部错误',
    fatal: true,
  })
}
// MdPreview 组件实例
const MdPreview = ref<ComponentPublicInstance<MdPreviewFn<ToTarget>> | null>(null)

const titles = ref<Titles[]>([])

const headerEl = ref<HTMLElement | null>(null)

const curLineIndex = ref('1')

const clickAnchor = ref(false)

// 获取锚点导航
const getAnchors = () => {
  // 找到所有h标签
  const anchors: Array<HTMLElement> = MdPreview.value?.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
  curLineIndex.value = anchors[0].getAttribute('data-v-md-line')!
  // const allEntries = ref<Array<IntersectionObserverEntry>>([])
  // let initInter = false
  // const io = new IntersectionObserver((entries) => {
  //   !initInter && (allEntries.value = entries)
  //   initInter = true
  //   const index = allEntries.value.findIndex(item => item.target.getAttribute('data-v-md-line') === entries[0].target.getAttribute('data-v-md-line'))
  //   allEntries.value[index] = entries[0]
  //   const visibleEntries = allEntries.value.filter(item => item.isIntersecting)
  //   console.log('----------------------------------')
  //   console.log('visibleEntries', visibleEntries)
  //   // const arr = allEntries.value.filter((item: any) => item.boundingClientRect.top < 0)
  //   if (visibleEntries.length === 0) {
  //     const item = visibleEntries.at(-1)!
  //     curLineIndex.value = item.target.getAttribute('data-v-md-line')!
  //   } else if (visibleEntries.length === 1) {
  //     const item = visibleEntries[0]
  //     curLineIndex.value = item.target.getAttribute('data-v-md-line')!
  //   } else if (visibleEntries.length >= 2) {
  //     const item = visibleEntries.at(-1)!
  //     // console.log('arr', arr)
  //     curLineIndex.value = item.target.getAttribute('data-v-md-line')!
  //   }
  // })
  // anchors.forEach((el) => {
  //   io.observe(el)
  // })

  const activeAnchor = useDebounceFn(() => {
    console.log('---------------------------------------')
    if (clickAnchor.value) return
    if (document.documentElement.scrollTop === 0) {
      curLineIndex.value = anchors[0].getAttribute('data-v-md-line')!
      return
    }
    const visibleEl: Array<HTMLElement> = []
    const topEl: Array<HTMLElement> = []

    anchors.forEach((el) => {
      const top = el.getBoundingClientRect().top
      if (top > 0 && top < window.innerHeight) {
        visibleEl.push(el)
      } else if (top < 0) {
        topEl.push(el)
      }
    })

    if (visibleEl.length === 0) {
      curLineIndex.value = topEl.at(-1)!.getAttribute('data-v-md-line')!
    } else if (visibleEl.length === 1) {
      curLineIndex.value = visibleEl[0].getAttribute('data-v-md-line')!
    } else if (visibleEl.length > 1) {
      curLineIndex.value = visibleEl.at(-1)!.getAttribute('data-v-md-line')!
    }
  }, 100)

  window.addEventListener('scroll', activeAnchor)

  // 过滤掉空内容的标题
  const titleEl = Array.from(anchors).filter(item => !!item.innerText.trim())
  if (!titleEl.length) {
    titles.value = []
    return
  }
  // H标签去重并排序
  const hTags = Array.from(new Set(titleEl.map(v => v.tagName))).sort()

  headerEl.value = document.getElementsByTagName('header')[0]

  titles.value = titleEl.map(el => ({
    title: el.innerText, // 标题
    lineIndex: el.getAttribute('data-v-md-line')!, // 获取标签在文章中的索引值 用来跳转
    indent: hTags.indexOf(el.tagName), // 导航缩进值
  }))
}

// 锚点跳转事件
const anchorClick = (item: Titles) => {
  const heading = MdPreview.value?.$el.querySelector(`[data-v-md-line="${item.lineIndex}"]`)
  if (heading) {
    clickAnchor.value = true
    curLineIndex.value = item.lineIndex
    MdPreview.value?.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: headerEl.value?.offsetHeight || 72,
    })
    setTimeout(() => {
      clickAnchor.value = false
    }, 300)
  }
}

onMounted(getAnchors)
</script>

<template>
  <div
    class="relative h-72 overflow-hidden bg-cover bg-no-repeat before:(absolute inset-0 bg-black/10 content-[''] dark:bg-black/30) md:(h-114)"
    :style="{ 'background-image': `url(${postItem?.posterUrl})` }"
  >
    <div class="[text-shadow:_2px_2px_10px_#000000] absolute bottom-4 mx-auto mt-42 px-4 text-gray-100 md:(relative mt-82 max-w-4xl)">
      <h2 class="text-2xl md:(text-4xl)">
        {{ postItem?.title }}
      </h2>
      <div class="text-sm md:(text-base)">
        <img class="mr-4 h-10 w-10 rounded-full align-middle" src="@/assets/images/avatar.jpg" alt="头像">
        <span class="mr-4 align-middle">楊 · {{ useDateFormat(postItem?.createdAt, 'YYYY-MM-DD') }}</span>
        <span class="mr-4 align-middle">{{ postItem?.pv }}人阅读</span>
        <span class="mr-4 align-middle">{{ postItem?.like }}人喜欢</span>
      </div>
    </div>
  </div>
  <main class="relative mx-auto px-2 container md:(max-w-4xl px-0)">
    <article>
      <v-md-preview ref="MdPreview" class="preview-wrap" :text="postItem?.content" />
    </article>
    <aside class="absolute right-[calc((100%-950px-550px)/2)] top-4 min-h-full">
      <ol class="sticky top-24 list-none pl-4">
        <li
          v-for="(item) in titles" :key="item.lineIndex"
          :style="{ padding: `0 0 0 ${item.indent * 10}px` }"
          @click="anchorClick(item)"
        >
          <a
            class="cursor-pointer select-none text-lg text-gray-600 before:(absolute left-0 inline-block h-[28px] w-[2px] bg-gray-100 content-[''])"
            :class="{ 'before:(bg-amber-400)! text-amber-400': curLineIndex === item.lineIndex }"
          >{{ item.title }}</a>
        </li>
      </ol>
    </aside>
    <div class="md:(flex)">
      <NuxtLink
        v-if="postItem?.prev"
        :to="`/post/${postItem.prev._id}`" class="group relative block flex-1 bg-cover py-8 pl-10 text-white no-underline md:(py-12)"
        :style="{ 'background-image': `url(${postItem.prev.posterUrl})` }"
      >
        <div class="absolute inset-0 bg-black opacity-40 transition-all group-hover:(opacity-10)" />
        <div class="relative z-10 text-sm text-gray-200">
          PREVIOUS POST
        </div>
        <div class="relative z-10 mt-2 text-lg">
          {{ postItem.prev.title }}
        </div>
      </NuxtLink>

      <NuxtLink
        v-if="postItem?.next"
        :to="`/post/${postItem.next._id}`" class="group relative block flex-1 bg-cover py-8 pr-10 text-right text-white no-underline md:(py-12)"
        :style="{ 'background-image': `url(${postItem.next.posterUrl})` }"
      >
        <div class="absolute inset-0 bg-black opacity-40 transition-all group-hover:(opacity-10)" />
        <div class="relative z-10 text-sm text-gray-200">
          NEXT POST
        </div>
        <div class="relative z-10 mt-2 text-lg">
          {{ postItem.next.title }}
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<style>
.vuepress-markdown-body {
  @apply dark:(bg-trueGray-900);
}

.v-md-editor-preview h1,h2,h3,h4,h5,h6,table,p,code,ul,ol {
  @apply dark:(text-trueGray-50)
}
</style>
