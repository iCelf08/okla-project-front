import axios from 'axios';

// Create an instance of axios with the default configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor if needed
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('register/', userData);
    return response.data;
  } catch (error) {
    console.error(
      'Error registering user:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('token/', credentials);
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userId', response.data.userId);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(
      'Error logging in:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
