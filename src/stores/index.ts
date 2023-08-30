import { useStorage } from '@vueuse/core'
// import FingerprintJS from '@fingerprintjs/fingerprintjs'
import type { MusicItem } from '@/apis/player'

const { getMusicList } = useApi()
interface IState {
  darkMode: boolean
  openSidebar: boolean
  musicList: MusicItem[]
  visitorId: string
}
export const useMainStore = defineStore('main', {
  state: (): IState => ({
    darkMode: false,
    openSidebar: false,
    musicList: [],
    visitorId: '',
  }),

  getters: {
    musicLists: (state) => {
      const newList = state.musicList.map((v) => {
        return {
          name: v.title,
          artist: v.artist,
          lrc: v.lrc,
          url: v.musicUrl,
          cover: v.coverUrl,
        }
      })
      return newList
    },
    // double: state => state.n * 2,
  },

  actions: {
    // 获取浏览器访客id
    // async generateVisitorId() {
    //   return await FingerprintJS.load().then(fp => fp.get()).then(res => res)
    //   // fpPromise.then(fp => (fp.get())).then((res) => {
    //   //   // this.visitorId = res.visitorId
    //   //   Promise.resolve(res)
    //   // }).catch((err) => {
    //   //   Promise.reject(err)
    //   // })
    // },
    // 主题切换
    toggleTheme() {
      this.darkMode = !this.darkMode
      useStorage('dark_mode', this.darkMode, localStorage)
    },
    // mobile端侧边栏打开
    setSidebar(val: boolean) {
      this.openSidebar = val
    },
    // 获取音乐列表
    async fetchMusciList() {
      try {
        const params = { page: 1, pageSize: 20 }
        const { data } = await getMusicList({ query: params, lazy: true })
        this.musicList = data.value?.data.items || []
      } catch (error) {
        console.log('music err:', error)
        return error
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
