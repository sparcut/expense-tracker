export const CATEGORIES = [
  'Food & Drink',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Shopping',
  'Education',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Drink':  'var(--color-orange-500)',
  'Transport':     'var(--color-blue-500)',
  'Housing':       'var(--color-violet-500)',
  'Entertainment': 'var(--color-pink-500)',
  'Health':        'var(--color-green-500)',
  'Shopping':      'var(--color-red-500)',
  'Education':     'var(--color-teal-500)',
  'Other':         'var(--color-zinc-500)',
}

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Other']
}
