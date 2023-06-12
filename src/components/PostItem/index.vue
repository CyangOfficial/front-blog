<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import type { PostItem } from '@/apis/post'

const _props = defineProps<{ item: PostItem }>()
// console.log(_props.item)
</script>

<template>
  <section class="mb-6 box-border w-full flex-col overflow-hidden rounded-lg bg-white shadow-post md:(mb-12 h-83 flex flex-row text-right) even:flex-row-reverse dark:bg-dark-post-bg even:text-left dark:shadow-darkPost">
    <!-- 文章封面 -->
    <NuxtLink :to="`/post/${item._id}`" class="group block h-48 overflow-hidden md:(h-full w-[31rem] flex-shrink-0)">
      <!-- <img class="h-full w-full object-cover transition duration-400 md:(group-hover:scale-106 group-hover:transform)" :src="item.posterUrl" alt="图片"> -->
    </NuxtLink>

    <!-- content box -->
    <div class="px-5 py-4 md:(flex-1 px-10 py-7)">
      <!-- 发布时间 -->
      <div class="text-xs text-gray-400 md:(text-sm) dark:(text-gray-300)">
        <NuxtIcon class="mr-2" name="time" filled />发布于：{{ useDateFormat(item.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
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
          <NuxtIcon class="mr-2" name="eye" filled />{{ item.pv }} 热度
        </div>
        <div class="flex-1 text-xs text-gray-400 md:(text-sm) dark:(text-gray-300)">
          <NuxtIcon class="mr-2" name="heart_hollow" filled />{{ item.like }} 喜欢
        </div>
        <div class="group flex-1 text-xs md:(text-sm)">
          <NuxtLink class="text-gray-400 no-underline dark:(text-gray-300) group-hover:text-amber-400" :to="`/search?tag=${item.tags[0]}`">
            <NuxtIcon class="mr-2" name="folder" filled />{{ item.tags[0] }}
          </NuxtLink>
        </div>
      </div>

      <!-- 文章简介 -->
      <p class="line-clamp-7 min-h-full text-gray-600 md:(line-clamp-5 min-h-[7.5rem]) dark:(color-gray-50)">
        {{ item.summary }}
      </p>

      <!-- 更多 -->
      <NuxtLink class="hidden text-3xl text-gray-700 no-underline md:(block) dark:(color-gray-50) hover:(text-amber-400)" to="#">
        <NuxtIcon class="" name="ellipsis" filled />
      </NuxtLink>
    </div>
  </section>
</template>

<!-- <style scoped>

</style> -->
