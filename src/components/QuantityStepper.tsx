import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  decreaseDisabled?: boolean
  itemName: string
  compact?: boolean
}

export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  decreaseDisabled = false,
  itemName,
  compact = false,
}: QuantityStepperProps) {
  return (
    <div
      className={`quantity-stepper ${compact ? 'quantity-stepper--compact' : ''}`}
      aria-label={`Quantity for ${itemName}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={`Decrease quantity of ${itemName}`}
      >
        <Minus size={compact ? 14 : 15} aria-hidden="true" />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase quantity of ${itemName}`}
      >
        <Plus size={compact ? 14 : 15} aria-hidden="true" />
      </button>
    </div>
  )
}
