import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

const SummaryWrapper: FunctionComponent = () => {
  const {
    orderForm: { totalizers, value },
  } = useOrderForm()

  return (
    <ExtensionPoint
      id="checkout-summary"
      totalizers={totalizers}
      total={value}
    />
  )
}

export default SummaryWrapper
