import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {
    const { state } = useBudget();
    return (
        <>{state.budget}</>
    )
}