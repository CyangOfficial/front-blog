<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconClose from '@/assets/icons/close.svg'
import IconGithub from '@/assets/icons/github.svg'
import IconHouse from '@/assets/icons/house.svg'
import IconPost from '@/assets/icons/post.svg'
import IconArchive from '@/assets/icons/archive.svg'
import IconAbout from '@/assets/icons/about.svg'

// const props = defineProps<{
//   open: boolean
// }>()
const categoryList = ref([
  { name: '文章', total: 0 },
  { name: '标签', total: 0 },
  { name: '标签2', total: 0 },
])
const navList = ref([
  { name: '首页', iconName: IconHouse, to: '/' },
  { name: '文章', iconName: IconPost, to: '/post' },
  { name: '归档', iconName: IconArchive, to: '/archive' },
  { name: '关于', iconName: IconAbout },
])
const { getAppInfo } = useApi()
const { data } = await getAppInfo()
categoryList.value[0].total = data.value?.data.postCount
categoryList.value[1].total = data.value?.data.tagCount

const mainStore = useMainStore()
const { openSidebar } = storeToRefs(mainStore)
function close() {
  mainStore.setSidebar(false)
}
</script>

<template>
  <div class="bg-transparent">
    <div
      class="linear fixed top-0 z-80 box-border h-screen w-60 bg-white py-5 transition-left duration-400"
      :class="{ 'left-0': openSidebar, '-left-80': !openSidebar }"
    >
      <div class="bold absolute right-2 top-2 text-3xl" @click="close">
        <IconClose name="close" filled />
      </div>
      <div class="flex flex-col items-center">
        <div class="w-32 overflow-hidden rounded-full shadow-xl">
          <img src="@/assets/images/avatar.jpg" alt="头像">
        </div>
        <h2 class="mb-1 text-base font-medium">
          Cyang Official Blog
        </h2>
        <h2 class="mt-0 text-base font-medium text-trueGray-400">
          楊的博客 &amp; 编程笔记
        </h2>
        <div class="flex flex-center">
          <div
            v-for="item in categoryList" :key="item.name"
            class="after:scaleX-50 relative px-3.5 text-center after:(absolute bottom-0 right-0 block h-full w-[1px] scale-x-50 bg-gray-300 content-['']) last:(after:hidden)"
          >
            <NuxtLink class="text-gray-500 no-underline" to="/">
              <div class="text-lg font-bold leading-5">
                {{ item.total }}
              </div>
              <div class="leading-5">
                {{ item.name }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="mb-8 mt-4 flex-center text-3xl">
        <IconGithub class="mr-2" filled />
        <IconGithub class="mr-2" filled />
        <IconGithub class="mr-2" filled />
        <IconGithub class="" filled />
      </div>
      <div class="text-center">
        <NuxtLink v-for="item in navList" :key="item.name" :to="item.to" class="mb-6 block text-xl text-gray-700 no-underline active:(text-amber-400)" @click="close">
          <!-- <NuxtIcon class="mr-2 align-baseline" :name="item.iconName" filled />{{ item.name }} -->
          <component :is="item.iconName" :key="item.name" class="mb-1 mr-2" />{{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-show="openSidebar" class="mask fixed z-70 h-full w-full bg-black/50" @click="close" />
</template>

<style lang="scss"></style>
