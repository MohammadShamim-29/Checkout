export type Category =
  | 'Biryani'
  | 'Burgers'
  | 'Pizza'
  | 'Chinese'
  | 'Desserts'

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  image: string
  category: Category
  menuCategory: string
  popular?: boolean
  spiceLevel?: 0 | 1 | 2 | 3
}

export interface Restaurant {
  id: string
  name: string
  tagline: string
  category: Category
  rating: number
  reviewCount: number
  deliveryTime: [number, number]
  deliveryFee: number
  distance: string
  image: string
  badge?: string
  promo?: string
}

export interface CartLine {
  itemId: string
  name: string
  description: string
  price: number
  image: string
  quantity: number
}

export interface Address {
  id: string
  label: string
  line1: string
  area: string
  city: string
  instructions?: string
}

export type PaymentMethodId = 'cod' | 'mfs' | 'card'

export interface PaymentMethod {
  id: PaymentMethodId
  label: string
  description: string
  note: string
}

export interface Totals {
  subtotal: number
  deliveryFee: number
  serviceCharge: number
  beforeDiscount: number
  discount: number
  total: number
  itemCount: number
  couponEligible: boolean
  amountToUnlock: number
}

export interface Order {
  id: string
  orderNumber: string
  restaurantId: string
  restaurantName: string
  restaurantImage: string
  items: CartLine[]
  subtotal: number
  deliveryFee: number
  serviceCharge: number
  beforeDiscount: number
  discount: number
  total: number
  couponCode: string | null
  address: Address
  paymentMethod: PaymentMethod
  placedAt: string
  estimatedDelivery: string
  statusIndex: number
}

export interface PendingAdd {
  restaurant: Restaurant
  item: MenuItem
  quantity: number
}

export interface PersistedState {
  cart: CartLine[]
  cartRestaurantId: string | null
  addresses: Address[]
  selectedAddressId: string
  couponCode: string | null
  paymentMethod: PaymentMethodId | null
  orders: Order[]
}
