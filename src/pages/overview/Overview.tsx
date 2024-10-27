import {getPots, getTransactions, getBalances, getBudgets, addBudgetData} from "../../utils/clientCalls"
import { useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { deleteUser } from "aws-amplify/auth";

import BalancesOverview from "../../components/balancesOveriew/BalancesOverview";
import BudgetsOverview from "../../components/budgetsOverview/BudgetsOverview";
import Nav from "../../components/nav/Nav";
import "./Overview.css"
import PotsOverview from "../../components/potsOverview/PotsOverview";
import TransactionsOverview from "../../components/transactionsOverview/TransactionsOverview";
import RecurringBillsOverview from "../../components/recurringBillsOverview/RecurringBillsOverview";

export default function Overview() {

  const {authStatus} = useAuthenticator((context) => [context.authStatus])
  const navigate = useNavigate()

  useEffect(() => {
    if (authStatus === "unauthenticated") {
        navigate("/")
    }
  }, [authStatus])


  // async function handleDeleteUser() {
  //   try {
  //     await deleteUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // handleDeleteUser()
  

  //// Calls all of the utility functions that connect to the backend
  const getData = async () => {
     console.log(await getBalances())
     console.log(await getPots())
     console.log(await getBudgets())
     console.log(await getTransactions())
  }


  // useEffect(() => {
  //   getData()
  // }, [])
  

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


