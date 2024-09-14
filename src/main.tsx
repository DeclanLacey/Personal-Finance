import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import outputs from "../amplify_outputs.json"
import "@aws-amplify/ui-react/styles.css"
import './index.css'

Amplify.configure(outputs)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authenticator.Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Authenticator.Provider>
  </StrictMode>,
)
