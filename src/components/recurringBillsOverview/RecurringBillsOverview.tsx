import React from 'react'
import { currencyFormatCents, getRecurringBillTotals } from '../../utils/utils'
import data from "../../data/data.json"
import { NavLink } from 'react-router-dom'
import "./RecurringBillsOverview.css"

export default function RecurringBillsOverview() {

  // console.log(getRecurringBillTotals(data.transactions).paidBills)
  // console.log(getRecurringBillTotals(data.transactions).totalUpcoming)
  // console.log(getRecurringBillTotals(data.transactions).dueSoon)

  return (
    <section className='recurring_bills-container'>
      <div className='recurring_bills-title-container'>
        <h2 className='recurring_bills-title'>Recurring Bills</h2>
        <NavLink to={"/recurring-bills"}  className='see-details-link-container see-details-link'>
          <p className="see-details-link">See Details </p>
          <img className='see-details-caret' src='/assets/icon-caret-right.svg' />
        </NavLink>
      </div>

      <div className='recurring_bills-content-container'>
        <div className='recurring_bills-total-container green-left-border'>
          <p className='recurring_bills-total-title'>Paid Bills</p>
          <p className='recurring_bills-total'>{currencyFormatCents(getRecurringBillTotals(data.transactions).paidBills / -1)}</p>
        </div>

        <div className='recurring_bills-total-container yellow-left-border'>
          <p className='recurring_bills-total-title'>Total Upcoming</p>
          <p className='recurring_bills-total'>{currencyFormatCents(getRecurringBillTotals(data.transactions).totalUpcoming / -1)}</p>
        </div>

        <div className='recurring_bills-total-container cyan-left-border'>
          <p className='recurring_bills-total-title'>Due Soon</p>
          <p className='recurring_bills-total'>{currencyFormatCents(getRecurringBillTotals(data.transactions).dueSoon / -1)}</p>
        </div>
      </div>
    </section>
  )
}
