import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { CiSearch } from "react-icons/ci";
import "./Transactions.css"
import { getCategoryNamesFromBudgets, getTransactions } from '../../utils/clientCalls';


export default function Transactions() {

  const [categoryNames, setCategoryNames] = useState<any[]>()
  const [transactions, setTransactions] = useState<any[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const categoryNameData = await getCategoryNamesFromBudgets()
        const transactionData = await getTransactions()
        setCategoryNames(categoryNameData)
        setTransactions(transactionData)
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
  if (!categoryNames && !transactions) {
    return <div></div>
  }

   function renderCategoryNameOptions() {
    const categoryNameElements = categoryNames?.map((category, index) => {
      return (
        <option key={index} value={category.toLowerCase()}>{category}</option>
      )
    })
    
    return categoryNameElements
  }


  return (
    <div className='transactions-page-container'>
      <Nav></Nav>
      <h1 className='transactions-title'>Transactions</h1>
      <section className='transactions-content-container'>
        <form className='transactions-form'>
          <div className='transactions-search-bar-container'>
            <input placeholder='Search Transaction' className='transactions-search-bar' type='text' />
            <CiSearch className='transactions-search-bar-icon' />
          </div>

          <div className='transactions-select-inputs-container'>
            <div className='transactions-sort-select-container'>
              {/* <img className='transactions-sort-icon' src="./assets/icon-sort-mobile.svg" /> */}
              <label className='transactions-select-label'>Sort by</label>
              <select className='transactions-sort-select' name='sort'>
                <option className='transactions-sort-option'>Latest</option>
                <option className='transactions-sort-option'>Oldest</option>
                <option className='transactions-sort-option'>A to Z</option>
                <option className='transactions-sort-option'>Z to A</option>
                <option className='transactions-sort-option'>Highest</option>
                <option className='transactions-sort-option'>Lowest</option>
              </select>
            </div>

            <div className='transactions-filter-select-container'>
              {/* <img className='transac' src="./assets/icon-filter-mobile.svg" /> */}
              <label className='transactions-select-label'>Category</label>
              <select className='transactions-filter-select' name="filter">
                <option className='transactions-filter-option'> All Transactions</option>
                {renderCategoryNameOptions()}
              </select>
            </div>
          </div>
          
        </form>
        <div>
          {/* The transactions will go here */}
        </div>
        <div>
          {/* the page selection thing will go here */}
        </div>
      </section>
    </div>
  )
}
