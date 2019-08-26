import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
  items: Item[]
}

const CartTitle: FunctionComponent<Props> = ({ items }) => {
  return (
    <div>
      <h3 className="mh5 mh6-m">
        <span className="t-heading-3 c-on-base t-heading-2-l">
          <FormattedMessage id="store/cart.title" />
        </span>
        <span className="t-heading-5 c-muted-1 t-heading-4-l">
          &nbsp;
          <FormattedMessage
            id="store/cart.items"
            values={{ itemsQuantity: items.length }}
          />
        </span>
      </h3>
    </div>
  )
}

export default CartTitle
