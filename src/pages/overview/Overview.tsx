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
      <h1 className="overview-title">Overview</h1>
      <BalancesOverview></BalancesOverview>
      <PotsOverview></PotsOverview>
      <TransactionsOverview></TransactionsOverview>
      <BudgetsOverview></BudgetsOverview>
      <RecurringBillsOverview></RecurringBillsOverview>
    </div>
  )
}


