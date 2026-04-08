export interface Expense {
  id: string
  title: string
  category: string
  amount: number
  date: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type ExpenseFormData = Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>

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
