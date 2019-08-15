import { debounce } from 'debounce'
import { adjust } from 'ramda'
import React, { FunctionComponent, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { Spinner } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'

import * as CartQuery from './graphql/cart.graphql'
import * as UpdateItems from './graphql/updateItems.graphql'

const DEBOUNCE_TIME_MS = 300

const debouncedUpdateItems = debounce(
  (UpdateItems: any, index: number, value: number) =>
    UpdateItems({
      variables: {
        orderItems: [
          {
            index,
            quantity: value,
          },
        ],
      },
      refetchQueries: [
        {
          query: CartQuery.default,
        },
      ],
    }),
  DEBOUNCE_TIME_MS
)

const Cart: FunctionComponent<any> = ({ CartQuery, UpdateItems }) => {
  const {
    cart: {
      items,
      storePreferencesData: { currencyCode },
      totalizers,
      value,
    },
  } = CartQuery

  const [curItems, setItems] = useState(items)

  const handleQuantityChange = (index: number, value: number) => {
    setItems(adjust(index, item => ({ ...item, quantity: value }), curItems))
    debouncedUpdateItems(UpdateItems, index, value)
  }

  const handleRemove = (index: number) => {
    setItems([...curItems.slice(0, index), ...curItems.slice(index + 1)])
    debouncedUpdateItems(UpdateItems, index, 0)
  }

  return (
    <div>
      <div className="pa7 fl w-two-thirds">
        <ExtensionPoint
          id="product-list"
          items={curItems}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
          currency={currencyCode}
        />
      </div>
      <div className="fl w-third">
        <ExtensionPoint
          id="checkout-summary"
          totalizers={totalizers}
          total={value}
          currency={currencyCode}
        />
      </div>
    </div>
  )
}

export default compose(
  graphql(CartQuery.default, { name: 'CartQuery', options: { ssr: false } }),
  graphql(UpdateItems.default, { name: 'UpdateItems' }),
  branch(
    ({ CartQuery }: any) => !!CartQuery.loading,
    renderComponent(Spinner)
  )
)(Cart)
