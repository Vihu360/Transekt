import { Transaction } from './api';

/**
 * Converts transaction data to CSV format
 * @param transactions Array of transaction objects
 * @param filename Optional filename for the download
 */
export const exportTransactionsToCSV = (transactions: Transaction[], filename?: string): void => {
  if (!transactions || transactions.length === 0) {
    console.warn('No transactions to export');
    return;
  }

  // Define CSV headers
  const headers = [
    'ID',
    'Provider',
    'Provider Transaction ID',
    'User ID',
    'User Email',
    'User Name',
    'Amount',
    'Currency',
    'Status',
    'Type',
    'Payment Method',
    'Customer ID',
    'Customer Email',
    'Created At',
    'Updated At'
  ];

  // Convert transactions to CSV rows
  const csvRows = transactions.map(transaction => [
    transaction.id,
    transaction.provider,
    transaction.provider_txn_id,
    transaction.user,
    transaction.user_email,
    transaction.user_name,
    transaction.amount,
    transaction.currency,
    transaction.status,
    transaction.type,
    transaction.payment_method,
    transaction.customer_id,
    transaction.customer_email,
    transaction.created_at,
    transaction.updated_at
  ]);

  // Escape CSV values (handle commas, quotes, and newlines)
  const escapeCSVValue = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Create CSV content
  const csvContent = [
    headers.map(escapeCSVValue).join(','),
    ...csvRows.map(row => row.map(escapeCSVValue).join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Formats transaction data for better CSV readability
 * @param transactions Array of transaction objects
 * @param includeFormattedDates Whether to include formatted date columns
 */
export const exportFormattedTransactionsToCSV = (
  transactions: Transaction[], 
  filename?: string,
  includeFormattedDates: boolean = true
): void => {
  if (!transactions || transactions.length === 0) {
    console.warn('No transactions to export');
    return;
  }

  // Define CSV headers with formatted columns
  const headers = [
    'ID',
    'Provider',
    'Provider Transaction ID',
    'User Email',
    'User Name',
    'Amount',
    'Currency',
    'Status',
    'Type',
    'Payment Method',
    'Customer ID',
    'Customer Email',
    'Created At',
    'Updated At'
  ];

  // Add formatted date columns if requested
  if (includeFormattedDates) {
    headers.push('Created Date (Formatted)', 'Updated Date (Formatted)');
  }

  // Convert transactions to CSV rows with formatting
  const csvRows = transactions.map(transaction => {
    const baseRow = [
      transaction.id,
      transaction.provider,
      transaction.provider_txn_id,
      transaction.user_email,
      transaction.user_name,
      transaction.amount,
      transaction.currency,
      transaction.status,
      transaction.type,
      transaction.payment_method,
      transaction.customer_id,
      transaction.customer_email,
      transaction.created_at,
      transaction.updated_at
    ];

    // Add formatted dates if requested
    if (includeFormattedDates) {
      const createdDate = new Date(transaction.created_at);
      const updatedDate = new Date(transaction.updated_at);
      
      baseRow.push(
        createdDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    }

    return baseRow;
  });

  // Escape CSV values
  const escapeCSVValue = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Create CSV content
  const csvContent = [
    headers.map(escapeCSVValue).join(','),
    ...csvRows.map(row => row.map(escapeCSVValue).join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Generates a filename based on current filters and date
 */
export const generateExportFilename = (filters: {
  provider?: string[];
  status?: string[];
  timeframe?: string;
}): string => {
  const date = new Date().toISOString().split('T')[0];
  const parts = [`transactions_${date}`];
  
  if (filters.provider && filters.provider.length > 0) {
    parts.push(`providers_${filters.provider.join('_')}`);
  }
  
  if (filters.status && filters.status.length > 0) {
    parts.push(`status_${filters.status.join('_')}`);
  }
  
  if (filters.timeframe && filters.timeframe !== 'all_time') {
    parts.push(filters.timeframe);
  }
  
  return `${parts.join('_')}.csv`;
};
