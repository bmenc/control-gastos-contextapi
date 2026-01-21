import { categories } from "../data/categories";

export default function FilterByCategory() {
  return (
    <div className="bg-white shadow-lg p-10 rounded-lg">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar por Categoría</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded"
          >
            <option value="">-- Todas las Categorías --</option>
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form >
    </div >
  )
}