import { useAuthenticator } from '@aws-amplify/ui-react'
import { type Schema } from "@/../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import React from 'react'

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

  const fetchData = async () => {
    const { data, errors } = await client.models.Todo.list();
    if (errors) {
      console.log(errors);
    } else {
      console.log(data);
    }
  };

  fetchData()

  return (
    <div>
      
    </div>
  )
}
