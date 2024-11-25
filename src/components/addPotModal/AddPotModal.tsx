import { useEffect, useState } from "react"
import { renderColorOptions } from "../../utils/utils"
import { addPot, getThemes } from "../../utils/clientCalls"
import { NewPot, Theme } from "../../types/types"

interface Props {
  setShowAddPotModal: Function
}

export default function AddPotModal({setShowAddPotModal} : Props) {
  const [themes, setThemes] = useState<Theme[]>()
  const [loading, setLoading] = useState<Boolean>()

  useEffect(() => {
      async function getData() {
          try {
              setLoading(true)
              const themeData : any = await getThemes()
              setThemes(themeData)
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
  if (!themes) {
      return <div></div>
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const target = event.target as typeof event.target & {
        name: {value: string},
        target: {value: number},
        theme: {value: string}
    }

    const newTransaction: NewPot = {
        name: target.name.value,
        target: target.target.value,
        theme: target.theme.value,
        total: 0
    }

    if (!newTransaction.target) {
        window.alert("Please enter a valid transaction amount")
    }else {
        await addPot(newTransaction)
        setShowAddPotModal(false)
        location.reload()
    }
  }

  return (
    <>
      <div className='page-cover'></div>
      <section className='add-edit-modal'>
          <div className="add-edit-modal-title-container">
              <h2 className="add-edit-modal-title">Add New Pot</h2>
              <img className="close-modal-btn" onClick={() => setShowAddPotModal(false)} src="./assets/icon-close-modal.svg" />
          </div>

          <form onSubmit={handleSubmit}>
              <div className="add-edit-modal-input-container">
                  <label className="add-edit-modal-input-label">Pot Name</label>
                  <input required name="name" maxLength={30} placeholder="e.g. Rainy Days" className="rounded-input" />
              </div>

              <div className="add-edit-modal-amount-container">
                  <label className="add-edit-modal-input-label">Target</label>
                  <span className="dollar-sign">$</span>
                  <input required name="target" maxLength={9} placeholder="e.g 2000" className="rounded-input amount-input" />
              </div>

              <div className="add-edit-modal-input-container">
                  <label className="add-edit-modal-input-label">Color Tag</label>
                  <select required name="theme" className="rounded-select-input">
                      <option value="">-- Select Color</option>
                      {renderColorOptions(themes)}
                  </select>
              </div>

              <input type="submit" className="black-add-btn add-edit-modal-btn" value={"Add Pot"}></input>
          </form>
      </section>
    </>

  )
}
