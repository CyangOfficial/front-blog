<script setup lang="ts">
import type { MusicItem } from '@/apis/player'

const props = defineProps<{ musicList: Array<MusicItem> }>()
const audioList = props.musicList.map(v => (
  { artist: v.artist, title: v.title, cover: v.coverUrl, url: v.musicUrl, lrc: v.lrc, _id: v._id }
))
console.log({ audioList })
// const { musicLists } = useMainStore()

// const musicLists = [
//   {
//     name: 'Warmest Regards',
//     artist: 'Half Moon Run',
//     lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
//     url: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
//     cover: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg',
//   },
//   {
//     name: 'Warmest Regards',
//     artist: 'Half Moon Run',
//     lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
//     url: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
//     cover: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg',
//   },
//   {
//     name: 'Warmest Regards',
//     artist: 'Half Moon Run',
//     lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
//     url: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
//     cover: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg',
//   },
// ]

onMounted(async () => {
  await nextTick()
  const playerEl = document.getElementById('player')
  const { $APlayer } = useNuxtApp()
  const _dp = new $APlayer({
    container: playerEl,
    lrcType: 3,
    fixed: true,
    // mini: true,
    audio: audioList,
  })
})
</script>

<template>
  <div id="player" ref="player" />
</template>

<style scoped>
.aplayer-body {
  --uno: -left-17!  hover: (left-0!);
}
</style>
