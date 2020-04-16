declare module 'vtex.store-resources/Queries' {
  import { DocumentNode } from 'graphql'

  export const orderForm: DocumentNode
}

declare module 'vtex.store-resources/QueryOrderForm' {
  import { DocumentNode } from 'graphql'

  const document: DocumentNode
  export = document
}
