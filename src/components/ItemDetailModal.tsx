import { useEffect, useState } from 'react'
import { Flame, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatTaka } from '../lib/format'
import type { MenuItem, Restaurant } from '../types'
import { Modal } from './Modal'

interface ItemDetailModalProps {
  item: MenuItem | null
  restaurant: Restaurant
  onClose: () => void
}

export function ItemDetailModal({
  item,
  restaurant,
  onClose,
}: ItemDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useApp()

  useEffect(() => {
    if (item) setQuantity(1)
  }, [item])

  if (!item) return null

  const handleAdd = () => {
    addItem(restaurant, item, quantity)
    onClose()
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={item.name}
      description={restaurant.name}
      footer={
        <button
          type="button"
          className="button button--primary button--wide"
          onClick={handleAdd}
        >
          <ShoppingBag size={18} aria-hidden="true" />
          Add {quantity > 1 ? `${quantity} items` : 'to cart'} ·{' '}
          {formatTaka(item.price * quantity)}
        </button>
      }
    >
      <div className="item-detail">
        <div className="item-detail__image-wrap">
          <img src={item.image} alt={item.name} />
          {item.spiceLevel ? (
            <span className="spice-badge">
              <Flame size={14} aria-hidden="true" />
              {item.spiceLevel === 3
                ? 'Extra spicy'
                : item.spiceLevel === 2
                  ? 'Spicy'
                  : 'Mild spice'}
            </span>
          ) : null}
        </div>
        <p className="item-detail__description">{item.description}</p>
        <div className="item-detail__row">
          <div>
            <span className="item-detail__price">{formatTaka(item.price)}</span>
            <span className="item-detail__unit">per item</span>
          </div>
          <div className="quantity-stepper" aria-label="Choose quantity">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity === 1}
              aria-label="Decrease quantity"
            >
              <Minus size={15} aria-hidden="true" />
            </button>
            <span aria-live="polite">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(20, value + 1))}
              aria-label="Increase quantity"
            >
              <Plus size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="item-detail__note">
          Menu item details and pricing are illustrative for this prototype.
        </p>
      </div>
    </Modal>
  )
}
