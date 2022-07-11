import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(null);
  const [item, setItem] = useState([]);
  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycbwhWmYEWBY18WKMVOjokhBVZLC8eR-8OWB-QesfBxqBeO99z3Jo-HNshTxO133P8CIVtA/exec?action=getUnique";

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
  }, []);

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

  return (
    <DataContext.Provider value={{ user, appState, setAppState, item }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
