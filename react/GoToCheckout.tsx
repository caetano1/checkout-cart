import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { Utils } from 'vtex.checkout-resources'
import { useRuntime } from 'vtex.render-runtime'

const messages = defineMessages({
  label: {
    id: 'admin/editor.cart.checkout',
    defaultMessage: '',
  },
})

const { useCheckoutURL } = Utils

const GoToCheckoutButton: StorefrontFunctionComponent<Props> = ({ label }) => {
  const { navigate } = useRuntime()
  const { major } = useCheckoutURL()

  const handleGoToCheckout = () => {
    if (major >= 2) {
      navigate({
        page: 'store.checkout.order-form',
        fallbackToWindowLocation: false,
      })
    } else {
      navigate({
        to: '/checkout/#/payment',
        fallbackToWindowLocation: true,
      })
    }
  }

  return (
    <div>
      <Button
        id="proceed-to-checkout"
        variation="primary"
        size="large"
        onClick={handleGoToCheckout}
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
