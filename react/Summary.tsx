import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { OrderForm } from 'vtex.order-manager'
import { OrderCoupon } from 'vtex.order-coupon'

const { useOrderForm } = OrderForm
const { OrderCouponProvider, useOrderCoupon } = OrderCoupon

const SummaryWrapper: FunctionComponent = () => {
  const {
    loading,
    orderForm: {
      totalizers,
      value,
      marketingData: { coupon },
    },
  } = useOrderForm()

  const { insertCoupon } = useOrderCoupon()

  return (
    <ExtensionPoint
      id="checkout-summary"
      loading={loading}
      totalizers={totalizers}
      total={value}
      coupon={coupon}
      insertCoupon={insertCoupon}
    />
  )
}

const EnhancedSummary = () => (
  <OrderCouponProvider>
    <SummaryWrapper />
  </OrderCouponProvider>
)

export default EnhancedSummary
