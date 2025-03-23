<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Product } from '../types/Product'
import { productosBase as baseProducts } from '../data/products'

const products = reactive<Product[]>([...baseProducts])

products.forEach((product) => {
  watch(
    () => product.stock,
    (newStock) => {
      product.available = newStock > 0
    }
  )
})

function sell(index: number) {
  if (products[index].stock > 0) {
    products[index].stock--
  }
}

function restock(index: number) {
  products[index].stock++
}
</script>

<template>
  <h1>Inventario</h1>

  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Stock</th>
        <th>Disponible</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>
          <router-link :to="`/producto/${product.id}`" class="product-name">
            {{ product.name }}
          </router-link>
        </td>

        <td>{{ product.stock }}</td>
        <td :class="{ 'available': product.available, 'not-available': !product.available }">
          {{ product.available ? 'Sí' : 'No' }}
        </td>
        <td>
          <div class="actions">
            <button @click="sell(index)">Reducir</button>
            <button @click="restock(index)">Aumentar</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 2rem 0;
  color: #2c3e50;
}

table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #f5f5f5;
}

tbody tr:hover {
  background-color: #f0f8ff;
}

button {
  margin: 0 5px;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

button:first-of-type {
  background-color: #e74c3c;
  color: white;
}

button:last-of-type {
  background-color: #2ecc71;
  color: white;
}

td.available {
  font-weight: bold;
  color: #2ecc71;
}

td.not-available {
  font-weight: bold;
  color: #e74c3c;
}

.actions {
  display: flex;
  justify-content: center;
}

.product-name {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.product-name:hover {
  text-decoration: underline;
}
</style>
