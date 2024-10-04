import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { CiSearch } from "react-icons/ci";
import "./Transactions.css"
import { getCategoryNamesFromBudgets, getTransactions } from '../../utils/clientCalls';
import { currencyFormatCents, formatDate } from '../../utils/utils';


export default function Transactions() {
  const [categoryNames, setCategoryNames] = useState<any[]>()
  const [transactions, setTransactions] = useState<any[]>()
  const [sortBySelection, setSortBySelection] = useState("latest")
  const [filterBySelection, setFilterBySelection] = useState("")
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

  function renderTransactions() {
    let selectedTransactions = transactions 

    function filterTransactions() {
      if (filterBySelection) {
        selectedTransactions = selectedTransactions?.filter((transaction) => (transaction.category).toLowerCase() === filterBySelection)
      }
    }

    function sortTransactions() {
      switch (sortBySelection) {
        case "latest":
          selectedTransactions = selectedTransactions?.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
          break;
        case "oldest":
          selectedTransactions = selectedTransactions?.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
          break;
        case "a-z":
          selectedTransactions = selectedTransactions?.sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          })
          break;
        case "z-a":
          selectedTransactions = selectedTransactions?.sort((a, b) => {
            if (a.name > b.name) return -1
            if (a.name < b.name) return 1
            return 0
          })
          break;
        case "highest":
          selectedTransactions = selectedTransactions?.sort((a, b) => {
            if (a.amount < b.amount) return -1
            if (a.amount > b.amount) return 1
            return 0
          })
          break;
        case "lowest":
          selectedTransactions = selectedTransactions?.sort((a, b) => {
            if (a.amount > b.amount) return -1
            if (a.amount < b.amount) return 1
            return 0
          })
          break;
      }
    } 

    sortTransactions()
    filterTransactions()

    const transactionElements = selectedTransactions?.map((transaction, index) => {
      return (
        <div key={index}>
          <img src={`${transaction.avatar}`}/>

          <div>
            <p>{transaction.name}</p>
            <p>{currencyFormatCents(transaction.amount)}</p>
          </div>

          <div>
            <p>{transaction.category}</p>
            <p>{formatDate(transaction.date)}</p>
          </div>
        </div>
      )
    })

    return transactionElements
  }

  function changeFilter(event: { target: { value: React.SetStateAction<string>; }; }) {
    setFilterBySelection(event.target.value)
  }

  function changeSort(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSortBySelection(event.target.value)
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
              <label className='transactions-select-label'>Sort by</label>
              <select className='transactions-sort-select' name='sort' onChange={changeSort}>
                <option className='transactions-sort-option' value="latest">Latest</option>
                <option className='transactions-sort-option' value="oldest">Oldest</option>
                <option className='transactions-sort-option' value="a-z">A to Z</option>
                <option className='transactions-sort-option' value="z-a">Z to A</option>
                <option className='transactions-sort-option' value="highest">Highest</option>
                <option className='transactions-sort-option' value="lowest">Lowest</option>
              </select>
            </div>

            <div className='transactions-filter-select-container'>
              <label className='transactions-select-label'>Category</label>
              <select className='transactions-filter-select' name="filter" onChange={changeFilter}>
                <option className='transactions-filter-option' value=""> All Transactions</option>
                {renderCategoryNameOptions()}
              </select>
            </div>
          </div>
          
        </form>
        <div>
          {renderTransactions() }
        </div>
        <div>
          {/* the page selection thing will go here */}
        </div>
      </section>
    </div>
  )
}
