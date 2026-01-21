import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget();
  const percentageSpent = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className="flex gap-5">
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-48 h-48">
          <CircularProgressbar
            value={percentageSpent}
            styles={buildStyles({
              pathColor: percentageSpent >= 100 ? '#dc2626' : '#3b82f6',
              trailColor: '#F5F5F5',
              textSize: '10px',
              textColor: percentageSpent >= 100 ? '#dc2626' : '#3b82f6'
            })}
            text={`${percentageSpent}% Gastado`}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({ type: 'reset-app' })}
        >Resetear App</button>
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay
          label="Disponible"
          amount={remainingBudget}
        />
        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}