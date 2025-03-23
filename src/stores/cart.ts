import { defineStore } from 'pinia'
import type { Product } from '../types/Product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[]
  }),

  actions: {
    addToCart(product: Product) {
      const existing = this.cartItems.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cartItems.push({ product, quantity: 1 })
      }
    },

    removeFromCart(productId: string) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId)
    },

    decreaseQuantity(productId: string) {
      const item = this.cartItems.find(i => i.product.id === productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.removeFromCart(productId)
        }
      }
    },

    clearCart() {
      this.cartItems = []
    },

    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('carrito')
      if (savedCart) {
        try {
          this.cartItems = JSON.parse(savedCart)
        } catch (e) {
          console.error('Error al cargar el carrito desde localStorage:', e)
        }
      }
    }
  },

  getters: {
    totalItems: (state) =>
      state.cartItems.reduce((total, item) => total + item.quantity, 0),

    totalPrice: (state) =>
      state.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }
})
