import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blog(){
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:4050/signout",{withCredentials:true});
    alert(res.data.message);
    navigate("/signin");
  };

  return (
    <>
      <h1>Welcome to Blog Page 🔥</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
