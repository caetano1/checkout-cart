import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { Item } from 'vtex.checkout-graphql'

import { AVAILABLE } from './constants'

const { useOrderForm } = OrderForm

const messages = defineMessages({
  label: {
    id: 'admin/editor.cart.title',
    defaultMessage: '',
  },
  title: {
    id: 'store/cart.title',
    defaultMessage: '',
  },
})

const countCartItems = (countMode: MinicartTotalItemsType, arr: Item[]) => {
  if (countMode === 'distinctAvailable') {
    return arr.reduce((itemQuantity: number, item: Item) => {
      if (item.availability === 'available') {
        return itemQuantity + 1
      }
      return itemQuantity
    }, 0)
  }

  if (countMode === 'totalAvailable') {
    return arr.reduce((itemQuantity: number, item: Item) => {
      if (item.availability === 'available') {
        return itemQuantity + item.quantity
      }
      return itemQuantity
    }, 0)
  }

  if (countMode === 'total') {
    return arr.reduce((itemQuantity: number, item: Item) => {
      return itemQuantity + item.quantity
    }, 0)
  }

  // countMode === 'distinct'
  return arr.length
}

const CartTitle: StorefrontFunctionComponent<Props> = ({
  title,
  itemCountMode = 'distinct',
}) => {
  const {
    orderForm: { items },
    loading,
  } = useOrderForm()

  const showQuantity = items.every(
    (item: Item) => item.availability === AVAILABLE
  )

  return (
    <div>
      <h3 className="mt6 mt7-l">
        <span className="t-heading-3 c-on-base t-heading-2-l">
          <FormattedMessage id={title} />
        </span>
        &nbsp;
        {!loading && showQuantity && (
          <span
            id="items-quantity"
            className="t-heading-5 c-muted-1 t-heading-4-l"
          >
            <FormattedMessage
              id="store/cart.items"
              values={{
                itemsQuantity: countCartItems(itemCountMode, items),
              }}
            />
          </span>
        )}
      </h3>
    </div>
  )
}

interface Props {
  title: string
  itemCountMode: MinicartTotalItemsType
}

CartTitle.schema = {
  title: messages.label.id,
}

export default CartTitle
