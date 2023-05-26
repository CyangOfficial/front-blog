<template>
  <section class="mb-12 box-border w-full flex-col animate-pulse overflow-hidden rounded-lg bg-white shadow-post md:(h-83 flex flex-row text-right) even:flex-row-reverse dark:bg-dark-post-bg even:text-left dark:shadow-darkPost">
    <!-- 文章封面 -->
    <div class="block h-48 overflow-hidden bg-trueGray-200 md:(h-full w-[31rem] flex-shrink-0) dark:(bg-trueGray-500)" />

    <!-- content box -->
    <div class="px-5 py-4 md:(flex-1 px-10 py-7)">
      <!-- 发布时间 -->
      <div class="h-4 w-2/4 rounded bg-trueGray-200 dark:(bg-trueGray-500)" />

      <!-- 标题 -->
      <div class="mt-4 h-4 w-10/12 bg-trueGray-200 dark:(bg-trueGray-500)" />

      <!-- 文章热度 -->
      <div class="mt-4 w-10/12 flex justify-between">
        <div class="h-4 w-1/4 bg-trueGray-200 dark:(bg-trueGray-500)" />
        <div class="h-4 w-1/4 bg-trueGray-200 dark:(bg-trueGray-500)" />
        <div class="h-4 w-1/4 bg-trueGray-200 dark:(bg-trueGray-500)" />
      </div>

      <!-- 文章简介 -->
      <div class="mt-4 min-h-full md:(line-clamp-5 min-h-[7.5rem])">
        <p class="my-4 h-3 w-full bg-trueGray-200 dark:(bg-trueGray-500)" />
        <p class="my-4 h-3 w-full bg-trueGray-200 dark:(bg-trueGray-500)" />
        <p class="my-4 h-3 w-full bg-trueGray-200 dark:(bg-trueGray-500)" />
        <p class="my-4 h-3 w-full bg-trueGray-200 dark:(bg-trueGray-500)" />
      </div>

      <!-- 更多 -->
      <div class="ml-auto hidden h-3 w-2/12 bg-trueGray-200 text-3xl text-gray-700 no-underline md:(block) dark:(color-gray-50) hover:(text-amber-400)" />
    </div>
  </section>
</template>

<!-- <style>
</style> -->
