import { CheckboxField } from "@aws-amplify/ui-react"
import "./AddTransactionModal.css"

interface Props {
    setShowTransactionModal: Function
}

export default function AddTransactionModal({setShowTransactionModal}: Props) {

    const currentDate = new Date().toISOString().split('T')[0]

    return (
        <div>
            <div onClick={() => setShowTransactionModal(false)} className='page-cover'></div>
            <div className='add_transaction'>
                <div className="add_transaction-title-container">
                    <h2 className="add_transaction-title">Add New Transaction</h2>
                    <img onClick={() => setShowTransactionModal(false)} className="close-modal-btn" src="./assets/icon-close-modal.svg" />
                </div>

                <form>
                    {/* Name */}
                    <div className="add_transaction-input-container">
                        <label className="add_transaction-label">Name</label>
                        <input required className="rounded-input" placeholder="Flavor Fiesta"/>
                    </div>

                    {/* Category */}
                    <div className="add_transaction-input-container">
                        <label className="add_transaction-label">Category</label>
                        <select required className="rounded-select-input">

                        </select>
                    </div>
                    
                    <div className="add_transaction-input-container">
                        <label className="add_transaction-label">Amount</label>
                        <div className="amount-input-container">
                            <span className="dollar-sign">$</span>
                            <input required placeholder="e.g 49.99" className="rounded-input add_transaction-amount-input" />
                        </div>
                        
                    </div>

                    <div className="add_transaction-input-container">
                        <label className="add_transaction-label">Date</label>
                        <input required type="date" id="transaction-date-input" defaultValue={currentDate} className="rounded-input date-input"/>
                    </div>                

                    <div className="add_transaction-selection-container">
                        <div className="add_transaction-recurring-container">
                            <label className="add_transaction-label">Recurring Transaction?</label>
                            <input className="recurring-checkbox" type="checkbox" />
                        </div>

                        <div className="add_transaction-outer-radio-container">
                            <div className="add_transaction-radio-container">
                                <label className="add_transaction-label">Expense</label>
                                <input required name="transaction-type" defaultChecked type="radio"/>
                            </div>
                            <div className="add_transaction-radio-container">
                                <label className="add_transaction-label">Income</label>
                                <input required name="transaction-type" type="radio"/>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}