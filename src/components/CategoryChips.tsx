import {
  CakeSlice,
  CookingPot,
  LayoutGrid,
  Pizza,
  Soup,
  Sandwich,
} from 'lucide-react'
import { CATEGORIES } from '../data'
import type { Category } from '../types'

export type CategoryFilter = Category | 'All'

interface CategoryChipsProps {
  selected: CategoryFilter
  onChange: (category: CategoryFilter) => void
}

const iconMap = {
  Biryani: CookingPot,
  Burgers: Sandwich,
  Pizza,
  Chinese: Soup,
  Desserts: CakeSlice,
}

export function CategoryChips({ selected, onChange }: CategoryChipsProps) {
  return (
    <div className="category-scroller" aria-label="Food categories">
      <button
        type="button"
        className={`category-chip ${selected === 'All' ? 'is-active' : ''}`}
        onClick={() => onChange('All')}
        aria-pressed={selected === 'All'}
      >
        <LayoutGrid size={16} aria-hidden="true" />
        All
      </button>
      {CATEGORIES.map((category) => {
        const Icon = iconMap[category]
        return (
          <button
            type="button"
            key={category}
            className={`category-chip ${selected === category ? 'is-active' : ''}`}
            onClick={() => onChange(category)}
            aria-pressed={selected === category}
          >
            <Icon size={16} aria-hidden="true" />
            {category}
          </button>
        )
      })}
    </div>
  )
}
