const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8080",
  // timeout: 1000,
  withCredentials: true ,
});

export default instance;