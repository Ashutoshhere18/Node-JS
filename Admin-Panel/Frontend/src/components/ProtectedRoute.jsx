import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_uri} from "../../utils/global-function.js";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`${base_uri}/auth/checkLoginStatus`, {
      withCredentials: true
    })
    .then(() => {
      setIsLoggedIn(true);
      setLoading(false);
    })
    .catch(() => {
      setIsLoggedIn(false);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Checking login...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
