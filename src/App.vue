<script setup lang="ts">
import { watch } from 'vue'
import { useCartStore } from './stores/cart'

const cart = useCartStore()

watch(
  () => cart.cartItems,
  (nuevaLista) => {
    localStorage.setItem('carrito', JSON.stringify(nuevaLista))
  },
  { deep: true }
)

</script>

<template>
  <router-view />  
  <router-link to="/" class="boton-inicio">🏠 Inicio</router-link>
  <Notificador />
</template>


<style scoped>
.boton-inicio {
  position: fixed;
  top: 1rem;
  left: 1rem; /* O usa right: 1rem si lo prefieres a la derecha */
  z-index: 9999;
  background-color: #2ecc71;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.boton-inicio:hover {
  background-color: #27ae60;
}

</style>

<style>
/* estilos del notificador */
#notify-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Estilo base de cada notificación */
.notificacion {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  min-width: 220px;
  animation: aparecer 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Colores por tipo */
.notificacion.success {
  background-color: #2ecc71;
}
.notificacion.error {
  background-color: #e74c3c;
}
.notificacion.info {
  background-color: #3498db;
}

/* Animación de aparición */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
