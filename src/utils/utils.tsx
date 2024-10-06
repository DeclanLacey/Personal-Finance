import { Budget, SpendPerBudget, Transaction } from "../types/types"

export function currencyFormatCents(num: number) {
    return '$' + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function currencyFormatNoCents(num: number) {
    return '$' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function getRecurringBillTotals(transactions: Transaction[]) {
    let paidBills : number = 0
    let totalUpcoming : number = 0
    let dueSoon : number = 0
    let currentDate = new Date()

    for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].date)
        if (transactions[i].recurring === true) {
            if (transactionDate.getDate() < currentDate.getDate()) {
                paidBills += transactions[i].amount
            }else if (transactionDate.getDate() <= currentDate.getDate() || transactionDate.getDate() >= (currentDate.getDate() - 5)) {
                dueSoon += transactions[i].amount
                totalUpcoming += transactions[i].amount
            }else if (transactionDate.getDate() > currentDate.getDate()) {
                totalUpcoming += transactions[i].amount
            }else {
                totalUpcoming += transactions[i].amount
            }
        }

    }

    return {paidBills, totalUpcoming, dueSoon}
}

//// A function to format the date in this format 02 Jul 2024
export function formatDate(dateString: string) {
    let date = new Date(dateString)
    let dateArray = date.toDateString().split(' ')
    let dateFormat = dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3]

    return dateFormat
}

//// Returns an array of objects that are passed into the chart when it is created
export function setPieChartColorsAndValues(budgets : Budget[] ) {
    const budgetPieChartData : any = budgets.map((budget) => {
      return (
        {
          value: budget.maximum,
          className: budget.theme
        }
      )
    })

    return budgetPieChartData
}

/////////////////////////////////////////////////////////////////
//////////////////// Utils for budgets //////////////////////////
/////////////////////////////////////////////////////////////////

////// Calculates the total limit of all of the budget limits combined
export function calculateTotalBudgetLimit(budgets : Budget[]) {
    let totalBudgetLimit : number = 0

    if (budgets)
    for (let i = 0; i < budgets.length; i++) {
        totalBudgetLimit += budgets[i].maximum
    }

    return totalBudgetLimit
}

////// Calculates the total amount spent for all of the different budgets combined
export function calculateTotalBudgetSpend(budgets : Budget[], transactions : Transaction[]) {
    let totalBudgetSpend : number = 0
    let budgetSpendPerCategory = calculateSpendPerBudgetCategory(budgets, transactions)
    for (let i = 0; i < budgetSpendPerCategory.length; i++) {
        totalBudgetSpend += budgetSpendPerCategory[i].amount
    }

    return totalBudgetSpend
}

 ////// Calculates the total amount spent for each individual category
export function calculateSpendPerBudgetCategory(budgets : Budget[], transactions : Transaction[]) {
    const budgetNames = getBudgetCategoryNames(budgets)
    const transactionsData : Transaction[] = transactions
    const spendPerBudgetCategory : SpendPerBudget[] = []

    for (let i = 0; i < budgetNames.length; i++) {
      spendPerBudgetCategory.push({
        name: budgetNames[i],
        amount: 0
      })
    }
  
    for (let i = 0; i < transactionsData.length; i++) {
      if (budgetNames.includes(transactionsData[i].category)) {
        const findIndexResult = spendPerBudgetCategory.findIndex((element : SpendPerBudget) => element?.name === transactionsData[i].category)
        spendPerBudgetCategory[findIndexResult].amount += transactionsData[i].amount / -1
      }
    }

    return spendPerBudgetCategory
}

////// Returns an array of the current category names
export function getBudgetCategoryNames(budgets : Budget[]) {
    const budgetNames : string[] = []
    if (budgets)
    for (let i = 0; i < budgets.length; i++) {
      budgetNames.push(budgets[i].category)
    }
    return budgetNames
}