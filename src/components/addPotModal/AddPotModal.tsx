import { useEffect, useState } from "react"
import { checkIfStringIsNumber, renderColorOptions } from "../../utils/utils"
import { addPot, getThemes } from "../../utils/clientCalls"
import { NewPot, Theme } from "../../types/types"

interface Props {
  setShowAddPotModal: Function
}

export default function AddPotModal({setShowAddPotModal} : Props) {
  const [themes, setThemes] = useState<Theme[]>()
  const [loading, setLoading] = useState<Boolean>()
  const [name, setName] = useState<string>("")
  const [target, setTarget] = useState<number>(0)
  const [theme, setTheme] = useState<string>("")

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

    const newTransaction: NewPot = {
        name: name,
        target: target,
        theme: theme,
        total: 0
    }

    if (!newTransaction.target || newTransaction.target < 1) {
        window.alert("Please enter a valid pot target. The minimum for a pot is $1.")
    }else {
        await addPot(newTransaction)
        setShowAddPotModal(false)
        location.reload()
    }
  }

  function handleTargetChange(e: React.FormEvent<HTMLInputElement>) {
    if (checkIfStringIsNumber(e.currentTarget.value)) {
        setTarget(Number(e.currentTarget.value))
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
                  <input required name="name" maxLength={30} placeholder="e.g. Rainy Days" className="rounded-input" value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => {setName(e.currentTarget.value)}}/>
              </div>

              <div className="add-edit-modal-amount-container">
                  <label className="add-edit-modal-input-label">Target</label>
                  <span className="dollar-sign">$</span>
                  <input required name="target" maxLength={9} placeholder="e.g 2000" value={target} className="rounded-input amount-input" onChange={handleTargetChange}/>
              </div>

              <div className="add-edit-modal-input-container">
                  <label className="add-edit-modal-input-label">Color Tag</label>
                  <select required name="theme" className="rounded-select-input" value={theme} onChange={(e: React.FormEvent<HTMLSelectElement>) => {setTheme(e.currentTarget.value)}}>
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
