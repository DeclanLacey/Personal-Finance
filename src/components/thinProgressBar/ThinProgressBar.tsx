import { calculatePercentOfTotal } from "../../utils/utils"
import "./ThinProgressBar.css"

interface Props {
    potColor: string,
    potTarget: number,
    potSaved: number
}
export default function ThinProgressBar({potColor, potTarget, potSaved} : Props) {
  let percentSpent = calculatePercentOfTotal(potTarget, potSaved)

  return (
    <div aria-hidden="true" className='thin_progress_bar-container'>
        <div className={`thin_progress_bar-value ${potColor}`} style={{width: `${percentSpent}%`}}>
        </div>
    </div>
  )
}
