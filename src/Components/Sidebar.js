import React from "react";
import "./Sidebar.css";
import Nouser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import {
  HiDocumentText,
  HiLogin,
  HiLogout,
  HiReply,
  HiPlus,
} from "react-icons/hi";
import api from "../API/Api";

const Sidebar = ({ setTab, tab }) => {
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
          <li
            onClick={() => setTab("create")}
            className={tab === "create" ? "active" : ""}
          >
            <p>
              <HiPlus />
            </p>
            Create
          </li>
          <li
            onClick={() => setTab("inItem")}
            className={tab === "inItem" ? "active" : ""}
          >
            <p>
              <HiLogout />
            </p>
            In{" "}
          </li>
          <li
            onClick={() => setTab("outItem")}
            className={tab === "outItem" ? "active" : ""}
          >
            <p>
              <HiLogin />
            </p>{" "}
            Out{" "}
          </li>
          <li
            onClick={() => setTab("returnItem")}
            className={tab === "returnItem" ? "active" : ""}
          >
            <p>
              <HiReply />
            </p>
            Return{" "}
          </li>
        </ul>

        <label>Monitor</label>
        <ul>
          <li
            onClick={() => setTab("inventory")}
            className={tab === "inventory" ? "active" : ""}
          >
            <p>
              <HiDocumentText />
            </p>
            Inventory
          </li>
          <li
            onClick={() => setTab("listIn")}
            className={tab === "listIn" ? "active" : ""}
          >
            <p>
              <HiDocumentText />
            </p>
            List of In
          </li>
          <li
            onClick={() => setTab("listOut")}
            className={tab === "listOut" ? "active" : ""}
          >
            <p>
              <HiDocumentText />
            </p>
            List of Out
          </li>
          <li
            onClick={() => setTab("listReturn")}
            className={tab === "listReturn" ? "active" : ""}
          >
            <p>
              <HiDocumentText />
            </p>
            List of Return
          </li>
          <li
            onClick={() => setTab("binCard")}
            className={tab === "binCard" ? "active" : ""}
          >
            <p>
              <HiDocumentText />
            </p>
            Bin Card
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
