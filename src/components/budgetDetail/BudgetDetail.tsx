import { Budget, Transaction } from '../../types/types'
import { currencyFormatCents, formatDate } from '../../utils/utils'
import ProgressBar from '../progressBar/ProgressBar'
import "./BudgetDetail.css"

interface Props {
    budget: Budget,
    transactions: Transaction[]
}

export default function BudgetDetail({budget, transactions} : Props)  {

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
                    <div key={index}>
                        <p>{transaction.name}</p>
                        <div>
                            <p>{currencyFormatCents(transaction.amount)}</p>
                            <p>{formatDate(transaction.date)}</p>
                        </div>
                    </div>
                )
            }
        })

        return lastThreeTransactions
    }


    return (
        <div className='budget_detail'>
            <div className='budget_detail-name-container'>
                <div className={`budget_detail-colored-circle ${budget.theme}`}></div>
                <h2 className='budget_detail-name'>{budget.category}</h2>
                <button className='budget_detail-ellipsis'></button>
            </div>
            <p className='budget_detail-max'>Maximum of {currencyFormatCents(budget.maximum)}</p>
            <ProgressBar budgetColor={budget.theme} budgetMax={budget.maximum} budgetSpend={totalSpent}></ProgressBar>
            <div>
                <div></div>
                <div>
                    <p>Spent {currencyFormatCents(totalSpent)}</p>
                    <p></p>
                </div>
            </div>

            <div>
                <div></div>
                <div>
                    <p>Remaining</p>
                    <p>{currencyFormatCents(budget.maximum - (totalSpent >= budget.maximum ? budget.maximum : totalSpent))}</p>
                </div>
            </div>

            <div>
                <div>
                    <h3>Latest Spending</h3>
                    <p>See All</p>
                </div>
                <div>
                    {renderLastThreeTransactions()}
                </div>
            </div>
        </div>
    )
}
