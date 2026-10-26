import { useMemo, useState } from 'react'
import { Search, SearchX, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { CartButton } from '../components/CartButton'
import { CategoryChips, type CategoryFilter } from '../components/CategoryChips'
import { ConceptFooter } from '../components/ConceptFooter'
import { DishCard } from '../components/DishCard'
import { EmptyState } from '../components/EmptyState'
import { RestaurantCard } from '../components/RestaurantCard'
import { MENU_ITEMS, RESTAURANTS, getRestaurantMenu } from '../data'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState<CategoryFilter>('All')
  const query = searchParams.get('q') ?? ''
  const normalizedQuery = query.trim().toLowerCase()

  const setQuery = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set('q', value)
    } else {
      next.delete('q')
    }
    setSearchParams(next, { replace: true })
  }

  const filteredRestaurants = useMemo(
    () =>
      RESTAURANTS.filter((restaurant) => {
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
      }),
    [category, normalizedQuery],
  )

  const filteredDishes = useMemo(
    () =>
      MENU_ITEMS.filter((item) => {
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
      }),
    [category, normalizedQuery],
  )

  const visibleDishes = normalizedQuery
    ? filteredDishes.slice(0, 12)
    : filteredDishes.filter((item) => item.popular)
  const hasResults =
    filteredRestaurants.length > 0 || visibleDishes.length > 0

  return (
    <div className="page search-page">
      <header className="simple-topbar">
        <div className="container simple-topbar__inner">
          <Brand compact />
          <CartButton />
        </div>
      </header>

      <main className="container search-main">
        <div className="search-title-row">
          <div>
            <span className="section-kicker">Discover</span>
            <h1>Search food & restaurants</h1>
          </div>
          {normalizedQuery ? (
            <span className="section-count">
              {filteredDishes.length + filteredRestaurants.length} results
            </span>
          ) : null}
        </div>

        <form className="search-page-input" role="search" onSubmit={(event) => event.preventDefault()}>
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try biryani, burger or pizza"
            aria-label="Search food and restaurants"
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
        </form>

        {!normalizedQuery ? (
          <div className="popular-searches">
            <span>Popular:</span>
            {['Biryani', 'Burger', 'Pizza', 'Chinese', 'Dessert'].map(
              (term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ),
            )}
          </div>
        ) : null}

        <CategoryChips selected={category} onChange={setCategory} />

        {!hasResults ? (
          <EmptyState
            icon={<SearchX size={28} />}
            title="Nothing on the menu"
            description="Try another spelling or explore a different category."
            action={
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
              >
                Reset search
              </button>
            }
          />
        ) : (
          <>
            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">
                    {normalizedQuery ? 'Dish results' : 'Trending'}
                  </span>
                  <h2>{normalizedQuery ? 'Food matches' : 'Popular dishes'}</h2>
                </div>
              </div>
              {visibleDishes.length > 0 ? (
                <div className="dish-grid">
                  {visibleDishes.map((item) => (
                    <DishCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="section-empty-copy">
                  No dishes match. Restaurants that match are shown below.
                </p>
              )}
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">
                    {normalizedQuery ? 'Restaurant results' : 'All restaurants'}
                  </span>
                  <h2>
                    {normalizedQuery ? 'Places that match' : 'Explore nearby'}
                  </h2>
                </div>
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
                  No restaurants match this search.
                </p>
              )}
            </section>
          </>
        )}

        <ConceptFooter />
      </main>
    </div>
  )
}
