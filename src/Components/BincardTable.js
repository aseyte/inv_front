import React from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch } from "react-icons/hi";

const BincardTable = () => {
  const { outItem, inventory } = useAuth();
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
        <InputGroup mb={6}>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<Icon as={HiSearch} />}
          />
          <Input placeholder="Search Item" background="#fff" w={"md"} />
        </InputGroup>

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
