import { useEffect, useState } from 'react'
import { Budget, Transaction } from '../../types/types'
import { getBudgets, getTransactions } from '../../utils/clientCalls'
import { PieChart } from 'chartist'
import { calculateSpendPerBudgetCategory, calculateTotalBudgetLimit, calculateTotalBudgetSpend, currencyFormatCents, currencyFormatNoCents, setPieChartColorsAndValues } from '../../utils/utils'
import "./Budgets.css"
import BudgetDetail from '../../components/budgetDetail/BudgetDetail'
import AddBudgetModal from '../../components/addBudgetModal/AddBudgetModal'

export default function Budgets() {
  const [budgets, setBudgets]  = useState<Budget[]>()
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState<Boolean>(false)
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<Boolean>(false)

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
        <div className={`budgets_page-budget-summary ${index === spendPerBudgetCategory.length - 1 ? "" : "budgets_page-border-bottom "}`} key={index}>
          <div className={`budgets_page-budget-summary-color-line ${categoryColor}`}></div>
          <p className='budgets_page-budget-summary-name'>{budget.name}</p>
          <p className='budgets_page-budget-summary-spend'>{currencyFormatCents(Math.round(budget.amount))}</p>
          <p className='budgets_page-budget-summary-max'>of {currencyFormatCents(Math.round(budget.max))}</p>
        </div>
      )
    })

    return categorySummaryElements
  }

  function renderBudgetDetailComponents(budgets : Budget[], transactions : Transaction[]) {    
    const budgetDetailElements = budgets.map((budget, index) => {
      return (
        <BudgetDetail key={index} budget={budget} transactions={transactions}/>
      )
    })

    return budgetDetailElements
  }

  return (
    <div className='budgets_page-container'>
      <div className='budgets_page-title-container'>
        <h1 className='budgets_page-title'> Budgets </h1>
        <button className='black-add-btn' onClick={() => setShowAddBudgetModal(true)}>+ Add New Budget</button>
      </div>

      {showAddBudgetModal && <AddBudgetModal></AddBudgetModal>}
      
      <div className='budgets_page-content-container'>
        <section className='budgets_page-chart-overview-container'>
          <div className='budgets_page-chart-container'>
            <div className='budgets_page-total-spend-container'>
              {budgets && transactions ? <p className='budgets_page-total-spend'>{currencyFormatNoCents(Math.round(calculateTotalBudgetSpend(budgets, transactions)))}</p> : <></> }
              {budgets ? <p className='budgets_page-total-limit'>{`of ${currencyFormatNoCents(calculateTotalBudgetLimit(budgets))} limit`}</p> : <></> }
            </div>
            <div className='' id="chart" ref={chart}></div>
          </div>

          <h2 className='budgets_page-overview-title'>Spending Summary</h2>
          {budgets && transactions ? renderBudgetSummaries(budgets, transactions) : <></>}
        </section>

        <section>
          {budgets && transactions ? renderBudgetDetailComponents(budgets, transactions) : <></>}
        </section>
      </div>
    </div>
  )
}
