import { Home, ReceiptText, Search, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/search', label: 'Search', icon: Search, end: false },
  { to: '/orders', label: 'Orders', icon: ReceiptText, end: false },
  { to: '/profile', label: 'Profile', icon: UserRound, end: false },
]

export function BottomNav() {
  const { orders } = useApp()

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      <div className="bottom-nav__inner">
        {navItems.map((item) => {
          const Icon = item.icon
          const showBadge = item.to === '/orders' && orders.length > 0
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `bottom-nav__item ${isActive ? 'is-active' : ''}`
              }
            >
              <span className="bottom-nav__icon">
                <Icon size={21} strokeWidth={2.1} aria-hidden="true" />
                {showBadge ? (
                  <span className="bottom-nav__badge">
                    {orders.length > 9 ? '9+' : orders.length}
                  </span>
                ) : null}
              </span>
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
