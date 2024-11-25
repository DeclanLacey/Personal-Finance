import "./ConfirmDeleteModal.css"

interface Props {
  recordId: string,
  deleteFunction: Function,
  recordName: string,
  recordType: string,
  setOpenConfirmDeleteModal: Function
}

export default function ConfirmDeleteModal({recordId, deleteFunction, recordName, recordType, setOpenConfirmDeleteModal}: Props) {

  async function handleConfirmDeleteClick() {
    await deleteFunction(recordId)
    setOpenConfirmDeleteModal(false)
    location.reload()
  }

  function handleCancelDeleteClick() {
    setOpenConfirmDeleteModal(false)
  }
  
  return (
    <>
      <div className='page-cover'></div>
      <div className='confirm_delete_modal'>
        <div className='confirm_delete_modal-title-container'>
          <h2 className='confirm_delete_modal-title'>Delete '{recordName}'?</h2>
          <button aria-label="Button to close the current modal" className="close-modal-btn" onClick={() => setOpenConfirmDeleteModal(false)}> <img alt="a circle with an x inside of it" className="close-modal-btn-img" src="./assets/icon-close-modal.svg" /></button>
        </div>
        <p className='confirm_delete_modal-desc'>Are you sure you want to delete this {recordType}? This action cannot be reversed, and all the data inside it will be removed forever.</p>
        <button className='red-delete-btn' onClick={handleConfirmDeleteClick}>Yes, Confirm Deletion</button>
        <button className='cancel-delete-btn' onClick={handleCancelDeleteClick}>No, I want to go back</button>
      </div>
      
    </>
  )
}
