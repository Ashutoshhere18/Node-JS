
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";

export default function Signin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    const res = await axios.post(
      "http://localhost:4050/signin",
      {email,password},
      {withCredentials:true}
    );

    alert(res.data.message);

    if(res.data.message.includes("OTP")){
      navigate("/verify", { state: { email }});
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="brand">Dev<span>Sphere</span></div>
        <div className="subtitle">Sign in to your account</div>

        <input 
          placeholder="Enter your email"
          onChange={e=>setEmail(e.target.value)} 
        />

        <input 
          type="password"
          placeholder="Enter your password"
          onChange={e=>setPassword(e.target.value)} 
        />

        <button onClick={handleSignin}>Sign In</button>

        <div className="footer-text">
          Don’t have an account? <span onClick={()=>navigate("/")}>Sign Up</span>
        </div>

      </div>
    </div>
  );
}
