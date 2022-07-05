import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Axios from "axios";
import { DataProvider } from "./Context/DataContext";
import { ChakraProvider } from "@chakra-ui/react";

Axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </ChakraProvider>
);
