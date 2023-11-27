import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUpForm from '../src/pages/SignUp';
import FrontPage from '../src/pages/FrontPage'
import Test from '../src/pages/test'

import './App.css'

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/SignUp" element= {<SignUpForm />} />
    <Route path="/FrontPage" element= {<FrontPage />} />
    <Route path="/Test" element={<Test/>} />

  </Routes>

  </BrowserRouter>
  )
}
