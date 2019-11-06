import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

const GoToCheckoutButton: FunctionComponent = () => {
  return (
    <div>
      <Button
        id="proceed-to-checkout"
        href="/checkout/#payment"
        variation="primary"
        size="large"
        block
      >
        <FormattedMessage id="store/cart.checkout" />
      </Button>
    </div>
  )
}

export default GoToCheckoutButton
