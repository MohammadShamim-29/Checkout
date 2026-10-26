import {
  ChevronRight,
  Clock3,
  ReceiptText,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { CartButton } from '../components/CartButton'
import { ConceptFooter } from '../components/ConceptFooter'
import { EmptyState } from '../components/EmptyState'
import { useApp } from '../context/AppContext'
import { ORDER_STAGES } from '../components/OrderStatusTimeline'
import { formatShortDate, formatTaka } from '../lib/format'

export function OrdersPage() {
  const { orders } = useApp()

  return (
    <div className="page orders-page">
      <header className="simple-topbar">
        <div className="container simple-topbar__inner">
          <Brand compact />
          <CartButton />
        </div>
      </header>

      <main className="container orders-main">
        <div className="page-title-row">
          <div>
            <span className="section-kicker">Saved in this browser</span>
            <h1>Your orders</h1>
            <p>Simulated orders you have placed in this prototype.</p>
          </div>
          {orders.length > 0 ? (
            <span className="section-count">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          ) : null}
        </div>

        {orders.length === 0 ? (
          <EmptyState
            icon={<ReceiptText size={29} />}
            title="No orders yet"
            description="Complete a simulated checkout and your order history will appear here — even after a refresh."
            action={
              <Link to="/" className="button button--primary">
                <UtensilsCrossed size={17} aria-hidden="true" />
                Start an order
              </Link>
            }
          />
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const stage = ORDER_STAGES[order.statusIndex]
              const itemCount = order.items.reduce(
                (sum, line) => sum + line.quantity,
                0,
              )
              const isComplete = order.statusIndex === 4
              return (
                <Link
                  to={`/track/${order.id}`}
                  className="order-card"
                  key={order.id}
                >
                  <div className="order-card__top">
                    <div className="order-card__restaurant">
                      <img src={order.restaurantImage} alt="" />
                      <div>
                        <span className="order-card__number">
                          {order.orderNumber}
                        </span>
                        <h2>{order.restaurantName}</h2>
                        <span>{formatShortDate(order.placedAt)}</span>
                      </div>
                    </div>
                    <span
                      className={`order-status ${isComplete ? 'is-complete' : 'is-active'}`}
                    >
                      <span className="live-dot" />
                      {stage.label}
                    </span>
                  </div>

                  <div className="order-card__divider" />

                  <div className="order-card__bottom">
                    <div className="order-card__items">
                      <span>
                        {order.items
                          .slice(0, 2)
                          .map((line) => `${line.quantity} × ${line.name}`)
                          .join(' · ')}
                        {order.items.length > 2 ? ' · …' : ''}
                      </span>
                      <span className="order-card__meta">
                        <ShoppingBag size={14} aria-hidden="true" />
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        <span className="meta-dot" />
                        <Clock3 size={14} aria-hidden="true" />
                        {order.estimatedDelivery}
                      </span>
                    </div>
                    <div className="order-card__total">
                      <strong>{formatTaka(order.total)}</strong>
                      <span>
                        Track order
                        <ChevronRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <ConceptFooter />
      </main>
    </div>
  )
}
