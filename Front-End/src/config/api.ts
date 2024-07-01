import axios from 'axios';

export const configAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

configAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log('error', error);
    return Promise.reject(error);
  },
);

configAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if( error.response.status === 401){
      localStorage.removeItem('token');
      localStorage.removeItem('isPatient');
      localStorage.removeItem('email');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);