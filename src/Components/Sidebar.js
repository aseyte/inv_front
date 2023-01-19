import React, {useState} from "react";
import "./Sidebar.css";
import Nouser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import {FcDocument, FcAddDatabase, FcRight, FcLeft, FcUpLeft} from 'react-icons/fc'
import LogoutModal from "./LogoutModal";

const Sidebar = ({ setTab, tab }) => {
  const { user } = useAuth();
  const [modal, setModal] = useState(false)
  const submitLogout = async () => {
    setModal(true)
    try {
      const response = await api.get("/api/auth/logout");

      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setModal(false)
    }
  };


  return (
    <>
    {modal && <LogoutModal />}
    <div className="sidebar">
      <div className="header">
        <div className="avatar">
          <img src={Nouser} alt="Avatar Profile" />
        </div>
        <h1>{user?.firstname + " " + user?.lastname}</h1>
        <h2>
          MMS | <span onClick={() => submitLogout()}>Logout</span>
        </h2>
      </div>

      <div className="navigation">
        <label>Manage</label>
        <ul style={{ marginBottom: "40px" }}>
          {/* <li
            onClick={() => setTab("create")}
            className={tab === "create" ? "active" : ""}
          >
            <p>
              <FcAddDatabase />
            </p>
            Create Item
          </li> */}
          <li
            onClick={() => setTab("inItem")}
            className={tab === "inItem" || tab === "create" ? "active" : ""}
          >
            <p>
              <FcRight />
            </p>
            In Item
          </li>
          <li
            onClick={() => setTab("outItem")}
            className={tab === "outItem" ? "active" : ""}
          >
            <p>
              <FcLeft />
            </p>{" "}
            Out Item
          </li>
          <li
            onClick={() => setTab("returnItem")}
            className={tab === "returnItem" ? "active" : ""}
          >
            <p>
              <FcUpLeft />
            </p>
            Return Item
          </li>
        </ul>

        <label>Monitor</label>
        <ul>
          <li
            onClick={() => setTab("inventory")}
            className={tab === "inventory" ? "active" : ""}
          >
            <p>
              <FcDocument />
            </p>
            Inventory
          </li>
          <li
            onClick={() => setTab("listIn")}
            className={tab === "listIn" ? "active" : ""}
          >
            <p>
              <FcDocument />
            </p>
            List of In
          </li>
          <li
            onClick={() => setTab("listOut")}
            className={tab === "listOut" ? "active" : ""}
          >
            <p>
              <FcDocument />
            </p>
            List of Out
          </li>
          <li
            onClick={() => setTab("listReturn")}
            className={tab === "listReturn" ? "active" : ""}
          >
            <p>
              <FcDocument />
            </p>
            List of Return
          </li>
          <li
            onClick={() => setTab("binCard")}
            className={tab === "binCard" ? "active" : ""}
          >
            <p>
              <FcDocument />
            </p>
            Bin Card
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
