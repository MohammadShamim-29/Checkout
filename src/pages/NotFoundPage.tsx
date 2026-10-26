import { Compass, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConceptFooter } from '../components/ConceptFooter'
import { EmptyState } from '../components/EmptyState'

export function NotFoundPage() {
  return (
    <div className="page">
      <main className="container centered-main">
        <EmptyState
          icon={<Compass size={30} />}
          title="This page wandered off"
          description="The link may be out of date. Head back to discovery and keep exploring."
          action={
            <Link to="/" className="button button--primary">
              <UtensilsCrossed size={17} aria-hidden="true" />
              Back to Home
            </Link>
          }
        />
        <ConceptFooter />
      </main>
    </div>
  )
}
