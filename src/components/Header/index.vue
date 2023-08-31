<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import IconHouse from '@/assets/icons/house.svg'
import IconPost from '@/assets/icons/post.svg'
import IconArchive from '@/assets/icons/archive.svg'
import IconPerson from '@/assets/icons/person.svg'
import IconMoon from '@/assets/icons/moon.svg'
import IconSun from '@/assets/icons/sun.svg'
import IconMenu from '@/assets/icons/menu.svg'
import IconSearch from '@/assets/icons/search.svg'
import IconTag1 from '@/assets/icons/tag1.svg'

const { $isMobile, $isDesktop } = useNuxtApp()
const { getAllTags } = useApi()

// import { useMainStore } from '@/stores'
// import NuxtIcons from 'nuxt-icons'

// const { y } = useWindowScroll()

const tags = ref([])
if ($isMobile) {
  const { data } = await getAllTags()
  tags.value = data.value?.data.tags
}

const mainStore = useMainStore()
function open() {
  mainStore.setSidebar(true)
}

// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)

console.log('isDark', isDark.value)

const isSearch = ref(false)

// 搜索
const inputSearch = ref<HTMLElement | null>()
const keyword = ref('')
const searchPost = async () => {
  if (keyword.value.trim() === '') return
  await navigateTo({
    path: '/search',
    query: {
      keyword: keyword.value,
    },
  }, {
    replace: true,
    // external: true,
  })
  isSearch.value = false
  keyword.value = ''
  inputSearch.value?.blur()
}

const mobileSearch = async () => {
  isSearch.value = true
  inputSearch.value?.focus()
}

// const header = ref(null)
// const isLocked = useScrollLock(header)
// isLocked.value = true
</script>

