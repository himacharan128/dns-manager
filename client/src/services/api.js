import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
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