import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { currencyFormatNoCents } from '../../utils/utils'
import { getPots } from '../../utils/clientCalls'
import "./PotsOverview.css"

export default function PotsOverview() {
  const [potsData, setPotsData] = useState<any[] | undefined>()
  const [loading, setLoading] = useState<Boolean>()

  useEffect(() => {
    ///// Calling utility functions to get data from backend
    async function getData() {
      try {
        setLoading(true)
        const data = await getPots()
        setPotsData(data)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }
    getData()
  }, [])

  ///// Checks if loading is true
  if (loading) {
    return <div></div>
  }

  ///// Checks if the potsData state is falsey
  if (!potsData) {
    return <div></div>
  }
  
  //// Returns an array of the first four pot elements
  function renderFirstFourPotElements() {
    const potElements = potsData?.map((pot, index) => {
      if (index > 3) {return}
      return (
        <div key={index} className='pots_overview-pot'>
          <div className={`pots_overview-colored-line ${pot.theme}`} ></div>
          <div className='pots_overview-pot-content-container'>
            <p className='pots_overview-pot-name'>{pot.name}</p>
            <p className='pots_overview-pot-total'>{currencyFormatNoCents(pot.total)}</p>
          </div>
        </div>
      )
    })
    return potElements
  }

  ////// Calculates the total amount saved when combining all of the pots
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
          <img alt='arrow pointing to the right to indicate more can be seen upon clicking' className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </NavLink>
      </div>

      <div className='pots_overview-total-section-container'>
        <img className='pots_overview-total-icon' alt='a jar with a lid and a money sign on it' src='/assets/icon-pot.svg' />
        <div className='pots_overview-total-container'>
          <h3 className='pots_overview-total-title'>Total Saved</h3>
          <p className='pots_overview-total'>{currencyFormatNoCents(calculateTotalSavings())}</p>
        </div>
      </div>

      <div className='pots_overview-pots-container'>
        {renderFirstFourPotElements()}
      </div>
    </section>
  )
}
