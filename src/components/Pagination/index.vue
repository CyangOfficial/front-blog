<script setup lang="ts">
interface Page {
  pageSize?: number
  total: number
  currentPage: number
}

const props = withDefaults(defineProps<Page>(), {
  pageSize: 5,
  total: 0,
  currentPage: 1,
})

const emit = defineEmits<{
  (e: 'currentChange', value: number): void
}>()

const pageInfo = reactive({
  // 总页数
  totalPage: Math.ceil(props.total / props.pageSize),
  // 一页显示的条目
  currentPageSize: props.currentPage,
  // 总数
  total: props.total,
})

// 总页数
const totalPage = Math.ceil(props.total / props.pageSize)
// 当前页
const curPage = ref(props.currentPage)
// 一页显示的条目
const _curPageSize = ref(props.pageSize)

// 点击页码
const setCurrentPage = (value: number) => {
  if (curPage.value === value) return
  curPage.value = value
  emit('currentChange', value)
}

// 上一页
const pagePrev = () => {
  if (curPage.value <= 1) return
  curPage.value--
  curPage.value = curPage.value < 1 ? 1 : curPage.value
  emit('currentChange', curPage.value)
}

// 下一页
const pageNext = () => {
  if (curPage.value >= pageInfo.totalPage) return
  curPage.value++
  curPage.value = curPage.value > pageInfo.totalPage ? pageInfo.totalPage : curPage.value
  emit('currentChange', curPage.value)
}
</script>

<template>
  <div class="">
    <ul class="flex list-none space-x-2">
      <!-- 上一页 -->
      <li class="group">
        <button
          type="button"
          class="h-8 w-8 border border-gray-400 rounded-full border-solid bg-transparent text-xl"
          :class="{ 'border-zinc-300/50': curPage === 1, 'group-hover:(bg-gray-200/50)': curPage > 1 }"
          @click="pagePrev"
        >
          <NuxtIcon name="arrow" :class="{ 'text-zinc-300': curPage === 1, 'cursor-pointer': curPage > 1 }" />
        </button>
      </li>

      <!-- 页码 -->
      <li v-for="page in totalPage" :key="page" class="group">
        <button
          type="button"
          class="text-md h-8 w-8 cursor-pointer border border-gray-400 rounded-full border-solid bg-transparent transition-all group-hover:(bg-gray-200/50)"
          :class="{ 'border-zinc-300': curPage === 1, '!bg-blue-200/50 text-blue-500 !border-blue-300 !group-hover:(bg-blue-200/80)': curPage === page }"
          @click="setCurrentPage(page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- 下一页 -->
      <li class="group">
        <button
          type="button"
          class="h-8 w-8 rotate-180 border border-gray-400 rounded-full border-solid bg-transparent text-xl"
          :class="{ 'border-zinc-300/50': curPage === totalPage, 'group-hover:(bg-gray-200/50)': curPage < totalPage }"
          @click="pageNext"
        >
          <NuxtIcon name="arrow" :class="{ 'text-zinc-300': curPage === totalPage, 'cursor-pointer': curPage < totalPage }" />
        </button>
      </li>
    </ul>
  </div>
</template>
