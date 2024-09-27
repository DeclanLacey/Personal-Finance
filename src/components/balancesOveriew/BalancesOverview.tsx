import { useEffect, useState } from 'react'
import { currencyFormatCents } from '../../utils/utils'
import "./BalancesOverview.css"
import { getBalances } from '../../utils/clientCalls'

export default function BalancesOverview() {
  const [balanceData, setBalanceData] = useState<any[] | undefined>() 

  useEffect(() => {
    async function getData() {
      const data = await getBalances()
      setBalanceData(data)
    }

    getData()
  }, [])

  /////// You need to write logic to calculate the current balances based off of the data
  
  return (
    <section className='balances_overview-container'>
      <div className='balances_overview-amount-container grey-background'>
        <h2 className='balances_overview-type'>Current Balance</h2>
        {
          balanceData ?
            <p className='balances_overview-amount'>{currencyFormatCents(balanceData[0]?.current)}</p>
          :
          <p className='balances_overview-amount'>{currencyFormatCents(0)}</p>
        }
      </div>

      <div className='balances_overview-amount-container'>
        <h2 className='balances_overview-type'>Income</h2>
        {
          balanceData ?
          <p className='balances_overview-amount'>{currencyFormatCents(balanceData[0]?.income)}</p>
          :
          <p className='balances_overview-amount'>{currencyFormatCents(0)}</p>
        }
      </div>

      <div className='balances_overview-amount-container'>
        <h2 className='balances_overview-type'>Expenses</h2>
        {
          balanceData ?
          <p className='balances_overview-amount'>{currencyFormatCents(balanceData[0]?.expenses)}</p>
          :
          <p className='balances_overview-amount'>{currencyFormatCents(0)}</p>
        }
      </div>
    </section>
  )
}
