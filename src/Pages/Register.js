import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";
import Axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Container,
} from "@chakra-ui/react";

const Register = () => {
  Axios.defaults.withCredentials = true;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <Container
        bg={"#fff"}
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        padding={5}
        borderRadius={8}
      >
        <FormControl marginBottom={5} isRequired isInvalid={isError}>
          <FormLabel htmlFor="firstname">First Name</FormLabel>
          <Input
            id="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {!isError && (
            <FormErrorMessage>Firstname is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl marginBottom={5} isRequired isInvalid={isError}>
          <FormLabel htmlFor="firstname">Last Name</FormLabel>
          <Input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {!isError && (
            <FormErrorMessage>Firstname is required.</FormErrorMessage>
          )}
        </FormControl>

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
          Register
        </Button>
      </Container>
    </div>
  );
};

export default Register;
