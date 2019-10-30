import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import {
  OrderShippingProvider,
  useOrderShipping,
} from 'vtex.order-shipping/OrderShipping'

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
