import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL?.trim();


const apiClient = axios.create({
  baseURL: rawBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.code === 'ERR_NETWORK'
        ? 'Unable to reach the server.'
        : error?.message ?? 'Request failed.';
    window.dispatchEvent(
      new CustomEvent('api:error', { detail: { message, timestamp: Date.now() } }),
    );
    return Promise.reject(error);
  },
);

export default apiClient;
