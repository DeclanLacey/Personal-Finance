import React, { useEffect, useState } from 'react'
import data from "../../data/data.json"
import { NavLink } from 'react-router-dom'
import currency from 'currency.js'
import "./TransactionsOverview.css"
import { getTransactions } from '../../utils/clientCalls'

export default function TransactionsOverview() {
  const [transactionData, setTransactionData] = useState<any[] | undefined>()
  let transactionCustomCurrency = (value: currency.Any) => currency(value, { pattern: '+!#', negativePattern: '-!#' });
  let transactionElements : any

  useEffect(() => {
    async function getData() {
      const data = await getTransactions()
      ///// For some reason not all of the transactions are getting added when the add data button is clicked, this may be because the sandbox is not running
      setTransactionData(data)
    }

    getData()
  }, [])

  function createTransactionElements() {
    transactionElements = transactionData?.map((transaction, index) => {

      function formatDate(dateString: string) {
        let date = new Date(dateString)
        let dateArray = date.toDateString().split(' ')
        let dateFormat = dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3]
  
        return dateFormat
      }
  
      function determineTransactionAmountClass() {
        if (transaction.amount > 0) {
          return 'transaction_overview-transaction-amount positive'
        }else {
          return 'transaction_overview-transaction-amount'
        }
      }
  
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
  }
  
  function returnFirstFiveTransactionElements() {
    while (transactionElements.length > 5) {
      transactionElements.pop()
    }

    return transactionElements
  }

  if (transactionData) {
    createTransactionElements()
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
        {transactionData ? returnFirstFiveTransactionElements() : <></>}
      </div>
    </section>
  )
}
