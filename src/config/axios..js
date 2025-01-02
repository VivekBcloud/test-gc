import Axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
