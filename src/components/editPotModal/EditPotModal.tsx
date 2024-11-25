import { useEffect, useState } from "react"
import "./EditPotModal.css"
import { Pot, Theme, UpdatedPot } from "../../types/types"
import { getThemes, updatePot } from "../../utils/clientCalls"
import { checkIfStringIsNumber, renderColorOptions } from "../../utils/utils"

interface Props {
    currentPot: Pot,
    setShowEditPotModal: Function
}

export default function EditPotModal({currentPot, setShowEditPotModal} : Props) {
    const [themes, setThemes] = useState<Theme[]>()
    const [loading, setLoading] = useState<Boolean>()
    const [target, setTarget] = useState<string>(currentPot.target.toString())
    const [theme, setTheme] = useState<string>(currentPot.theme)
    const [potName, setPotName] = useState<string>(currentPot.name)

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const themeData = await getThemes()
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
        const updatedPot : UpdatedPot = {
            id: currentPot.id,
            name: potName,
            target: Number(target),
            theme: theme
        }

        if (!updatedPot.target) {
            window.alert("Please enter a valid transaction amount")
        }else {
            await updatePot(updatedPot)
            setShowEditPotModal(false)
            location.reload()
        }
    } 

    function handleTargetChange(e: React.FormEvent<HTMLInputElement>) {
        if (checkIfStringIsNumber(e.currentTarget.value)) {
            setTarget(e.currentTarget.value)
        }
    }

    return (
        <>
            <div className='page-cover'></div>
            <section className='add-edit-modal'>
                <div className="add-edit-modal-title-container">
                    <h2 className="add-edit-modal-title">Edit Pot</h2>
                    <button aria-label="Button to close the current modal" className="close-modal-btn" onClick={() => setShowEditPotModal(false)}> <img alt="a circle with an x inside of it"  className="close-modal-btn-img" src="./assets/icon-close-modal.svg" /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="add-edit-modal-input-container">
                        <label htmlFor="name" className="add-edit-modal-input-label">Pot Name</label>
                        <input required name="name" maxLength={30} value={potName} onChange={(e: React.FormEvent<HTMLInputElement>) => {setPotName(e.currentTarget.value)}} placeholder="e.g. Rainy Days" className="rounded-input" />
                    </div>

                    <div className="add-edit-modal-amount-container">
                        <label htmlFor="target" className="add-edit-modal-input-label">Target</label>
                        <span className="dollar-sign">$</span>
                        <input required name="target" maxLength={9} value={target} onChange={handleTargetChange} placeholder="e.g 2000" className="rounded-input amount-input" />
                    </div>

                    <div className="add-edit-modal-input-container">
                        <label htmlFor="theme" className="add-edit-modal-input-label">Color Tag</label>
                        <select required name="theme" className="rounded-select-input" value={theme} onChange={(e: React.FormEvent<HTMLSelectElement>) => {setTheme(e.currentTarget.value)}}>
                            <option value="">-- Select Color</option>
                            {renderColorOptions(themes)}
                        </select>
                    </div>

                    <input aria-label="a button that submits the current form when clicked" type="submit" className="black-add-btn add-edit-modal-btn" value={"Save Changes"}></input>
                </form>
            </section>
        </>
    )
}
