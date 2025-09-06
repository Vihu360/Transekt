import { useState, useEffect, useCallback } from 'react';
import { transactionApi, Transaction, TransactionFilters } from '../../../../../utils/api';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  refetch: () => void;
  updateFilters: (newFilters: Partial<TransactionFilters>) => void;
}

export const useTransactions = (initialFilters: TransactionFilters = {}): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 50,
    ...initialFilters
  });

  // Fetch transactions from API
  const fetchTransactions = useCallback(async (currentFilters: TransactionFilters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await transactionApi.getTransactions(currentFilters);
      
      if (response.error) {
        throw new Error(response.error);
      }

      const data = response.data;
      
      // Handle both array response and paginated response
      if (Array.isArray(data)) {
        setTransactions(data);
        setTotalCount(data.length);
      } else if (data && 'results' in data) {
        setTransactions(data.results);
        setTotalCount(data.count || data.results.length);
      } else {
        setTransactions([]);
        setTotalCount(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      setTransactions([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters and refetch
  const updateFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchTransactions(updatedFilters);
  }, [filters, fetchTransactions]);

  // Refetch with current filters
  const refetch = useCallback(() => {
    fetchTransactions(filters);
  }, [fetchTransactions, filters]);

  // Initial fetch
  useEffect(() => {
    fetchTransactions(filters);
  }, [fetchTransactions, filters]);

  return {
    transactions,
    loading,
    error,
    totalCount,
    refetch,
    updateFilters
  };
};