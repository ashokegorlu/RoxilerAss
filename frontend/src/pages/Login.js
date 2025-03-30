import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles.css"; // Import styles.css

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "user@example.com",
    password: "password123",
    role: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!credentials.email || !credentials.password || !credentials.role) {
      setError("⚠️ Email, Password, and Role are required!");
      return;
    }

    try {
      await login(credentials);
      setMessage("✅ Login Successful! Redirecting...");
    } catch (error) {
      console.error("Login error ❌", error);
      setError("Something went wrong. User does not exist.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <select
            className="login-select"
            value={credentials.role}
            onChange={(e) =>
              setCredentials({ ...credentials, role: e.target.value })
            }
            required
          >
            <option value="">Select Role</option>
            <option value="System Administrator">System Administrator</option>
            <option value="Store Owner">Store Owner</option>
            <option value="Normal User">Normal User</option>
          </select>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
