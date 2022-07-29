import React from "react";
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

const InventoryTable = () => {
  const { inventory, equipment } = useAuth();
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
          <div className="item-desc">ITEM DESCRIPTION</div>
          <div className="available">AVAILABLE</div>
          <div className="issued">ISSUED</div>
          <div className="returned">RETURNED</div>
          <div className="category">CATEGORY</div>
        </div>
        <div className="table-body">
          {inventory?.map((item, index) => {
            return (
              <div className="table-body-item" key={index}>
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
        </div>
      </div>
    </>
  );
};

export default InventoryTable;
