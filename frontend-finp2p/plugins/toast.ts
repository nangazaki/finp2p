import Toast, { type ToastOptions } from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nApp) => {
  nApp.vueApp.use(Toast, {
    autoClose: 2000,
    position: 'bottom-center'
  } as ToastOptions)
})