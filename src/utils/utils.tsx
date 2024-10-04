import { Transaction } from "../types/types"

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