<script setup lang="ts">
</script>

<template>
  <div>
    <CommonBanner title="归 档" img-name="Attack-on-Titan.jpg" />
    <section class="mx-auto px-4 container md:(max-w-2xl px-0 py-4)">
      <template v-for="item in 4" :key="item">
        <h3 class="my-4 ml-24 text-4xl text-trueGray-600 dark:(text-gray-100)">
          2022
        </h3>
        <ul class="relative list-none p-0 after:(absolute left-34.5 top-0 h-full w-1 bg-sky-300 content-[''])">
          <li class="overflow-hidden">
            <div class="month-info">
              1月(2篇文章)
            </div>
            <ul class="relative mt-6 list-none pl-39">
              <li v-for="cur in 2" :key="cur" class="day-info group">
                <NuxtLink to="/post" class="text-trueGray-600 no-underline dark:(text-gray-100) group-hover:(text-amber-400)">
                  <span class="mr-1 font-bold color-sky-300">0{{ cur + 1 }}日</span>解决移动端浏览器 vh 单位异常问题(10PV)
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </section>
  </div>
</template>

<style>
.month-info {
  @apply mb-4 mt-4 text-xl font-bold text-trueGray-600 before:(content-[""] absolute top-6 left-33.5 w-3.5 h-3.5 bg-sky-300 z-20 rounded-full)
  after:(content-[""] absolute w-5.5 h-5.5 bg-white rounded-full z-10 top-5 left-32.5 ring-gray-700 ring-offset-gray-700 ring-offset-1 shadow-lg)
  dark:(text-gray-100)
}

.day-info {
  @apply relative before:(content-[""] absolute top-1.5 -left-5 w-2.5 h-2.5 bg-sky-300 z-20 rounded-full)
  after:(content-[""] absolute w-4.5 h-4.5 bg-white rounded-full z-10 top-0.5 -left-6 ring-gray-700 ring-offset-gray-700 ring-offset-1 shadow-lg)
  dark:(text-gray-100) my-4 last:mb-4
}
</style>
