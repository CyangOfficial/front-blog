<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
// import type { PostItem } from '@/types'

const route = useRoute()

const _id = route.params?.id as string
const [{ result: postDetail, result: updateResult }] = await Promise.all([
  getItemPost({ _id }),
  updatePv({ _id }),
])
// const { result } = await getItemPost({ _id })
console.log(postDetail)
const postItem = postDetail.items
// route.params?.id

// if (!product.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
// }
</script>

<template>
  <div class="relative h-72 overflow-hidden bg-[url(@/assets/images/post-top-bg.jpg)] bg-cover bg-no-repeat before:(absolute inset-0 bg-black/30 content-['']) md:(h-114)">
    <div class="[text-shadow:_2px_2px_10px_#000000] relative mx-auto mt-74 w-195 text-gray-100">
      <h2 class="text-4xl">
        {{ postItem.title }}
      </h2>
      <div>
        <span class="mr-4">发布于：{{ useDateFormat(postItem.createdAt, 'YYYY-MM-DD HH:mm:ss') }}</span>
        <span class="mr-4">浏览量：{{ postItem.pv }}</span>
        <span class="mr-4">喜欢：{{ postItem.like }}</span>
      </div>
    </div>
  </div>
  <main>
    <article class="mx-auto container md:max-w-4xl">
      <v-md-preview :text="postItem.content" />
      <!-- <p v-for="item in 30">
        test
      </p> -->
    </article>
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
