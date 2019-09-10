import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

const AVAILABLE = 'available'

interface Props {
  items: Item[]
}

const CartTitle: FunctionComponent<Props> = ({ items }) => {
  const showQuantity = items.every(item => item.availability === AVAILABLE)

  return (
    <div>
      <h3 className="mh5 mh6-m mh0-l">
        <span className="t-heading-3 c-on-base t-heading-2-l">
          <FormattedMessage id="store/cart.title" />
        </span>
        {showQuantity && (
          <span className="t-heading-5 c-muted-1 t-heading-4-l">
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
