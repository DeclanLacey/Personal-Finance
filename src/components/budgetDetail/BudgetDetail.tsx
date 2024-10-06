import { useState } from 'react'
import { Budget, Transaction } from '../../types/types'
import { currencyFormatCents } from '../../utils/utils'

interface Props {
    budget: Budget,
    transactions: Transaction[]
}

export default function BudgetDetail({budget, transactions} : Props)  {

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
        
    }

    return (
        <div>
            <h2>{budget.category}</h2>
            <button>...</button>
            <p>Maximum of {currencyFormatCents(budget.maximum)}</p>
            {/* Progress bar will go here */}
            <div>
                <div></div>
                <div>
                    <p>Spent {currencyFormatCents(calculateTotalSpent())}</p>
                    <p></p>
                </div>
            </div>

            <div>
                <div></div>
                <div>
                    <p>Remaining</p>
                    <p>{currencyFormatCents(budget.maximum - (calculateTotalSpent() >= budget.maximum ? budget.maximum : calculateTotalSpent()))}</p>
                </div>
            </div>
        </div>
    )
}
