import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import { CiSearch } from "react-icons/ci";
import "./Transactions.css"
import { getCategoryNamesFromBudgets, getTransactions } from '../../utils/clientCalls';
import { currencyFormatCents, formatDate } from '../../utils/utils';


export default function Transactions() {

  const [categoryNames, setCategoryNames] = useState<any[]>()
  const [transactions, setTransactions] = useState<any[]>()
  const [filteredAndSortedTransactions, setFilteredAndSortedTransactions] = useState<any[]>()

  const [sortBySelection, setSortBySelection] = useState("")
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
        setFilteredAndSortedTransactions(transactionData)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    sortTransactions()
    filterTransactions()
  }, [filterBySelection, sortBySelection])

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

  function sortTransactions() {
    let sortedTransactions

    switch (sortBySelection) {
      case "latest":
        sortedTransactions = filteredAndSortedTransactions?.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        setFilteredAndSortedTransactions(sortedTransactions)
        break;
      case "oldest":
        sortedTransactions = filteredAndSortedTransactions?.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
        setFilteredAndSortedTransactions(sortedTransactions)
        break;
      case "a-z":

        break;
      case "z-a":

        break;
      case "highest":

        break;
      case "lowest":

        break;
    }
  }

  function filterTransactions() {
    if (filterBySelection) {
      const filteredTransactions = transactions?.filter((transaction) => (transaction.category).toLowerCase() === filterBySelection)
      setFilteredAndSortedTransactions(filteredTransactions)
    }else {
      setFilteredAndSortedTransactions(transactions)
    }
  }

  function changeFilter(event: { target: { value: React.SetStateAction<string>; }; }) {
    setFilterBySelection(event.target.value)
  }

  function changeSort(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSortBySelection(event.target.value)
  }

  function renderTransactions() {
    const transactionElements = filteredAndSortedTransactions?.map((transaction, index) => {
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
          {/* The transactions will go here */}
          {renderTransactions()}
        </div>
        <div>
          {/* the page selection thing will go here */}
        </div>
      </section>
    </div>
  )
}
