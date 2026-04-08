import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

const CATEGORIES = [
  'Food & Drink', 'Transport', 'Housing', 'Entertainment',
  'Health', 'Shopping', 'Education', 'Other',
] as const

function isNotFound(e: unknown) {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'
}

function isValidDate(value: unknown): value is string {
  return typeof value === 'string' && !isNaN(new Date(value).getTime())
}

function validateExpenseBody(body: Record<string, unknown>): string[] {
  const errors: string[] = []
  const { title, category, amount, date } = body

  if (!title || typeof title !== 'string' || !title.trim())
    errors.push('title is required')

  if (!category || !CATEGORIES.includes(category as typeof CATEGORIES[number]))
    errors.push(`category must be one of: ${CATEGORIES.join(', ')}`)

  const amt = parseFloat(amount as string)
  if (!amount || isNaN(amt) || amt <= 0)
    errors.push('amount must be a positive number')

  if (!date || isNaN(new Date(date as string).getTime()))
    errors.push('date must be a valid date')

  return errors
}

export async function getExpenses(req: Request, res: Response) {
  const { category, startDate, endDate } = req.query

  if (startDate && !isValidDate(startDate))
    return res.status(400).json({ error: 'startDate is not a valid date' })
  if (endDate && !isValidDate(endDate))
    return res.status(400).json({ error: 'endDate is not a valid date' })

  try {
    const where: Record<string, unknown> = {}

    if (category) where.category = category
    if (startDate || endDate) {
      where.date = {
        ...(startDate ? { gte: new Date(startDate as string) } : {}),
        ...(endDate ? { lte: new Date(endDate as string) } : {}),
      }
    }

    const expenses = await prisma.expense.findMany({ where, orderBy: { date: 'desc' } })
    res.json(expenses)
  } catch {
    res.status(500).json({ error: 'Failed to fetch expenses' })
  }
}

export async function createExpense(req: Request, res: Response) {
  const errors = validateExpenseBody(req.body)
  if (errors.length) return res.status(400).json({ errors })

  try {
    const { title, category, amount, date, description } = req.body
    const expense = await prisma.expense.create({
      data: { title: title.trim(), category, amount: parseFloat(amount), date: new Date(date), description: description?.trim() || null },
    })
    res.status(201).json(expense)
  } catch {
    res.status(500).json({ error: 'Failed to create expense' })
  }
}

export async function updateExpense(req: Request, res: Response) {
  const errors = validateExpenseBody(req.body)
  if (errors.length) return res.status(400).json({ errors })

  try {
    const { title, category, amount, date, description } = req.body
    const expense = await prisma.expense.update({
      where: { id: String(req.params.id) },
      data: { title: title.trim(), category, amount: parseFloat(amount), date: new Date(date), description: description?.trim() || null },
    })
    res.json(expense)
  } catch (e) {
    if (isNotFound(e)) return res.status(404).json({ error: 'Expense not found' })
    res.status(500).json({ error: 'Failed to update expense' })
  }
}

export async function deleteExpense(req: Request, res: Response) {
  try {
    await prisma.expense.delete({ where: { id: String(req.params.id) } })
    res.status(204).send()
  } catch (e) {
    if (isNotFound(e)) return res.status(404).json({ error: 'Expense not found' })
    res.status(500).json({ error: 'Failed to delete expense' })
  }
}

export async function getSummary(_req: Request, res: Response) {
  try {
    const byCategory = await prisma.expense.groupBy({
      by: ['category'],
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } },
    })

    const monthly = await prisma.$queryRaw<{ month: string; total: number }[]>`
      SELECT to_char(date, 'YYYY-MM') as month, SUM(amount)::float as total
      FROM "Expense"
      GROUP BY month
      ORDER BY month ASC
    `

    res.json({ byCategory, monthly })
  } catch (e) {
    console.error('getSummary error:', e)
    res.status(500).json({ error: 'Failed to fetch summary' })
  }
}
