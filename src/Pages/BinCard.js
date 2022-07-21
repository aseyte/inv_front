import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import "./Bincard.css";

const BinCard = () => {
  const { outItem } = useAuth();

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
    <div className="bincard-container">
      <h1>BIN CARD</h1>
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
            <>
              <tr>
                <td>
                  {!item.risDate ? "NOT INDICATED" : getDate(item.risDate)}
                </td>
                <td>{item.area + " " + item.risNum} </td>
                <td></td>
                <td>{item.quantity}</td>
                <td>{item.available}</td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default BinCard;
