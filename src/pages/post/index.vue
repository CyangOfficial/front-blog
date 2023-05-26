<script setup lang="ts">
const postList = ref<any>([])
// const pending = ref(false)
const postOut = ref(false)
const params = reactive({ page: 1, pageSize: 5 })

// const { data } = await useFetch(() => 'http://localhost:4000/api/post', {
//   key: `post-${params.page}`,
//   params,
// })

// 服务端获取数据
const [{ data: postResult, pending }, { data: hotResult }] = await Promise.all([
  getPost({}, { key: `post-${params.page}`, query: params }),
  getHotPost(),
  // getAllTags(),
])

watch(() => postResult, () => {
  console.log('rfsdfdsfsd')
})

console.log('postResult', postResult.value)

const total = ref(postResult.value.result.total)
// const tags = ref(tagsResult.value.result.tags)
const tags = ref([])
const hotList = ref(hotResult.value.result.items)
postList.value = postResult.value.result.items

// 加载更多
function loadMore() {
  if (params.page < Math.ceil(total / params.pageSize)) {
    params.page++
    fetchPost()
  } else {
    postOut.value = true
  }
}

// 客户端加载数据
async function fetchPost() {
  pending.value = true
  const { result } = await getPost(params, { server: false })
  postList.value = result.items
  pending.value = false
}

const changePage = async (value: number) => {
  params.page = value
  // pending.value = false
  // refresh()
  // fetchPost()

  window.scrollTo({
    top: 0,
  })
}
</script>

<template>
  <div class="">
    <CommonBanner title="文 章" img-name="Attack-on-Titan.jpg" />
    <div class="mx-auto mt-14 flex px-3 container xl:max-w-7xl md:(px-0)">
      <!-- 文章 -->
      <div v-if="postResult?.result" class="w-full md:(mb-16 mr-10 w-224)">
        <PostItem v-for="item in postResult.result.items" v-show="!pending" :key="item._id" :item="item" />
        <ProfilePostItem v-for="item in 4" v-show="pending" :key="item" />
        <div v-show="false" class="flex-center text-center">
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
        </div>
        <Pagination
          :total="20" :current-page="params.page" :page-size="params.pageSize"
          @current-change="changePage"
        />
      </div>

      <!-- 右边栏目 -->
      <div class="hidden flex-1 md:(block)">
        <h2
          class="mb-8 mt-0 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
        >
          <NuxtIcon name="ranking" class="mr-4 align-middle text-3xl leading-4" filled />排行榜
        </h2>
        <div>
          <NuxtLink
            v-for="item in hotList" :key="item" to="/post/123"
            class="relative mb-4 box-border block overflow-hidden rounded-lg no-underline"
          >
            <div class="absolute inset-0 bg-[url(@/assets/images/post-cover.jpg)] bg-cover blur-md" />
            <div class="relative flex-between bg-gray-100/80 p-3.5 dark:(bg-gray-800/70)">
              <div>
                <span class="block text-lg text-trueGray-500 dark:(text-trueGray-100)">{{ item.title }}</span>
                <span class="mt-2 block text-trueGray-400 dark:(text-trueGray-300)">https://www.cyang.com</span>
              </div>
              <div class="w-16 overflow-hidden rounded-lg">
                <img class="h-full w-full object-cover" :src="item.posterUrl" alt="封面">
              </div>
            </div>
          </NuxtLink>
        </div>
        <h2
          class="mb-5 mt-0 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
        >
          <NuxtIcon name="tag1" class="mr-4 align-middle text-3xl leading-4" filled />标签云
        </h2>
        <div class="flex flex-wrap">
          <NuxtLink
            v-for="item in tags" :key="item" :to="`/search?tag=${item}`"
            class="mb-2.5 mr-2.5 block select-none rounded bg-emerald-600/10 px-1.5 text-sm leading-6 color-emerald-600 no-underline hover:(bg-emerald-600/20)"
          >
            {{ item }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
