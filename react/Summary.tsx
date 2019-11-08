import React, { FunctionComponent } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import {
  OrderCouponProvider,
  useOrderCoupon,
} from 'vtex.order-coupon/OrderCoupon'

const SummaryWrapper: FunctionComponent = () => {
  const {
    loading,
    orderForm: { totalizers, value },
  } = useOrderForm()

  const {
    coupon,
    insertCoupon,
    couponErrorKey,
  } = useOrderCoupon()

  return (
    <ExtensionPoint
      id="checkout-summary"
      loading={loading}
      totalizers={totalizers}
      total={value}
      coupon={coupon}
      insertCoupon={insertCoupon}
      couponErrorKey={couponErrorKey}
    />
  )
}

const EnhancedSummary = () => (
  <OrderCouponProvider>
    <SummaryWrapper />
  </OrderCouponProvider>
)

export default EnhancedSummary
