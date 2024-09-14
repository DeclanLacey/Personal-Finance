import { Route, Routes } from 'react-router'
import SignIn from './pages/signin/SignIn'
import Overview from "./pages/overview/Overview"
import './App.css'

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />}/>
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </div>
  )
}

export default App
