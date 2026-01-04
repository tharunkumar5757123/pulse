import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, role, token } = useContext(AuthContext);

  // Logout handler
  const handleLogout = () => {
    logout();           // clear context and localStorage
    navigate("/login"); // redirect to login
  };

  // Hide navbar if not logged in
  if (!token) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/dashboard">
        VideoApp
      </Link>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>

          {/* Only editor and admin can see Upload link */}
          {(role === "editor" || role === "admin") && (
            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                Upload
              </Link>
            </li>
          )}
        </ul>

        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
