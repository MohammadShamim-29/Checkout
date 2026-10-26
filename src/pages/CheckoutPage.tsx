import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  Banknote,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CreditCard,
  MapPin,
  Pencil,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  WalletCards,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AddressDialog } from '../components/AddressDialog'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { ConceptFooter } from '../components/ConceptFooter'
import { EmptyState } from '../components/EmptyState'
import { PageHeader } from '../components/PageHeader'
import { PriceBreakdown } from '../components/PriceBreakdown'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { PAYMENT_METHODS } from '../data'
import { formatTaka } from '../lib/format'
import type { PaymentMethodId } from '../types'

const paymentIcons = {
  cod: Banknote,
  mfs: Smartphone,
  card: CreditCard,
}

export function CheckoutPage() {
  const {
    cart,
    cartRestaurant,
    cartCount,
    totals,
    couponCode,
    selectedAddress,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
  } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [addressOpen, setAddressOpen] = useState(false)
  const [itemsOpen, setItemsOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(false)
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const handlePaymentSelect = (method: PaymentMethodId) => {
    setPaymentMethod(method)
    setError('')
  }

  const handlePlaceOrder = () => {
    if (placing) return
    setError('')

    if (!paymentMethod) {
      const message = 'Choose a payment method before placing your order.'
      setError(message)
      showToast(message, 'error')
      return
    }
    if (!selectedAddress) {
      const message = 'Choose a delivery address before placing your order.'
      setError(message)
      showToast(message, 'error')
      return
    }
    if (!cart.length) {
      const message = 'Your cart is empty. Add an item before checking out.'
      setError(message)
      showToast(message, 'error')
      return
    }

    setPlacing(true)
    timerRef.current = window.setTimeout(() => {
      const order = placeOrder()
      if (!order) {
        setPlacing(false)
        setError('Something went wrong. Please review your order and try again.')
        return
      }
      navigate(`/confirmation/${order.id}`)
    }, 750)
  }

  if (!cart.length) {
    return (
      <div className="page checkout-page">
        <PageHeader title="Checkout" backTo="/cart" />
        <main className="container centered-main">
          <EmptyState
            icon={<ShoppingBag size={30} />}
            title="There is nothing to check out"
            description="Add items to your cart, then come back to complete your simulated order."
            action={
              <Link to="/" className="button button--primary">
                Find food
              </Link>
            }
          />
        </main>
      </div>
    )
  }

  const paymentLabel =
    PAYMENT_METHODS.find((method) => method.id === paymentMethod)?.label ??
    'Not selected'

  return (
    <div className="page checkout-page">
      <PageHeader
        title="Checkout"
        subtitle="Confirm the details and place your simulated order"
        right={
          <button
            type="button"
            className="text-button page-header__action"
            onClick={() => navigate('/cart')}
          >
            Edit order
          </button>
        }
      />

      <main className="container checkout-main">
        <CheckoutSteps active={1} />

        <div className="checkout-title-row">
          <div>
            <span className="section-kicker">Almost there</span>
            <h1>Checkout</h1>
            <p>No real payment will be taken in this prototype.</p>
          </div>
          <Link to="/cart" className="review-order-link">
            <ShoppingBag size={16} aria-hidden="true" />
            Edit order
            <ChevronRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="checkout-layout">
          <div className="checkout-content">
            <section className="summary-card" aria-labelledby="delivery-title">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Delivery</span>
                  <h2 id="delivery-title">Drop-off details</h2>
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

              <div className="checkout-address-layout">
                <div className="address-display">
                  <span className="address-display__icon">
                    <MapPin size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>
                      {selectedAddress.label} · {selectedAddress.area}
                    </strong>
                    <span>
                      {selectedAddress.line1}, {selectedAddress.area},{' '}
                      {selectedAddress.city}
                    </span>
                    {selectedAddress.instructions ? (
                      <small>{selectedAddress.instructions}</small>
                    ) : null}
                  </div>
                </div>
                <div className="contact-panel">
                  <span className="section-kicker">Contact</span>
                  <strong>Ayesha Rahman</strong>
                  <span>ayesha.rahman@example.com</span>
                  <span>+880 1XXX-XXXXXX</span>
                  <small>Fictional sample contact for this prototype.</small>
                </div>
              </div>

              <div className="delivery-estimate">
                <span>
                  Estimated arrival
                  <strong>
                    {cartRestaurant
                      ? `${cartRestaurant.deliveryTime[0]}–${cartRestaurant.deliveryTime[1]} min`
                      : '25–35 min'}
                  </strong>
                </span>
                <span className="delivery-estimate__separator" />
                <span>
                  Delivering from
                  <strong>{cartRestaurant?.name ?? 'Nearby restaurant'}</strong>
                </span>
              </div>
            </section>

            <section className="summary-card">
              <button
                type="button"
                className="expandable-card-header"
                onClick={() => setItemsOpen((open) => !open)}
                aria-expanded={itemsOpen}
              >
                <span>
                  <span className="section-kicker">Order summary</span>
                  <strong>
                    {cartCount} {cartCount === 1 ? 'item' : 'items'} ·{' '}
                    {formatTaka(totals.subtotal)}
                  </strong>
                </span>
                {itemsOpen ? (
                  <ChevronUp size={19} aria-hidden="true" />
                ) : (
                  <ChevronDown size={19} aria-hidden="true" />
                )}
              </button>
              {itemsOpen ? (
                <div className="compact-order-items">
                  {cart.map((line) => (
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
              ) : null}
            </section>

            <section className="summary-card">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Payment</span>
                  <h2>How would you like to pay?</h2>
                </div>
                <span className="prototype-pill">Prototype only</span>
              </div>

              <div className="payment-options" role="radiogroup" aria-label="Payment method">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = paymentIcons[method.id]
                  const isSelected = paymentMethod === method.id
                  return (
                    <label
                      key={method.id}
                      className={`payment-option ${isSelected ? 'is-selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => handlePaymentSelect(method.id)}
                      />
                      <span className="payment-option__icon">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="payment-option__copy">
                        <span className="payment-option__title">
                          {method.label}
                          {method.id === 'cod' ? (
                            <span className="mini-badge">Popular</span>
                          ) : null}
                        </span>
                        <span>{method.description}</span>
                      </span>
                      <span className="payment-option__radio" aria-hidden="true">
                        {isSelected ? <Check size={13} /> : null}
                      </span>
                    </label>
                  )
                })}
              </div>

              <p className="payment-note">
                <ShieldCheck size={15} aria-hidden="true" />
                Payment methods are simulated. No card or mobile wallet details
                are collected.
              </p>
            </section>
          </div>

          <aside className="checkout-sidebar">
            <div className="summary-card summary-card--sticky">
              <div className="summary-card__header">
                <div>
                  <span className="section-kicker">Final amount</span>
                  <h2>Price details</h2>
                </div>
                <span className="summary-lock-badge">
                  <WalletCards size={14} aria-hidden="true" />
                  {couponCode ? couponCode : 'No coupon'}
                </span>
              </div>

              <div className="checkout-total-preview">
                <span>Payable now</span>
                <strong>{formatTaka(totals.total)}</strong>
              </div>

              <button
                type="button"
                className="price-disclosure"
                onClick={() => setPriceOpen((open) => !open)}
                aria-expanded={priceOpen}
              >
                {priceOpen ? 'Hide price details' : 'View complete price breakdown'}
                {priceOpen ? (
                  <ChevronUp size={17} aria-hidden="true" />
                ) : (
                  <ChevronDown size={17} aria-hidden="true" />
                )}
              </button>

              {priceOpen ? (
                <div className="checkout-price-details">
                  <PriceBreakdown
                    totals={totals}
                    couponCode={couponCode}
                    showBeforeDiscount
                  />
                </div>
              ) : null}

              <div className="checkout-payment-summary">
                <span>Paying with</span>
                <strong>{paymentLabel}</strong>
              </div>

              {error ? (
                <p className="checkout-error" role="alert">
                  <AlertCircle size={16} aria-hidden="true" />
                  {error}
                </p>
              ) : null}

              <div className="summary-actions">
                <button
                  type="button"
                  className="button button--primary button--wide"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                >
                  {placing ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Placing order…
                    </>
                  ) : (
                    <>
                      Place Order · {formatTaka(totals.total)}
                      <ChevronRight size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="button button--ghost button--wide"
                  onClick={() => navigate('/cart')}
                >
                  Edit Order
                </button>
              </div>
              <p className="summary-footnote">
                <ShieldCheck size={14} aria-hidden="true" />
                This is a simulated purchase. No real payment is processed.
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
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Placing…
              </>
            ) : (
              <>
                Place Order
                <ChevronRight size={17} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>

      <AddressDialog open={addressOpen} onClose={() => setAddressOpen(false)} />
    </div>
  )
}
