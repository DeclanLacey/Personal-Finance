import "./ProgressBar.css"

interface Props {
    budgetColor: string,
    budgetMax: number,
    budgetSpend: number
}

export default function ProgressBar({budgetColor, budgetMax, budgetSpend} : Props) {

    function calculatePercentOfBudgetSpent() {
        let percentSpent = (budgetSpend / budgetMax) * 100

        if (percentSpent > 100) {
            return 100
        }else {
            return percentSpent
        }
    }

    let percentSpent = calculatePercentOfBudgetSpent()

    return (
        <div className='progress_bar-container'>
            <div className={`progress_bar-value ${budgetColor}`} style={{width: `${percentSpent}%`}}>
            </div>
        </div>
    )
}
