import React, { FunctionComponent } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Button } from 'vtex.styleguide'

defineMessages({
  continueShopping: {
    defaultMessage: 'Continue Shopping',
    id: 'store/cart.continueShopping',
  },
})

const ContinueShopping: FunctionComponent = () => (
  <Button variation="secondary">
    <FormattedMessage id="store/cart.continueShopping" />
  </Button>
)

export default ContinueShopping
