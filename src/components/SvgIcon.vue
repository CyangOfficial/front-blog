<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

// Auto-load icons
// console.log(import.meta.glob)
const icons = Object.fromEntries(
  Object.entries(import.meta.glob('~/assets/icons/*.svg', { as: 'raw' })).map(
    ([key, value]) => {
      const filename = key.split('/').pop()!.split('.').shift()
      return [filename, value]
    },
  ),
)

console.log({ icons })

// Lazily load the icon
const icon = props.name && (await icons?.[props.name]?.())
</script>

<template>
  <span v-if="icon" v-html="icon" />
</template>
