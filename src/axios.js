import axios from "axios";

const production = true;

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://watch-party-uvre.onrender.com/api"
});

export default instance;
