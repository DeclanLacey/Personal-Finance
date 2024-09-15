import {getPots, getTransactions, getBalances, getBudgets} from "../../utils/clientCalls"
import { useAuthenticator } from '@aws-amplify/ui-react'
import { type Schema } from "@/../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

import BalancesOverview from "../../components/balancesOveriew/BalancesOverview";
import BudgetsOverview from "../../components/budgetsOverview/BudgetsOverview";
import Nav from "../../components/nav/Nav";
import "./Overview.css"


const client = generateClient<Schema>({
  authMode: "userPool",
});


export default function Overview() {

  const {authStatus} = useAuthenticator((context) => [context.authStatus])
  const navigate = useNavigate()

  useEffect(() => {
    if (authStatus === "unauthenticated") {
        navigate("/")
    }
  }, [authStatus])

  

  //// Calls all of the utility functions that connect to the backend
  // const getData = async () => {
  //    console.log(await getBalances())
  //    console.log(await getPots())
  //    console.log(await getTransactions())
  //    console.log(await getBudgets())
  // }

  // getData()
  

  // useCallback(() => {
  //   new PieChart('.ct-chart', {
  //     series: [20, 10, 30, 40]
  //   }, {
  //     donut: true,
  //     donutWidth: 60,
  //     startAngle: 270,
  //     showLabel: true
  //   });
  // }, [])

  // const chart = new PieChart(
  //   '#chart',
    // {
    //   series: [20, 10, 30, 40]
    // },
    // {
    //   donut: true,
    //   donutWidth: 60,
    //   startAngle: 270,
    //   showLabel: true
    // }
  // );


  return (
    <div className="overview-container">
      <section className="overview-content-container">
        <h1 className="overview-title">Overview</h1>
        <BalancesOverview></BalancesOverview>
        {/* <BudgetsOverview></BudgetsOverview> */}
      </section>
      
      <Nav></Nav>
    </div>
  )
}


