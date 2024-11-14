import { useEffect, useState } from "react"
import "./AddBudgetModal.css"
import { FieldWrap, Select } from '@deque/cauldron-react'
import { Theme } from "../../types/types"
import { getThemes } from "../../utils/clientCalls"
import { render } from "react-dom"

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

    function renderColorOptions() {
        const colorOptions = themes?.map((theme) => {
            return {
                value: theme.name.replace(/\w\S*/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }),
                key: theme.name
            }
        })
        
        return colorOptions
    }
    
    return (
        <>
            <div className='page-cover'></div>
            <section className='add-modal'>
                <div className="add_budget-title-container">
                    <h2 className="add_budget-title">Add New Transaction</h2>
                    <img className="close-modal-btn" onClick={() => setShowAddBudgetModal(false)} src="./assets/icon-close-modal.svg" />
                </div>

                <form>

                    {/* <div className="add_budget-amount-container">
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
                    </div> */}

                    {/* <div className="add_budget-input-container">
                        <label className="add-modal-input-label">Color Tag</label>
                        <select required name="category" className="rounded-select-input">
                            <option value="">-- Select Color</option>
                            
                                <option> 
                                    <div className="color-circle">

                                    </div>
                                    Green
                                </option>
                           
                            
                        </select>
                        
                    </div> */}
                    <FieldWrap>
                        <Select
                            label="Do you like yogurt?"
                            options={renderColorOptions()}
                            defaultValue="Yes"
                        />
                    </FieldWrap>
                  
                </form>
            </section>
        </>
    )
}
