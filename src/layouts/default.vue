<!-- eslint-disable unicorn/prefer-node-protocol -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nanoid } from 'nanoid'
import IconMsun from '@/assets/icons/m_sun.svg'
import IconMmoon from '@/assets/icons/m_moon.svg'
import IconBackUp from '@/assets/icons/back_up.svg'

const { getMusicList } = useApi()
const { y } = useWindowScroll()
const { $isDesktop, $isMobile } = useNuxtApp()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const mainStore = useMainStore()
const { openSidebar } = storeToRefs(mainStore)

const params = { page: 1, pageSize: 20 }
const { data } = await getMusicList({ query: params, lazy: true })
const musicList = data.value?.data.items || []
// mainStore.fetchMusciList() // 使用pinia会出现 pages useFetch触发两次的BUG

const main = ref<HTMLElement | null>()
const isLocked = useScrollLock(main)
watch(openSidebar, async (newValue) => {
  isLocked.value = newValue
})

function scrollTo() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const generateUUID = () => {
  const uuidMaxAge = 60 * 60 * 24 * 365
  const uuid = useCookie<string>('visitorId', { maxAge: uuidMaxAge })
  if (!uuid.value) {
    uuid.value = nanoid()
  }
  return uuid.value
}

const sendGifInfo = async () => {
  const { public: { baseURL } } = useRuntimeConfig()
  // mainStore.generateVisitorId().then((result: any) => {
  //   console.log({result})
  //   const uuidMaxAge = 60 * 60 * 24 * 365 // 每次请求前都会生成visitorId所以时间加不加都一样
  //   const visitorId = useCookie<string>('client_uuid', { maxAge: uuidMaxAge })
  //   console.log({ result })
  //   visitorId.value = result.visitorId
  //   // const perfEntries = performance.getEntriesByType('navigation')
  //   // const [p] = perfEntries
  //   // console.log({ p })
  //   // const pageLoadTime = p.loadEventEnd - p.loadEventStart
  //   // console.log({ pageLoadTime })

  generateUUID()
  const img = new Image(1, 1)
  const params: any = new URLSearchParams()
  params.append('eventType', 'pageInit')
  params.append('url', window.location.href)
  params.append('time', Date.now())

  img.src = `${baseURL}/app/record/t.gif?${params.toString()}`
  img.onload = () => {
    console.log('埋点上报')
  }
  //   // console.log(performance.connectEnd)
  // }).catch((err: Error) => {
  //   console.log(`generate visitorId error: ${err}`)
  // })
}
if (process.client) {
  document.addEventListener('touchstart', () => { }, false)
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon('/api', '123')
  // } else {
  //   fetch(url)
  // }
  sendGifInfo()
}
// mainStore.fetchMusciList()
</script>

<template>
  <div ref="main" class="w-full dark:(bg-trueGray-900)">
    <NuxtLoadingIndicator />

    <Aplayer v-if="musicList.length > 0" v-model:music-list="musicList" />

    <!-- 移动端 侧边栏 -->
    <Aside v-if="$isMobile" />

    <!-- 移动端 右下角切换 -->
    <div class="fixed bottom-8 right-4 z-80 box-border transform border border-transparent md:(hidden)">
      <!-- 主题切换 -->
      <div class="mb-4 h-10 w-10 flex-center select-none rounded bg-gray-50 shadow-md" @click="toggleDark()">
        <IconMsun :class="{ hidden: !isDark }"
          class="inline-block fill-blue-500 align-middle text-2xl text-gray-500 theme-animation" filled />
        <IconMmoon :class="{ hidden: isDark }"
          class="inline-block fill-blue-500 align-middle text-2xl text-gray-500 theme-animation" filled />
      </div>

      <!-- mobile 回到顶部 -->
      <div v-if="$isMobile" class="z-50 h-10 w-10 flex-center select-none rounded bg-gray-50 shadow-md" @click="scrollTo">
        <IconBackUp class="inline-block fill-blue-500 align-middle text-xl text-gray-500 theme-animation" filled />
      </div>
    </div>

    <!-- PC 回到顶部 -->
    <div v-if="$isDesktop" class="cat top-[-70vh] bg-[url(~/assets/images/scroll.png)]"
      :class="{ 'top-[-70vh]': y < 500, '!top-0': y > 500 }" @click="scrollTo" />
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  filter: blur(1rem);
  opacity: 0;
}

.cat {
  @apply fixed right-16 h-[70vh] w-[4.67rem] transition-all duration-400 linear hidden md: (display: block) animate-[float_2s_infinite_linear] cursor-pointer bg-cover bg-center-bottom bg-no-repeat z-30;
}
</style>

<!-- <style lang="scss">
html[class="dark"] {
  @include meta.load-css("highlight.js/styles/a11y-dark")
}
</style> -->
