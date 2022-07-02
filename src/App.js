import React from "react";
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
import useAuth from "./Hooks/useAuth";
import CreateItem from "./Pages/CreateItem";

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Navigate to="create" replace />} />
              <Route path="create" element={<CreateItem />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
