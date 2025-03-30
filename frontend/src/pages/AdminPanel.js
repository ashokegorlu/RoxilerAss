import { useEffect, useState } from "react";
import {  getUsers } from "../services/adminService"; 
import { register } from "../services/authService"; 
import "../styles.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });

  useEffect(() => {
    const fetchData = async () => {
      setUsers(await getUsers());
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(newUser);
    setNewUser({ name: "", email: "", password: "", role: "user" }); // Reset form after submission
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Add User */}
      <div className="add-user-container">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>

      {/* Users List */}
      <h3>Users</h3>
      <ul className="centered-list">
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
