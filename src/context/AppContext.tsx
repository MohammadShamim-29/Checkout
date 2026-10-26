import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  COUPON_CODE,
  COUPON_DISCOUNT,
  COUPON_MIN_SUBTOTAL,
  PAYMENT_METHODS,
  RESTAURANTS,
  getRestaurant,
} from '../data'
import { calculateTotals } from '../lib/pricing'
import {
  initialPersistedState,
  loadPersistedState,
  savePersistedState,
} from '../lib/storage'
import type {
  Address,
  CartLine,
  MenuItem,
  Order,
  PaymentMethodId,
  PendingAdd,
  PersistedState,
  Restaurant,
  Totals,
} from '../types'
import { useToast } from './ToastContext'

interface CouponResult {
  ok: boolean
  message: string
}

interface AppContextValue {
  cart: CartLine[]
  cartRestaurant: Restaurant | null
  cartCount: number
  totals: Totals
  couponCode: string | null
  addresses: Address[]
  selectedAddress: Address
  orders: Order[]
  paymentMethod: PaymentMethodId | null
  pendingAdd: PendingAdd | null
  addItem: (
    restaurant: Restaurant,
    item: MenuItem,
    quantity?: number,
  ) => 'added' | 'conflict'
  confirmPendingAdd: () => void
  cancelPendingAdd: () => void
  incrementItem: (itemId: string) => void
  decrementItem: (itemId: string) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  getQuantity: (itemId: string) => number
  applyCoupon: (code: string) => CouponResult
  removeCoupon: () => void
  selectAddress: (addressId: string) => void
  addAddress: (address: Omit<Address, 'id'>) => Address
  updateAddress: (address: Address) => void
  setPaymentMethod: (method: PaymentMethodId | null) => void
  placeOrder: () => Order | null
  advanceOrderStatus: (orderId: string) => void
  findOrder: (orderId: string) => Order | undefined
  resetDemo: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

function makeOrderNumber() {
  const now = new Date()
  const date = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `PF-${date}-${suffix}`
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() =>
    loadPersistedState(),
  )
  const [pendingAdd, setPendingAdd] = useState<PendingAdd | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    savePersistedState(state)
  }, [state])

  const totals = useMemo(
    () => calculateTotals(state.cart, state.couponCode),
    [state.cart, state.couponCode],
  )

  const cartRestaurant = useMemo(
    () =>
      state.cartRestaurantId
        ? getRestaurant(state.cartRestaurantId) ?? null
        : null,
    [state.cartRestaurantId],
  )

  const selectedAddress = useMemo(
    () =>
      state.addresses.find(
        (address) => address.id === state.selectedAddressId,
      ) ?? state.addresses[0],
    [state.addresses, state.selectedAddressId],
  )

  const getQuantity = useCallback(
    (itemId: string) =>
      state.cart.find((line) => line.itemId === itemId)?.quantity ?? 0,
    [state.cart],
  )

  const addLine = useCallback(
    (
      current: PersistedState,
      restaurant: Restaurant,
      item: MenuItem,
      quantity: number,
    ): PersistedState => {
      const existing = current.cart.find((line) => line.itemId === item.id)
      const cart = existing
        ? current.cart.map((line) =>
            line.itemId === item.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [
            ...current.cart,
            {
              itemId: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              image: item.image,
              quantity,
            },
          ]

      return {
        ...current,
        cart,
        cartRestaurantId: restaurant.id,
      }
    },
    [],
  )

  const addItem = useCallback(
    (restaurant: Restaurant, item: MenuItem, quantity = 1) => {
      const hasOtherRestaurant =
        state.cart.length > 0 &&
        state.cartRestaurantId !== null &&
        state.cartRestaurantId !== restaurant.id

      if (hasOtherRestaurant) {
        setPendingAdd({ restaurant, item, quantity })
        return 'conflict' as const
      }

      setState((current) => addLine(current, restaurant, item, quantity))
      showToast(`${item.name} added to cart`)
      return 'added' as const
    },
    [addLine, showToast, state.cart.length, state.cartRestaurantId],
  )

  const confirmPendingAdd = useCallback(() => {
    if (!pendingAdd) return
    setState((current) =>
      addLine(
        {
          ...current,
          cart: [],
          cartRestaurantId: null,
          couponCode: null,
        },
        pendingAdd.restaurant,
        pendingAdd.item,
        pendingAdd.quantity,
      ),
    )
    showToast(
      `New cart started with ${pendingAdd.item.name}`,
      'info',
    )
    setPendingAdd(null)
  }, [addLine, pendingAdd, showToast])

  const cancelPendingAdd = useCallback(() => {
    setPendingAdd(null)
    showToast('Kept your current cart', 'info')
  }, [showToast])

  const incrementItem = useCallback((itemId: string) => {
    setState((current) => ({
      ...current,
      cart: current.cart.map((line) =>
        line.itemId === itemId
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      ),
    }))
  }, [])

  const decrementItem = useCallback((itemId: string) => {
    setState((current) => {
      const line = current.cart.find((item) => item.itemId === itemId)
      if (!line) return current
      const cart =
        line.quantity <= 1
          ? current.cart.filter((item) => item.itemId !== itemId)
          : current.cart.map((item) =>
              item.itemId === itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
      return {
        ...current,
        cart,
        cartRestaurantId: cart.length ? current.cartRestaurantId : null,
        couponCode: cart.length ? current.couponCode : null,
      }
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setState((current) => {
      const cart = current.cart.filter((line) => line.itemId !== itemId)
      return {
        ...current,
        cart,
        cartRestaurantId: cart.length ? current.cartRestaurantId : null,
        couponCode: cart.length ? current.couponCode : null,
      }
    })
  }, [])

  const clearCart = useCallback(() => {
    setState((current) => ({
      ...current,
      cart: [],
      cartRestaurantId: null,
      couponCode: null,
    }))
  }, [])

  const applyCoupon = useCallback(
    (code: string): CouponResult => {
      const normalized = code.trim().toUpperCase()
      if (!normalized) {
        return { ok: false, message: 'Enter a coupon code to continue.' }
      }
      if (!state.cart.length) {
        return { ok: false, message: 'Add items to your cart first.' }
      }
      if (normalized !== COUPON_CODE) {
        return {
          ok: false,
          message: 'That code is not valid. Try SAVE20.',
        }
      }
      if (state.couponCode === COUPON_CODE) {
        return { ok: false, message: 'SAVE20 is already applied.' }
      }
      if (totals.subtotal < COUPON_MIN_SUBTOTAL) {
        return {
          ok: false,
          message: `Add ৳${COUPON_MIN_SUBTOTAL - totals.subtotal} more to unlock SAVE20.`,
        }
      }

      setState((current) => ({ ...current, couponCode: COUPON_CODE }))
      showToast(`SAVE20 applied — you saved ৳${COUPON_DISCOUNT}`)
      return {
        ok: true,
        message: `SAVE20 applied — you saved ৳${COUPON_DISCOUNT}.`,
      }
    },
    [showToast, state.cart.length, state.couponCode, totals.subtotal],
  )

  const removeCoupon = useCallback(() => {
    setState((current) => ({ ...current, couponCode: null }))
    showToast('Coupon removed', 'info')
  }, [showToast])

  const selectAddress = useCallback((addressId: string) => {
    setState((current) => ({
      ...current,
      selectedAddressId: addressId,
    }))
  }, [])

  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: `address-${Date.now()}`,
    }
    setState((current) => ({
      ...current,
      addresses: [...current.addresses, newAddress],
      selectedAddressId: newAddress.id,
    }))
    return newAddress
  }, [])

  const updateAddress = useCallback((address: Address) => {
    setState((current) => ({
      ...current,
      addresses: current.addresses.map((item) =>
        item.id === address.id ? address : item,
      ),
    }))
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethodId | null) => {
    setState((current) => ({ ...current, paymentMethod: method }))
  }, [])

  const placeOrder = useCallback((): Order | null => {
    if (!state.cart.length || !state.paymentMethod || !selectedAddress) {
      return null
    }

    const paymentMethod = PAYMENT_METHODS.find(
      (method) => method.id === state.paymentMethod,
    )
    if (!paymentMethod) return null

    const restaurant =
      RESTAURANTS.find((item) => item.id === state.cartRestaurantId) ??
      RESTAURANTS[0]
    const order: Order = {
      id: `order-${Date.now()}-${Math.floor(Math.random() * 999)}`,
      orderNumber: makeOrderNumber(),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      items: state.cart.map((line) => ({ ...line })),
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      serviceCharge: totals.serviceCharge,
      beforeDiscount: totals.beforeDiscount,
      discount: totals.discount,
      total: totals.total,
      couponCode: totals.discount > 0 ? state.couponCode : null,
      address: { ...selectedAddress },
      paymentMethod,
      placedAt: new Date().toISOString(),
      estimatedDelivery: `${restaurant.deliveryTime[0]}–${restaurant.deliveryTime[1]} min`,
      statusIndex: 0,
    }

    setState((current) => ({
      ...current,
      cart: [],
      cartRestaurantId: null,
      couponCode: null,
      paymentMethod: null,
      orders: [order, ...current.orders],
    }))

    return order
  }, [
    selectedAddress,
    state.cart,
    state.cartRestaurantId,
    state.couponCode,
    state.paymentMethod,
    totals,
  ])

  const advanceOrderStatus = useCallback((orderId: string) => {
    setState((current) => ({
      ...current,
      orders: current.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              statusIndex: Math.min(4, order.statusIndex + 1),
            }
          : order,
      ),
    }))
  }, [])

  const findOrder = useCallback(
    (orderId: string) => state.orders.find((order) => order.id === orderId),
    [state.orders],
  )

  const resetDemo = useCallback(() => {
    setState({
      ...initialPersistedState,
      addresses: initialPersistedState.addresses.map((address) => ({
        ...address,
      })),
    })
    setPendingAdd(null)
    showToast('Demo data reset', 'info')
  }, [showToast])

  const value = useMemo<AppContextValue>(
    () => ({
      cart: state.cart,
      cartRestaurant,
      cartCount: totals.itemCount,
      totals,
      couponCode: state.couponCode,
      addresses: state.addresses,
      selectedAddress,
      orders: state.orders,
      paymentMethod: state.paymentMethod,
      pendingAdd,
      addItem,
      confirmPendingAdd,
      cancelPendingAdd,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      getQuantity,
      applyCoupon,
      removeCoupon,
      selectAddress,
      addAddress,
      updateAddress,
      setPaymentMethod,
      placeOrder,
      advanceOrderStatus,
      findOrder,
      resetDemo,
    }),
    [
      addAddress,
      addItem,
      advanceOrderStatus,
      applyCoupon,
      cancelPendingAdd,
      cartRestaurant,
      clearCart,
      confirmPendingAdd,
      decrementItem,
      findOrder,
      getQuantity,
      incrementItem,
      pendingAdd,
      placeOrder,
      removeCoupon,
      removeItem,
      resetDemo,
      selectAddress,
      selectedAddress,
      setPaymentMethod,
      state.addresses,
      state.cart,
      state.couponCode,
      state.orders,
      state.paymentMethod,
      totals,
      updateAddress,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
