import React, { useState } from "react";
import CreateItem from "../Components/CreateItem";

import In from "../Components/In";
import Out from "../Components/Out";
import Return from "../Components/Return";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Equipment from "../Components/Items/Equipment";
import InventoryTable from "../Components/InventoryTable";
import BincardTable from "../Components/BincardTable";
import InTable from "../Components/InTable";
import OutTable from "../Components/OutTable";
import ReturnTable from "../Components/ReturnTable";
import AdminSidebar from "../Components/AdminSidebar";
import Accounts from "../Components/Accounts";

const AdminDashboard = () => {
  const [tab, setTab] = useState("accounts");

  return (
    <>
      <div className="container">
        <AdminSidebar setTab={setTab} tab={tab} />
        <div className="component-wrapper">
          {tab === "accounts" && <Accounts />}

          {tab === "inventory" && <InventoryTable />}
          {tab === "binCard" && <BincardTable />}
          {tab === "listIn" && <InTable />}
          {tab === "listOut" && <OutTable />}
          {tab === "listReturn" && <ReturnTable />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
