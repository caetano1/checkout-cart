import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Button } from 'vtex.styleguide'

const messages = defineMessages({
  continueShopping: {
    defaultMessage: 'Continue Shopping',
    id: 'store/cart.continueShopping',
  },
  label: {
    defaultMessage: '',
    id: 'admin/editor.cart.continueShopping',
  },
})

const ContinueShopping: StorefrontFunctionComponent<Props> = ({ label }) => (
  <Button href="/" variation="secondary" block>
    <FormattedMessage id={label} />
  </Button>
)

interface Props {
  label: string
}

ContinueShopping.schema = {
  title: messages.label.id,
}

export default ContinueShopping
