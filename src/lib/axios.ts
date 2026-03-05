import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL?.trim();


const apiClient = axios.create({
  baseURL: rawBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
