import axios from "axios";

axios.defaults.withCredentials = true;

let serverUrl = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export default api;
