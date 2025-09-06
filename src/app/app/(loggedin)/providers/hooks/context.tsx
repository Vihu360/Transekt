// ConfigureProvidersContext.jsx
import { createContext, useContext, useState, useCallback } from "react";

// 1. Create the context
const ConfigureProvidersContext = createContext(null);

// 2. Create a custom hook for easier use
export const useConfigureProviders = () => {
  const context = useContext(ConfigureProvidersContext);
  if (!context) {
    throw new Error("useConfigureProviders must be used within a ConfigureProvidersProvider");
  }
  return context;
};

// 3. Create provider component
export const ConfigureProvidersProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [onProviderAdded, setOnProviderAdded] = useState(null);
  const [onRefresh, setOnRefresh] = useState(null);

  const openModal = (provider) => {
    setSelectedProvider(provider);
    setIsNew(provider.isNew);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedProvider(null);
    setIsNew(false);
  };

  const setProviderAddedCallback = useCallback((callback) => {
    setOnProviderAdded(() => callback);
  }, []);

  const setRefreshCallback = useCallback((callback) => {
    setOnRefresh(() => callback);
  }, []);

  const handleProviderAdded = useCallback((provider) => {
    if (onProviderAdded) {
      onProviderAdded(provider);
    }
  }, [onProviderAdded]);

  return (
    <ConfigureProvidersContext.Provider value={{ 
      open, 
      setOpen, 
      selectedProvider, 
      openModal, 
      closeModal,
      isNew,
      setProviderAddedCallback,
      handleProviderAdded,
      onRefresh,
      setRefreshCallback
    }}>
      {children}
    </ConfigureProvidersContext.Provider>
  );
};
