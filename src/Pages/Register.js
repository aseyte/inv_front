import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";
import Axios from "axios";

const Register = () => {
  Axios.defaults.withCredentials = true;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsClick] = useState(false);

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
  };

  const handleRegister = async () => {
    setIsClick(true);

    if (!firstname || !lastname || !username || !password) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await api.post("/api/auth/register", {
        firstname,
        lastname,
        username,
        password,
      });

      if (response.data.error) {
        alert(response.data.error);
        setIsClick(false);
      } else {
        alert("Registered successfully");
        clearForm();
        setIsClick(false);
      }
    } catch (error) {
      setIsClick(false);
      alert(error.message);
    }
  };
  const navigate = useNavigate();
  const id = useId();
  return (
    <div className="register-container">
     register
    </div>
  );
};

export default Register;