<template>
  <header
    ref="header"
    class="fixed left-0 top-0 z-60 box-border w-full bg-white/60 px-4 shadow-lg backdrop-blur theme-animation dark:bg-trueGray-800/80 md:(bg-white/90 px-10 backdrop-blur-none dark:bg-black/90)"
    :class="{ 'backdrop-blur-none shadow-none !bg-white dark:(!bg-gray-800 border-gray-600) border-b border-b-solid border-gray-200': isSearch }"
  >
    <!-- <div>{{ y }}</div> -->
    <nav class="h-13 flex items-center justify-between md:(h-18)">
      <!-- mobile 菜单按钮 -->
      <div class="text-trueGray-700 md:(hidden) dark:(text-gray-50)" @click="open">
        <IconMenu class="text-3xl" filled />
      </div>

      <div class="md:(hidden)">
        <NuxtLink class="select-none text-xl font-bold text-trueGray-700 no-underline dark:(text-gray-50)" to="/">
          YANG的小站
        </NuxtLink>
      </div>

      <!-- 网站logo -->
      <NuxtLink
        to="/"
        class="hidden h-[50px] w-[230px] bg-[url(@/assets/images/blog-logo.png)] bg-cover bg-no-repeat md:(block)"
      />

      <!-- pc 菜单 -->
      <div class="h-full flex items-center">
        <div class="mr-8 hidden h-full whitespace-nowrap md:(flex items-center) space-x-10">
          <NuxtLink to="/" class="group nav-link">
            <!-- <NuxtIcon class="svg-style" name="house" filled />首页 -->
            <IconHouse class="svg-style" />首页
          </NuxtLink>
          <NuxtLink to="/post" class="group nav-link">
            <IconPost class="svg-style" />文章
          </NuxtLink>
          <NuxtLink to="/archive" class="group nav-link">
            <IconArchive class="svg-style" />归档
          </NuxtLink>
          <NuxtLink to="/" class="group nav-link">
            <IconPerson class="svg-style" />关于
          </NuxtLink>
        </div>

        <!-- 移动端搜索按钮 -->
        <button type="button" class="cursor-pointer border-transparent bg-transparent md:(hidden)" @click="mobileSearch">
          <IconSearch
            class="mr-1.5 inline-block fill-blue-500 align-middle text-3xl text-trueGray-700 dark:(text-gray-50) md:(text-gray-500 dark:text-gray-200)"
          />
        </button>

        <!-- PC搜索框 -->
        <form v-if="$isDesktop" class="relative mr-4 hidden h-11 w-65 border-1 border-gray-700 rounded border-solid md:(flex) dark:(border-gray-50 color-gray-50)" @submit.prevent="searchPost">
          <button class="absolute left-1 top-0 h-full cursor-pointer border-0 bg-transparent outline-0">
            <IconSearch
              class="fill-blue-500 align-middle text-xl text-trueGray-700 dark:(text-gray-50) md:(text-gray-500 dark:text-gray-200)"
            />
          </button>
          <input
            v-model="keyword"
            type="search"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="请输入关键字..."
            class="placeholder:text-gray-black h-full w-full border-0 bg-transparent px-2 pl-10 text-base outline-0 dark:(color-gray-50 placeholder:text-white)"
          >
        </form>

        <!-- <button type="button" class="hidden cursor-pointer border-transparent bg-transparent md:(block)">
          <NuxtIcon
            class="mr-1.5 inline-block fill-blue-500 align-middle text-3xl text-trueGray-700 dark:(text-gray-50) md:(text-gray-500 dark:text-gray-200)"
            name="search" filled
          />
        </button> -->

        <!-- PC主题切换按钮 -->
        <button
          v-if="$isDesktop"
          type="button"
          border="box 2 white solid dark:dark-header-btn"
          bg="gradient-to-b dark:sky"
          class="hidden h-12 w-30 cursor-pointer items-center overflow-hidden rounded-3xl from-sky-800 to-sky-400 px-2 theme-animation md:(flex flex-between) dark:(from-sky-1000 to-sky-950)"
          @click="toggleDark()"
        >
          <!-- <ClientOnly fallback-tag="div" fallback="loading svg"> -->
          <IconSun
            :class="{ 'transform-gpu translate-y-0': !isDark, 'transform-gpu translate-y--50': isDark }"
            class="mr-1.5 inline-block fill-blue-500 align-middle text-2xl text-gray-500 theme-animation md:(text-3xl)"
            filled
          />
          <IconMoon
            :class="{ 'transform-gpu translate-y-0': isDark, 'transform-gpu translate-y--50': !isDark }"
            class="inline-block fill-blue-500 align-middle text-2xl text-gray-500 theme-animation md:(text-3xl)"
            filled
          />
          <!-- </ClientOnly> -->
        </button>
      </div>
    </nav>
  </header>

  <!-- 移动端 搜索层 -->
  <div
    v-if="$isMobile"
    class="linear fixed left-0 top-13 z-50 w-full transform-gpu bg-white px-4 py-4 transition duration-300 md:(hidden) -translate-y-100 dark:(bg-gray-800)"
    :class="{ 'translate-y-0': isSearch }"
  >
    <div>
      <form class="h-9 flex-center" action="javascript: void(0)" @submit.prevent="searchPost">
        <input
          ref="inputSearch"
          v-model="keyword"
          type="search"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="请输入关键字..."
          class="h-full w-full border-1 border-transparent rounded-r-none rounded-bl-3xl rounded-tl-3xl border-solid border-r-none bg-gray-200/40 px-2 text-base outline-none focus:(border-amber-400 outline-none) dark:(bg-gray-100/20 color-gray-50 placeholder-white) !focus:bg-transparent"
        >
        <button type="submit" class="h-full w-14 whitespace-nowrap rounded-br-3xl rounded-tr-3xl border-none bg-amber-400 p-0 text-center text-base color-white outline-none">
          搜索
        </button>
      </form>
    </div>
    <h2
      class="mb-2 mt-4 border-b-1 border-gray-200 border-b-dashed pb-1 text-base font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
    >
      <IconTag1 class="mr-2 align-middle text-xl leading-4" filled />标签搜索
    </h2>
    <!-- <ClientOnly> -->
    <div class="flex flex-wrap">
      <NuxtLink
        v-for="item in tags" :key="item" :to="`/search?tag=${item}`"
        class="mb-2.5 mr-2.5 block select-none rounded bg-emerald-600/10 px-1.5 text-sm leading-6 color-emerald-600 no-underline hover:(bg-emerald-600/20)"
        @click="isSearch = false"
      >
        {{ item }}
      </NuxtLink>
    </div>
    <!-- </ClientOnly> -->
  </div>
  <!-- header search mask -->
  <div class="linear invisible fixed z-40 h-full w-full bg-black/0 backdrop-blur transition duration-300 md:(hidden)" :class="{ 'bg-black/30 !visible': isSearch }" @click="isSearch = false" />
</template>

<style>
.nav-link {
  --uno: theme-animation relative text-gray-500 no-underline after: (absolute)
  dark:text-gray-50 block h-full flex-center before:(content-[""] theme-animation w-0 h-1.5 bg-amber-400 absolute bottom-0 left-0) hover:(before:w-full text-amber-400);
}

.svg-style {
  --uno: theme-animation mb-1 mr-1.5 inline-block fill-blue-500 align-middle text-xl text-gray-500 dark:text-white group-hover:(text-amber-400 animate-[shaking_5s_ease_infinite]);
}
</style>
