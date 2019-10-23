import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

const AVAILABLE = 'available'

const CartTitle: FunctionComponent = () => {
  const {
    orderForm: { items },
  } = useOrderForm()

  const showQuantity = items.every(
    (item: Item) => item.availability === AVAILABLE
  )

  return (
    <div>
      <h3>
        <span className="t-heading-3 c-on-base t-heading-2-l">
          <FormattedMessage id="store/cart.title" />
        </span>
        {showQuantity && (
          <span
            id="items-quantity"
            className="t-heading-5 c-muted-1 t-heading-4-l"
          >
            &nbsp;
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
