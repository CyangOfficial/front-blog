<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

interface Ititles {
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
const { postDetail, updatePv, updateLike } = useApi()

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

// 是否喜欢当前文章
const isLike = ref(false)
// 设置喜欢状态
const setHeartState = async () => {
  try {
    // 获取存储在本地的数组id
    const likeArrayId: Array<string> | undefined = getStorage('likeArrayId', true) && JSON.parse(getStorage('likeArrayId', true))

    // 如果已经点赞return
    if (likeArrayId && likeArrayId.includes(params.value)) return

    if (detailResult.value) {
      const { data } = await updateLike({ _id: params.value })
      if (data.value?.result?.like) {
        // 更新最新点赞数
        detailResult.value.result.items.like = data.value.result.like
        // 没有点过赞 存储新数组
        if (!likeArrayId) {
          setStorage('likeArrayId', [params.value], true)
        // 点赞过 直接push
        } else {
          likeArrayId.push(params.value)
          setStorage('likeArrayId', likeArrayId, true)
        }
        isLike.value = true
      }
    }
  } catch (error) {
    console.log('setHeartState error:', error)
  }
}

// MdPreview 组件实例
const MdPreview = ref<ComponentPublicInstance<MdPreviewFn<ToTarget>> | null>(null)

const titleNavs = ref<Ititles[]>([])

const headerEl = ref<HTMLElement | null>(null)

const curLineIndex = ref('1')

const clickAnchor = ref(false)

// 设置锚点导航
const setAnchors = () => {
  // 找到所有h标签
  const anchors: Array<HTMLElement> = MdPreview.value?.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
  if (anchors.length === 0) return
  curLineIndex.value = anchors[0].getAttribute('data-v-md-line')!

  // 监听scroll 文章标题和标题导航联动
  const activeAnchor = useDebounceFn(() => {
    if (clickAnchor.value) return
    if (document.documentElement.scrollTop === 0) {
      curLineIndex.value = anchors[0].getAttribute('data-v-md-line')!
      return
    }

    // 存在于可视区的标题元素
    const visibleEl: Array<HTMLElement> = []
    // topEl用于判断 如果当前滚动位置没有标题导航(visibleEl.length === 0) 就找到当前位置顶部的所有元素
    const topEl: Array<HTMLElement> = []

    // 找到可视区和可视区外的标题元素
    anchors.forEach((el) => {
      const top = el.getBoundingClientRect().top
      if (top > 0 && top < window.innerHeight) {
        visibleEl.push(el)
      } else if (top < 0) {
        topEl.push(el)
      }
    })

    // 根据可视区内存在的标题数量 做不同的处理
    if (topEl.length === 0) {
      curLineIndex.value = anchors[0].getAttribute('data-v-md-line')!
      console.log('sdfdsfsdfsd')
    } else if (visibleEl.length === 0) {
      curLineIndex.value = topEl.at(-1)!.getAttribute('data-v-md-line')!
    } else if (visibleEl.length === 1) {
      curLineIndex.value = visibleEl[0].getAttribute('data-v-md-line')!
    } else if (visibleEl.length > 1) {
      curLineIndex.value = visibleEl.at(-1)!.getAttribute('data-v-md-line')!
    }
  }, 100)

  // 当前文章有标题时 监听scroll
  anchors.length > 0 && window.addEventListener('scroll', activeAnchor)

  // 在组件卸载之前移除scroll监听
  onBeforeUnmount(() => {
    // console.log('onBeforeUnmount')
    window.removeEventListener('scroll', activeAnchor)
  })

  // 过滤掉空内容的标题
  const titles = Array.from(anchors).filter(item => !!item.innerText.trim())
  if (!titles.length) {
    titleNavs.value = []
    return
  }
  // H标签去重并排序
  const hTags = Array.from(new Set(titles.map(v => v.tagName))).sort()

  headerEl.value = document.getElementsByTagName('header')[0]

  titleNavs.value = titles.map(el => ({
    title: el.innerText, // 标题
    lineIndex: el.getAttribute('data-v-md-line')!, // 获取标签在文章中的行数 用来跳转
    indent: hTags.indexOf(el.tagName), // 标题导航缩进值
  }))
}

// 锚点跳转事件
const anchorClick = (item: Ititles) => {
  const heading = MdPreview.value?.$el.querySelector(`[data-v-md-line="${item.lineIndex}"]`)
  if (heading) {
    clickAnchor.value = true
    curLineIndex.value = item.lineIndex

    // 根据MdPreview插件提供的scrollToTarget方法来做跳转
    MdPreview.value?.scrollToTarget({
      target: heading, // 目标元素
      scrollContainer: window,
      top: headerEl.value?.offsetHeight || 72, // 滚动位置 距离顶部的高度
    })
    // clickAnchor 用来处理滚动页面和点击标题导航联动位置不一致的问题
    setTimeout(() => {
      clickAnchor.value = false
    }, 300)
  }
}

onMounted(() => {
  try {
    // 获取点赞状态
    const likeArrayId: Array<string> | null = getStorage('likeArrayId', true) && JSON.parse(getStorage('likeArrayId', true))
    if (likeArrayId?.includes(params.value)) {
      isLike.value = true
    }
  } catch (error) {
    console.log('getStorge error:', error)
  }

  setAnchors()
})
</script>

<template>
  <div class="min-h-full">
    <!-- 详情banner -->
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

    <!-- 详情主体 -->
    <main class="relative mx-auto w-full px-2 container md:(max-w-4xl px-0)">
      <div class="absolute left-[calc((100%-950px-250px)/2)] top-32 hidden min-h-full md:(block)">
        <div class="sticky top-42 pr-4 space-y-4">
          <!-- <div>分享</div> -->
          <div class="flex cursor-pointer items-center" @click="setHeartState">
            <NuxtIcon v-if="isLike" name="heart" class="text-3xl" filled />
            <NuxtIcon v-else name="heart_hollow" class="text-3xl" filled />
            <span class="ml-4">{{ postItem?.like }} Likes</span>
          </div>
        </div>
      </div>
      <!-- 详情内容 -->
      <article>
        <v-md-preview ref="MdPreview" class="preview-wrap" :text="postItem?.content" />
      </article>

      <!-- 文章标题导航 -->
      <aside class="absolute right-[calc((100%-950px-550px)/2)] top-4 hidden min-h-full md:(block)">
        <ol class="sticky top-24 list-none pl-4 before:(absolute left-0 inline-block h-full w-[2px] bg-gray-100 content-['']) before:dark:(bg-gray-700)">
          <li
            v-for="(item) in titleNavs" :key="item.lineIndex"
            :style="{ padding: `0 0 0 ${item.indent * 10}px` }"
            @click="anchorClick(item)"
          >
            <a
              class="cursor-pointer select-none text-lg text-gray-600 before:(absolute left-0 inline-block h-[24px] w-[2px] bg-gray-100 content-['']) dark:(text-gray-100) before:dark:(bg-gray-700)"
              :class="{ 'before:(bg-amber-400)! text-amber-400!': curLineIndex === item.lineIndex }"
            >{{ item.title }}</a>
          </li>
        </ol>
      </aside>

      <!-- 上下篇推荐 -->
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
  </div>
</template>

<style>
.vuepress-markdown-body {
  @apply dark:(bg-trueGray-900);
}

.v-md-editor-preview h1,h2,h3,h4,h5,h6,table,p,code,ul,ol {
  @apply dark:(text-trueGray-50)
}
</style>
