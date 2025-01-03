import { useState } from "react"
import { Pot, UpdatedTotalPot } from "../../types/types"
import { calculatePercentOfTotal, checkIfStringIsNumber, currencyFormatCents } from "../../utils/utils"
import PotAddProgressBar from "../potAddProgressBar/PotAddProgressBar"
import {updatePotTotal } from "../../utils/clientCalls"
import "./AddToPotModal.css"

interface Props {
    currentPot: Pot,
    setShowAddToPotModal: Function
}

export default function AddToPotModal({currentPot, setShowAddToPotModal} : Props) {
    const [potAddition, setPotAddition] = useState<string>("")
    const [originalPercentSaved] = useState<number>(calculatePercentOfTotal(currentPot.target, currentPot.total))

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        const updatedPot : UpdatedTotalPot = {
            id: currentPot.id,
            total: currentPot.total + Number(potAddition)
        }

        if (!updatedPot.total || updatedPot.total < 1 ) {
            window.alert("Please enter a valid addition amount")
        }else {
            await updatePotTotal(updatedPot)
            setShowAddToPotModal(false)
            location.reload()
        }
    }

    function handlePotAdditionChange(e: React.FormEvent<HTMLInputElement>) {
        if (checkIfStringIsNumber(e.currentTarget.value)) {
            setPotAddition(e.currentTarget.value)
        }
    }
    
    return (
        <div>
            <div className='page-cover'></div>
            <section className='add-edit-modal'>
                <div className="add-edit-modal-title-container">
                    <h2 className="add-edit-modal-title">Add to '{currentPot.name}'</h2>
                    <button aria-label="Button to close the current modal" className="close-modal-btn" onClick={() => setShowAddToPotModal(false)}> <img alt="a circle with an x inside of it"  className="close-modal-btn-img" src="./assets/icon-close-modal.svg" /></button>
                </div>

                <div className="add_to_pot-title-container">
                    <h2 className="text-4-grey">New Amount</h2>
                    <p className="text-1-bold add_to_pot-amount">{currencyFormatCents(currentPot.total + Number(potAddition))}</p>
                </div>

                <div >
                    <PotAddProgressBar potColor={"green"} potTarget={currentPot.target} potSaved={currentPot.total} additionAmount={Number(potAddition)}/>
                    <div className="add_to_pot-percent-container">
                        <p className={`text-5-bold ${calculatePercentOfTotal(currentPot.target, Number(potAddition) + currentPot.total) > originalPercentSaved ?  "add_to_pot-percent-text-green"  : "add_to_pot-percent-text-grey"}` }>{calculatePercentOfTotal(currentPot.target, Number(potAddition) + currentPot.total).toFixed(2)}%</p>
                        <p className="text-5-grey">Target of {currencyFormatCents(currentPot.target)}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="add-edit-modal-amount-container">
                        <label htmlFor="addition" className="add-edit-modal-input-label">Amount to Add</label>
                        <span className="dollar-sign">$</span>
                        <input required name="addition" maxLength={6} placeholder="e.g 50" className="rounded-input amount-input" value={potAddition} onChange={handlePotAdditionChange} />
                    </div>
                    <input aria-label="button to submit the form" type="submit" className="black-add-btn add-edit-modal-btn" value={"Confirm Addition"}></input>
                </form>
            </section>
        </div>
    )
}
