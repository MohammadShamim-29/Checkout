export function formatTaka(amount: number) {
  const safeAmount = Math.max(0, Math.round(amount))
  return `৳${safeAmount.toLocaleString('en-US')}`
}

export function formatRating(rating: number) {
  return rating.toFixed(1)
}

export function formatDeliveryTime(range: [number, number]) {
  return `${range[0]}–${range[1]} min`
}

export function formatShortDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(isoDate))
}

export function pluralize(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : plural ?? `${singular}s`}`
}
