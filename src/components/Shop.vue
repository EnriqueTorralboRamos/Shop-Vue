<template>
    <div class="store">
      <h1>Tienda</h1>
      <Cart />
      <div class="products-grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
        >
          <router-link
            :to="`/producto/${product.id}`"
            class="card-link"
          >
            <img
              :src="product.productImage || defaultImage"
              :alt="product.name"
            />
            <h2>{{ product.name }}</h2>
            <p><strong>Precio:</strong> ${{ product.price }}</p>
            <p>{{ product.available ? 'Disponible' : 'Agotado' }}</p>
          </router-link>
  
          <button
            :disabled="!product.available || cartQuantity(product.id) >= product.stock"
            @click="addToCart(product)"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Cart from './Carrito.vue'
  import { productosBase as baseProducts } from '../data/products'
  import type { Product } from '../types/Product'
  import { useCartStore } from '../stores/cart'
  
  const products: Product[] = baseProducts
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ytBNU72ZNhsQfEFpoW2iLtpl80L4ug8AJg&s'
  const cart = useCartStore()
  
  function addToCart(product: Product) {
    const itemInCart = cart.cartItems.find(item => item.product.id === product.id)
    const quantityInCart = itemInCart?.quantity || 0
  
    if (quantityInCart < product.stock) {
      cart.addToCart(product)
      console.log(`Agregado: ${product.name} | Total: ${cart.totalItems}`)
    } else {
      console.log(`No se puede agregar más de ${product.stock} unidades de ${product.name}`)
    }
  }
  
  function cartQuantity(productId: string): number {
    const item = cart.cartItems.find(item => item.product.id === productId)
    return item?.quantity || 0
  }
  </script>
  
  
  <style scoped>
  .store {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .product-card:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    background-color: white;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 380px;
  }
  
  .product-card img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    background-color: #f9f9f9;
  }
  
  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    flex: 1;
  }
  
  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  