import { useState } from 'react'
import {
  BadgeHelp,
  ChevronRight,
  CircleHelp,
  Info,
  Mail,
  MapPin,
  Pencil,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AddressDialog } from '../components/AddressDialog'
import { Brand } from '../components/Brand'
import { CartButton } from '../components/CartButton'
import { ConceptFooter } from '../components/ConceptFooter'
import { Modal } from '../components/Modal'
import { useApp } from '../context/AppContext'

const faqs = [
  {
    question: 'How do I place a prototype order?',
    answer:
      'Choose a restaurant, add items, review the order summary, select a simulated payment method and tap Place Order. No real payment is taken.',
  },
  {
    question: 'Why can I only order from one restaurant?',
    answer:
      'This prototype uses a single-restaurant cart so item totals, delivery estimates and the review step stay easy to understand.',
  },
  {
    question: 'Where is my order history stored?',
    answer:
      'Your simulated orders and cart are stored in this browser using local storage. Clearing browser data will remove them.',
  },
  {
    question: 'Does tracking connect to a real rider?',
    answer:
      'No. Tracking is a manual simulation. Tap Simulate Next Status to advance through each delivery stage.',
  },
]

export function ProfilePage() {
  const { addresses, selectedAddress, orders } = useApp()
  const [addressOpen, setAddressOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className="page profile-page">
      <header className="simple-topbar">
        <div className="container simple-topbar__inner">
          <Brand compact />
          <CartButton />
        </div>
      </header>

      <main className="container profile-main">
        <section className="profile-card">
          <div className="profile-card__avatar" aria-hidden="true">
            AR
          </div>
          <div className="profile-card__copy">
            <span className="section-kicker">Sample customer</span>
            <h1>Ayesha Rahman</h1>
            <span className="profile-card__meta">
              <span>
                <Smartphone size={14} aria-hidden="true" />
                +880 1XXX-XXXXXX
              </span>
              <span>
                <Mail size={14} aria-hidden="true" />
                ayesha.rahman@example.com
              </span>
            </span>
            <span className="prototype-pill">No login required</span>
          </div>
          <div className="profile-card__stats">
            <span>
              <strong>{orders.length}</strong>
              Orders
            </span>
            <span>
              <strong>{addresses.length}</strong>
              Addresses
            </span>
          </div>
        </section>

        <div className="profile-layout">
          <section className="summary-card">
            <div className="summary-card__header">
              <div>
                <span className="section-kicker">Saved address</span>
                <h2>Default delivery spot</h2>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => setAddressOpen(true)}
              >
                <Pencil size={14} aria-hidden="true" />
                Manage
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
            <p className="profile-hint">
              {addresses.length} saved{' '}
              {addresses.length === 1 ? 'address' : 'addresses'} in this
              browser.
            </p>
          </section>

          <section className="summary-card profile-menu-card">
            <span className="section-kicker">Account</span>
            <h2>More from your account</h2>
            <div className="profile-menu">
              <Link to="/orders" className="profile-menu__item">
                <span className="profile-menu__icon">
                  <ReceiptText size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>Order history</strong>
                  <small>View your simulated orders</small>
                </span>
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="profile-menu__item"
                onClick={() => setHelpOpen(true)}
              >
                <span className="profile-menu__icon">
                  <CircleHelp size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>Help & support</strong>
                  <small>Answers for this prototype</small>
                </span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="profile-menu__item"
                onClick={() => setAboutOpen(true)}
              >
                <span className="profile-menu__icon">
                  <Info size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>About this prototype</strong>
                  <small>Purpose, scope and limitations</small>
                </span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>

        <section className="profile-note">
          <ShieldCheck size={18} aria-hidden="true" />
          <div>
            <strong>Your privacy</strong>
            <p>
              This concept does not collect real personal information, payment
              credentials or precise location data.
            </p>
          </div>
        </section>

        <ConceptFooter />
      </main>

      <AddressDialog open={addressOpen} onClose={() => setAddressOpen(false)} />

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Help & support"
        description="Support is simulated in this concept prototype."
      >
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="help-note">
          <BadgeHelp size={19} aria-hidden="true" />
          <span>
            For this assessment, no live support channel is connected.
          </span>
        </div>
      </Modal>

      <Modal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="About this prototype"
        description="Pathao Food — improved checkout concept"
      >
        <div className="about-copy">
          <p>
            This independent product concept explores a clearer pre-checkout
            order review experience for food delivery in Bangladesh. It was
            inspired by a checkout pattern observed in Foodpanda, not by a
            verified limitation in every Pathao Food version or ordering
            scenario.
          </p>
          <div className="about-principles">
            <span>
              <UserRound size={16} aria-hidden="true" />
              Product concept, not an official app
            </span>
            <span>
              <ReceiptText size={16} aria-hidden="true" />
              Single, consistent price calculation
            </span>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Simulated payments and tracking
            </span>
          </div>
          <p>
            All restaurants, menu items, prices, contacts and orders are
            fictional. No data leaves this browser.
          </p>
          <p className="about-disclaimer">
            Independent concept prototype — not affiliated with Pathao.
          </p>
        </div>
      </Modal>
    </div>
  )
}
