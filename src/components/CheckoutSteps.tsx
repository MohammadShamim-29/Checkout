import { Check } from 'lucide-react'

const steps = ['Review', 'Checkout', 'Done'] as const

export function CheckoutSteps({ active }: { active: 0 | 1 | 2 }) {
  return (
    <ol className="checkout-steps" aria-label="Checkout progress">
      {steps.map((step, index) => {
        const isDone = index < active
        const isActive = index === active
        return (
          <li
            key={step}
            className={`${isDone ? 'is-done' : ''} ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className="checkout-steps__dot">
              {isDone ? <Check size={12} aria-hidden="true" /> : index + 1}
            </span>
            <span>{step}</span>
          </li>
        )
      })}
    </ol>
  )
}
