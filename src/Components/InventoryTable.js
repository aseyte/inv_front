import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch, HiRefresh } from "react-icons/hi";
import { VscBracketError } from "react-icons/vsc";

const InventoryTable = () => {
  const { inventory, equipment, setAppState } = useAuth();
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
          <div className="item-desc">ITEM DESCRIPTION</div>
          <div className="available">AVAILABLE</div>
          <div className="issued">ISSUED</div>
          <div className="returned">RETURNED</div>
          <div className="category">CATEGORY</div>
        </div>
        <div className="table-body">
          {inventory
            ?.filter((e) => {
              if (term) {
                return e.desc.toLowerCase().includes(term.toLowerCase());
              } else {
                return e;
              }
            })
            ?.filter((f) => f.desc !== "#N/A")
            ?.map((item, index) => {
              return (
                <div
                  className={
                    index % 2 === 0 ? "table-body-item" : "table-body-item-2"
                  }
                  key={index}
                >
                  <div className="item-desc">{item.desc}</div>
                  <div className="available">{item.available}</div>
                  <div className="issued">{item.issued}</div>
                  <div className="returned">{item.returned}</div>
                  <div className="category">
                    {
                      equipment.filter(
                        (e) =>
                          e.desc ===
                          `Fan Electric Orbit Master-RF400M Ceiling 16"`
                      )[0]?.assigned
                    }
                  </div>
                </div>
              );
            })}

          {inventory
            .filter((e) => {
              if (term) {
                return e.desc.toLowerCase().includes(term.toLowerCase());
              } else {
                return e;
              }
            })
            ?.filter((f) => f.desc !== "#N/A").length === 0 && (
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

export default InventoryTable;
