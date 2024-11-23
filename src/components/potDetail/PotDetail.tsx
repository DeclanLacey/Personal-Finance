import { Pot } from '../../types/types'
import { currencyFormatCents, currencyFormatNoCents } from '../../utils/utils'
import ThinProgressBar from '../thinProgressBar/ThinProgressBar'
import "./PotDetail.css"

interface Props {
    pot: Pot
}

export default function PotDetail({pot} : Props) {

    function calculatePercentOfPotSaved() {
        return ((pot.total / pot.target) * 100).toFixed(2)
    }   
    
    return (
        <section className='pot_detail'>
            <div className='pot_detail-flex-container pot_detail-upper-container'>
                <div className='pot_detail-name-container'>
                    <div className={`pot_detail-color-circle ${pot.theme}`}></div>
                    <h2 className='pot_detail-name'>{pot.name}</h2>
                </div>
                <button className='detail-ellipsis'></button>
            </div>

            <div className='pot_detail-flex-container'>
                <p className='pot_detail-saved-title'>Total Saved</p>
                <p className='pot_detail-amount-saved'>{currencyFormatCents(pot.total)}</p>
            </div>

            <ThinProgressBar potColor={pot.theme} potTarget={pot.target} potSaved={pot.total} />
            
            <div className='pot_detail-flex-container'>
                <p className='pot_detail-percent-saved'>{calculatePercentOfPotSaved()}%</p>
                <p className='pot_detail-pot-target'>Target of {currencyFormatNoCents(pot.target)}</p>
            </div>

            <div className='pot_detail-flex-container'>
                <button className='pot_detail-btn'>+ Add Money</button>
                <button className='pot_detail-btn'>Withdraw</button>
            </div>
        </section>
    )
}
