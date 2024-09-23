import { useCallback, useState } from 'react'
import { PieChart } from 'chartist';
import data from "../../data/data.json"
import 'chartist/dist/index.css';
import { NavLink } from 'react-router-dom';

export default function BudgetsOverview() {

  const [budgets, setBudgets] = useState(data.budgets)

  function setPieChartColorsAndValues() {
    const budgetPieChartData = budgets.map((budget) => {
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

  return (
    <div>
      <div>
        <h1>Budgets</h1>
        <div className='see-details-link-container'>
          <NavLink className="see-details-link" to="/budgets"> See Details</NavLink>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </div>
      </div>
        <div id="chart" ref={chart}></div>
    </div>
  )
}
