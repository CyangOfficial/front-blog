<script setup>
const musicLists = [
  {
    name: 'Warmest Regards',
    artist: 'Half Moon Run',
    lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
    url: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
    cover: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg',
  },
  {
    name: 'Warmest Regards',
    artist: 'Half Moon Run',
    lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
    url: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
    cover: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg',
  },
  {
    name: 'Warmest Regards',
    artist: 'Half Moon Run',
    lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
    url: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
    cover: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg',
  },
]
onMounted(async () => {
  await nextTick()
  // const player = ref(null)
  const { $APlayer } = useNuxtApp()
  const _dp = new $APlayer({
    container: document.getElementById('player'),
    lrcType: 3,
    fixed: true,
    // mini: true,
    audio: musicLists,
  })
})
</script>

<template>
  <div id="player" ref="player" />
</template>
