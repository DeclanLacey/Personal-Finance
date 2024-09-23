import { useCallback, useState } from 'react'
import { PieChart } from 'chartist';
import data from "../../data/data.json"
import 'chartist/dist/index.css';
import { NavLink } from 'react-router-dom';
import { PieChartSeries, SpendPerBudget, Transaction } from '../../types/types';
import { currencyFormatNoCents } from '../../utils/utils';

export default function BudgetsOverview() {
  const [budgets, setBudgets]  = useState(data.budgets)

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
            donutWidth: 25,
            startAngle: 290,
            showLabel: false
          }
          
      );
  }, []);

  function calculateTotalBudgetSpend() {
    let totalBudgetSpend : number = 0
    let budgetSpendPerCategory = calculateSpendPerBudgetCategory()
    for (let i = 0; i < budgetSpendPerCategory.length; i++) {
      totalBudgetSpend += budgetSpendPerCategory[i].amount
    }

    return totalBudgetSpend / -1
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

  function getCategoryMaximum(budgetName : string) {
    let maximum : number = 0
    for (let i = 0; i < data.budgets.length; i++) {
      if (data.budgets[i].category === budgetName) {
        maximum = data.budgets[i].maximum
        break
      }
    }
    return maximum
  }

  function renderBudgetSummaries() {
    const spendPerBudgetCategory = calculateSpendPerBudgetCategory()
    const categorySummaryElements = spendPerBudgetCategory.map((budget) => {
      return (  
        <div>
          <div></div>
          <div>
            <p>{budget.name}</p>

            <div>
              <p>{currencyFormatNoCents(budget.amount)}</p>
              <p>of {currencyFormatNoCents(getCategoryMaximum(budget.name))}</p>
            </div>
          </div>
        </div>
      )
    })

    return categorySummaryElements
  }

  return (
    <section>
      <div>
        <h2>Budgets</h2>
        <div className='see-details-link-container'>
          <NavLink className="see-details-link" to="/budgets"> See Details</NavLink>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </div>
      </div>
      <div>
        <div>
          <p>{currencyFormatNoCents(calculateTotalBudgetSpend())}</p>
          <p>{`of ${currencyFormatNoCents(calculateTotalBudgetLimit())} limit`}</p>
        </div>
        <div id="chart" ref={chart}></div>
      </div>

      <div>
        <h3>Spending Summary</h3>
        {renderBudgetSummaries()}
      </div>
    </section>
  )
}
