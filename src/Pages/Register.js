import React, { useState } from "react";
import "./Login.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";
import { loginFormVariant } from "../Animations/Animations";
import Logo from "../Assets/zcmc_logo.png";
import "./Login.css";
import VerificationModal from "../Components/VerificationModal";

const Register = () => {
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [retypeError, setRetypeError] = useState(false);
  const [firstnameErr, setFirstnameErr] = useState(false);
  const [lastnameErr, setLastnameErr] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [retypMsg, setRetypeMsg] = useState("");
  const [firstnameMsg, setFirstnameMsg] = useState("");
  const [lastnameMsg, setLastnameMsg] = useState("");

  const [emailMsg, setEmailMsg] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setRePassword("");
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoader(true);
    try {
      if (firstname === "") {
        setFirstnameErr(true);
        setFirstnameMsg("First name field required");
        setLoader(false);
      } else if (lastname === "") {
        setLastnameErr(true);
        setLastnameMsg("Last name field required");
        setLoader(false);
      } else if (email === "") {
        setEmailErr(true);
        setEmailMsg("Email field required");
        setLoader(false);
      } else if (!email.includes("@") || !email.includes(".")) {
        setEmailErr(true);
        setEmailMsg("Input a valid email address");
        setLoader(false);
      } else if (username === "") {
        setUsernameErr(true);
        setUsernameMsg("Username field required");
        setLoader(false);
      } else if (password === "") {
        setPasswordErr(true);
        setPasswordMsg("Password field required");
        setLoader(false);
      } else if (password.length < 6) {
        setPasswordErr(true);
        setPasswordMsg("Password must be at least 6 characters");
        setLoader(false);
      } else if (password !== rePassword) {
        setRetypeError(true);
        setRetypeMsg("Password did not match");
        setLoader(false);
      } else {
        let response = await api.post("/api/auth/register", {
          firstname,
          lastname,
          email,
          username,
          password,
        });
        if (response.data.emailErr) {
          setEmailErr(true);
          setEmailMsg(response.data.emailErr);
          setLoader(false);
          console.log(response.data);
        } else if (response.data.usernameErr) {
          setUsernameErr(true);
          setUsernameMsg(response.data.usernameErr);
          setLoader(false);
          console.log(response.data);
        } else {
          clearForm();
          setLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up to ZCMC MMS-INVENTORY | ZCMC MMS-INVENTORY</title>
      </Helmet>

      <div className="register-container">
        {modal && <VerificationModal setModal={setModal} />}
        <motion.div
          variants={loginFormVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="form-container"
        >
          <div className="login-header">
            <img src={Logo} alt="Logo" />
            <div>
              <h1>Sign up</h1>
              <p>Enter necessary information</p>
            </div>
          </div>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              First name <i>*</i>
            </label>
            <input
              placeholder="e.g. John"
              id={firstnameErr ? "error-input" : ""}
              className={firstnameErr ? "error-input" : ""}
              value={firstname}
              onChange={(e) => {
                setFirstnameErr(false);
                setFirstname(e.target.value);
              }}
              type="text"
            />
            {firstnameErr && <p className="error-input-text">{firstnameMsg}</p>}

            <label>
              Last name <i>*</i>
            </label>
            <input
              placeholder="e.g. Dela Cruz"
              className={lastnameErr ? "error-input" : ""}
              value={lastname}
              onChange={(e) => {
                setLastnameErr(false);
                setLastname(e.target.value);
              }}
              type="text"
            />
            {lastnameErr && <p className="error-input-text">{lastnameMsg}</p>}

            <label>
              Email <i>*</i>
            </label>
            <input
              placeholder="example@gmail.com"
              className={emailErr ? "error-input" : ""}
              value={email}
              onChange={(e) => {
                setEmailErr(false);
                setEmail(e.target.value);
              }}
              type="text"
            />
            {emailErr && <p className="error-input-text">{emailMsg}</p>}

            <label>
              Username <i>*</i>
            </label>
            <input
              className={usernameErr ? "error-input" : ""}
              value={username}
              onChange={(e) => {
                setUsernameErr(false);
                setUsername(e.target.value);
              }}
              type="text"
            />
            {usernameErr && <p className="error-input-text">{usernameMsg}</p>}

            <label>
              Password <i>*</i>
            </label>
            <input
              className={passwordErr ? "error-input" : ""}
              value={password}
              onChange={(e) => {
                setPasswordErr(false);
                setPassword(e.target.value);
              }}
              placeholder="At least 6 characters"
              type="password"
            />
            {passwordErr && <p className="error-input-text">{passwordMsg}</p>}

            <label>
              Confirm Password <i>*</i>
            </label>

            <input
              className={retypeError ? "error-input" : ""}
              value={rePassword}
              onChange={(e) => {
                setRetypeError(false);
                setRePassword(e.target.value);
                setRetypeError(false);
              }}
              type="password"
              placeholder="Type password again"
            />

            {retypeError && <p className="error-input-text">{retypMsg}</p>}

            <button
              onClick={() => {
                handleRegister();
              }}
              className={loader ? "login-form-btn-disable" : "login-form-btn"}
            >
              <a href="#error-input">{loader ? "Signing Up" : "Sign Up"}</a>
            </button>

            <div className="form-link">
              <p onClick={() => navigate("/login")}>
                Already have an account? <span>Sign in.</span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
