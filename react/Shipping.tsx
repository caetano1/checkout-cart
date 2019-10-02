import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { OrderShippingProvider } from 'vtex.order-shipping/OrderShipping'

const ShippingWrapper: FunctionComponent = () => (
  <OrderShippingProvider>
    <ExtensionPoint id="shipping-calculator" />
  </OrderShippingProvider>
)

export default ShippingWrapper
