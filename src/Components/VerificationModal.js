import React, { useState } from "react";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import "./VerificationModal.css";

const VerificationModal = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { user, verified } = useAuth();

  const handleActivate = async () => {
    setIsClick(true);

    try {
      const response = await api.put(`/api/auth/activate/${user._id}`);

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setIsClick(false);
    }
  };

  const submitLogout = async () => {
    try {
      let response = await api.get("/api/auth/logout");
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-container">
      <div className="verification-modal">
        {user?.otp} {pin}
        <h1>Activate account</h1>
        <p>
          Enter the 6-digit pin that was sent to your email to activate your
          account.
        </p>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <div className="verification-btns">
          <button onClick={() => submitLogout()} className="red-cta">
            Logout
          </button>
          <button
            onClick={() => handleActivate()}
            className={isClick ? "green-cta" : "green-cta"}
          >
            Activate
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
