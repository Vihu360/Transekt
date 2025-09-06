"use client";

import { useState, useEffect, useCallback } from 'react';
import { providerApi, ProviderConnection } from '@/utils/api';

export const useProviders = () => {
  const [providers, setProviders] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await providerApi.getProviderConnections();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      setProviders(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch providers');
    } finally {
      setLoading(false);
    }
  };

  const addProvider = useCallback((newProvider: ProviderConnection) => {
    setProviders(prev => [...prev, newProvider]);
  }, []);

  const updateProvider = useCallback((updatedProvider: ProviderConnection) => {
    setProviders(prev => 
      prev.map(provider => 
        provider.id === updatedProvider.id ? updatedProvider : provider
      )
    );
  }, []);

  const refreshProviders = useCallback(() => {
    fetchProviders();
  }, []);

  const removeProvider = useCallback((providerId: number) => {
    setProviders(prev => prev.filter(provider => provider.id !== providerId));
  }, []);

  useEffect(() => {
    fetchProviders();
  }, []);

  return {
    providers,
    loading,
    error,
    fetchProviders,
    addProvider,
    updateProvider,
    removeProvider,
    refreshProviders,
  };
};
