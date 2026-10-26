import { UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BrandProps {
  compact?: boolean
}

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link to="/" className={`brand ${compact ? 'brand--compact' : ''}`} aria-label="Pathao Food concept home">
      <span className="brand__mark" aria-hidden="true">
        <UtensilsCrossed size={19} strokeWidth={2.2} />
      </span>
      <span className="brand__text">
        <span className="brand__name">
          pathao<span>food</span>
        </span>
        {!compact ? <span className="brand__concept">Concept</span> : null}
      </span>
    </Link>
  )
}
