import React from "react";
import useAuth from "../Hooks/useAuth";
import "./Accounts.css";
import { VscBracketError } from "react-icons/vsc";
import { HiTrash, HiCheck } from "react-icons/hi";

const Accounts = () => {
  const { people } = useAuth();
  return (
    <div className="table-container">
      <div className="above-table-container">
        <h1>List of Registered Employee</h1>
      </div>
      <div className="table-header">
        <div className="employee">Employee</div>
        <div className="username">USERNAME</div>
        <div className="email">EMAIL</div>
        <div className="status">STATUS</div>
      </div>
      <div style={{ minHeight: "40vh" }} className="table-body">
        {people
          ?.filter((e) => e.verified === true)
          .map((item, index) => {
            return (
              <div
                key={index}
                className={
                  index % 2 === 0 ? "table-body-item" : "table-body-item-2"
                }
              >
                <div className="employee">
                  {item.firstname + " " + item.lastname}
                </div>
                <div className="username">@{item.username}</div>
                <div className="email">{item.email}</div>
                <div className="status">
                  {item.verified ? "Verified" : "Not Verified"}
                </div>
              </div>
            );
          })}
      </div>{" "}
      <br />
      <br />
      <div className="above-table-container">
        <h1>Pending for Approval</h1>
      </div>
      <div className="table-header">
        <div className="employee">Employee</div>
        <div className="username">USERNAME</div>
        <div className="email">EMAIL</div>
        <div className="status">STATUS</div>
        <div className="actions">ACTIONS</div>
      </div>
      <div style={{ minHeight: "100px" }} className="table-body">
        {people?.filter((e) => e.verified === false).length === 0 && (
          <div className="no-data">
            <p>
              <VscBracketError />
            </p>
            No data found.
          </div>
        )}
        {people
          ?.filter((e) => e.verified === false)
          .map((item, index) => {
            return (
              <div
                key={index}
                className={
                  index % 2 === 0 ? "table-body-item" : "table-body-item-2"
                }
              >
                <div className="employee">
                  {item.firstname + " " + item.lastname}
                </div>
                <div className="username">@{item.username}</div>
                <div className="email">{item.email}</div>
                <div className="status">
                  {item.verified ? "Verified" : "Not Verified"}
                </div>
                <div className="actions">
                  <div className="approve">
                    <HiCheck />
                  </div>
                  <div className="delete">
                    <HiTrash />
                  </div>
                </div>
              </div>
            );
          })}
      </div>{" "}
    </div>
  );
};

export default Accounts;
