import React from "react";
import { useAuth } from "../context/AuthContext"; 
import "../styles.css"; // Import the CSS file

const Dashboard = () => {
  const { user } = useAuth(); // Get the logged-in user details

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">My Dashboard</h2>
        <p className="dashboard-welcome">
          Welcome, <span className="dashboard-username">{user?.name || "User"}!</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

