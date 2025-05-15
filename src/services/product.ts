// src/services/products.ts
import { gql } from '@apollo/client/core'
import { apolloClient } from '../apollo'
import type { Product } from '../types/Product'

const GET_PRODUCTS = gql`
  query {
    productos {
      id
      name
      price
      stock
      available
      descripction
      image
    }
  }
`
const GET_PRODUCTO = gql`
  query ($id: String!) {
    producto(id: $id) {
      id
      name
      price
      stock
      available
      descripction
      image
    }
  }
`

const ACTUALIZAR_STOCK = gql`
  mutation($id: String!, $cantidad: Int!) {
    actualizarStock(id: $id, cantidad: $cantidad) {
      id
      stock
      available
    }
  }
`

export async function fetchProductos() {
  const { data } = await apolloClient.query({ query: GET_PRODUCTS })
  return data.productos
}

export async function fetchProductoById(id: string): Promise<Product | null> {
  const { data } = await apolloClient.query({
    query: GET_PRODUCTO,
    variables: { id }
  })
  return data.producto ?? null
}

export async function actualizarStock(id: string, cantidad: number) {
  const { data } = await apolloClient.mutate({
    mutation: ACTUALIZAR_STOCK,
    variables: { id, cantidad }
  })
  return data.actualizarStock
}
