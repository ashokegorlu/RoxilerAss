const db = require("../config/db");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.promise().query("SELECT * FROM Users");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [users] = await db.promise().query("SELECT * FROM Users WHERE id = ?", [id]);

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(users[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        await db.promise().query("UPDATE Users SET name = ?, email = ?, role = ? WHERE id = ?", [name, email, role, id]);

        res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await db.promise().query("DELETE FROM Users WHERE id = ?", [id]);

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
