import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {

  const { state } = useBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  const filteredExpenses = useMemo(() => {
    if (!state.currentCategoryId) {
      return state.expenses;
    }
    return state.expenses.filter(expense => expense.category === state.currentCategoryId);
  }, [state.expenses, state.currentCategoryId]);

  return (
    <div className="mt-10 bg-white rounded-lg p-10 shadow-lg">
      {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p> : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5"> Listado de Gastos.</p>
          {filteredExpenses.map(expense => (
            <ExpenseDetail
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      )}
    </div>
  )
}