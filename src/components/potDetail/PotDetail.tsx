import { Pot } from '../../types/types'
import { currencyFormatCents, currencyFormatNoCents } from '../../utils/utils'

interface Props {
    pot: Pot
}

export default function PotDetail({pot} : Props) {

    function calculatePercentOfPotSaved() {
        return ((pot.total / pot.target) * 100).toFixed(2)
    }   

    return (
        <section>
        <div>
            <div></div>
            <h2>{pot.name}</h2>
            <button className='detail-ellipsis'></button>
        </div>

        <div>
            <p>Total Saved</p>
            <p>{currencyFormatCents(pot.total)}</p>
        </div>

        {/* progress bar will go here */}

        <div>
            <p>{calculatePercentOfPotSaved()}%</p>
            <p>Target of {currencyFormatNoCents(pot.target)}</p>
        </div>

        <div>
            <button>+ Add Money</button>
            <button>Withdraw</button>
        </div>
        </section>
    )
}
