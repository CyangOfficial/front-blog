// import { ModalBase, PushButton, useModal, useToast } from 'tailvue'

// const toast = useToast()
// const modal = useModal()

// const toast = Toast.useToast()

export default defineNuxtPlugin(() => {
  // nuxtApp.vueApp.component('PushButton', PushButton)
  // nuxtApp.vueApp.component('ModalBase', ModalBase)
  return {
    provide: {
      a: 123,
    },
  }
})

// import * as Toast from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-bootstrap.css'

// const { useToast } = Toast
// const toast = useToast()

// export default defineNuxtPlugin(() => {
//   // nuxtApp.vueApp.use(ToastPlugin)
//   // nuxtApp.vueApp.mount('#app')
//   return {
//     provide: {
//       toast,
//     },
//   }
// })
