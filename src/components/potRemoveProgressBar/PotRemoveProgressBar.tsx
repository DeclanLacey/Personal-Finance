import { calculatePercentOfTotal } from "../../utils/utils"
import "./PotRemoveProgressBar.css"

interface Props {
    potColor: string,
    potTarget: number,
    potSaved: number,
    subtractionAmount: number
}
export default function PotRemoveProgressBar({potColor, potTarget, potSaved, subtractionAmount} : Props) {
  let originalPercentSaved = calculatePercentOfTotal(potTarget, potSaved)
  
  // -.75 extra to take into account the separator width
  let maxNewPercent = originalPercentSaved
  let newPercentSaved = calculatePercentOfTotal(potTarget, subtractionAmount) > maxNewPercent ? maxNewPercent : calculatePercentOfTotal(potTarget, subtractionAmount)
  
  return (
    <div aria-hidden="true" className='pot_thin_progress_bar-container'>
        <div className={'pot_thin_progress_bar-value-old right-flat'} style={{width: `${originalPercentSaved - newPercentSaved}%`}}></div>
        <div className={`progressBar-separator ${newPercentSaved >= originalPercentSaved ? 'hide-separator' : ""}`}></div>
        <div className={`pot_thin_progress_bar-value-new ${newPercentSaved >= originalPercentSaved ? "" : "left-flat"} ${potColor}`} style={{width: `${newPercentSaved}%`, maxWidth: `${maxNewPercent}`}}></div>
    </div>
  )
}