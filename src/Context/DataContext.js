import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(null);
  const [item, setItem] = useState([]);
  const [outItem, setOutItem] = useState([]);

  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycbwhWmYEWBY18WKMVOjokhBVZLC8eR-8OWB-QesfBxqBeO99z3Jo-HNshTxO133P8CIVtA/exec?action=getUnique";

    const outItemAPI =
    "https://script.google.com/macros/s/AKfycbxjKxe95IzeGmNShKpx_PURziX7Df72r6YfUUZ3yqmZrglSiMn67st4LSdsZqA2hFDp/exec?action=getOut";

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

  useEffect(() => {
    fetch(outItemAPI, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOutItem(data.filter((e) => e.desc !== ""));
          console.log(data)
        }
      })
      .catch((error) => console.log(error));
  }, [appState]);


  return (
    <DataContext.Provider value={{ user, appState, setAppState, item, outItem }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
