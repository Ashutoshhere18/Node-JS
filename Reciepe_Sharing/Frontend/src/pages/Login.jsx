import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      alert("Login Successful");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      <h3 className="mb-3">Login</h3>

      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;