import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import appStore from './store/store'

createApp(App).use(appStore).use(router).mount('#app')
