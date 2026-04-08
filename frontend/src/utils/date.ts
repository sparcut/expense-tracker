/** Returns current local datetime as a datetime-local input value (YYYY-MM-DDTHH:mm) */
export function nowLocal(): string {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
}

/** Converts a UTC date string to a datetime-local input value in local time */
export function toLocalDatetime(date: string): string {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}
