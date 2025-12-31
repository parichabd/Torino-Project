import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6501",
});

export default api;