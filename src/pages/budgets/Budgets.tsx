import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { Budget, Transaction } from '../../types/types'
import { getBudgets, getTransactions } from '../../utils/clientCalls'
import { PieChart } from 'chartist'
import { calculateSpendPerBudgetCategory, currencyFormatCents, setPieChartColorsAndValues } from '../../utils/utils'

export default function Budgets() {
  const [budgets, setBudgets]  = useState<Budget[]>()
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    //// Calls utility functions to get the data from the backend
    async function getData() {
      try {
        setLoading(true)
        const budgetData : any = await getBudgets()
        const transactionData = await getTransactions()
        setBudgets(budgetData)
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
  if (!budgets && !transactions) {
    return <div></div>
  }
  
  //// The pie chart used in the UI
  const chart = () => {
    if (budgets)
    new PieChart(
        '#chart',
        {
          series: setPieChartColorsAndValues(budgets),
          labels: []
        },
        {
          donut: true,
          donutWidth: 40,
          startAngle: 360,
          showLabel: false,
          width: "280px",
          height: "250px"
        }
        
    );
  };

  function renderBudgetSummaries(budgets : Budget[], transactions : Transaction[]) {
    const spendPerBudgetCategory = calculateSpendPerBudgetCategory(budgets, transactions)
    const categorySummaryElements = spendPerBudgetCategory.map((budget, index) => {
    let categoryColor : string = ""

    if (budgets)
      for (let i = 0; i < budgets.length; i++) {
        if (budgets[i].category === budget.name) {
          categoryColor = budgets[i].theme
        }
    }

    return (  
      <div className='' key={index}>
        <div></div>
        <div className=''>
          <p className=''>{budget.name}</p>
          <div>
            <p className=''>{currencyFormatCents(Math.round(budget.amount))}</p>
            <p>of {currencyFormatCents(Math.round(budget.max))}</p>
          </div>
          
        </div>
      </div>
    )
  })

    return categorySummaryElements
  }

  return (
    <div>
      <Nav></Nav>
      <div>
        <h1> Budgets </h1>
        <button></button>
      </div>
      
      <section>
        <div className='budgets_overview-chart' id="chart" ref={chart}></div>
        {budgets && transactions ? renderBudgetSummaries(budgets, transactions) : <></>}
      </section>
    </div>
  )
}
