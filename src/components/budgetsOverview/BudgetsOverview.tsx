import { useCallback, useEffect, useState } from 'react'
import { FlatSeries, PieChart } from 'chartist';
import data from "../../data/data.json"
import 'chartist/dist/index.css';
import { NavLink } from 'react-router-dom';
import { SpendPerBudget, Transaction } from '../../types/types';
import { currencyFormatCents, currencyFormatNoCents } from '../../utils/utils';
import "./BudgetsOverview.css"
import { getBudgets } from '../../utils/clientCalls';

export default function BudgetsOverview() {
  const [budgets, setBudgets]  = useState<any[]>()

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

  const chart = useCallback(() => {
    if (budgets)
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
  }, [budgets]);

  function renderChart() {
    console.log("ran")
    return <div className='budgets_overview-chart' id="chart" ref={chart}></div>
  }

  function calculateTotalBudgetSpend() {
    let totalBudgetSpend : number = 0
    let budgetSpendPerCategory = calculateSpendPerBudgetCategory()
    for (let i = 0; i < budgetSpendPerCategory.length; i++) {
      totalBudgetSpend += budgetSpendPerCategory[i].amount
    }

    return totalBudgetSpend
  }

  function calculateSpendPerBudgetCategory() {
    const budgetNames = getBudgetCategoryNames()
    const transactions : Transaction[] = data.transactions
    const spendPerBudgetCategory : SpendPerBudget[] = []

    for (let i = 0; i < transactions.length; i++) {
      if (budgetNames.includes(transactions[i].category)) {
        const findIndexResult = spendPerBudgetCategory.findIndex((element : SpendPerBudget) => element?.name === transactions[i].category)
        if (findIndexResult !== -1) {
          spendPerBudgetCategory[findIndexResult].amount += transactions[i].amount / -1
        }else {
          spendPerBudgetCategory.push({
            name: transactions[i].category,
            amount: transactions[i].amount / -1
          })
        }
      }
    }
  
    return spendPerBudgetCategory
  }

  function getBudgetCategoryNames() {
    const budgetNames : string[] = []
    for (let i = 0; i < data.budgets.length; i++) {
      budgetNames.push(data.budgets[i].category)
    }

    return budgetNames
  }

  function calculateTotalBudgetLimit() {
    let totalBudgetLimit : number = 0

    if (budgets)
    for (let i = 0; i < budgets.length; i++) {
      totalBudgetLimit += budgets[i].maximum
    }

    return totalBudgetLimit
  }

  // function getCategoryMaximum(budgetName : string) {
  //   let maximum : number = 0
  //   for (let i = 0; i < data.budgets.length; i++) {
  //     if (data.budgets[i].category === budgetName) {
  //       maximum = data.budgets[i].maximum
  //       break
  //     }
  //   }
  //   return maximum
  // }

  function renderBudgetSummaries() {
    const spendPerBudgetCategory = calculateSpendPerBudgetCategory()
    const categorySummaryElements = spendPerBudgetCategory.map((budget, index) => {
      let categoryColor : string = ""

      for (let i = 0; i < data.budgets.length; i++) {
        if (data.budgets[i].category === budget.name) {
          categoryColor = data.budgets[i].theme
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

  useEffect(() => {
    async function getData() {
      const data = await getBudgets()
      setBudgets(data)
    }

    getData()
  }, [])

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
          {
            budgets ?
              <>
              <p className='budgets_overview-total-spend'>{currencyFormatNoCents(calculateTotalBudgetSpend())}</p>
              <p className='budgets_overview-spend-limit'>{`of ${currencyFormatNoCents(calculateTotalBudgetLimit())} limit`}</p>
              </> 
            :
              <></>
          }
        
        </div>
        {
          budgets ?
            renderChart()
          : 
            <></>
        }
      </div>

      <div>
        <div className='budgets_overview-categories-container'>
          {renderBudgetSummaries()}
        </div>
      </div>
    </section>
  )
}
