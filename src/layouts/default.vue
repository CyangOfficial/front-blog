<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { y } = useWindowScroll()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const mainStore = useMainStore()
const { openSidebar } = storeToRefs(mainStore)

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
if (process.client) {
  document.addEventListener('touchstart', () => {}, false)
}
</script>

<template>
  <div ref="main" class="w-full pt-1 dark:(bg-trueGray-900)">
    <NuxtLoadingIndicator />

    <!-- <Aplayer /> -->

    <!-- 移动端 侧边栏 -->
    <Aside />

    <!-- 移动端 右下角切换 -->
    <div class="fixed bottom-8 right-4 z-80 box-border transform border border-transparent md:(hidden)">
      <!-- 主题切换 -->
      <div class="mb-4 h-10 w-10 flex-center select-none rounded bg-gray-50 shadow-md" @click="toggleDark()">
        <NuxtIcon
          :class="{ hidden: !isDark }"
          class="inline-block fill-blue-500 align-middle text-2xl text-gray-500 theme-animation" name="m_sun"
          filled
        />
        <NuxtIcon
          :class="{ hidden: isDark }"
          class="inline-block fill-blue-500 align-middle text-2xl text-gray-500 theme-animation" name="m_moon"
          filled
        />
      </div>

      <!-- mobile 回到顶部 -->
      <div class="z-50 h-10 w-10 flex-center select-none rounded bg-gray-50 shadow-md" @click="scrollTo">
        <NuxtIcon
          class="inline-block fill-blue-500 align-middle text-xl text-gray-500 theme-animation" name="back_up"
          filled
        />
      </div>
    </div>

    <!-- PC 回到顶部 -->
    <div class="cat top-[-70vh] bg-[url(~/assets/images/scroll.png)]" :class="{ 'top-[-70vh]': y < 500, '!top-0': y > 500 }" @click="scrollTo" />
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
  @apply fixed right-16 h-[70vh] w-[4.67rem]
  transition-all duration-400 linear hidden md:(display: block)
  animate-[float_2s_infinite_linear] cursor-pointer
  bg-cover bg-center-bottom bg-no-repeat z-30;
}
</style>
