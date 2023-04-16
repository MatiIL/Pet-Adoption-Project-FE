import axios from 'axios';

function getServerUrl(){
  if (process.env.NODE_ENV === 'production') return 'https://pets-server.onrender.com/'
  return "http://localhost:8080";
}

const instance = axios.create({
  baseURL: getServerUrl(),
  withCredentials: true ,
});

export default instance;