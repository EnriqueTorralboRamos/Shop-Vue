// src/services/products.ts
import { gql } from '@apollo/client/core'
import { apolloClient } from '../apollo'

const GET_PRODUCTS = gql`
  query {
    productos {
      id
      nombre
      precio
      stock
      disponible
    }
  }
`
const ACTUALIZAR_STOCK = gql`
  mutation($id: Int!, $cantidad: Int!) {
    actualizarStock(id: $id, cantidad: $cantidad) {
      id
      stock
      disponible
    }
  }
`

export async function fetchProductos() {
  const { data } = await apolloClient.query({ query: GET_PRODUCTS })
  return data.productos
}



export async function actualizarStock(id: number, cantidad: number) {
  const { data } = await apolloClient.mutate({
    mutation: ACTUALIZAR_STOCK,
    variables: { id, cantidad }
  })
  return data.actualizarStock
}
