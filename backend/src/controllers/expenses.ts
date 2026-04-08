import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

import dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! })
const prisma = new PrismaClient({ adapter })

export async function getExpenses(req: Request, res: Response) {
  const { category, startDate, endDate } = req.query
  const where: Record<string, unknown> = {}

  if (category) where.category = category
  if (startDate || endDate) {
    where.date = {
      ...(startDate ? { gte: new Date(startDate as string) } : {}),
      ...(endDate ? { lte: new Date(endDate as string) } : {}),
    }
  }

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { date: 'desc' },
  })
  res.json(expenses)
}

export async function getExpenseById(req: Request, res: Response) {
  const expense = await prisma.expense.findUnique({ where: { id: req.params.id } })
  if (!expense) return res.status(404).json({ error: 'Not found' })
  res.json(expense)
}

export async function createExpense(req: Request, res: Response) {
  const { title, category, amount, date, description } = req.body
  const expense = await prisma.expense.create({
    data: { title, category, amount: parseFloat(amount), date: new Date(date), description },
  })
  res.status(201).json(expense)
}

export async function updateExpense(req: Request, res: Response) {
  const { title, category, amount, date, description } = req.body
  const expense = await prisma.expense.update({
    where: { id: req.params.id },
    data: { title, category, amount: parseFloat(amount), date: new Date(date), description },
  })
  res.json(expense)
}

export async function deleteExpense(req: Request, res: Response) {
  await prisma.expense.delete({ where: { id: req.params.id } })
  res.status(204).send()
}

export async function getSummary(req: Request, res: Response) {
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
    ORDER BY month DESC
    LIMIT 12
  `

  res.json({ byCategory, monthly })
}
