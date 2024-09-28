import { useEffect, useState } from 'react'
import { PieChart } from 'chartist';
import { NavLink } from 'react-router-dom';
import { SpendPerBudget } from '../../types/types';
import { currencyFormatCents, currencyFormatNoCents } from '../../utils/utils';
import { getBudgets, getTransactions } from '../../utils/clientCalls';
import 'chartist/dist/index.css';
import "./BudgetsOverview.css"

export default function BudgetsOverview() {
  const [budgets, setBudgets]  = useState<any[]>()
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    //// Calls utility functions to get the data from the backend
    async function getData() {
      try {
        setLoading(true)
        const budgetData = await getBudgets()
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

  //// Returns an array of objects that are passed into the chart when it is created
  function setPieChartColorsAndValues() {
    if (budgets) {
      const budgetPieChartData : any = budgets.map((budget) => {
        return (
          {
            value: budget.maximum,
            className: budget.theme
          }
        )
      })

      return budgetPieChartData
    }
  }

  //// The pie chart used in the UI
  const chart = () => {
    new PieChart(
        '#chart',
        {
          series: setPieChartColorsAndValues(),
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

  ////// Calculates the total amount spent for all of the different budgets combined
  function calculateTotalBudgetSpend() {
    let totalBudgetSpend : number = 0
    let budgetSpendPerCategory = calculateSpendPerBudgetCategory()
    for (let i = 0; i < budgetSpendPerCategory.length; i++) {
      totalBudgetSpend += budgetSpendPerCategory[i].amount
    }

    return totalBudgetSpend
  }

  ////// Calculates the total amount spent for each individual category
  function calculateSpendPerBudgetCategory() {
    const budgetNames = getBudgetCategoryNames()
    const transactionsData : any = transactions
    const spendPerBudgetCategory : SpendPerBudget[] = []

    for (let i = 0; i < budgetNames.length; i++) {
      spendPerBudgetCategory.push({
        name: budgetNames[i],
        amount: 0
      })
    }
  
    for (let i = 0; i < transactionsData.length; i++) {
      if (budgetNames.includes(transactionsData[i].category)) {
        const findIndexResult = spendPerBudgetCategory.findIndex((element : SpendPerBudget) => element?.name === transactionsData[i].category)
        spendPerBudgetCategory[findIndexResult].amount += transactionsData[i].amount / -1
      }
    }

    return spendPerBudgetCategory
  }

  ////// Returns an array of the current category names
  function getBudgetCategoryNames() {
    const budgetNames : string[] = []
    if (budgets)
    for (let i = 0; i < budgets.length; i++) {
      budgetNames.push(budgets[i].category)
    }
    return budgetNames
  }

  ////// Calculates the total limit of all of the budget limits combined
  function calculateTotalBudgetLimit() {
    let totalBudgetLimit : number = 0

    if (budgets)
    for (let i = 0; i < budgets.length; i++) {
      totalBudgetLimit += budgets[i].maximum
    }

    return totalBudgetLimit
  }

  //// Returns the budgets summary elements
  function renderBudgetSummaries() {
    const spendPerBudgetCategory = calculateSpendPerBudgetCategory()
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
          <p className='budgets_overview-total-spend'>{currencyFormatNoCents(calculateTotalBudgetSpend())}</p>
          <p className='budgets_overview-spend-limit'>{`of ${currencyFormatNoCents(calculateTotalBudgetLimit())} limit`}</p>
        </div>
        <div className='budgets_overview-chart' id="chart" ref={chart}></div>
      </div>

      <div className='budgets_overview-categories-container'>
        {renderBudgetSummaries() }
      </div>
    </section>
  )
}
