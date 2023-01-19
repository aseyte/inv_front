import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import "./Bincard.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BinCard = () => {
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

  const navigate = useNavigate();
  return (
    <div className="bincard-container">
      <div className="bincard-header">
        <p onClick={() => navigate(-1)}>
          <IoArrowBackSharp style={{ marginRight: "5px" }} /> Back
        </p>
        <h1>BIN CARD</h1>
      </div>
      <table>
        <tr>
          <th className="date">DATE</th>
          <th className="ref">REF (PO#, INV./DR#, RIS#)</th>
          <th className="receipt">RECEIPT</th>
          <th className="issued">ISSUED</th>
          <th className="balance">BALANCE</th>
        </tr>

        {outItem?.map((item, index) => {
          return (
            <tr key={index}>
              <td className="date">
                {!item.risDate ? "NOT INDICATED" : getDate(item.risDate)}
              </td>
              <td className="ref">{item.area + " " + item.risNum} </td>
              <td className="receipt">
                {inventory.filter((e) => e.desc === item.desc)[0]?.available}
              </td>
              <td className="issued">{item.quantity}</td>
              <td className="balance">{item.available}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default BinCard;
