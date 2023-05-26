import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore('main', {
  state: () => ({
    darkMode: false,
    openSidebar: false,
  }),

  getters: {
    // double: state => state.n * 2,
  },

  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      useStorage('dark_mode', this.darkMode, localStorage)
      // localStorage.setItem('dark_mode', JSON.parse(this.darkMode))
    },
    setSidebar(val: boolean) {
      this.openSidebar = val
    },
  },
})

// console.log(import.meta.hot)
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
