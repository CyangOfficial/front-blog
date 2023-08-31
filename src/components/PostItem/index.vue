<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import type { PostItem } from '@/apis/post'
import IconTime from '@/assets/icons/time.svg'
import IconEye from '@/assets/icons/eye.svg'
import IconHeartHollow from '@/assets/icons/heart_hollow.svg'
import IconFolder from '@/assets/icons/folder.svg'
import IconEllipsis from '@/assets/icons/ellipsis.svg'

const _props = defineProps<{ item: PostItem }>()

const observer = ref<ResizeObserver>()
// 图片懒加载
const imgLazyLoad = () => {
  const imgs = document.querySelectorAll('.poster-img')
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        const target = item.target as HTMLImageElement
        if (target.dataset.src) {
          target.src = target.dataset.src
        }
        target.removeAttribute('data-src')
        observer.value?.unobserve(item.target)
      }
    })
  })
  imgs.forEach(el => observer.value?.observe(el))
}
onMounted(imgLazyLoad)
</script>

<template>
  <section class="mb-6 box-border w-full flex-col overflow-hidden rounded-lg bg-white shadow-post md:(mb-12 h-83 flex flex-row text-right) even:flex-row-reverse dark:bg-dark-post-bg even:text-left dark:shadow-darkPost">
    <!-- 文章封面 -->
    <NuxtLink :to="`/post/${item._id}`" class="group block h-48 overflow-hidden md:(h-full w-[31rem] flex-shrink-0)">
      <img
        :data-src="item.posterUrl"
        :src="`${item.posterUrl}?imageView2/3/w/50|imageMogr2/blur/40x5`"
        class="poster-img"
        alt="图片"
      >
    </NuxtLink>

    <!-- content box -->
    <div class="px-5 py-4 md:(flex-1 px-10 py-7)">
      <!-- 发布时间 -->
      <div class="text-xs text-gray-400 md:(text-sm) dark:(text-gray-300)">
        <IconTime class="mr-2" filled />发布于：{{ item?.createdAt && useDateFormat(item.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
      </div>

      <!-- 标题 -->
      <NuxtLink class="text-gray-700 no-underline dark:(color-gray-50)" :to="`/post/${item._id}`">
        <h2 class="text-lg md:(text-xl) hover:(text-amber-400)">
          {{ item.title }}
        </h2>
      </NuxtLink>

      <!-- 文章热度/喜欢/分类 -->
      <div class="flex">
        <div class="flex-1 text-xs text-gray-400 md:(text-sm) dark:(text-gray-300)">
          <IconEye class="mr-2" filled />{{ item.pv }} 热度
        </div>
        <div class="flex-1 text-xs text-gray-400 md:(text-sm) dark:(text-gray-300)">
          <IconHeartHollow class="mr-2" filled />{{ item.like }} 喜欢
        </div>
        <div class="group flex-1 text-xs md:(text-sm)">
          <NuxtLink class="text-gray-400 no-underline dark:(text-gray-300) group-hover:text-amber-400" :to="`/search?tag=${item.tags[0]}`">
            <IconFolder class="mr-2" filled />{{ item.tags[0] }}
          </NuxtLink>
        </div>
      </div>

      <!-- 文章简介 -->
      <p class="line-clamp-7 min-h-full text-gray-600 md:(line-clamp-5 min-h-[7.5rem]) dark:(color-gray-50)">
        {{ item.summary }}
      </p>

      <!-- 更多 -->
      <NuxtLink class="hidden text-3xl text-gray-700 no-underline md:(block) dark:(color-gray-50) hover:(text-amber-400)" to="#">
        <IconEllipsis filled />
      </NuxtLink>
    </div>
  </section>
</template>

<style>
.poster-img {
  --uno: h-full w-full object-cover transition duration-400 md:(group-hover:scale-106 group-hover:transform);
}
</style>
