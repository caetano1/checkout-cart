import React, { FunctionComponent } from 'react'

interface Props {
  items: Item[]
}

const CartTitle: FunctionComponent<Props> = ({ items }) => {
  return (
    <div>
      <h3 className="mh5 mh6-m">
        <span className="t-heading-3 c-on-base t-heading-2-l">Cart</span>
        <span className="t-heading-5 c-muted-1 t-heading-4-l">
          &nbsp;({items.length} items)
        </span>
      </h3>
    </div>
  )
}

export default CartTitle
