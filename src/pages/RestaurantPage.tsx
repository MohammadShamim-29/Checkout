import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Bike,
  Clock3,
  Flame,
  MapPin,
  Star,
  UtensilsCrossed,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CartButton } from '../components/CartButton'
import { EmptyState } from '../components/EmptyState'
import { ItemDetailModal } from '../components/ItemDetailModal'
import { QuantityStepper } from '../components/QuantityStepper'
import { useApp } from '../context/AppContext'
import { getRestaurant, getRestaurantMenu } from '../data'
import { formatDeliveryTime, formatRating, formatTaka } from '../lib/format'
import type { MenuItem } from '../types'

export function RestaurantPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = id ? getRestaurant(id) : undefined
  const {
    addItem,
    incrementItem,
    decrementItem,
    getQuantity,
    totals,
    cartCount,
  } = useApp()
  const [activeMenu, setActiveMenu] = useState('All')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const menu = useMemo(
    () => (restaurant ? getRestaurantMenu(restaurant.id) : []),
    [restaurant],
  )
  const menuCategories = useMemo(
    () => ['All', ...Array.from(new Set(menu.map((item) => item.menuCategory)))],
    [menu],
  )
  const visibleItems =
    activeMenu === 'All'
      ? menu
      : menu.filter((item) => item.menuCategory === activeMenu)

  if (!restaurant) {
    return (
      <div className="page">
        <main className="container centered-main">
          <EmptyState
            icon={<UtensilsCrossed size={28} />}
            title="Restaurant not found"
            description="This restaurant may have moved. Head back to discovery to find something else."
            action={
              <Link to="/" className="button button--primary">
                Back to home
              </Link>
            }
          />
        </main>
      </div>
    )
  }

  return (
    <div className="page restaurant-page">
      <div className="restaurant-hero">
        <img src={restaurant.image} alt={`${restaurant.name} restaurant`} />
        <div className="restaurant-hero__shade" />
        <div className="restaurant-topbar container">
          <button
            type="button"
            className="floating-icon-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <CartButton />
        </div>
        <div className="restaurant-hero__badge">
          {restaurant.badge ?? restaurant.category}
        </div>
      </div>

      <main className="container restaurant-main">
        <section className="restaurant-info-card">
          <div className="restaurant-info-card__heading">
            <div>
              <span className="section-kicker">{restaurant.category}</span>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.tagline}</p>
            </div>
            <div className="restaurant-score">
              <span>
                <Star size={15} fill="currentColor" aria-hidden="true" />
                {formatRating(restaurant.rating)}
              </span>
              <small>{restaurant.reviewCount} reviews</small>
            </div>
          </div>
          <div className="restaurant-facts">
            <span>
              <Clock3 size={16} aria-hidden="true" />
              {formatDeliveryTime(restaurant.deliveryTime)}
            </span>
            <span>
              <Bike size={16} aria-hidden="true" />
              {formatTaka(restaurant.deliveryFee)} delivery
            </span>
            <span>
              <MapPin size={16} aria-hidden="true" />
              {restaurant.distance}
            </span>
          </div>
        </section>

        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {menuCategories.map((category) => (
            <button
              type="button"
              key={category}
              role="tab"
              aria-selected={activeMenu === category}
              className={`menu-tab ${activeMenu === category ? 'is-active' : ''}`}
              onClick={() => setActiveMenu(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-sections">
          {menuCategories
            .filter((category) => category !== 'All')
            .filter(
              (category) => activeMenu === 'All' || activeMenu === category,
            )
            .map((category) => {
              const items = visibleItems.filter(
                (item) => item.menuCategory === category,
              )
              if (!items.length) return null
              return (
                <section className="menu-section" key={category}>
                  <div className="section-heading section-heading--tight">
                    <div>
                      <span className="section-kicker">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                      <h2>{category}</h2>
                    </div>
                  </div>
                  <div className="menu-list">
                    {items.map((item) => {
                      const quantity = getQuantity(item.id)
                      return (
                        <article className="menu-item-card" key={item.id}>
                          <button
                            type="button"
                            className="menu-item-card__main"
                            onClick={() => setSelectedItem(item)}
                          >
                            <span className="menu-item-card__copy">
                              <span className="menu-item-card__name">
                                {item.name}
                                {item.spiceLevel === 3 ? (
                                  <Flame
                                    size={15}
                                    className="spice-icon"
                                    aria-label="Extra spicy"
                                  />
                                ) : null}
                              </span>
                              <span className="menu-item-card__description">
                                {item.description}
                              </span>
                              <span className="menu-item-card__price">
                                {formatTaka(item.price)}
                              </span>
                            </span>
                            <span className="menu-item-card__image">
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                              />
                            </span>
                          </button>
                          <div className="menu-item-card__action">
                            {quantity > 0 ? (
                              <QuantityStepper
                                quantity={quantity}
                                onIncrease={() => incrementItem(item.id)}
                                onDecrease={() => decrementItem(item.id)}
                                itemName={item.name}
                                compact
                              />
                            ) : (
                              <button
                                type="button"
                                className="add-button"
                                onClick={() => addItem(restaurant, item)}
                                aria-label={`Add ${item.name} to cart`}
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}
        </div>

        <p className="prototype-note">
          Menu, restaurants and prices are fictional and used for this product
          concept.
        </p>
      </main>

      {cartCount > 0 ? (
        <div className="mobile-cart-bar">
          <div className="mobile-cart-bar__inner container">
            <div className="mobile-cart-bar__total">
              <span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
              <strong>{formatTaka(totals.total)}</strong>
            </div>
            <Link to="/cart" className="button button--primary">
              View cart
            </Link>
          </div>
        </div>
      ) : null}

      <ItemDetailModal
        item={selectedItem}
        restaurant={restaurant}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
