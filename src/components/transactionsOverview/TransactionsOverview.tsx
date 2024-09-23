import React, { useState } from 'react'
import data from "../../data/data.json"
import { NavLink } from 'react-router-dom'
import { currencyFormatCents } from '../../utils/utils'
import currency from 'currency.js'
import "./TransactionsOverview.css"

export default function TransactionsOverview() {
  const [transactionData, setTransactionData] = useState(data.transactions)
  var transactionCustomCurrency = (value: currency.Any) => currency(value, { pattern: '+!#', negativePattern: '-!#' });

  const transactionElements = transactionData.map((transaction, index) => {

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

  function returnFirstFiveTransactionElements() {
    while (transactionElements.length > 5) {
      transactionElements.pop()
    }

    return transactionElements
  }

  return (
    <section className='transaction_overview-container'>
      <div className='transaction_overview-title-container'>
        <h2 className='transaction_overview-title'>Transactions</h2>
        <div className='see-details-link-container'>
          <NavLink className="see-details-link" to="/transactions">View All</NavLink>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </div>
      </div>

      <div className='transaction_overview-transactions-container'>
        {returnFirstFiveTransactionElements()}
      </div>
    </section>
  )
}
