<script lang="ts" setup>
import release_img1 from '@/assets/images/blog-section-cover.jpg'
import release_img2 from '@/assets/images/admin-1.jpg'
import release_img3 from '@/assets/images/coding.jpg'
import IconNotice from '@/assets/icons/notice.svg'
import IconHot from '@/assets/icons/hot.svg'
import IconNew from '@/assets/icons/new.svg'
import IconLoading from '@/assets/icons/loading.svg'

const newRelease = ref([
  {
    href: 'https://github.com/CyangOfficial/nuxt-blog',
    title: 'Cyang Nuxt Blog',
    intro: '基于 Nuxt 实现的个人博客',
    img: release_img1,
  },
  {
    href: 'https://github.com/CyangOfficial/nuxt-blog',
    title: 'Admin Manager',
    intro: 'vue3.0 elementui-plus',
    img: release_img2,
  },
  {
    href: 'https://github.com/CyangOfficial/nuxt-blog',
    title: 'Nest Server',
    intro: '基于 express 的 Nest 框架',
    img: release_img3,
  },
])

const { getPost, getHomeCover } = useApi()

let postList = ref<any>([])
const postEnd = ref(false)
const pending = ref(false)
const params = reactive({ page: 1, pageSize: 5 })
// const { data } = await getPost({ query: { ...params } })

const [{ data: postData }, { data: coverData }] = await Promise.all([
  getPost({ query: { ...params } }),
  getHomeCover(),
])
postList = postData.value?.data.items
const coverList = coverData.value?.data || [] as any

const loadMore = async () => {
  pending.value = true
  params.page += 1
  const { data } = await getPost({ query: { ...params } })
  pending.value = false
  const items = data.value?.data.items as Array<any>
  postList.push(...items)

  if (items.length < params.pageSize) {
    postEnd.value = true
  }
}
</script>

<template>
  <div>
    <HomeBanner v-model:cover-list="coverList" />
    <section class="mx-auto px-3 container xl:max-w-4xl md:(px-0)">
      <!-- notice section -->
      <div
        class="mt-12 w-full border border-gray-600 rounded-lg border-dashed bg-trueGray-50 p-4 text-trueGray-500 dark:(border-gray-500 bg-darkBlue text-gray-50) md:(rounded-xl p-5)"
      >
        <IconNotice class="mr-4 align-middle text-2xl leading-4" filled />欢迎来到我的博客~
      </div>

      <UAlert title="Heads up!" />
      <UAvatar chip-color="primary" chip-text="" chip-position="top-right" size="sm" />

      <!-- section title -->
      <h2
        class="mb-8 mt-16 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
      >
        <IconHot class="mr-4 align-middle text-3xl leading-4" filled />New Release!
      </h2>

      <!-- New Release! -->
      <section class="hidden md:(flex justify-between)">
        <a
          v-for="item in newRelease"
          :key="item.href"
          :data-title="item.title"
          :data-intro="item.intro"
          class="group release-link" :href="item.href"
        >
          <img :src="item.img" :alt="item.title" class="h-full w-full">
          <!-- mask -->
          <div class="release-mask" />
        </a>
      </section>

      <!-- section title -->
      <h2
        class="mb-6 mt-12 border-b-1 border-gray-200 border-b-dashed pb-2 text-lg font-normal leading-4 text-gray-500 md:(mb-8 mt-16) dark:(text-gray-50)"
      >
        <IconNew class="mr-3 align-middle text-2xl leading-4 md:(mr-4 text-3xl)" filled />Latest Posts!
      </h2>
      <div class="mb-6">
        <PostItem v-for="item in postList" :key="item._id" :item="item" />
        <div class="flex-center text-center">
          <div
            v-show="!pending && !postEnd"
            class="w-28 cursor-pointer select-none border-1 border-gray-300 rounded-full border-solid leading-9 color-gray-600 md:(w-32 leading-11) hover:(border-yellow-400 shadow-moreBtn) dark:(color-gray-50)"
            @click="loadMore"
          >
            加载更多
          </div>
          <div v-show="postEnd">
            没有更多了~
          </div>
          <IconLoading v-show="pending && !postEnd" class="text-5xl" filled />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.release-link {
  --uno: relative mr-4 flex-1 overflow-hidden rounded-xl last:(mr-0) no-underline text-center h-44 shadow before:(content-[attr(data-title)] w-full leading-[2.8rem] absolute left-72 index-10 bg-black top-6 color-white transition-all duration-400 linear z-10) after:(content-[attr(data-title)] w-full italic absolute bottom-6 z-10 -left-72 transition-all duration-400 linear text-gray-300 text-base) hover:(before:(left-0) after:(left-0))
}

.release-mask {
  --uno: index-10 absolute left-0 top-0 h-full w-full bg-black bg-opacity-0 text-center group-hover: (bg-opacity-50 before:(left-0));
}
</style>
