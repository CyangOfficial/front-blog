<script setup>
import IconError404 from '@/assets/icons/error_404.svg'

const props = defineProps({
  error: Object,
})

// useHead({
//   script: [{ src: '_nuxt/assets/js/404.min.js' }],
// })

const router = useRouter()

function handleError() {
  return clearError({ redirect: '/' })
}

const back = () => {
  router.back()
}
</script>

<template>
  <div class="">
    <div id="404" class="mx-auto mt-20 w-full md:(w-150)">
      <IconError404 class="block" filled />
    </div>

    <div class="align-items w-full flex justify-center space-x-4">
      <button class="error-btn bg-transparent text-amber-500" @click="back">
        返回上一页
      </button>
      <button class="error-btn bg-amber-400 text-white" @click="router.push('/')">
        返回主页
      </button>
    </div>
    <div class="mt-5 text-center text-gray-800">
      {{ props.error.message }}
    </div>
  </div>
  <!-- <div class="card mx-auto mt-7 max-w-sm text-center">
    Ooops. {{ props.error.message }}
  </div>
  <button @click="handleError">
    go home
  </button> -->
</template>

<style scoped>
.error-btn {
  --uno: h-10 w-32 border-1 border-amber-400 rounded-full border-solid text-base font-medium hover:(shadow-[0_0_4px_#F2A93B]);
}
</style>
