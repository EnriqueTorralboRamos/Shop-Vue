
# 🛍️ Vue Shop - Sistema de Tienda Online

## 📚 Índice

- [🛍️ Vue Shop - Sistema de Tienda Online](#-vue-shop---sistema-de-tienda-online)
  - [1. ¿Cómo observar una propiedad anidada en un objeto `reactive`?](#1-cómo-observar-una-propiedad-anidada-en-un-objeto-reactive)
  - [2. ¿Cómo funciona `watch()` con objetos `reactive`?](#2-cómo-funciona-watch-con-objetos-reactive)
  - [3. ¿Cómo detectar cambios en `stock` dentro de un array de productos?](#3-cómo-detectar-cambios-en-stock-dentro-de-un-array-de-productos)

- [🧠 Preguntas sobre Vue y Reactividad](#-preguntas-sobre-vue-y-reactividad)
- [🚀 Funcionalidades principales](#-funcionalidades-principales)
  - [🧾 Inventario](#-inventario)
  - [🛒 Carrito](#-carrito)
  - [🛍️ Tienda](#-tienda)
  - [📦 Detalle de Producto](#-detalle-de-producto)
  - [🏠 Página de inicio](#-página-de-inicio)
  - [📢 Notificaciones reutilizables](#-notificaciones-reutilizables)
- [🛠️ Tecnologías utilizadas](#-tecnologías-utilizadas)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [💡 Futuras mejoras (ideas)](#-futuras-mejoras-ideas)
- [🧑‍💻 Autor](#-autor)


## 🧠 Respuestas sobre Vue y Reactividad


### 1. Vue no detecta cambios dentro de objetos reactivos de la forma que esperarías. ¿Cómo podrías observar un cambio en una propiedad anidada?

Vue 3 usa proxies para hacer que los objetos sean reactivos, pero no detecta automáticamente los cambios en propiedades anidadas cuando se usa `reactive()`, especialmente si el cambio se hace directamente a una propiedad profunda sin usar funciones reactivas.

Para observar una propiedad anidada, se debe utilizar `watch()` pasando una función que devuelva esa propiedad específica.

**Ejemplo:**
```ts
const state = reactive({
  producto: {
    stock: 10
  }
});

watch(() => state.producto.stock, (nuevo, anterior) => {
  console.log(`El stock cambió de ${anterior} a ${nuevo}`);
});
```

### 2. `watch()` permite escuchar cambios en propiedades específicas dentro de `reactive()`, explica cómo funciona.

`watch()` permite ejecutar una función cuando un valor reactivo cambia. Si se trabaja con un objeto creado con `reactive()`, no es posible pasar directamente una propiedad como fuente (como sí se hace con `ref()`), por lo que es necesario pasar una función que retorne la propiedad específica que se quiere observar.

También se puede usar la opción `{ deep: true }` para observar todo el objeto, incluyendo cambios en propiedades anidadas.

**Ejemplo observando una propiedad específica:**
```ts
const estado = reactive({ contador: 0 });

watch(
  () => estado.contador,
  (nuevo, anterior) => {
    console.log(`Contador cambió de ${anterior} a ${nuevo}`);
  }
);
```
**Ejemplo con `deep: true`:**
```ts
const estado = reactive({
  usuario: {
    nombre: 'Ana',
    edad: 30
  }
});

watch(
  () => estado,
  (nuevo, anterior) => {
    console.log('Cambió algo dentro del objeto estado');
  },
  { deep: true }
);
```

### 3. ¿Cómo harías que un `watch()` detecte cambios en `stock` dentro de un array de productos?

Para que `watch()` detecte cambios en la propiedad `stock` dentro de un array de productos, se puede observar un array derivado que contenga únicamente los valores de `stock` de cada producto. De esta manera, cuando alguno de esos valores cambie, `watch()` lo detectará.

```ts
const productos = reactive([
  { id: 1, nombre: 'Producto A', stock: 10 },
  { id: 2, nombre: 'Producto B', stock: 5 }
]);

watch(
  () => productos.map(producto => producto.stock),
  (nuevo, anterior) => {
    console.log('Cambió el stock de al menos un producto:', nuevo);
  }
);
```
También es posible utilizar la opción `{ deep: true }` en el `watch()` para detectar cambios en la propiedad `stock` dentro del array de productos. Esta opción permite observar todo el array y sus propiedades internas, incluyendo cambios en valores, adiciones o eliminaciones de elementos.

Vue recorre recursivamente la estructura del objeto y detecta cualquier modificación interna. Sin embargo, esta opción puede afectar el rendimiento si el array es muy grande o contiene objetos muy complejos.

```ts
watch(
  () => productos,
  (nuevo, anterior) => {
    console.log('Se ha modificado el stock o alguna otra propiedad en el array de productos');
  },
  { deep: true }
);
```

## Que se ha hecho en este trabajo

Este proyecto es una tienda online desarrollada con **Vue 3**, que permite a los usuarios explorar productos, añadirlos al carrito y gestionar su stock. El sistema también incluye vistas para administración, control de inventario y notificaciones.


### 🚀 Funcionalidades principales
---

#### 🧾 Inventario
- Visualización de productos disponibles.
- Modificación del stock (vender/reponer).
- Reactividad automática: si el stock es 0, el producto aparece como "Agotado".

#### 🛒 Carrito
- Añadir productos al carrito (respetando el stock).
- Aumentar, disminuir o eliminar productos del carrito.
- Vaciar carrito con botón específico.
- Vista desplegable con scroll limitado y animaciones.
- Notificaciones contextuales al interactuar con el carrito.

#### 🛍️ Tienda
- Visualización de productos en formato grid con tarjetas (cards).
- Redirección a la vista individual de cada producto.
- Botón para añadir al carrito desde la tarjeta.

#### 📦 Detalle de Producto
- Página de detalle que muestra la información completa del producto.
- Botón para volver a la vista anterior.

#### 🏠 Página de inicio
- Botones para redirigir a la Tienda o Administración.
- Botón adicional para lanzar notificaciones de prueba.

#### 📢 Notificaciones reutilizables
- Implementadas como utilidad (función global).
- Tipos: `success`, `error`, `info`.
- Aparecen en la parte inferior derecha de la pantalla.

---

### 🛠️ Tecnologías utilizadas
---

| Tecnología        | Propósito                                  |
|------------------|----------------------------------------------|
| **Vue 3 + Vite** | Framework principal del frontend             |
| **TypeScript**   | Tipado estático para mayor robustez          |
| **Pinia**        | Gestión de estado (carrito, productos, etc.) |
| **Vue Router**   | Navegación entre vistas                      |
| **SCSS / CSS**   | Estilado personalizado                       |
| **LocalStorage** | Persistencia del carrito                     |

---

### 📂 Estructura del proyecto
---
```bash
src/
│
├── components/          # Componentes Vue (Carrito, ProductView, etc.)
├── data/                # Productos base simulados (products.ts)
├── stores/              # Store de carrito con Pinia
├── types/               # Tipos globales (Product, CartItem, etc.)
├── views/               # Vistas principales (Inventario, Tienda, Home)
├── utils/               # Función de notificación reutilizable
├── router/              # Definición de rutas
└── App.vue              # Componente raíz
```
### 💡 Futuras mejoras (ideas)
---

- Autenticación para área de administración.
- Backend real con conexión a base de datos.
- Gestión de usuarios y órdenes.
- Filtrado y búsqueda de productos.
- Soporte para modo oscuro.

---

### 🧑‍💻 Autor
---

Desarrollado por Enrique Torralbo como parte de un proyecto educativo con Vue 3 y TypeScript.
