import { Budget, SpendPerBudget, Theme, Transaction } from "../types/types"

///////////////////////////////////////////////////////
////////////////// General Utils //////////////////////
///////////////////////////////////////////////////////

export function checkIfStringIsNumber(num : string) {
    let reg = /^-?\d*\.?\d*$/
    return reg.test(num)
}

export function alertToWindow(message: string) {
    window.alert(message)
}

export function currencyFormatCents(num: number) {
    let formattedNum : string | string[] = '$' + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (num < 0) {
        formattedNum = formattedNum.split("")
        formattedNum[0] = "-"
        formattedNum[1] = "$"
        formattedNum = formattedNum.join("")
    }
    return formattedNum
}

export function currencyFormatNoCents(num: number) {
    let formattedNum : string | string[] = '$' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (num < 0) {
        formattedNum = formattedNum.split("")
        formattedNum[0] = "-"
        formattedNum[1] = "$"
        formattedNum = formattedNum.join("")
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
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }
    let dateArray = date.toDateString().split(' ')
    let dateFormat = dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3]

    return dateFormat
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

export function capitalizeEachWord(string: string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}

export function renderColorOptions(themes: Theme[]) {
    const colorOptions = themes?.map((theme, index) => {
        let upperCaseName : string = capitalizeEachWord(theme.name) 
        return (
            <option key={index} className={`color-option`} value={theme.name}>{upperCaseName}</option>
        )
    })
    
    return colorOptions
}

//////////////////////////////////////////////////////
///////////// Transaction related utils //////////////
//////////////////////////////////////////////////////

export function sortTransactions(sortSelection: string, selectedTransactions : Transaction[]) {
    switch (sortSelection) {
        case "latest":
            return sortByLatestDate(selectedTransactions);
        case "oldest":
            return sortByOldestDate(selectedTransactions);
        case "a-z":
            return sortAToZ(selectedTransactions);
        case "z-a":
            return sortZToA(selectedTransactions);
        case "highest":
            return sortInDescendingOrderByAbsoluteValue(selectedTransactions);
        case "lowest":
            return sortInAscendingOrderByAbsoluteValue(selectedTransactions);
    }

    return selectedTransactions
} 

export function sortByLatestDate(selectedTransactions : Transaction[]) {
    return selectedTransactions.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export function sortByOldestDate(selectedTransactions : Transaction[]) {
    return selectedTransactions.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
}

export function sortAToZ(selectedTransactions : Transaction[]) {
    return selectedTransactions.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })
}

export function sortZToA(selectedTransactions : Transaction[]) {
    return selectedTransactions.sort((a, b) => {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
    })
}

export function sortInDescendingOrderByAbsoluteValue(selectedTransactions : Transaction[]) {
    return selectedTransactions.sort((a, b) => {
        const absA = Math.abs(a.amount);
        const absB = Math.abs(b.amount);
        
        if (absA > absB) return - 1;
        if (absA < absB) return 1;

        return 0;
    });
}

export function sortInAscendingOrderByAbsoluteValue(selectedTransactions : Transaction[]) {
    return selectedTransactions.sort((a, b) => {
        const absA = Math.abs(a.amount);
        const absB = Math.abs(b.amount);
        
        if (absA < absB) return - 1;
        if (absA > absB) return 1;

        return 0;
    })
}

export function filterTransactions(filterSelection: string, selectedTransactions : Transaction[]) {
    if (filterSelection) {
        selectedTransactions = selectedTransactions?.filter((transaction) => (transaction.category).toLowerCase() === filterSelection.toLowerCase())
    }
    return selectedTransactions
}

export function filterTransactionsBySearch(search : string, selectedTransactions: Transaction[]) {
    search = search.trim().replace(/\s+/g, " ")
    selectedTransactions = selectedTransactions?.filter((transaction) => (transaction.name).toLowerCase().includes(search.toLowerCase()))
    return selectedTransactions
}

/////////////////////////////////////////////////////////////////
//////////////////// Utils for budgets //////////////////////////
/////////////////////////////////////////////////////////////////

////// Calculates the total limit of all of the budget limits combined
export function calculateTotalBudgetLimit(budgets : Budget[]) {
    let totalBudgetLimit : number = 0

    if (budgets) {
        for (let i = 0; i < budgets.length; i++) {
            totalBudgetLimit += budgets[i].maximum
        }
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
    const spendPerBudgetCategory : SpendPerBudget[] = getBudgetCategoryNamesAndMax(budgets)
  
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amount > 0) continue
        if (spendPerBudgetCategory.some(budget => budget.name === transactions[i].category)) {
            const findIndexResult = spendPerBudgetCategory.findIndex((element : SpendPerBudget) => element?.name === transactions[i].category)
            spendPerBudgetCategory[findIndexResult].amount += transactions[i].amount / -1
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
        name: budgets[i].category,
        max: budgets[i].maximum,
        amount: 0
      }
    )

    }
    return budgetNamesAndMax
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

export function checkIfBudgetExists(budgets: Budget[], newBudgetCategory: string) {
    for (const budget of budgets) {
        if (budget.category.toLowerCase() === newBudgetCategory.toLowerCase()) {
            return true
        }
    }
    return false
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
    return totalBills < 0 ? -totalBills : 0
}

/// Split this into multiple functions? 
export function getRecurringBillTotals(transactions: Transaction[]) {
    let billTypeCounts = {
        paidBillsAmount: 0,
        paidBillsCount: 0,
        totalUpcomingAmount: 0,
        totalUpcomingCount: 0,
        dueSoonAmount: 0,
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
            billTypeCounts.paidBillsAmount += recurringTransactions[i].amount
            billTypeCounts.paidBillsCount += 1
        }else if (transactionDay > currentDate) {
            if (transactionDay - currentDate <= 7) {
                billTypeCounts.dueSoonAmount += recurringTransactions[i].amount
                billTypeCounts.dueSoonCount += 1
            }
            billTypeCounts.totalUpcomingAmount += recurringTransactions[i].amount
            billTypeCounts.totalUpcomingCount += 1
        }
    }

    return billTypeCounts
}

