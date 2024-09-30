import { addBalanceData, addBudgetData, addPotData, addTransactionData } from '../../utils/clientCalls'
import "./AddDataModal.css"

export default function AddDataModal(props: { setAddOwnDataChosen: (arg0: boolean) => void }) {

  async function handleAddStarterDataClick() {
    // await addBalanceData()
    // await addPotData()
    // addTransactionData()
    // await addBudgetData()
    addTransactionData()
  }

  function handleAddOwnDataClick() {
    props.setAddOwnDataChosen(true)
  }

  return (
    <>
        <div className='add_data_modal-page-cover'></div>
        <aside className='add_data_modal-container'>
            <h3 className='add_data_modal-title'>Want to add some initial data?</h3>
            <p className='add_data_modal-desc'>
                This project was created to be a portfolio piece, so while it is fully functional with 
                secure data for every user, we also give you the option to add a starting set of data, 
                so you are able to see how the app works when real data would be used. New data can be added
                and this old data can be removed as you please. 
            </p>
            <div className='add_data_modal-btn-container'>
                <button onClick={handleAddStarterDataClick} className='add_data_modal-btn green'>Add Starter Data</button>
                <button onClick={handleAddOwnDataClick} className='add_data_modal-btn red'> I Will Add My Own Data</button>
            </div>
        </aside>
    </>
    
  )
}
