import { NavLink } from 'react-router-dom'
import { Budget, Transaction } from '../../types/types'
import { currencyFormatCents, formatDate } from '../../utils/utils'
import ProgressBar from '../progressBar/ProgressBar'
import { useEffect, useState } from 'react'
import { deleteBudget} from '../../utils/clientCalls'
import ConfirmDeleteModal from '../confirmDeleteModal/ConfirmDeleteModal'
import EditBudgetModal from '../editBudgetModal/EditBudgetModal'
import "./BudgetDetail.css"

interface Props {
    budgets: Budget[],
    budget: Budget,
    transactions: Transaction[]
}

export default function BudgetDetail({budget, transactions, budgets} : Props)  {
    const [showEllipsesModal, setShowEllipsesModal] = useState<Boolean>(false)
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<Boolean>(false)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState<Boolean>()
    const totalSpent = calculateTotalSpent()

    function calculateTotalSpent() {
        let totalSpent = 0
        let currentTransactions = getTransactionsForBudget()
        for( let i = 0; i < currentTransactions.length; i++) {
            if (currentTransactions[i].category === budget.category && currentTransactions[i].amount < 0) {
                totalSpent -= currentTransactions[i].amount
            }
        }

        return totalSpent
    }

    function getTransactionsForBudget() {
        let currentTransactions : Transaction[] = []
        transactions.map((transaction) => {
            if (transaction.category === budget.category && transaction.amount < 0) { 
                currentTransactions.push(transaction)
            }
        })

        return currentTransactions
    }

    function renderLastThreeTransactions() {
        const sortedTransactions = getTransactionsForBudget().sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        const lastThreeTransactions = sortedTransactions.map((transaction, index) => {
            if (index < 3) {
                return (
                    <div key={index} className={`budget_detail-transaction ${index > 0 ? "border-top" : ""}`}>
                        <p className='budget_detail-transaction-name'>{transaction.name}</p>
                        <div className='budget_detail-transaction-amount-container'>
                            <p className='budget_detail-transaction-amount'>{currencyFormatCents(transaction.amount)}</p>
                            <p className='budget_detail-transaction-date'>{formatDate(transaction.date)}</p>
                        </div>
                    </div>
                )
            }
        })

        return lastThreeTransactions
    }

    function handleDeleteBudgetClick() {
        setOpenConfirmDeleteModal(true)
    }

    function handleEditBudgetClick() {
        setShowEditBudgetModal(true)
    }

    useEffect(() => {
        if (showEllipsesModal) {
            window.addEventListener('scroll', function() {
                setShowEllipsesModal(false)
            });
        }else {
            window.removeEventListener('scroll', function() {
            });
        }
    }, [showEllipsesModal])

    return (
        <div className='budget_detail'>
            <div className='budget_detail-name-container'>
                <div className={`budget_detail-colored-circle ${budget.theme}`}></div>
                <h2 className='budget_detail-name'>{budget.category}</h2>
                <button className='detail-ellipsis' onClick={() => setShowEllipsesModal(prevState => !prevState)}></button>
                {
                    showEllipsesModal &&
                    <div className='ellipsis-dropdown'>
                        <p className='ellipsis-edit border-bottom' onClick={handleEditBudgetClick}>Edit Budget</p>
                        <p className='ellipsis-delete' id={budget.id} onClick={handleDeleteBudgetClick}>Delete Budget</p>
                    </div>
                }

                { openConfirmDeleteModal && <ConfirmDeleteModal recordId={budget.id} deleteFunction={deleteBudget} recordName={budget.category} recordType={'budget'} setOpenConfirmDeleteModal={setOpenConfirmDeleteModal}/> }
            
                { showEditBudgetModal && <EditBudgetModal currentBudget={budget} setShowEditBudgetModal={setShowEditBudgetModal} budgets={budgets}/>}
            </div>
            <p className='budget_detail-max'>Maximum of {currencyFormatCents(budget.maximum)}</p>
            <ProgressBar budgetColor={budget.theme} budgetMax={budget.maximum} budgetSpend={totalSpent}></ProgressBar>
            
            <div className='budget_detail-spent-remaining-container'>
                <div className='budget_detail-spent-container'>
                    <div className={`budget_detail-spent-line ${budget.theme}`}></div>
                    <div className='budget_detail-spent-content-container'>
                        <p className='budget_detail-spent-title'>Spent</p>
                        <p className='budget_detail-spent-amount'>{currencyFormatCents(totalSpent)}</p>
                    </div>
                </div>

                <div className='budget_detail-remaining-container'>
                    <div className='budget_detail-remaining-line'></div>
                    <div className='budget_detail-remaining-content-container'>
                        <p className='budget_detail-remaining-title'>Free</p>
                        <p className='budget_detail-remaining-amount'>{currencyFormatCents(budget.maximum - (totalSpent >= budget.maximum ? budget.maximum : totalSpent))}</p>
                    </div>
                </div>
            </div>
            
            <div className='budget_detail-spending-container'>
                <div className='budget_detail-spending-content-container'>
                    <h3 className='budget_detail-spending-title'>Latest Spending</h3>
                    <div className='see-details-link-container'>
                        {/* You may want to have this link send data that will select the transactions for this category only */}
                        <NavLink to="/transactions" className='see-details-link'>See All</NavLink>
                        <img className='see-details-caret' src='./assets/icon-caret-right.svg'/>
                    </div>
                </div>
                <div className='budget_detail-spending-transactions'>
                    {renderLastThreeTransactions()}
                </div>
            </div>
        </div>
    )
}
