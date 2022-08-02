import React, { useState } from "react";
import {
  Table,
  Th,
  Tr,
  Thead,
  Td,
  Tbody,
  Tfoot,
  TableContainer,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch } from "react-icons/hi";
import { VscBracketError } from "react-icons/vsc";

const InventoryTable = () => {
  const { inventory, equipment } = useAuth();
  const [term, setTerm] = useState("");
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
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search Item"
            background="#fff"
            w={"md"}
          />
        </InputGroup>

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
            ?.map((item, index) => {
              return (
                <div className={index % 2 === 0 ? "table-body-item" : "table-body-item-2"} key={index}>
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

          {inventory.filter((e) => {
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

export default InventoryTable;
