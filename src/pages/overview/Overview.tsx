import {getPots, getTransactions, getBalances, getBudgets} from "../../utils/clientCalls"
import { useAuthenticator } from '@aws-amplify/ui-react'
import { type Schema } from "@/../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { deleteUser } from "aws-amplify/auth";

import BalancesOverview from "../../components/balancesOveriew/BalancesOverview";
import BudgetsOverview from "../../components/budgetsOverview/BudgetsOverview";
import Nav from "../../components/nav/Nav";
import "./Overview.css"
import PotsOverview from "../../components/potsOverview/PotsOverview";


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
     console.log(await getTransactions())
     console.log(await getBudgets())

    const getUserProfile = async () => {
      const { data, errors } = await client.models.UserProfile.list();
      if (errors) {
        console.log(errors);
      } else {
        return data;
      }
    };

    console.log(await getUserProfile())
  }


  useEffect(() => {
    getData()
  }, [])
  



  return (
    <div className="overview-container">
      <section className="overview-content-container">
        <h1 className="overview-title">Overview</h1>
        <BalancesOverview></BalancesOverview>
        <PotsOverview></PotsOverview>
        {/* <BudgetsOverview></BudgetsOverview> */}
      </section>
      
      <Nav></Nav>
    </div>
  )
}


