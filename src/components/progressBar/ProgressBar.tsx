import { calculatePercentOfTotal } from "../../utils/utils"
import "./ProgressBar.css"

interface Props {
    budgetColor: string,
    budgetMax: number,
    budgetSpend: number
}

export default function ProgressBar({budgetColor, budgetMax, budgetSpend} : Props) {
    let percentSpent = calculatePercentOfTotal(budgetMax, budgetSpend)
    
    return (
        <div className='progress_bar-container'>
            <div className={`progress_bar-value ${budgetColor}`} style={{width: `${percentSpent}%`}}>
            </div>
        </div>
    )
}