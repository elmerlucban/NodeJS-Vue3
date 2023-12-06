import axios from "axios";
axios.defaults.withCredentials = false;

const api = axios.create({
  baseURL: "http://localhost:2000/api/V1",
});

export default api;