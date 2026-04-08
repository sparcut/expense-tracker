import { Router } from 'express'
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} from '../controllers/expenses'

const router = Router()

router.get('/', getExpenses)
router.get('/summary', getSummary)
router.post('/', createExpense)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router
