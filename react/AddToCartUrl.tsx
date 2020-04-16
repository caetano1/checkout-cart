import { FunctionComponent, useEffect } from 'react'
import { parse } from 'query-string'
import { useQuery } from 'react-apollo'
import StoreOrderFormQuery from 'vtex.store-resources/QueryOrderForm'
import CheckoutOrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useRuntime } from 'vtex.render-runtime'

const orderFormOptimizationEnabled =
  window.__RUNTIME__.settings?.['vtex.store']?.enableOrderFormOptimization ??
  false

const OrderFormQuery = orderFormOptimizationEnabled
  ? CheckoutOrderFormQuery
  : StoreOrderFormQuery

const enforceArray = <T extends any>(x: T | T[] | undefined) => {
  if (!x) {
    return []
  }
  return Array.isArray(x) ? x : [x]
}

const AddToCartUrl: FunctionComponent = () => {
  const { addItem } = useOrderItems()
  const { navigate } = useRuntime()

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
    }).reduce<{ sku: string[]; seller: number[]; qty: number[] }>(
      (obj, [key, value]) => ({ ...obj, [key]: enforceArray(value) }),
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

    navigate({ page: 'store.checkout.cart', replace: true })
  }, [addItem, loading, navigate])

  return null
}

export default AddToCartUrl
