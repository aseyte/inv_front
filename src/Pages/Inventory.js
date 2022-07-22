import React, { useEffect } from "react";
import "./Inventory.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Inventory = () => {
  const navigate = useNavigate();
  const { inventory, equipment, appState } = useAuth();

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <p onClick={() => navigate(-1)}>
          <IoArrowBackSharp style={{ marginRight: "5px" }} /> Back
        </p>
        <h1>INVENTORY</h1>
      </div>

      <table>
        <tr>
          <th className="item-desc">Item Description</th>
          <th className="available">Available</th>
          <th className="issued">Issued</th>
          <th className="returned">Returned</th>
          <th className="category">Category</th>
        </tr>

        {inventory?.map((item, index) => {
          return (
            <tr key={index}>
              <td className="item-desc">{item.desc}</td>
              <td className="available">{item.available}</td>
              <td className="issued">{item.issued}</td>
              <td className="returned">{item.returned}</td>
              <td className="category">
                {
                  equipment.filter(
                    (e) =>
                      e.desc === `Fan Electric Orbit Master-RF400M Ceiling 16"`
                  )[0]?.assigned
                }
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Inventory;
