import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { CartConflictDialog } from './components/CartConflictDialog'
import { AppProvider } from './context/AppContext'
import { CheckoutPage } from './pages/CheckoutPage'
import { CartPage } from './pages/CartPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProfilePage } from './pages/ProfilePage'
import { RestaurantPage } from './pages/RestaurantPage'
import { SearchPage } from './pages/SearchPage'
import { TrackingPage } from './pages/TrackingPage'

const tabRoutes = new Set(['/', '/search', '/orders', '/profile'])

function AppShell() {
  const location = useLocation()
  const showBottomNav = tabRoutes.has(location.pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <div className="app-frame">
        <div className="route-transition" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/confirmation/:orderId"
              element={<ConfirmationPage />}
            />
            <Route path="/track/:orderId" element={<TrackingPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      {showBottomNav ? <BottomNav /> : null}
      <CartConflictDialog />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
