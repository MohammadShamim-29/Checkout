import {
  ArrowRight,
  Bike,
  Check,
  MapPin,
  ReceiptText,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConceptFooter } from '../components/ConceptFooter'
import { EmptyState } from '../components/EmptyState'
import { useApp } from '../context/AppContext'
import { formatTaka } from '../lib/format'

export function ConfirmationPage() {
  const { orderId } = useParams()
  const { findOrder } = useApp()
  const order = orderId ? findOrder(orderId) : undefined

  if (!order) {
    return (
      <div className="page">
        <main className="container centered-main">
          <EmptyState
            icon={<ReceiptText size={28} />}
            title="Order not found"
            description="We could not find that simulated order. It may have been cleared from this browser."
            action={
              <Link to="/orders" className="button button--primary">
                View orders
              </Link>
            }
          />
        </main>
      </div>
    )
  }

  const itemCount = order.items.reduce(
    (count, line) => count + line.quantity,
    0,
  )

  return (
    <div className="page confirmation-page">
      <main className="container confirmation-main">
        <section className="success-hero">
          <div className="success-mark" aria-hidden="true">
            <span className="success-mark__ring success-mark__ring--one" />
            <span className="success-mark__ring success-mark__ring--two" />
            <span className="success-mark__circle">
              <Check size={34} strokeWidth={2.6} />
            </span>
          </div>
          <span className="success-eyebrow">
            <span className="live-dot" />
            Simulated order confirmed
          </span>
          <h1>Your order has been placed!</h1>
          <p>
            {order.restaurantName} has your order and will start preparing it
            shortly. This is a prototype — no real purchase has occurred.
          </p>
          <div className="order-number-pill">
            <span>Order number</span>
            <strong>{order.orderNumber}</strong>
          </div>
        </section>

        <div className="confirmation-grid">
          <section className="summary-card confirmation-card">
            <div className="summary-card__header">
              <div>
                <span className="section-kicker">Order details</span>
                <h2>{order.restaurantName}</h2>
              </div>
              <span className="soft-badge">
                <Bike size={14} aria-hidden="true" />
                {order.estimatedDelivery}
              </span>
            </div>

            <div className="confirmation-items">
              {order.items.map((line) => (
                <div className="confirmation-item" key={line.itemId}>
                  <img src={line.image} alt="" />
                  <div>
                    <strong>{line.name}</strong>
                    <span>
                      {line.quantity} × {formatTaka(line.price)}
                    </span>
                  </div>
                  <strong>{formatTaka(line.price * line.quantity)}</strong>
                </div>
              ))}
            </div>

            <div className="confirmation-totals">
              <div>
                <span>Items ({itemCount})</span>
                <strong>{formatTaka(order.subtotal)}</strong>
              </div>
              <div>
                <span>Delivery + service</span>
                <strong>
                  {formatTaka(order.deliveryFee + order.serviceCharge)}
                </strong>
              </div>
              {order.discount > 0 ? (
                <div className="is-discount">
                  <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                  <strong>−{formatTaka(order.discount)}</strong>
                </div>
              ) : null}
              <div className="confirmation-total">
                <span>Total payable</span>
                <strong>{formatTaka(order.total)}</strong>
              </div>
            </div>
          </section>

          <div className="confirmation-side">
            <section className="summary-card confirmation-detail-card">
              <span className="section-kicker">Delivery details</span>
              <div className="detail-line">
                <span className="detail-line__icon">
                  <MapPin size={17} aria-hidden="true" />
                </span>
                <div>
                  <strong>{order.address.label}</strong>
                  <span>
                    {order.address.line1}, {order.address.area},{' '}
                    {order.address.city}
                  </span>
                </div>
              </div>
              <div className="detail-line">
                <span className="detail-line__icon">
                  <Bike size={17} aria-hidden="true" />
                </span>
                <div>
                  <strong>Estimated arrival</strong>
                  <span>{order.estimatedDelivery}</span>
                </div>
              </div>
              <div className="detail-line">
                <span className="detail-line__icon">
                  <ShoppingBag size={17} aria-hidden="true" />
                </span>
                <div>
                  <strong>Payment method</strong>
                  <span>{order.paymentMethod.label}</span>
                </div>
              </div>
            </section>

            <section className="next-up-card">
              <span className="section-kicker">What happens next</span>
              <h2>Follow it from kitchen to door.</h2>
              <p>
                Open tracking to advance the simulated delivery stages at your
                own pace.
              </p>
              <div className="confirmation-actions">
                <Link
                  to={`/track/${order.id}`}
                  className="button button--primary button--wide"
                >
                  Track Order
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  to="/"
                  className="button button--ghost button--wide"
                >
                  <UtensilsCrossed size={17} aria-hidden="true" />
                  Back to Home
                </Link>
              </div>
            </section>
          </div>
        </div>

        <p className="simulated-notice">
          <span className="live-dot" />
          This is a simulated order. No payment was taken and no food will be
          delivered.
        </p>
        <ConceptFooter />
      </main>
    </div>
  )
}
