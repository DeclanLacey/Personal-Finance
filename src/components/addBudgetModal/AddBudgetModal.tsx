import "./AddBudgetModal.css"

interface Props {
    setShowAddBudgetModal: Function,
    renderCategoryNameOptions: Function
}

export default function AddBudgetModal({setShowAddBudgetModal, renderCategoryNameOptions} : Props) {
    
  return (
    <>
        <div className='page-cover'></div>
        <section className='add-modal'>
            <div className="add_budget-title-container">
                <h2 className="add_budget-title">Add New Transaction</h2>
                <img className="close-modal-btn" onClick={() => setShowAddBudgetModal(false)} src="./assets/icon-close-modal.svg" />
            </div>

            <form>

                <div className="add_budget-amount-container">
                    <label className="add-modal-input-label">Amount</label>
                    <span className="dollar-sign">$</span>
                    <input required name="amount" maxLength={9} placeholder="e.g 49.99" className="rounded-input amount-input" />
                </div>
                
                <div>
                    <label className="add-modal-input-label">Category</label>
                    <select required name="category" className="rounded-select-input">
                        <option value="">-- Select Category</option>
                        {renderCategoryNameOptions()}
                    </select>
                </div>
            
            </form>
        </section>
    </>
  )
}
