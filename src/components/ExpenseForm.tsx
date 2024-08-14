import { categories } from "../data/categories";



export default function ExpenseForm() {
  return (
    <form className="space-y-5">
      <legend
      className="uppercase text-center text-2xl font-black border-b-4 border-blue-400">
        Nuevo gasto
      </legend>
      <div className="flex flex-col gap-2"> 
        <label
          htmlFor="expenseName"
          className="text-2xl"
          >
          Nombre gasto:
        </label>
        <input 
          type="text" 
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
        />
      </div>

      <div className="flex flex-col gap-2"> 
        <label
          htmlFor="amount"
          className="text-2xl"
          >
          Cantidad gasto:
        </label>
        <input 
          type="number" 
          id="amount"
          placeholder="Añade la cantidad del gasto ej: 300"
          className="bg-slate-100 p-2"
          name="amount"
        />
      </div>

      <div className="flex flex-col gap-2"> 
        <label
          htmlFor="category"
          className="text-2xl"
          >
          Categoria:
        </label>
        <select 
          id="category"
          className="bg-slate-100 p-2"
          name="amount"
        >
          <option value="">-- seleccione --</option>
          {categories.map(category => (
            <option 
              key={category.id} 
              value={category.id}>
                {category.name}
            </option>
          ))}
        </select>
      </div>

      <input 
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Guardar gasto"
      >
      </input>
    </form>
  )
}
