import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import axios from '@/plugins/axios'
import store, { recordUserChange } from '@/store'

createApp(App).use(store).use(router).use(axios).mount('#app')

recordUserChange()
