import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { getPots } from '../../utils/clientCalls'
import { Pot } from '../../types/types'
import PotDetail from '../../components/potDetail/PotDetail'
import "./Pots.css"
import AddPotModal from '../../components/addPotModal/AddPotModal'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

export default function Pots() {
  const [pots, setPots] = useState<Pot[]>()
  const [loading, setLoading] = useState<Boolean>(false)
  const [showAddPotModal, setShowAddPotModal] = useState<Boolean>(false)
  const {authStatus} = useAuthenticator((context) => [context.authStatus])
  const navigate = useNavigate()

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

  useEffect(() => {
    if (authStatus === "unauthenticated") {
        navigate("/")
    }
  }, [authStatus])

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
      <header className='pots_page-header'>
        <h1 className='pots_page-title'>Pots</h1>
        <button className='black-add-btn' onClick={() => setShowAddPotModal(true)}>+ Add New Pot</button>
      </header>

      {showAddPotModal && <AddPotModal setShowAddPotModal={setShowAddPotModal}/>}

      <section>
        {pots ? renderPotDetailElements(pots) : <></>}
      </section>
    </div>
  )
}
