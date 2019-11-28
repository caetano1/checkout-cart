import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'

const { useOrderForm } = OrderForm

const AVAILABLE = 'available'

const CartTitle: FunctionComponent = () => {
  const { orderForm, loading } = useOrderForm()

  const items = (orderForm && orderForm.items) || []

  const showQuantity = items.every(
    (item: Item) => item.availability === AVAILABLE
  )

  return (
    <div>
      <h3 className="mt6 mt7-l">
        <span className="t-heading-3 c-on-base t-heading-2-l">
          <FormattedMessage id="store/cart.title" />
        </span>
        &nbsp;
        {!loading && showQuantity && (
          <span
            id="items-quantity"
            className="t-heading-5 c-muted-1 t-heading-4-l"
          >
            <FormattedMessage
              id="store/cart.items"
              values={{ itemsQuantity: items.length }}
            />
          </span>
        )}
      </h3>
    </div>
  )
}

export default CartTitle
