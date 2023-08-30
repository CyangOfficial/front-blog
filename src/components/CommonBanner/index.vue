<script setup lang="ts">
interface Banner {
  title: string
  imgName: string
}
const props = defineProps<Banner>()
function getImg() {
  // console.log('url', import.meta.url, window.location.href)
  return new URL(`../../assets/images/${props.imgName}`, import.meta.url).href
}
</script>

<template>
  <ClientOnly>
    <div class="relative h-72 before:(absolute inset-0 bg-black/30 content-['']) md:(h-114)">
      <picture class="block h-full w-full">
        <!-- <source type="image/webp" srcset="@/assets/images/wallhaven.webp" /> -->
        <img class="h-full w-full object-cover" :src="getImg()" alt="封面">
      </picture>
      <h2 class="absolute top-2/4 w-full text-center text-4xl text-coolGray-200">
        {{ title }}
      </h2>
    </div>
  </ClientOnly>
</template>
