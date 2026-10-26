import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRestaurant } from '../data'
import { useApp } from '../context/AppContext'
import { formatTaka } from '../lib/format'
import type { MenuItem } from '../types'

export function DishCard({ item }: { item: MenuItem }) {
  const { addItem } = useApp()
  const restaurant = getRestaurant(item.restaurantId)

  if (!restaurant) return null

  return (
    <article className="dish-card">
      <Link
        to={`/restaurant/${restaurant.id}`}
        className="dish-card__image-wrap"
        aria-label={`Open ${restaurant.name}`}
      >
        <img src={item.image} alt={item.name} loading="lazy" />
      </Link>
      <div className="dish-card__body">
        <Link to={`/restaurant/${restaurant.id}`} className="dish-card__name">
          {item.name}
        </Link>
        <span className="dish-card__restaurant">{restaurant.name}</span>
        <div className="dish-card__footer">
          <strong>{formatTaka(item.price)}</strong>
          <button
            type="button"
            className="round-add-button"
            onClick={() => addItem(restaurant, item)}
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
