import { Link, NavLink } from 'react-router-dom'
import "./Nav.css"


export default function Nav() {

  return (
    <nav className='nav-container'>
        <NavLink className='nav-link' to={"/overview"}> 
            <img className='nav-link-img' src='/assets/icon-nav-overview.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/transactions"}> 
            <img className='nav-link-img' src='/assets/icon-nav-transactions.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/budgets"}> 
            <img className='nav-link-img' src='/assets/icon-nav-budgets.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/pots"}> 
            <img className='nav-link-img' src='/assets/icon-nav-pots.svg' />
        </NavLink>

        <NavLink className='nav-link' to={"/recurring-bills"}> 
            <img className='nav-link-img' src='/assets/icon-nav-recurring-bills.svg' />
        </NavLink>
    </nav>
  )
}
