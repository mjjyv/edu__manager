import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Địa chỉ Backend Spring Boot
});

// Interceptor để đính kèm Token vào Header cho mọi yêu cầu 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;