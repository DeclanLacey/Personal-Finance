import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { currencyFormatNoCents } from '../../utils/utils'
import "./PotsOverview.css"
import { getPots } from '../../utils/clientCalls'

export default function PotsOverview() {
  const [potsData, setPotsData] = useState<any[] | undefined>()
  let potElements : any

  useEffect(() => {
    async function getData() {
      const data = await getPots()
      setPotsData(data)
    }

    getData()
  }, [])

  if (potsData) {
    potElements = potsData.map((pot, index) => {
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
  }
  
  function returnFirstFourPotElements() {
    while (potElements.length > 4) {
      potElements.pop()
    }

    return potElements
  }

  function calculateTotalSavings(): number {
    let totalSavings = 0
    if (potsData)
    for (let i = 0; i < potsData.length; i++) {
      totalSavings += potsData[i].total
    }

    return totalSavings
  }

  return (
    <section className='pots_overview-container'>
      <div className='pots_overview-title-container'>
        <h2 className='pots_overview-title'>Pots</h2>
        <NavLink to={"/pots"} className='see-details-link-container see-details-link'>
          <p className="see-details-link">See Details </p>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </NavLink>
      </div>

      <div className='pots_overview-total-section-container'>
        <img className='pots_overview-total-icon' src='/assets/icon-pot.svg' />
        <div className='pots_overview-total-container'>
          <h3 className='pots_overview-total-title'>Total Saved</h3>
          {
            potsData ?
              <p className='pots_overview-total'>{currencyFormatNoCents(calculateTotalSavings())}</p>
            : 
              <p className='pots_overview-total'>{currencyFormatNoCents(0)}</p>
          }
        </div>
      </div>

      <div className='pots_overview-pots-container'>
        {potsData ? returnFirstFourPotElements() : <></>}
      </div>

    </section>
  )
}
