import { useEffect, useState } from 'react'
import { Budget, NewBudget, Theme } from '../../types/types'
import { getThemes, updateBudget } from '../../utils/clientCalls'
import { checkIfBudgetExists } from '../../utils/utils'

interface Props {
  budgets: Budget[],
  currentBudget: Budget,
  setShowEditBudgetModal: Function,
  renderCategoryNameOptions: Function
}

export default function EditDataModal({budgets, currentBudget, setShowEditBudgetModal, renderCategoryNameOptions} : Props) {
  
    const [themes, setThemes] = useState<Theme[]>()
    const [loading, setLoading] = useState<Boolean>()

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const themeData : any = await getThemes()
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
      const target = event.target as typeof event.target & {
          category: {value: string},
          maximum: {value: number},
          theme: {value: string}
      }

      if (checkIfBudgetExists(budgets, target.category.value) && target.category.value !== currentBudget.category) {
          window.alert("There is already a budget for the chosen category")
      }else {

          const updatedBudget : Budget = {
            category: target.category.value,
            createdAt: currentBudget.createdAt,
            id: currentBudget.id,
            maximum: target.maximum.value,
            profileOwner: currentBudget.profileOwner,
            theme: target.theme.value,
            updatedAt: ""
          }
  
          if (!updatedBudget.maximum) {
              window.alert("Please enter a valid transaction amount")
          }else {
              await updateBudget(updatedBudget)
              setShowEditBudgetModal(false)
              location.reload()
          }
      }
  }

  return (
    <div>
        
    </div>
  )
}
