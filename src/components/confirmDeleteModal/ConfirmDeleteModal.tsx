import React from 'react'
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
          <img className="close-modal-btn" onClick={() => setOpenConfirmDeleteModal(false)} src="./assets/icon-close-modal.svg" />
        </div>

        <p className='confirm_delete_modal-desc'>Are you sure you want to delete this {recordType}? This action cannot be reversed, and all the data inside it will be removed forever.</p>
        
        <button className='red-delete-btn' onClick={handleConfirmDeleteClick}>Yes, Confirm Deletion</button>
        <button className='cancel-delete-btn' onClick={handleCancelDeleteClick}>No, I want to go back</button>
      </div>
      
    </>
  )
}
