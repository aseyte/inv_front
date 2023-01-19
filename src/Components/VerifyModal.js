import React, { useState } from "react";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const VerifyModal = ({ id, setVerifyModal, toast }) => {
  const [isClick, setIsClick] = useState(false);
  const { setAppState } = useAuth();

  const handleVerify = async () => {
    setIsClick(true);
    try {
      const response = await api.put(`/api/auth/verify-user/${id}`);

      if (response.data.ok) {
        toast({
          title: "Activated User Account",
          description: "Successfully activated one (1) user account.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
        setAppState("Verified User");
        setTimeout(() => setAppState(""), 500);
        setVerifyModal(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsClick(false);
    }
  };
  return (
    <div className="modal-container">
      <div className="modal">
        <h1>Account Verfication</h1>
        <p>Are you sure you want to verify and activate this account?</p>
        <div className="modal-btns">
          <button onClick={() => setVerifyModal(false)} className="gray">
            Cancel
          </button>
          <button
            onClick={handleVerify}
            className={isClick ? "green-disable" : "green"}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
