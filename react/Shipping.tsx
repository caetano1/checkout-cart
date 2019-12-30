import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { OrderForm } from 'vtex.order-manager'
import { OrderShipping } from 'vtex.order-shipping'
import { Item } from 'vtex.checkout-graphql'

import { AVAILABLE } from './constants'

const { useOrderForm } = OrderForm
const { OrderShippingProvider, useOrderShipping } = OrderShipping

const ShippingWrapper: FunctionComponent = () => {
  const {
    loading,
    orderForm: { items },
  } = useOrderForm()

  const {
    canEditData,
    countries,
    deliveryOptions,
    insertAddress,
    selectDeliveryOption,
    selectedAddress,
  } = useOrderShipping()

  const numberOfUnavailableItems = items.reduce(
    (numberOfUnavailableItems: number, item: Item) =>
      item.availability !== AVAILABLE
        ? numberOfUnavailableItems + 1
        : numberOfUnavailableItems,
    0
  )

  return (
    <ExtensionPoint
      id="shipping-calculator"
      loading={loading}
      canEditData={canEditData}
      countries={countries}
      deliveryOptions={deliveryOptions}
      insertAddress={insertAddress}
      numberOfItems={items.length}
      numberOfUnavailableItems={numberOfUnavailableItems}
      selectDeliveryOption={selectDeliveryOption}
      selectedAddress={selectedAddress}
    />
  )
}

const EnhancedShipping = () => (
  <OrderShippingProvider>
    <ShippingWrapper />
  </OrderShippingProvider>
)

export default EnhancedShipping
