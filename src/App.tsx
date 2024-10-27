import { Route, Routes, useLocation } from 'react-router'
import SignIn from './pages/signIn/SignIn'
import Overview from "./pages/overview/Overview"
import Budgets from './pages/budgets/Budgets'
import Pots from './pages/pots/Pots'
import RecurringBills from './pages/recurringBills/RecurringBills'
import Transactions from './pages/transactions/Transactions'
import { useState } from 'react'
import { addBalanceData, addBudgetData, addPotData, addTransactionData } from './utils/clientCalls'
import outputs from "../amplify_outputs.json"
import { Amplify } from 'aws-amplify'
import Nav from './components/nav/Nav'

Amplify.configure(outputs)

function App() {
  const [addOwnDataChosen, setAddOwnDataChosen] = useState(false)
  const location = useLocation()

  return (
    <div className='app'>
      {/* You will need to remove the nav component from here, it is showing on the sign in screen, instead put it on each page individually */}
      {location.pathname === "/" ? <></> : <Nav></Nav>}
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
