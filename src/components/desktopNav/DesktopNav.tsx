import { NavLink } from 'react-router-dom'
import "./DesktopNav.css"

interface Props {
    desktopNavOpen: Boolean,
    setDesktopNavOpen: Function
}

export default function DesktopNav({desktopNavOpen, setDesktopNavOpen} : Props) {
  return (
    <nav className={`desktop-nav-container ${!desktopNavOpen ? 'hide-nav' : ''}`}>
        <img className='nav-logo' alt='The logo for Personal Finance in large white lettering reading simply "finance".' src='/assets/logo-large.svg' />
        <NavLink className='nav-link' to={"/overview"}> 
            <img alt='representing the navigation element that can be clicked to go to the overview page' className='nav-link-img' src='/assets/icon-nav-overview.svg' />
            <p className='nav-text text-5-bold-grey'>Overview</p>
        </NavLink>

        <NavLink className='nav-link' to={"/transactions"}> 
            <img alt='representing the navigation element that can be clicked to go to the transactions page' className='nav-link-img' src='/assets/icon-nav-transactions.svg' />
            <p className='nav-text text-5-bold-grey'>Transactions</p>
        </NavLink>

        <NavLink className='nav-link' to={"/budgets"}> 
            <img alt='representing the navigation element that can be clicked to go to the budgets page' className='nav-link-img' src='/assets/icon-nav-budgets.svg' />
            <p className='nav-text text-5-bold-grey'>Budgets</p>
        </NavLink>

        <NavLink className='nav-link' to={"/pots"}> 
            <img alt='representing the navigation element that can be clicked to go to the pots page' className='nav-link-img' src='/assets/icon-nav-pots.svg' />
            <p className='nav-text text-5-bold-grey'>Pots</p>
        </NavLink>

        <NavLink className='nav-link' to={"/recurring-bills"}> 
            <img alt='representing the navigation element that can be clicked to go to the recurring bills page' className='nav-link-img' src='/assets/icon-nav-recurring-bills.svg' />
            <p className='nav-text text-5-bold-grey'>Recurring Bills</p>
        </NavLink>

        <button className='minimize-menu-btn' onClick={() => setDesktopNavOpen(false)}> 
            <img className='close-nav-icon' src='./assets/icon-minimize-menu.svg' alt='arrow pointing left'/>
            <p className='text-3 close-nav-text'>Minimize Menu</p>
        </button>
    </nav>
  )
}