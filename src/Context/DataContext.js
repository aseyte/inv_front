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
  const [verified, setVerified] = useState(null);
  const [inItem, setInItem] = useState([]);

  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycbznd89hipclktNONwyP8FxT3knuC99CFMZm7Vb6q090t14XC8lmDzz0WDfC933GN4h_jA/exec?action=getUnique";

  const outItemAPI =
    "https://script.google.com/macros/s/AKfycbxbWHaXsOuQ4mM-_5XubyokXQe9LnjUxZbqfFENsOOHR4W9DPaa6toclZPQAfDbIbDsmw/exec?action=getOut";

  const inventoryAPI =
    "https://script.google.com/macros/s/AKfycbznd89hipclktNONwyP8FxT3knuC99CFMZm7Vb6q090t14XC8lmDzz0WDfC933GN4h_jA/exec?action=getAvailable";

  const equipmentAPI =
    "https://script.google.com/macros/s/AKfycbznd89hipclktNONwyP8FxT3knuC99CFMZm7Vb6q090t14XC8lmDzz0WDfC933GN4h_jA/exec?action=getEquipment";

  const getInAPI = "https://script.google.com/macros/s/AKfycbznd89hipclktNONwyP8FxT3knuC99CFMZm7Vb6q090t14XC8lmDzz0WDfC933GN4h_jA/exec?action=getIn"

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
        console.log(outItem)
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


  const fetchInItem = async () => {
    try {
      const response = await fetch(getInAPI, { method: "get" });
      const inItem = await response.json();

      if (inItem) {
        setInItem(inItem.filter((e) => e.desc !== "" || e.total !== "" ));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVerification = async () => {
    try {
      const response = await api.get(`/api/auth/user/${user?._id}`);


      if(response) {
        setVerified(response.data.verified)
      }
    } catch (error) {
        console.log(error)
    }
  }

  

  useEffect(() => {
    fetchOutItem();
    fetchInventory();
    fetchEquipment();
    fetchVerification();
    fetchInItem()
  }, [appState, user]);

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
        verified,
        inItem
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
