const API_URL = "http://localhost:5000/api/auth"; // Ensure this matches your backend

// ✅ Register User
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
        return data;
    } catch (error) {
        console.error("Error in register ❌:", error);
        return { success: false, message: error.message };
    }
};

// ✅ Login User
export const login = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Store token & user details in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error("Login error ❌:", error);
        return { success: false, message: error.message };
    }
};

// ✅ Logout User
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// ✅ Get Authenticated User
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// ✅ Get Token
export const getToken = () => {
    return localStorage.getItem("token");
};

// ✅ Check if User is Authenticated
export const isAuthenticated = () => {
    return !!getToken();
};
