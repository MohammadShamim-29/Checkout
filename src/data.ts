import type {
  Address,
  Category,
  MenuItem,
  PaymentMethod,
  Restaurant,
} from './types'

export const CATEGORIES: Category[] = [
  'Biryani',
  'Burgers',
  'Pizza',
  'Chinese',
  'Desserts',
]

export const CATEGORY_ICONS: Record<Category, string> = {
  Biryani: 'rice',
  Burgers: 'burger',
  Pizza: 'pizza',
  Chinese: 'noodles',
  Desserts: 'dessert',
}

export const DELIVERY_FEE = 40
export const SERVICE_CHARGE = 10
export const COUPON_CODE = 'SAVE20'
export const COUPON_DISCOUNT = 20
export const COUPON_MIN_SUBTOTAL = 300

export const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'address-home',
    label: 'Home',
    line1: 'House 12, Road 7, Block C',
    area: 'Gulshan 1',
    city: 'Dhaka',
    instructions: 'Near the blue gate, 3rd floor',
  },
  {
    id: 'address-work',
    label: 'Work',
    line1: 'Level 4, Tower B, Plot 21',
    area: 'Banani',
    city: 'Dhaka',
    instructions: 'Reception desk',
  },
  {
    id: 'address-family',
    label: 'Family',
    line1: 'Flat 5A, House 42, Road 27',
    area: 'Dhanmondi',
    city: 'Dhaka',
  },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay the rider when your food arrives',
    note: 'Most popular',
  },
  {
    id: 'mfs',
    label: 'Mobile Financial Service',
    description: 'bKash, Nagad or Rocket',
    note: 'Simulated',
  },
  {
    id: 'card',
    label: 'Card Payment',
    description: 'Visa, Mastercard or Amex',
    note: 'Simulated',
  },
]

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'spice-route',
    name: 'Spice Route Kitchen',
    tagline: 'Slow-cooked biryani, bold desi flavours',
    category: 'Biryani',
    rating: 4.7,
    reviewCount: 1248,
    deliveryTime: [25, 35],
    deliveryFee: DELIVERY_FEE,
    distance: '1.8 km',
    image: 'images/rest-spice.jpg',
    badge: 'Top rated',
    promo: '৳20 off with SAVE20',
  },
  {
    id: 'burger-barn',
    name: 'Burger Barn',
    tagline: 'Smashed patties and crispy chicken',
    category: 'Burgers',
    rating: 4.5,
    reviewCount: 892,
    deliveryTime: [20, 30],
    deliveryFee: DELIVERY_FEE,
    distance: '1.2 km',
    image: 'images/rest-burger.jpg',
    badge: 'Fast delivery',
  },
  {
    id: 'napoli-pizza',
    name: 'Napoli Pizza Co.',
    tagline: 'Stone-baked pizza, made to share',
    category: 'Pizza',
    rating: 4.6,
    reviewCount: 736,
    deliveryTime: [25, 35],
    deliveryFee: DELIVERY_FEE,
    distance: '2.4 km',
    image: 'images/rest-pizza.jpg',
  },
  {
    id: 'wok-this-way',
    name: 'Wok This Way',
    tagline: 'Wok-tossed noodles and comforting rice',
    category: 'Chinese',
    rating: 4.4,
    reviewCount: 521,
    deliveryTime: [30, 40],
    deliveryFee: DELIVERY_FEE,
    distance: '3.1 km',
    image: 'images/rest-wok.jpg',
  },
  {
    id: 'sugar-spice',
    name: 'Sugar & Spice',
    tagline: 'Small-batch cakes and sweet treats',
    category: 'Desserts',
    rating: 4.8,
    reviewCount: 410,
    deliveryTime: [20, 30],
    deliveryFee: DELIVERY_FEE,
    distance: '1.5 km',
    image: 'images/rest-sweet.jpg',
    badge: 'Sweet pick',
  },
  {
    id: 'kacchi-house',
    name: 'Kacchi House',
    tagline: 'Dhaka-style kacchi and kebabs',
    category: 'Biryani',
    rating: 4.6,
    reviewCount: 1884,
    deliveryTime: [30, 45],
    deliveryFee: DELIVERY_FEE,
    distance: '3.8 km',
    image: 'images/rest-kacchi.jpg',
  },
]

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'spice-chicken-biryani',
    restaurantId: 'spice-route',
    name: 'Chicken Biryani',
    description:
      'Fragrant basmati rice layered with tender chicken, saffron and house masala.',
    price: 250,
    image: 'images/dish-biryani.jpg',
    category: 'Biryani',
    menuCategory: 'Bestsellers',
    popular: true,
    spiceLevel: 2,
  },
  {
    id: 'spice-beef-burger',
    restaurantId: 'spice-route',
    name: 'Beef Burger',
    description:
      'Juicy beef patty, smoked cheddar, pickles and a toasted brioche bun.',
    price: 220,
    image: 'images/dish-burger.jpg',
    category: 'Burgers',
    menuCategory: 'Bestsellers',
    popular: true,
    spiceLevel: 0,
  },
  {
    id: 'spice-butter-chicken',
    restaurantId: 'spice-route',
    name: 'Butter Chicken',
    description:
      'Char-grilled chicken simmered in a velvety tomato and butter gravy.',
    price: 290,
    image: 'images/dish-tikka.jpg',
    category: 'Biryani',
    menuCategory: 'Mains',
    spiceLevel: 1,
  },
  {
    id: 'spice-chowmein',
    restaurantId: 'spice-route',
    name: 'Chicken Chowmein',
    description:
      'Egg noodles tossed with chicken, crunchy vegetables and house sauce.',
    price: 180,
    image: 'images/dish-chowmein.jpg',
    category: 'Chinese',
    menuCategory: 'Mains',
    spiceLevel: 1,
  },
  {
    id: 'spice-samosa',
    restaurantId: 'spice-route',
    name: 'Samosa Platter',
    description:
      'Three crisp potato and pea samosas served with tamarind chutney.',
    price: 120,
    image: 'images/dish-samosa.jpg',
    category: 'Chinese',
    menuCategory: 'Sides',
    spiceLevel: 1,
  },
  {
    id: 'spice-gulab-jamun',
    restaurantId: 'spice-route',
    name: 'Gulab Jamun',
    description:
      'Two warm milk dumplings soaked in cardamom and rose syrup.',
    price: 90,
    image: 'images/dish-dessert2.jpg',
    category: 'Desserts',
    menuCategory: 'Desserts',
    popular: true,
  },
  {
    id: 'burger-beef-classic',
    restaurantId: 'burger-barn',
    name: 'Classic Beef Burger',
    description:
      'Smashed beef patty, American cheese, lettuce, tomato and burger sauce.',
    price: 220,
    image: 'images/dish-burger2.jpg',
    category: 'Burgers',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'burger-crispy-chicken',
    restaurantId: 'burger-barn',
    name: 'Crispy Chicken Burger',
    description:
      'Buttermilk-fried chicken, slaw and spicy mayo in a soft potato bun.',
    price: 240,
    image: 'images/dish-burger.jpg',
    category: 'Burgers',
    menuCategory: 'Bestsellers',
    popular: true,
    spiceLevel: 2,
  },
  {
    id: 'burger-bbq',
    restaurantId: 'burger-barn',
    name: 'Smoky BBQ Burger',
    description:
      'Double beef, crispy onions, cheddar and a smoky barbecue glaze.',
    price: 280,
    image: 'images/dish-burger.jpg',
    category: 'Burgers',
    menuCategory: 'Burgers',
  },
  {
    id: 'burger-loaded-fries',
    restaurantId: 'burger-barn',
    name: 'Loaded Fries',
    description:
      'Golden fries topped with cheese sauce, jalapeños and spring onion.',
    price: 160,
    image: 'images/dish-fries.jpg',
    category: 'Burgers',
    menuCategory: 'Sides',
  },
  {
    id: 'burger-wings',
    restaurantId: 'burger-barn',
    name: 'Buffalo Chicken Wings',
    description:
      'Six sticky wings tossed in buffalo sauce with a blue cheese dip.',
    price: 260,
    image: 'images/dish-grill.jpg',
    category: 'Burgers',
    menuCategory: 'Sides',
    spiceLevel: 2,
  },
  {
    id: 'burger-shake',
    restaurantId: 'burger-barn',
    name: 'Chocolate Shake',
    description:
      'Thick chocolate ice cream shake finished with whipped cream.',
    price: 140,
    image: 'images/dish-dessert.jpg',
    category: 'Desserts',
    menuCategory: 'Drinks',
  },
  {
    id: 'pizza-margherita',
    restaurantId: 'napoli-pizza',
    name: 'Margherita Pizza',
    description:
      'San Marzano tomato, fior di latte and basil on a stone-baked base.',
    price: 350,
    image: 'images/dish-pizza.jpg',
    category: 'Pizza',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'pizza-pepperoni',
    restaurantId: 'napoli-pizza',
    name: 'Pepperoni Pizza',
    description:
      'Spiced beef pepperoni, mozzarella and a bright tomato sauce.',
    price: 450,
    image: 'images/dish-pizza2.jpg',
    category: 'Pizza',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'pizza-bbq-chicken',
    restaurantId: 'napoli-pizza',
    name: 'BBQ Chicken Pizza',
    description:
      'Grilled chicken, red onion, sweetcorn and smoky barbecue sauce.',
    price: 480,
    image: 'images/dish-pizza.jpg',
    category: 'Pizza',
    menuCategory: 'Pizza',
  },
  {
    id: 'pizza-garlic-bread',
    restaurantId: 'napoli-pizza',
    name: 'Garlic Bread',
    description:
      'Warm garlic butter bread with herbs and a side of marinara.',
    price: 140,
    image: 'images/dish-fries.jpg',
    category: 'Pizza',
    menuCategory: 'Sides',
  },
  {
    id: 'pizza-alfredo',
    restaurantId: 'napoli-pizza',
    name: 'Chicken Alfredo Pasta',
    description:
      'Fettuccine in a creamy parmesan sauce with grilled chicken.',
    price: 320,
    image: 'images/dish-pasta.jpg',
    category: 'Pizza',
    menuCategory: 'Pasta',
  },
  {
    id: 'pizza-tiramisu',
    restaurantId: 'napoli-pizza',
    name: 'Classic Tiramisu',
    description:
      'Coffee-soaked sponge, mascarpone cream and a dusting of cocoa.',
    price: 210,
    image: 'images/dish-cake.jpg',
    category: 'Desserts',
    menuCategory: 'Desserts',
  },
  {
    id: 'wok-chicken-chowmein',
    restaurantId: 'wok-this-way',
    name: 'Chicken Chowmein',
    description:
      'Wok-tossed egg noodles, chicken and crisp vegetables in dark soy.',
    price: 180,
    image: 'images/dish-chowmein.jpg',
    category: 'Chinese',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'wok-beef-chowmein',
    restaurantId: 'wok-this-way',
    name: 'Beef Chowmein',
    description:
      'Tender beef strips and noodles tossed with ginger and spring onion.',
    price: 220,
    image: 'images/dish-chowmein.jpg',
    category: 'Chinese',
    menuCategory: 'Bestsellers',
  },
  {
    id: 'wok-fried-rice',
    restaurantId: 'wok-this-way',
    name: 'Chicken Fried Rice',
    description:
      'Fragrant fried rice with chicken, egg and a hint of sesame.',
    price: 190,
    image: 'images/dish-biryani2.jpg',
    category: 'Chinese',
    menuCategory: 'Rice',
  },
  {
    id: 'wok-chilli-chicken',
    restaurantId: 'wok-this-way',
    name: 'Chilli Chicken',
    description:
      'Crispy chicken glazed with chilli, garlic and sweet pepper.',
    price: 260,
    image: 'images/dish-tikka.jpg',
    category: 'Chinese',
    menuCategory: 'Mains',
    spiceLevel: 3,
  },
  {
    id: 'wok-spring-rolls',
    restaurantId: 'wok-this-way',
    name: 'Vegetable Spring Rolls',
    description:
      'Four crisp rolls filled with cabbage and carrot, served with dip.',
    price: 130,
    image: 'images/dish-samosa.jpg',
    category: 'Chinese',
    menuCategory: 'Sides',
  },
  {
    id: 'wok-thai-soup',
    restaurantId: 'wok-this-way',
    name: 'Thai Chicken Soup',
    description:
      'A bright, lemongrass-scented broth with chicken and mushrooms.',
    price: 160,
    image: 'images/dish-salad.jpg',
    category: 'Chinese',
    menuCategory: 'Soups',
  },
  {
    id: 'sweet-chocolate-cake',
    restaurantId: 'sugar-spice',
    name: 'Chocolate Fudge Cake',
    description:
      'A rich chocolate sponge with silky fudge frosting and a cocoa crumb.',
    price: 210,
    image: 'images/dish-cake.jpg',
    category: 'Desserts',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'sweet-vanilla-ice-cream',
    restaurantId: 'sugar-spice',
    name: 'Vanilla Bean Ice Cream',
    description:
      'Two scoops of slow-churned vanilla bean ice cream.',
    price: 120,
    image: 'images/dish-icecream.jpg',
    category: 'Desserts',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'sweet-cheesecake',
    restaurantId: 'sugar-spice',
    name: 'Strawberry Cheesecake',
    description:
      'Baked vanilla cheesecake with a buttery biscuit base and strawberries.',
    price: 260,
    image: 'images/dish-dessert.jpg',
    category: 'Desserts',
    menuCategory: 'Cakes',
  },
  {
    id: 'sweet-brownie',
    restaurantId: 'sugar-spice',
    name: 'Fudge Brownie',
    description:
      'A dense, gooey brownie with toasted walnuts and sea salt.',
    price: 180,
    image: 'images/dish-dessert2.jpg',
    category: 'Desserts',
    menuCategory: 'Cakes',
  },
  {
    id: 'sweet-mango-mousse',
    restaurantId: 'sugar-spice',
    name: 'Mango Mousse',
    description:
      'Airy mango mousse layered with vanilla cream and fresh mango.',
    price: 190,
    image: 'images/dish-dessert.jpg',
    category: 'Desserts',
    menuCategory: 'Chilled',
  },
  {
    id: 'sweet-donuts',
    restaurantId: 'sugar-spice',
    name: 'Mini Donut Box',
    description:
      'Six bite-sized donuts with cinnamon sugar and chocolate dips.',
    price: 220,
    image: 'images/dish-cake.jpg',
    category: 'Desserts',
    menuCategory: 'Chilled',
  },
  {
    id: 'kacchi-mutton',
    restaurantId: 'kacchi-house',
    name: 'Mutton Kacchi Biryani',
    description:
      'Slow-cooked mutton, fragrant rice, potato and traditional kacchi spices.',
    price: 320,
    image: 'images/dish-kacchi.jpg',
    category: 'Biryani',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'kacchi-chicken',
    restaurantId: 'kacchi-house',
    name: 'Chicken Kacchi Biryani',
    description:
      'Tender chicken and spiced basmati rice, cooked in the traditional style.',
    price: 280,
    image: 'images/dish-biryani2.jpg',
    category: 'Biryani',
    menuCategory: 'Bestsellers',
    popular: true,
  },
  {
    id: 'kacchi-borhani',
    restaurantId: 'kacchi-house',
    name: 'Borhani',
    description:
      'A chilled, minty yoghurt drink with mustard and roasted cumin.',
    price: 60,
    image: 'images/dish-salad2.jpg',
    category: 'Biryani',
    menuCategory: 'Sides',
  },
  {
    id: 'kacchi-kebab',
    restaurantId: 'kacchi-house',
    name: 'Jali Kebab',
    description:
      'A smoky, finely minced beef kebab with a delicate spice blend.',
    price: 150,
    image: 'images/dish-grill.jpg',
    category: 'Biryani',
    menuCategory: 'Sides',
  },
  {
    id: 'kacchi-firni',
    restaurantId: 'kacchi-house',
    name: 'Firni',
    description:
      'Creamy rice pudding with cardamom, pistachio and rose water.',
    price: 80,
    image: 'images/dish-icecream.jpg',
    category: 'Desserts',
    menuCategory: 'Desserts',
  },
  {
    id: 'kacchi-roast',
    restaurantId: 'kacchi-house',
    name: 'Roast Chicken',
    description:
      'Rich, slow-roasted chicken in a deep, aromatic gravy.',
    price: 240,
    image: 'images/dish-tikka.jpg',
    category: 'Biryani',
    menuCategory: 'Mains',
  },
]

export function getRestaurant(id: string) {
  return RESTAURANTS.find((restaurant) => restaurant.id === id)
}

export function getMenuItem(id: string) {
  return MENU_ITEMS.find((item) => item.id === id)
}

export function getRestaurantMenu(restaurantId: string) {
  return MENU_ITEMS.filter((item) => item.restaurantId === restaurantId)
}

export function getPopularItems() {
  return MENU_ITEMS.filter((item) => item.popular)
}
