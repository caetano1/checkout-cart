import React, { FunctionComponent, useEffect } from 'react'
import { parse } from 'query-string'
import { map } from 'ramda'
import { useMutation } from 'react-apollo'
import { addToCart as AddToCart } from 'vtex.checkout-resources/Mutations'

const enforceArray = (x: any) => {
  if (!x) {
    return []
  }
  return Array.isArray(x) ? x : [x]
}

const AddToCartUrl: FunctionComponent = () => {
  const [addToCart] = useMutation(AddToCart)

  useEffect(() => {
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
    })

    window.location.replace('/cart')
  }, [])

  return <div />
}

export default AddToCartUrl
