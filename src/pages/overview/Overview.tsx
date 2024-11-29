import { useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import BalancesOverview from '../../components/balancesOverview/BalancesOverview';
import BudgetsOverview from "../../components/budgetsOverview/BudgetsOverview";
import PotsOverview from "../../components/potsOverview/PotsOverview";
import TransactionsOverview from "../../components/transactionsOverview/TransactionsOverview";
import RecurringBillsOverview from "../../components/recurringBillsOverview/RecurringBillsOverview";
import "./Overview.css"

export default function Overview() {

  const {authStatus} = useAuthenticator((context) => [context.authStatus])
  const navigate = useNavigate()

  //// You might need to add this to every page
  useEffect(() => {
    if (authStatus === "unauthenticated") {
        navigate("/")
    }
  }, [authStatus])
  
  return (
    <div className="overview-container">
      <h1 className="overview-title text-1-bold">Overview</h1>
      <div className='balances-overview-container'>
        <BalancesOverview></BalancesOverview>
      </div>

      <div className='pots-overview-container'>
        <PotsOverview></PotsOverview>
      </div>

      <div className='transactions-overview-container'>
        <TransactionsOverview></TransactionsOverview>
      </div>

      <div className='budgets-overview-container'>
        <BudgetsOverview></BudgetsOverview>
      </div>

      <div className='recurring-bills-overview-container'>
        <RecurringBillsOverview></RecurringBillsOverview>
      </div>
    </div>
  )
}


