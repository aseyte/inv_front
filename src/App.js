import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedLoginRoute from "./Components/ProtectedLoginRoute";
import useAuth from "./Hooks/useAuth";
import CreateItem from "./Pages/CreateItem";
import Homepage from "./Pages/Homepage";
import BinCard from "./Pages/BinCard";
import Inventory from "./Pages/Inventory";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  const { user } = useAuth({});

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedLoginRoute user={user} />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/" element={<Homepage />} />
            <Route path="bin-card" element={<BinCard />} />
            <Route path="inventory" element={<Inventory />} />

            <Route element={<ProtectedRoute user={user} role="admin" />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
