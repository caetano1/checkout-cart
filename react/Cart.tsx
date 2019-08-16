import { debounce } from 'debounce'
import { adjust } from 'ramda'
import React, { FunctionComponent, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { Spinner } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'

import * as CartQuery from './graphql/cart.graphql'
import * as UpdateItems from './graphql/updateItems.graphql'

import styles from './styles.css'

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
    <div className="mw9 center flex-l ph6-l ph7-xl">
      <div className="bn b--muted-4 flex-auto-l pt7-l br-l pr7-l pb6-l w-70-l">
        <div className="mr7-xl">
          <ExtensionPoint
            id="product-list"
            items={curItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            currency={currencyCode}
          />
        </div>
      </div>
      <div className={`${styles.summary} flex-auto-l w-100 w-30-l fr-m pl6-m pr6-m pt7-l pb6-l pb7-xl pl7-xl ml7-xl`}>
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
