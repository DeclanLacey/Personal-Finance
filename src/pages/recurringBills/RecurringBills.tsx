import { useEffect, useState } from 'react'
import { getTransactions } from '../../utils/clientCalls'
import { calculateTotalBills, currencyFormatCents, filterTransactionsBySearch, getOrdinalSuffix, getRecurringBillTotals, sortTransactions } from '../../utils/utils'
import { Transaction } from '../../types/types'
import { CiSearch } from 'react-icons/ci'
import "./RecurringBills.css"
import { useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

export default function RecurringBills() {
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState<Boolean>(false)
  const [sortBySelection, setSortBySelection] = useState<string>("latest")
  const [currentSearch, setCurrentSearch] = useState<string>("")
  const {authStatus} = useAuthenticator((context) => [context.authStatus])
  const currentDate = new Date().toISOString().split('T')[0]
  const navigate = useNavigate()
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

  useEffect(() => {
    if (authStatus === "unauthenticated") {
        navigate("/")
    }
  }, [authStatus])

  useEffect(() => {
    
  }, [transactions])

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

      function getClassNameForText() {
        if (new Date(transaction.date).getDate() < new Date(currentDate).getDate()) {
          return ""
        }else if (new Date(transaction.date).getDate() - new Date(currentDate).getDate() <= 7 ) {
          return "red-text"
        }
      }

      function getCorrectIconForTransaction() {
        if (new Date(transaction.date).getDate() < new Date(currentDate).getDate()) {
          return <img className='recurring_bills_page-transaction-icon' alt='circle with a checkmark in it to indicate a paid bill' src='./assets/icon-bill-paid.svg'/>
        }else if (new Date(transaction.date).getDate() - new Date(currentDate).getDate() <= 7 ) {
          return <img className='recurring_bills_page-transaction-icon' alt='circle with an exclamation point in it to indicate a bill that is due soon' src='./assets/icon-bill-due.svg'/>
        }
      }
      console.log(new Date(transaction.date).getDate() < new Date(currentDate).getDate())
     
      return (
        <div className={`recurring_bills_page-bill ${index === sortedTransactions.length - 1 ? "" : "bill-border-bottom"}`} key={index}>
          <div className='recurring_bills_page-bill-name-container'>
            <img className='recurring_bills_page-bill-img' alt={`A colored icon representing a transaction under the category of ${transaction.category}`} src={`${transaction.avatar}`}/>
            <p className='recurring_bills_page-bill-name text-4-bold'>{transaction.name}</p>
          </div>
          <div className='recurring_bills_page-bill-amount-container'>
            <div className='recurring_bills-monthly-container'>
              <p className='recurring_bills_page-date text-5'>Monthly - {getOrdinalSuffix(Number(Number(transaction.date.slice(-2)) >= 10 ? transaction.date.slice(-2) : transaction.date.slice(-1)))}</p>
              {getCorrectIconForTransaction()}
            </div>
            <p className={`recurring_bills_page-bill-amount text-4-bold ${getClassNameForText()}`}>{currencyFormatCents(-transaction.amount)}</p>
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
      <h1 className='recurring_bills_page-title text-1-bold'>Recurring Bills</h1>
      <section className='recurring_bills_page-total-container'>
        <img className='recurring_bills_page-bill-icon' alt={`A black and white icon of a receipt with un-readable writing on it.`} src='./assets/icon-recurring-bills.svg' />
        <div>
          <h2 className='recurring_bills_page-total-title text-4'>Total Bills</h2>
          {transactions ? <p className='recurring_bills_page-total text-1-bold'>{currencyFormatCents(calculateTotalBills(transactions))}</p> : <></>}
        </div>
      </section>

      <section className='recurring_bills_page-summary-container'>
        <h2 className='recurring_bills_page-summary-title text-3-bold'>Summary</h2>

        <div className='recurring_bills_page-flex-container border-bottom'>
          <p className='text-5-grey'>Paid Bills</p>
          <p className='text-5-bold'>{`${recurringBillTotals.billTypeCounts.paidBillsCount} (${currencyFormatCents(-recurringBillTotals.paidBills)})`}</p>
        </div>

        <div className='recurring_bills_page-flex-container border-bottom'>
          <p className='text-5-grey'>Total Upcoming</p>
          <p className='text-5-bold'>{`${recurringBillTotals.billTypeCounts.totalUpcomingCount} (${currencyFormatCents(-recurringBillTotals.totalUpcoming)})`}</p>
        </div>

        <div className='recurring_bills_page-flex-container'>
          <p className='text-5 red-text'>Due Soon</p>
          <p className='text-5-bold red-text'>{`${recurringBillTotals.billTypeCounts.dueSoonCount} (${currencyFormatCents(-recurringBillTotals.dueSoon)})`}</p>
        </div>
      </section>

      <section className='recurring_bills_page-transaction-section'>
        <form className='recurring_bills_page-search-form'>
          <div className='recurring_bills_page-searchbar-container'>
            <input placeholder='Search Transaction' className='recurring_bills_page-searchbar rounded-input' onChange={changeSearchInput} type='text' />
            <CiSearch className='recurring_bills_page-search-icon' />
          </div>

          <div className='recurring_bills_page-sort-container'>
            <label className='text-4-grey'>Sort by</label>
            <select className='recurring_bills_page-select rounded-select-input' name='sort' onChange={changeSort}>
              <option className='recurring_bills_page-select-option' value="latest">Latest</option>
              <option className='recurring_bills_page-select-option' value="oldest">Oldest</option>
              <option className='recurring_bills_page-select-option' value="a-z">A to Z</option>
              <option className='recurring_bills_page-select-option' value="z-a">Z to A</option>
              <option className='recurring_bills_page-select-option' value="highest">Highest</option>
              <option className='recurring_bills_page-select-option' value="lowest">Lowest</option>
            </select>
          </div>
        </form>
        <div>
          {transactions ? renderRecurringBills(transactions) : <></>}
        </div>
      </section>
    </div>
  )
}
