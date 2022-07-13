import axios from "axios";

axios.defaults.withCredentials = true;

let serverUrl = "https://mms-inventory.herokuapp.com/";

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export default api;
