import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.144:3000/', 
  timeout: 50000,
  headers: {
        "Content-Type": "application/json",
    },
});