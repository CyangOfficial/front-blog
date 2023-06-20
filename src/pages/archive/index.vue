<script setup lang="ts">
const { getArchive } = useApi()
const { data } = await getArchive()
const archiveList = data.value?.result
</script>

<template>
  <div>
    <CommonBanner title="归 档" img-name="Attack-on-Titan.jpg" />
    <section class="mx-auto px-4 container md:(max-w-2xl px-0 py-4)">
      <template v-for="year in archiveList" :key="year._id">
        <h3 class="my-4 ml-24 text-4xl text-trueGray-600 dark:(text-gray-100)">
          <span class="align-middle">{{ year._id }}</span><span class="align-middle text-2xl"> ({{ year.count }}篇文章)</span>
        </h3>
        <ul class="relative list-none p-0 pb-0.5 after:(absolute left-34.5 top-0 h-full w-1 bg-sky-300 content-[''])">
          <li v-for="month in year.months" :key="month.month" class="">
            <div class="month-title">
              {{ month.month < 10 ? `0${month.month}` : month.month }}月({{ month.days.length }}篇文章)
            </div>
            <ul class="relative mt-2 list-none pl-39">
              <li v-for="day in month.days" :key="day._id" class="day-title">
                <NuxtLink :to="`/post/${day._id}`" class="text-trueGray-600 no-underline dark:(text-gray-100) hover:(text-amber-400)">
                  <span class="mr-1 font-bold color-sky-300">{{ day.day < 10 ? `0${day.day}` : day.day }}日</span>{{ day.title }}
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
.month-title {
  @apply mb-2 mt-4 inline-block w-38 pr-7 whitespace-nowrap text-right text-lg font-bold text-trueGray-600 relative
  before:(content-[""] absolute top-2 left-33.5 w-3.5 h-3.5 bg-sky-300 z-20 rounded-full)
  after:(content-[""] absolute w-5.5 h-5.5 bg-white rounded-full z-10 top-1 left-32.5 ring-gray-700 ring-offset-gray-700 ring-offset-1 shadow-lg)
  dark:(text-gray-100)
}

.day-title {
  @apply relative
  before:(content-[""] absolute top-1.5 -left-5 w-2.5 h-2.5 bg-sky-300 z-20 rounded-full)
  after:(content-[""] absolute w-4.5 h-4.5 bg-white rounded-full z-10 top-0.5 -left-6 ring-gray-700 ring-offset-gray-700 ring-offset-1 shadow-lg)
  dark:(text-gray-100) my-4 last:mb-4
}
</style>
