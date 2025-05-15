// src/apollo.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:5000/graphql', // URL del backend Flask
  }),
  cache: new InMemoryCache(),
})
