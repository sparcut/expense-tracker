import { Router } from 'express'
import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} from '../controllers/expenses'

const router = Router()

router.get('/', getExpenses)
router.get('/summary', getSummary)
router.get('/:id', getExpenseById)
router.post('/', createExpense)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router
