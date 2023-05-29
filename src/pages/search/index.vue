<script setup lang="ts">
const route = useRoute()
const { searchPost, getAllTags, getHotPost, searchPostByTag } = useApi()

const keyword = ref(route.query.keyword)
const tag = ref(route.query.tag)
const searchParams = reactive({ keyword, page: 1, pageSize: 5 })
const tagParams = reactive({ tag, page: 1, pageSize: 5 })

const ApiKeyword = () => searchPost({ key: `${route.query.keyword}`, query: searchParams })
const TagSearch = () => searchPostByTag({ key: `${route.query.tag}`, query: tagParams })

const [{ data: postResult, pending }, { data: tagsResult }, { data: hotResult }] = await Promise.all([
  keyword.value ? ApiKeyword() : TagSearch(),
  // searchPost({ key: `${route.query.keyword}`, query: searchParams }),
  getAllTags(),
  getHotPost(),
])

// 监听搜索关键字
watch(() => route.query.keyword, async (newKeyword) => {
  if (!newKeyword) return
  tag.value = ''
  searchParams.keyword = newKeyword as string
})

// 监听标签
watch(() => route.query.tag, async (newTag) => {
  if (!newTag) return
  keyword.value = ''
  tagParams.tag = newTag as string
})
</script>

<template>
  <div class="mx-auto mt-20 flex px-4 container md:(mt-30 px-0) xl:max-w-7xl">
    <div class="min-h-[calc(100vh_-_9.3rem)] w-full md:(mr-10 min-h-[calc(100vh_-_12rem)] w-224)">
      <div v-show="!pending && keyword" class="mb-8 text-center text-2xl text-gray-800 dark:(text-gray-50)">
        找到关于<span class="text-amber-500">&nbsp;{{ searchParams.keyword }}&nbsp;</span>的<span class="text-amber-500">&nbsp;{{
          postResult?.result.total }}&nbsp;</span>条记录
      </div>
      <div v-show="!pending && tag" class="mb-8 text-center text-2xl text-gray-800 dark:(text-gray-50)">
        当前标签：<span class="text-amber-500">{{ tagParams.tag }}</span>
      </div>
      <div v-show="pending" class="mb-8 text-center text-2xl text-gray-800 dark:(text-gray-50)">
        努力搜索中...
      </div>
      <PostItem v-for="item in postResult?.result.items" v-show="!pending" :key="item._id" :item="item" />
      <ProfilePostItem v-for="item in 2" v-show="pending" :key="item" />
      <div v-show="postResult?.result.total === 0 && !pending" class="mt-2/6 h-full text-center md:(mt-40)">
        <NuxtIcon
          name="empty_box" class="mr-2 block align-middle text-9xl leading-4 text-gray-500 dark:(text-gray-50)"
          filled
        />
        <span class="text-xl text-gray-500 dark:(text-gray-50)">{{ keyword ? '未找到相关文章...' : '未找到相关标签...' }}</span>
      </div>
    </div>
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
