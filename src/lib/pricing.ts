import {
  COUPON_CODE,
  COUPON_DISCOUNT,
  COUPON_MIN_SUBTOTAL,
  DELIVERY_FEE,
  SERVICE_CHARGE,
} from '../data'
import type { CartLine, Totals } from '../types'

export function calculateTotals(
  cart: CartLine[],
  couponCode: string | null,
): Totals {
  const itemCount = cart.reduce((count, line) => count + line.quantity, 0)
  const subtotal = cart.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  )
  const hasItems = itemCount > 0
  const deliveryFee = hasItems ? DELIVERY_FEE : 0
  const serviceCharge = hasItems ? SERVICE_CHARGE : 0
  const beforeDiscount = subtotal + deliveryFee + serviceCharge
  const couponEligible =
    couponCode === COUPON_CODE && subtotal >= COUPON_MIN_SUBTOTAL
  const discount = couponEligible ? COUPON_DISCOUNT : 0
  const total = Math.max(0, beforeDiscount - discount)
  const amountToUnlock = Math.max(0, COUPON_MIN_SUBTOTAL - subtotal)

  return {
    subtotal,
    deliveryFee,
    serviceCharge,
    beforeDiscount,
    discount,
    total,
    itemCount,
    couponEligible,
    amountToUnlock,
  }
}
