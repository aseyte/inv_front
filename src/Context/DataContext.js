import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/auth/user");

      if (response) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
