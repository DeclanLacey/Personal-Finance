import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getTransactions } from '../../utils/clientCalls'
import currency from 'currency.js'
import "./TransactionsOverview.css"
import { formatDate } from '../../utils/utils'

export default function TransactionsOverview() {
  let transactionCustomCurrency = (value: currency.Any) => currency(value, { pattern: '+!#', negativePattern: '-!#' });
  const [transactionData, setTransactionData] = useState<any[] | undefined>()
  const [loading, setLoading] = useState<Boolean>()
  ///// For some reason not all of the transactions are getting added when the add data button is clicked, this may be because the sandbox is not running

  useEffect(() => {
    //// Calls the utility function to get data from the backend
    async function getData() {
      try {
        setLoading(true)
        const data = await getTransactions()
        setTransactionData(data)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }
    getData()
  }, [])

  //// Checks if loading is true
  if (loading) {
    return <div></div>
  }

  ///// Checks if the transactionData state is falsey
  if (!transactionData) {
    return <div></div>
  }

  //// The transactions should be listed in order by newest first, currently they are not
  //// Renders the first five transaction elements
  function renderFirstFiveTransactionElements() {
    const transactionElements = transactionData?.map((transaction, index) => {
      if (index > 4) {return}

      ///// Decides what color the transaction amount will be based on if the number is negative or positive
      function determineTransactionAmountClass() {
        if (transaction.amount > 0) {
          return 'transaction_overview-transaction-amount positive'
        }else {
          return 'transaction_overview-transaction-amount'
        }
      }

      ///// Determines if the transaction is the last one show, if so does not give it the class to have a bottom border
      function determineTransactionClass() {
        if (index === 4) {
          return 'transaction_overview-transaction'
        }else {
          return 'transaction_overview-transaction border-bottom'
        }
      }
    
      return (
        <div key={index} className={determineTransactionClass()}>
          <div className='transaction_overview-transaction-name-container'>
            <img className='transaction_overview-transaction-img' src={`${transaction.avatar}`} />
            <p className='transaction_overview-transaction-name'>{transaction.name}</p>
          </div>
          
          <div className='transaction_overview-transaction-amount-container'>
            <p className={determineTransactionAmountClass()}>{transactionCustomCurrency(transaction.amount).format()}</p>
            <p className='transaction_overview-transaction-date'>{formatDate(transaction.date)}</p>
          </div>
        </div>
      )
    })

    return transactionElements
  }

  return (
    <section className='transaction_overview-container'>
      <div className='transaction_overview-title-container'>
        <h2 className='transaction_overview-title'>Transactions</h2>
        <NavLink to="/transactions" className='see-details-link-container see-details-link'>
          <p className="see-details-link">View All</p>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </NavLink>
      </div>

      <div className='transaction_overview-transactions-container'>
        {renderFirstFiveTransactionElements()}
      </div>
    </section>
  )
}
