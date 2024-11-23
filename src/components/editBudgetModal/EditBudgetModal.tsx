import { useEffect, useState } from 'react'
import { Budget, Category, Theme, UpdatedBudget } from '../../types/types'
import {getCategories, getThemes, updateBudget } from '../../utils/clientCalls'
import { checkIfBudgetExists, renderColorOptions } from '../../utils/utils'

interface Props {
  budgets: Budget[],
  currentBudget: Budget,
  setShowEditBudgetModal: Function,
}

export default function EditBudgetModal({ currentBudget, setShowEditBudgetModal, budgets} : Props) {
  const [themes, setThemes] = useState<Theme[]>()
  const [loading, setLoading] = useState<Boolean>()
  const [categoryNames, setCategoryNames] = useState<Category[]>()
  const [category, setCategory] = useState<string>()
  const [maximum, setMaximum] = useState<number>()
  const [theme, setTheme] = useState<string>()

  useEffect(() => {
      async function getData() {
          try {
              setLoading(true)
              const themeData = await getThemes()
              const categoryData = await getCategories()
              setThemes(themeData)
              setCategoryNames(categoryData)
              setCategory(currentBudget.category)
              setMaximum(currentBudget.maximum)
              setTheme(currentBudget.theme)
              setLoading(false)
            }catch(error) {
              setLoading(false)
              console.log(error)
            }
      }
      getData()
  }, [])

  /// Checks if the data is currently loading
  if (loading) {
      return <div></div>
  }

  //// Checks if the budgets or transactions are falsey values
  if (!themes || !budgets) {
      return <div></div>
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const target = event.target as typeof event.target & {
        category: {value: string},
        maximum: {value: number},
        theme: {value: string}
    }

    if (checkIfBudgetExists(budgets, target.category.value) && target.category.value !== currentBudget.category) {
        window.alert("There is already a budget for the chosen category")
    }else {

        const updatedBudget : UpdatedBudget = {
          id: currentBudget.id,
          category: target.category.value,
          maximum: target.maximum.value,
          theme: target.theme.value
        }

        if (!updatedBudget.maximum) {
            window.alert("Please enter a valid transaction amount")
        }else {
            await updateBudget(updatedBudget)
            setShowEditBudgetModal(false)
            location.reload()
        }
    }
  } 

  function renderCategoryNameOptions() {
    const categoryNameElements = categoryNames?.map((category, index) => {
      return (
        <option key={index} value={category.name}> {category.name} </option>
      )
    })
    
    return categoryNameElements
  }

  return (
    <>
        <div className='page-cover'></div>
        <section className='add-edit-modal'>
            <div className="add-edit-modal-title-container">
                <h2 className="add-edit-modal-title">Edit Budget</h2>
                <img className="close-modal-btn" onClick={() => setShowEditBudgetModal(false)} src="./assets/icon-close-modal.svg" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="add-edit-modal-amount-container">
                    <label className="add-edit-modal-input-label">Amount</label>
                    <span className="dollar-sign">$</span>
                    <input required name="maximum" maxLength={9} value={maximum} onChange={(e: React.FormEvent<HTMLInputElement>) => {setMaximum(Number(e.currentTarget.value) | 0)}} placeholder="e.g 49.99" className="rounded-input amount-input" />
                </div>
                
                <div className="add-edit-modal-input-container">
                    <label className="add-edit-modal-input-label">Category</label>
                    <select required name="category" className="rounded-select-input" value={category} onChange={(e: React.FormEvent<HTMLSelectElement>) => {setCategory(e.currentTarget.value)}}>
                        <option value="">-- Select Category</option>
                        {renderCategoryNameOptions()}
                    </select>
                </div>

                <div className="add-edit-modal-input-container">
                    <label className="add-edit-modal-input-label">Color Tag</label>
                    <select required name="theme" className="rounded-select-input" value={theme} onChange={(e: React.FormEvent<HTMLSelectElement>) => {setTheme(e.currentTarget.value)}}>
                        <option value="">-- Select Color</option>
                        {renderColorOptions(themes)}
                    </select>
                </div>

                <input type="submit" className="black-add-btn add-edit-modal-btn" value={"Save Changes"}></input>
            </form>
        </section>
    </>
  )
}
