import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'
import { OrderQueueProvider } from 'vtex.order-manager/OrderQueue'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Spinner, ToastContext } from 'vtex.styleguide'

const useToasts = (messages: Message[]) => {
  const { showToast, toastState } = useContext(ToastContext)
  const toastQueueRef = useRef([] as string[])

  useEffect(() => {
    toastQueueRef.current = [
      ...messages.map(msg => msg.text),
      ...toastQueueRef.current,
    ]
  }, [messages])

  useEffect(() => {
    if (!toastState.isToastVisible && toastQueueRef.current.length > 0) {
      showToast(toastQueueRef.current.pop())
    }
  }, [toastState, messages])
}

const CartWrapper: FunctionComponent = () => {
  const { loading, orderForm } = useOrderForm()

  if (loading) {
    return <Spinner />
  }

  useToasts(orderForm.messages.generalMessages)

  if (orderForm.items.length === 0) {
    return <ExtensionPoint id="empty-state" />
  }

  return <ExtensionPoint id="checkout-cart-two-cols" />
}

const EnhancedCartWrapper = () => (
  <OrderQueueProvider>
    <OrderFormProvider>
      <CartWrapper />
    </OrderFormProvider>
  </OrderQueueProvider>
)

export default EnhancedCartWrapper
