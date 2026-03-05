import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL?.trim();
const normalizedBaseURL = rawBaseURL
  ? rawBaseURL.startsWith('http://') || rawBaseURL.startsWith('https://')
    ? rawBaseURL
    : `https://${rawBaseURL}`
  : 'https://www.thecocktaildb.com/api/json/v1/1';

const apiClient = axios.create({
  baseURL: normalizedBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
