import React, { FunctionComponent, useCallback } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { OrderItems } from 'vtex.order-items'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Item } from 'vtex.checkout-graphql'
import { PixelContext } from 'vtex.pixel-manager'

import { useCartToastContext } from './ToastContext'
import { mapCartItemToPixel } from './utils/pixel'

const { usePixel } = PixelContext
const { useOrderForm } = OrderForm
const { OrderItemsProvider, useOrderItems } = OrderItems

const messages = defineMessages({
  removeToast: {
    defaultMessage: '',
    id: 'store/cart.removeToast',
  },
  priceChangedToast: {
    defaultMessage: '',
    id: 'store/cart.priceChangedToast',
  },
})

const ProductList: FunctionComponent<InjectedIntlProps> = ({ intl }) => {
  const {
    orderForm: { allowManualPrice, items, userType },
    loading,
  } = useOrderForm()
  const { updateQuantity, removeItem, setManualPrice } = useOrderItems()
  const { enqueueToasts } = useCartToastContext()
  const { push } = usePixel()

  const handleQuantityChange = useCallback(
    (uniqueId: string, quantity: number, item: Item) => {
      if (quantity === 0) {
        handleRemove(uniqueId, item)
        return
      }
      const adjustedItem = { ...mapCartItemToPixel(item), quantity }
      push({
        event: 'addToCart',
        items: [adjustedItem],
      })
      updateQuantity({ uniqueId, quantity })
    },
    [updateQuantity, push]
  )

  const handleRemove = useCallback(
    (uniqueId: string, item: Item) => {
      const adjustedItem = mapCartItemToPixel(item)
      push({
        event: 'removeFromCart',
        items: [adjustedItem],
      })
      removeItem({ uniqueId })
      enqueueToasts([
        intl.formatMessage(messages.removeToast, { name: item.name }),
      ])
    },
    [removeItem, enqueueToasts, intl, push]
  )

  const handleSetManualPrice = useCallback(
    (price: number, itemIndex: number) => {
      setManualPrice(price, itemIndex)
      enqueueToasts([intl.formatMessage(messages.priceChangedToast)])
    },
    [setManualPrice, enqueueToasts, intl]
  )

  return (
    <ExtensionPoint
      id="product-list"
      allowManualPrice={allowManualPrice}
      items={items}
      loading={loading}
      userType={userType}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
      onSetManualPrice={handleSetManualPrice}
    />
  )
}

const EnhancedProductList = ({ intl }: InjectedIntlProps) => (
  <OrderItemsProvider>
    <ProductList intl={intl} />
  </OrderItemsProvider>
)

export default injectIntl(EnhancedProductList)
