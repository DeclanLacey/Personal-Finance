import { useEffect, useState } from 'react'
import { Pot } from '../../types/types'
import { currencyFormatCents, currencyFormatNoCents } from '../../utils/utils'
import ThinProgressBar from '../thinProgressBar/ThinProgressBar'
import "./PotDetail.css"
import ConfirmDeleteModal from '../confirmDeleteModal/ConfirmDeleteModal'
import { deletePot } from '../../utils/clientCalls'
import EditPotModal from '../editPotModal/EditPotModal'
import AddToPotModal from '../addToPotModal/AddToPotModal'

interface Props {
    pot: Pot
}

export default function PotDetail({pot} : Props) {

    const [showEllipsesModal, setShowEllipsesModal] = useState<Boolean>(false)
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<Boolean>(false)
    const [showEditPotModal, setShowEditPotModal] = useState<Boolean>(false)
    const [showAddToPotModal, setShowAddToPotModal] = useState<Boolean>(false)
    const [showRemoveFromPotModal, setShowRemoveFromPotModal] = useState<Boolean>(false)

    function calculatePercentOfPotSaved() {
        return ((pot.total / pot.target) * 100).toFixed(2)
    }
    
    function handleEditPotClick() {
        setShowEditPotModal(true)
    }

    function handleDeletePotClick() {
        setOpenConfirmDeleteModal(true)
    }

    useEffect(() => {
        if (showEllipsesModal) {
            window.addEventListener('scroll', function() {
                setShowEllipsesModal(false)
            });
        }else {
            window.removeEventListener('scroll', function() {
            });
        }
    }, [showEllipsesModal])
    
    return (
        <section className='pot_detail'>
            <div className='pot_detail-flex-container pot_detail-upper-container'>
                <div className='pot_detail-name-container'>
                    <div className={`pot_detail-color-circle ${pot.theme}`}></div>
                    <h2 className='pot_detail-name'>{pot.name}</h2>
                </div>
                <button className='detail-ellipsis' onClick={() => {setShowEllipsesModal(prevState => !prevState)}}></button>

                {
                    showEllipsesModal &&
                    <div className='ellipsis-dropdown'>
                        <p className='ellipsis-edit border-bottom' onClick={handleEditPotClick}>Edit Pot</p>
                        <p className='ellipsis-delete' id={pot.id} onClick={handleDeletePotClick}>Delete Pot</p>
                    </div>
                }                
            </div>

            { openConfirmDeleteModal && <ConfirmDeleteModal recordId={pot.id} deleteFunction={deletePot} recordName={pot.name} recordType={'pot'} setOpenConfirmDeleteModal={setOpenConfirmDeleteModal}/> }
            { showEditPotModal && <EditPotModal currentPot={pot} setShowEditPotModal={setShowEditPotModal} />}
            { showAddToPotModal && <AddToPotModal currentPot={pot} setShowAddToPotModal={setShowAddToPotModal} />}

            <div className='pot_detail-flex-container'>
                <p className='pot_detail-saved-title'>Total Saved</p>
                <p className='pot_detail-amount-saved'>{currencyFormatCents(pot.total)}</p>
            </div>

            <ThinProgressBar potColor={pot.theme} potTarget={pot.target} potSaved={pot.total} />
            
            <div className='pot_detail-flex-container'>
                <p className='pot_detail-percent-saved'>{calculatePercentOfPotSaved()}%</p>
                <p className='pot_detail-pot-target'>Target of {currencyFormatNoCents(pot.target)}</p>
            </div>

            <div className='pot_detail-flex-container'>
                <button className='pot_detail-btn' onClick={() => setShowAddToPotModal(true)}>+ Add Money</button>
                <button className='pot_detail-btn'>Withdraw</button>
            </div>
        </section>
    )
}
