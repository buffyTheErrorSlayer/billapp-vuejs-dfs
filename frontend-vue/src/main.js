import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axiosPlugin from '@/plugins/axios.js'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(axiosPlugin)
pinia.use(({ store }) => {
    store.$http = app.config.globalProperties.$http
  })
app.use(pinia)
app.use(router)

app.mount('#app')
