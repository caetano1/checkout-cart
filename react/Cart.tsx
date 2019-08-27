import React, { FunctionComponent } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { OrderItemsProvider, useOrderItems } from 'vtex.order-items/OrderItems'
import {
  OrderManagerProvider,
  useOrderManager,
} from 'vtex.order-manager/OrderManager'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Button, Spinner } from 'vtex.styleguide'

import CartTitle from './components/CartTitle'

import styles from './styles.css'

defineMessages({
  continueShopping: {
    defaultMessage: 'Continue Shopping',
    id: 'store/cart.continueShopping',
  },
})

interface ProductListProps {
  items: Item[]
}

const ProductList: FunctionComponent<ProductListProps> = ({ items }) => {
  const { updateItem } = useOrderItems()

  const handleRemove = (index: number) => updateItem(index, 0)

  return (
    <ExtensionPoint
      id="product-list"
      items={items}
      onQuantityChange={updateItem}
      onRemove={handleRemove}
    />
  )
}

const Cart: FunctionComponent = () => {
  const { loading, orderForm } = useOrderManager()

  if (loading) {
    return <Spinner />
  }

  const { items, totalizers, value } = orderForm

  return (
    <div className={`${styles.container} bb-m b--muted-4`}>
      <div className="flex-l cf">
        <div className={`${styles.list} flex-auto-l mb6-l mt7-l mr7-l mb6-l`}>
          <CartTitle items={items} />
          <OrderItemsProvider>
            <ProductList items={items} />
          </OrderItemsProvider>
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

const EnhancedCart = () => (
  <OrderManagerProvider>
    <Cart />
  </OrderManagerProvider>
)

export default EnhancedCart
