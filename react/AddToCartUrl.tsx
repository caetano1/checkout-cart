import { FunctionComponent, useEffect } from 'react'
import { parse } from 'query-string'
import { useQuery } from 'react-apollo'
import StoreOrderFormQuery from 'vtex.store-resources/QueryOrderForm'
import CheckoutOrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'

const orderFormOptimizationEnabled =
  window.__RUNTIME__.settings?.['vtex.store']?.enableOrderFormOptimization ??
  false

const OrderFormQuery = orderFormOptimizationEnabled
  ? CheckoutOrderFormQuery
  : StoreOrderFormQuery

const enforceArray = (x: any) => {
  if (!x) {
    return []
  }
  return Array.isArray(x) ? x : [x]
}

const AddToCartUrl: FunctionComponent = () => {
  const { addItem } = useOrderItems()

  // This ensures the checkout cookie exists
  const { loading } = useQuery(OrderFormQuery, { ssr: false })

  useEffect(() => {
    if (loading) {
      return
    }

    // parses all the query string parameters (in form of "sku=123,seller=1,qty=2")
    // and group them by SKU, to be added to the cart later.
    const { sku, seller, qty } = Object.entries({
      sku: undefined,
      seller: undefined,
      qty: undefined,
      ...parse(window.location?.search),
    })
      .map(([key, value]) => [key, enforceArray(value)] as const)
      .reduce<{ sku: string[]; seller: number[]; qty: number[] }>(
        (obj, [key, value]) => ({ ...obj, [key]: value }),
        { sku: [], seller: [], qty: [] }
      )

    const newItems = []
    for (let i = 0; i < sku.length; i++) {
      newItems.push({
        id: sku[i],
        seller: seller[i] || 1,
        quantity: qty[i] || 1,
      })
    }

    addItem(newItems)

    window.location.replace('/cart')
  }, [addItem, loading])

  return null
}

export default AddToCartUrl
