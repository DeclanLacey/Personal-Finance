import { useCallback } from 'react'
import { PieChart } from 'chartist';
import 'chartist/dist/index.css';

export default function BudgetsOverview() {

    const chart = useCallback(() => {
        new PieChart(
            '#chart',
            {
              series: [
                {
                  value: 20,
                  className: "green"
                },
                {
                  value: 10,
                  className: "purple"
                },
                {
                  value: 50,
                  className: "turquoise"
                },
                {
                  value: 30,
                  className: "cyan"
                }
              ],
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
        <h1>Budgets</h1>
        <div id="chart" ref={chart}></div>
    </div>
  )
}
