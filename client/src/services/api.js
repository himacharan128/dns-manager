import axios from 'axios';
// require('dotenv').config();

const API_BASE_URL =  "https://dns-manager-nnrh.onrender.com/api";  //process.env.BACKEND_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getDnsRecords = async () => {
  const response = await api.get('/dns');
  return response.data;
};

export const addDnsRecord = async (record) => {
  const response = await api.post('/dns', record);
  return response.data;
};

export const deleteDnsRecord = async (id) => {
  const response = await api.delete(`/dns/${id}`);
  return response.data;
};