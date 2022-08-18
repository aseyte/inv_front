import React from "react";
import { useClickOutside } from "./useClickOutside";

const InItemModal = ({ setModal }) => {
  const domNod = useClickOutside(() => {
    setModal(false);
  });
  return (
    <div className="modal-container">
      <div ref={domNod} className="modal">
        <h1>Hello World</h1>
      </div>
    </div>
  );
};

export default InItemModal;
