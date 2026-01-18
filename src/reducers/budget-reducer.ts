
import { v4 as uuidv4 } from 'uuid';
import type { DraftExpense, Expense } from "../types"

export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } 

export type BudgetState = {
  budget: number,
  modal: boolean,
  expenses: Expense[]
}

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: []
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
        modal: true
      }
    }
    case 'close-modal': {
      return {
        ...state,
        modal: false
      }
    }
    case 'add-expense': {
      const expense = createExpense(actions.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false
      }
    }
    case 'remove-expense': {
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== actions.payload.id),
        modal: false
      }
    }
    default: return state;
  }
}