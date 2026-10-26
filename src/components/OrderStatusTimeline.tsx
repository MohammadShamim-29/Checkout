import {
  Bike,
  ChefHat,
  Check,
  ClipboardCheck,
  MapPin,
  PackageCheck,
} from 'lucide-react'

export const ORDER_STAGES = [
  {
    label: 'Order Confirmed',
    description: 'We have received your order.',
    icon: ClipboardCheck,
  },
  {
    label: 'Restaurant Preparing',
    description: 'The kitchen is preparing your food.',
    icon: ChefHat,
  },
  {
    label: 'Rider Assigned',
    description: 'A rider is heading to the restaurant.',
    icon: Bike,
  },
  {
    label: 'Out for Delivery',
    description: 'Your order is on its way to you.',
    icon: MapPin,
  },
  {
    label: 'Delivered',
    description: 'Your order has been delivered. Enjoy!',
    icon: PackageCheck,
  },
] as const

export function OrderStatusTimeline({ statusIndex }: { statusIndex: number }) {
  return (
    <ol className="status-timeline" aria-label="Order progress">
      {ORDER_STAGES.map((stage, index) => {
        const Icon = stage.icon
        const isComplete = index < statusIndex
        const isActive = index === statusIndex
        const isDelivered = statusIndex === 4 && index === 4
        const state = isComplete
          ? 'complete'
          : isActive
            ? 'active'
            : 'upcoming'

        return (
          <li
            key={stage.label}
            className={`status-step status-step--${state}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <div className="status-step__rail">
              <span className="status-step__icon" aria-hidden="true">
                {isComplete || isDelivered ? (
                  <Check size={17} strokeWidth={2.7} />
                ) : (
                  <Icon size={17} strokeWidth={2.1} />
                )}
              </span>
              {index < ORDER_STAGES.length - 1 ? (
                <span className="status-step__line" />
              ) : null}
            </div>
            <div className="status-step__copy">
              <span className="status-step__label">
                {stage.label}
                {isActive ? (
                  <span className="status-now">
                    {isDelivered ? 'Complete' : 'Current'}
                  </span>
                ) : null}
              </span>
              <p>{stage.description}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
