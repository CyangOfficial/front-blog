import 'APlayer/dist/APlayer.min.css'
import APlayer from 'APlayer'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      APlayer,
    },
  }
})
