import { Route, Routes } from 'react-router'
import SignIn from './pages/signIn/SignIn'
import Overview from "./pages/overview/Overview"
import Budgets from './pages/budgets/Budgets'
import Pots from './pages/pots/Pots'
import RecurringBills from './pages/recurringBills/RecurringBills'
import Transactions from './pages/transactions/Transactions'
import { useState } from 'react'
import { addTransactionData } from './utils/clientCalls'

function App() {
  const [addOwnDataChosen, setAddOwnDataChosen] = useState(false)

  return (
    <div className='app'>
      {/* <button onClick={() => addTransactionData()}>Add transaction data</button> */}
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
