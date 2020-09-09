import React, { FunctionComponent, useEffect, memo, useRef } from 'react'
import { defineMessages } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Message } from 'vtex.checkout-graphql'
import { PixelContext } from 'vtex.pixel-manager'

import {
  CartToastProvider,
  useCartToastContext,
} from './components/ToastContext'

const { usePixel } = PixelContext
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
  const { push } = usePixel()

  const orderFormMessages = orderForm?.messages?.generalMessages || []

  const cartEventFiredRef = useRef(false)

  useEffect(() => {
    if (cartEventFiredRef.current) {
      return
    }

    cartEventFiredRef.current = true
    push({ event: 'cart', orderForm })
  }, [orderForm, push])

  const cartLoadedEventFiredRef = useRef(false)

  useEffect(() => {
    if (loading || cartLoadedEventFiredRef.current) {
      return
    }

    cartLoadedEventFiredRef.current = true
    push({ event: 'cartLoaded', orderForm })
  }, [push, loading, orderForm])

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
    <ExtensionPoint id="checkout-cartman" />
    <CartWrapper />
  </CartToastProvider>
)

EnhancedCartWrapper.schema = {
  title: messages.label.id,
}

export default memo(EnhancedCartWrapper)
