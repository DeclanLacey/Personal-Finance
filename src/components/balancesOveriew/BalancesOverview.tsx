import { useState } from 'react'
import { currencyFormatCents } from '../../utils/utils'
import data from "../../data/data.json"
import "./BalancesOverview.css"

export default function BalancesOverview() {

  const [balanceData, setBalanceData] = useState(data.balance)
  
  return (
    <section className='balances_overview-container'>
      <div className='balances_overview-amount-container grey-background'>
        <h2 className='balances_overview-type'>Current Balance</h2>
        <p className='balances_overview-amount'>{currencyFormatCents(balanceData.current)}</p>
      </div>

      <div className='balances_overview-amount-container'>
        <h2 className='balances_overview-type'>Income</h2>
        <p className='balances_overview-amount'>{currencyFormatCents(balanceData.income)}</p>
      </div>

      <div className='balances_overview-amount-container'>
        <h2 className='balances_overview-type'>Expenses</h2>
        <p className='balances_overview-amount'>{currencyFormatCents(balanceData.expenses)}</p>
      </div>
    </section>
  )
}
