import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  backTo?: string
  right?: ReactNode
  transparent?: boolean
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  right,
  transparent = false,
}: PageHeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backTo) {
      navigate(backTo)
    } else if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <header className={`page-header ${transparent ? 'is-transparent' : ''}`}>
      <div className="page-header__inner">
        <button
          type="button"
          className="icon-button page-header__back"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <div className="page-header__copy">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="page-header__right">{right}</div>
      </div>
    </header>
  )
}
