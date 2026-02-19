import { useState } from 'react'
import {Routes,Route} from 'react-router'
// import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import ChangeForgotPassword from './components/ChangeForgotPassword'
import VerifyOtp from './components/Verifyotp'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './components/ProtectedRoute'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>

        //Protected Routes
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/forgotPassword' element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>}/>
        <Route path='/ChangeForgotPassword' element={<ProtectedRoute><ChangeForgotPassword/></ProtectedRoute>}/>
        <Route path='/ProfilePage' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path='/HomePage' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path='/AboutPage' element={<ProtectedRoute><AboutPage/></ProtectedRoute>}/>
        <Route path='/Add-employee' element={<ProtectedRoute><AddEmployee/></ProtectedRoute>}/>
        <Route path='/edit-emp' element={<ProtectedRoute><EditEmployee/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
