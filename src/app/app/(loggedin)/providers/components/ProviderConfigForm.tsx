"use client";

import React, { useState, useEffect } from 'react';
import { Button, Input, Form, message, Select } from 'antd';
import { providerApi, CreateProviderRequest } from '@/utils/api';

interface ProviderConfigFormProps {
  provider: {
    name: string;
    providerId: string;
    isNew: boolean;
    id?: number;
    status?: string;
    existingCredentials?: Record<string, string>;
  };
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  onRefresh?: () => void;
}

const ProviderConfigForm: React.FC<ProviderConfigFormProps> = ({
  provider,
  onSave,
  onCancel,
  onRefresh
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // Provider configuration schemas
  const providerSchemas = {
    stripe: {
      name: 'Stripe',
      fields: [
        { key: 'publishable_key', label: 'Publishable Key', type: 'text', required: true },
        { key: 'secret_key', label: 'Secret Key', type: 'password', required: true },
      ],
      description: 'Configure your Stripe payment gateway with API keys from your Stripe dashboard.'
    },
    paypal_rest: {
      name: 'PayPal (REST)',
      fields: [
        { key: 'client_id', label: 'Client ID', type: 'text', required: true },
        { key: 'client_secret', label: 'Client Secret', type: 'password', required: true }
      ],
      description: 'Set up PayPal REST API integration using your PayPal Developer credentials.'
    },
    paypal_classic: {
      name: 'PayPal (Classic)',
      fields: [
        { key: 'api_username', label: 'API Username', type: 'text', required: true },
        { key: 'api_password', label: 'API Password', type: 'password', required: true },
        { key: 'api_signature', label: 'API Signature', type: 'password', required: true }
      ],
      description: 'Configure PayPal Classic API with your PayPal Business account credentials.'
    },
    lemonsqueezy: {
      name: 'LemonSqueezy',
      fields: [
        { key: 'api_key', label: 'API Key (Bearer Token)', type: 'password', required: true }
      ],
      description: 'Add your LemonSqueezy API key for seamless payment processing.'
    },
    razorpay: {
      name: 'Razorpay',
      fields: [
        { key: 'key_id', label: 'Key ID', type: 'text', required: true },
        { key: 'key_secret', label: 'Key Secret', type: 'password', required: true }
      ],
      description: 'Configure Razorpay with your API credentials from the Razorpay dashboard.'
    }
  };

  const currentSchema = providerSchemas[provider.providerId as keyof typeof providerSchemas];

  useEffect(() => {
    // Reset form first to clear any previous values
    form.resetFields();
    
    if (currentSchema) {
      if (provider.isNew) {
        // Initialize form with empty values for new providers
        const initialValues: Record<string, string> = {};
        currentSchema.fields.forEach(field => {
          initialValues[field.key] = '';
        });
        form.setFieldsValue(initialValues);
      } else {
        // Pre-fill with existing credentials for existing providers
        const initialValues: Record<string, string> = {};
        currentSchema.fields.forEach(field => {
          initialValues[field.key] = provider.existingCredentials?.[field.key] || '';
        });
        // Set the status field specifically
        initialValues.status = provider.status || 'active';
        form.setFieldsValue(initialValues);
      }
    }
  }, [provider.providerId, provider.isNew, provider.existingCredentials, provider.status, form, currentSchema]);


  const handleSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      if (provider.isNew) {
        // Create new provider
        const apiData: CreateProviderRequest = {
          provider: provider.providerId,
          credentials: values,
          status: 'active'
        };

        console.log('Creating new provider:', apiData);
        
        const response = await providerApi.createProviderConnection(apiData);
        
        if (response.error) {
          messageApi.error(response.error);
          return;
        }
        
        messageApi.success(`${currentSchema?.name} configuration created successfully!`);
        onSave(response.data as unknown as Record<string, unknown>);
        onRefresh?.();
      } else {
        // Update existing provider - only send changed credentials
        const updatedCredentials: Record<string, string> = {};
        currentSchema.fields.forEach(field => {
          const value = values[field.key];
          if (value && value.trim() !== '') {
            updatedCredentials[field.key] = value;
          }
        });

        const apiData = {
          provider: provider.providerId,
          credentials: updatedCredentials,
          status: values.status || provider.status || 'active'
        };

        console.log('Updating provider:', apiData);
        
        const response = await providerApi.updateProviderConnection(provider.id!, apiData as Partial<CreateProviderRequest>);
        
        if (response.error) {
          messageApi.error(response.error);
          return;
        }
        
        messageApi.success(`${currentSchema?.name} configuration updated successfully!`);
        onSave(response.data as unknown as Record<string, unknown>);
        onRefresh?.();

          
        
      }
    } catch (error) {
      messageApi.error('Failed to save configuration. Please try again.');
      console.error('Configuration error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentSchema) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Provider configuration not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contextHolder}
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-semibold">
            {provider.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {provider.isNew ? 'Configure' : 'Update'} {currentSchema.name}
            </h3>
            <p className="text-sm text-gray-600">{currentSchema.description}</p>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {currentSchema.fields.map((field) => (
          <Form.Item
            key={field.key}
            name={field.key}
            label={
              <span className="text-sm font-medium text-gray-700">
                {field.label}
                {!provider.isNew && (
                  <span className="text-gray-400 ml-1 text-xs">(Optional - leave empty to keep current)</span>
                )}
              </span>
            }
            rules={[
              { 
                required: field.required && provider.isNew, 
                message: `${field.label} is required` 
              },
              { 
                min: provider.isNew ? 3 : 0, 
                message: `${field.label} must be at least 3 characters` 
              }
            ]}
          >
            {field.type === 'password' ? (
              <Input.Password
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className="w-full"
              />
            ) : (
              <Input.Password
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className="w-full"
              />
            )}
          </Form.Item>
        ))}

        {/* Status Toggle for existing providers */}
        {!provider.isNew && (
          <Form.Item
            name="status"
            label="Status"
          >
            <Select
              options={[
                { value: 'active', label: 'Active' },
                { value: 'revoked', label: 'Revoked' },
                { value: 'pending', label: 'Pending' }
              ]}
              className="w-full"
            />
          </Form.Item>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pb-3 border-gray-200">
          <Button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            loading={loading}
            className='!bg-gradient-to-br from-[#1a4d70] via-[#165aa0] to-[#0a2b90] !text-white'
          >
            {provider.isNew ? 'Save Configuration' : 'Update Configuration'}
          </Button>
        </div>
      </Form>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Need Help?</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Find your API credentials in your {currentSchema.name} dashboard</li>
          <li>• Make sure to use the correct environment (test/live) keys</li>
          <li>• Keep your secret keys secure and never share them publicly</li>
        </ul>
      </div>
    </div>
  );
};

export default ProviderConfigForm;
