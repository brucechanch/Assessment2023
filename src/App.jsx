import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUpForm from '../src/pages/SignUp';
import FrontPage from '../src/pages/FrontPage'
import './App.css'

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/SignUp" element= {<SignUpForm />} />
    <Route path="/FrontPage" element= {<FrontPage />} />
  </Routes>
  </BrowserRouter>
  )
}
