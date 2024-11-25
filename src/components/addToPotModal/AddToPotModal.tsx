import { Pot } from "../../types/types"

interface Props {
    currentPot: Pot,
    setShowAddToPotModal: Function
}

export default function AddToPotModal({currentPot, setShowAddToPotModal} : Props) {

    function handleSubmit() {

    }

    return (
        <div>
        <div className='page-cover'></div>
                <section className='add-edit-modal'>
                    <div className="add-edit-modal-title-container">
                        <h2 className="add-edit-modal-title">Add to '{}'</h2>
                        <img className="close-modal-btn" onClick={() => setShowAddToPotModal(false)} src="./assets/icon-close-modal.svg" />
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="add-edit-modal-amount-container">
                            <label className="add-edit-modal-input-label">Target</label>
                            <span className="dollar-sign">$</span>
                            <input required name="target" maxLength={9} placeholder="e.g 50" className="rounded-input amount-input" />
                        </div>
                        <input type="submit" className="black-add-btn add-edit-modal-btn" value={"Confirm Addition"}></input>
                    </form>
                </section>
        </div>
    )
}
