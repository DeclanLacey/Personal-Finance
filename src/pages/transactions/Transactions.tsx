import React from 'react'
import Nav from '../../components/nav/Nav'
import { CiSearch } from "react-icons/ci";
import "./Transactions.css"


export default function Transactions() {
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
                <option className='transactions-sort-option'>All Transactions</option>
                <option className='transactions-sort-option'>All Transactions</option>
              </select>
            </div>

            <div className='transactions-filter-select-container'>
              {/* <img className='transac' src="./assets/icon-filter-mobile.svg" /> */}
              <label className='transactions-select-label'>Category</label>
              <select className='transactions-filter-select' name="filter">
                <option className='transactions-filter-option'> An Option</option>
                <option className='transactions-filter-option'> An Option</option>
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
