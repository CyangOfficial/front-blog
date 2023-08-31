<script setup lang="ts">
// type Exclude<T, U> = T extends U ? never : T
// type A = Exclude<'key1' | 'key2', 'key2'>
// key1 extends key2 ? never : key1
// key2 extends key2 ? never : key1
import IconRanking from '@/assets/icons/ranking.svg'
import IconTag from '@/assets/icons/tag1.svg'

const { $isDesktop } = useNuxtApp()
const toast = useToast()

const params = reactive({ page: 1, pageSize: 5 })
const { getPost, getHotPost, getAllTags } = useApi()

const [{ data: postResult, pending, error: postErr }, { data: hotResult, pending: hotPending, error: hotErr }, { data: tagsResult, pending: tagPending, error: tagErr }] = await Promise.all([
  getPost({ key: `post-${params.page}`, query: params }),
  getHotPost(),
  getAllTags(),
])

toast.add({
  id: 'update_downloaded',
  // title: 'Update downloaded.',
  color: 'red',

  description: '网络错误，请稍后重试！',
  icon: 'i-octicon-desktop-download-24',
  timeout: 0,
  ui: {
    position: 'fixed top-0 right-0',
    background: 'bg-red dark:(bg-white)',
    color: 'white',
  },
})

if (process.client) {
  // $toast({
  //   type: 'danger',
  //   message: errData.message,
  // })
}

[postErr, hotErr, tagErr].forEach((error) => {
  const errData = error.value
  // console.log({ errData })
  if (errData) {
    pending.value = true
    hotPending.value = true
    tagPending.value = true
    if (process.client) {
      // $toast({
      //   type: 'danger',
      //   message: errData.message,
      // })
    }
    // process.client && $toast.fire(errData.message)
    // throw createError({
    //   statusCode: errData.statusCode,
    //   // statusMessage: baseURL + url,
    //   message: errData.message || '服务器内部错误',
    //   fatal: true,
    // })
  }
})

const changePage = async (value: number) => {
  params.page = value
}
watch(() => pending.value, (val) => {
  if (!val) {
    window.scrollTo({
      top: 0,
    })
  }
})
</script>

<template>
  <div>
    <!-- <UAlert title="test" description="You can add components to your app using the cli." /> -->

    <CommonBanner title="文 章" img-name="Attack-on-Titan.jpg" />
    <div class="mx-auto mt-14 flex px-3 container xl:max-w-7xl md:(px-0)">
      <!-- 文章 -->
      <div class="w-full md:(mb-16 mr-10 w-224)">
        <PostItem v-for="item in postResult?.data.items" v-show="!pending" :key="item._id" :item="item" />
        <ProfilePostItem v-for="item in 4" v-show="pending" :key="item" />
        <!-- <div v-show="false" class="flex-center text-center">
          <div
            v-show="!pending && !postOut"
            class="w-32 cursor-pointer select-none border-1 border-gray-300 rounded-full border-solid leading-11 color-gray-600 hover:(border-yellow-400 shadow-moreBtn) dark:(color-gray-50)"
            @click="loadMore"
          >
            加载更多
          </div>
          <div v-show="postOut">
            没有更多了~
          </div>
          <NuxtIcon v-show="pending && !postOut" name="loading" class="text-5xl" filled />
        </div> -->
        <Pagination
          :total="postResult?.data.total" :current-page="params.page" :page-size="params.pageSize"
          @current-change="changePage"
        />
      </div>

      <!-- 右边栏目 -->
      <div v-if="$isDesktop" class="hidden flex-1 md:(block)">
        <!-- <div class="border-2 border-red-200 border-style-solid rounded-full w-6 h-6 flex items-center justify-center"></div> -->
        <h2
          class="mb-8 mt-0 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
        >
          <IconRanking class="mr-4 align-middle text-3xl leading-4" filled />排行榜
        </h2>
        <div>
          <MiniCard v-for="item in hotResult?.data.items" :key="item._id" :item="item" />
        </div>
        <h2
          class="mb-5 mt-0 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
        >
          <IconTag class="mr-4 align-middle text-3xl leading-4" filled />标签云
        </h2>
        <div class="flex flex-wrap">
          <NuxtLink
            v-for="item in tagsResult?.data.tags" :key="item" :to="`/search?tag=${item}`"
            class="mb-2.5 mr-2.5 block select-none rounded bg-emerald-600/10 px-1.5 text-sm leading-6 color-emerald-600 no-underline hover:(bg-emerald-600/20)"
          >
            {{ item }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
