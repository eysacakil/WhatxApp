import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend'in çalıştığı port ve base URL
  withCredentials: true,
});

export default instance;