import {
  ArrowRight,
  Bike,
  Check,
  Clock3,
  MapPin,
  Navigation,
  ReceiptText,
  ShoppingBag,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConceptFooter } from '../components/ConceptFooter'
import { EmptyState } from '../components/EmptyState'
import { PageHeader } from '../components/PageHeader'
import {
  ORDER_STAGES,
  OrderStatusTimeline,
} from '../components/OrderStatusTimeline'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { formatTaka } from '../lib/format'

export function TrackingPage() {
  const { orderId } = useParams()
  const { findOrder, advanceOrderStatus } = useApp()
  const { showToast } = useToast()
  const order = orderId ? findOrder(orderId) : undefined

  if (!order) {
    return (
      <div className="page">
        <PageHeader title="Track order" backTo="/orders" />
        <main className="container centered-main">
          <EmptyState
            icon={<ReceiptText size={28} />}
            title="Order not found"
            description="We could not find this simulated order in your order history."
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

  const currentStage = ORDER_STAGES[order.statusIndex]
  const isDelivered = order.statusIndex === 4
  const progress = ((order.statusIndex + 1) / ORDER_STAGES.length) * 100
  const itemCount = order.items.reduce(
    (count, line) => count + line.quantity,
    0,
  )

  const handleAdvance = () => {
    if (isDelivered) return
    const nextIndex = order.statusIndex + 1
    advanceOrderStatus(order.id)
    showToast(`Status updated: ${ORDER_STAGES[nextIndex].label}`, 'info')
  }

  return (
    <div className="page tracking-page">
      <PageHeader
        title="Track order"
        subtitle={order.orderNumber}
        backTo="/orders"
        right={<span className="tracking-live-pill">Simulated</span>}
      />

      <main className="container tracking-main">
        <section className="tracking-hero">
          <div className="tracking-hero__top">
            <div>
              <span className="section-kicker">Current status</span>
              <h1>{currentStage.label}</h1>
              <p>{currentStage.description}</p>
            </div>
            <div className={`tracking-hero__icon ${isDelivered ? 'is-complete' : ''}`}>
              <span className="tracking-pulse" aria-hidden="true" />
              {isDelivered ? (
                <Check size={27} aria-hidden="true" />
              ) : (
                <Navigation size={27} aria-hidden="true" />
              )}
            </div>
          </div>

          <div
            className="tracking-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Order progress"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="tracking-progress-labels">
            <span>{order.statusIndex + 1} of 5 stages</span>
            <span>{isDelivered ? 'Complete' : 'In progress'}</span>
          </div>

          <div className="tracking-meta">
            <span>
              <Clock3 size={17} aria-hidden="true" />
              <span>
                {isDelivered ? 'Delivered' : 'Estimated arrival'}
                <strong>
                  {isDelivered ? 'Thanks for ordering' : order.estimatedDelivery}
                </strong>
              </span>
            </span>
            <span>
              <Bike size={17} aria-hidden="true" />
              <span>
                Restaurant
                <strong>{order.restaurantName}</strong>
              </span>
            </span>
            <span>
              <MapPin size={17} aria-hidden="true" />
              <span>
                Delivering to
                <strong>
                  {order.address.label}, {order.address.area}
                </strong>
              </span>
            </span>
          </div>
        </section>

        <div className="tracking-layout">
          <section className="summary-card tracking-timeline-card">
            <div className="summary-card__header">
              <div>
                <span className="section-kicker">Live simulation</span>
                <h2>Delivery journey</h2>
              </div>
              <span className="soft-badge">{order.orderNumber}</span>
            </div>
            <OrderStatusTimeline statusIndex={order.statusIndex} />

            {isDelivered ? (
              <div className="delivery-complete-card">
                <span className="delivery-complete-card__icon">
                  <Check size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>Delivered successfully</strong>
                  <p>
                    This simulated order is complete. Thanks for trying the
                    prototype.
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="button button--primary button--wide simulate-button"
                onClick={handleAdvance}
              >
                Simulate Next Status
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            )}

            {isDelivered ? (
              <div className="tracking-complete-actions">
                <Link to="/" className="button button--primary">
                  Back to Home
                </Link>
                <Link to="/orders" className="button button--secondary">
                  View all orders
                </Link>
              </div>
            ) : null}

            <p className="tracking-disclaimer">
              <span className="live-dot" />
              Simulated tracking only — no live rider or GPS connection.
            </p>
          </section>

          <aside className="tracking-side">
            <section className="summary-card">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Your food</span>
                  <h2>Order summary</h2>
                </div>
                <span className="soft-badge">
                  <ShoppingBag size={14} aria-hidden="true" />
                  {itemCount}
                </span>
              </div>
              <div className="tracking-items">
                {order.items.map((line) => (
                  <div className="compact-order-item" key={line.itemId}>
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
              <div className="tracking-total">
                <span>Total payable</span>
                <strong>{formatTaka(order.total)}</strong>
              </div>
            </section>

            <section className="summary-card tracking-address-card">
              <span className="section-kicker">Drop-off</span>
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
                  {order.address.instructions ? (
                    <small>{order.address.instructions}</small>
                  ) : null}
                </div>
              </div>
              <div className="detail-line">
                <span className="detail-line__icon">
                  <ShoppingBag size={17} aria-hidden="true" />
                </span>
                <div>
                  <strong>{order.paymentMethod.label}</strong>
                  <span>Simulated payment method</span>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <ConceptFooter />
      </main>
    </div>
  )
}
