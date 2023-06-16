<script setup lang="ts">
interface Page {
  pageSize?: number
  total: number
  currentPage: number
  hideOnSinglePage?: boolean
}

const props = withDefaults(defineProps<Page>(), {
  pageSize: 5,
  total: 0,
  currentPage: 1,
  hideOnSinglePage: false,
})

const emit = defineEmits<{
  (e: 'currentChange', value: number): void
}>()

// if (!props.hideOnSinglePage) return

// const pageInfo = reactive({
//   // 总页数
//   totalPage: Math.ceil(props.total / props.pageSize),
//   // 一页显示的条目
//   currentPageSize: props.currentPage,
//   // 总数
//   total: props.total,
// })

// 总页数
const totalPage = computed(() => Math.ceil(props.total / props.pageSize))
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
  if (curPage.value >= totalPage.value) return
  curPage.value++
  curPage.value = curPage.value > totalPage.value ? totalPage.value : curPage.value
  emit('currentChange', curPage.value)
}

watch(() => props.currentPage, (newPage) => {
  curPage.value = newPage as number
})

const hidePagination = computed(() => {
  const isHide = props.hideOnSinglePage
  if (totalPage.value <= 1) {
    if (isHide) {
      return false
    }
  }
  return true
})
</script>

<template>
  <div v-if="hidePagination">
    <ul class="flex list-none justify-start p-0 space-x-2">
      <!-- 上一页 -->
      <li class="group">
        <button
          type="button"
          class="page-turn active-effect"
          :class="{
            'border-zinc-300/50 dark:(border-gray-600)': curPage === 1,
            'active:(bg-gray-200/50) md:(group-hover:(bg-gray-200/50) dark:(group-hover:(bg-gray-700)))': curPage > 1,
          }"
          @click="pagePrev"
        >
          <NuxtIcon name="arrow" :class="{ 'text-zinc-300 dark:(text-gray-500)': curPage === 1, 'cursor-pointer': curPage > 1 }" />
        </button>
      </li>

      <!-- 页码 -->
      <li v-for="page in totalPage" :key="page" class="group">
        <button
          type="button"
          class="page-number active-effect"
          :class="{ 'current-page-number': curPage === page }"
          @click="setCurrentPage(page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- 下一页 -->
      <li class="group">
        <button
          type="button"
          class="page-turn active-effect rotate-180"
          :class="{
            'border-zinc-300/50 dark:(border-gray-600)': curPage === totalPage,
            'md:(group-hover:(bg-gray-200/50) dark:(group-hover:(bg-gray-700)))': curPage < totalPage,
          }"
          @click="pageNext"
        >
          <NuxtIcon name="arrow" class="" :class="{ 'text-zinc-300 dark:(text-gray-500)': curPage === totalPage, 'cursor-pointer': curPage < totalPage }" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style>
.page-number {
  @apply text-md bg-center text-gray-700 h-8 w-8 cursor-pointer select-none border border-gray-300 rounded-full
  border-solid bg-transparent transition-all ease-linear duration-300
  dark:(text-gray-50 md:(group-hover:bg-gray-700))
  md:(group-hover:(bg-gray-200/30));
}

.current-page-number {
  @apply bg-blue-200/40 text-blue-500 select-none !border-blue-400 !group-hover:(bg-blue-200/70)
  dark:(text-blue-400 bg-blue-400/30 border-blue-400/70 !group-hover:(bg-blue-400/40));
}

.page-turn {
  @apply bg-center h-8 w-8 p-0 text-gray-700 overflow-hidden text-center border border-gray-400 select-none rounded-full border-solid bg-transparent text-xl
  active:(bg-gray-300)
  dark:(border-gray-400 text-gray-50 active:(bg-gray-600));
}
</style>
