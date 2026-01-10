import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp,setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async () => {
    const res = await axios.post(
      "http://localhost:4050/verifyOtp",
      { email, otp },
      { withCredentials:true }
    );

    alert(res.data.message);

    if(res.data.message.includes("verified")){
      navigate("/blog");
    }
  };

  return (
    <>
      <h2>Verify OTP</h2>
      <input placeholder="Enter OTP" onChange={e=>setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
    </>
  );
}
