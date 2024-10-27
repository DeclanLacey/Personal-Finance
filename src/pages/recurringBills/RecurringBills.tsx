import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { getTransactions } from '../../utils/clientCalls'
import { calculateTotalBills, currencyFormatCents, getRecurringBillTotals } from '../../utils/utils'
import "./RecurringBills.css"

export default function RecurringBills() {
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState<Boolean>(false)
  let recurringBillTotals

  useEffect(() => {
    //// Calls utility functions to get the data from the backend
    async function getData() {
      try {
        setLoading(true)
        const transactionData = await getTransactions()
        setTransactions(transactionData)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }
    getData()
  }, [])

  /// Checks if the data is currently loading
  if (loading) {
    return <div></div>
  }

  //// Checks if the budgets or transactions are falsey values
  if (!transactions) {
    return <div></div>
  }

  recurringBillTotals = getRecurringBillTotals(transactions)
  
  return (
    <div className='recurring_bills_page'>
      <h1 className='recurring_bills_page-title'>Recurring Bills</h1>
      <section className='recurring_bills_page-total-container'>
        <img className='recurring_bills_page-bill-icon' src='./assets/icon-recurring-bills.svg' />
        <div>
          <h2 className='recurring_bills_page-total-title'>Total Bills</h2>
          {transactions ? <p className='recurring_bills_page-total'>{currencyFormatCents(calculateTotalBills(transactions))}</p> : <></>}
        </div>
      </section>

      <section className='recurring_bills_page-summary-container'>
        <h2 className='recurring_bills_page-summary-title'>Summary</h2>

        <div className='recurring_bills_page-flex-container border-bottom'>
          <p className='recurring_bills_page-summary-subtitle'>Paid Bills</p>
          <p className='recurring_bills_page-summary-total'>{`${recurringBillTotals.billTypeCounts.paidBillsCount} (${currencyFormatCents(-recurringBillTotals.paidBills)})`}</p>
        </div>

        <div className='recurring_bills_page-flex-container border-bottom'>
          <p className='recurring_bills_page-summary-subtitle'>Total Upcoming</p>
          <p className='recurring_bills_page-summary-total'>{`${recurringBillTotals.billTypeCounts.totalUpcomingCount} (${currencyFormatCents(-recurringBillTotals.totalUpcoming)})`}</p>
        </div>

        <div className='recurring_bills_page-flex-container'>
          <p className='recurring_bills_page-summary-subtitle red-text'>Due Soon</p>
          <p className='recurring_bills_page-summary-total red-text'>{`${recurringBillTotals.billTypeCounts.dueSoonCount} (${currencyFormatCents(-recurringBillTotals.dueSoon)})`}</p>
        </div>
      </section>
    </div>
  )
}
