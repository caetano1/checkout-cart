import React, { FunctionComponent } from 'react'
import {
  defineMessages,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

const messages = defineMessages({
  emptyStateTitle: {
    defaultMessage: '',
    id: 'store/cart.emptyState.title',
  },
})

const EmptyStateMessage: FunctionComponent<InjectedIntlProps> = ({
  intl: { formatMessage },
}) => (
  <EmptyState title={formatMessage(messages.emptyStateTitle)}>
    <p>
      <FormattedMessage id="store/cart.emptyState.message" />
    </p>
    <div className="pt6">
      <Button variation="secondary" size="small">
        <FormattedMessage id="store/cart.emptyState.button" />
      </Button>
    </div>
  </EmptyState>
)

export default injectIntl(EmptyStateMessage)
