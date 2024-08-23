import { useState, ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date()
  })
  const [error, setError] = useState()
  const { dispatch } = useBudget()


  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validar
    if(Object.values(expense).includes('')){
      setError('todos los campos son obligatorios')
      return
    }

    //agregar un nuevo gasto
    dispatch({ type: 'add-expense', payload: {expense}})

    //reiniciar el state
    setExpense({ 
      expenseName: '', 
      amount: 0, 
      category: '', 
      date: new Date()
    })
  }


  return (
    <form className="space-y-5" onSubmit={ handleSubmit }>
      <legend
      className="uppercase text-center text-2xl font-black border-b-4 border-blue-400">
        Nuevo gasto
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}


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
          value={expense.expenseName}
          onChange={handleChange}
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
          value={expense.amount}
          onChange={handleChange}
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
          name="category"
          value={expense.category}
          onChange={handleChange}
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

      <div className="flex flex-col gap-2"> 
        <label
          htmlFor="amount"
          className="text-2xl"
          >
          Fecha gasto:
        </label>
        <DatePicker 
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
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
