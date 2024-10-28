import api from './axiosConfig';
import { useEffect } from 'react';

export const refreshToken = async () => {
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await api.post('/auth/refresh_token',{},{
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw error; 
    }
  };

  export const useTokenRefresh = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        refreshToken();
      }, 10000); // 10 seconds
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  };

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('Erro 401 - Redirecionando para login');
        localStorage.removeItem('access_token'); 
        window.location.href = '/'; 
      }
      return Promise.reject(error);
    }
  );