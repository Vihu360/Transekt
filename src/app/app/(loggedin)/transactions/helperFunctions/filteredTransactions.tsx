import { Transaction } from '@/utils/api';
import { useState, useEffect } from 'react';

interface FilterState {
  provider: string[];
  paymentMethod: string[];
  status: string[];
  currency: string[];
  timeframe: string;
}

// Debounce hook for search optimization
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string,
  filters: FilterState
): Transaction[] => {
  return transactions.filter(transaction => {
    // Search filter
    const searchMatch = searchTerm === '' || 
      transaction.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.provider_txn_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer_email.toLowerCase().includes(searchTerm.toLowerCase());

    // Provider filter
    const providerMatch = filters.provider.length === 0 || 
      filters.provider.includes(transaction.provider);

    // Payment method filter
    const paymentMethodMatch = filters.paymentMethod.length === 0 || 
      filters.paymentMethod.includes(transaction.payment_method);

    // Status filter
    const statusMatch = filters.status.length === 0 || 
      filters.status.includes(transaction.status);

    // Currency filter
    const currencyMatch = filters.currency.length === 0 || 
      filters.currency.includes(transaction.currency);

    return searchMatch && providerMatch && paymentMethodMatch && statusMatch && currencyMatch;
  });
};
