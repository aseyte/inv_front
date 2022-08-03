import React, { useState } from "react";
import CreateItem from "../Components/CreateItem";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
  Text,
} from "@chakra-ui/react";
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

const Homepage = () => {
  const [tab, setTab] = useState("create");

  return (
    <>
      <div className="container">
        <Sidebar setTab={setTab} tab={tab} />
        <div className="component-wrapper">
          {tab === "create" && <CreateItem />}
          {tab === "inItem" && <In setTab={setTab} />}
          {tab === "outItem" && <Out setTab={setTab} />}
          {tab === "returnItem" && <Return setTab={setTab} />}

          {tab === "inventory" && <InventoryTable />}
          {tab === "binCard" && <BincardTable />}
          {tab === "listIn" && <InTable />}
          {tab === "listOut" && <OutTable />}
          {tab === "listReturn" && <ReturnTable />}
        </div>

        {/* <div onClick={() => navigate("/bin-card")} className="bin-card">
          Bin Card
        </div>

        <div onClick={() => navigate("/inventory")} className="inventory">
          Inventory
        </div> */}
      </div>
    </>
  );
};

export default Homepage;
