import { DEFAULT_ADDRESSES } from '../data'
import type { PersistedState } from '../types'

const STORAGE_KEY = 'pathao-food-concept-v1'

export const initialPersistedState: PersistedState = {
  cart: [],
  cartRestaurantId: null,
  addresses: DEFAULT_ADDRESSES,
  selectedAddressId: DEFAULT_ADDRESSES[0].id,
  couponCode: null,
  paymentMethod: null,
  orders: [],
}

export function loadPersistedState(): PersistedState {
  if (typeof window === 'undefined') {
    return initialPersistedState
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialPersistedState

    const parsed = JSON.parse(raw) as Partial<PersistedState>
    const addresses =
      Array.isArray(parsed.addresses) && parsed.addresses.length > 0
        ? parsed.addresses
        : DEFAULT_ADDRESSES
    const selectedAddressId = addresses.some(
      (address) => address.id === parsed.selectedAddressId,
    )
      ? (parsed.selectedAddressId as string)
      : addresses[0].id

    return {
      ...initialPersistedState,
      ...parsed,
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      addresses,
      selectedAddressId,
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    }
  } catch {
    return initialPersistedState
  }
}

export function savePersistedState(state: PersistedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    return
  }
}

export function clearPersistedState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}
