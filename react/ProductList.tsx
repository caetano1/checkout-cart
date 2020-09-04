import React, { FunctionComponent, useCallback } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { OrderItems } from 'vtex.order-items'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Item } from 'vtex.checkout-graphql'

import { useCartToastContext } from './components/ToastContext'

const { useOrderForm } = OrderForm
const { OrderItemsProvider, useOrderItems } = OrderItems

const messages = defineMessages({
  removeToast: {
    defaultMessage: '',
    id: 'store/cart.removeToast',
  },
})

const ProductList: FunctionComponent<InjectedIntlProps> = ({ intl }) => {
  const {
    orderForm: { items },
    loading,
  } = useOrderForm()
  const { updateQuantity, removeItem } = useOrderItems()
  const { enqueueToasts } = useCartToastContext()

  const handleQuantityChange = useCallback(
    (uniqueId: string, quantity: number) =>
      updateQuantity({ uniqueId, quantity }),
    [updateQuantity]
  )

  const handleRemove = useCallback(
    (uniqueId: string, item: Item) => {
      removeItem({ uniqueId })
      enqueueToasts([
        intl.formatMessage(messages.removeToast, { name: item.name }),
      ])
    },
    [removeItem, enqueueToasts, intl]
  )

  return (
    <ExtensionPoint
      id="product-list"
      items={items}
      loading={loading}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
    />
  )
}

const EnhancedProductList = ({ intl }: InjectedIntlProps) => (
  <OrderItemsProvider>
    <ProductList intl={intl} />
  </OrderItemsProvider>
)

export default injectIntl(EnhancedProductList)
