"use client";

import React, { useState } from 'react';
import { Table, Button, Select, Tag, Avatar, Space, Typography, Input, Alert } from 'antd';
import { 
  ExportOutlined, 
  FilterOutlined, 
  UserOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { filterTransactions, useDebounce } from './helperFunctions/filteredTransactions';
import { useTransactions } from './hooks/useTransactions';
import { Transaction } from '../../../../utils/api';

const { Title, Text } = Typography;

const TransactionsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    provider: [] as string[],
    paymentMethod: [] as string[],
    status: [] as string[],
    currency: [] as string[],
    timeframe: 'last_7_days' as string
  });

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // API integration
  const { 
    transactions: apiTransactions, 
    loading, 
    error, 
    totalCount,
    updateFilters 
  } = useTransactions({
    provider: filters.provider,
    status: filters.status,
    page: pagination.current,
    limit: pagination.pageSize
  });

  // Client-side filtering for search and other filters
  const filteredTransactions = filterTransactions(
    apiTransactions, 
    debouncedSearchTerm, 
    filters
  );

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string | string[]) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    // Update API filters for provider and status
    if (filterType === 'provider' || filterType === 'status') {
      updateFilters({
        [filterType]: value
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getProviderIcon = (provider: string) => {
    const getProviderColor = (provider: string) => {
      switch (provider.toLowerCase()) {
        case 'razorpay': return '#3b82f6';
        case 'stripe': return '#8b5cf6';
        case 'paypal': return '#3b82f6';
        case 'square': return '#f59e0b';
        default: return '#6b7280';
      }
    };

    return (
      <Avatar 
        size="small" 
        style={{ 
          backgroundColor: getProviderColor(provider),
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        {provider.substring(0, 2).toUpperCase()}
      </Avatar>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return '📶';
      case 'card':
        return '💳';
      case 'wallet':
        return '👛';
      default:
        return '💰';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: string, currency: string) => {
    const symbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€'
    };
    return `${symbols[currency] || currency} ${amount}`;
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
      render: (text: string, record: Transaction) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.customer_email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
      render: (text: string, record: Transaction) => (
        <Space>
          {getProviderIcon(text)}
          <div>
            <div style={{ fontWeight: 500, textTransform: 'capitalize' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.provider_txn_id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (text: string) => (
        <Space>
          <span style={{ fontSize: '16px' }}>{getPaymentMethodIcon(text)}</span>
          <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string, record: Transaction) => (
        <span style={{ fontWeight: 500 }}>{formatAmount(text, record.currency)}</span>
      ),
      sorter: (a: Transaction, b: Transaction) => parseFloat(a.amount) - parseFloat(b.amount),
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => formatDate(text),
      sorter: (a: Transaction, b: Transaction) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={getStatusColor(text)} style={{ textTransform: 'capitalize' }}>
          {text}
        </Tag>
      ),
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelectAll: (selected: boolean, selectedRows: Transaction[], changeRows: Transaction[]) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <div style={{  minHeight: '100vh' }} className=''>
      {/* Header Card */}
      <div className='px-6 pt-4 bg-[#FFFFFF]/60 backdrop-blur-2xl'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar 
              size={48} 
              style={{ 
                background: 'linear-gradient(135deg, #1a4d70 0%, #165aa0 50%, #0a2b90 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
            </Avatar>
            <div>
              <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
                Transactions
              </Title>
              <Text type="secondary">Monitor and manage your payment transactions</Text>
            </div>
          </div>
          
          <Space>
            <Button 
              icon={<ExportOutlined />} 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 500
              }}
            >
              Export
            </Button>
          </Space>
        </div>
      </div>

      <div className='bg-[#FFFFFF]/60 backdrop-blur-2xl px-6'>
        {/* Error Alert */}
        {error && (
          <div className='p-5'>
            <Alert
              message="Error loading transactions"
              description={error}
              type="error"
              showIcon
              closable
            />
          </div>
        )}

        {/* Filters Card */}
        <div className='py-5'>
          <div className='flex items-center gap-2 w-full'>

          <div>
              <Input 
                placeholder="Search transactions..." 
                style={{ width: 300, borderRadius: '20px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <Select
                style={{ width: 120, borderRadius: '20px'}}
                placeholder="All Providers"
                value={filters.provider}
                onChange={(value) => handleFilterChange('provider', value)}
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                options={[
                  { label: 'Razorpay', value: 'razorpay' },
                  { label: 'Stripe', value: 'stripe' },
                  { label: 'PayPal', value: 'paypal' },
                  { label: 'Square', value: 'square' },
                ]}
              />
            </div>
            
            <div>
              <Select
                style={{ width: 120, borderRadius: '20px' }}
                placeholder="All Methods"
                value={filters.paymentMethod}
                onChange={(value) => handleFilterChange('paymentMethod', value)}
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                options={[
                  { label: 'UPI', value: 'upi' },
                  { label: 'Card', value: 'card' },
                  { label: 'Wallet', value: 'wallet' },
                ]}
              />
            </div>
            
            <div>
              <Select
                style={{ width: 200, borderRadius: '20px' }}
                placeholder="All Status"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                options={[
                  { label: 'Succeeded', value: 'succeeded' },
                  { label: 'Failed', value: 'failed' },
                  { label: 'Pending', value: 'pending' },
                ]}
              />
            </div>
            
            <div>
              <Select
                style={{ width: 200, borderRadius: '20px' }}
                placeholder="All Currencies"
                value={filters.currency}
                onChange={(value) => handleFilterChange('currency', value)}
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                options={[
                  { label: 'INR', value: 'INR' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' },
                ]}
              />
            </div>

            <div>
              <Select
                style={{ width: 200, borderRadius: '20px' }}
                defaultValue="last_7_days"
                value={filters.timeframe}
                onChange={(value) => handleFilterChange('timeframe', value)}
                allowClear
                maxTagCount="responsive"
                options={[
                  { label: 'Last 7 days', value: 'last_7_days' },
                  { label: 'Last 30 days', value: 'last_30_days' },
                  { label: 'Last 90 days', value: 'last_90_days' },
                  { label: 'Last 180 days', value: 'last_180_days' },
                  { label: 'Last 365 days', value: 'last_365_days' },
                  { label: 'All time', value: 'all_time' },
                ]}
              />
            </div>

            
          </div>
        </div>

        {/* Transaction Table Card */}
        <div className='bg-[#FFFFFF] backdrop-blur-2xl rounded-t-4xl p-5'>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Text strong>
                {selectedRowKeys.length > 0 
                  ? `Total ${selectedRowKeys.length} selected` 
                  : `Total ${filteredTransactions.length} transactions`
                }
              </Text>
            </Space>
            {/* <Button 
                type="primary" 
                icon={<FilterOutlined />}
                style={{ 
                  background: 'linear-gradient(135deg, #1a4d70 0%, #165aa0 50%, #0a2b90 100%)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 500
                }}
              >
                Sort by
              </Button> */}
          </div>

          <Table
            columns={columns}
            dataSource={filteredTransactions}
            rowKey="id"
            // rowSelection={rowSelection}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: totalCount,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} transactions`,
              onChange: (page, pageSize) => {
                setPagination({ ...pagination, current: page, pageSize: pageSize || 10 });
                updateFilters({ page, limit: pageSize || 10 });
              },
            }}
            scroll={{ x: 1200 }}
            size="middle"
            rowClassName={(record) =>
              rowSelection?.selectedRowKeys?.includes(record.id) ? "custom-selected-row" : ""
            }
          />
        </div>

        </div>
    </div>
  );
};

export default TransactionsPage;