import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/auth/login");

      if (response) {
        setUser(response.data)
      }
    } catch (error) {
      setUser(null)
    }
  };


  useEffect(() => {
    fetchUser()
  },[])

  return (
    <DataContext.Provider
      value={{user, appState, setAppState}}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
