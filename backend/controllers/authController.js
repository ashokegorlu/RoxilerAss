const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: "Invalid email or password" });

    const user = results[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
};

// User Registration (Only for normal users)
exports.register = async (req, res) => {
  const { name, email, address, password } = req.body;

  if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters long" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, 'user')";

  db.query(query, [name, email, address, hashedPassword], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "User registered successfully" });
  });
};
exports.updatePassword = async (req, res) => {
  try {
      const { userId, currentPassword, newPassword } = req.body;

      if (!userId || !currentPassword || !newPassword) {
          return res.status(400).json({ message: "User ID and both passwords are required." });
      }

      // Fetch user from the database
      const [userRows] = await db.promise().query("SELECT * FROM Users WHERE id = ?", [userId]);

      if (userRows.length === 0) {
          return res.status(404).json({ message: "User not found." });
      }

      const user = userRows[0];

      // Check if the current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Current password is incorrect." });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in the database
      await db.promise().query("UPDATE Users SET password = ? WHERE id = ?", [hashedPassword, userId]);

      res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
      console.error("Password update error:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};