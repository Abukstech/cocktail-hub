import { useEffect, useState } from 'react';

interface ApiErrorDetail {
  message: string;
  timestamp: number;
}

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastApiError, setLastApiError] = useState<ApiErrorDetail | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleApiError = (event: Event) => {
      const detail = (event as CustomEvent<ApiErrorDetail>).detail;
      if (detail) {
        setLastApiError(detail);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('api:error', handleApiError as EventListener);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('api:error', handleApiError as EventListener);
    };
  }, []);

  return { isOnline, lastApiError };
};
