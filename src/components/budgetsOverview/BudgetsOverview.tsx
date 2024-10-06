import { useEffect, useState } from 'react'
import { PieChart } from 'chartist';
import { NavLink } from 'react-router-dom';
import { Budget, Transaction } from '../../types/types';
import { calculateSpendPerBudgetCategory, calculateTotalBudgetLimit, calculateTotalBudgetSpend, currencyFormatCents, currencyFormatNoCents, getBudgetCategoryNames, setPieChartColorsAndValues } from '../../utils/utils';
import { getBudgets, getTransactions } from '../../utils/clientCalls';
import 'chartist/dist/index.css';
import "./BudgetsOverview.css"

export default function BudgetsOverview() {
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

  //// Returns the budgets summary elements
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
        <div className='budgets_overview-category' key={index}>
          <div className={`budgets_overview-category-color-line ${categoryColor}`} ></div>
          <div className='budgets_overview-category-content-container'>
            <p className='budgets_overview-category-name'>{budget.name}</p>
            <p className='budgets_overview-category-spend'>{currencyFormatCents(Math.round(budget.amount))}</p>
          </div>
        </div>
      )
    })

    return categorySummaryElements
  }

  return (
    <section className='budgets_overview-container'>
      <div className='budgets_overview-title-container'>
        <h2 className='budgets_overview-title'>Budgets</h2>
        <NavLink to="/budgets" className='see-details-link-container see-details-link'>
          <p className="see-details-link"> See Details</p>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </NavLink>
      </div>
      <div className='budgets_overview-chart-container'>
        <div className='budgets_overview-spend-container'>
          {budgets && transactions ? <p className='budgets_overview-total-spend'>{currencyFormatNoCents(calculateTotalBudgetSpend(budgets, transactions))}</p> : <></> }
          {budgets ? <p className='budgets_overview-spend-limit'>{`of ${currencyFormatNoCents(calculateTotalBudgetLimit(budgets))} limit`}</p> : <></> }
        </div>
        <div className='budgets_overview-chart' id="chart" ref={chart}></div>
      </div>

      <div className='budgets_overview-categories-container'>
        {budgets && transactions ? renderBudgetSummaries(budgets, transactions) : <></>}
      </div>
    </section>
  )
}
