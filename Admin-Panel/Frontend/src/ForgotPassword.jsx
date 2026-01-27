import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { base_uri } from '../utils/global-function';

export default function ForgotPassword() {

    const[email,setEmail]=useState("");

    const handleForgotPassword=async()=>{
       try{
         const res = await axios.post(`${base_uri}/auth/forgotPassword`, {email});
         alert(res.data.message);
       }catch(err){
        alert(err.message);
       }
    }
  return (
    <div>
   <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
   <button onClick={handleForgotPassword} className='btn btn-primary'>Forgot Password</button>
    </div>
  )
}
