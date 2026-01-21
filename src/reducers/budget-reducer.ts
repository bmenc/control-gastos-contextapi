
import { v4 as uuidv4 } from 'uuid';
import type { DraftExpense, Expense } from "../types"

export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } |
  { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
  { type: 'update-expense', payload: { expense: Expense } } |
  { type: 'reset-app' }

export type BudgetState = {
  budget: number,
  modal: boolean,
  expenses: Expense[],
  editingId?: Expense['id']
}

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses')
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

const localStorageClear = () => {
  localStorage.removeItem('budget');
  localStorage.removeItem('expenses');
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4()
  }
}

export const budgetReducer = (
  state: BudgetState = initialState,
  actions: BudgetActions
) => {
  switch (actions.type) {
    case 'add-budget': {
      return {
        ...state,
        budget: actions.payload.budget
      }
    }
    case 'show-modal': {
      return {
        ...state,
        modal: true,
        editingId: ''
      }
    }
    case 'close-modal': {
      return {
        ...state,
        modal: false,
        editingId: ''
      }
    }
    case 'add-expense': {
      const expense = createExpense(actions.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
        editingId: ''
      }
    }
    case 'remove-expense': {
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== actions.payload.id),
        modal: false,
        editingId: ''
      }
    }
    case 'get-expense-by-id': {
      return {
        ...state,
        editingId: actions.payload.id,
        modal: true
      }
    }
    case 'update-expense': {
      return {
        ...state,
        expenses: state.expenses.map(expense => expense.id === actions.payload.expense.id ? actions.payload.expense : expense),
        modal: false,
        editingId: ''
      }
    }
    case 'reset-app': {
      localStorageClear();
      return {
        ...state,
        budget: 0,
        expenses: []
      }
    }
    default: return state;
  }
}