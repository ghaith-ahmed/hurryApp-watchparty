import axios from "axios";

const production = true;

const instance = axios.create({
  withCredentials: true,
  baseURL: production
    ? "https://watch-party-uvre.onrender.com"
    : "http://localhost:5000/api",
});

export default instance;
