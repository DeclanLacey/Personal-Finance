import { useEffect, useState } from "react"
import "./AddBudgetModal.css"
import { NewBudget, Theme } from "../../types/types"
import { addBudget, getThemes } from "../../utils/clientCalls"

interface Props {
    setShowAddBudgetModal: Function,
    renderCategoryNameOptions: Function
}

export default function AddBudgetModal({setShowAddBudgetModal, renderCategoryNameOptions} : Props) {

    const [themes, setThemes] = useState<Theme[]>()
    const [loading, setLoading] = useState<Boolean>()

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const themeData : any = await getThemes()
                setThemes(themeData)
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
    if (!themes) {
        return <div></div>
    }

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            category: {value: string},
            maximum: {value: number},
            theme: {value: string}
        }

        const newTransaction: NewBudget = {
            category: target.category.value,
            maximum: target.maximum.value,
            theme: target.theme.value
        }

        if (!newTransaction.maximum) {
            window.alert("Please enter a valid transaction amount")
        }else {
            await addBudget(newTransaction)
            setShowAddBudgetModal(false)
            location.reload()
        }
    }

    function renderColorOptions() {
        const colorOptions = themes?.map((theme, index) => {
            let upperCaseName : string = theme.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}) 
            return (
                <option className={`color-option`} value={theme.name}>{upperCaseName}</option>
            )
        })
        
        return colorOptions
    }
    
    return (
        <>
            <div className='page-cover'></div>
            <section className='add-modal'>
                <div className="add_budget-title-container">
                    <h2 className="add_budget-title">Add New Budget</h2>
                    <img className="close-modal-btn" onClick={() => setShowAddBudgetModal(false)} src="./assets/icon-close-modal.svg" />
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="add_budget-amount-container">
                        <label className="add-modal-input-label">Amount</label>
                        <span className="dollar-sign">$</span>
                        <input required name="amount" maxLength={9} placeholder="e.g 49.99" className="rounded-input amount-input" />
                    </div>
                    
                    <div className="add_budget-input-container">
                        <label className="add-modal-input-label">Category</label>
                        <select required name="category" className="rounded-select-input">
                            <option value="">-- Select Category</option>
                            {renderCategoryNameOptions()}
                        </select>
                    </div>

                    <div className="add_budget-input-container">
                        <label className="add-modal-input-label">Color Tag</label>
                        <select required name="category" className="rounded-select-input">
                            <option value="">-- Select Color</option>
                            {renderColorOptions()}
                        </select>
                    </div>

                    <input type="submit" className="black-add-btn add-budget-btn" value={"Add Budget"}></input>

                </form>
            </section>
        </>
    )
}
