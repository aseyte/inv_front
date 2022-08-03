import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch, HiRefresh } from "react-icons/hi";
import { VscBracketError } from "react-icons/vsc";
import Nouser from "../Assets/nouser.png";

const OutTable = () => {
  const { outItem, setAppState } = useAuth();
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

  const getDate = (date) => {
    const todate = new Date(date);
    let today =
      todate.getMonth() + "/" + todate.getDate() + "/" + todate.getFullYear();

    return today;
  };

  const getTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  return (
    <>
      <div className="table-container">
      <div className="above-table-container">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<Icon as={HiSearch} />}
            />
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search Item Description"
              background="#fff"
              w={"md"}
            />
          </InputGroup>

          <button onClick={() => refreshData()}>
            <p className={refresh ? "animate" : ""}>
              <HiRefresh />
            </p>{" "}
            Refresh Items
          </button>
        </div>

        <div className="table-header">
          <div className="date">Date & Time</div>
          <div className="item-desc">ITEM DESCRIPTION</div>
          <div className="brand">BRAND</div>
          <div className="total">QTY</div>
          <div className="total">AVAILABLE</div>
          <div className="user">MMS USER</div>
        </div>
        <div className="table-body">
          {outItem
            ?.filter((e) => {
              if (term) {
                return e.desc.toLowerCase().includes(term.toLowerCase());
              } else {
                return e;
              }
            })
            ?.map((item, index) => {
              return (
                <div
                  className={
                    index % 2 === 0 ? "table-body-item" : "table-body-item-2"
                  }
                  key={index}
                >
                  <div className="date">
                    {getDate(item.timestamp)} - {getTime(item.timestamp)}
                  </div>
                  <div className="item-desc">{item.desc}</div>
                  <div className="brand">{item.brand}</div>
                  <div className="total">{item.quantity}</div>
                  <div className="total">{item.available}</div>
                  <div className="user">
                    <img src={Nouser} alt="User Avatar" />
                    {item.user}
                  </div>
                </div>
              );
            })}

          {outItem.filter((e) => {
            if (term) {
              return e.desc.toLowerCase().includes(term.toLowerCase());
            } else {
              return e;
            }
          }).length === 0 && (
            <div className="no-data">
              <p>
                <VscBracketError />
              </p>{" "}
              No data found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutTable;
