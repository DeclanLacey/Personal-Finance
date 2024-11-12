import "./AddTransactionModal.css"
import { NewTransaction } from "../../types/types"
import { addTransaction } from "../../utils/clientCalls"

interface Props {
    setShowTransactionModal: Function,
    renderCategoryNameOptions: Function
}

export default function AddTransactionModal({setShowTransactionModal, renderCategoryNameOptions}: Props) {

    const currentDate = new Date().toISOString().split('T')[0]

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            name: {value: string},
            category: {value: string},
            amount: {value: number},
            date: {value: string},
            recurring: {checked: boolean},
            transactionType: {value: string}
        }

        let amount = target.amount.value
        if (target.transactionType.value === "expense") {
            amount = amount * -1
        }

        const newTransaction: NewTransaction = {
            avatar: "./assets/avatars/" + target.category.value.toLowerCase().replace(" ", "-") + ".jpg",
            name: target.name.value,
            category: target.category.value,
            amount: amount,
            date: target.date.value,
            recurring: target.recurring.checked
        }

        if (!newTransaction.amount) {
            window.alert("Please enter a valid transaction amount")
        }else {
            await addTransaction(newTransaction)
            setShowTransactionModal(false)
            location.reload()
        }
    }

    return (
        <div>
            <div onClick={() => setShowTransactionModal(false)} className='page-cover'></div>
            <div className='add_transaction'>
                <div className="add_transaction-title-container">
                    <h2 className="add_transaction-title">Add New Transaction</h2>
                    <img onClick={() => setShowTransactionModal(false)} className="close-modal-btn" src="./assets/icon-close-modal.svg" />
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="add_transaction-input-container">
                        <label className="add_transaction-label">Name</label>
                        <input required name="name" maxLength={75} className="rounded-input" placeholder="Flavor Fiesta"/>
                    </div>

                    {/* Category */}
                    <div className="add_transaction-input-container">
                        <label className="add_transaction-label">Category</label>
                        <select required name="category" className="rounded-select-input">
                            <option value="">-- Select Category</option>
                            {renderCategoryNameOptions()}
                        </select>
                    </div>
                    
                    <div className="add_transaction-input-container add_transaction-date-amount">
                        
                        <div className="amount-input-container">
                            <label className="add_transaction-label">Amount</label>
                            <span className="dollar-sign">$</span>
                            <input required name="amount" maxLength={9} placeholder="e.g 49.99" className="rounded-input add_transaction-amount-input" />
                        </div>

                        <div className="add_transaction-input-container add_transaction-date-container">
                            <label className="add_transaction-label">Date</label>
                            <input required name="date" type="date" id="transaction-date-input" defaultValue={currentDate} className="rounded-input date-input"/>
                        </div>  
                        
                    </div>

                    <div className="add_transaction-selection-container">
                        <div className="add_transaction-recurring-container">
                            <label className="add_transaction-label">Recurring Transaction?</label>
                            <input name="recurring" className="recurring-checkbox" type="checkbox" />
                        </div>

                        <div className="add_transaction-outer-radio-container">
                            <div className="add_transaction-radio-container">
                                <label className="add_transaction-label">Expense</label>
                                <input required name="transactionType" value={"expense"} defaultChecked type="radio"/>
                            </div>
                            <div className="add_transaction-radio-container">
                                <label className="add_transaction-label">Income</label>
                                <input required name="transactionType" value={"income"} type="radio"/>
                            </div>
                        </div>
                    </div>

                    <input type="submit" className="black-add-btn add_transaction-add-btn" value={"Add Transaction"} />

                </form>
            </div>
        </div>
    )
}
