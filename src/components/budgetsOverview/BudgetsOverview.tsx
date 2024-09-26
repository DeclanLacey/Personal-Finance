import { useCallback, useState } from 'react'
import { PieChart } from 'chartist';
import data from "../../data/data.json"
import 'chartist/dist/index.css';
import { NavLink } from 'react-router-dom';
import { PieChartSeries, SpendPerBudget, Transaction } from '../../types/types';
import { currencyFormatCents, currencyFormatNoCents } from '../../utils/utils';
import "./BudgetsOverview.css"

export default function BudgetsOverview() {
  const [budgets]  = useState(data.budgets)

  function setPieChartColorsAndValues() {
    const budgetPieChartData : PieChartSeries[] = budgets.map((budget) => {
      return (
        {
          value: budget.maximum,
          className: budget.theme
        }
      )
    })

    return budgetPieChartData
  }

  const chart = useCallback(() => {
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
  }, []);

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

  return (
    <section className='budgets_overview-container'>
      <div className='budgets_overview-title-container'>
        <h2 className='budgets_overview-title'>Budgets</h2>
        <div className='see-details-link-container'>
          <NavLink className="see-details-link" to="/budgets"> See Details</NavLink>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </div>
      </div>
      <div className='budgets_overview-chart-container'>
        <div className='budgets_overview-spend-container'>
          <p className='budgets_overview-total-spend'>{currencyFormatNoCents(calculateTotalBudgetSpend())}</p>
          <p className='budgets_overview-spend-limit'>{`of ${currencyFormatNoCents(calculateTotalBudgetLimit())} limit`}</p>
        </div>
        <div className='budgets_overview-chart' id="chart" ref={chart}></div>
      </div>

      <div>
        <div className='budgets_overview-categories-container'>
          {renderBudgetSummaries()}
        </div>
      </div>
    </section>
  )
}
