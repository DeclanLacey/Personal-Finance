import { Route, Routes, useLocation } from 'react-router'
import SignIn from './pages/signIn/SignIn'
import Overview from "./pages/overview/Overview"
import Budgets from './pages/budgets/Budgets'
import Pots from './pages/pots/Pots'
import RecurringBills from './pages/recurringBills/RecurringBills'
import Transactions from './pages/transactions/Transactions'
import outputs from "../amplify_outputs.json"
import { Amplify } from 'aws-amplify'
import Nav from './components/nav/Nav'
import { useState } from 'react'
import DesktopNav from './components/desktopNav/DesktopNav'

Amplify.configure(outputs)

function App() {
  const [desktopNavOpen, setDesktopNavOpen] = useState<Boolean>(false)
  const location = useLocation()

  return (
    <div className={`app ${desktopNavOpen ? 'padding-right' : ""}`}>
      {/* You will need to remove the nav component from here, it is showing on the sign in screen, instead put it on each page individually */}
      {location.pathname === "/" ? <></> : <Nav></Nav>}
      {location.pathname === "/" ? <></> : <DesktopNav desktopNavOpen={desktopNavOpen} setDesktopNavOpen={setDesktopNavOpen}></DesktopNav>}

      <button className={`show-menu-btn ${desktopNavOpen ? 'hide-nav' : ''}`} onClick={() => setDesktopNavOpen(true)}> 
        <p className='show-menu-text text-3'>Show Menu</p>
        <img className='show-menu-img' src='./assets/icon-minimize-menu.svg' alt='arrow pointing right'/>
      </button>
      <Routes>
        <Route path="/" element={<SignIn />}/>
        <Route path="/overview" element={<Overview />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/pots" element={<Pots />} />
        <Route path="/recurring-bills" element={<RecurringBills />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  )
}

export default App
