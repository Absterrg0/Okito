import { useState } from 'react';

interface useLoadingResponse {
  isLoading: boolean;
  error: string | null;
  execute: (action: () => Promise<void> | void) => Promise<void>;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useLoading = (): useLoadingResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For async operations (existing functionality)
  const execute = async (action: () => Promise<void> | void) => {
    setIsLoading(true);
    setError(null);

    try {
      await action();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // For manual control (new functionality)
  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const setErrorState = (error: string | null) => {
    setError(error);
    setIsLoading(false);
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return { 
    isLoading, 
    error, 
    execute, 
    startLoading, 
    stopLoading, 
    setError: setErrorState, 
    reset 
  };
};