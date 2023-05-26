<script setup>
const title = ref('Hi, Cyang!')
const subTitle = ref('一沙一世界，一花一天堂。君掌盛无边，刹那成永恒。')
const bannerTitle = computed(() => {
  return title.value.toString().toUpperCase()
})
</script>

<template>
  <div
    class="before:r-0 before:t-0 relative w-full overflow-hidden after:(absolute z-30 h-18 w-[150%] rounded-[100%] bg-white content-[''] -bottom-12 -left-1/4 dark:bg-trueGray-900) before:(absolute inset-0 z-20 bg-[url(@/assets/images/dot.gif)] bg-fixed bg-left-top bg-repeat content-['']) md:(after:hidden)"
  >
    <figure class="m-0 h-[46vh] flex-center bg-[url(@/assets/images/AiLun.png)] bg-cover bg-fixed bg-center md:(h-screen)">
      <section class="relative z-20 text-white">
        <h1
          class="font-pseudo relative select-none text-center text-3xl font-bold uppercase mix-blend-lighten md:(text-[5rem])"
          :data-text="bannerTitle"
        >
          {{ bannerTitle }}
        </h1>
        <div class="overflow-hidden rounded-lg bg-black bg-opacity-50 text-center">
          <p class="overflow-ellipsis my-2 overflow-hidden text-sm">
            {{ subTitle }}
          </p>
          <div class="my-2 hidden md:(flex-center)">
            <a href="https://github.com/CyangOfficial" class="mr-2 text-3xl text-indigo-600" target="_blank">
              <NuxtIcon name="github" filled />
            </a>
            <a href="#" class="mr-2 text-3xl text-green-500">
              <NuxtIcon name="wechat" filled />
            </a>
          </div>
        </div>
      </section>
    </figure>
  </div>
</template>

<style lang="scss">
// @layer components {
.font-pseudo {

  &::before,
  &::after {
    @apply absolute top-0 w-full bg-transparent content-[attr(data-text)];
    clip: rect(0, 0, 0, 0);
  }

  &::before {
    @apply -left-px [text-shadow:_1px_0_0_#ff3f1a]
  }

  &::after {
    @apply left-px [text-shadow:_-1px_0_0_#00a7e0]
  }

  &:hover {
    &::before {
      @apply [text-shadow:_4px_0_#ff3f1a] animate-[glitch-loop-1_0.8s_infinite_ease-in-out_alternate-reverse]
    }

    &::after {
      @apply [text-shadow:_5px_0_#00a7e0] animate-[glitch-loop-2_0.8s_infinite_ease-in-out_alternate-reverse]
    }
  }
}

// .font-pseudo-shadow {
// }

// }

/* .banner-img {
  background-image: url("/nuxt.png");
} */
</style>
