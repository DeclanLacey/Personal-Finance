import { useState } from "react"
import { Pot, UpdatedTotalPot } from "../../types/types"
import { calculatePercentOfTotal, checkIfStringIsNumber, currencyFormatCents } from "../../utils/utils"
import { updatePotTotal } from "../../utils/clientCalls"
import PotRemoveProgressBar from "../potRemoveProgressBar/PotRemoveProgressBar"

interface Props {
    currentPot: Pot,
    setShowRemoveFromPotModal: Function
}

export default function RemoveFromPotModal({currentPot, setShowRemoveFromPotModal} : Props) {
    const [potSubtraction, setPotSubtraction] = useState<string>("")
    const [originalPercentSaved] = useState<number>(calculatePercentOfTotal(currentPot.target, currentPot.total))

    function calculateNewPercentSaved() {
        let totalPercentSaved = calculatePercentOfTotal(currentPot.target, currentPot.total - Number(potSubtraction))
        if (totalPercentSaved < 0) {
            return 0
        }else {
            return totalPercentSaved
        }
    }

    function handlePotSubtractionChange(e: React.FormEvent<HTMLInputElement>) {
        if (checkIfStringIsNumber(e.currentTarget.value)) {
            setPotSubtraction(e.currentTarget.value)
        }
    }

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        const updatedPot : UpdatedTotalPot = {
            id: currentPot.id,
            total: currentPot.total - Number(potSubtraction) >= 0 ? currentPot.total - Number(potSubtraction) : 0
        }

        
        if (updatedPot.total < 0 || currentPot.total === 0 || Number(potSubtraction) > currentPot.total) {
            window.alert("Please enter a valid subtraction amount")
        }else {
            await updatePotTotal(updatedPot)
            setShowRemoveFromPotModal(false)
            location.reload()
        }
    }

    return (
        <div>
            <div>
                <div className='page-cover'></div>
                <section className='add-edit-modal'>
                    <div className="add-edit-modal-title-container">
                        <h2 className="add-edit-modal-title">Withdraw from '{currentPot.name}'</h2>
                        <button aria-label="Button to close the current modal" className="close-modal-btn" onClick={() => setShowRemoveFromPotModal(false)}> <img alt="a circle with an x inside of it"  className="close-modal-btn-img" src="./assets/icon-close-modal.svg" /></button>
                    </div>

                    <div className="add_to_pot-title-container">
                        <h2 className="text-4-grey">New Amount</h2>
                        <p className="text-1-bold add_to_pot-amount">{currencyFormatCents(currentPot.total - Number(potSubtraction) < 0 ? 0 : currentPot.total - Number(potSubtraction))}</p>
                    </div>

                    <div >
                        <PotRemoveProgressBar potColor={"red"} potTarget={currentPot.target} potSaved={currentPot.total} subtractionAmount={Number(potSubtraction)}/>
                        <div className="add_to_pot-percent-container">
                            <p className={`text-5-bold ${calculateNewPercentSaved() > originalPercentSaved ?  "add_to_pot-percent-text-green"  : "add_to_pot-percent-text-grey"}` }>{calculateNewPercentSaved().toFixed(2)}%</p>
                            <p className="text-5-grey">Target of {currencyFormatCents(currentPot.target)}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="add-edit-modal-amount-container">
                            <label htmlFor="target" className="add-edit-modal-input-label">Amount to Withdraw</label>
                            <span className="dollar-sign">$</span>
                            <input required name="target" maxLength={6} placeholder="e.g 50" className="rounded-input amount-input" value={potSubtraction} onChange={handlePotSubtractionChange} />
                        </div>
                        <input aria-label="a button that will submit the current form" type="submit" className="black-add-btn add-edit-modal-btn" value={"Confirm Withdraw"}></input>
                    </form>
                </section>
            </div>
        </div>
    )
}
