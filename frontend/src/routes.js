import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import StoreDetail from "./pages/StoreDetail";
import UpdatePassword from "./pages/UpdatePassword";

const AppRoutes = () => {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/admin-dashboard" element={<AdminPanel />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
  );
};

export default AppRoutes;
