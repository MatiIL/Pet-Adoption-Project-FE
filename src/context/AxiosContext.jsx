import axios from 'axios'
import { getServerUrl } from '../Utils'

const instance = axios.create({
  baseURL: getServerUrl(),
  withCredentials: true,
});

export default instance;