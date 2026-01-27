import { useState } from 'react'
import {Routes,Route} from 'react-router'
// import './App.css'
import Signin from './Signin'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
// import VerifyOtp from 'VerifyOtp'


function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='/verify-otp' element={<VerifyOtp/>}/> */}
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App
