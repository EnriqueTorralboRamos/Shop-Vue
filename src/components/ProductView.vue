<template>
    <div v-if="product" class="product-view">
      <h1>{{ product.name }}</h1>
      <img
        :src="product.productImage || defaultImage"
        :alt="product.name"
      />
      <p v-if="product.productDescription">{{ product.productDescription }}</p>
      <p><strong>Precio:</strong> ${{ product.price }}</p>
      <p><strong>Stock:</strong> {{ product.stock }}</p>
      <p :style="{ color: product.available ? 'green' : 'red' }">
        Disponible: {{ product.available ? 'Sí' : 'No' }}
      </p>
      <button class="back-button" @click="goBack">⬅ Volver</button>
    </div>
    <div v-else class="product-view">
      <h2>Producto no encontrado</h2>
      <button class="back-button" @click="goBack">⬅ Volver</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { productosBase as baseProducts } from '../data/products'
  import type { Product } from '../types/Product'
  
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id as string
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ytBNU72ZNhsQfEFpoW2iLtpl80L4ug8AJg&s'
  
  const product: Product | undefined = baseProducts.find(p => p.id === id)
  
  function goBack() {
    router.back()
  }
  </script>
  
  <style scoped>
  .product-view {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: sans-serif;
    text-align: center;
  }
  
  .product-view img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
  }
  
  .back-button {
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    font-weight: bold;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .back-button:hover {
    background-color: #2980b9;
  }
  </style>
  