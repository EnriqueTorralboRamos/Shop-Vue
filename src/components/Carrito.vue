<template>
  <div class="cart-container">
    <div class="cart-icon" @click="showCart = !showCart">
      🛒 {{ totalItems }} | ${{ totalPrice }}
    </div>

    <div v-if="showCart" class="cart-dropdown">
      <h3>Carrito</h3>

      <div v-if="cart.cartItems.length === 0">
        Tu carrito está vacío
      </div>

      <div v-else>
        <div class="cart-content">
          <ul>
            <transition-group name="fade-slide" tag="ul">
              <li v-for="item in cart.cartItems" :key="item.product.id">
                {{ item.product.name }} (x{{ item.quantity }}) - ${{ item.product.price * item.quantity }}
                <div class="actions">
                  <button @click="cart.decreaseQuantity(item.product.id)">−</button>
                  <button @click="add(item)" :disabled="!canAdd(item)">+</button>
                  <button @click="cart.removeFromCart(item.product.id)">🗑️</button>
                </div>
              </li>
            </transition-group>
          </ul>
        </div>
        <button class="clear-btn" @click="clearCart">Vaciar carrito</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useCartStore } from '../stores/cart'
import { notify } from '../utils/notify'

const cart = useCartStore()
const showCart = ref(false)
const totalItems = ref(0)
const totalPrice = ref(0)

watchEffect(() => {
  totalItems.value = cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  totalPrice.value = cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

function canAdd(item: typeof cart.cartItems[number]): boolean {
  return item.quantity < item.product.stock
}

function add(item: typeof cart.cartItems[number]) {
  if (canAdd(item)) {
    cart.addToCart(item.product)
  } else {
    notify(`No hay más stock disponible de ${item.product.name}`, 'error')
  }
}

function clearCart() {
  cart.cartItems = []
  notify('Carrito vaciado correctamente ✅', 'success')
}
</script>

<style scoped>
.cart-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  font-family: sans-serif;
}

.cart-icon {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.cart-dropdown {
  margin-top: 0.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 250px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-content {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  overflow-x: hidden;
}

.cart-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-dropdown li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.cart-dropdown button {
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-weight: bold;
}

.clear-btn {
  width: 100%;
  background-color: #e74c3c;
  color: white;
  padding: 0.4rem;
  border: 2px solid black;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.clear-btn:hover {
  background-color: #c0392b;
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
