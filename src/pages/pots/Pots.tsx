import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { getPots } from '../../utils/clientCalls'
import { Pot } from '../../types/types'
import PotDetail from '../../components/potDetail/PotDetail'
import "./Pots.css"

export default function Pots() {
  const [pots, setPots] = useState<Pot[]>()
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
   //// Calls utility functions to get the data from the backend
    async function getData() {
      try {
        setLoading(true)
        const potsData : any = await getPots()
        setPots(potsData)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }
    getData()
  }, [])

  /// Checks if the data is currently loading
  if (loading) {
    return <div></div>
  }

  //// Checks if the budgets or transactions are falsey values
  if (!pots) {
    return <div></div>
  }


  function renderPotDetailElements(potData: Pot[]) {
    const potElements = potData.map((pot, index) => {
      return (
        <PotDetail key={index} pot={pot} />
      )
    })

    return potElements
  }


  return (
    <div className='pots_page-container'>
      <header>
        <h1>Pots</h1>
        <button>+ Add New Pot</button>
      </header>

      <section>
        {pots ? renderPotDetailElements(pots) : <></>}
      </section>
      <Nav></Nav>
    </div>
  )
}
