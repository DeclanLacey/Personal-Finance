import { useEffect, useState } from "react"
import { Budget, NewBudget, Theme } from "../../types/types"
import { addBudget, getThemes } from "../../utils/clientCalls"
import { alertToWindow, checkIfBudgetExists, checkIfStringIsNumber, renderColorOptions } from "../../utils/utils"
import "./AddBudgetModal.css"

interface Props {
    budgets: Budget[],
    setShowAddBudgetModal: Function,
    renderCategoryNameOptions: Function
}

export async function getData(setLoading : Function, setThemes: Function, getThemes: Function) {
    try {
        setLoading(true)
        const themeData : any = await getThemes()
        setThemes(themeData)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        throw new Error(`There has been an error while getting the data. Error message -> ${error}`)
      }
}

export async function handleSubmit(event: React.SyntheticEvent, budgets: Budget[], category: string, maximum: string, theme: string, setShowAddBudgetModal: Function) {
    event.preventDefault()
    
    try {
        if (checkIfBudgetExists(budgets, category)) {
            alertToWindow("There is already a budget for the chosen category")
        }else {
            const newBudget: NewBudget = {
                category: category,
                maximum: Number(maximum),
                theme: theme
            }
    
            if (!newBudget.maximum || newBudget.maximum < 1) {
                alertToWindow("Please enter a valid budget amount. The minimum for a budget is $1")
            }else {
                await addBudget(newBudget)
                setShowAddBudgetModal(false)
                location.reload()
            }
        }
    }catch (error) {
        throw new Error(`There has been an error while adding the data. Error message -> ${error}`)
    }
    
}

export function handleMaximumChange(e: React.FormEvent<HTMLInputElement>, setMaximum: Function) {
    if (checkIfStringIsNumber(e.currentTarget.value)) {
        setMaximum(e.currentTarget.value)
    }
}

export function AddBudgetModal({budgets, setShowAddBudgetModal, renderCategoryNameOptions} : Props) {
    const [themes, setThemes] = useState<Theme[]>()
    const [loading, setLoading] = useState<Boolean>()
    const [maximum, setMaximum] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [theme, setTheme] = useState<string>("")

    useEffect(() => {
        getData(setLoading, setThemes, getThemes)
    }, [])

    /// Checks if the data is currently loading
    if (loading) {
        return <div></div>
    }

    //// Checks if the budgets or transactions are falsey values
    if (!themes) {
        return <div></div>
    }

    return (
        <>
            <div className='page-cover'></div>
            <section className='add-edit-modal'>
                <div className="add-edit-modal-title-container">
                    <h2 className="add-edit-modal-title">Add New Budget</h2>
                    <button aria-label="Button to close the current modal" className="close-modal-btn" onClick={() => setShowAddBudgetModal(false)}> <img alt="a circle with an x inside of it"  className="close-modal-btn-img" src="./assets/icon-close-modal.svg" /></button>
                </div>

                <form onSubmit={(event) => {handleSubmit(event, budgets, category, maximum, theme, setShowAddBudgetModal)}}>
                    <div className="add-edit-modal-amount-container">
                        <label htmlFor="maximum" className="add-edit-modal-input-label">Amount</label>
                        <span className="dollar-sign">$</span>
                        <input required name="maximum" maxLength={9} value={maximum} placeholder="e.g 49.99" className="rounded-input amount-input" onChange={(event) => handleMaximumChange(event, setMaximum)}/>
                    </div>
                    
                    <div className="add-edit-modal-input-container">
                        <label htmlFor="category" className="add-edit-modal-input-label">Category</label>
                        <select required name="category" value={category} className="rounded-select-input" onChange={(e: React.FormEvent<HTMLSelectElement>) => {setCategory(e.currentTarget.value)}}>
                            <option value="">-- Select Category</option>
                            {renderCategoryNameOptions()}
                        </select>
                    </div>

                    <div className="add-edit-modal-input-container">
                        <label htmlFor="theme" className="add-edit-modal-input-label">Color Tag</label>
                        <select required name="theme" value={theme} className="rounded-select-input" onChange={(e: React.FormEvent<HTMLSelectElement>) => {setTheme(e.currentTarget.value)}}>
                            <option value="">-- Select Color</option>
                            {renderColorOptions(themes)}
                        </select>
                    </div>

                    <input aria-label="button to submit the form" type="submit" className="black-add-btn add-edit-modal-btn" value={"Add Budget"}></input>
                </form>
            </section>
        </>
    )
}
