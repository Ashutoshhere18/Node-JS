import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

function Navbar() {
 const navigate = useNavigate();

const handleLogout = async () => {
  await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
  alert("Logged Out");
  navigate("/login");
};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🍲 Recipe Hub
        </Link>

        <div>
          <Link className="btn btn-light btn-sm me-2" to="/">All Recipes</Link>
          <Link className="btn btn-light btn-sm me-2" to="/my-recipes">My Recipes</Link>
          <Link className="btn btn-warning btn-sm me-2" to="/add-recipe">Add Recipe</Link>
          <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
          <Link className="btn btn-outline-light btn-sm" to="/register">Register</Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
  Logout
</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;