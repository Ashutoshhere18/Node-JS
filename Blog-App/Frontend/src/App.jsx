import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
 
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[otp,setOtp]=useState("");
  const handleSignUpButton=async()=>{
      const res=await axios.post("http://localhost:4050/signup",{email,password})
      alert(res.data.message)
    }

  const handleSignInButton=async()=>{
    try{
    const res= await axios.post("http://localhost:4050/signin",{email,password})
      alert(res.data.message);
    }catch(err){
       alert("Sign In Failed!");
    }
  }

   const handleVerify=async()=>{
    try{
    const res= await axios.post("http://localhost:4050/verifyOtp",{email,otp},{withCredentials:true})
      alert(res.data.message);
    }catch(err){
       alert("Sign In Failed!");
    }
  }

   const handleSignOut=async()=>{
    try{
    const res= await axios.get("http://localhost:4050/signout",{ withCredentials: true})
      alert(res.data.message);
    }catch(err){
       alert("Sign Out Failed!");
    }
  }
    return (
    
    <>
    <div>
      <input type="email" value={email} placeholder="Enter Email:" onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" value={password} placeholder="Enter Password:" onChange={(e)=>setPassword(e.target.value)}/>
       <input type="text" value={otp} placeholder="Enter Otp:" onChange={(e)=>setOtp(e.target.value)}/>
      <button onClick={handleSignUpButton}>Sign UP</button>
      <button onClick={handleSignInButton}>Sign IN</button>
      <button onClick={handleVerify}>Verify Otp</button>
       <button onClick={handleSignOut}>Sign Out</button>
       
    </div>
    </>
  )
}

export default App
