import React, {useState} from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch, HiRefresh } from "react-icons/hi";

const BincardTable = () => {
  const { outItem, inventory, setAppState } = useAuth();
  const [term, setTerm] = useState("");
  const [refresh, setRefresh] = useState(false);

  const refreshData = () => {
    setRefresh(true);
    try {
      setAppState("Fetcing updated list");
      setTimeout(() => {
        setAppState("");
        setRefresh(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setRefresh(false);
    }
  };
  const getDate = (e) => {
    let todate = new Date(e);

    todate =
      todate.getMonth() +
      1 +
      "/" +
      todate.getDay() +
      "/" +
      todate.getFullYear();

    return todate;
  };
  return (
    <>
      <div className="table-container">
      <div className="above-table-container">
        <div></div>
          

          <button onClick={() => refreshData()}>
            <p className={refresh ? "animate" : ""}>
              <HiRefresh />
            </p>{" "}
            Refresh Items
          </button>
        </div>


        <div className="table-header">
          <div className="date">DATE</div>
          <div className="ref">REF (PO#, INV./DR#, RIS#)</div>
          <div className="receipt">RECEIPT</div>
          <div className="returned">ISSUED</div>
          <div className="balance">BALANCE</div>
        </div>
        <div className="table-body">
          {outItem?.map((item, index) => {
            return (
              <div className={index %2 === 0  ? "table-body-item" : "table-body-item-2"} key={index}>
                <div className="date">
                  {!item.risDate ? "NOT INDICATED" : getDate(item.risDate)}
                </div>
                <div className="ref">{item.area + " " + item.risNum} </div>
                <div className="receipt">
                  {inventory.filter((e) => e.desc === item.desc)[0]?.available}
                </div>
                <div className="return">{item.quantity}</div>
                <div className="balance">{item.available}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BincardTable;
