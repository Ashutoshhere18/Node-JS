import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  // 1. Cookie check
  const isLoggedIn = document.cookie.includes("auth_token");

  // if not loggin
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // 3. Login -> Show Page
  return children;
}

export default ProtectedRoute;
