import { BadgePercent } from 'lucide-react'
import type { Totals } from '../types'
import { formatTaka } from '../lib/format'

interface PriceBreakdownProps {
  totals: Totals
  couponCode?: string | null
  showBeforeDiscount?: boolean
  className?: string
}

export function PriceBreakdown({
  totals,
  couponCode,
  showBeforeDiscount = true,
  className = '',
}: PriceBreakdownProps) {
  return (
    <div className={`price-breakdown ${className}`}>
      <div className="price-row">
        <span>Food subtotal</span>
        <strong>{formatTaka(totals.subtotal)}</strong>
      </div>
      <div className="price-row">
        <span>Delivery fee</span>
        <strong>{formatTaka(totals.deliveryFee)}</strong>
      </div>
      <div className="price-row">
        <span>Service charge</span>
        <strong>{formatTaka(totals.serviceCharge)}</strong>
      </div>
      {showBeforeDiscount ? (
        <div className="price-row price-row--muted">
          <span>Total before discount</span>
          <strong>{formatTaka(totals.beforeDiscount)}</strong>
        </div>
      ) : null}
      <div
        className={`price-row price-row--discount ${totals.discount ? 'is-applied' : ''}`}
      >
        <span>
          {couponCode ? <BadgePercent size={15} aria-hidden="true" /> : null}
          Discount {couponCode ? `(${couponCode})` : ''}
        </span>
        <strong>
          {totals.discount > 0 ? `−${formatTaka(totals.discount)}` : formatTaka(0)}
        </strong>
      </div>
      <div className="price-row price-row--total">
        <span>Total payable</span>
        <strong>{formatTaka(totals.total)}</strong>
      </div>
    </div>
  )
}
