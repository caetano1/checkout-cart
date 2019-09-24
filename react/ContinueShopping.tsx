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
  <div className="w-50-m fr-m">
    <Button variation="secondary" block>
      <FormattedMessage id="store/cart.continueShopping" />
    </Button>
  </div>
)

export default ContinueShopping
