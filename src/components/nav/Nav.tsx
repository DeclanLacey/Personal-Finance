import { NavLink } from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
  return (
    <nav className='nav-container'>
        <NavLink className='nav-link' to={"/overview"}> 
            <img alt='representing the navigation element that can be clicked to go to the overview page' className='nav-link-img' src='/assets/icon-nav-overview.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/transactions"}> 
            <img alt='representing the navigation element that can be clicked to go to the transactions page' className='nav-link-img' src='/assets/icon-nav-transactions.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/budgets"}> 
            <img alt='representing the navigation element that can be clicked to go to the budgets page' className='nav-link-img' src='/assets/icon-nav-budgets.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/pots"}> 
            <img alt='representing the navigation element that can be clicked to go to the pots page' className='nav-link-img' src='/assets/icon-nav-pots.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/recurring-bills"}> 
            <img alt='representing the navigation element that can be clicked to go to the recurring bills page' className='nav-link-img' src='/assets/icon-nav-recurring-bills.svg' />
        </NavLink>
    </nav>
  )
}