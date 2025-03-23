
import type { Product } from '../types/Product'

export const productosBase: Product[] = [
  {
    id: "1",
    name: 'Camiseta',
    price: 20,
    stock: 3,
    available: true,
    productDescription:"Una camiseta es una prenda de vestir de uso común, tanto para hombres como para mujeres, que cubre el torso y que se distingue de la camisa por su cuello redondo, sin cuello o en forma de V.",
    productImage: "https://m.media-amazon.com/images/I/91fmzchxt8L._AC_UL320_.jpg"
  },
  {
    id: '2',
    name: 'Pantalón',
    price: 30,
    stock: 0,
    available: false,
    productImage: "https://m.media-amazon.com/images/I/71CON4MaPkL._AC_UL320_.jpg"
  },
  {
    id: '3',
    name: 'Zapatos',
    price: 50,
    stock: 5,
    available: true
  }
]
