import { createRouter, createWebHistory } from 'vue-router'
import Inventario from '../views/Inventory.vue'
import ProductView from '../components/ProductView.vue'
import Shop from '../views/Shop.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/producto/:id',
    name: 'ProductDetail',
    component: ProductView
  },
  {
    path: '/tienda',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/admin',
    name: 'Inventario',
    component: Inventario
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
