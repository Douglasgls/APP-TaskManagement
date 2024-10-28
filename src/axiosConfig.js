import axios from 'axios';
const VITE_API = import.meta.env.VITE_API

const api = axios.create({
  baseURL: VITE_API, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }else{
    console.log("token não encontrado")
    window.location.href = '/';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Erro 401 - Token inválido ou expirado, redirecionando para login');
      localStorage.removeItem('access_token');
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);


export default api;