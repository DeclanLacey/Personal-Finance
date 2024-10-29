import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { getTransactions } from '../../utils/clientCalls'
import { calculateTotalBills, currencyFormatCents, filterTransactionsBySearch, getOrdinalSuffix, getRecurringBillTotals, sortTransactions } from '../../utils/utils'
import "./RecurringBills.css"
import { Transaction } from '../../types/types'
import { CiSearch } from 'react-icons/ci'

export default function RecurringBills() {
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState<Boolean>(false)
  const [sortBySelection, setSortBySelection] = useState<string>("latest")
  const [currentSearch, setCurrentSearch] = useState<string>("")
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

  function renderRecurringBills(recurringTransactions: Transaction[]) {
    const sortedTransactions = sortBySelection === "latest" || sortBySelection === "oldest" 
      ? 
      filterTransactionsBySearch(currentSearch, sortTransactionsByDay(sortBySelection, recurringTransactions)) 
      : 
      filterTransactionsBySearch(currentSearch, sortTransactions(sortBySelection, recurringTransactions))

    const currentBills : string[] = []

    const recurringBillElements = sortedTransactions.map((transaction, index) => {
      if (transaction.recurring === false) return
      if (currentBills.includes(transaction.name)) return
      currentBills.push(transaction.name)
      return (
        <div key={index}>
          <div>
            <img className='recurring_bills-bill-img' src={`${transaction.avatar}`}/>
            <p>{transaction.name}</p>
          </div>

          <div>
            <p>Monthly - {getOrdinalSuffix(Number(Number(transaction.date.slice(-2)) >= 10 ? transaction.date.slice(-2) : transaction.date.slice(-1)))}</p>
          </div>
        </div>
      )
    })


    return recurringBillElements
  }

  function changeSort(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSortBySelection((event.target.value).toString())
  }

  function changeSearchInput(event: { target: { value: React.SetStateAction<string>; }; }) {
    setCurrentSearch((event.target.value).toString())
  }

  function sortTransactionsByDay(selection: string, selectedTransactions: Transaction[]) {
    if (selection === "oldest") {
      selectedTransactions = selectedTransactions.sort((a, b) => Number(b.date.slice(-2)) - Number(a.date.slice(-2)));
    }else if (selection === "latest") {
      selectedTransactions = selectedTransactions.sort((a, b) => Number(a.date.slice(-2)) - Number(b.date.slice(-2)));
    }

    return selectedTransactions
  }
  
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

      <section>
        <form>
          <div className=''>
            <input placeholder='Search Transaction' className='' onChange={changeSearchInput} type='text' />
            <CiSearch className='' />
          </div>

          <div className=''>
            <div className=''>
              <label className=''>Sort by</label>
              <select className='' name='sort' onChange={changeSort}>
                <option className='' value="latest">Latest</option>
                <option className='' value="oldest">Oldest</option>
                <option className='' value="a-z">A to Z</option>
                <option className='' value="z-a">Z to A</option>
                <option className='' value="highest">Highest</option>
                <option className='' value="lowest">Lowest</option>
              </select>
            </div>
          </div>
          
        </form>
        <div>
          {transactions ? renderRecurringBills(transactions) : <></>}
        </div>
      </section>
    </div>
  )
}
