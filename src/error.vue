<script setup>
const props = defineProps({
  error: Object,
})
function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <div class="card mx-auto mt-7 max-w-sm text-center">
    Ooops. {{ props.error.message }}
  </div>
  <button @click="handleError">
    go home
  </button>
</template>
