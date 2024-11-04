import "./AddTransactionModal.css"

interface Props {
    setShowTransactionModal: Function
}

export default function AddTransactionModal({setShowTransactionModal}: Props) {
  return (
    <div>
        <div onClick={() => setShowTransactionModal(false)} className='page-cover'></div>
        <div className='add_transaction'>
            <div>
                <h2>Add New Transaction</h2>
                <p>x button</p>
            </div>

            <form>
                <div>
                    <label></label>
                    <select>

                    </select>
                </div>

                <div>
                    <label></label>
                    <input />
                </div>

                <div>
                    <label></label>
                    <select>

                    </select>
                </div>
                
                
            </form>
        </div>
    </div>
  )
}
