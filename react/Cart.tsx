import { debounce } from 'debounce'
import { adjust } from 'ramda'
import React, { FunctionComponent, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { FormattedMessage, defineMessages } from 'react-intl'
import { branch, renderComponent } from 'recompose'
import { Button, Spinner } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'
import { OrderManagerProvider } from 'vtex.order-manager/OrderManager'

import CartTitle from './components/CartTitle'
import CartQuery from './graphql/cart.graphql'
import UpdateItems from './graphql/updateItems.graphql'

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
          query: CartQuery,
        },
      ],
    }),
  DEBOUNCE_TIME_MS
)

defineMessages({
  continueShopping: {
    defaultMessage: 'Continue Shopping',
    id: 'store/cart.continueShopping',
  },
})

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
    <div className={`${styles.container} bb-m b--muted-4`}>
      <div className="flex-l cf">
        <div className={`${styles.list} flex-auto-l mb6-l mt7-l mr7-l mb6-l`}>
          <CartTitle items={curItems} />
          <ExtensionPoint
            id="product-list"
            items={curItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            currency={currencyCode}
          />
          <div className={`${styles.continue1} dn mt7 db-l fr`}>
            <Button href="/" variation="secondary" block>
              <FormattedMessage id="store/cart.continueShopping" />
            </Button>
          </div>
        </div>
        <div
          className={`${styles.summary} mh5 mh0-ns bl-l b--muted-4 mh0-m pl6-l flex-fixed-l w-25-l`}
        >
          <div className="pb4 fl-m w-50-m pb6-m ph6-m pb4-l w-auto-l fn-l bn-l ph0-l">
            <ExtensionPoint id="shipping-calculator" />
          </div>
          <div className="pb4 fr-m w-50-m bl-m pb6-m ph6-m pb4-l b--muted-4 w-auto-l fn-l bn-l ph0-l">
            <ExtensionPoint
              id="checkout-summary"
              totalizers={totalizers}
              total={value}
              currency={currencyCode}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.continue2} ph5 pv7 w-50-m ph6-m fr-m dn-l`}>
        <Button variation="secondary" block>
          <FormattedMessage id="store/cart.continueShopping" />
        </Button>
      </div>
    </div>
  )
}

const EnhancedCart = compose(
  graphql(CartQuery, { name: 'CartQuery', options: { ssr: false } }),
  graphql(UpdateItems, { name: 'UpdateItems' }),
  branch(({ CartQuery }: any) => !!CartQuery.loading, renderComponent(Spinner))
)(Cart)

export default () => (
  <OrderManagerProvider>
    <EnhancedCart />
  </OrderManagerProvider>
)
