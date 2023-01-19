import React, { useState } from "react";
import { useClickOutside } from "./useClickOutside";

const ModalIn = ({ item, setInModal }) => {
  const domNode = useClickOutside(() => {
    setInModal(false);
  });
  return (
    <div className="modal-container">
      <div className="modal"></div>
    </div>
  );
};

export default ModalIn;
