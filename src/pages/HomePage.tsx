import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Search,
  SearchX,
  Sparkles,
  X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { CartButton } from '../components/CartButton'
import { CategoryChips, type CategoryFilter } from '../components/CategoryChips'
import { ConceptFooter } from '../components/ConceptFooter'
import { DishCard } from '../components/DishCard'
import { EmptyState } from '../components/EmptyState'
import { RestaurantCard } from '../components/RestaurantCard'
import { AddressDialog } from '../components/AddressDialog'
import { useApp } from '../context/AppContext'
import { MENU_ITEMS, RESTAURANTS, getRestaurantMenu } from '../data'

export function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [addressOpen, setAddressOpen] = useState(false)
  const { selectedAddress } = useApp()
  const navigate = useNavigate()

  const normalizedQuery = query.trim().toLowerCase()

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((restaurant) => {
      const matchesCategory =
        category === 'All' ||
        restaurant.category === category ||
        getRestaurantMenu(restaurant.id).some(
          (item) => item.category === category,
        )
      const menuMatches = getRestaurantMenu(restaurant.id).some((item) =>
        `${item.name} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      const matchesQuery =
        !normalizedQuery ||
        `${restaurant.name} ${restaurant.tagline} ${restaurant.category}`
          .toLowerCase()
          .includes(normalizedQuery) ||
        menuMatches
      return matchesCategory && matchesQuery
    })
  }, [category, normalizedQuery])

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const restaurant = RESTAURANTS.find(
        (place) => place.id === item.restaurantId,
      )
      const matchesCategory =
        category === 'All' || item.category === category
      const matchesQuery =
        !normalizedQuery ||
        `${item.name} ${item.description} ${item.category} ${restaurant?.name ?? ''}`
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, normalizedQuery])

  const popularDishes = filteredDishes.filter((item) => item.popular).slice(0, 6)
  const isFiltering = Boolean(normalizedQuery) || category !== 'All'
  const hasResults =
    filteredRestaurants.length > 0 || filteredDishes.length > 0

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate(
      normalizedQuery ? `/search?q=${encodeURIComponent(query.trim())}` : '/search',
    )
  }

  return (
    <div className="page home-page">
      <header className="home-header">
        <div className="container home-header__inner">
          <Brand />
          <div className="home-header__actions">
            <button
              type="button"
              className="location-button"
              onClick={() => setAddressOpen(true)}
            >
              <span className="location-button__icon">
                <MapPin size={17} aria-hidden="true" />
              </span>
              <span className="location-button__copy">
                <small>Deliver to</small>
                <strong>
                  {selectedAddress.label} · {selectedAddress.area}
                </strong>
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            <CartButton />
          </div>
        </div>
      </header>

      <main className="container home-main">
        <form className="home-search" onSubmit={handleSearchSubmit} role="search">
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search restaurants or dishes"
            aria-label="Search restaurants or dishes"
          />
          {query ? (
            <button
              type="button"
              className="home-search__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
          <button type="submit" className="home-search__submit">
            Search
          </button>
        </form>

        {!isFiltering ? (
          <section className="home-hero" aria-labelledby="hero-title">
            <div className="home-hero__copy">
              <span className="eyebrow eyebrow--light">
                <Sparkles size={14} aria-hidden="true" />
                Clear prices, every time
              </span>
              <h1 id="hero-title">
                Great food.
                <span>No checkout surprises.</span>
              </h1>
              <p>
                Review every item, fee and discount before you pay. Then track
                your order from kitchen to doorstep.
              </p>
              <div className="home-hero__actions">
                <Link to="/restaurant/spice-route" className="hero-button">
                  Explore the menu
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <span className="home-hero__offer">
                  ৳20 off orders over ৳300 with <strong>SAVE20</strong>
                </span>
              </div>
            </div>
            <div className="home-hero__visual" aria-hidden="true">
              <span className="home-hero__blob" />
              <img src="images/dish-biryani.jpg" alt="" />
              <span className="home-hero__rating">
                <strong>4.7</strong>
                <span>Top rated near you</span>
              </span>
            </div>
          </section>
        ) : null}

        <section className="section section--categories" aria-labelledby="category-title">
          <div className="section-heading section-heading--tight">
            <div>
              <span className="section-kicker">Pick a craving</span>
              <h2 id="category-title">What are you in the mood for?</h2>
            </div>
          </div>
          <CategoryChips selected={category} onChange={setCategory} />
        </section>

        {!hasResults ? (
          <EmptyState
            icon={<SearchX size={28} />}
            title="No matches found"
            description="Try a different dish, restaurant or category."
            action={
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <>
            {(normalizedQuery || popularDishes.length > 0) && (
              <section className="section" aria-labelledby="popular-title">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">
                      {normalizedQuery ? 'Search results' : 'Crowd favourites'}
                    </span>
                    <h2 id="popular-title">
                      {normalizedQuery ? 'Dishes that match' : 'Popular right now'}
                    </h2>
                  </div>
                  <Link to="/search" className="text-link">
                    See all
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
                {popularDishes.length > 0 ? (
                  <div className="dish-scroller">
                    {popularDishes.map((item) => (
                      <DishCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <p className="section-empty-copy">
                    No dishes match this search, but there may still be a
                    restaurant for you below.
                  </p>
                )}
              </section>
            )}

            <section className="section" aria-labelledby="restaurants-title">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">
                    {isFiltering ? 'Filtered for you' : 'Nearby'}
                  </span>
                  <h2 id="restaurants-title">
                    {isFiltering ? 'Matching restaurants' : 'Restaurants near you'}
                  </h2>
                </div>
                <span className="section-count">
                  {filteredRestaurants.length} open
                </span>
              </div>
              {filteredRestaurants.length > 0 ? (
                <div className="restaurant-grid">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              ) : (
                <p className="section-empty-copy">
                  No restaurants match this filter. Try clearing the category.
                </p>
              )}
            </section>
          </>
        )}

        <ConceptFooter />
      </main>

      <AddressDialog open={addressOpen} onClose={() => setAddressOpen(false)} />
    </div>
  )
}
