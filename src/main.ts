import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import http from '@/plugins/http'
import store, { recordUserChange } from '@/store'

createApp(App).use(store).use(router).use(http).mount('#app')

recordUserChange()
