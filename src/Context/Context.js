import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const Context = ({ children }) => {
    const [appState, setAppState] = useState(null);
    const [item, setItem] = useState([]);
    const [outItem, setOutItem] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [verified, setVerified] = useState(null);
    const [inItem, setInItem] = useState([]);
    const [returnItem, setReturnItem] = useState([]);
    const [people, setPeople] = useState([]);

    ///input in inventory 
    //Fk_ItemId	
    // Fk_locationId	
    // Fk_conditionId	
    // Delivery_date	
    // Quantity	
    // pack_size	
    // loose	
    // Remarks	


    //   useEffect(() => {
    //     fetchUser();
    //   }, [appState]);

    //   useEffect(() => {
    //     fetch(getUniqueAPI, { method: "get" })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data) {
    //           setItem(data.filter((e) => e.desc !== ""));
    //         }
    //       })
    //       .catch((error) => console.log(error));
    //   }, [appState]);

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

    const fetchPeople = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/users", {
                method: "get",
                mode: "no-cors",
            });
            const listPeople = await response.json();

            if (listPeople) {
                setPeople(listPeople.filter((e) => e.userType !== "admin"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchReturn = async () => {
        try {
            const response = await fetch(getReturnAPI, { method: "get" });
            const returnItems = await response.json();

            if (returnItems) {
                setReturnItem(returnItems.filter((e) => e.desc !== ""));
            }
        } catch (error) {
            throw error;
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
                setInItem(inItem.filter((e) => e.desc !== "" || e.total !== ""));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVerification = async () => {
        try {
            const response = await api.get(`/api/auth/user/${user?._id}`);

            if (response) {
                setVerified(response.data.verified);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <DataContext.Provider
            value={{

            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;