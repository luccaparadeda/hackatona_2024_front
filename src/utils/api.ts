import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hackatona.luccaparadeda.com",
});

export default api;
