import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { useCartStore } from './stores/cart'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

const cart = useCartStore()
cart.loadFromLocalStorage()