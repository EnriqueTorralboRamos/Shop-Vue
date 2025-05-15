import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { useCartStore } from './stores/cart'
import { apolloClient } from './apollo'
import { provideApolloClient } from '@vue/apollo-composable'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
provideApolloClient(apolloClient)
const cart = useCartStore()
cart.loadFromLocalStorage()