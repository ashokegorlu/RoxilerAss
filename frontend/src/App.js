import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes"; // Import routes.js

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes /> {/* Render all routes from routes.js */}
    </>
  );
};

export default App;
