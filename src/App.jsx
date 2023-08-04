import React from 'react'
import Login from './Login'
import SignUp from './SignupPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element = {<Login />}/>
        <Route path= '/signup' element = {<SignUp />}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
