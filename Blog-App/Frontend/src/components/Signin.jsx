import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <h2>Signin</h2>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignin}>Signin</button>
    </>
  );
}
