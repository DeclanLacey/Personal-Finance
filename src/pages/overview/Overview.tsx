import {getPots, getTransactions, getBalances, getBudgets} from "../../utils/clientCalls"
import { useAuthenticator } from '@aws-amplify/ui-react'
import { type Schema } from "@/../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

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
  //   console.log(await getPots())
  //   console.log(await getTransactions())
  //   console.log(await getBalances())
  //   console.log(await getBudgets())
  // }

  // getData()

  

  return (
    <div>
      Overview Page
    </div>
  )
}


