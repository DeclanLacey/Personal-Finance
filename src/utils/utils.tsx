import { Budget, SpendPerBudget, Transaction } from "../types/types"

export function currencyFormatCents(num: number) {
    
    let formattedNum : string | string[] = '$' + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (num < 0) {
        formattedNum = formattedNum.split("")
        formattedNum[0] = "-"
        formattedNum[1] = "$"
        formattedNum.join()
    }
    return formattedNum
}

export function currencyFormatNoCents(num: number) {
    let formattedNum : string | string[] = '$' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (num < 0) {
        formattedNum = formattedNum.split("")
        formattedNum[0] = "-"
        formattedNum[1] = "$"
        formattedNum.join()
    }
    return formattedNum
}

export function calculatePercentOfTotal(total: number, num: number) {
    let percent = (num / total) *100

    if (percent > 100) {
        return 100
    }else {
        return percent
    }
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

export function sortTransactions(sortSelection: string, selectedTransactions : Transaction[]) {
    switch (sortSelection) {
      case "latest":
        selectedTransactions = selectedTransactions?.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
        break;
      case "oldest":
        selectedTransactions = selectedTransactions?.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        break;
      case "a-z":
        selectedTransactions = selectedTransactions.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        break;
      case "z-a":
        selectedTransactions = selectedTransactions.sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          return 0
        })
        break;
      case "highest":
        selectedTransactions = selectedTransactions.sort((a, b) => {
            if (a.amount > 0 && b.amount > 0) {
                if ((a.amount* -1) < (b.amount* -1)) return -1
                if ((a.amount* -1) > (b.amount* -1)) return 1
            }

            if (a.amount > 0) {
                if ((a.amount * -1) < b.amount) return -1
                if ((a.amount * -1) > b.amount) return 1
            }

            if (b.amount > 0) {
                if (a.amount < (b.amount * -1)) return -1
                if (a.amount > (b.amount * -1)) return 1
            }

            if (a.amount < b.amount ) return -1
            if (a.amount > b.amount ) return 1
            return 0
        })
        break;
      case "lowest":
        selectedTransactions = selectedTransactions.sort((a, b) => {
            if (a.amount > 0 && b.amount > 0) {
                if ((a.amount* -1) > (b.amount* -1)) return -1
                if ((a.amount* -1) < (b.amount* -1)) return 1
            }

            if (a.amount > 0) {
                if ((a.amount * -1) > b.amount) return -1
                if ((a.amount * -1) < b.amount) return 1
            }

            if (b.amount > 0) {
                if (a.amount > (b.amount * -1)) return -1
                if (a.amount < (b.amount * -1)) return 1
            }
        
            if (a.amount > b.amount) return -1
            if (a.amount < b.amount) return 1

            return 0
        })
        break;
    }

    return selectedTransactions
  } 

  export function filterTransactions(filterSelection: string, selectedTransactions : Transaction[]) {
    if (filterSelection) {
      selectedTransactions = selectedTransactions?.filter((transaction) => (transaction.category).toLowerCase() === filterSelection.toLowerCase())
    }

    return selectedTransactions
  }

  export function filterTransactionsBySearch(search : string, selectedTransactions: Transaction[]) {
    selectedTransactions = selectedTransactions?.filter((transaction) => (transaction.name).toLowerCase().includes(search.toLowerCase()))
    return selectedTransactions
  }

  export function getOrdinalSuffix(i: number) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
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
    const budgetNamesAndMax = getBudgetCategoryNamesAndMax(budgets)
    const transactionsData : Transaction[] = transactions
    const spendPerBudgetCategory : SpendPerBudget[] = []

    for (let i = 0; i < budgetNamesAndMax.length; i++) {
      spendPerBudgetCategory.push({
        name: budgetNamesAndMax[i].name,
        max: budgetNamesAndMax[i].max,
        amount: 0
      })
    }
  
    for (let i = 0; i < transactionsData.length; i++) {
        if (transactionsData[i].amount > 0) continue
        if (budgetNamesAndMax.some(budget => budget.name === transactionsData[i].category)) {
            const findIndexResult = spendPerBudgetCategory.findIndex((element : SpendPerBudget) => element?.name === transactionsData[i].category)
            spendPerBudgetCategory[findIndexResult].amount += transactionsData[i].amount / -1
        }
    }

    return spendPerBudgetCategory
}

////// Returns an array of the current category names
export function getBudgetCategoryNamesAndMax(budgets : Budget[]) {
    const budgetNamesAndMax : any[] = []
    if (budgets)
    for (let i = 0; i < budgets.length; i++) {
        budgetNamesAndMax.push({
        "name": budgets[i].category,
        "max": budgets[i].maximum
      }
    )

    }
    return budgetNamesAndMax
}

///////////////////////////////////////////////////////////////////
/////////////////// Utils for recurring bills /////////////////////
///////////////////////////////////////////////////////////////////

export function calculateTotalBills(transactions: Transaction[]) {
    let totalBills = 0
    let recurringTransactions: Transaction[] = []

    for (let transaction of transactions) {
        if (transaction.recurring === true) {
            if (recurringTransactions.some(t => t.name === transaction.name && t.amount === transaction.amount)) {
                continue
            }else {
                recurringTransactions.push(transaction)
                totalBills += transaction.amount
            }
        }
    }
    return -totalBills
}

export function getRecurringBillTotals(transactions: Transaction[]) {
    let paidBills : number = 0
    let totalUpcoming : number = 0
    let dueSoon : number = 0
    let billTypeCounts = {
        paidBillsCount: 0,
        totalUpcomingCount: 0,
        dueSoonCount: 0
    }
    let currentDate = new Date().getDate()
    let recurringTransactions: Transaction[] = []
    transactions.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());

    for (let transaction of transactions) {
        if (transaction.recurring === true) {
            if (recurringTransactions.some(t => t.name === transaction.name && t.amount === transaction.amount)) {
                continue
            }else {
                recurringTransactions.push(transaction)
            }
        }
    }

    for (let i = 0; i < recurringTransactions.length; i++) {
        let transactionDay = new Date(recurringTransactions[i].date).getDate()

        if (transactionDay <= currentDate) {
            paidBills += recurringTransactions[i].amount
            billTypeCounts.paidBillsCount += 1
        }else if (transactionDay > currentDate) {
            if (transactionDay - currentDate <= 7) {
                dueSoon += recurringTransactions[i].amount
                billTypeCounts.dueSoonCount += 1
            }
            totalUpcoming += recurringTransactions[i].amount
            billTypeCounts.totalUpcomingCount += 1
        }
    }

    return {paidBills, totalUpcoming, dueSoon, billTypeCounts}
}

