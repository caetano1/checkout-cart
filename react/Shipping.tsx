import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { OrderForm } from 'vtex.order-manager'
import { OrderShipping } from 'vtex.order-shipping'

const { useOrderForm } = OrderForm
const { OrderShippingProvider, useOrderShipping } = OrderShipping

const ShippingWrapper: FunctionComponent = () => {
  const { loading } = useOrderForm()
  const {
    countries,
    deliveryOptions,
    insertAddress,
    selectDeliveryOption,
    selectedAddress,
  } = useOrderShipping()

  return (
    <ExtensionPoint
      id="shipping-calculator"
      loading={loading}
      countries={countries}
      deliveryOptions={deliveryOptions}
      insertAddress={insertAddress}
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
