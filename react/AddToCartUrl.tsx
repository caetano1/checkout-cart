import React, { FunctionComponent, useEffect } from 'react'
import { parse } from 'query-string'
import { map } from 'ramda'
import { useMutation, useQuery } from 'react-apollo'
import { addToCart as AddToCart } from 'vtex.checkout-resources/Mutations'
import { orderForm as OrderForm } from 'vtex.store-resources/Queries'

const enforceArray = (x: any) => {
  if (!x) {
    return []
  }
  return Array.isArray(x) ? x : [x]
}

const AddToCartUrl: FunctionComponent = () => {
  const [addToCart] = useMutation(AddToCart)

  // This ensures the checkout cookie exists
  const { loading } = useQuery(OrderForm, { ssr: false })

  useEffect(() => {
    if (!loading) {
      const { sku, seller, qty } = map(enforceArray, {
        sku: undefined,
        seller: undefined,
        qty: undefined,
        ...parse(window.location && window.location.search),
      })

      const newItems = []
      for (let i = 0; i < sku.length; i++) {
        newItems.push({
          id: sku[i],
          seller: seller[i] || 1,
          quantity: qty[i] || 1,
        })
      }

      addToCart({
        variables: {
          items: newItems,
        },
      }).then(() => window.location.replace('/cart'))
    }
  }, [loading])

  return <div />
}

export default AddToCartUrl
