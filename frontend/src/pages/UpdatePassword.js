import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles.css";

const UpdatePassword = () => {
    const { user } = useAuth(); // Fetch logged-in user info
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!currentPassword || !newPassword) {
            setMessage("Both current and new passwords are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/update-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    userId: user.id, // Pass logged-in user's ID
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="update-password-container">
            <h2>Update Password</h2>
            <form onSubmit={handleUpdatePassword}>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit">Update Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdatePassword;

