import { addBlankSeedBalance, addMadeDataChoice, addSeedBalance, addSeedBudgets, addSeedPots, addSeedTransactions } from "../../utils/clientCalls"
import "./AddSeedDataModal.css"

export default function AddSeedDataModal() {

    async function handleAddSeedData() {
        ////// You need to add some sort of loading circle here
        await addSeedBalance()
        await addSeedBudgets()
        await addSeedTransactions()
        await addSeedPots()
        await addMadeDataChoice()
        location.reload()
    }

    async function handleDontAddSeedData() {
        await addBlankSeedBalance()
        await addMadeDataChoice()
        location.reload()
    }

    return (
        <>
            <div className='page-cover'></div>
            <section className='add-edit-modal'>
                <div className="add-seed-img-header">
                    <img className='sign_in-header-logo' alt='The logo for Personal Finance in large white lettering reading simply "finance".' src='/assets/logo-large.svg' />
                </div>
                <div className="add-edit-modal-title-container add-seed-data-title-container">
                    <h2 className="add-edit-modal-title">Would you like to add seed data?</h2>
                </div>

                <p className="add-seed-data-desc text-4">
                    Because this application was built primarily as a portfolio project, you have the choice to add a set of seed data that will be populated into
                    your account to quickly display the functionality of the application. If you would prefer to add your own, you are welcome to do so as well. Thanks
                    for checking out my application!
                </p>

                <button onClick={() => {handleAddSeedData()}} className="black-add-btn seed-data-btn">Please add seed data!</button>
                <button onClick={() => {handleDontAddSeedData()}} className="black-add-btn seed-data-btn">I will add my own data!</button>
                
            </section>
        </>
    )
}
