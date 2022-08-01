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

  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycbyMYqr3OhJu3MsoH96a38caZSFF4PIv8H13jm_RLh3wI9_rq81JjkQA3AjE9ZOmI9x2KA/exec?action=getUnique";

  const outItemAPI =
    "https://script.google.com/macros/s/AKfycbyMYqr3OhJu3MsoH96a38caZSFF4PIv8H13jm_RLh3wI9_rq81JjkQA3AjE9ZOmI9x2KA/exec?action=getOut";

  const inventoryAPI =
    "https://script.google.com/macros/s/AKfycbyMYqr3OhJu3MsoH96a38caZSFF4PIv8H13jm_RLh3wI9_rq81JjkQA3AjE9ZOmI9x2KA/exec?action=getAvailable";

  const equipmentAPI =
    "https://script.google.com/macros/s/AKfycbyMYqr3OhJu3MsoH96a38caZSFF4PIv8H13jm_RLh3wI9_rq81JjkQA3AjE9ZOmI9x2KA/exec?action=getEquipment";

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
        verified
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
