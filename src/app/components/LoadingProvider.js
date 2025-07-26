'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // Verificar se é o primeiro carregamento
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore');
    if (hasLoaded) {
      setIsFirstLoad(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsFirstLoad(false);
    sessionStorage.setItem('hasLoadedBefore', 'true');
  };

  const startPageLoading = () => setIsPageLoading(true);
  const stopPageLoading = () => setIsPageLoading(false);

  return (
    <LoadingContext.Provider value={{
      isFirstLoad,
      isPageLoading,
      startPageLoading,
      stopPageLoading
    }}>
      {isFirstLoad && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={isFirstLoad ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
};
