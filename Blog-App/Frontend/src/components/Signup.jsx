import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post("http://localhost:4050/signup",{email,password});
    alert(res.data.message);

    if(res.data.message.includes("success")){
      navigate("/signin");
    }
  };

  return (
    <>
      <h2>Signup</h2>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </>
  );
}
