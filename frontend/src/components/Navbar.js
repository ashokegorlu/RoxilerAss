import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "../styles.css"; // Import styles.css

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}!</span>
          <span><Link to="/home">Store Listings</Link></span>
          <span><Link to="/dashboard">Dashboard</Link></span>
          {user.role === "System Administrator" && (
            <span><Link to="/admin-dashboard">Admin</Link></span>
          )}
          <span><Link to="/update-password">Update Password</Link></span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
