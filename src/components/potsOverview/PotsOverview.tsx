import { NavLink } from 'react-router-dom'
import data from "../../data/data.json"
import { useState } from 'react'
import { currencyFormatNoCents } from '../../utils/utils'
import "./PotsOverview.css"

export default function PotsOverview() {
  const [potsData, setPotsData] = useState(data.pots)

  const potElements = potsData.map((pot, index) => {
    return (
      <div key={index} className='pots_overview-pot'>
        <div className='pots_overview-colored-line' style={{backgroundColor: `${pot.theme}`}}></div>
        <div className='pots_overview-pot-content-container'>
          <p className='pots_overview-pot-name'>{pot.name}</p>
          <p className='pots_overview-pot-total'>{currencyFormatNoCents(pot.total)}</p>
        </div>
      </div>
    )
  })

  function returnFirstFourPotElements() {
    while (potElements.length > 4) {
      potElements.pop()
    }

    return potElements
  }

  function calculateTotalSavings(): number {
    let totalSavings = 0
    for (let i = 0; i < potsData.length; i++) {
      totalSavings += potsData[i].total
    }

    return totalSavings
  }

  return (
    <section className='pots_overview-container'>
      <div className='pots_overview-title-container'>
        <h2 className='pots_overview-title'>Pots</h2>
        <div className='see-details-link-container'>
          <NavLink className="see-details-link" to={"/pots"}>See Details </NavLink>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </div>
      </div>

      <div className='pots_overview-total-section-container'>
        <img className='pots_overview-total-icon' src='/assets/icon-pot.svg' />
        <div className='pots_overview-total-container'>
          <h3 className='pots_overview-total-title'>Total Saved</h3>
          <p className='pots_overview-total'>{currencyFormatNoCents(calculateTotalSavings())}</p>
        </div>
      </div>

      <div className='pots_overview-pots-container'>
        {returnFirstFourPotElements()}
      </div>

    </section>
  )
}
