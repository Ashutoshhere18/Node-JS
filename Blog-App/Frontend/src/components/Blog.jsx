
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../app.css";

export default function Blog(){
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:4050/signout",{withCredentials:true});
    alert(res.data.message);
    navigate("/signin");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{width:"520px",textAlign:"center"}}>

        <div className="brand">
          Dev<span>Sphere</span> Blog
        </div>

        <div className="subtitle" style={{marginBottom:"20px"}}>
          Your SaaS blogging dashboard is ready 🚀
        </div>

        <h1 style={{fontSize:"28px",marginBottom:"10px"}}>
          Welcome, Developer 👋
        </h1>

        <p style={{fontSize:"14px",color:"#94a3b8",marginBottom:"25px"}}>
          You have successfully logged in using secure OTP authentication.  
          This is your temporary dashboard. Soon you will be able to create, upload and manage blogs here.
        </p>

        <button onClick={handleLogout} style={{maxWidth:"200px"}}>
          Logout
        </button>

      </div>
    </div>
  );
}
