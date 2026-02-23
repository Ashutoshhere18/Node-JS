import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      });

      alert("Registered Successfully");
      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      <h3 className="mb-3">Register</h3>

      <form onSubmit={handleRegister}>
        <input type="text" className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input type="email" className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;