import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./Context/DataContext";

Axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
