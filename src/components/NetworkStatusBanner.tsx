import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const NetworkStatusBanner = () => {
  const { isOnline, lastApiError } = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="alert alert-warning rounded-none">
        <span>You are offline. Check your internet connection.</span>
      </div>
    );
  }

  if (lastApiError) {
    return (
      <div className="alert alert-error rounded-none">
        <span>Network error: {lastApiError.message}</span>
      </div>
    );
  }

  return null;
};
