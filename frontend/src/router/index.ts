import { createRouter, createWebHistory } from 'vue-router'
import ExpensesView from '../views/ExpensesView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/expenses' },
    { path: '/expenses', component: ExpensesView },
    { path: '/dashboard', component: DashboardView },
  ],
})

export default router
