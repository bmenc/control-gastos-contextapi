export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } }

export type BudgetState = {
  budget: number
}

export const initialState: BudgetState = {
  budget: 0
}

export const budgetReducer = (
  state: BudgetState = initialState,
  actions: BudgetActions
) => {
  switch (actions.type) {
    case 'add-budget': {
      return {
        ...budgetReducer,
        budget: actions.payload.budget
      }
    }

    default: return state;
  }
}