<template>
    <div class="home-container">
      <h1>Bienvenido</h1>
      <div class="botones">
        <router-link to="/tienda" class="btn">Ir a la Tienda 🛒</router-link>
        <router-link to="/admin" class="btn admin">Ir a Administración 🛠️</router-link>
        <button class="btn alerta" @click="showAlert">Mostrar Alerta 🔔</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { notify } from '../utils/notify'
  
  function showAlert() {
    notify('Operación exitosa ✅', 'success')
    notify('Algo salió mal 😓', 'error')
    notify('Este es un mensaje informativo', 'info')
  }
  </script>
  
  <style scoped>
  .home-container {
    text-align: center;
    padding: 3rem 1rem;
    font-family: sans-serif;
  }
  
  .botones {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    background-color: #3498db;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #2980b9;
  }
  
  .admin {
    background-color: #e67e22;
  }
  .admin:hover {
    background-color: #d35400;
  }
  
  .alerta {
    background-color: #9b59b6;
  }
  .alerta:hover {
    background-color: #8e44ad;
  }
  </style>
  