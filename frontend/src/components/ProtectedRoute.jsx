import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ roles, children }) {
  const { isAuthenticated, role } = useContext(AuthContext);

  // Not logged in → redirect to login page
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Role restriction → redirect to dashboard if role not allowed
  if (roles && !roles.includes(role)) return <Navigate to="/dashboard" replace />;

  // Allowed → render children
  return children;
}
