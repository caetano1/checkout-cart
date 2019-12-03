import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Button } from 'vtex.styleguide'

const messages = defineMessages({
  label: {
    id: 'admin/editor.cart.checkout',
    defaultMessage: '',
  },
})

const GoToCheckoutButton: StorefrontFunctionComponent<Props> = ({ label }) => {
  return (
    <div>
      <Button
        id="proceed-to-checkout"
        href="/checkout/#payment"
        variation="primary"
        size="large"
        block
      >
        <FormattedMessage id={label} />
      </Button>
    </div>
  )
}

interface Props {
  label: string
}

GoToCheckoutButton.schema = {
  title: messages.label.id,
}

export default GoToCheckoutButton
