import React, { FunctionComponent, useEffect } from 'react'
import { defineMessages } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Message } from 'vtex.checkout-graphql'

import {
  CartToastProvider,
  useCartToastContext,
} from './components/ToastContext'

const { useOrderForm } = OrderForm

const messages = defineMessages({
  label: {
    id: 'admin/editor.cart.label',
    defaultMessage: '',
  },
})

const messagesFilter = (message: Message | null): message is Message => {
  return message != null
}

const CartWrapper: FunctionComponent = () => {
  const { loading, orderForm } = useOrderForm()
  const { device } = useDevice()
  const { enqueueToasts } = useCartToastContext()

  const orderFormMessages = orderForm?.messages?.generalMessages || []

  useEffect(() => {
    if (!loading && orderFormMessages.length > 0) {
      enqueueToasts(
        orderFormMessages.filter(messagesFilter).map(msg => msg.text!)
      )
    }
  }, [orderFormMessages, enqueueToasts, loading])

  if (!loading && orderForm.items.length === 0) {
    return <ExtensionPoint id="empty-state" />
  }

  return device === 'phone' ? (
    <ExtensionPoint id="checkout-cart-single-col" />
  ) : (
    <ExtensionPoint id="checkout-cart-two-cols" />
  )
}

const EnhancedCartWrapper: StorefrontFunctionComponent = () => (
  <CartToastProvider>
    <CartWrapper />
  </CartToastProvider>
)

EnhancedCartWrapper.schema = {
  title: messages.label.id,
}

export default EnhancedCartWrapper
