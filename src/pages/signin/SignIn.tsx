import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import './SignIn.css'

export default function SignIn() {
  const {authStatus} = useAuthenticator((context) => [context.authStatus])
  const navigate = useNavigate()

  useEffect(() => {
    if (authStatus === "authenticated") {
        navigate("/overview")
    }
  }, [authStatus])

  /// Customized fields for authenticator
  const formFields = {
    signUp: {
      name: {
        order: 1
      }
    }
  }

  return (
    <div className='sign_in-container'>
        <header className='sign_in-header'>
          <img className='sign_in-header-logo' alt='The logo for Personal Finance in large white lettering reading simply "finance".' src='/assets/logo-large.svg' />
        </header>
        <div className='sign_in-authenticator-container'>
          <Authenticator formFields={formFields} ></Authenticator>
        </div>
    </div>
  )
}
