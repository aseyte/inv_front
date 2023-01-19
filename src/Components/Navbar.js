import React from "react";
import "./Navbar.css";
import Logo from "../Assets/zcmc_logo.png";
import useAuth from "../Hooks/useAuth";
import Nouser from "../Assets/nouser.png";
import { HiLogout } from "react-icons/hi";
import api from "../API/Api";

const Navbar = () => {
  const { user } = useAuth();

  const submitLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");

      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <h1>MMS Inventory</h1>
      </div>
      <div className="profile">
        <div className="name">{user?.firstname}</div>
        <div className="avatar">
          <img src={Nouser} alt="Avatar Profile" />
        </div>

        <div onClick={() => submitLogout()} className="logout">
          <HiLogout /> <p>Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
