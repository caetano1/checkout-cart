import { FunctionComponent, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import StoreOrderFormQuery from 'vtex.store-resources/QueryOrderForm'
import CheckoutOrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'
import useOrderItems from 'vtex.order-items/OrderItems'
import { useRuntime } from 'vtex.render-runtime'

const orderFormOptimizationEnabled =
  window.__RUNTIME__.settings?.['vtex.store']?.enableOrderFormOptimization ??
  false

const OrderFormQuery = orderFormOptimizationEnabled
  ? CheckoutOrderFormQuery
  : StoreOrderFormQuery

const AddToCartUrl: FunctionComponent = () => {
  const { addItem } = useOrderItems()
  const { navigate } = useRuntime()

  // This ensures the checkout cookie exists
  const { loading } = useQuery(OrderFormQuery, { ssr: false })

  useEffect(() => {
    if (loading) {
      return
    }

    const urlSearchParams = new URLSearchParams(window.location?.search)

    const skuValues = urlSearchParams.getAll('sku')
    let qtyValues = urlSearchParams.getAll('qty')
    let sellerValues = urlSearchParams.getAll('seller')

    if (qtyValues.length < skuValues.length) {
      qtyValues = skuValues.map((_, index) => qtyValues[index] ?? '1')
    }

    if (sellerValues.length < skuValues.length) {
      sellerValues = skuValues.map((_, index) => sellerValues[index] ?? '1')
    }

    const itemsToAdd = skuValues.map((sku, index) => ({
      id: sku,
      seller: parseInt(sellerValues[index], 10),
      quantity: parseInt(qtyValues[index], 10),
    }))

    if (itemsToAdd.length > 0) {
      addItem(itemsToAdd)
    }

    navigate({ page: 'store.checkout.cart', replace: true })
  }, [addItem, loading, navigate])

  return null
}

export default AddToCartUrl
