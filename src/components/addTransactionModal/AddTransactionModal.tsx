import { useState } from "react"
import { NewTransaction, TransactionType } from "../../types/types"
import { addTransaction, updateBalance } from "../../utils/clientCalls"
import { checkIfStringIsNumber } from "../../utils/utils"
import "./AddTransactionModal.css"

interface Props {
    setShowTransactionModal: Function,
    renderCategoryNameOptions: Function
}

export default function AddTransactionModal({setShowTransactionModal, renderCategoryNameOptions}: Props) {
    const currentDate = new Date().toISOString().split('T')[0]
    const [name, setName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [date, setDate] = useState<string>(currentDate)
    const [recurring, setRecurring] = useState<boolean>(false)
    const [transactionType, setTransactionType] = useState<TransactionType>("expense")

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const newTransaction: NewTransaction = {
            avatar: "./assets/avatars/" + category.toLowerCase().replace(" ", "-") + ".jpg",
            name: name,
            category: category,
            amount: transactionType === "expense" ? Number(amount) * -1 : Number(amount),
            date: date,
            recurring: recurring
        }

        if (!newTransaction.amount) {
            window.alert("Please enter a valid transaction amount")
        }else {
            await addTransaction(newTransaction)
            await updateBalance(newTransaction.amount)
            setShowTransactionModal(false)
            location.reload()
        }
    }

    function handleRecurringChange() {
        setRecurring(prevState => !prevState)
    }

    function handleTypeChange(e: React.FormEvent<HTMLInputElement>) {
        setTransactionType(e.currentTarget.value as TransactionType)
    }

    function handleAmountChange(e: React.FormEvent<HTMLInputElement>) {
        if (checkIfStringIsNumber(e.currentTarget.value)) {
            setAmount(e.currentTarget.value)
        }
    }

    return (
        <>
            <div onClick={() => setShowTransactionModal(false)} className='page-cover'></div>
            <section className='add-edit-modal'>
                <div className="add_transaction-title-container">
                    <h2 className="add_transaction-title">Add New Transaction</h2>
                    <img onClick={() => setShowTransactionModal(false)} className="close-modal-btn" src="./assets/icon-close-modal.svg" />
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="add_transaction-input-container">
                        <label className="add-edit-modal-input-label">Name</label>
                        <input required name="name" maxLength={75} className="rounded-input" placeholder="Flavor Fiesta" value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => {setName(e.currentTarget.value)}}/>
                    </div>

                    {/* Category */}
                    <div className="add_transaction-input-container">
                        <label className="add-edit-modal-input-label">Category</label>
                        <select required name="category" className="rounded-select-input" value={category} onChange={(e: React.FormEvent<HTMLSelectElement>) => {setCategory(e.currentTarget.value)}}>
                            <option value="">-- Select Category</option>
                            {renderCategoryNameOptions()}
                        </select>
                    </div>
                    
                    <div className="add_transaction-input-container add_transaction-date-amount">
                         {/* Amount */}
                        <div className="transaction-amount-input-container">
                            <label className="add-edit-modal-input-label">Amount</label>
                            <span className="dollar-sign">$</span>
                            <input required name="amount" maxLength={9} placeholder="e.g 49.99" className="rounded-input amount-input" value={amount} onChange={handleAmountChange}/>
                        </div>

                        {/* Date */}
                        <div className="add_transaction-input-container add_transaction-date-container">
                            <label className="add-edit-modal-input-label">Date</label>
                            <input required name="date" type="date" id="transaction-date-input" className="rounded-input date-input" value={date} onChange={(e: React.FormEvent<HTMLInputElement>) => {setDate(e.currentTarget.value)}}/>
                        </div>  
                    </div>

                    <div className="add_transaction-selection-container">
                         {/* Recurring */}
                        <div className="add_transaction-recurring-container">
                            <label className="add-edit-modal-input-label">Recurring Transaction?</label>
                            <input name="recurring" className="recurring-checkbox" type="checkbox" checked={recurring} onChange={handleRecurringChange}/>
                        </div>

                        {/* Expense/Income */}
                        <div className="add_transaction-outer-radio-container">
                            <div className="add_transaction-radio-container">
                                <label className="add-edit-modal-input-label">Expense</label>
                                <input required name="transactionType" value={"expense"} defaultChecked type="radio" onChange={handleTypeChange}/>
                            </div>
                            <div className="add_transaction-radio-container">
                                <label className="add-edit-modal-input-label">Income</label>
                                <input required name="transactionType" value={"income"} type="radio" onChange={handleTypeChange}/>
                            </div>
                        </div>
                    </div>

                    <input type="submit" className="black-add-btn add_transaction-add-btn" value={"Add Transaction"} />
                </form>
            </section>
        </>
    )
}
