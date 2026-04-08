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

export type { Category } from './categories'
export { CATEGORIES } from './categories'
