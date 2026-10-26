import { useState, type FormEvent } from 'react'
import {
  ArrowLeftRight,
  BadgePercent,
  Check,
  ChevronRight,
  MapPin,
  Pencil,
  ShoppingBag,
  Tag,
  Trash2,
  UtensilsCrossed,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AddressDialog } from '../components/AddressDialog'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { ConceptFooter } from '../components/ConceptFooter'
import { EmptyState } from '../components/EmptyState'
import { Modal } from '../components/Modal'
import { PageHeader } from '../components/PageHeader'
import { PriceBreakdown } from '../components/PriceBreakdown'
import { QuantityStepper } from '../components/QuantityStepper'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  COUPON_CODE,
  COUPON_DISCOUNT,
  COUPON_MIN_SUBTOTAL,
} from '../data'
import { formatTaka } from '../lib/format'

interface CouponMessage {
  tone: 'success' | 'error'
  text: string
}

export function CartPage() {
  const {
    cart,
    cartRestaurant,
    cartCount,
    totals,
    couponCode,
    applyCoupon,
    removeCoupon,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    selectedAddress,
  } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [couponInput, setCouponInput] = useState('')
  const [couponMessage, setCouponMessage] = useState<CouponMessage | null>(
    null,
  )
  const [addressOpen, setAddressOpen] = useState(false)
  const [clearOpen, setClearOpen] = useState(false)

  const handleApplyCoupon = (event: FormEvent) => {
    event.preventDefault()
    const result = applyCoupon(couponInput)
    setCouponMessage({
      tone: result.ok ? 'success' : 'error',
      text: result.message,
    })
    if (result.ok) setCouponInput('')
  }

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId)
    setCouponMessage(null)
    showToast(`${itemName} removed`, 'info')
  }

  if (!cart.length) {
    return (
      <div className="page cart-page">
        <PageHeader
          title="Order summary"
          subtitle="Review everything before checkout"
          backTo="/"
        />
        <main className="container centered-main">
          <EmptyState
            icon={<ShoppingBag size={30} />}
            title="Your cart is empty"
            description="Add something delicious and your order summary will appear here."
            action={
              <Link to="/" className="button button--primary">
                Explore restaurants
              </Link>
            }
          />
          <ConceptFooter />
        </main>
      </div>
    )
  }

  const couponActive = Boolean(couponCode) && totals.discount > 0
  const couponInactive = Boolean(couponCode) && totals.discount === 0
  const returnTo = cartRestaurant
    ? `/restaurant/${cartRestaurant.id}`
    : '/'

  return (
    <div className="page cart-page">
      <PageHeader
        title="Order summary"
        subtitle={`${cartCount} ${cartCount === 1 ? 'item' : 'items'} from ${cartRestaurant?.name ?? 'your restaurant'}`}
      />

      <main className="container cart-main">
        <CheckoutSteps active={0} />

        <div className="cart-heading-row">
          <div>
            <span className="section-kicker">Review before checkout</span>
            <h1>Your order, in one place</h1>
          </div>
          <span className="review-badge">
            <Check size={14} aria-hidden="true" />
            Prices include all fees
          </span>
        </div>

        <div className="cart-layout">
          <div className="cart-content">
            {cartRestaurant ? (
              <section className="restaurant-strip">
                <img src={cartRestaurant.image} alt="" />
                <div>
                  <span className="section-kicker">Ordering from</span>
                  <strong>{cartRestaurant.name}</strong>
                  <span>{cartRestaurant.tagline}</span>
                </div>
                <Link to={returnTo} className="text-link">
                  Add items
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
              </section>
            ) : null}

            <section className="summary-card" aria-labelledby="items-title">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Your items</span>
                  <h2 id="items-title">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </h2>
                </div>
                <button
                  type="button"
                  className="text-danger-button"
                  onClick={() => setClearOpen(true)}
                >
                  <Trash2 size={15} aria-hidden="true" />
                  Clear cart
                </button>
              </div>

              <div className="cart-items">
                {cart.map((line) => (
                  <article className="cart-item" key={line.itemId}>
                    <img
                      className="cart-item__image"
                      src={line.image}
                      alt={line.name}
                    />
                    <div className="cart-item__content">
                      <div className="cart-item__top">
                        <div>
                          <h3>{line.name}</h3>
                          <span className="cart-item__unit">
                            {formatTaka(line.price)} each
                          </span>
                        </div>
                        <strong className="cart-item__subtotal">
                          {formatTaka(line.price * line.quantity)}
                        </strong>
                      </div>
                      <div className="cart-item__bottom">
                        <QuantityStepper
                          quantity={line.quantity}
                          onIncrease={() => incrementItem(line.itemId)}
                          onDecrease={() => decrementItem(line.itemId)}
                          decreaseDisabled={line.quantity === 1}
                          itemName={line.name}
                          compact
                        />
                        <button
                          type="button"
                          className="remove-item-button"
                          onClick={() =>
                            handleRemoveItem(line.itemId, line.name)
                          }
                          aria-label={`Remove ${line.name} from cart`}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="summary-card" aria-labelledby="address-title">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Delivery details</span>
                  <h2 id="address-title">Where it is going</h2>
                </div>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setAddressOpen(true)}
                >
                  <Pencil size={14} aria-hidden="true" />
                  Edit address
                </button>
              </div>
              <div className="address-display">
                <span className="address-display__icon">
                  <MapPin size={19} aria-hidden="true" />
                </span>
                <div>
                  <strong>{selectedAddress.label}</strong>
                  <span>
                    {selectedAddress.line1}, {selectedAddress.area},{' '}
                    {selectedAddress.city}
                  </span>
                  {selectedAddress.instructions ? (
                    <small>{selectedAddress.instructions}</small>
                  ) : null}
                </div>
              </div>
              <div className="delivery-estimate">
                <span>
                  Estimated delivery
                  <strong>
                    {cartRestaurant
                      ? `${cartRestaurant.deliveryTime[0]}–${cartRestaurant.deliveryTime[1]} min`
                      : '25–35 min'}
                  </strong>
                </span>
                <span className="delivery-estimate__separator" />
                <span>
                  Delivery fee
                  <strong>{formatTaka(totals.deliveryFee)}</strong>
                </span>
              </div>
            </section>

            <section className="summary-card coupon-card" aria-labelledby="coupon-title">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Save a little</span>
                  <h2 id="coupon-title">
                    <Tag size={18} aria-hidden="true" />
                    Coupon & offers
                  </h2>
                </div>
              </div>

              {couponCode ? (
                <div
                  className={`applied-coupon ${couponActive ? 'is-active' : 'is-inactive'}`}
                >
                  <span className="applied-coupon__icon">
                    <BadgePercent size={20} aria-hidden="true" />
                  </span>
                  <div className="applied-coupon__copy">
                    <span>
                      <strong>{couponCode}</strong>
                      <span className="coupon-status-pill">
                        {couponActive ? 'Applied' : 'Not eligible'}
                      </span>
                    </span>
                    <p>
                      {couponActive
                        ? `You saved ${formatTaka(COUPON_DISCOUNT)} on this order.`
                        : `Add ${formatTaka(totals.amountToUnlock)} more to unlock this discount.`}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      removeCoupon()
                      setCouponMessage(null)
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form className="coupon-form" onSubmit={handleApplyCoupon}>
                  <label className="sr-only" htmlFor="coupon-code">
                    Coupon code
                  </label>
                  <div className="coupon-input-wrap">
                    <Tag size={17} aria-hidden="true" />
                    <input
                      id="coupon-code"
                      value={couponInput}
                      onChange={(event) => {
                        setCouponInput(event.target.value.toUpperCase())
                        setCouponMessage(null)
                      }}
                      placeholder="Enter coupon code"
                      autoComplete="off"
                    />
                  </div>
                  <button type="submit" className="button button--secondary">
                    Apply coupon
                  </button>
                </form>
              )}

              {couponMessage ? (
                <p
                  className={`inline-message inline-message--${couponMessage.tone}`}
                  role="status"
                >
                  {couponMessage.tone === 'success' ? (
                    <Check size={15} aria-hidden="true" />
                  ) : (
                    <BadgePercent size={15} aria-hidden="true" />
                  )}
                  {couponMessage.text}
                </p>
              ) : null}

              {!couponCode ? (
                <p className="coupon-hint">
                  Try <strong>{COUPON_CODE}</strong> for ৳{COUPON_DISCOUNT} off
                  orders over {formatTaka(COUPON_MIN_SUBTOTAL)}.
                </p>
              ) : null}

              {couponInactive ? (
                <div className="coupon-progress">
                  <span
                    style={{
                      width: `${Math.min(100, (totals.subtotal / COUPON_MIN_SUBTOTAL) * 100)}%`,
                    }}
                  />
                </div>
              ) : null}
            </section>

            <div className="cart-secondary-action">
              <Link to={returnTo} className="button button--ghost">
                <UtensilsCrossed size={17} aria-hidden="true" />
                Continue shopping
              </Link>
              <span>Your cart is saved automatically.</span>
            </div>
          </div>

          <aside className="cart-sidebar">
            <div className="summary-card summary-card--sticky">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">No surprises</span>
                  <h2>Price summary</h2>
                </div>
                <span className="summary-lock-badge">
                  <Check size={13} aria-hidden="true" />
                  Transparent
                </span>
              </div>
              <PriceBreakdown
                totals={totals}
                couponCode={couponCode}
              />
              <div className="summary-actions">
                <button
                  type="button"
                  className="button button--primary button--wide"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
                <Link
                  to={returnTo}
                  className="button button--ghost button--wide"
                >
                  Continue Shopping
                </Link>
              </div>
              <p className="summary-footnote">
                <ArrowLeftRight size={14} aria-hidden="true" />
                Final total is confirmed before you place the order.
              </p>
            </div>
          </aside>
        </div>

        <ConceptFooter />
      </main>

      <div className="mobile-checkout-bar">
        <div className="mobile-checkout-bar__inner container">
          <div>
            <small>Total payable</small>
            <strong>{formatTaka(totals.total)}</strong>
          </div>
          <button
            type="button"
            className="button button--primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      <AddressDialog open={addressOpen} onClose={() => setAddressOpen(false)} />

      <Modal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        title="Clear your cart?"
        description="This will remove every item and any applied coupon."
        footer={
          <>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setClearOpen(false)}
              data-autofocus
            >
              Keep items
            </button>
            <button
              type="button"
              className="button button--danger"
              onClick={() => {
                clearCart()
                setClearOpen(false)
                setCouponMessage(null)
                showToast('Cart cleared', 'info')
              }}
            >
              Clear cart
            </button>
          </>
        }
      >
        <p className="modal-copy">
          You currently have {cartCount}{' '}
          {cartCount === 1 ? 'item' : 'items'} worth{' '}
          {formatTaka(totals.total)}. You can always add them again from the
          menu.
        </p>
      </Modal>
    </div>
  )
}
