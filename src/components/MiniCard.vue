<script setup lang="ts">
import type { PostItem } from '@/apis/post'

const _props = defineProps<{ item: PostItem }>()
</script>

<template>
  <div>
    <NuxtLink
      :to="`/post/${item._id}`"
      class="relative mb-4 box-border block overflow-hidden rounded-lg no-underline"
    >
      <div class="absolute inset-0 bg-cover blur-md" :style="{ 'background-image': `url(${item.posterUrl})` }" />
      <div class="relative flex-between bg-gray-100/80 p-3.5 dark:(bg-gray-800/70)">
        <div class="flex-1 pr-2">
          <div class="block text-lg text-trueGray-500 dark:(text-trueGray-100)">
            {{ item.title }}
          </div>
          <div class="line-clamp-1 mt-2 w-full text-sm text-trueGray-400 dark:(text-trueGray-300)">
            {{ item.summary }}
          </div>
        </div>
        <div class="h-16 w-16 overflow-hidden rounded-lg">
          <img class="h-full w-full object-cover" :src="item.posterUrl" alt="封面">
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
