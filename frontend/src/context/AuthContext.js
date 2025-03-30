import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Login function
    const login = async (credentials) => {
        const response = await loginService(credentials);

        if (response.success) {
            
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            switch (credentials.role) {
                case "System Administrator":
                  setTimeout(() => navigate("/admin-dashboard"), 2000);
                  break;
                case "Store Owner":
                  setTimeout(() => navigate("/store-owner-dashboard"), 2000);
                  break;
                case "Normal User":
                default:
                  setTimeout(() => navigate("/dashboard"), 2000);
                  break;
              }
        } else {
            throw new Error(response.message); // Handle error messages
        }
    };

    // ✅ Logout function
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login"); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
