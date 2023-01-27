import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Axios from "axios";
import { DataProvider } from "./Context/DataContext";
import { Context } from "./Context/Context";
import { ChakraProvider } from "@chakra-ui/react";

Axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <DataProvider>
      <Context>
        <App />
      </Context>
    </DataProvider>
  </ChakraProvider>
);
