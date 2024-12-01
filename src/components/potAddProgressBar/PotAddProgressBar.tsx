import { calculatePercentOfTotal } from "../../utils/utils"
import "./PotAddProgressBar.css"

interface Props {
    potColor: string,
    potTarget: number,
    potSaved: number,
    additionAmount: number
}
export default function PotAddProgressBar({potColor, potTarget, potSaved, additionAmount} : Props) {
  let originalPercentSaved = calculatePercentOfTotal(potTarget, potSaved)
  
  // -.75 extra to take into account the separator width
  let maxNewPercent = 100 - originalPercentSaved - .75
  let newPercentSaved = calculatePercentOfTotal(potTarget, additionAmount) > maxNewPercent ? maxNewPercent : calculatePercentOfTotal(potTarget, additionAmount)
  
  return (
    <div aria-hidden="true" className='pot_thin_progress_bar-container'>
        <div className={originalPercentSaved < 100 ? 'pot_thin_progress_bar-value-old right-flat' : 'pot_thin_progress_bar-value-old'} style={{width: `${originalPercentSaved}%`}}></div>
        <div className="progressBar-separator"></div>
        <div className={`pot_thin_progress_bar-value-new left-flat ${potColor}`} style={{width: `${newPercentSaved}%`, maxWidth: `${maxNewPercent}`}}></div>
    </div>
  )
}