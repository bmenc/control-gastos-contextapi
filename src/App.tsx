import BudgetForm from "./components/BudgetForm"

function App() {

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-87">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          <BudgetForm />
        </div>
      </header>
    </>
  )
}

export default App
