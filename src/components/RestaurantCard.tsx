import { Bike, Clock3, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Restaurant } from '../types'
import { formatDeliveryTime, formatRating, formatTaka } from '../lib/format'

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="restaurant-card"
      aria-label={`Open ${restaurant.name}`}
    >
      <div className="restaurant-card__image-wrap">
        <img
          src={restaurant.image}
          alt={`${restaurant.name} food`}
          loading="lazy"
        />
        {restaurant.badge ? (
          <span className="restaurant-card__badge">{restaurant.badge}</span>
        ) : null}
      </div>
      <div className="restaurant-card__body">
        <div className="restaurant-card__title-row">
          <h3>{restaurant.name}</h3>
          <span className="rating-pill">
            <Star size={13} fill="currentColor" aria-hidden="true" />
            {formatRating(restaurant.rating)}
          </span>
        </div>
        <p className="restaurant-card__tagline">{restaurant.tagline}</p>
        <div className="restaurant-card__meta">
          <span>
            <Clock3 size={14} aria-hidden="true" />
            {formatDeliveryTime(restaurant.deliveryTime)}
          </span>
          <span>
            <Bike size={14} aria-hidden="true" />
            {formatTaka(restaurant.deliveryFee)} delivery
          </span>
        </div>
        {restaurant.promo ? (
          <span className="restaurant-card__promo">{restaurant.promo}</span>
        ) : (
          <span className="restaurant-card__distance">
            {restaurant.distance} away · {restaurant.reviewCount} reviews
          </span>
        )}
      </div>
    </Link>
  )
}
