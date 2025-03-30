import { useState } from "react";
import { register } from "../services/authService"; 
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Import styles

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Success message
    const [error, setError] = useState(""); // Error message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError(""); // Reset error
      setMessage(""); // Reset success message

      if (!name || !email || !password) {
          setError("⚠️ All fields are required!");
          return;
      }

      const userData = { name, email, password };

      try {
          const response = await register(userData);
          
          if (response && response.success) {  // Check if response is valid
              setMessage("✅ Registration Successful! Redirecting...");
              setTimeout(() => navigate("/login"), 2000); // Redirect after success
          } else {
              setError(response?.message || "❌ Registration failed! Please try again.");
          }
      } catch (error) {
          console.error("Registration error ❌", error);
          setError("Something went wrong. Please check your connection.");
      }
  };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>} {/* Success message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
