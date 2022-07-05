import React, { useEffect, useState } from "react";
import "./Login.css";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import api from "../API/Api";
import {
  Container,
  FormControl,
  Input,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";

const Login = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsClick] = useState(false);

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async () => {
    setIsClick(true);

    if (!username || !password) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      if (response.data.error) {
        alert(response.data.error);
        setIsClick(false);
      } else {
        setIsClick(false);
        window.location.reload();
      }
    } catch (error) {
      setIsClick(false);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [isError, setIsError] = useState(false);

  return (
    <>
      <div className="container">
        <Container
          bg={"#fff"}
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          padding={5}
          borderRadius={8}
        >
          <FormControl marginBottom={5} isRequired isInvalid={isError}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!isError && (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl marginBottom={8} isRequired isInvalid={isError}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              i
            />
            {!isError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>

          <Button
            isLoading={isClick ? true : false}
            loadingText="Signing in"
            colorScheme="teal"
            variant="solid"
            width="100%"
          >
            Sign In
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Login;
