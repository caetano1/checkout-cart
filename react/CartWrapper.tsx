import React, { FunctionComponent, useEffect } from 'react'
import { OrderForm } from 'vtex.order-manager'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'

const { useOrderForm } = OrderForm

import {
  CartToastProvider,
  useCartToastContext,
} from './components/ToastContext'

const CartWrapper: FunctionComponent = () => {
  const { loading, orderForm } = useOrderForm()
  const { device } = useDevice()
  const { enqueueToasts } = useCartToastContext()

  const messages =
    (orderForm && orderForm.messages && orderForm.messages.generalMessages) ||
    []

  useEffect(() => {
    if (!loading && messages.length > 0) {
      enqueueToasts(messages.map((msg: Message) => msg.text))
    }
  }, [messages, enqueueToasts, loading])

  if (!loading && (!orderForm || orderForm.items.length === 0)) {
    return <ExtensionPoint id="empty-state" />
  }

  return device === 'phone' ? (
    <ExtensionPoint id="checkout-cart-single-col" />
  ) : (
    <ExtensionPoint id="checkout-cart-two-cols" />
  )
}

const EnhancedCartWrapper = () => (
  <CartToastProvider>
    <CartWrapper />
  </CartToastProvider>
)

export default EnhancedCartWrapper
