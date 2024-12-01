import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import './SignInPage.css'

export default function SignInPage() {
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

        <div className='sign_in-img-container'>
          <img className='sign_in-img' src="./assets/illustration-authentication.svg" />
          <h1 className='sign_in-img-title text-1-bold'>Keep track of your money and save for your future</h1>
          <p className='sign_in-img-subtitle text-4'>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
        </div>
    </div>
  )
}
