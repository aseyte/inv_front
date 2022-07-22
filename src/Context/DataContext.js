import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(null);
  const [item, setItem] = useState([]);
  const [outItem, setOutItem] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycbwhWmYEWBY18WKMVOjokhBVZLC8eR-8OWB-QesfBxqBeO99z3Jo-HNshTxO133P8CIVtA/exec?action=getUnique";

  const outItemAPI =
    "https://script.google.com/macros/s/AKfycbxjKxe95IzeGmNShKpx_PURziX7Df72r6YfUUZ3yqmZrglSiMn67st4LSdsZqA2hFDp/exec?action=getOut";

  const inventoryAPI =
    "https://script.google.com/macros/s/AKfycbybjiAertzVLW19ggnEaNYoiC5bBmIyNC9M01w71KoH70s_t4fubP67ZlnrPtChwfqTfw/exec?action=getAvailable";

  const equipmentAPI =
    "https://script.google.com/macros/s/AKfycbybjiAertzVLW19ggnEaNYoiC5bBmIyNC9M01w71KoH70s_t4fubP67ZlnrPtChwfqTfw/exec?action=getEquipment";

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/auth/login");

      if (response) {
        setUser(response.data);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [appState]);

  useEffect(() => {
    fetch(getUniqueAPI, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setItem(data.filter((e) => e.desc !== ""));
        }
      })
      .catch((error) => console.log(error));
  }, [appState]);

  const fetchOutItem = async () => {
    try {
      const response = await fetch(outItemAPI, { method: "get" });
      const outItem = await response.json();

      if (outItem) {
        setOutItem(outItem.filter((e) => e.desc !== ""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch(inventoryAPI, { method: "get" });
      const outItem = await response.json();

      if (outItem) {
        setInventory(outItem.filter((e) => e.desc !== ""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEquipment = async () => {
    try {
      const response = await fetch(equipmentAPI, { method: "get" });
      const outItem = await response.json();

      if (outItem) {
        setEquipment(outItem.filter((e) => e.desc !== ""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOutItem();
    fetchInventory();
    fetchEquipment();
  }, [appState]);

  return (
    <DataContext.Provider
      value={{
        user,
        appState,
        setAppState,
        item,
        outItem,
        inventory,
        equipment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
