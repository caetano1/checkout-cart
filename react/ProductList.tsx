import React, { FunctionComponent } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { OrderItems } from 'vtex.order-items'
import { ExtensionPoint } from 'vtex.render-runtime'
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
  const { orderForm, loading } = useOrderForm()
  const { updateQuantity, removeItem } = useOrderItems()
  const { enqueueToasts } = useCartToastContext()
  const items = (orderForm && orderForm.items) || []

  const handleQuantityChange = (uniqueId: string, quantity: number) =>
    updateQuantity({ uniqueId, quantity })

  const handleRemove = (uniqueId: string) => {
    removeItem({ uniqueId })
    const item = items.find((item: Item) => item.uniqueId === uniqueId)
    if (item) {
      enqueueToasts([
        intl.formatMessage(messages.removeToast, { name: item.name }),
      ])
    }
  }

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
