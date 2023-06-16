<script setup lang="ts">
const route = useRoute()
const { searchPost, getAllTags, getHotPost, searchPostByTag } = useApi()

const searchParams = reactive({ keyword: route.query?.keyword, page: 1, pageSize: 5 })
const tagParams = reactive({ tag: route.query?.tag, page: 1, pageSize: 5 })

const [{ data: postResult, pending }, { data: tagResult, pending: tagPending }, { data: tagsResult }, { data: hotResult }] = await Promise.all([
  searchPost({ key: `${route.query.keyword}`, query: searchParams }),
  searchPostByTag({ key: `${route.query.tag}`, query: tagParams }),
  getAllTags(),
  getHotPost(),
])

const changePage = (page: number) => {
  if (route.query?.keyword) {
    searchParams.page = page
  } else if (route.query?.tag) {
    tagParams.page = page
  }
}
const dataResult = computed(() => {
  if (route.query?.keyword) {
    return postResult
  } else if (route.query?.tag) {
    return tagResult
  }
})

const pagination = computed(() => {
  if (route.query?.keyword) {
    return searchParams
  } else if (route.query?.tag) {
    return tagParams
  }
})

// 监听搜索关键字
const stopKeyword = watch(() => route.query.keyword, (newKeyword) => {
  if (!newKeyword || !route.query?.keyword) return
  searchParams.page = 1
  searchParams.keyword = newKeyword as string
})

// 监听标签
const stopTag = watch(() => route.query.tag, (newTag) => {
  if (!newTag || !route.query?.tag) return
  tagParams.tag = newTag as string
  tagParams.page = 1
})

const stopPending = watch([pending, tagPending], ([nPending], [nTagPending]) => {
  if (!nPending || !nTagPending) {
    window.scrollTo({
      top: 0,
    })
  }
})

onBeforeUnmount(() => {
  stopKeyword()
  stopTag()
  stopPending()
})
</script>

<template>
  <div class="mx-auto mt-20 flex px-4 container md:(mt-30 px-0) xl:max-w-7xl">
    <div class="min-h-[calc(100vh_-_9.3rem)] w-full md:(mr-10 min-h-[calc(100vh_-_12rem)] w-224)">
      <!-- 搜索状态 -->
      <div v-show="!pending && route.query?.keyword" class="mb-8 text-center text-2xl text-gray-800 dark:(text-gray-50)">
        找到关于<span class="text-amber-500">&nbsp;{{ searchParams.keyword }}&nbsp;</span>的<span class="text-amber-500">&nbsp;{{
          postResult?.result.total }}&nbsp;</span>条记录
      </div>
      <div v-show="!tagPending && route.query?.tag" class="mb-8 text-center text-2xl text-gray-800 dark:(text-gray-50)">
        当前标签：<span class="text-amber-500">{{ tagParams.tag }}</span>
      </div>
      <div v-show="pending || tagPending" class="mb-8 text-center text-2xl text-gray-800 dark:(text-gray-50)">
        努力搜索中...
      </div>

      <!-- 文章列表/骨架屏 -->
      <PostItem v-for="item in dataResult?.value?.result.items" v-show="!pending && !tagPending" :key="item._id" :item="item" />
      <ProfilePostItem v-for="item in 2" v-show="pending || tagPending" :key="item" />

      <!-- 无法数据提示icon -->
      <div v-show="(postResult?.result.total === 0 && !pending && route.query?.keyword) || (tagResult?.result.total === 0 && !tagPending && route.query?.tag)" class="mt-2/6 h-full text-center md:(mt-40)">
        <NuxtIcon
          name="empty_box" class="mr-2 block align-middle text-9xl leading-4 text-gray-500 dark:(text-gray-50)"
          filled
        />
        <span class="text-xl text-gray-500 dark:(text-gray-50)">{{ route.query?.keyword ? '未找到相关文章...' : '未找到相关标签...' }}</span>
      </div>

      <!-- 分页 -->
      <!-- v-show="(postResult?.result.total > 0 && !pending) || (tagResult?.result.total > 0 && !tagPending)" -->
      <Pagination
        v-show="(postResult?.result.total > 0 && !pending) || (tagResult?.result.total > 0 && !tagPending)"
        :hide-on-single-page="true"
        :total="dataResult?.value?.result.total" :current-page="pagination?.page" :page-size="pagination?.pageSize"
        @current-change="changePage"
      />
    </div>

    <!-- 右边栏 -->
    <div class="hidden md:(block flex-1)">
      <h2
        class="mb-8 mt-0 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
      >
        <NuxtIcon name="hot" class="mr-2 align-middle text-2xl leading-4" filled />热门文章
      </h2>
      <MiniCard v-for="item in hotResult?.result.items" :key="item._id" :item="item" />
      <h2
        class="mb-5 mt-0 hidden border-b-1 border-gray-200 border-b-dashed pb-2 text-xl font-normal leading-4 text-gray-500 md:(block) dark:(text-gray-50)"
      >
        <NuxtIcon name="tag1" class="mr-4 align-middle text-3xl leading-4" filled />标签云
      </h2>
      <div class="flex flex-wrap">
        <NuxtLink
          v-for="item in tagsResult?.result.tags" :key="item" :to="`/search?tag=${item}`"
          class="mb-2.5 mr-2.5 block select-none rounded bg-emerald-600/10 px-1.5 text-sm leading-6 color-emerald-600 no-underline hover:(bg-emerald-600/20)"
        >
          {{ item }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
