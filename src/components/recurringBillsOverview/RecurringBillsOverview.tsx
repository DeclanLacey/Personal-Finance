import { useEffect, useState } from 'react'
import { currencyFormatCents, getRecurringBillTotals } from '../../utils/utils'
import { NavLink } from 'react-router-dom'
import { getTransactions } from '../../utils/clientCalls'
import { Transaction } from '../../types/types'
import "./RecurringBillsOverview.css"

export default function RecurringBillsOverview() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState<Boolean>()
  let recurringBillTotals


  useEffect(() => {
    ///// Calls utility function to get data from backend
    async function getData() {
      try {
        setLoading(true)
        const data : any = await getTransactions()
        setTransactions(data)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }
    getData()
  }, [])

  ///// Checks if loading is true
  if (loading) {
    return <div></div>
  }

  //// Checks if the transactions state is falsey
  if (!transactions) {
    return <div></div>
  }
  
  recurringBillTotals = getRecurringBillTotals(transactions)

  return (
    <section className='recurring_bills-container'>
      <div className='recurring_bills-title-container'>
        <h2 className='recurring_bills-title'>Recurring Bills</h2>
        <NavLink to={"/recurring-bills"}  className='see-details-link-container see-details-link'>
          <p className="see-details-link">See Details </p>
          <img alt='an arrow pointing to the right indicating that more can be seen upon clicking' className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </NavLink>
      </div>

      <div className='recurring_bills-content-container'>
        <div className='recurring_bills-total-container green-left-border'>
          <p className='recurring_bills-total-title'>Paid Bills</p>
          <p className='recurring_bills-total'>{currencyFormatCents(-recurringBillTotals.paidBillsAmount)}</p>
        </div>

        <div className='recurring_bills-total-container yellow-left-border'>
          <p className='recurring_bills-total-title'>Total Upcoming</p>
          <p className='recurring_bills-total'>{currencyFormatCents(-recurringBillTotals.totalUpcomingAmount)}</p>
        </div>

        <div className='recurring_bills-total-container cyan-left-border'>
          <p className='recurring_bills-total-title'>Due Soon</p>
          <p className='recurring_bills-total'>{currencyFormatCents(-recurringBillTotals.dueSoonAmount)}</p>
        </div>
      </div>
    </section>
  )
}
