import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function CartButton() {
  const { cartCount } = useApp()

  return (
    <Link
      to="/cart"
      className="cart-button"
      aria-label={`Open cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
    >
      <ShoppingBag size={20} aria-hidden="true" />
      {cartCount > 0 ? (
        <span className="cart-button__badge" key={cartCount}>
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      ) : null}
    </Link>
  )
}
